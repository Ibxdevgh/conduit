'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { PaymentStep } from '@/hooks/usePayment';
import type { PaymentResult } from '@/lib/simulation/types';

interface FlowDiagramProps {
  step: PaymentStep;
  result: PaymentResult | null;
}

const FLOW_STEPS: { key: PaymentStep; label: string; icon: string }[] = [
  { key: 'agent_intent', label: 'Agent Intent', icon: '1' },
  { key: 'compliance_check', label: 'Compliance Check', icon: '2' },
  { key: 'spl_transfer', label: 'SPL Transfer', icon: '3' },
  { key: 'merchant_receive', label: 'Merchant Receives', icon: '4' },
  { key: 'ucp_receipt', label: 'UCP Receipt', icon: '5' },
];

function getStepState(currentStep: PaymentStep, stepKey: PaymentStep): 'done' | 'active' | 'pending' | 'failed' {
  if (currentStep === 'failed') return 'failed';
  if (currentStep === 'complete') return 'done';

  const order = FLOW_STEPS.map((s) => s.key);
  const currentIdx = order.indexOf(currentStep);
  const stepIdx = order.indexOf(stepKey);

  if (stepIdx < currentIdx) return 'done';
  if (stepIdx === currentIdx) return 'active';
  return 'pending';
}

export function FlowDiagram({ step, result }: FlowDiagramProps) {
  const isIdle = step === 'idle';

  return (
    <div className="glow-card rounded-lg p-5 h-full flex flex-col">
      <h3 className="text-[12px] font-mono text-muted-2 tracking-[0.15em] uppercase mb-6">
        Payment Flow
      </h3>

      {isIdle ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed border-border flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-muted-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
              </svg>
            </div>
            <p className="text-[12px] text-muted-3 font-mono">
              Create a wallet and execute a payment to see the flow
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 space-y-2">
          {FLOW_STEPS.map((flowStep, i) => {
            const state = getStepState(step, flowStep.key);

            return (
              <div key={flowStep.key} className="relative">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded border transition-all duration-300 ${
                    state === 'active'
                      ? 'border-accent/40 bg-accent/[0.06]'
                      : state === 'done'
                      ? 'border-accent/20 bg-accent/[0.03]'
                      : state === 'failed'
                      ? 'border-red-500/30 bg-red-500/[0.05]'
                      : 'border-border bg-surface/50'
                  }`}
                >
                  {/* Step indicator */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 transition-colors ${
                      state === 'active'
                        ? 'bg-accent text-background'
                        : state === 'done'
                        ? 'bg-accent/20 text-accent'
                        : state === 'failed'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-surface-2 text-muted-3'
                    }`}
                  >
                    {state === 'done' ? (
                      <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
                        <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 1 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                      </svg>
                    ) : (
                      flowStep.icon
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-[12px] font-mono font-medium block ${
                        state === 'active'
                          ? 'text-accent'
                          : state === 'done'
                          ? 'text-foreground/80'
                          : 'text-muted-3'
                      }`}
                    >
                      {flowStep.label}
                    </span>
                    {state === 'active' && (
                      <span className="text-[10px] text-accent/60 font-mono">Processing...</span>
                    )}
                  </div>

                  {/* Activity indicator */}
                  <AnimatePresence>
                    {state === 'active' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="w-2 h-2 rounded-full bg-accent"
                        style={{ animation: 'pulse-dot 1s ease-in-out infinite' }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Connector */}
                {i < FLOW_STEPS.length - 1 && (
                  <div className="absolute left-[22px] top-full w-px h-2 bg-border" />
                )}
              </div>
            );
          })}

          {/* Result */}
          <AnimatePresence>
            {(step === 'complete' || step === 'failed') && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded border ${
                  step === 'complete'
                    ? 'border-accent/30 bg-accent/[0.05]'
                    : 'border-red-500/30 bg-red-500/[0.05]'
                }`}
              >
                <span
                  className={`text-[11px] font-mono font-bold block mb-1 ${
                    step === 'complete' ? 'text-accent' : 'text-red-400'
                  }`}
                >
                  {step === 'complete' ? 'SETTLED' : 'FAILED'}
                </span>
                {result && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-muted block">
                      Tx: {result.transaction.signature.slice(0, 16)}...
                    </span>
                    <span className="text-[10px] font-mono text-muted block">
                      Settlement: {result.transaction.settlementTime}ms
                    </span>
                    {result.error && (
                      <span className="text-[10px] font-mono text-red-400 block">
                        {result.error}
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
