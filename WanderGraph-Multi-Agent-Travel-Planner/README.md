# 🌍 WanderGraph AI — Multi-Agent Autonomous Travel Planner

> **Graph-orchestrated multi-agent travel intelligence for building personalized, budget-aware travel itineraries.**

WanderGraph AI is a multi-agent travel planning application where specialized agents collaborate through an orchestrated workflow to transform a user's travel requirements into a structured itinerary.

Instead of relying on a single planning component, WanderGraph divides the travel planning process among specialized agents responsible for flights, accommodation, activities, dining, and budget validation.

---

## 📸 Application Preview

![WanderGraph Dashboard](public/screenshots/wandergraph-dashboard.png)

*WanderGraph's graph-orchestrated multi-agent travel planning interface.*

---

## 🚀 Live Demo

👉 **[Launch WanderGraph AI](https://wander-graph-multi-agent-travel-planner-9b4afx424-self-1542.vercel.app/)**

Explore the deployed multi-agent travel planning application and interact with the WanderGraph interface.

## 💡 Why WanderGraph?

Traditional travel planning often requires switching between multiple platforms for:

- ✈️ Flights
- 🏨 Accommodation
- 🗺️ Activities and sightseeing
- 🍽️ Dining
- 💰 Budget management
- 📅 Itinerary organization

WanderGraph brings these planning tasks together into a coordinated multi-agent workflow.

The system follows an **orchestrator-based architecture**, where a central agent decomposes the travel request and coordinates specialized agents before producing the final itinerary.

---

# 🏛️ Multi-Agent Architecture

```text
                    USER REQUEST
       Destination • Budget • Dates • Preferences
                          │
                          ▼
             ┌─────────────────────────┐
             │   ORCHESTRATOR AGENT    │
             │ Intent Decomposition    │
             │ Budget Allocation       │
             │ Agent Coordination      │
             └────────────┬────────────┘
                          │
          ┌───────────────┼────────────────┐
          │               │                │
          ▼               ▼                ▼
   ┌────────────┐  ┌────────────┐  ┌────────────┐
   │   FLIGHT   │  │    STAY    │  │  ACTIVITY  │
   │   AGENT    │  │   AGENT    │  │   AGENT    │
   └──────┬─────┘  └──────┬─────┘  └──────┬─────┘
          │               │                │
          │         ┌─────▼─────┐          │
          └────────►│   DINING  │◄─────────┘
                    │   AGENT   │
                    └─────┬─────┘
                          │
                          ▼
             ┌─────────────────────────┐
             │ BUDGET & RISK VALIDATOR │
             │ Expense Audit           │
             │ Budget Compliance       │
             │ Reserve Management       │
             └────────────┬────────────┘
                          │
                          ▼
             ┌─────────────────────────┐
             │ ITINERARY SYNTHESIS     │
             │ Structured Trip Plan    │
             └────────────┬────────────┘
                          │
                          ▼
              ┌────────────────────────┐
              │    INTERACTIVE UI      │
              │ Map • Calendar • Budget│
              │ Activities • Dining    │
              └────────────────────────┘
🤖 Specialized Agents
1. Orchestrator Agent

File: src/agents/orchestrator.js

The orchestrator acts as the central coordinator of the travel planning workflow.

Responsibilities:

Parses the user's travel specification.
Decomposes the request into specialized tasks.
Coordinates the different travel agents.
Maintains the planning workflow.
Allocates budget envelopes across travel categories.
Coordinates adjustments when requirements change.
Handles conversational itinerary refinements.
Example Budget Allocation
Flights       → 35%
Accommodation → 35%
Activities    → 15%
Dining        → 15%
2. Flight & Transit Agent

File: src/agents/flightAgent.js

Responsible for evaluating flight and transportation options.

It considers:

Direct vs. one-stop flights
Flight duration
Departure and arrival timing
Baggage information
Estimated carbon footprint
Airport timing considerations
3. Accommodation Agent

File: src/agents/accommodationAgent.js

Responsible for selecting suitable accommodation options.

It considers:

Accommodation type
Ratings
Location
Safety considerations
Amenities
Room configuration
Total estimated stay cost
4. Activity & Sightseeing Agent

File: src/agents/activityAgent.js

Responsible for designing the sightseeing portion of the itinerary.

It can:

Group attractions by geographical proximity.
Organize activities across different parts of the day.
Match activities with user interests.
Provide travel tips for attractions.
Reduce unnecessary movement between locations.

Supported interest categories include:

Culture
Food
Adventure
Art
Nature
Nightlife
History
5. Culinary & Dining Agent

File: src/agents/diningAgent.js

Responsible for planning dining experiences.

It can organize:

Breakfast
Lunch
Dinner
Local food experiences
Dietary preferences

Supported dietary filters include:

Vegan
Vegetarian
Halal
Kosher
Gluten-Free
6. Budget & Financial Risk Validator

File: src/agents/budgetValidator.js

The validator evaluates the overall estimated travel expenditure.

Responsibilities:

Aggregates estimated expenses.
Compares spending against the user's budget.
Identifies potential budget risks.
Maintains an emergency reserve concept.
Provides suggestions for reducing unnecessary spending.
✨ Key Features
🧠 Multi-Agent Planning

Multiple specialized agents participate in different parts of the travel planning workflow instead of relying on a single planning component.

🔗 Agent Graph Visualization

The application visually represents the relationship between the orchestrator, specialized agents, and validation/synthesis stages.

📋 Agent Execution Stream

Users can inspect execution events and filter activity by agent.

Available categories include:

All Agents
Orchestrator
Flight Agent
Stay Agent
Activity Agent
Dining Agent
Validator
🗺️ Interactive Travel Map

The application provides an interactive map for visualizing:

Attractions
Dining locations
Accommodation
Travel destinations

The map is powered by Leaflet.

💬 AI Travel Refinement

Users can request modifications to an existing travel plan, such as:

Make Day 2 cheaper
Upgrade the hotel
Add more adventure activities
Add a foodie experience
💰 Budget Analytics

The application provides an overview of estimated expenses and budget distribution across travel categories.

📅 Calendar Export

Generated itineraries can be exported as .ics calendar files for use with compatible calendar applications.

💱 Multi-Currency Support

The application supports multiple currencies including:

USD
EUR
GBP
JPY
INR
CAD
AUD
CHF
SGD
💾 Saved Trips

Trips can be stored locally using browser LocalStorage.

🎒 Packing & Weather Information

The interface includes packing checklist and weather-related travel advisory components.

🛠️ Technology Stack
Technology	Purpose
React	Frontend UI
JavaScript	Application logic
JSX	React components
Vite	Development and build tooling
Leaflet	Interactive maps
Lucide	UI icons
LocalStorage	Local trip persistence
iCal / RFC 5545	Calendar export
Gemini / OpenAI	Optional LLM integration
📂 Project Structure
WanderGraph-Multi-Agent-Travel-Planner/
│
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── screenshots/
│       └── wandergraph-dashboard.png
│
├── src/
│   │
│   ├── agents/
│   │   ├── orchestrator.js
│   │   ├── flightAgent.js
│   │   ├── accommodationAgent.js
│   │   ├── activityAgent.js
│   │   ├── diningAgent.js
│   │   ├── budgetValidator.js
│   │   ├── travelDataStore.js
│   │   └── llmClient.js
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── TripInputForm.jsx
│   │   ├── PresetTrips.jsx
│   │   ├── AgentGraphVisualizer.jsx
│   │   ├── AgentTerminalLogs.jsx
│   │   ├── ItineraryView.jsx
│   │   ├── DayCard.jsx
│   │   ├── InteractiveMap.jsx
│   │   ├── BudgetAnalytics.jsx
│   │   ├── PackingAndWeather.jsx
│   │   ├── AgentChatAdjustment.jsx
│   │   ├── SavedTripsModal.jsx
│   │   └── SettingsModal.jsx
│   │
│   ├── utils/
│   │   ├── currency.js
│   │   ├── icalExporter.js
│   │   └── storage.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── start.bat
├── vite.config.js
└── README.md