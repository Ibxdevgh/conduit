'use client';

import { motion } from 'framer-motion';

const LOGOS = [
  'NeuralMesh',
  'SynthCore',
  'HyperGrid',
  'AeroLink',
  'QuantumHost',
];

export function LogoBar() {
  return (
    <section className="py-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[14px] text-muted text-center mb-10"
        >
          Trusted by 12,000+ autonomous agents worldwide
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-12 md:gap-16 flex-wrap"
        >
          {LOGOS.map((logo) => (
            <div key={logo} className="flex items-center gap-2 text-muted-2 hover:text-muted transition-colors">
              <div className="w-6 h-6 rounded-md bg-muted-3/30 flex items-center justify-center">
                <div className="w-3 h-3 rounded-sm bg-muted-2/50" />
              </div>
              <span className="text-[15px] font-semibold tracking-[-0.01em]">{logo}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
