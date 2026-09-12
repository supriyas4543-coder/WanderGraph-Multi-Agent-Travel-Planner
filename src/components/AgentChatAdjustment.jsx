import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  RefreshCw, 
  MessageSquare, 
  ArrowRight,
  Zap
} from 'lucide-react';

const QUICK_PROMPTS = [
  '💡 Make the itinerary more budget-friendly',
  '✨ Upgrade hotel to a 5-Star Luxury suite',
  '🍜 Add more authentic local food & market tours',
  '🌿 Shift to a leisurely and relaxed pace',
  '🏛️ Prioritize iconic historical monuments'
];

export default function AgentChatAdjustment({ onSendInstruction, isRefining }) {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'agent',
      text: 'Hello! I am your Multi-Agent Trip Assistant. You can ask me to dynamically adapt your itinerary (e.g. adjust budget, swap hotel style, or alter daily pacing).'
    }
  ]);

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim() || isRefining) return;

    // Add user message
    const newHistory = [
      ...chatHistory,
      { sender: 'user', text: query }
    ];
    setChatHistory(newHistory);
    setInputText('');

    // Trigger agent refinement
    onSendInstruction(query, (agentReply) => {
      setChatHistory(prev => [
        ...prev,
        { sender: 'agent', text: agentReply || 'I have re-negotiated with the specialized agents and updated your itinerary accordingly!' }
      ]);
    });
  };

  return (
    <div className="agent-chat-drawer-card">
      <div className="chat-header">
        <div className="chat-title-row">
          <Bot size={18} className="text-accent" />
          <h4>Dynamic Agent Refinement Chat</h4>
        </div>
        <span className="chat-subtitle">Direct interactive loop with the Orchestrator</span>
      </div>

      {/* Quick Suggestion Pills */}
      <div className="quick-prompts-bar">
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            className="quick-prompt-chip"
            onClick={() => handleSend(prompt)}
            disabled={isRefining}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="chat-messages-container">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`chat-bubble-row ${msg.sender}`}>
            {msg.sender === 'agent' && (
              <div className="agent-avatar">
                <Bot size={14} />
              </div>
            )}
            <div className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isRefining && (
          <div className="chat-bubble-row agent">
            <div className="agent-avatar">
              <RefreshCw size={14} className="animate-spin text-accent" />
            </div>
            <div className="chat-bubble agent thinking">
              <span className="dot pulse"></span> Re-evaluating sub-agent graph...
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="chat-input-bar">
        <input
          type="text"
          placeholder="e.g. 'Can you cut $200 from accommodation and add an art tour?'"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isRefining}
          className="chat-text-input"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isRefining}
          className="chat-send-btn"
          aria-label="Send refinement instruction"
        >
          {isRefining ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
        </button>
      </form>
    </div>
  );
}
