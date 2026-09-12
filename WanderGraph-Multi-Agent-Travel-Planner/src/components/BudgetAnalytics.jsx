import React from 'react';
import { 
  DollarSign, 
  PieChart, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  Percent,
  Wallet
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export default function BudgetAnalytics({ budgetAudit, currency, durationDays = 5, travelers = 1 }) {
  if (!budgetAudit) return null;

  const {
    totalCommitted = 0,
    totalUserBudget = 2500,
    remainingSurplus = 0,
    emergencyBuffer = 150,
    categoryBreakdown = [],
    passed = true,
    savingsRecommendation = ''
  } = budgetAudit;

  const perDayCost = Math.round(totalCommitted / Math.max(1, durationDays));
  const perPersonCost = Math.round(totalCommitted / Math.max(1, travelers));
  const percentUsed = Math.min(100, Math.round((totalCommitted / Math.max(1, totalUserBudget)) * 100));

  return (
    <div className="budget-analytics-container">
      {/* Top Metric Cards */}
      <div className="analytics-top-grid">
        <div className="metric-card">
          <div className="metric-icon-wrap bg-blue-subtle text-blue">
            <Wallet size={18} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Total User Budget</span>
            <div className="metric-val">{formatCurrency(totalUserBudget, currency)}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrap bg-emerald-subtle text-emerald">
            <DollarSign size={18} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Committed Expenses</span>
            <div className="metric-val text-emerald">{formatCurrency(totalCommitted, currency)}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrap bg-indigo-subtle text-indigo">
            <TrendingUp size={18} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Estimated Daily Spend</span>
            <div className="metric-val">{formatCurrency(perDayCost, currency)} / day</div>
          </div>
        </div>

        <div className="metric-card">
          <div className={`metric-icon-wrap ${remainingSurplus >= 0 ? 'bg-teal-subtle text-teal' : 'bg-rose-subtle text-rose'}`}>
            {remainingSurplus >= 0 ? <ShieldCheck size={18} /> : <AlertTriangle size={18} />}
          </div>
          <div className="metric-info">
            <span className="metric-label">{remainingSurplus >= 0 ? 'Surplus Reserve' : 'Budget Overage'}</span>
            <div className={`metric-val ${remainingSurplus >= 0 ? 'text-teal' : 'text-rose'}`}>
              {formatCurrency(Math.abs(remainingSurplus), currency)}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="budget-progress-section">
        <div className="progress-header">
          <span>Budget Utilization ({percentUsed}%)</span>
          <span className="budget-status-pill">
            {passed ? <CheckCircle2 size={13} className="text-emerald" /> : <AlertTriangle size={13} className="text-amber" />}
            {passed ? 'Risk Feasibility Passed' : 'Exceeds Envelope Margin'}
          </span>
        </div>
        <div className="budget-progress-track">
          <div 
            className="budget-progress-fill" 
            style={{ 
              width: `${percentUsed}%`,
              background: percentUsed > 95 ? 'linear-gradient(90deg, #38bdf8, #f43f5e)' : 'linear-gradient(90deg, #38bdf8, #818cf8)' 
            }}
          />
        </div>
      </div>

      {/* Category Breakdown Bars */}
      <div className="category-breakdown-section">
        <h4>Agent Category Allocations</h4>
        <div className="category-bars-list">
          {categoryBreakdown.map((cat, idx) => (
            <div key={idx} className="category-bar-item">
              <div className="category-info-row">
                <span className="cat-name">
                  <span className="cat-dot" style={{ backgroundColor: cat.color }} />
                  {cat.category}
                </span>
                <span className="cat-amount">
                  {formatCurrency(cat.amount, currency)} ({cat.percentage}%)
                </span>
              </div>
              <div className="cat-track">
                <div 
                  className="cat-fill" 
                  style={{ width: `${Math.min(100, cat.percentage * 2)}%`, backgroundColor: cat.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Recommendation Notice */}
      {savingsRecommendation && (
        <div className="savings-recommendation-box">
          <Sparkles size={16} className="text-amber" />
          <div className="rec-text">
            <strong>Validator Intelligence Note:</strong> {savingsRecommendation}
          </div>
        </div>
      )}
    </div>
  );
}
