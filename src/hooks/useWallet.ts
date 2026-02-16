'use client';

import { useState, useCallback } from 'react';
import type { AgentWallet, ComplianceRules } from '@/lib/simulation/types';

const DEFAULT_COMPLIANCE: ComplianceRules = {
  dailyLimit: 5000,
  perTxLimit: 500,
  allowedCategories: ['compute', 'storage', 'api_access', 'data_feed', 'infrastructure', 'security', 'analytics', 'networking'],
  geoRestriction: 'US,EU,APAC',
  velocityLimit: 60,
};

export function useWallet() {
  const [wallet, setWallet] = useState<AgentWallet | null>(null);
  const [compliance, setCompliance] = useState<ComplianceRules>(DEFAULT_COMPLIANCE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createWallet = useCallback(async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, compliance }),
      });
      if (!res.ok) throw new Error('Failed to create wallet');
      const data = await res.json();
      setWallet(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [compliance]);

  const updateCompliance = useCallback((updates: Partial<ComplianceRules>) => {
    setCompliance((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateBalance = useCallback((newBalance: number) => {
    setWallet((prev) => prev ? { ...prev, balance: newBalance } : null);
  }, []);

  return {
    wallet,
    compliance,
    loading,
    error,
    createWallet,
    updateCompliance,
    updateBalance,
    DEFAULT_COMPLIANCE,
  };
}
