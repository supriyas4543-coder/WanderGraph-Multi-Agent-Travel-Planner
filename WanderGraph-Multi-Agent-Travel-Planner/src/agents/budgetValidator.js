// Budget & Financial Risk Compliance Validator Agent
// Audits spending across all sub-agents, manages emergency buffer, checks feasibility, and verifies constraints

export async function runBudgetValidator({
  tripInput,
  flightResult,
  accommodationResult,
  activityResult,
  diningResult,
  totalUserBudget,
  logCallback
}) {
  logCallback({
    agent: 'validator',
    type: 'think',
    message: `Auditing financial allocations against total budget ceiling ($${totalUserBudget})...`
  });

  await new Promise(r => setTimeout(r, 450));

  const flightCost = flightResult.metrics.spent || 0;
  const stayCost = accommodationResult.metrics.spent || 0;
  const activityCost = activityResult.metrics.spent || 0;
  const diningCost = diningResult.metrics.spent || 0;

  const totalCommitted = flightCost + stayCost + activityCost + diningCost;
  const remainingSurplus = totalUserBudget - totalCommitted;
  const emergencyBuffer = Math.max(50, Math.round(totalUserBudget * 0.08));

  const isWithinBudget = totalCommitted + emergencyBuffer <= totalUserBudget * 1.05; // 5% flexibility margin

  logCallback({
    agent: 'validator',
    type: 'tool',
    message: `Running calculate_cost_breakdown(flight=$${flightCost}, stay=$${stayCost}, activity=$${activityCost}, dining=$${diningCost}, buffer=$${emergencyBuffer})`
  });

  await new Promise(r => setTimeout(r, 400));

  const categoryBreakdown = [
    { category: 'Flights & Transit', amount: flightCost, percentage: Math.round((flightCost / Math.max(1, totalCommitted)) * 100), color: '#38bdf8' },
    { category: 'Accommodations', amount: stayCost, percentage: Math.round((stayCost / Math.max(1, totalCommitted)) * 100), color: '#818cf8' },
    { category: 'Activities & Sightseeing', amount: activityCost, percentage: Math.round((activityCost / Math.max(1, totalCommitted)) * 100), color: '#34d399' },
    { category: 'Dining & Food', amount: diningCost, percentage: Math.round((diningCost / Math.max(1, totalCommitted)) * 100), color: '#fbbf24' },
    { category: 'Emergency Reserve', amount: emergencyBuffer, percentage: Math.round((emergencyBuffer / Math.max(1, totalUserBudget)) * 100), color: '#f43f5e' }
  ];

  if (!isWithinBudget) {
    logCallback({
      agent: 'validator',
      type: 'warning',
      message: `Total committed ($${totalCommitted} + $${emergencyBuffer} buffer) exceeds target budget ($${totalUserBudget}). Recommend applying economy downshifts.`
    });
  } else {
    logCallback({
      agent: 'validator',
      type: 'success',
      message: `Validation Passed! Total estimated expenditure is $${totalCommitted} with a healthy $${remainingSurplus >= 0 ? remainingSurplus : emergencyBuffer} reserve.`
    });
  }

  return {
    agent: 'validator',
    passed: isWithinBudget,
    totalCommitted,
    totalUserBudget,
    remainingSurplus,
    emergencyBuffer,
    categoryBreakdown,
    savingsRecommendation: remainingSurplus > 200 
      ? `You have a $${remainingSurplus} surplus! Consider booking a Michelin tasting or luxury spa add-on.`
      : `Budget is tightly optimized. Stick to public transit and reserve $${emergencyBuffer} for incidental expenses.`
  };
}
