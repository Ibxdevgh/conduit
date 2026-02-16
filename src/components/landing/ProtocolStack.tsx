'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '../shared/SectionHeader';

const LAYERS = [
  { name: 'Application Layer', desc: 'AI Agents, Orchestrators, Commerce Apps' },
  { name: 'UCP', desc: 'Unified Commerce Protocol' },
  { name: 'CONDUIT', desc: 'Settlement + Compliance Engine', highlight: true },
  { name: 'Solana + USDC', desc: 'SPL Token Program, Sub-second Finality' },
  { name: 'AXP', desc: 'Agent Experience Protocol' },
];

export function ProtocolStack() {
  return (
    <section id="protocol" className="py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <SectionHeader
          label="Protocol Stack"
          title="Where Conduit fits in the agentic commerce stack"
        />

        <div className="max-w-2xl mx-auto">
          <div className="card overflow-hidden">
            {LAYERS.map((layer, i) => (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`flex items-center gap-5 px-6 py-5 ${
                  i < LAYERS.length - 1 ? 'border-b border-border' : ''
                } ${layer.highlight ? 'bg-accent/[0.05]' : ''} group transition-colors hover:bg-surface-2/50`}
              >
                <div
                  className={`w-1.5 h-8 rounded-full shrink-0 ${
                    layer.highlight ? 'bg-accent' : 'bg-border-2 group-hover:bg-muted-2'
                  } transition-colors`}
                />

                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <span
                      className={`text-[14px] font-semibold ${
                        layer.highlight ? 'text-accent' : 'text-foreground/80'
                      }`}
                    >
                      {layer.name}
                    </span>
                    <p className="text-[12px] text-muted mt-0.5">{layer.desc}</p>
                  </div>

                  {layer.highlight && (
                    <span className="text-[10px] font-mono text-accent border border-accent/20 px-3 py-1 rounded-full bg-accent/5">
                      YOU ARE HERE
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
