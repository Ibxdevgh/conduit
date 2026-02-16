'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '../shared/SectionHeader';

const STEPS = [
  {
    num: '01',
    title: 'Provision',
    desc: 'Deploy an agent wallet with programmable spending rules, category restrictions, and velocity limits.',
  },
  {
    num: '02',
    title: 'Authorize',
    desc: 'Agent submits payment intent. Conduit runs real-time compliance checks against wallet rules.',
  },
  {
    num: '03',
    title: 'Settle',
    desc: 'USDC transfer executes on Solana via SPL token program. Sub-second finality, zero chargebacks.',
  },
  {
    num: '04',
    title: 'Reconcile',
    desc: 'UCP receipt issued with full audit trail. Settlement confirmation with transaction metadata.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <SectionHeader
          label="How It Works"
          title="Automate payments in four simple steps"
          description="From agent intent to settled payment — fully automated, fully compliant."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-7 group"
            >
              <div className="text-[11px] font-mono text-accent mb-5 tracking-wider">
                Step {step.num}
              </div>

              <h3 className="text-[18px] font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                {step.title}
              </h3>

              <p className="text-[14px] text-muted leading-[1.7]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
