import React from 'react';
import { Bookmark, Trash2, Calendar, MapPin, DollarSign, X, ExternalLink, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export default function SavedTripsModal({
  savedTrips = [],
  onLoadTrip,
  onDeleteTrip,
  onClose,
  currency
}) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container saved-trips-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Bookmark className="icon-saved" size={20} />
            <h2>Your Saved Multi-Agent Itineraries</h2>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {savedTrips.length === 0 ? (
          <div className="empty-saved-state">
            <p>You haven’t saved any trips yet. Generate an itinerary and click "Save Itinerary" to store it here.</p>
          </div>
        ) : (
          <div className="saved-trips-list">
            {savedTrips.map((trip) => (
              <div key={trip.id} className="saved-trip-item-card">
                <div className="saved-trip-img-col">
                  <img src={trip.heroImage} alt={trip.destination} className="saved-trip-thumb" />
                </div>

                <div className="saved-trip-details-col">
                  <h4>{trip.destination}</h4>
                  <div className="saved-trip-meta">
                    <span><Calendar size={13} /> {trip.dates.start} to {trip.dates.end}</span>
                    <span><DollarSign size={13} /> {formatCurrency(trip.budgetAudit.totalCommitted, currency)}</span>
                  </div>
                  <span className="saved-timestamp">
                    Created: {new Date(trip.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="saved-trip-actions-col">
                  <button 
                    className="load-trip-btn"
                    onClick={() => { onLoadTrip(trip); onClose(); }}
                  >
                    <span>View Trip</span>
                    <ArrowRight size={14} />
                  </button>
                  <button 
                    className="delete-trip-btn"
                    onClick={() => onDeleteTrip(trip.id)}
                    title="Delete saved trip"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
