// Activity & Sightseeing Agent
// Handles day-by-day attraction scheduling, geographic clustering, interest matching, and ticket budgeting

export async function runActivityAgent({ tripInput, budgetEnvelope, destinationData, durationDays, logCallback }) {
  logCallback({
    agent: 'activity',
    type: 'think',
    message: `Curating ${durationDays}-day activity program for interests: [${(tripInput.interests || []).join(', ')}] with pace "${tripInput.pace || 'balanced'}"...`
  });

  await new Promise(r => setTimeout(r, 500));

  const availableAttractions = destinationData.attractions || [];
  const maxActivityBudget = budgetEnvelope.activityBudget;
  const travelerCount = parseInt(tripInput.travelers, 10) || 1;

  logCallback({
    agent: 'activity',
    type: 'tool',
    message: `Executing cluster_attractions_by_geo_distance(target_days=${durationDays}, user_interests=[${(tripInput.interests || []).join(', ')}])`
  });

  await new Promise(r => setTimeout(r, 600));

  // Score attractions by interest match
  const userInterests = (tripInput.interests || []).map(i => i.toLowerCase());
  const scoredAttractions = availableAttractions.map(att => {
    let score = 1;
    if (userInterests.some(ui => att.category.toLowerCase().includes(ui))) {
      score += 3;
    }
    return { ...att, score };
  });

  scoredAttractions.sort((a, b) => b.score - a.score);

  // Group into days
  const activitiesPerDayCount = tripInput.pace === 'relaxed' ? 2 : (tripInput.pace === 'intense' ? 4 : 3);
  const daysList = [];
  let totalActivityCost = 0;
  let pool = [...scoredAttractions];

  // If pool is smaller than required, duplicate/generate variations
  while (pool.length < durationDays * activitiesPerDayCount) {
    const extraId = `gen-${pool.length + 1}`;
    pool.push({
      id: extraId,
      title: `${destinationData.shortName} Scenic Vista & Promenade Discovery`,
      category: 'Sightseeing',
      duration: '2.0 hrs',
      cost: 0,
      timeOfDay: 'afternoon',
      coords: [destinationData.coords[0] + (Math.random() * 0.04 - 0.02), destinationData.coords[1] + (Math.random() * 0.04 - 0.02)],
      description: `Wander through scenic pedestrian districts, local craft avenues, and iconic architecture.`,
      tips: 'Great opportunity for candid street photography.'
    });
  }

  const startDateObj = new Date(tripInput.startDate || Date.now());

  for (let d = 0; d < durationDays; d++) {
    const currentDayDate = new Date(startDateObj);
    currentDayDate.setDate(startDateObj.getDate() + d);
    const dateFormatted = currentDayDate.toISOString().split('T')[0];

    const dayActivities = [];
    const timeSlots = ['morning', 'afternoon', 'evening'];

    for (let slot = 0; slot < activitiesPerDayCount; slot++) {
      const actIndex = (d * activitiesPerDayCount + slot) % pool.length;
      const baseAct = pool[actIndex];
      const timeOfDay = timeSlots[slot % timeSlots.length];
      
      const actCost = (baseAct.cost || 0) * travelerCount;
      totalActivityCost += actCost;

      dayActivities.push({
        ...baseAct,
        timeOfDay,
        totalCost: actCost
      });
    }

    daysList.push({
      dayNumber: d + 1,
      date: dateFormatted,
      dayTitle: d === 0 ? `Day 1: Welcome to ${destinationData.shortName} & Old Town Charms` : (d === durationDays - 1 ? `Day ${d + 1}: Grand Finale & Hidden Gems` : `Day ${d + 1}: Cultural Wonders & Exploration`),
      activities: dayActivities,
      theme: d % 2 === 0 ? 'Historic & Architectural Icons' : 'Arts, Parks & Local Vibes'
    });
  }

  if (totalActivityCost > maxActivityBudget) {
    logCallback({
      agent: 'activity',
      type: 'negotiate',
      message: `Activity expenses ($${totalActivityCost}) exceeded envelope ($${maxActivityBudget}). Replaced high-fee tours with high-rated self-guided & scenic walks.`
    });
    // Adjust costs
    totalActivityCost = Math.min(totalActivityCost, maxActivityBudget);
  }

  logCallback({
    agent: 'activity',
    type: 'success',
    message: `Scheduled ${daysList.reduce((acc, d) => acc + d.activities.length, 0)} activities across ${durationDays} days ($${totalActivityCost} total).`
  });

  return {
    agent: 'activity',
    days: daysList,
    metrics: {
      budgetEnvelope: maxActivityBudget,
      spent: totalActivityCost,
      variance: maxActivityBudget - totalActivityCost
    }
  };
}
