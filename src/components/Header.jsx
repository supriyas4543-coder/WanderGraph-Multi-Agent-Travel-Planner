import React from 'react';
import { Compass, Sparkles, Bookmark, Settings, Globe, Moon, Sun } from 'lucide-react';
import { EXCHANGE_RATES } from '../utils/currency';

export default function Header({
  currency,
  onCurrencyChange,
  onOpenSavedTrips,
  savedTripsCount = 0,
  onOpenSettings,
  onOpenPresets,
  theme,
  onToggleTheme
}) {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo-brand">
          <div className="logo-icon-wrapper">
            <Compass className="logo-icon animate-spin-slow" />
            <span className="logo-pulse"></span>
          </div>
          <div className="logo-text">
            <h1>WanderGraph <span className="ai-badge">Multi-Agent AI</span></h1>
            <p className="logo-subtitle">Graph-Orchestrated Autonomous Travel Intelligence</p>
          </div>
        </div>

        <div className="header-actions">
          <button 
            type="button" 
            className="action-btn preset-btn"
            onClick={onOpenPresets}
            title="Explore Inspiration Trips"
          >
            <Sparkles size={16} />
            <span className="hide-mobile">Inspirations</span>
          </button>

          <div className="currency-selector-wrapper">
            <Globe size={15} className="currency-icon" />
            <select 
              value={currency} 
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="currency-select"
              aria-label="Select Currency"
            >
              {Object.keys(EXCHANGE_RATES).map(code => (
                <option key={code} value={code}>
                  {code} ({EXCHANGE_RATES[code].symbol})
                </option>
              ))}
            </select>
          </div>

          <button 
            type="button" 
            className="action-btn saved-trips-btn"
            onClick={onOpenSavedTrips}
            title="View Saved Trips"
          >
            <Bookmark size={16} />
            <span className="hide-mobile">Saved Trips</span>
            {savedTripsCount > 0 && (
              <span className="badge-count">{savedTripsCount}</span>
            )}
          </button>

          <button 
            type="button" 
            className="action-btn settings-btn"
            onClick={onOpenSettings}
            title="Settings & API Keys"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
