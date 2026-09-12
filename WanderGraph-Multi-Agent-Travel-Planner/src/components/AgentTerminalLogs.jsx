import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Copy, Check, Trash2, ArrowDownCircle, Cpu } from 'lucide-react';

const AGENT_COLORS = {
  orchestrator: { badge: 'ORCHESTRATOR', color: '#38bdf8' },
  flight: { badge: 'FLIGHT-AGENT', color: '#0ea5e9' },
  accommodation: { badge: 'STAY-AGENT', color: '#818cf8' },
  activity: { badge: 'ACTIVITY-AGENT', color: '#34d399' },
  dining: { badge: 'DINING-AGENT', color: '#fbbf24' },
  validator: { badge: 'VALIDATOR-NODE', color: '#f43f5e' }
};

export default function AgentTerminalLogs({ logs = [], isRunning }) {
  const [selectedAgent, setSelectedAgent] = useState('all');
  const [autoScroll, setAutoScroll] = useState(true);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);

  const filteredLogs = selectedAgent === 'all' 
    ? logs 
    : logs.filter(l => l.agent === selectedAgent);

  useEffect(() => {
    if (autoScroll && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, autoScroll]);

  const handleCopy = () => {
    const text = logs.map(l => `[${l.timestamp}] [${(l.agent || 'SYSTEM').toUpperCase()}] [${(l.type || 'INFO').toUpperCase()}] ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLogTypeBadge = (type) => {
    switch (type) {
      case 'tool':
        return <span className="log-type-tag tool">TOOL_CALL</span>;
      case 'think':
        return <span className="log-type-tag think">REASONING</span>;
      case 'negotiate':
        return <span className="log-type-tag negotiate">NEGO_LOOP</span>;
      case 'success':
        return <span className="log-type-tag success">SUCCESS</span>;
      case 'warning':
        return <span className="log-type-tag warning">WARN</span>;
      case 'error':
        return <span className="log-type-tag error">ERROR</span>;
      default:
        return <span className="log-type-tag info">INFO</span>;
    }
  };

  return (
    <div className="terminal-logs-card">
      <div className="terminal-header">
        <div className="terminal-title-group">
          <Terminal size={16} className="terminal-icon" />
          <span>Autonomous Agent Reasoning Stream</span>
          {isRunning && (
            <span className="live-pill">
              <span className="live-dot pulse"></span> LIVE STREAM
            </span>
          )}
        </div>

        <div className="terminal-actions">
          <button 
            className={`terminal-action-btn ${autoScroll ? 'active' : ''}`}
            onClick={() => setAutoScroll(!autoScroll)}
            title="Toggle Auto-scroll"
          >
            <ArrowDownCircle size={14} />
            <span className="hide-mobile">Auto-scroll</span>
          </button>
          <button 
            className="terminal-action-btn"
            onClick={handleCopy}
            title="Copy Logs to Clipboard"
          >
            {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
            <span className="hide-mobile">{copied ? 'Copied' : 'Copy Logs'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="terminal-agent-tabs">
        <button
          className={`agent-tab-btn ${selectedAgent === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedAgent('all')}
        >
          All Agents ({logs.length})
        </button>
        {Object.keys(AGENT_COLORS).map(key => {
          const count = logs.filter(l => l.agent === key).length;
          return (
            <button
              key={key}
              className={`agent-tab-btn ${selectedAgent === key ? 'active' : ''}`}
              onClick={() => setSelectedAgent(key)}
              style={{
                borderColor: selectedAgent === key ? AGENT_COLORS[key].color : 'transparent',
                color: selectedAgent === key ? AGENT_COLORS[key].color : 'inherit'
              }}
            >
              {AGENT_COLORS[key].badge} ({count})
            </button>
          );
        })}
      </div>

      {/* Console output body */}
      <div className="terminal-body">
        {filteredLogs.length === 0 ? (
          <div className="terminal-empty-state">
            <Cpu size={24} className="empty-icon" />
            <p>Agent reasoning stream ready. Configure your trip details above and launch the graph.</p>
          </div>
        ) : (
          filteredLogs.map(log => {
            const meta = AGENT_COLORS[log.agent] || { badge: 'SYSTEM', color: '#94a3b8' };
            return (
              <div key={log.id} className="terminal-log-line">
                <span className="log-timestamp">{log.timestamp}</span>
                <span className="log-agent-badge" style={{ color: meta.color, borderColor: `${meta.color}44` }}>
                  [{meta.badge}]
                </span>
                {getLogTypeBadge(log.type)}
                <span className={`log-message ${log.type}`}>
                  {log.message}
                </span>
              </div>
            );
          })
        )}
        {isRunning && (
          <div className="terminal-cursor-line">
            <span className="cursor-indicator animate-pulse">▋</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
