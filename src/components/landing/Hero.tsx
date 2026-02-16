'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/* ── Live Settlement Feed ── */
const FEED_ENTRIES = [
  { agent: 'atlas-7', merchant: 'cloudscale', amount: 250.0, time: 342 },
  { agent: 'nexus-12', merchant: 'dataforge', amount: 89.5, time: 298 },
  { agent: 'sentinel-3', merchant: 'byteworks', amount: 1250.0, time: 387 },
  { agent: 'orbit-9', merchant: 'neuralhost', amount: 45.0, time: 312 },
  { agent: 'helix-1', merchant: 'quantum-api', amount: 620.0, time: 356 },
  { agent: 'prism-4', merchant: 'terrascale', amount: 180.75, time: 289 },
  { agent: 'vortex-6', merchant: 'frostbyte', amount: 3400.0, time: 401 },
  { agent: 'cipher-8', merchant: 'metavault', amount: 92.0, time: 275 },
];

function LiveFeed() {
  const [entries, setEntries] = useState(FEED_ENTRIES.slice(0, 5));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (tick === 0) return;
    const next = FEED_ENTRIES[tick % FEED_ENTRIES.length];
    setEntries((prev) => [next, ...prev.slice(0, 4)]);
  }, [tick]);

  const now = new Date();
  const fmt = (offset: number) => {
    const d = new Date(now.getTime() - offset * 1000);
    return d.toTimeString().slice(0, 8);
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[11px] font-mono text-muted-2 ml-1">Settlement Feed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
          <span className="text-[10px] font-mono text-emerald-400/80">LIVE</span>
        </div>
      </div>

      {/* Feed */}
      <div className="p-5 font-mono text-[11px] leading-[2.2] space-y-0">
        {entries.map((entry, i) => (
          <motion.div
            key={`${entry.agent}-${i}-${tick}`}
            initial={i === 0 && tick > 0 ? { opacity: 0, y: -8 } : { opacity: 1 }}
            animate={{ opacity: i === 0 ? 1 : 1 - i * 0.15, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-0 whitespace-nowrap"
          >
            <span className="text-muted-3 w-[68px] shrink-0">{fmt(i * 3)}</span>
            <span className="text-accent w-[85px] shrink-0">{entry.agent}</span>
            <span className="text-muted-3 mx-1">&rarr;</span>
            <span className="text-foreground/50 w-[85px] shrink-0">{entry.merchant}</span>
            <span className="text-foreground ml-auto tabular-nums">${entry.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            <span className="text-muted-3 ml-3 w-[40px] text-right tabular-nums">{entry.time}ms</span>
          </motion.div>
        ))}
      </div>

      {/* Status bar */}
      <div className="px-5 py-2.5 border-t border-border flex items-center justify-between">
        <span className="text-[9px] font-mono text-muted-3">MAINNET-BETA</span>
        <span className="text-[9px] font-mono text-muted-3">AVG 338ms</span>
      </div>
    </div>
  );
}

/* ── Hero ── */
export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient streaks — FusionAI style */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep blue atmospheric glow — upper right (like FusionAI) */}
        <div
          className="absolute -top-[30%] right-[-15%] w-[75%] h-[120%]"
          style={{
            background: 'radial-gradient(ellipse at 60% 40%, rgba(20,80,200,0.18) 0%, rgba(20,80,200,0.06) 35%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Orange ambient glow — right center */}
        <div
          className="absolute top-[10%] right-[-10%] w-[50%] h-[90%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,82,26,0.16) 0%, rgba(212,82,26,0.04) 45%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Warm glow at bottom — for the streaks to emerge from */}
        <div
          className="absolute bottom-[-20%] right-[10%] w-[60%] h-[60%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,82,26,0.12) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />

        {/* ── Diagonal streaks — right side, angled like FusionAI ── */}

        {/* Streak 1 — bright primary orange, rightmost */}
        <div
          className="absolute top-[-20%] right-[8%] w-[150%] h-[3px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(212,82,26,0.6) 40%, rgba(212,82,26,0.9) 55%, rgba(212,82,26,0.4) 70%, transparent 90%)',
            transform: 'rotate(-55deg)',
            transformOrigin: 'top right',
            filter: 'blur(1.5px)',
          }}
        />
        <div
          className="absolute top-[-20%] right-[8%] w-[150%] h-[40px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(212,82,26,0.06) 40%, rgba(212,82,26,0.14) 55%, rgba(212,82,26,0.04) 70%, transparent 90%)',
            transform: 'rotate(-55deg)',
            transformOrigin: 'top right',
            filter: 'blur(20px)',
          }}
        />

        {/* Streak 2 — secondary orange, slightly left */}
        <div
          className="absolute top-[-15%] right-[12%] w-[140%] h-[2.5px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(212,82,26,0.4) 35%, rgba(212,82,26,0.7) 50%, rgba(212,82,26,0.3) 68%, transparent 88%)',
            transform: 'rotate(-52deg)',
            transformOrigin: 'top right',
            filter: 'blur(1.5px)',
          }}
        />
        <div
          className="absolute top-[-15%] right-[12%] w-[140%] h-[30px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(212,82,26,0.04) 35%, rgba(212,82,26,0.1) 50%, rgba(212,82,26,0.03) 68%, transparent 88%)',
            transform: 'rotate(-52deg)',
            transformOrigin: 'top right',
            filter: 'blur(16px)',
          }}
        />

        {/* Streak 3 — thinner orange, far right edge */}
        <div
          className="absolute top-[-25%] right-[3%] w-[140%] h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent 5%, rgba(212,82,26,0.3) 40%, rgba(212,82,26,0.55) 56%, rgba(212,82,26,0.2) 72%, transparent 92%)',
            transform: 'rotate(-58deg)',
            transformOrigin: 'top right',
            filter: 'blur(1px)',
          }}
        />
        <div
          className="absolute top-[-25%] right-[3%] w-[140%] h-[20px]"
          style={{
            background: 'linear-gradient(90deg, transparent 5%, rgba(212,82,26,0.03) 40%, rgba(212,82,26,0.08) 56%, rgba(212,82,26,0.02) 72%, transparent 92%)',
            transform: 'rotate(-58deg)',
            transformOrigin: 'top right',
            filter: 'blur(14px)',
          }}
        />

        {/* Streak 4 — blue streak, between the orange ones */}
        <div
          className="absolute top-[-18%] right-[6%] w-[145%] h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(50,120,255,0.3) 38%, rgba(50,120,255,0.55) 52%, rgba(50,120,255,0.2) 68%, transparent 88%)',
            transform: 'rotate(-54deg)',
            transformOrigin: 'top right',
            filter: 'blur(2px)',
          }}
        />
        <div
          className="absolute top-[-18%] right-[6%] w-[145%] h-[25px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(50,120,255,0.03) 38%, rgba(50,120,255,0.08) 52%, rgba(50,120,255,0.02) 68%, transparent 88%)',
            transform: 'rotate(-54deg)',
            transformOrigin: 'top right',
            filter: 'blur(16px)',
          }}
        />

        {/* Streak 5 — very thin accent, rightmost edge */}
        <div
          className="absolute top-[-30%] right-[0%] w-[130%] h-[1.5px]"
          style={{
            background: 'linear-gradient(90deg, transparent 10%, rgba(212,82,26,0.35) 45%, rgba(212,82,26,0.6) 60%, rgba(212,82,26,0.2) 75%, transparent 95%)',
            transform: 'rotate(-62deg)',
            transformOrigin: 'top right',
            filter: 'blur(1px)',
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="pill-badge mb-8 inline-flex">
              Settlement Protocol
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(2.5rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.03em] mb-6"
          >
            Automate Your Agent Payments with Conduit
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-[16px] text-muted leading-[1.8] max-w-[460px] mb-8"
          >
            Connect your AI agents, set spending rules and watch Conduit handle
            the rest — instant USDC settlement on Solana, no integration headaches.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href="/demo"
              className="px-6 py-3 bg-accent text-white text-[14px] font-medium rounded-full hover:bg-accent/90 transition-all duration-300"
            >
              Get Started - Free
            </Link>
            <a
              href="#features"
              className="px-6 py-3 text-[14px] font-medium text-foreground rounded-full border border-border-2 hover:border-muted-2 transition-all duration-300"
            >
              View Features
            </a>
          </motion.div>
        </div>

        {/* Right — Live feed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block"
        >
          <LiveFeed />
        </motion.div>
      </div>
    </section>
  );
}
