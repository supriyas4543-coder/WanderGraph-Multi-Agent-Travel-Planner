import React, { useState } from 'react';
import { 
  CloudSun, 
  Luggage, 
  CheckSquare, 
  Square, 
  Plus, 
  Trash2, 
  Sparkles, 
  Shirt, 
  Smartphone, 
  FileText, 
  Shield 
} from 'lucide-react';

const DEFAULT_PACKING_CATEGORIES = [
  {
    category: 'Travel Essentials & Documents',
    icon: FileText,
    items: ['Passport & Photocopies', 'Flight Boarding Passes', 'Travel Health Insurance details', 'Credit & Contactless Cards', 'Driver License / ID']
  },
  {
    category: 'Clothing & Footwear',
    icon: Shirt,
    items: ['Comfortable all-day walking sneakers', 'Weather-appropriate breathable layers', 'Evening dinner outfit', 'Rain jacket / compact umbrella', 'Sleepwear & socks']
  },
  {
    category: 'Electronics & Gadgets',
    icon: Smartphone,
    items: ['Universal travel power adapter', 'High-capacity power bank', 'Phone charging cables', 'Noise-canceling headphones', 'eSIM / Local SIM activator']
  },
  {
    category: 'Health & Toiletries',
    icon: Shield,
    items: ['Personal prescription medications', 'Travel-size sunscreen & lip balm', 'Hand sanitizer & wipes', 'Electrolyte hydration packets', 'Mini first-aid blister plasters']
  }
];

export default function PackingAndWeather({ weather, destinationName = 'Destination' }) {
  const [checkedItems, setCheckedItems] = useState({});
  const [customItems, setCustomItems] = useState([]);
  const [newCustomInput, setNewCustomInput] = useState('');

  const toggleItem = (name) => {
    setCheckedItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!newCustomInput.trim()) return;
    setCustomItems([...customItems, newCustomInput.trim()]);
    setNewCustomInput('');
  };

  const removeCustom = (index) => {
    setCustomItems(customItems.filter((_, i) => i !== index));
  };

  // Weather-suggested items
  const weatherItems = weather?.packing || ['Comfortable walking shoes', 'Layered clothing', 'Power adapter'];

  return (
    <div className="packing-weather-container">
      {/* Weather Forecast Card */}
      <div className="weather-overview-card">
        <div className="weather-icon-badge">
          <CloudSun size={32} className="text-amber animate-pulse" />
        </div>
        <div className="weather-info">
          <div className="weather-badge">Climate Advisory for {destinationName}</div>
          <div className="weather-temp-row">
            <span className="weather-temp">{weather?.temp || '20°C / 68°F'}</span>
            <span className="weather-condition">• {weather?.condition || 'Pleasant & Mild'}</span>
          </div>
          <p className="weather-advice">
            Recommended gear: {(weather?.packing || []).join(', ')}.
          </p>
        </div>
      </div>

      {/* Interactive Packing Checklist */}
      <div className="packing-checklist-section">
        <div className="checklist-header">
          <div className="checklist-title">
            <Luggage size={18} className="text-accent" />
            <h3>Dynamic Trip Packing Checklist</h3>
          </div>
        </div>

        {/* Destination-Specific Smart Pack */}
        <div className="packing-group destination-special">
          <div className="group-title-row">
            <Sparkles size={15} className="text-cyan" />
            <h4>Destination Climate & Terrain Essentials</h4>
          </div>
          <div className="items-grid">
            {weatherItems.map((item, idx) => {
              const isChecked = !!checkedItems[`weather-${idx}`];
              return (
                <div 
                  key={idx} 
                  className={`packing-item-card ${isChecked ? 'checked' : ''}`}
                  onClick={() => toggleItem(`weather-${idx}`)}
                >
                  {isChecked ? <CheckSquare size={16} className="text-emerald" /> : <Square size={16} />}
                  <span className="item-text">{item}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Standard Categories */}
        {DEFAULT_PACKING_CATEGORIES.map((cat, catIdx) => {
          const Icon = cat.icon;
          return (
            <div key={catIdx} className="packing-group">
              <div className="group-title-row">
                <Icon size={15} className="text-accent" />
                <h4>{cat.category}</h4>
              </div>
              <div className="items-grid">
                {cat.items.map((item, itemIdx) => {
                  const key = `cat-${catIdx}-${itemIdx}`;
                  const isChecked = !!checkedItems[key];
                  return (
                    <div 
                      key={key} 
                      className={`packing-item-card ${isChecked ? 'checked' : ''}`}
                      onClick={() => toggleItem(key)}
                    >
                      {isChecked ? <CheckSquare size={16} className="text-emerald" /> : <Square size={16} />}
                      <span className="item-text">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Custom Items */}
        <div className="packing-group custom-group">
          <div className="group-title-row">
            <Plus size={15} className="text-purple" />
            <h4>Custom Items</h4>
          </div>

          <form onSubmit={handleAddCustom} className="custom-item-form">
            <input
              type="text"
              placeholder="Add your own item (e.g. Scuba mask, Camera tripod)..."
              value={newCustomInput}
              onChange={(e) => setNewCustomInput(e.target.value)}
              className="custom-item-input"
            />
            <button type="submit" className="add-custom-btn">
              <Plus size={14} /> Add
            </button>
          </form>

          {customItems.length > 0 && (
            <div className="items-grid">
              {customItems.map((item, idx) => {
                const key = `custom-${idx}`;
                const isChecked = !!checkedItems[key];
                return (
                  <div key={key} className={`packing-item-card ${isChecked ? 'checked' : ''}`}>
                    <div className="item-left" onClick={() => toggleItem(key)}>
                      {isChecked ? <CheckSquare size={16} className="text-emerald" /> : <Square size={16} />}
                      <span className="item-text">{item}</span>
                    </div>
                    <button 
                      className="delete-custom-btn" 
                      onClick={(e) => { e.stopPropagation(); removeCustom(idx); }}
                      title="Remove custom item"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
