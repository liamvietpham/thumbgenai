import { glassCard } from './shared';
import ExternalLinkIcon from '@/assets/icons/external-link.svg';

export function ShowcaseSection() {
  return (
    <section className="mt-20 grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <p className="text-sm text-[#48648e]">
          Our AI understands what makes a video go viral and designs thumbnails accordingly.
        </p>
        <div className={`${glassCard} mt-3 h-64`} />
      </div>
      <div className={`${glassCard} p-4`}>
        <div className="h-32 rounded-lg border border-[#b8caea] bg-white/80" />
        <h3 className="mt-4 text-2xl font-semibold text-[#1b3f78]">
          Boost your views with AI-optimized designs
        </h3>
        <p className="mt-2 text-sm text-[#48648e]">
          High-performing visuals trained for real-world click-through behavior.
        </p>
        <button className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#255fbe] transition hover:text-[#1e4f9f]">
          Start generating free
          <ExternalLinkIcon
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
    </section>
  );
}
