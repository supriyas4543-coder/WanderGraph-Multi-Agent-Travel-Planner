// Flight & Transit Search Agent
// Handles flight discovery, multi-airline comparison, baggage & carbon estimation, and arrival timing coordination

export async function runFlightAgent({ tripInput, budgetEnvelope, destinationData, logCallback }) {
  logCallback({
    agent: 'flight',
    type: 'think',
    message: `Searching flight routes from "${tripInput.origin}" to "${tripInput.destination}" for ${tripInput.travelers} traveler(s)...`
  });

  await new Promise(r => setTimeout(r, 400));

  const availableFlights = destinationData.flights || [];
  const travelerCount = parseInt(tripInput.travelers, 10) || 1;
  const maxFlightBudget = budgetEnvelope.flightBudget;

  logCallback({
    agent: 'flight',
    type: 'tool',
    message: `Executing query_flight_matrix(origin="${tripInput.origin}", destination="${destinationData.name}", target_budget=$${maxFlightBudget})`
  });

  await new Promise(r => setTimeout(r, 500));

  // Determine ideal flight candidate based on preferences and budget envelope
  let selectedFlight = null;
  let candidates = availableFlights.map(f => ({
    ...f,
    totalCost: f.basePrice * travelerCount
  }));

  // Sort by price or preference
  if (tripInput.flightPreference === 'economy_direct') {
    candidates.sort((a, b) => (b.flightType.includes('Direct') ? 1 : -1) || (a.totalCost - b.totalCost));
  } else if (tripInput.flightPreference === 'cheapest') {
    candidates.sort((a, b) => a.totalCost - b.totalCost);
  } else if (tripInput.flightPreference === 'business') {
    candidates.sort((a, b) => b.totalCost - a.totalCost);
  }

  // Filter or match closest within envelope
  selectedFlight = candidates.find(c => c.totalCost <= maxFlightBudget) || candidates[0];

  const wasOverBudget = selectedFlight.totalCost > maxFlightBudget;
  if (wasOverBudget) {
    logCallback({
      agent: 'flight',
      type: 'negotiate',
      message: `Preferred route ($${selectedFlight.totalCost}) exceeds assigned envelope ($${maxFlightBudget}). Negotiating with Orchestrator for budget adjustment or carrier swap.`
    });
  } else {
    logCallback({
      agent: 'flight',
      type: 'success',
      message: `Locked optimal route on ${selectedFlight.airline} (${selectedFlight.flightType}) for $${selectedFlight.totalCost} total.`
    });
  }

  return {
    agent: 'flight',
    selected: {
      airline: selectedFlight.airline,
      code: selectedFlight.code,
      flightType: selectedFlight.flightType,
      departureTime: selectedFlight.departureTime,
      arrivalTime: selectedFlight.arrivalTime,
      duration: selectedFlight.duration,
      pricePerPerson: selectedFlight.basePrice,
      totalCost: selectedFlight.totalCost,
      carbonKg: selectedFlight.carbonKg * travelerCount,
      baggageAllowance: '1 Carry-on (10kg) + 1 Checked Bag (23kg) included',
      originAirport: `${tripInput.origin} International Airport`,
      destinationAirport: `${destinationData.shortName} Main Airport`,
      bookingCode: `AV-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    },
    alternatives: candidates.filter(c => c.code !== selectedFlight.code).slice(0, 2),
    metrics: {
      budgetEnvelope: maxFlightBudget,
      spent: selectedFlight.totalCost,
      variance: maxFlightBudget - selectedFlight.totalCost
    }
  };
}
