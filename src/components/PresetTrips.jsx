import React from 'react';
import { Sparkles, MapPin, Calendar, DollarSign, Users, Compass, ArrowRight, X } from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../agents/travelDataStore';
import { formatCurrency } from '../utils/currency';

const PRESET_CONFIGS = [
  {
    id: 'tokyo',
    destination: 'Tokyo, Japan',
    origin: 'San Francisco (SFO)',
    startDate: '2026-10-10',
    endDate: '2026-10-16',
    budget: 3200,
    travelers: 2,
    pace: 'balanced',
    interests: ['Culture', 'Foodie', 'Art', 'Nightlife'],
    dietary: 'None',
    stayPreference: 'boutique',
    flightPreference: 'economy_direct',
    highlight: 'Neon Shinjuku, Senso-ji Temple & Tsukiji Market Wagyu'
  },
  {
    id: 'paris',
    destination: 'Paris, France',
    origin: 'New York (JFK)',
    startDate: '2026-09-18',
    endDate: '2026-09-23',
    budget: 3800,
    travelers: 2,
    pace: 'relaxed',
    interests: ['Art', 'Foodie', 'Culture', 'History'],
    dietary: 'None',
    stayPreference: 'luxury',
    flightPreference: 'economy_direct',
    highlight: 'Louvre Masterpieces, Eiffel Sunset & Le Marais Bistros'
  },
  {
    id: 'rome',
    destination: 'Rome, Italy',
    origin: 'London (LHR)',
    startDate: '2026-10-05',
    endDate: '2026-10-10',
    budget: 2400,
    travelers: 2,
    pace: 'balanced',
    interests: ['History', 'Foodie', 'Culture'],
    dietary: 'None',
    stayPreference: 'moderate',
    flightPreference: 'economy_direct',
    highlight: 'Gladiator Underground, Trastevere Pasta & Vatican Art'
  },
  {
    id: 'bali',
    destination: 'Bali, Indonesia',
    origin: 'Sydney (SYD)',
    startDate: '2026-11-01',
    endDate: '2026-11-08',
    budget: 2200,
    travelers: 2,
    pace: 'relaxed',
    interests: ['Nature', 'Adventure', 'Foodie'],
    dietary: 'Vegan Option',
    stayPreference: 'boutique',
    flightPreference: 'cheapest',
    highlight: 'Ubud Rice Terraces, Clifftop Kecak & Jungle Waterfalls'
  },
  {
    id: 'swiss-alps',
    destination: 'Interlaken & Swiss Alps, Switzerland',
    origin: 'Chicago (ORD)',
    startDate: '2026-12-05',
    endDate: '2026-12-10',
    budget: 4500,
    travelers: 2,
    pace: 'balanced',
    interests: ['Adventure', 'Nature', 'Foodie'],
    dietary: 'None',
    stayPreference: 'luxury',
    flightPreference: 'economy_direct',
    highlight: 'Jungfraujoch Glacier, Lauterbrunnen Chalets & Fondue'
  },
  {
    id: 'new-york',
    destination: 'New York City, USA',
    origin: 'Los Angeles (LAX)',
    startDate: '2026-10-20',
    endDate: '2026-10-24',
    budget: 2800,
    travelers: 2,
    pace: 'high-energy',
    interests: ['Art', 'Foodie', 'Nightlife', 'Sightseeing'],
    dietary: 'None',
    stayPreference: 'boutique',
    flightPreference: 'economy_direct',
    highlight: 'Summit Vanderbilt, Broadway Show, High Line & Chelsea Market'
  }
];

export default function PresetTrips({ onSelectPreset, onClose, currency }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container preset-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Sparkles className="icon-sparkle" size={20} />
            <h2>Instant Multi-Agent Trip Inspirations</h2>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <p className="modal-description">
          Pick any hand-curated itinerary blueprint to instantly test the multi-agent graph planner with pre-tuned parameters.
        </p>

        <div className="presets-grid">
          {PRESET_CONFIGS.map(preset => {
            const dest = POPULAR_DESTINATIONS.find(d => d.id === preset.id) || POPULAR_DESTINATIONS[0];
            return (
              <div 
                key={preset.id} 
                className="preset-card"
                onClick={() => {
                  onSelectPreset(preset);
                  if (onClose) onClose();
                }}
              >
                <div className="preset-card-image-wrap">
                  <img src={dest.heroImage} alt={preset.destination} className="preset-card-img" />
                  <div className="preset-card-overlay"></div>
                  <span className="preset-price-tag">
                    {formatCurrency(preset.budget, currency)} Budget
                  </span>
                </div>

                <div className="preset-card-body">
                  <h3>{preset.destination}</h3>
                  <p className="preset-highlight">{preset.highlight}</p>

                  <div className="preset-meta-row">
                    <span><Users size={13} /> {preset.travelers} Guests</span>
                    <span><Compass size={13} /> {preset.pace}</span>
                    <span><MapPin size={13} /> From {preset.origin.split(' ')[0]}</span>
                  </div>

                  <div className="preset-tags">
                    {preset.interests.map(i => (
                      <span key={i} className="preset-interest-tag">{i}</span>
                    ))}
                  </div>

                  <button className="select-preset-btn">
                    <span>Load Into Agent Graph</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
