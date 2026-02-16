'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  number?: string;
  align?: 'center' | 'left';
}

export function SectionHeader({ label, title, description, align = 'center' }: SectionHeaderProps) {
  const centered = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${centered ? 'text-center' : ''}`}
    >
      <span className="pill-badge mb-6 inline-flex">
        {label}
      </span>

      <h2 className={`text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.15] tracking-[-0.02em] text-foreground ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
        {title}
      </h2>

      {description && (
        <p className={`text-[15px] text-muted leading-[1.8] mt-5 ${centered ? 'max-w-xl mx-auto' : 'max-w-xl'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
