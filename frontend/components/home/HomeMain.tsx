import { CtaSection } from '@/components/home/CtaSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { GallerySection } from '@/components/home/GallerySection';
import { HeroSection } from '@/components/home/HeroSection';
import { PricingSection } from '@/components/home/PricingSection';

export function HomeMain() {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-x-clip">
      <HeroSection />
      <FeaturesSection />
      <GallerySection />
      <PricingSection />
      <CtaSection />
    </div>
  );
}
