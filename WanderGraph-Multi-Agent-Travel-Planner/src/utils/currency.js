// Currency conversion rates and formatting utility
export const EXCHANGE_RATES = {
  USD: { symbol: '$', rate: 1.0, name: 'USD - US Dollar' },
  EUR: { symbol: '€', rate: 0.92, name: 'EUR - Euro' },
  GBP: { symbol: '£', rate: 0.79, name: 'GBP - British Pound' },
  JPY: { symbol: '¥', rate: 154.5, name: 'JPY - Japanese Yen' },
  CAD: { symbol: 'CA$', rate: 1.36, name: 'CAD - Canadian Dollar' },
  AUD: { symbol: 'A$', rate: 1.52, name: 'AUD - Australian Dollar' },
  INR: { symbol: '₹', rate: 84.2, name: 'INR - Indian Rupee' },
  CHF: { symbol: 'CHF', rate: 0.90, name: 'CHF - Swiss Franc' },
  SGD: { symbol: 'S$', rate: 1.35, name: 'SGD - Singapore Dollar' },
};

export function formatCurrency(amountInUSD, targetCurrency = 'USD') {
  const curr = EXCHANGE_RATES[targetCurrency] || EXCHANGE_RATES.USD;
  const converted = (amountInUSD || 0) * curr.rate;
  
  if (targetCurrency === 'JPY') {
    return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
  }
  
  return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
}

export function convertFromUSD(amountInUSD, targetCurrency = 'USD') {
  const curr = EXCHANGE_RATES[targetCurrency] || EXCHANGE_RATES.USD;
  return Math.round((amountInUSD || 0) * curr.rate);
}

export function convertToUSD(amountInTargetCurrency, targetCurrency = 'USD') {
  const curr = EXCHANGE_RATES[targetCurrency] || EXCHANGE_RATES.USD;
  return Math.round((amountInTargetCurrency || 0) / curr.rate);
}
