import React from 'react';
import { 
  Bot, 
  Plane, 
  Hotel, 
  Compass, 
  Utensils, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  Sparkles,
  GitBranch
} from 'lucide-react';

const AGENT_META = {
  orchestrator: {
    title: 'Orchestrator Meta-Agent',
    role: 'Decomposes intent, assigns budget envelopes & coordinates graph',
    icon: Bot,
    color: '#38bdf8'
  },
  flight: {
    title: 'Flight & Transit Agent',
    role: 'Searches optimal air routes, airlines & departure schedules',
    icon: Plane,
    color: '#0ea5e9'
  },
  accommodation: {
    title: 'Accommodation Agent',
    role: 'Evaluates stays, ratings, safety index & total costs',
    icon: Hotel,
    color: '#818cf8'
  },
  activity: {
    title: 'Activity & Sights Agent',
    role: 'Clusters attractions by geographic distance & interest',
    icon: Compass,
    color: '#34d399'
  },
  dining: {
    title: 'Culinary & Dining Agent',
    role: 'Matches dietary requirements & authentic restaurants',
    icon: Utensils,
    color: '#fbbf24'
  },
  validator: {
    title: 'Budget & Risk Validator',
    role: 'Audits spending vs budget ceiling & reserves safety buffer',
    icon: ShieldCheck,
    color: '#f43f5e'
  },
  synthesis: {
    title: 'Synthesis & Layout Agent',
    role: 'Assembles coherent day-by-day interactive itinerary & map',
    icon: Sparkles,
    color: '#c084fc'
  }
};

export default function AgentGraphVisualizer({ nodeStates = {}, isRunning }) {
  const getNodeStatus = (id) => nodeStates[id] || { status: 'idle', details: '' };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="node-status-badge active">
            <Loader2 size={12} className="animate-spin" />
            <span>Thinking</span>
          </span>
        );
      case 'completed':
        return (
          <span className="node-status-badge completed">
            <CheckCircle2 size={12} />
            <span>Ready</span>
          </span>
        );
      case 'error':
        return (
          <span className="node-status-badge error">
            <AlertCircle size={12} />
            <span>Error</span>
          </span>
        );
      default:
        return (
          <span className="node-status-badge idle">
            <span>Standby</span>
          </span>
        );
    }
  };

  return (
    <div className="agent-graph-container">
      <div className="graph-header">
        <div className="graph-title-row">
          <GitBranch size={16} className="text-accent" />
          <h3>Autonomous Agent Graph Execution</h3>
        </div>
        <div className="graph-legend">
          <span className="legend-item"><span className="legend-dot active"></span> In Progress</span>
          <span className="legend-item"><span className="legend-dot completed"></span> Completed</span>
          <span className="legend-item"><span className="legend-dot idle"></span> Standby</span>
        </div>
      </div>

      <div className="graph-nodes-wrapper">
        {/* Stage 1: Orchestrator */}
        <div className="graph-column column-orchestrator">
          <div className="column-label">META-CONTROLLER</div>
          <div className={`agent-node-card ${getNodeStatus('orchestrator').status}`}>
            <div className="node-icon-wrap" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
              <Bot size={20} />
            </div>
            <div className="node-content">
              <div className="node-title-row">
                <h4>{AGENT_META.orchestrator.title}</h4>
                {renderStatusBadge(getNodeStatus('orchestrator').status)}
              </div>
              <p className="node-role">{AGENT_META.orchestrator.role}</p>
              {getNodeStatus('orchestrator').details && (
                <div className="node-detail-snippet">{getNodeStatus('orchestrator').details}</div>
              )}
            </div>
          </div>
        </div>

        {/* Connector Column */}
        <div className="graph-connector-col">
          <div className="connector-svg-wrap">
            <svg width="30" height="280" viewBox="0 0 30 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 140 H15 V35 H30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="connector-line" />
              <path d="M0 140 H15 V105 H30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="connector-line" />
              <path d="M0 140 H15 V175 H30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="connector-line" />
              <path d="M0 140 H15 V245 H30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="connector-line" />
            </svg>
          </div>
        </div>

        {/* Stage 2: Specialized Parallel Agents */}
        <div className="graph-column column-specialists">
          <div className="column-label">PARALLEL SPECIALIZED AGENTS</div>
          <div className="specialists-stack">
            {['flight', 'accommodation', 'activity', 'dining'].map(agentKey => {
              const meta = AGENT_META[agentKey];
              const node = getNodeStatus(agentKey);
              const Icon = meta.icon;
              return (
                <div key={agentKey} className={`agent-node-card mini ${node.status}`}>
                  <div className="node-icon-wrap" style={{ backgroundColor: `${meta.color}22`, color: meta.color }}>
                    <Icon size={16} />
                  </div>
                  <div className="node-content">
                    <div className="node-title-row">
                      <h4>{meta.title}</h4>
                      {renderStatusBadge(node.status)}
                    </div>
                    {node.details ? (
                      <div className="node-detail-snippet">{node.details}</div>
                    ) : (
                      <p className="node-role">{meta.role}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Connector Column 2 */}
        <div className="graph-connector-col">
          <div className="connector-svg-wrap">
            <svg width="30" height="280" viewBox="0 0 30 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 35 H15 V140 H30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="connector-line" />
              <path d="M0 105 H15 V140 H30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="connector-line" />
              <path d="M0 175 H15 V140 H30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="connector-line" />
              <path d="M0 245 H15 V140 H30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="connector-line" />
            </svg>
          </div>
        </div>

        {/* Stage 3: Validator & Final Synthesis */}
        <div className="graph-column column-synthesis">
          <div className="column-label">VALIDATION & SYNTHESIS</div>
          <div className="synthesis-stack">
            {['validator', 'synthesis'].map(agentKey => {
              const meta = AGENT_META[agentKey];
              const node = getNodeStatus(agentKey);
              const Icon = meta.icon;
              return (
                <div key={agentKey} className={`agent-node-card ${node.status}`}>
                  <div className="node-icon-wrap" style={{ backgroundColor: `${meta.color}22`, color: meta.color }}>
                    <Icon size={18} />
                  </div>
                  <div className="node-content">
                    <div className="node-title-row">
                      <h4>{meta.title}</h4>
                      {renderStatusBadge(node.status)}
                    </div>
                    <p className="node-role">{meta.role}</p>
                    {node.details && (
                      <div className="node-detail-snippet">{node.details}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
