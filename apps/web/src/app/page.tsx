import { ContactSection } from '@/components/home/ContactSection';
import { CtaSection } from '@/components/home/CtaSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { HeroSection } from '@/components/home/HeroSection';
import { PricingSection } from '@/components/home/PricingSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
      <CtaSection />
    </div>
  );
}
