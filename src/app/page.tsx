'use client';

import { Navigation } from '@/components/landing/Navigation';
import { Hero } from '@/components/landing/Hero';
import { LogoBar } from '@/components/landing/LogoBar';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Features } from '@/components/landing/Features';
import { CodeExample } from '@/components/landing/CodeExample';
import { ProtocolStack } from '@/components/landing/ProtocolStack';
import { Stats } from '@/components/landing/Stats';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Navigation />
      <Hero />
      <LogoBar />
      <Features />
      <HowItWorks />
      <CodeExample />
      <ProtocolStack />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
}
