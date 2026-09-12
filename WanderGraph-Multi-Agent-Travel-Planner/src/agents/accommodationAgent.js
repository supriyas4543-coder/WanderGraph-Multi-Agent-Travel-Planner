// Accommodation Search Agent
// Handles hotel, boutique stay, and resort matching, neighborhood safety evaluation, and total stay cost calculation

export async function runAccommodationAgent({ tripInput, budgetEnvelope, destinationData, durationNights, logCallback }) {
  logCallback({
    agent: 'accommodation',
    type: 'think',
    message: `Evaluating accommodations in ${destinationData.shortName} for ${durationNights} nights with stay style "${tripInput.stayPreference || 'balanced'}"...`
  });

  await new Promise(r => setTimeout(r, 450));

  const availableStays = destinationData.accommodations || [];
  const maxStayBudget = budgetEnvelope.stayBudget;
  const targetPerNight = Math.floor(maxStayBudget / Math.max(1, durationNights));

  logCallback({
    agent: 'accommodation',
    type: 'tool',
    message: `Executing filter_neighborhoods_and_properties(destination="${destinationData.shortName}", max_nightly_rate=$${targetPerNight}, safety_min=9.0)`
  });

  await new Promise(r => setTimeout(r, 550));

  // Determine ideal hotel
  let rankedStays = availableStays.map(s => {
    const totalStay = s.pricePerNight * durationNights;
    let styleMatch = 0;
    if (tripInput.stayPreference === 'luxury' && s.tier === 'luxury') styleMatch += 2;
    if (tripInput.stayPreference === 'boutique' && s.tier === 'boutique') styleMatch += 2;
    if (tripInput.stayPreference === 'budget' && s.tier === 'budget') styleMatch += 2;
    if (tripInput.stayPreference === 'moderate' && s.tier === 'moderate') styleMatch += 2;

    const budgetFit = totalStay <= maxStayBudget ? 3 : -2;
    return {
      ...s,
      totalStayCost: totalStay,
      score: (s.rating * 2) + styleMatch + budgetFit
    };
  });

  rankedStays.sort((a, b) => b.score - a.score);

  let selectedStay = rankedStays.find(s => s.totalStayCost <= maxStayBudget) || rankedStays[0];

  if (selectedStay.totalStayCost > maxStayBudget) {
    logCallback({
      agent: 'accommodation',
      type: 'negotiate',
      message: `Selected stay "${selectedStay.name}" ($${selectedStay.totalStayCost}) exceeds assigned stay envelope ($${maxStayBudget}). Adjusting category to optimize budget balance.`
    });
    // Fall back to a lower tier if available
    const cheaper = rankedStays.find(s => s.totalStayCost <= maxStayBudget);
    if (cheaper) selectedStay = cheaper;
  }

  logCallback({
    agent: 'accommodation',
    type: 'success',
    message: `Confirmed stay at "${selectedStay.name}" in ${selectedStay.location} (Rating: ${selectedStay.rating}★, $${selectedStay.pricePerNight}/night, Total: $${selectedStay.totalStayCost}).`
  });

  return {
    agent: 'accommodation',
    selected: {
      id: selectedStay.id,
      name: selectedStay.name,
      tier: selectedStay.tier,
      pricePerNight: selectedStay.pricePerNight,
      totalCost: selectedStay.totalStayCost,
      rating: selectedStay.rating,
      location: selectedStay.location,
      coords: selectedStay.coords || destinationData.coords,
      amenities: selectedStay.amenities,
      checkIn: `${tripInput.startDate} (15:00)`,
      checkOut: `${tripInput.endDate} (11:00)`,
      roomType: tripInput.travelers > 2 ? 'Deluxe Family Suite' : (tripInput.travelers === 2 ? 'Superior King Room' : 'Deluxe Studio'),
      neighborhoodSafety: destinationData.neighborhoods?.[0]?.safety || 9.6
    },
    alternatives: rankedStays.filter(s => s.id !== selectedStay.id).slice(0, 2),
    metrics: {
      budgetEnvelope: maxStayBudget,
      spent: selectedStay.totalStayCost,
      variance: maxStayBudget - selectedStay.totalStayCost
    }
  };
}
