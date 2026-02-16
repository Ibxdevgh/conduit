'use client';

import { useState } from 'react';
import { MERCHANT_NAMES, CATEGORIES } from '@/lib/simulation/constants';

interface PaymentExecutorProps {
  onExecute: (merchantName: string, amount: number, category: string) => void;
  loading: boolean;
  disabled: boolean;
}

export function PaymentExecutor({ onExecute, loading, disabled }: PaymentExecutorProps) {
  const [merchant, setMerchant] = useState(MERCHANT_NAMES[0]);
  const [amount, setAmount] = useState('25.00');
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleExecute = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;
    onExecute(merchant, numAmount, category);
  };

  return (
    <div className="glow-card rounded-lg p-5">
      <h3 className="text-[12px] font-mono text-muted-2 tracking-[0.15em] uppercase mb-4">
        Execute Payment
      </h3>

      <div className="space-y-3">
        {/* Merchant */}
        <div>
          <label className="text-[11px] text-muted-2 font-mono block mb-1.5">
            Merchant
          </label>
          <select
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            disabled={disabled}
            className="w-full bg-surface-2 border border-border rounded px-3 py-2 text-[12px] font-mono text-foreground focus:outline-none focus:border-accent/50 transition-colors disabled:opacity-50"
          >
            {MERCHANT_NAMES.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="text-[11px] text-muted-2 font-mono block mb-1.5">
            Amount (USDC)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.01"
            step="0.01"
            disabled={disabled}
            className="w-full bg-surface-2 border border-border rounded px-3 py-2 text-[13px] font-mono text-foreground focus:outline-none focus:border-accent/50 transition-colors disabled:opacity-50"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-[11px] text-muted-2 font-mono block mb-1.5">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={disabled}
            className="w-full bg-surface-2 border border-border rounded px-3 py-2 text-[12px] font-mono text-foreground focus:outline-none focus:border-accent/50 transition-colors disabled:opacity-50"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Quick amounts */}
        <div className="flex gap-2">
          {['5.00', '25.00', '100.00', '250.00'].map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              disabled={disabled}
              className="flex-1 text-[10px] font-mono text-muted bg-surface-2 py-1.5 rounded hover:text-accent hover:bg-accent/10 transition-colors disabled:opacity-50"
            >
              ${a}
            </button>
          ))}
        </div>

        <button
          onClick={handleExecute}
          disabled={loading || disabled}
          className="w-full py-2.5 bg-accent text-background text-[11px] font-bold tracking-[0.15em] uppercase rounded hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Execute Payment'}
        </button>
      </div>
    </div>
  );
}
