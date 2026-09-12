// Local storage management for trips, settings, and agent caches
const STORAGE_KEYS = {
  SAVED_TRIPS: 'wandergraph_saved_trips_v1',
  SETTINGS: 'wandergraph_settings_v1',
  CURRENT_TRIP: 'wandergraph_current_trip_v1'
};

const DEFAULT_SETTINGS = {
  currency: 'USD',
  theme: 'dark',
  apiKeyGemini: '',
  apiKeyOpenAI: '',
  provider: 'simulated', // 'simulated' | 'gemini' | 'openai'
  simulationSpeed: 'normal' // 'fast' | 'normal' | 'slow'
};

export function getSavedTrips() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_TRIPS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load saved trips', e);
    return [];
  }
}

export function saveTrip(trip) {
  try {
    const trips = getSavedTrips();
    const existingIndex = trips.findIndex(t => t.id === trip.id);
    let updatedTrips;
    if (existingIndex >= 0) {
      updatedTrips = [...trips];
      updatedTrips[existingIndex] = { ...trip, updatedAt: new Date().toISOString() };
    } else {
      updatedTrips = [{ ...trip, id: trip.id || `trip_${Date.now()}`, createdAt: new Date().toISOString() }, ...trips];
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_TRIPS, JSON.stringify(updatedTrips));
    return updatedTrips;
  } catch (e) {
    console.error('Failed to save trip', e);
    return [];
  }
}

export function deleteSavedTrip(id) {
  try {
    const trips = getSavedTrips().filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.SAVED_TRIPS, JSON.stringify(trips));
    return trips;
  } catch (e) {
    console.error('Failed to delete trip', e);
    return [];
  }
}

export function getSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}

export function getCurrentTrip() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_TRIP);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setCurrentTrip(trip) {
  try {
    if (trip) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_TRIP, JSON.stringify(trip));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_TRIP);
    }
  } catch (e) {
    console.error('Failed to set current trip', e);
  }
}
