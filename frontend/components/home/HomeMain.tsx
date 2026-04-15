import { CtaSection } from '@/components/home/CtaSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { GallerySection } from '@/components/home/GallerySection';
import { HeroSection } from '@/components/home/HeroSection';
import { PricingSection } from '@/components/home/PricingSection';

export function HomeMain() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <GallerySection />
      <PricingSection />
      <CtaSection />
    </>
  );
}
