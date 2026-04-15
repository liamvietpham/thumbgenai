import { AboutArchitectureSection } from '@/components/about/AboutArchitectureSection';
import { AboutCtaSection } from '@/components/about/AboutCtaSection';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutImpactSection } from '@/components/about/AboutImpactSection';
import { AboutOptimizationSection } from '@/components/about/AboutOptimizationSection';

export function AboutMain() {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-x-clip">
      <AboutHero />
      <AboutImpactSection />
      <AboutArchitectureSection />
      <AboutOptimizationSection />
      <AboutCtaSection />
    </div>
  );
}
