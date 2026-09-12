import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import TripInputForm from './components/TripInputForm';
import PresetTrips from './components/PresetTrips';
import AgentGraphVisualizer from './components/AgentGraphVisualizer';
import AgentTerminalLogs from './components/AgentTerminalLogs';
import ItineraryView from './components/ItineraryView';
import SavedTripsModal from './components/SavedTripsModal';
import SettingsModal from './components/SettingsModal';

import { orchestrateTripPlan, refineItineraryWithInstruction } from './agents/orchestrator';
import { 
  getSavedTrips, 
  saveTrip, 
  deleteSavedTrip, 
  getSettings, 
  saveSettings, 
  getCurrentTrip, 
  setCurrentTrip 
} from './utils/storage';

const INITIAL_TRIP_INPUT = {
  destination: 'Tokyo, Japan',
  origin: 'San Francisco (SFO)',
  startDate: '2026-10-10',
  endDate: '2026-10-16',
  budget: 3200,
  travelers: 2,
  pace: 'balanced',
  stayPreference: 'boutique',
  flightPreference: 'economy_direct',
  dietary: 'None',
  interests: ['Culture', 'Foodie', 'Art', 'Nightlife']
};

export default function App() {
  const [tripInput, setTripInput] = useState(INITIAL_TRIP_INPUT);
  const [currentPlan, setPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [nodeStates, setNodeStates] = useState({});
  const [logs, setLogs] = useState([]);

  // Modals & User Preferences
  const [showPresets, setShowPresets] = useState(false);
  const [showSavedTrips, setShowSavedTrips] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [savedTrips, setSavedTrips] = useState([]);
  const [settings, setSettingsState] = useState(getSettings());
  const [currency, setCurrency] = useState('USD');
  const [theme, setTheme] = useState('dark');

  // Load saved state on mount
  useEffect(() => {
    const loadedTrips = getSavedTrips();
    setSavedTrips(loadedTrips);

    const initialSettings = getSettings();
    setSettingsState(initialSettings);
    if (initialSettings.currency) setCurrency(initialSettings.currency);

    const storedCurrent = getCurrentTrip();
    if (storedCurrent) {
      setPlan(storedCurrent);
      if (storedCurrent.tripInput) {
        setTripInput(storedCurrent.tripInput);
      }
    }
  }, []);

  const handleUpdateSettings = (newSettings) => {
    setSettingsState(newSettings);
    saveSettings(newSettings);
    if (newSettings.currency) setCurrency(newSettings.currency);
  };

  const handleCurrencyChange = (newCurr) => {
    setCurrency(newCurr);
    const updated = { ...settings, currency: newCurr };
    setSettingsState(updated);
    saveSettings(updated);
  };

  // Launch the Multi-Agent Orchestration Graph
  const handleLaunchOrchestration = async (overrideInput) => {
    const activeInput = overrideInput || tripInput;
    setIsGenerating(true);
    setLogs([]);
    setNodeStates({
      orchestrator: { status: 'idle' },
      flight: { status: 'idle' },
      accommodation: { status: 'idle' },
      activity: { status: 'idle' },
      dining: { status: 'idle' },
      validator: { status: 'idle' },
      synthesis: { status: 'idle' }
    });

    try {
      const generatedPlan = await orchestrateTripPlan({
        tripInput: activeInput,
        onNodeStateChange: (update) => {
          setNodeStates(prev => ({
            ...prev,
            [update.nodeId]: { status: update.status, details: update.details }
          }));
        },
        onLogMessage: (log) => {
          setLogs(prev => [...prev, log]);
        },
        settings
      });

      setPlan(generatedPlan);
      setCurrentTrip(generatedPlan);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

    } catch (err) {
      console.error('Plan generation failed', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Dynamic Chat Refinement
  const handleRefineInstruction = async (instruction, replyCallback) => {
    if (!currentPlan) return;
    setIsRefining(true);

    try {
      const updatedPlan = await refineItineraryWithInstruction({
        currentPlan,
        instruction,
        logCallback: (log) => {
          setLogs(prev => [...prev, { ...log, timestamp: new Date().toLocaleTimeString(), id: `log_${Date.now()}_${Math.random()}` }]);
        }
      });

      setPlan(updatedPlan);
      setCurrentTrip(updatedPlan);
      replyCallback('I have re-evaluated the sub-agent graph and updated your itinerary with the requested changes!');
    } catch (err) {
      console.error('Refinement failed', err);
      replyCallback('Sorry, I encountered an issue updating the plan.');
    } finally {
      setIsRefining(false);
    }
  };

  // Preset Selection
  const handleSelectPreset = (preset) => {
    setTripInput(preset);
    handleLaunchOrchestration(preset);
  };

  // Saved Trips Actions
  const handleSaveCurrentTrip = () => {
    if (!currentPlan) return;
    const updated = saveTrip(currentPlan);
    setSavedTrips(updated);
  };

  const isCurrentPlanSaved = currentPlan ? savedTrips.some(t => t.id === currentPlan.id) : false;

  const handleLoadSavedTrip = (trip) => {
    setPlan(trip);
    if (trip.tripInput) setTripInput(trip.tripInput);
    setCurrentTrip(trip);
  };

  const handleDeleteSavedTrip = (id) => {
    const updated = deleteSavedTrip(id);
    setSavedTrips(updated);
  };

  return (
    <div className="app-root theme-dark">
      <Header
        currency={currency}
        onCurrencyChange={handleCurrencyChange}
        onOpenSavedTrips={() => setShowSavedTrips(true)}
        savedTripsCount={savedTrips.length}
        onOpenSettings={() => setShowSettings(true)}
        onOpenPresets={() => setShowPresets(true)}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />

      <main className="main-content-layout">
        {/* Top Section: Form + Live Agent Graph Visualizer */}
        <section className="planner-control-section">
          <div className="planner-grid-columns">
            <div className="form-column-panel">
              <TripInputForm
                tripInput={tripInput}
                onChange={setTripInput}
                onSubmit={() => handleLaunchOrchestration()}
                isLoading={isGenerating}
                currency={currency}
              />
            </div>

            <div className="graph-column-panel">
              <AgentGraphVisualizer
                nodeStates={nodeStates}
                isRunning={isGenerating}
              />

              <AgentTerminalLogs
                logs={logs}
                isRunning={isGenerating}
              />
            </div>
          </div>
        </section>

        {/* Bottom Section: Synthesized Itinerary or Empty Prompt */}
        <section className="itinerary-display-section" id="itinerary-section">
          {currentPlan ? (
            <ItineraryView
              plan={currentPlan}
              currency={currency}
              onSaveTrip={handleSaveCurrentTrip}
              isSaved={isCurrentPlanSaved}
              onRefineInstruction={handleRefineInstruction}
              isRefining={isRefining}
            />
          ) : (
            <div className="pre-generation-hero">
              <div className="hero-callout-box">
                <div className="callout-icon-ring">
                  <span className="dot pulse"></span>
                </div>
                <h3>Ready to Synthesize Your Custom Travel Graph</h3>
                <p>
                  Fill in your destination, budget, and travel preferences above, then click <strong>"Launch Multi-Agent Travel Graph"</strong> to watch autonomous agents collaborate in real time.
                </p>
                <div className="quick-start-row">
                  <button 
                    className="quick-start-preset-btn"
                    onClick={() => handleLaunchOrchestration()}
                  >
                    ⚡ Run Tokyo 6-Day Demo Plan ($3,200)
                  </button>
                  <button 
                    className="browse-inspirations-btn"
                    onClick={() => setShowPresets(true)}
                  >
                    Explore Hand-Curated Destinations
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Modals */}
      {showPresets && (
        <PresetTrips
          onSelectPreset={handleSelectPreset}
          onClose={() => setShowPresets(false)}
          currency={currency}
        />
      )}

      {showSavedTrips && (
        <SavedTripsModal
          savedTrips={savedTrips}
          onLoadTrip={handleLoadSavedTrip}
          onDeleteTrip={handleDeleteSavedTrip}
          onClose={() => setShowSavedTrips(false)}
          currency={currency}
        />
      )}

      {showSettings && (
        <SettingsModal
          settings={settings}
          onSaveSettings={handleUpdateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
