'use client';

import Link from 'next/link';
import { useCallback } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { usePayment } from '@/hooks/usePayment';
import { useSimulation } from '@/hooks/useSimulation';
import { AgentWalletCreator } from '@/components/demo/AgentWalletCreator';
import { ComplianceRules } from '@/components/demo/ComplianceRules';
import { WalletCard } from '@/components/demo/WalletCard';
import { PaymentExecutor } from '@/components/demo/PaymentExecutor';
import { FlowDiagram } from '@/components/demo/FlowDiagram';
import { TransactionFeed } from '@/components/demo/TransactionFeed';
import { StatusDot } from '@/components/shared/StatusDot';

export default function DemoPage() {
  const { wallet, compliance, loading: walletLoading, createWallet, updateCompliance, updateBalance } = useWallet();
  const { step, result, loading: paymentLoading, executePayment, reset } = usePayment();
  const { transactions, connected } = useSimulation();

  const handleExecutePayment = useCallback(
    (merchantName: string, amount: number, category: string) => {
      if (!wallet) return;
      reset();
      executePayment(wallet.id, merchantName, amount, category).then(() => {
        // Refresh wallet balance from the result
        if (wallet) {
          fetch(`/api/wallet?id=${wallet.id}`).catch(() => {});
        }
      });
    },
    [wallet, executePayment, reset]
  );

  // Update local balance when payment completes
  const currentResult = result;
  if (currentResult?.success && wallet) {
    const newBalance = wallet.balance - currentResult.transaction.amount;
    if (newBalance !== wallet.balance && newBalance >= 0) {
      updateBalance(newBalance);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Demo Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-[1800px] mx-auto px-4 md:px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-mono text-[13px] font-bold tracking-[0.2em] uppercase">
              CONDUIT
            </Link>
            <span className="text-border">|</span>
            <span className="text-[11px] font-mono text-muted-2 tracking-wider">DEMO</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <StatusDot color={connected ? '#00D4AA' : '#ff4466'} size={6} />
              <span className="text-[10px] font-mono text-muted-3">
                {connected ? 'LIVE' : 'OFFLINE'}
              </span>
            </div>
            <Link
              href="/"
              className="text-[11px] font-mono text-muted hover:text-foreground transition-colors"
            >
              &larr; Back
            </Link>
          </div>
        </div>
      </nav>

      {/* Three-panel layout */}
      <div className="flex-1 max-w-[1800px] mx-auto w-full px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_380px] gap-4 h-full">
          {/* Left Panel — Agent Wallet */}
          <div className="space-y-4">
            <AgentWalletCreator
              onCreateWallet={createWallet}
              loading={walletLoading}
              disabled={!!wallet}
            />

            <ComplianceRules
              compliance={compliance}
              onUpdate={updateCompliance}
              disabled={!!wallet}
            />

            {wallet && <WalletCard wallet={wallet} />}
          </div>

          {/* Center Panel — Flow Visualization + Payment */}
          <div className="space-y-4">
            <FlowDiagram step={step} result={result} />

            {wallet && (
              <PaymentExecutor
                onExecute={handleExecutePayment}
                loading={paymentLoading}
                disabled={!wallet}
              />
            )}

            {/* Compliance check results */}
            {result && result.checks.length > 0 && (
              <div className="glow-card rounded-lg p-5">
                <h3 className="text-[12px] font-mono text-muted-2 tracking-[0.15em] uppercase mb-3">
                  Compliance Results
                </h3>
                <div className="space-y-1.5">
                  {result.checks.map((check, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-[11px] font-mono"
                    >
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] ${
                          check.status === 'pass'
                            ? 'bg-accent/20 text-accent'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {check.status === 'pass' ? '✓' : '✗'}
                      </span>
                      <span className="text-muted-2 flex-1">{check.name}</span>
                      <span className="text-muted-3">{check.duration}ms</span>
                      <span
                        className={
                          check.status === 'pass' ? 'text-accent' : 'text-red-400'
                        }
                      >
                        {check.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel — Transaction Feed */}
          <TransactionFeed
            transactions={transactions}
            connected={connected}
            highlightWalletId={wallet?.id}
          />
        </div>
      </div>
    </div>
  );
}
