'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Transaction } from '@/lib/simulation/types';
import { formatUSDC, formatTime } from '@/lib/format';
import { statusColor } from '@/lib/colors';
import { StatusDot } from '../shared/StatusDot';

interface TransactionFeedProps {
  transactions: Transaction[];
  connected: boolean;
  highlightWalletId?: string;
}

export function TransactionFeed({ transactions, connected, highlightWalletId }: TransactionFeedProps) {
  return (
    <div className="glow-card rounded-lg p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[12px] font-mono text-muted-2 tracking-[0.15em] uppercase">
          Live Transaction Feed
        </h3>
        <div className="flex items-center gap-2">
          <StatusDot color={connected ? '#00D4AA' : '#ff4466'} size={6} />
          <span className="text-[10px] font-mono text-muted-3">
            {connected ? 'CONNECTED' : 'DISCONNECTED'}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 min-h-0" style={{ maxHeight: 'calc(100vh - 300px)' }}>
        <AnimatePresence initial={false}>
          {transactions.map((tx) => {
            const isHighlighted = highlightWalletId && tx.agentId === highlightWalletId;

            return (
              <motion.div
                key={tx.id + tx.timestamp}
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-3 px-3 py-2 rounded text-[11px] font-mono border transition-colors ${
                  isHighlighted
                    ? 'border-accent/30 bg-accent/[0.06]'
                    : 'border-transparent hover:bg-surface-2/50'
                }`}
              >
                <span className="text-muted-3 w-14 shrink-0">{formatTime(tx.timestamp)}</span>
                <span className="text-muted w-20 shrink-0 truncate" title={tx.agentName}>
                  {tx.agentName}
                </span>
                <span className="text-muted-3 shrink-0">&rarr;</span>
                <span className="text-muted-2 flex-1 truncate" title={tx.merchantName}>
                  {tx.merchantName}
                </span>
                <span className="text-foreground font-medium w-18 text-right shrink-0">
                  {formatUSDC(tx.amount)}
                </span>
                <StatusDot color={statusColor(tx.status)} size={6} pulse={false} />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {transactions.length === 0 && (
          <div className="flex items-center justify-center h-32">
            <span className="text-[11px] font-mono text-muted-3">
              Waiting for transactions...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
