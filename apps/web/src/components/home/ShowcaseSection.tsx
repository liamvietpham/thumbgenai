import { glassCard } from './shared';

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <path d="M7 7h10v10"></path>
            <path d="M7 17 17 7"></path>
          </svg>
        </button>
      </div>
    </section>
  );
}
