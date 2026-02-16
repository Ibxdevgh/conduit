'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full border border-accent/50 flex items-center justify-center bg-gradient-to-br from-accent/20 to-transparent">
            <div className="w-2 h-2 rounded-full bg-accent" />
          </div>
          <span className="text-[16px] font-semibold text-foreground">
            Conduit
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            ['About', '#how-it-works'],
            ['Features', '#features'],
            ['Protocol', '#protocol'],
            ['Demo', '/demo'],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[14px] text-muted hover:text-foreground transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA — outlined like FusionAI */}
        <Link
          href="/demo"
          className="px-5 py-2 text-[13px] font-medium text-foreground rounded-full border border-accent hover:bg-accent hover:text-white transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
