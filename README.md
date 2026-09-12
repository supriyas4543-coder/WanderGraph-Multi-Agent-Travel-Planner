# 🌍 WanderGraph AI — Multi-Agent Autonomous Travel Planner

> A graph-orchestrated multi-agent travel intelligence platform. Specialized autonomous agents collaborate to build, negotiate, validate, and dynamically refine comprehensive travel itineraries.

---

## 🏛️ Multi-Agent Architecture

```
User Request (Destination, Budget, Dates, Preferences)
                     │
                     ▼
       ┌───────────────────────────┐
       │   Orchestrator Meta-Agent │ (Intent Decomposition & Budget Envelopes)
       └─────────────┬─────────────┘
                     │
        ┌────────────┼────────────┬────────────┐
        ▼            ▼            ▼            ▼
┌──────────────┐┌──────────────┐┌──────────────┐┌──────────────┐
│ Flight Agent ││ Stay Agent   ││Activity Agent││ Dining Agent │
└───────┬──────┘└──────┬───────┘└──────┬───────┘└──────┬───────┘
        │              │               │               │
        └──────────────┴───────┬───────┴───────────────┘
                               ▼
               ┌───────────────────────────────┐
               │  Budget & Risk Validator Node │
               └───────────────┬───────────────┘
                               ▼
               ┌───────────────────────────────┐
               │  Itinerary Synthesis Node     │
               └───────────────┬───────────────┘
                               ▼
               Interactive Trip UI + Map + Calendar
```

---

## 🚀 Specialized Agents

1. **Orchestrator Agent (`src/agents/orchestrator.js`)**:
   - Parses travel specification and decomposes it into sub-agent work orders.
   - Dynamically partitions total budget into category envelopes (Flights 35%, Stays 35%, Activities 15%, Dining 15%).
   - Coordinates parallel agent execution, monitors state DAG, and runs automated conflict re-negotiation.
   - Handles conversational chat refinements.

2. **Flight & Transit Agent (`src/agents/flightAgent.js`)**:
   - Evaluates airline options (Direct vs 1-Stop), baggage allowances, flight times, and carbon footprint (kg CO2e).
   - Coordinates airport arrival timing with accommodation check-in.

3. **Accommodation Agent (`src/agents/accommodationAgent.js`)**:
   - Searches boutique hotels, luxury resorts, central apartments, and hostels based on ratings (4.5+★), neighborhood safety scores, and amenities.
   - Calculates total stay costs and room configurations.

4. **Activity & Sightseeing Agent (`src/agents/activityAgent.js`)**:
   - Clusters attractions geographically per day (morning, afternoon, evening) to minimize transit.
   - Matches user interest tags (Culture, Foodie, Adventure, Art, Nature, Nightlife, History).
   - Generates actionable travel tips for every spot.

5. **Culinary & Dining Agent (`src/agents/diningAgent.js`)**:
   - Curates breakfast cafes, authentic local lunch spots, and dinner experiences.
   - Enforces dietary filters (Vegan, Vegetarian, Halal, Kosher, Gluten-Free).

6. **Budget & Financial Risk Validator (`src/agents/budgetValidator.js`)**:
   - Audits all aggregated expenses against the user's spending ceiling.
   - Allocates an emergency reserve buffer and provides savings advice.

---

## 📂 Project Structure

```
multi-agent-travel-planner/
├── index.html                   # Entry HTML with Leaflet & Google Fonts
├── package.json                 # Dependencies (React, Lucide, Leaflet, Canvas-Confetti)
├── start.bat                    # One-click Windows starter script
├── vite.config.js               # Vite build configuration
├── src/
│   ├── main.jsx                 # Application entry point
│   ├── App.jsx                  # Main application state & layout controller
│   ├── index.css                # Dark-glass luxury design system
│   ├── agents/
│   │   ├── orchestrator.js      # Meta-orchestrator and state graph
│   │   ├── flightAgent.js       # Flight & transit agent
│   │   ├── accommodationAgent.js# Hotel & accommodation agent
│   │   ├── activityAgent.js     # Sightseeing & attraction agent
│   │   ├── diningAgent.js       # Culinary & dining agent
│   │   ├── budgetValidator.js   # Financial compliance validator
│   │   ├── travelDataStore.js   # Destination datasets & dynamic generator
│   │   └── llmClient.js         # Optional Gemini / OpenAI API connector
│   ├── components/
│   │   ├── Header.jsx           # Top navigation & currency selector
│   │   ├── TripInputForm.jsx    # Travel specification controls
│   │   ├── PresetTrips.jsx      # Curated inspiration blueprints modal
│   │   ├── AgentGraphVisualizer.jsx # Real-time interactive Node DAG
│   │   ├── AgentTerminalLogs.jsx    # Live streaming reasoning console
│   │   ├── ItineraryView.jsx    # Master itinerary dashboard
│   │   ├── DayCard.jsx          # Day cards with activities & dining
│   │   ├── InteractiveMap.jsx   # Leaflet map with pin clustering
│   │   ├── BudgetAnalytics.jsx  # Expense distribution & risk audit
│   │   ├── PackingAndWeather.jsx# Climate advisory & interactive packing checklist
│   │   ├── AgentChatAdjustment.jsx # Conversational AI refinement assistant
│   │   ├── SavedTripsModal.jsx  # LocalStorage saved trips manager
│   │   └── SettingsModal.jsx    # Engine provider & API key settings
│   └── utils/
│       ├── currency.js          # Multi-currency rates & formatting
│       ├── icalExporter.js      # RFC 5545 .ics Calendar export
│       └── storage.js           # LocalStorage persistence manager
```

---

## 💻 How to Run Locally

### Option A: Double-Click
Simply double-click `start.bat` inside the folder.

### Option B: Terminal
```bash
# Navigate to project folder
cd C:\Users\hp\.gemini\antigravity-ide\scratch\multi-agent-travel-planner

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
```

Then open your browser to **http://localhost:5173/**.

---

## ✨ Features

- **Real-Time Agent Visualizer**: Watch node state animations (`Thinking`, `Searching`, `Negotiating`, `Ready`) as agents coordinate.
- **Streaming Reasoning Logs**: Filter logs by agent (`All`, `Orchestrator`, `Flight`, `Stay`, `Activity`, `Dining`, `Validator`).
- **Interactive Geo-Map**: Leaflet map plotting all sights, dining stops, and basecamp hotel with day-colored markers.
- **Dynamic AI Refinement Chat**: Ask the orchestrator to adjust parts of the plan ("Make Day 2 cheaper", "Upgrade hotel to luxury", "Add ramen foodie tour").
- **iCal Sync & Print/PDF**: Export directly to Apple/Google/Outlook Calendar (`.ics`) or generate clean printable PDF pages.
- **Multi-Currency Support**: Instant conversion between USD ($), EUR (€), GBP (£), JPY (¥), INR (₹), CAD (CA$), AUD (A$), CHF, and SGD.
