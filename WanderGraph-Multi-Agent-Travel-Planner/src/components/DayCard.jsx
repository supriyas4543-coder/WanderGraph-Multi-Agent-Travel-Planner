import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  DollarSign, 
  Compass, 
  Lightbulb, 
  Utensils, 
  Coffee, 
  ChevronDown, 
  ChevronUp,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export default function DayCard({ day, currency, onFocusMarker }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const totalDayActCost = (day.activities || []).reduce((sum, a) => sum + (a.totalCost || a.cost || 0), 0);
  const diningTotal = day.dining?.totalDayCost || 0;
  const totalDayExpenses = totalDayActCost + diningTotal;

  const getTimeSlotColor = (slot) => {
    switch (slot) {
      case 'morning': return { bg: 'rgba(251, 191, 36, 0.15)', text: '#fbbf24', label: 'Morning Slot' };
      case 'afternoon': return { bg: 'rgba(56, 189, 248, 0.15)', text: '#38bdf8', label: 'Afternoon Slot' };
      case 'evening': return { bg: 'rgba(168, 85, 247, 0.15)', text: '#c084fc', label: 'Evening / Sunset' };
      default: return { bg: 'rgba(148, 163, 184, 0.15)', text: '#94a3b8', label: 'Activity' };
    }
  };

  return (
    <div className="day-card-container">
      {/* Day Header */}
      <div className="day-card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="day-badge-col">
          <span className="day-badge-number">Day {day.dayNumber}</span>
          <span className="day-badge-date">{day.date}</span>
        </div>

        <div className="day-title-col">
          <h3>{day.dayTitle}</h3>
          <p className="day-theme-subtitle">
            <Sparkles size={13} className="text-accent" /> {day.theme || 'Exploration & Culture'}
          </p>
        </div>

        <div className="day-cost-col">
          <div className="day-cost-val">
            {formatCurrency(totalDayExpenses, currency)}
          </div>
          <span className="day-cost-sub">est. total</span>
        </div>

        <button className="expand-toggle-btn" aria-label="Toggle day details">
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Day Content */}
      {isExpanded && (
        <div className="day-card-body">
          {/* Activities Timeline */}
          <div className="activities-timeline">
            {day.activities.map((act, idx) => {
              const slotMeta = getTimeSlotColor(act.timeOfDay);
              return (
                <div key={act.id || idx} className="activity-item-card">
                  <div className="activity-slot-indicator" style={{ backgroundColor: slotMeta.bg, color: slotMeta.text }}>
                    <span>{slotMeta.label}</span>
                  </div>

                  <div className="activity-main-info">
                    <div className="activity-title-row">
                      <h4>{act.title}</h4>
                      <span className="activity-category-pill">{act.category}</span>
                    </div>

                    <p className="activity-description">{act.description}</p>

                    {act.tips && (
                      <div className="activity-tip-box">
                        <Lightbulb size={13} className="tip-icon" />
                        <span><strong>Agent Tip:</strong> {act.tips}</span>
                      </div>
                    )}

                    <div className="activity-meta-footer">
                      <span className="meta-pill"><Clock size={12} /> {act.duration}</span>
                      <span className="meta-pill">
                        <DollarSign size={12} /> {act.cost > 0 ? `${formatCurrency(act.cost, currency)} / person` : 'Free Admission'}
                      </span>
                      {act.coords && (
                        <button 
                          className="meta-pill map-trigger-pill"
                          onClick={() => onFocusMarker && onFocusMarker(act.coords, act.title)}
                        >
                          <MapPin size={12} /> View on Map
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dining Recommendations */}
          {day.dining && (
            <div className="day-dining-section">
              <div className="dining-section-title">
                <Utensils size={15} className="text-amber" />
                <span>Curated Culinary Schedule (Day {day.dayNumber})</span>
              </div>

              <div className="dining-cards-grid">
                {day.dining.breakfast && (
                  <div className="meal-card breakfast">
                    <div className="meal-tag">
                      <Coffee size={12} /> Breakfast
                    </div>
                    <h5>{day.dining.breakfast.name}</h5>
                    <p className="meal-cuisine">{day.dining.breakfast.cuisine}</p>
                    <p className="meal-specialty">"{day.dining.breakfast.specialty}"</p>
                    <span className="meal-price">{formatCurrency(day.dining.breakfast.cost, currency)} est.</span>
                  </div>
                )}

                {day.dining.lunch && (
                  <div className="meal-card lunch">
                    <div className="meal-tag">
                      <Utensils size={12} /> Lunch Spot
                    </div>
                    <h5>{day.dining.lunch.name}</h5>
                    <p className="meal-cuisine">{day.dining.lunch.cuisine}</p>
                    <p className="meal-specialty">"{day.dining.lunch.specialty}"</p>
                    <span className="meal-price">{formatCurrency(day.dining.lunch.cost, currency)} est.</span>
                  </div>
                )}

                {day.dining.dinner && (
                  <div className="meal-card dinner">
                    <div className="meal-tag">
                      <Sparkles size={12} /> Dinner Experience
                    </div>
                    <h5>{day.dining.dinner.name}</h5>
                    <p className="meal-cuisine">{day.dining.dinner.cuisine}</p>
                    <p className="meal-specialty">"{day.dining.dinner.specialty}"</p>
                    <span className="meal-price">{formatCurrency(day.dining.dinner.cost, currency)} est.</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
