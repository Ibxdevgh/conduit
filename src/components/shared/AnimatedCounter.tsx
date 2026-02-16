'use client';

import { useAnimatedValue } from '@/hooks/useAnimatedValue';
import { useRef, useState, useEffect } from 'react';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  format?: 'number' | 'compact';
  duration?: number;
}

function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  format = 'number',
  duration = 2000,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const animated = useAnimatedValue(visible ? value : 0, duration);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const display = format === 'compact'
    ? formatCompact(animated)
    : animated.toLocaleString();

  return (
    <div ref={ref} className="font-mono tabular-nums inline-flex">
      {prefix && <span className="text-accent">{prefix}</span>}
      {display}
      {suffix && <span className="text-muted ml-0.5">{suffix}</span>}
    </div>
  );
}
