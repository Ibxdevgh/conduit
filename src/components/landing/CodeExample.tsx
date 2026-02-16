'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '../shared/SectionHeader';

export function CodeExample() {
  return (
    <section className="py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <SectionHeader
          label="Developer Experience"
          title="Three lines to settle a payment"
          description="One API call handles compliance checks, SPL token transfer, and UCP receipt generation."
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Code block card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[11px] font-mono text-muted-2 ml-2">agent-payment.ts</span>
              </div>
              <span className="text-[10px] font-mono text-muted-3 bg-surface-2 px-2.5 py-1 rounded">TypeScript</span>
            </div>

            {/* Code */}
            <div className="p-6 text-[12px] font-mono leading-[2] overflow-x-auto">
              <div className="text-muted-2">{'// Initialize the Conduit client'}</div>
              <div>
                <span className="text-[#C4B5FD]">import</span>
                {' { '}
                <span className="text-foreground">Conduit</span>
                {' } '}
                <span className="text-[#C4B5FD]">from</span>
                {' '}
                <span className="text-[#86EFAC]">&quot;@conduit/sdk&quot;</span>
              </div>
              <div className="h-[2em]" />
              <div>
                <span className="text-[#C4B5FD]">const</span>
                {' '}
                <span className="text-foreground">conduit</span>
                {' = '}
                <span className="text-[#C4B5FD]">new</span>
                {' '}
                <span className="text-foreground">Conduit</span>
                {'({ '}
                <span className="text-muted">network:</span>
                {' '}
                <span className="text-[#86EFAC]">&quot;mainnet&quot;</span>
                {' })'}
              </div>
              <div className="h-[2em]" />
              <div className="text-muted-2">{'// Settle a payment in one call'}</div>
              <div>
                <span className="text-[#C4B5FD]">const</span>
                {' '}
                <span className="text-foreground">payment</span>
                {' = '}
                <span className="text-[#C4B5FD]">await</span>
                {' conduit.'}
                <span className="text-foreground">settle</span>
                {'({'}
              </div>
              <div className="pl-6">
                <span className="text-muted">agent:</span>
                {'     '}
                <span className="text-[#86EFAC]">&quot;atlas-7&quot;</span>,
              </div>
              <div className="pl-6">
                <span className="text-muted">merchant:</span>
                {'  '}
                <span className="text-[#86EFAC]">&quot;cloudscale-api&quot;</span>,
              </div>
              <div className="pl-6">
                <span className="text-muted">amount:</span>
                {'    '}
                <span className="text-[#FB923C]">250.00</span>,
              </div>
              <div className="pl-6">
                <span className="text-muted">currency:</span>
                {'  '}
                <span className="text-[#86EFAC]">&quot;USDC&quot;</span>,
              </div>
              <div>{'})'}
                <span className="animate-cursor text-muted-2">|</span>
              </div>
              <div className="h-[2em]" />
              <div className="text-muted-2">{'// → { status: "settled", time: 342ms }'}</div>
            </div>
          </motion.div>

          {/* Right: feature bullets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6 lg:pt-4"
          >
            {[
              {
                title: 'Built-in Compliance',
                desc: 'Every payment is checked against wallet rules before settlement. Daily limits, category restrictions, velocity controls.',
              },
              {
                title: 'Sub-400ms Finality',
                desc: 'Faster than traditional card networks. Settlement is final and irreversible — no pending states.',
              },
              {
                title: 'Full Audit Trail',
                desc: 'Cryptographic receipts for every transaction. On-chain proof of compliance, settlement, and delivery.',
              },
              {
                title: 'UCP Receipts',
                desc: 'Every settlement generates a standardized receipt for the Shopware ecosystem.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex items-start gap-4 group"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-accent" fill="currentColor">
                    <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 1 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold mb-1 group-hover:text-accent transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[13px] text-muted leading-[1.7]">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
