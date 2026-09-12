import React, { useState } from 'react';
import { Settings, Key, Zap, Check, X, Shield, Cpu } from 'lucide-react';

export default function SettingsModal({
  settings,
  onSaveSettings,
  onClose
}) {
  const [formData, setFormData] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container settings-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Settings className="icon-settings" size={20} />
            <h2>Multi-Agent AI Engine Settings</h2>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="settings-form">
          <div className="settings-section">
            <label className="settings-label">
              <Cpu size={16} className="text-accent" />
              <span>Multi-Agent Execution Engine</span>
            </label>
            <div className="provider-options">
              <label className={`provider-card ${formData.provider === 'simulated' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="provider" 
                  value="simulated"
                  checked={formData.provider === 'simulated'}
                  onChange={() => setFormData({ ...formData, provider: 'simulated' })}
                />
                <div>
                  <strong>High-Fidelity Agent Engine (Recommended)</strong>
                  <p>Fast, verified multi-agent graph with deep real-world data and instant execution.</p>
                </div>
              </label>

              <label className={`provider-card ${formData.provider === 'gemini' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="provider" 
                  value="gemini"
                  checked={formData.provider === 'gemini'}
                  onChange={() => setFormData({ ...formData, provider: 'gemini' })}
                />
                <div>
                  <strong>Google Gemini 1.5 Flash API</strong>
                  <p>Direct integration with Google Generative AI endpoint.</p>
                </div>
              </label>

              <label className={`provider-card ${formData.provider === 'openai' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="provider" 
                  value="openai"
                  checked={formData.provider === 'openai'}
                  onChange={() => setFormData({ ...formData, provider: 'openai' })}
                />
                <div>
                  <strong>OpenAI GPT-4o-Mini API</strong>
                  <p>Direct integration with OpenAI Chat Completions endpoint.</p>
                </div>
              </label>
            </div>
          </div>

          {formData.provider === 'gemini' && (
            <div className="settings-input-group">
              <label htmlFor="gemini-key">
                <Key size={14} /> Gemini API Key
              </label>
              <input
                id="gemini-key"
                type="password"
                placeholder="AIzaSy..."
                value={formData.apiKeyGemini || ''}
                onChange={(e) => setFormData({ ...formData, apiKeyGemini: e.target.value })}
                className="custom-input"
              />
            </div>
          )}

          {formData.provider === 'openai' && (
            <div className="settings-input-group">
              <label htmlFor="openai-key">
                <Key size={14} /> OpenAI API Key
              </label>
              <input
                id="openai-key"
                type="password"
                placeholder="sk-..."
                value={formData.apiKeyOpenAI || ''}
                onChange={(e) => setFormData({ ...formData, apiKeyOpenAI: e.target.value })}
                className="custom-input"
              />
            </div>
          )}

          <div className="settings-section">
            <label className="settings-label">
              <Zap size={16} className="text-amber" />
              <span>Simulation & Visualizer Speed</span>
            </label>
            <select
              value={formData.simulationSpeed || 'normal'}
              onChange={(e) => setFormData({ ...formData, simulationSpeed: e.target.value })}
              className="custom-select"
            >
              <option value="fast">Fast (Instant parallel dispatch)</option>
              <option value="normal">Normal (Realistic step-by-step reasoning)</option>
              <option value="slow">Slow (Deep inspection demo mode)</option>
            </select>
          </div>

          <div className="settings-footer">
            <button type="submit" className="save-settings-btn">
              {savedSuccess ? (
                <>
                  <Check size={16} /> Saved!
                </>
              ) : (
                'Save Settings'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
