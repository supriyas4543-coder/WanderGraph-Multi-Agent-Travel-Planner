import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  DollarSign, 
  Users, 
  Compass, 
  Plane, 
  Hotel, 
  Luggage, 
  PieChart, 
  Download, 
  Printer, 
  Bookmark, 
  Share2, 
  Sparkles, 
  Check, 
  Leaf, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import DayCard from './DayCard';
import InteractiveMap from './InteractiveMap';
import BudgetAnalytics from './BudgetAnalytics';
import PackingAndWeather from './PackingAndWeather';
import AgentChatAdjustment from './AgentChatAdjustment';
import { formatCurrency } from '../utils/currency';
import { generateICS, downloadICSFile } from '../utils/icalExporter';

export default function ItineraryView({
  plan,
  currency,
  onSaveTrip,
  isSaved,
  onRefineInstruction,
  isRefining
}) {
  const [activeTab, setActiveTab] = useState('timeline');
  const [focusedMarker, setFocusedMarker] = useState(null);
  const [shareCopied, setShareCopied] = useState(false);

  if (!plan) return null;

  const handleExportICS = () => {
    const ics = generateICS(plan, plan.tripInput);
    const filename = `${plan.shortName.toLowerCase().replace(/\s+/g, '_')}_itinerary.ics`;
    downloadICSFile(filename, ics);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  const handleFocusMarker = (coords, title) => {
    setFocusedMarker(coords);
    setActiveTab('map');
  };

  return (
    <div className="itinerary-master-view">
      {/* Hero Showcase Banner */}
      <div className="itinerary-hero-banner">
        <div className="hero-img-wrap">
          <img src={plan.heroImage} alt={plan.destination} className="hero-background-img" />
          <div className="hero-gradient-overlay"></div>
        </div>

        <div className="hero-content-container">
          <div className="hero-top-badges">
            <span className="badge-agent-verified">
              <Sparkles size={13} /> Multi-Agent Synthesized & Audited
            </span>
            <span className="badge-timing">
              <Clock size={13} /> Graph Execution: {(plan.orchestrationTimeMs / 1000).toFixed(2)}s
            </span>
          </div>

          <h2 className="hero-destination-title">{plan.destination}</h2>
          <p className="hero-tagline">{plan.tagline}</p>

          <div className="hero-meta-chips">
            <span className="hero-chip">
              <Calendar size={14} /> {plan.dates.start} to {plan.dates.end} ({plan.durationDays} Days)
            </span>
            <span className="hero-chip">
              <Users size={14} /> {plan.tripInput.travelers} Guest{plan.tripInput.travelers > 1 ? 's' : ''}
            </span>
            <span className="hero-chip highlight-cost">
              <DollarSign size={14} /> {formatCurrency(plan.budgetAudit.totalCommitted, currency)} Total Spend
            </span>
            <span className="hero-chip">
              <Compass size={14} /> {plan.tripInput.pace?.toUpperCase()} Pace
            </span>
          </div>

          {/* Quick Action Buttons */}
          <div className="hero-action-buttons">
            <button 
              className={`hero-action-btn save-btn ${isSaved ? 'saved' : ''}`}
              onClick={onSaveTrip}
            >
              <Bookmark size={15} />
              <span>{isSaved ? 'Trip Saved' : 'Save Itinerary'}</span>
            </button>

            <button 
              className="hero-action-btn export-btn"
              onClick={handleExportICS}
              title="Download iCal for Apple/Google/Outlook Calendar"
            >
              <Download size={15} />
              <span>Sync to iCal</span>
            </button>

            <button 
              className="hero-action-btn print-btn"
              onClick={handlePrint}
              title="Print or Save as PDF"
            >
              <Printer size={15} />
              <span>Print / PDF</span>
            </button>

            <button 
              className="hero-action-btn share-btn"
              onClick={handleShare}
            >
              {shareCopied ? <Check size={15} className="text-emerald" /> : <Share2 size={15} />}
              <span>{shareCopied ? 'Link Copied!' : 'Share Trip'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="itinerary-nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'timeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('timeline')}
        >
          <Calendar size={16} />
          <span>Day-by-Day Timeline ({plan.days.length})</span>
        </button>

        <button 
          className={`nav-tab ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <MapPin size={16} />
          <span>Interactive Geo-Map</span>
        </button>

        <button 
          className={`nav-tab ${activeTab === 'logistics' ? 'active' : ''}`}
          onClick={() => setActiveTab('logistics')}
        >
          <Plane size={16} />
          <span>Flights & Hotel Base</span>
        </button>

        <button 
          className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <PieChart size={16} />
          <span>Budget & Risk Analytics</span>
        </button>

        <button 
          className={`nav-tab ${activeTab === 'packing' ? 'active' : ''}`}
          onClick={() => setActiveTab('packing')}
        >
          <Luggage size={16} />
          <span>Packing & Climate</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="tab-view-body">
        {/* TAB 1: DAY BY DAY TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="timeline-view-wrapper">
            <div className="days-stack">
              {plan.days.map((day) => (
                <DayCard 
                  key={day.dayNumber} 
                  day={day} 
                  currency={currency} 
                  onFocusMarker={handleFocusMarker}
                />
              ))}
            </div>

            {/* Dynamic AI Refinement Sidebar */}
            <div className="refinement-sidebar">
              <AgentChatAdjustment 
                onSendInstruction={onRefineInstruction}
                isRefining={isRefining}
              />
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE MAP */}
        {activeTab === 'map' && (
          <div className="map-view-wrapper">
            <InteractiveMap 
              markers={plan.mapMarkers} 
              center={plan.coords}
              destinationName={plan.destination}
              focusedCoords={focusedMarker}
            />
          </div>
        )}

        {/* TAB 3: FLIGHTS & HOTEL LOGISTICS */}
        {activeTab === 'logistics' && (
          <div className="logistics-view-wrapper">
            {/* Flight Summary Card */}
            {plan.flight && (
              <div className="logistics-card flight-card">
                <div className="logistics-card-header">
                  <div className="header-icon-title">
                    <Plane size={20} className="text-cyan" />
                    <div>
                      <h3>Flight & Transit Booking</h3>
                      <p>Curated by Flight Agent • Code: {plan.flight.bookingCode}</p>
                    </div>
                  </div>
                  <div className="price-tag">
                    {formatCurrency(plan.flight.totalCost, currency)}
                    <span>total ({plan.tripInput.travelers} pax)</span>
                  </div>
                </div>

                <div className="flight-route-visual">
                  <div className="flight-endpoint">
                    <span className="airport-code">{plan.tripInput.origin.split(' ')[0]}</span>
                    <span className="time">{plan.flight.departureTime}</span>
                    <span className="desc">{plan.flight.originAirport}</span>
                  </div>

                  <div className="flight-mid-line">
                    <span className="flight-duration">{plan.flight.duration}</span>
                    <div className="route-line-graphic">
                      <span className="dot"></span>
                      <span className="line"></span>
                      <Plane size={14} className="plane-icon" />
                      <span className="line"></span>
                      <span className="dot"></span>
                    </div>
                    <span className="flight-type">{plan.flight.flightType}</span>
                  </div>

                  <div className="flight-endpoint">
                    <span className="airport-code">{plan.shortName}</span>
                    <span className="time">{plan.flight.arrivalTime}</span>
                    <span className="desc">{plan.flight.destinationAirport}</span>
                  </div>
                </div>

                <div className="flight-footer-meta">
                  <div className="meta-item">
                    <strong>Airline:</strong> {plan.flight.airline} ({plan.flight.code})
                  </div>
                  <div className="meta-item">
                    <strong>Baggage:</strong> {plan.flight.baggageAllowance}
                  </div>
                  <div className="meta-item eco">
                    <Leaf size={14} className="text-emerald" />
                    <span>Est. Carbon: {plan.flight.carbonKg} kg CO2e</span>
                  </div>
                </div>
              </div>
            )}

            {/* Accommodation Card */}
            {plan.accommodation && (
              <div className="logistics-card hotel-card">
                <div className="logistics-card-header">
                  <div className="header-icon-title">
                    <Hotel size={20} className="text-indigo" />
                    <div>
                      <h3>Basecamp Accommodation</h3>
                      <p>Curated by Stay Agent • {plan.accommodation.location}</p>
                    </div>
                  </div>
                  <div className="price-tag">
                    {formatCurrency(plan.accommodation.totalCost, currency)}
                    <span>{plan.durationNights} nights ({formatCurrency(plan.accommodation.pricePerNight, currency)}/nt)</span>
                  </div>
                </div>

                <div className="hotel-body-grid">
                  <div className="hotel-main-details">
                    <h4>{plan.accommodation.name}</h4>
                    <div className="hotel-sub-badges">
                      <span className="rating-pill">⭐ {plan.accommodation.rating} / 5.0</span>
                      <span className="tier-pill">{plan.accommodation.tier.toUpperCase()} TIER</span>
                      <span className="safety-pill">
                        <ShieldCheck size={13} /> Safety Index: {plan.accommodation.neighborhoodSafety}/10
                      </span>
                    </div>
                    <p className="room-type-text">
                      <strong>Selected Layout:</strong> {plan.accommodation.roomType}
                    </p>
                    <div className="check-dates-row">
                      <span><strong>Check-in:</strong> {plan.accommodation.checkIn}</span>
                      <span><strong>Check-out:</strong> {plan.accommodation.checkOut}</span>
                    </div>
                  </div>

                  <div className="hotel-amenities-list">
                    <h5>Included Amenities & Perks</h5>
                    <div className="amenities-chips">
                      {(plan.accommodation.amenities || []).map((am, i) => (
                        <span key={i} className="amenity-chip">
                          <Check size={12} className="text-emerald" /> {am}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: BUDGET & RISK ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="analytics-view-wrapper">
            <BudgetAnalytics 
              budgetAudit={plan.budgetAudit} 
              currency={currency}
              durationDays={plan.durationDays}
              travelers={plan.tripInput.travelers}
            />
          </div>
        )}

        {/* TAB 5: PACKING & CLIMATE */}
        {activeTab === 'packing' && (
          <div className="packing-view-wrapper">
            <PackingAndWeather 
              weather={plan.weather} 
              destinationName={plan.shortName}
            />
          </div>
        )}
      </div>
    </div>
  );
}
