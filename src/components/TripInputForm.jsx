import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Compass, 
  Sparkles, 
  Utensils, 
  Hotel, 
  Plane, 
  Heart, 
  Sliders, 
  Flame,
  Check
} from 'lucide-react';
import { formatCurrency, convertFromUSD, convertToUSD } from '../utils/currency';

const INTEREST_OPTIONS = [
  { id: 'Culture', label: 'Culture & Temples', icon: '🏛️' },
  { id: 'Foodie', label: 'Food & Culinary', icon: '🍜' },
  { id: 'Art', label: 'Art & Museums', icon: '🎨' },
  { id: 'Nature', label: 'Nature & Parks', icon: '🌿' },
  { id: 'Adventure', label: 'Adventure & Hikes', icon: '🧗' },
  { id: 'Nightlife', label: 'Nightlife & Bars', icon: '🍸' },
  { id: 'History', label: 'Ancient History', icon: '📜' },
  { id: 'Sightseeing', label: 'Iconic Views', icon: '📸' }
];

const SUGGESTED_DESTINATIONS = [
  'Tokyo, Japan',
  'Paris, France',
  'Rome, Italy',
  'Bali, Indonesia',
  'Interlaken & Swiss Alps, Switzerland',
  'New York City, USA'
];

export default function TripInputForm({
  tripInput,
  onChange,
  onSubmit,
  isLoading,
  currency
}) {
  const [showInterestPicker, setShowInterestPicker] = useState(false);

  // Calculate duration
  const start = new Date(tripInput.startDate);
  const end = new Date(tripInput.endDate);
  const durationDays = isNaN(start.getTime()) || isNaN(end.getTime()) ? 5 : Math.max(1, Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)));

  const handleInterestToggle = (id) => {
    const current = tripInput.interests || [];
    let updated;
    if (current.includes(id)) {
      updated = current.filter(i => i !== id);
    } else {
      updated = [...current, id];
    }
    onChange({ ...tripInput, interests: updated });
  };

  const getBudgetTier = (val) => {
    if (val < 1500) return { label: 'Backpacker / Budget', color: '#38bdf8' };
    if (val < 3000) return { label: 'Smart Value Explorer', color: '#34d399' };
    if (val < 5500) return { label: 'Premium Comfort', color: '#818cf8' };
    return { label: 'Ultra Luxury 5-Star', color: '#f59e0b' };
  };

  const budgetTier = getBudgetTier(tripInput.budget);

  return (
    <form className="trip-form-card" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <div className="form-header-bar">
        <div className="form-title-group">
          <div className="badge-agent-cluster">
            <span className="dot pulse"></span>
            5 Autonomous Agents Active
          </div>
          <h2>Configure Trip Specification</h2>
          <p>The orchestrator will dispatch sub-agents to build, negotiate, and validate your itinerary.</p>
        </div>
      </div>

      <div className="form-grid-layout">
        {/* Destination & Origin */}
        <div className="form-section-duo">
          <div className="input-group">
            <label htmlFor="destination-input">
              <MapPin size={15} className="label-icon text-accent" />
              <span>Destination City or Country</span>
            </label>
            <div className="input-with-autocomplete">
              <input
                id="destination-input"
                type="text"
                value={tripInput.destination}
                onChange={(e) => onChange({ ...tripInput, destination: e.target.value })}
                placeholder="e.g. Tokyo, Japan or Paris, France"
                required
                className="custom-input"
              />
            </div>
            <div className="quick-suggestions">
              {SUGGESTED_DESTINATIONS.slice(0, 4).map(dest => (
                <button
                  type="button"
                  key={dest}
                  className={`suggest-chip ${tripInput.destination === dest ? 'active' : ''}`}
                  onClick={() => onChange({ ...tripInput, destination: dest })}
                >
                  {dest.split(',')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="origin-input">
              <Plane size={15} className="label-icon text-cyan" />
              <span>Departure City / Airport</span>
            </label>
            <input
              id="origin-input"
              type="text"
              value={tripInput.origin}
              onChange={(e) => onChange({ ...tripInput, origin: e.target.value })}
              placeholder="e.g. San Francisco (SFO) or New York (JFK)"
              required
              className="custom-input"
            />
          </div>
        </div>

        {/* Dates & Duration */}
        <div className="form-section-dates">
          <div className="input-group">
            <label htmlFor="start-date-input">
              <Calendar size={15} className="label-icon text-indigo" />
              <span>Departure Date</span>
            </label>
            <input
              id="start-date-input"
              type="date"
              value={tripInput.startDate}
              onChange={(e) => onChange({ ...tripInput, startDate: e.target.value })}
              required
              className="custom-input"
            />
          </div>

          <div className="input-group">
            <label htmlFor="end-date-input">
              <Calendar size={15} className="label-icon text-indigo" />
              <span>Return Date</span>
            </label>
            <input
              id="end-date-input"
              type="date"
              value={tripInput.endDate}
              onChange={(e) => onChange({ ...tripInput, endDate: e.target.value })}
              required
              className="custom-input"
            />
          </div>

          <div className="duration-pill-box">
            <span className="duration-number">{durationDays}</span>
            <span className="duration-label">Days Trip</span>
          </div>
        </div>

        {/* Budget Specification with Tier Badge */}
        <div className="form-section-budget">
          <div className="budget-header-row">
            <label htmlFor="budget-input">
              <DollarSign size={15} className="label-icon text-emerald" />
              <span>Total Travel Budget Ceiling</span>
            </label>
            <div className="budget-tier-pill" style={{ borderColor: budgetTier.color, color: budgetTier.color }}>
              <Flame size={13} />
              <span>{budgetTier.label}</span>
            </div>
          </div>

          <div className="budget-slider-row">
            <input
              type="range"
              min="500"
              max="12000"
              step="100"
              value={tripInput.budget}
              onChange={(e) => onChange({ ...tripInput, budget: Number(e.target.value) })}
              className="budget-slider"
              aria-label="Budget Range Slider"
            />
            <div className="budget-display-card">
              <span className="budget-currency-value">
                {formatCurrency(tripInput.budget, currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Travelers & Pace & Stay Preference */}
        <div className="form-section-trio">
          <div className="input-group">
            <label htmlFor="travelers-select">
              <Users size={15} className="label-icon text-pink" />
              <span>Travelers</span>
            </label>
            <select
              id="travelers-select"
              value={tripInput.travelers}
              onChange={(e) => onChange({ ...tripInput, travelers: Number(e.target.value) })}
              className="custom-select"
            >
              <option value={1}>1 Solo Explorer</option>
              <option value={2}>2 Couple / Pair</option>
              <option value={3}>3 Friends / Family</option>
              <option value={4}>4 Family Group</option>
              <option value={6}>6+ Group</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="pace-select">
              <Compass size={15} className="label-icon text-amber" />
              <span>Travel Pace</span>
            </label>
            <select
              id="pace-select"
              value={tripInput.pace}
              onChange={(e) => onChange({ ...tripInput, pace: e.target.value })}
              className="custom-select"
            >
              <option value="relaxed">Relaxed & Leisurely (1-2 sights/day)</option>
              <option value="balanced">Balanced & Immersive (2-3 sights/day)</option>
              <option value="intense">High Energy & Packed (4+ sights/day)</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="stay-select">
              <Hotel size={15} className="label-icon text-purple" />
              <span>Stay Preference</span>
            </label>
            <select
              id="stay-select"
              value={tripInput.stayPreference}
              onChange={(e) => onChange({ ...tripInput, stayPreference: e.target.value })}
              className="custom-select"
            >
              <option value="boutique">Chic Boutique Hotel</option>
              <option value="luxury">5-Star Luxury Resort</option>
              <option value="moderate">Modern Central Hotel</option>
              <option value="budget">Cozy Social Hostel / Studio</option>
            </select>
          </div>
        </div>

        {/* Dietary & Flight Preference */}
        <div className="form-section-duo">
          <div className="input-group">
            <label htmlFor="dietary-select">
              <Utensils size={15} className="label-icon text-orange" />
              <span>Dietary Requirements</span>
            </label>
            <select
              id="dietary-select"
              value={tripInput.dietary || 'None'}
              onChange={(e) => onChange({ ...tripInput, dietary: e.target.value })}
              className="custom-select"
            >
              <option value="None">None / Omnivore (Local Classics)</option>
              <option value="Vegan">100% Plant-Based / Vegan</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Halal">Certified Halal</option>
              <option value="Gluten-Free">Gluten-Free</option>
              <option value="Kosher">Kosher</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="flight-select">
              <Plane size={15} className="label-icon text-blue" />
              <span>Flight Preference</span>
            </label>
            <select
              id="flight-select"
              value={tripInput.flightPreference || 'economy_direct'}
              onChange={(e) => onChange({ ...tripInput, flightPreference: e.target.value })}
              className="custom-select"
            >
              <option value="economy_direct">Direct Preferred (Economy / Standard)</option>
              <option value="cheapest">Cheapest Available (1-Stop ok)</option>
              <option value="business">Premium / Business Class</option>
            </select>
          </div>
        </div>

        {/* Interest Chips */}
        <div className="form-section-interests">
          <label className="section-title-label">
            <Sparkles size={15} className="label-icon text-yellow" />
            <span>Activity Focus & Themes (Select all that apply)</span>
          </label>
          <div className="interests-chip-grid">
            {INTEREST_OPTIONS.map(opt => {
              const selected = (tripInput.interests || []).includes(opt.id);
              return (
                <button
                  type="button"
                  key={opt.id}
                  className={`interest-chip-btn ${selected ? 'selected' : ''}`}
                  onClick={() => handleInterestToggle(opt.id)}
                >
                  <span className="interest-emoji">{opt.icon}</span>
                  <span className="interest-label">{opt.label}</span>
                  {selected && <Check size={14} className="check-icon" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="form-submit-row">
        <button
          type="submit"
          disabled={isLoading}
          className={`orchestrate-submit-btn ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? (
            <>
              <div className="spinner"></div>
              <span>Orchestrating Multi-Agent Graph...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Launch Multi-Agent Travel Graph</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
