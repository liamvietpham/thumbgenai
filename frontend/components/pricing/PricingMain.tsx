import { PricingCtaSection } from '@/components/pricing/PricingCtaSection';
import { PricingFaqSection } from '@/components/pricing/PricingFaqSection';
import { PricingIntro } from '@/components/pricing/PricingIntro';
import { PricingLogoCloud } from '@/components/pricing/PricingLogoCloud';
import { PricingPlansSection } from '@/components/pricing/PricingPlansSection';

export function PricingMain() {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-x-clip">
      <PricingIntro />
      <PricingPlansSection />
      <PricingLogoCloud />
      <PricingFaqSection />
      <PricingCtaSection />
    </div>
  );
}
