import ExternalLinkIcon from '@/assets/icons/external-link.svg';
import FeatureEditableIcon from '@/assets/icons/feature-editable.svg';
import FeatureEyeCatchingIcon from '@/assets/icons/feature-eye-catching.svg';
import FeatureSmartAnalysisIcon from '@/assets/icons/feature-smart-analysis.svg';

export function FeaturesSection() {
  return (
    <section id="features">
      <p className="text-center font-medium text-[#255fbe] mt-28 px-10 py-2 rounded-full bg-[#eaf2ff] border border-[#8ea9d7] w-max mx-auto">
        Features
      </p>
      <h2 className="text-3xl font-semibold text-center mx-auto mt-4 text-[#1b3f78]">
        Why use our Thumbnail Generator?
      </h2>
      <p className="text-[#48648e] text-center mt-2 max-w-xl mx-auto">
        Create stunning thumbnails that get clicks, without the hassle.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-4 mt-16">
        <div className="not-md:w-full">
          <div className="p-6 rounded-xl space-y-4 border border-sky-900 bg-slate-950 md:max-w-80 w-full">
            <FeatureSmartAnalysisIcon className="h-[34px] w-[31px] text-[#7ea6e6]" />
            <h3 className="text-base font-medium text-white">Smart Analysis</h3>
            <p className="text-slate-300 line-clamp-2 pb-4">
              Our AI analyzes video content to suggest the most clickable concepts.
            </p>
          </div>
        </div>

        <div className="p-px rounded-[13px] bg-linear-to-br from-sky-600 to-sky-900 not-md:w-full">
          <div className="p-6 rounded-xl space-y-4 border border-sky-900 bg-slate-950 md:max-w-80 w-full">
            <FeatureEyeCatchingIcon className="h-[34px] w-[33px] text-[#7ea6e6]" />
            <h3 className="text-base font-medium text-white">Eye-Catching Designs</h3>
            <p className="text-slate-300 line-clamp-2 pb-4">
              Generate vibrant, high-contrast thumbnails that stand out in the feed.
            </p>
          </div>
        </div>

        <div className="not-md:w-full">
          <div className="p-6 rounded-xl space-y-4 border border-sky-900 bg-slate-950 md:max-w-80 w-full">
            <FeatureEditableIcon className="h-[34px] w-[34px] text-[#7ea6e6]" />
            <h3 className="text-base font-medium text-white">Fully Editable</h3>
            <p className="text-slate-300 line-clamp-2 pb-4">
              Get fully layered designs you can tweak to perfection if needed.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-40 relative mx-auto max-w-5xl">
        <div className="absolute -z-50 size-100 -top-10 -left-20 aspect-square rounded-full bg-sky-500/40 blur-3xl"></div>
        <p className="text-[#48648e] text-lg text-left max-w-3xl">
          Our AI understands what makes a video go viral and designs thumbnails accordingly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-10">
          <div className="md:col-span-2">
            <div className="relative overflow-hidden rounded-[28px] border-2 border-[#255fbe] shadow-[0_16px_38px_rgba(30,58,100,0.2)] hover:-translate-y-0.5 transition duration-300">
              <img
                alt="Dashboard showing AI thumbnail generation analytics and results"
                loading="lazy"
                width="1000"
                height="500"
                decoding="async"
                data-nimg="1"
                className="block h-full w-full object-cover"
                // srcSet="/_next/image?url=%2Fassets%2Ffeatures-showcase-1.png&w=1080&q=75 1x, /_next/image?url=%2Fassets%2Ffeatures-showcase-1.png&w=2048&q=75 2x"
                src="/features-showcase.webp"
                style={{ color: 'transparent' }}
              />

              <div className="pointer-events-none absolute right-0 top-[36%] w-[44%] rounded-tl-2xl rounded-bl-2xl border border-white/45 bg-white/55 px-3 py-2 text-white shadow-[0_12px_30px_rgba(20,32,60,0.2)] backdrop-blur-sm sm:top-[35%] sm:w-[40%] sm:px-7 sm:py-5">
                <p className="text-2xl leading-none font-light tracking-tight sm:text-4xl">10X</p>
                <p className="mt-1 text-[8px] leading-none font-light tracking-[0.08em] uppercase opacity-95 sm:mt-2 sm:text-[12px]">
                  REDUCE DEVELOPMENT TIME
                </p>
              </div>

              <div className="pointer-events-none absolute bottom-[10%] right-0 w-[80%] rounded-tl-2xl rounded-bl-2xl rounded-tr-none rounded-br-none bg-[#255fbe] p-4 text-white shadow-[0_12px_24px_rgba(15,87,234,0.35)] sm:w-[88%] sm:p-8">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex -space-x-1.5 sm:-space-x-2">
                    <img
                      alt="Sophia Carter avatar"
                      loading="lazy"
                      className="size-8 rounded-full border-2 border-white object-cover sm:size-9"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                    />
                    <img
                      alt="Ethan Walker avatar"
                      loading="lazy"
                      className="size-8 rounded-full border-2 border-white object-cover sm:size-9"
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                    />
                    <img
                      alt="Maya Patel avatar"
                      loading="lazy"
                      className="size-8 rounded-full border-2 border-white object-cover sm:size-9"
                      src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60"
                    />
                    <span className="grid size-8 place-items-center rounded-full border-2 border-white bg-white text-base leading-none text-[#5a6d8f] sm:size-9 sm:text-lg">
                      +
                    </span>
                  </div>
                  <div>
                    <p className="text-[14px] leading-none tracking-[0.08em] sm:text-[18px]">★★★★★</p>
                    <p className="mt-1 text-[8px] leading-none font-medium tracking-[0.01em] opacity-95 sm:text-[10px]">
                      Used by 1,000+ developers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="mx-auto w-full max-w-90 h-67.5 overflow-hidden rounded-[28px] border border-[#4c7fd2] bg-linear-to-b from-[#1a3470] via-[#1f4e97] to-[#2f79d7] pl-8 pt-10 shadow-[0_16px_30px_rgba(31,67,126,0.24)] transition hover:-translate-y-0.5 duration-300 md:max-w-none">
              <div className="h-full rounded-tl-2xl bg-[#f7fbff] p-4 sm:p-5">
                <p className="text-[12px] font-medium text-[#3c4f69] sm:text-[14px]">Monthly Invoice</p>
                <p className="mt-1 text-[36px] leading-none font-medium tracking-tight text-[#2d3f58] sm:mt-2 sm:text-[22px]">
                  $180.00
                </p>

                <div className="mt-2 flex h-32 items-end gap-2 sm:gap-2.5">
                  {[76, 28, 45, 36, 60, 48, 64, 74, 30, 46, 38].map((bar, index) => (
                    <div
                      key={index}
                      className={`w-full rounded-full ${
                        index === 6 ? 'bg-[#255fbe]' : 'bg-[#dbe4f8]'
                      }`}
                      style={{ height: `${bar}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <h3 className="text-[24px]/7.5 text-[#1b3f78] font-medium mt-6">
              boost your views with AI-optimized designs
            </h3>
            <p className="text-[#48648e] mt-2">
              Stop guessing and start ranking. Our AI creates designs proven to capture attention.
            </p>
            <a className="group flex items-center gap-2 mt-4 text-[#255fbe] hover:text-[#1e4f9f] transition">
              Start generating free
              <ExternalLinkIcon
                className="size-5 transition duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
