'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background gradient — FusionAI style orange/blue wash */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large orange glow — left side */}
        <div
          className="absolute -bottom-[40%] -left-[25%] w-[70%] h-[130%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,82,26,0.2) 0%, rgba(212,82,26,0.06) 40%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        {/* Blue glow — right side */}
        <div
          className="absolute -bottom-[30%] right-[-5%] w-[55%] h-[110%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(30,111,255,0.12) 0%, rgba(30,111,255,0.03) 45%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        {/* Diagonal streak across CTA */}
        <div
          className="absolute top-[20%] left-[-10%] w-[120%] h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(212,82,26,0.35) 30%, rgba(212,82,26,0.6) 50%, rgba(212,82,26,0.2) 75%, transparent 100%)',
            transform: 'rotate(-8deg)',
            filter: 'blur(1.5px)',
          }}
        />
        <div
          className="absolute top-[20%] left-[-10%] w-[120%] h-[20px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(212,82,26,0.04) 30%, rgba(212,82,26,0.1) 50%, rgba(212,82,26,0.02) 75%, transparent 100%)',
            transform: 'rotate(-8deg)',
            filter: 'blur(12px)',
          }}
        />
        {/* Secondary blue streak */}
        <div
          className="absolute bottom-[30%] right-[-5%] w-[80%] h-[1.5px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(60,130,255,0.2) 30%, rgba(60,130,255,0.4) 55%, transparent 85%)',
            transform: 'rotate(5deg)',
            filter: 'blur(1.5px)',
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Orb icon */}
          <div className="w-14 h-14 rounded-full mx-auto mb-8 border border-accent/30 flex items-center justify-center bg-gradient-to-br from-accent/10 to-transparent">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-accent to-accent/50" />
          </div>

          <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.02em] mb-5 max-w-2xl mx-auto">
            Start Your Agent Payment Journey Today
          </h2>

          <p className="text-[16px] text-muted leading-[1.8] max-w-lg mx-auto mb-10">
            Sign up for Conduit and let your agents handle payments autonomously — no integration headaches.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Link
              href="/demo"
              className="px-7 py-3.5 bg-accent text-white text-[14px] font-medium rounded-full hover:bg-accent/90 transition-all duration-300"
            >
              Get Started - Free
            </Link>
            <a
              href="#protocol"
              className="px-7 py-3.5 text-[14px] font-medium text-foreground rounded-full border border-border-2 hover:border-muted-2 transition-all duration-300"
            >
              View Protocol
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
