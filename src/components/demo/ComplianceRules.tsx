'use client';

import type { ComplianceRules as ComplianceRulesType } from '@/lib/simulation/types';
import { CATEGORIES } from '@/lib/simulation/constants';

interface ComplianceRulesProps {
  compliance: ComplianceRulesType;
  onUpdate: (updates: Partial<ComplianceRulesType>) => void;
  disabled: boolean;
}

export function ComplianceRules({ compliance, onUpdate, disabled }: ComplianceRulesProps) {
  const toggleCategory = (cat: string) => {
    const current = compliance.allowedCategories;
    const updated = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];
    onUpdate({ allowedCategories: updated });
  };

  return (
    <div className="glow-card rounded-lg p-5">
      <h3 className="text-[12px] font-mono text-muted-2 tracking-[0.15em] uppercase mb-4">
        Compliance Rules
      </h3>

      <div className="space-y-4">
        {/* Daily Limit */}
        <div>
          <div className="flex justify-between text-[11px] font-mono mb-1.5">
            <span className="text-muted-2">Daily Limit</span>
            <span className="text-accent">${compliance.dailyLimit.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={compliance.dailyLimit}
            onChange={(e) => onUpdate({ dailyLimit: Number(e.target.value) })}
            disabled={disabled}
            className="w-full h-1.5 bg-surface-2 rounded-full appearance-none cursor-pointer accent-accent disabled:opacity-50"
          />
        </div>

        {/* Per-Tx Limit */}
        <div>
          <div className="flex justify-between text-[11px] font-mono mb-1.5">
            <span className="text-muted-2">Per-Tx Limit</span>
            <span className="text-accent">${compliance.perTxLimit.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="10"
            max="2000"
            step="10"
            value={compliance.perTxLimit}
            onChange={(e) => onUpdate({ perTxLimit: Number(e.target.value) })}
            disabled={disabled}
            className="w-full h-1.5 bg-surface-2 rounded-full appearance-none cursor-pointer accent-accent disabled:opacity-50"
          />
        </div>

        {/* Velocity Limit */}
        <div>
          <div className="flex justify-between text-[11px] font-mono mb-1.5">
            <span className="text-muted-2">Velocity Limit</span>
            <span className="text-accent">{compliance.velocityLimit} tx/hr</span>
          </div>
          <input
            type="range"
            min="1"
            max="120"
            step="1"
            value={compliance.velocityLimit}
            onChange={(e) => onUpdate({ velocityLimit: Number(e.target.value) })}
            disabled={disabled}
            className="w-full h-1.5 bg-surface-2 rounded-full appearance-none cursor-pointer accent-accent disabled:opacity-50"
          />
        </div>

        {/* Categories */}
        <div>
          <span className="text-[11px] font-mono text-muted-2 block mb-2">
            Merchant Categories
          </span>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => {
              const active = compliance.allowedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  disabled={disabled}
                  className={`text-[10px] font-mono px-2 py-1 rounded border transition-colors disabled:opacity-50 ${
                    active
                      ? 'border-accent/30 text-accent bg-accent/10'
                      : 'border-border text-muted-3 bg-surface'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Geo Restriction */}
        <div>
          <span className="text-[11px] font-mono text-muted-2 block mb-1.5">
            Geo Policy
          </span>
          <select
            value={compliance.geoRestriction}
            onChange={(e) => onUpdate({ geoRestriction: e.target.value })}
            disabled={disabled}
            className="w-full bg-surface-2 border border-border rounded px-3 py-2 text-[12px] font-mono text-foreground focus:outline-none focus:border-accent/50 transition-colors disabled:opacity-50"
          >
            <option value="US,EU,APAC">US, EU, APAC</option>
            <option value="US,EU">US, EU Only</option>
            <option value="US">US Only</option>
            <option value="global">Global (No Restriction)</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>
    </div>
  );
}
