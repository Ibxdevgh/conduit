'use client';

import { motion } from 'framer-motion';
import { AnimatedCounter } from '../shared/AnimatedCounter';

const STATS = [
  { value: 2400000, prefix: '$', suffix: '', label: 'Volume Settled', format: 'compact' as const },
  { value: 12847, prefix: '', suffix: '', label: 'Active Agents', format: 'number' as const },
  { value: 380, prefix: '', suffix: 'ms', label: 'Avg Settlement', format: 'number' as const },
  { value: 47291, prefix: '', suffix: '', label: 'Transactions', format: 'number' as const },
];

export function Stats() {
  return (
    <section className="py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="card">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-8 text-center ${
                  i < 3 ? 'border-r border-border' : ''
                } ${i < 2 ? 'border-b lg:border-b-0 border-border' : ''}`}
              >
                <div className="text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-tight mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    format={stat.format}
                  />
                </div>
                <p className="text-[12px] text-muted">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
