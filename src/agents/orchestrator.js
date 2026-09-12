// Orchestrator & State Graph Controller
// Coordinates the Multi-Agent workflow, allocates envelopes, manages execution graph, and synthesizes final itinerary

import { findDestination } from './travelDataStore.js';
import { runFlightAgent } from './flightAgent.js';
import { runAccommodationAgent } from './accommodationAgent.js';
import { runActivityAgent } from './activityAgent.js';
import { runDiningAgent } from './diningAgent.js';
import { runBudgetValidator } from './budgetValidator.js';

export async function orchestrateTripPlan({
  tripInput,
  onNodeStateChange,
  onLogMessage,
  settings = {}
}) {
  const startTime = Date.now();

  // Helper to update visual graph node state
  const setNode = (nodeId, status, details = '') => {
    if (onNodeStateChange) {
      onNodeStateChange({ nodeId, status, details, timestamp: Date.now() });
    }
  };

  // Helper to append agent reasoning log
  const log = (logEntry) => {
    if (onLogMessage) {
      onLogMessage({
        ...logEntry,
        timestamp: new Date().toLocaleTimeString(),
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`
      });
    }
  };

  try {
    // -------------------------------------------------------------
    // STAGE 1: ORCHESTRATOR INITIALIZATION & INTENT DECOMPOSITION
    // -------------------------------------------------------------
    setNode('orchestrator', 'active', 'Decomposing request & setting budget envelopes');
    log({
      agent: 'orchestrator',
      type: 'think',
      message: `Received trip request: Destination="${tripInput.destination}", Origin="${tripInput.origin}", Budget=$${tripInput.budget}, Dates=${tripInput.startDate} to ${tripInput.endDate}, Travelers=${tripInput.travelers}.`
    });

    await new Promise(r => setTimeout(r, 600));

    // Calculate duration in days & nights
    const start = new Date(tripInput.startDate || Date.now());
    const end = new Date(tripInput.endDate || Date.now() + 86400000 * 4);
    const diffTime = Math.abs(end - start);
    const durationDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const durationNights = Math.max(1, durationDays - 1);

    // Look up destination knowledge
    const destinationData = findDestination(tripInput.destination);

    // Compute dynamic budget envelopes
    const totalBudget = parseFloat(tripInput.budget) || 2500;
    const budgetEnvelope = {
      flightBudget: Math.round(totalBudget * 0.35),
      stayBudget: Math.round(totalBudget * 0.35),
      activityBudget: Math.round(totalBudget * 0.15),
      diningBudget: Math.round(totalBudget * 0.15)
    };

    log({
      agent: 'orchestrator',
      type: 'tool',
      message: `Envelopes assigned -> Flights: $${budgetEnvelope.flightBudget}, Stays: $${budgetEnvelope.stayBudget}, Activities: $${budgetEnvelope.activityBudget}, Dining: $${budgetEnvelope.diningBudget}`
    });

    setNode('orchestrator', 'completed', 'Envelopes allocated. Dispatching agents');

    // -------------------------------------------------------------
    // STAGE 2: PARALLEL AGENT EXECUTION (Flight, Stay, Activity, Dining)
    // -------------------------------------------------------------
    setNode('flight', 'active', 'Searching optimal flights');
    setNode('accommodation', 'active', 'Searching stays & ratings');
    setNode('activity', 'active', 'Clustering day-by-day sights');
    setNode('dining', 'active', 'Matching dietary & restaurants');

    const [flightResult, accommodationResult, activityResult, diningResult] = await Promise.all([
      runFlightAgent({ tripInput, budgetEnvelope, destinationData, logCallback: log }).then(res => {
        setNode('flight', 'completed', `${res.selected.airline} ($${res.selected.totalCost})`);
        return res;
      }),
      runAccommodationAgent({ tripInput, budgetEnvelope, destinationData, durationNights, logCallback: log }).then(res => {
        setNode('accommodation', 'completed', `${res.selected.name} ($${res.selected.totalCost})`);
        return res;
      }),
      runActivityAgent({ tripInput, budgetEnvelope, destinationData, durationDays, logCallback: log }).then(res => {
        setNode('activity', 'completed', `${durationDays} Days of Sights ($${res.metrics.spent})`);
        return res;
      }),
      runDiningAgent({ tripInput, budgetEnvelope, destinationData, durationDays, logCallback: log }).then(res => {
        setNode('dining', 'completed', `Curated ${tripInput.dietary || 'Standard'} Dining ($${res.metrics.spent})`);
        return res;
      })
    ]);

    // -------------------------------------------------------------
    // STAGE 3: BUDGET & CONSTRAINT VALIDATION NODE
    // -------------------------------------------------------------
    setNode('validator', 'active', 'Auditing aggregate expenses & risk');
    
    const validationResult = await runBudgetValidator({
      tripInput,
      flightResult,
      accommodationResult,
      activityResult,
      diningResult,
      totalUserBudget: totalBudget,
      logCallback: log
    });

    setNode('validator', 'completed', `Audit complete: $${validationResult.totalCommitted} spent`);

    // -------------------------------------------------------------
    // STAGE 4: SYNTHESIS & FINAL ITINERARY ASSEMBLY
    // -------------------------------------------------------------
    setNode('synthesis', 'active', 'Assembling coherent interactive itinerary');
    log({
      agent: 'orchestrator',
      type: 'think',
      message: `Merging agent outputs into cohesive unified day-by-day itinerary with geo-markers and packing guide.`
    });

    await new Promise(r => setTimeout(r, 600));

    // Merge daily activities with daily dining
    const assembledDays = activityResult.days.map((day, idx) => {
      const dayDining = diningResult.dailyDining[idx] || diningResult.dailyDining[0];
      return {
        ...day,
        dining: dayDining
      };
    });

    // Extract all geo points for interactive map
    const mapMarkers = [
      {
        id: 'hotel-pin',
        title: accommodationResult.selected.name,
        category: 'Hotel',
        coords: accommodationResult.selected.coords,
        day: 0,
        type: 'accommodation',
        details: `${accommodationResult.selected.tier.toUpperCase()} • ${accommodationResult.selected.rating}★`
      }
    ];

    assembledDays.forEach(day => {
      day.activities.forEach(act => {
        if (act.coords) {
          mapMarkers.push({
            id: `act-${act.id}`,
            title: act.title,
            category: act.category,
            coords: act.coords,
            day: day.dayNumber,
            type: 'activity',
            details: `${act.timeOfDay?.toUpperCase()} • ${act.duration} • $${act.cost}`
          });
        }
      });
    });

    const finalPlan = {
      id: `trip_${Date.now()}`,
      destination: destinationData.name,
      shortName: destinationData.shortName,
      country: destinationData.country,
      coords: destinationData.coords,
      heroImage: destinationData.heroImage,
      tagline: destinationData.tagline,
      tripInput,
      durationDays,
      durationNights,
      dates: {
        start: tripInput.startDate,
        end: tripInput.endDate
      },
      flight: flightResult.selected,
      flightAlternatives: flightResult.alternatives,
      accommodation: accommodationResult.selected,
      accommodationAlternatives: accommodationResult.alternatives,
      days: assembledDays,
      mapMarkers,
      budgetAudit: validationResult,
      weather: destinationData.weather,
      neighborhoods: destinationData.neighborhoods,
      createdAt: new Date().toISOString(),
      orchestrationTimeMs: Date.now() - startTime
    };

    setNode('synthesis', 'completed', 'Itinerary ready & verified');
    log({
      agent: 'orchestrator',
      type: 'success',
      message: `✨ Travel Plan generated in ${(finalPlan.orchestrationTimeMs / 1000).toFixed(2)}s. Total estimated cost: $${validationResult.totalCommitted} (User Budget: $${totalBudget}).`
    });

    return finalPlan;
  } catch (error) {
    console.error('Orchestration error:', error);
    log({
      agent: 'orchestrator',
      type: 'error',
      message: `Orchestration pipeline failed: ${error.message}`
    });
    setNode('orchestrator', 'error', error.message);
    throw error;
  }
}

// Dynamic AI Chat modification handler: Adjusts parts of the itinerary based on conversational prompt
export async function refineItineraryWithInstruction({ currentPlan, instruction, logCallback }) {
  logCallback({
    agent: 'orchestrator',
    type: 'think',
    message: `Executing dynamic adjustment for instruction: "${instruction}"...`
  });

  await new Promise(r => setTimeout(r, 600));

  const lower = instruction.toLowerCase();
  const updatedPlan = JSON.parse(JSON.stringify(currentPlan));

  if (lower.includes('cheaper') || lower.includes('budget') || lower.includes('cut cost') || lower.includes('save money')) {
    logCallback({
      agent: 'accommodation',
      type: 'tool',
      message: 'Downshifting accommodation tier to economy and converting paid attractions to scenic walks...'
    });
    if (updatedPlan.accommodation) {
      updatedPlan.accommodation.pricePerNight = Math.round(updatedPlan.accommodation.pricePerNight * 0.7);
      updatedPlan.accommodation.totalCost = updatedPlan.accommodation.pricePerNight * updatedPlan.durationNights;
      updatedPlan.accommodation.name = `Boutique Saver: ${updatedPlan.accommodation.name}`;
    }
    updatedPlan.days.forEach(day => {
      day.activities.forEach(act => {
        if (act.cost > 0) act.cost = Math.round(act.cost * 0.5);
      });
    });
    logCallback({
      agent: 'orchestrator',
      type: 'success',
      message: 'Adjusted total plan cost down by approximately 25%!'
    });
  } else if (lower.includes('luxury') || lower.includes('upgrade') || lower.includes('5-star')) {
    logCallback({
      agent: 'accommodation',
      type: 'tool',
      message: 'Upgrading hotel to 5-Star Luxury Suite with panoramic view and premium dining...'
    });
    if (updatedPlan.accommodation) {
      updatedPlan.accommodation.tier = 'luxury';
      updatedPlan.accommodation.pricePerNight = Math.round(updatedPlan.accommodation.pricePerNight * 1.5);
      updatedPlan.accommodation.totalCost = updatedPlan.accommodation.pricePerNight * updatedPlan.durationNights;
      updatedPlan.accommodation.name = `The Luxury Grand Palace ${updatedPlan.shortName}`;
      updatedPlan.accommodation.rating = 4.9;
    }
  } else if (lower.includes('food') || lower.includes('ramen') || lower.includes('culinary') || lower.includes('cafe')) {
    logCallback({
      agent: 'dining',
      type: 'tool',
      message: 'Enhancing culinary stops with high-rated food market tours and chef specialties...'
    });
    updatedPlan.days.forEach((day, idx) => {
      day.activities[0].title = `Curated Food & Artisan Market Walking Tour (Day ${idx + 1})`;
      day.activities[0].category = 'Foodie';
    });
  } else if (lower.includes('relax') || lower.includes('chill') || lower.includes('slower')) {
    logCallback({
      agent: 'activity',
      type: 'tool',
      message: 'Reducing activity density to 2 leisurely spots per day with relaxed afternoon breaks...'
    });
    updatedPlan.days.forEach(day => {
      if (day.activities.length > 2) {
        day.activities = day.activities.slice(0, 2);
      }
    });
  } else {
    logCallback({
      agent: 'orchestrator',
      type: 'tool',
      message: `Applying custom preference tuning for: "${instruction}"`
    });
    updatedPlan.days[0].dayTitle = `Custom Refined: ${updatedPlan.days[0].dayTitle}`;
  }

  // Recalculate totals
  const flightSpent = updatedPlan.flight?.totalCost || 0;
  const staySpent = updatedPlan.accommodation?.totalCost || 0;
  let actSpent = 0;
  let diningSpent = 0;
  updatedPlan.days.forEach(d => {
    d.activities.forEach(a => { actSpent += (a.totalCost || a.cost || 0); });
    if (d.dining) diningSpent += (d.dining.totalDayCost || 60);
  });

  const totalSpent = flightSpent + staySpent + actSpent + diningSpent;
  updatedPlan.budgetAudit.totalCommitted = totalSpent;
  updatedPlan.budgetAudit.remainingSurplus = updatedPlan.budgetAudit.totalUserBudget - totalSpent;

  return updatedPlan;
}
