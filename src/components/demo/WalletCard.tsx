'use client';

import type { AgentWallet } from '@/lib/simulation/types';
import { formatUSDC, truncateKey } from '@/lib/format';
import { StatusDot } from '../shared/StatusDot';

interface WalletCardProps {
  wallet: AgentWallet;
}

export function WalletCard({ wallet }: WalletCardProps) {
  const spendPercent = Math.min(
    ((wallet.compliance.dailyLimit - wallet.balance) / wallet.compliance.dailyLimit) * 100,
    100
  );

  return (
    <div className="glow-card rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <StatusDot color="#00D4AA" />
          <span className="text-[13px] font-bold">{wallet.name}</span>
        </div>
        <span className="text-[10px] font-mono text-muted-2">
          {truncateKey(wallet.publicKey, 6)}
        </span>
      </div>

      <div className="mb-4">
        <span className="text-[11px] text-muted-2 font-mono uppercase tracking-wider block mb-1">
          Balance
        </span>
        <span className="text-[28px] font-black text-accent tabular-nums">
          {formatUSDC(wallet.balance)}
        </span>
        <span className="text-[11px] text-muted ml-2">USDC</span>
      </div>

      {/* Limit bars */}
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-[10px] font-mono text-muted-2 mb-1">
            <span>Daily Limit</span>
            <span>{formatUSDC(wallet.compliance.dailyLimit)}</span>
          </div>
          <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent/60 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(spendPercent, 0)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[10px] font-mono text-muted-2 mb-1">
            <span>Per-Tx Limit</span>
            <span>{formatUSDC(wallet.compliance.perTxLimit)}</span>
          </div>
          <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
            <div className="h-full bg-accent/40 rounded-full" style={{ width: '0%' }} />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {wallet.compliance.allowedCategories.slice(0, 4).map((cat) => (
            <span
              key={cat}
              className="text-[9px] font-mono text-muted-2 bg-surface-2 px-2 py-0.5 rounded"
            >
              {cat}
            </span>
          ))}
          {wallet.compliance.allowedCategories.length > 4 && (
            <span className="text-[9px] font-mono text-muted-3 px-2 py-0.5">
              +{wallet.compliance.allowedCategories.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
