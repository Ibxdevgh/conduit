'use client';

import { useState, useCallback } from 'react';
import type { PaymentResult } from '@/lib/simulation/types';

export type PaymentStep =
  | 'idle'
  | 'agent_intent'
  | 'compliance_check'
  | 'spl_transfer'
  | 'merchant_receive'
  | 'ucp_receipt'
  | 'complete'
  | 'failed';

const STEP_DURATIONS: Record<string, number> = {
  agent_intent: 500,
  compliance_check: 800,
  spl_transfer: 600,
  merchant_receive: 500,
  ucp_receipt: 400,
};

const STEPS: PaymentStep[] = [
  'agent_intent',
  'compliance_check',
  'spl_transfer',
  'merchant_receive',
  'ucp_receipt',
  'complete',
];

export function usePayment() {
  const [step, setStep] = useState<PaymentStep>('idle');
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [loading, setLoading] = useState(false);

  const executePayment = useCallback(
    async (walletId: string, merchantName: string, amount: number, category: string) => {
      setLoading(true);
      setResult(null);
      setStep('idle');

      // Animate through steps
      for (const s of STEPS) {
        if (s === 'complete') break;
        setStep(s);
        await new Promise((r) => setTimeout(r, STEP_DURATIONS[s] || 500));
      }

      // Actually call the API
      try {
        const res = await fetch('/api/simulate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            walletId,
            merchantId: `merchant_${merchantName.toLowerCase().replace(/\s+/g, '_')}`,
            merchantName,
            amount,
            category,
          }),
        });
        const data: PaymentResult = await res.json();
        setResult(data);
        setStep(data.success ? 'complete' : 'failed');
      } catch {
        setStep('failed');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setStep('idle');
    setResult(null);
    setLoading(false);
  }, []);

  return { step, result, loading, executePayment, reset, STEPS, STEP_DURATIONS };
}
