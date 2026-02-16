'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Transaction } from '@/lib/simulation/types';

export function useSimulation() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [connected, setConnected] = useState(false);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const es = new EventSource('/api/agents');
    esRef.current = es;

    es.onopen = () => setConnected(true);

    es.onmessage = (event) => {
      try {
        const tx = JSON.parse(event.data) as Transaction;
        setTransactions((prev) => [tx, ...prev].slice(0, 50));
      } catch {
        // ignore
      }
    };

    es.onerror = () => setConnected(false);

    return () => {
      es.close();
      esRef.current = null;
    };
  }, []);

  const clearTransactions = useCallback(() => setTransactions([]), []);

  return { transactions, connected, clearTransactions };
}
