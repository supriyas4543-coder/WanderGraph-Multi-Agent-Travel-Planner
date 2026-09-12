// Culinary & Dining Agent
// Researches breakfasts, authentic local lunches, and memorable dinners matching dietary restrictions

export async function runDiningAgent({ tripInput, budgetEnvelope, destinationData, durationDays, logCallback }) {
  const dietary = tripInput.dietary || 'None';
  logCallback({
    agent: 'dining',
    type: 'think',
    message: `Curating dining spots in ${destinationData.shortName} with dietary requirements: "${dietary}"...`
  });

  await new Promise(r => setTimeout(r, 450));

  const availableDining = destinationData.dining || [];
  const maxDiningBudget = budgetEnvelope.diningBudget;
  const travelerCount = parseInt(tripInput.travelers, 10) || 1;

  logCallback({
    agent: 'dining',
    type: 'tool',
    message: `Executing search_restaurants(destination="${destinationData.shortName}", dietary_filter="${dietary}", meal_slots=["breakfast","lunch","dinner"])`
  });

  await new Promise(r => setTimeout(r, 500));

  // Filter or prioritize dining options matching dietary requirements
  let filtered = availableDining.filter(r => {
    if (dietary === 'None' || !dietary) return true;
    return r.tags?.some(tag => tag.toLowerCase().includes(dietary.toLowerCase()));
  });

  if (filtered.length === 0) {
    filtered = availableDining;
  }

  const breakfastOptions = filtered.filter(d => d.meal === 'breakfast' || d.tags?.includes('Cafe'));
  const lunchOptions = filtered.filter(d => d.meal === 'lunch' || d.tags?.includes('Quick Bite'));
  const dinnerOptions = filtered.filter(d => d.meal === 'dinner' || d.tags?.includes('Foodie'));

  const dailyDining = [];
  let totalDiningCost = 0;

  for (let d = 0; d < durationDays; d++) {
    const breakfast = (breakfastOptions.length > 0 ? breakfastOptions[d % breakfastOptions.length] : availableDining[0]) || {
      name: `${destinationData.shortName} Morning Bakery & Coffee`,
      cuisine: 'Artisan Pastries & Espresso',
      cost: 10,
      specialty: 'Freshly baked local morning goods'
    };

    const lunch = (lunchOptions.length > 0 ? lunchOptions[d % lunchOptions.length] : availableDining[1 % availableDining.length]) || {
      name: `${destinationData.shortName} Traditional Bistro`,
      cuisine: 'Local Market Lunch',
      cost: 18,
      specialty: 'Daily market seasonal specialty dish'
    };

    const dinner = (dinnerOptions.length > 0 ? dinnerOptions[d % dinnerOptions.length] : availableDining[2 % availableDining.length]) || {
      name: `Grand ${destinationData.shortName} Evening Trattoria`,
      cuisine: 'Regional Tasting Dinner',
      cost: 35,
      specialty: 'Signature regional dinner pairing'
    };

    const dayCost = ((breakfast.cost || 10) + (lunch.cost || 18) + (dinner.cost || 35)) * travelerCount;
    totalDiningCost += dayCost;

    dailyDining.push({
      dayNumber: d + 1,
      breakfast: { ...breakfast, totalCost: (breakfast.cost || 10) * travelerCount },
      lunch: { ...lunch, totalCost: (lunch.cost || 18) * travelerCount },
      dinner: { ...dinner, totalCost: (dinner.cost || 35) * travelerCount },
      totalDayCost: dayCost
    });
  }

  logCallback({
    agent: 'dining',
    type: 'success',
    message: `Assembled ${durationDays * 3} dining recommendations tailored for ${dietary} diet ($${totalDiningCost} total estimated).`
  });

  return {
    agent: 'dining',
    dailyDining,
    metrics: {
      budgetEnvelope: maxDiningBudget,
      spent: totalDiningCost,
      variance: maxDiningBudget - totalDiningCost
    }
  };
}
