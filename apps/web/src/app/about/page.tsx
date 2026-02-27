import LightningIcon from '@/assets/icons/lightning.svg';
import PaletteIcon from '@/assets/icons/palette.svg';
import WandIcon from '@/assets/icons/wand.svg';

export default function AboutPage() {
  return (
    <div className="rounded-2xl border border-[#8eaedf] bg-[#dbe8fb]/70 p-8 text-[#4f6f9f] backdrop-blur-md md:p-12">
      <h1 className="mb-8 text-3xl font-semibold text-[#1d447f] md:text-5xl">
        About <br />
        <span className="bg-linear-to-r from-[#2f5ea5] to-[#5d83bf] bg-clip-text text-transparent md:text-4xl">
          ThumbgenAI
        </span>
      </h1>

      <div className="relative grid items-start gap-12 md:grid-cols-2">
        <div className="space-y-4 leading-relaxed">
          <p>
            ThumbgenAI is an AI powered thumbnail generator which helps the creators to quickly
            design eye-catching, high CTR thumbnails for YouTube videos, blogs and social media
            posts.
          </p>
          <p>
            Its smart thumbnail creator and analysis tool that produces vibrant and optimized
            thumbnails to boost views and engagement.
          </p>
          <p>
            Users can generate professional results in a few seconds, making designs to stand out
            and attract more clicks.
          </p>
        </div>

        <div className="sticky top-20 rounded-2xl border border-[#8eaedf] bg-linear-to-br from-[#dbe8fb]/80 to-[#dbe8fb]/40 p-8">
          <h3 className="mb-6 text-2xl font-semibold text-[#1d447f]">Why Choose Us?</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="p-2 text-[#2f5ea5]">
                <LightningIcon className="size-4.5" />
              </div>
              <div>
                <h4 className="mb-1 font-medium text-[#1f3f75]">Lightning Fast</h4>
                <p className="max-w-xs text-sm text-[#4f6f9f]">
                  Generate professional thumbnails in seconds
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="p-2 text-[#2f5ea5]">
                <WandIcon className="size-4.5" />
              </div>
              <div>
                <h4 className="mb-1 font-medium text-[#1f3f75]">AI Powered</h4>
                <p className="max-w-xs text-sm text-[#4f6f9f]">
                  Using state-of-the-art AI to optimize for clicks.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="p-2 text-[#2f5ea5]">
                <PaletteIcon className="size-4.5" />
              </div>
              <div>
                <h4 className="mb-1 font-medium text-[#1f3f75]">Fully Customizable</h4>
                <p className="max-w-xs text-sm text-[#4f6f9f]">
                  Edit every detail to match your brand&apos;s unique style.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-[#8eaedf] bg-[#dbe8fb]/60 p-6">
          <h4 className="mb-2 font-medium text-[#1f3f75]">Built for Small Channels</h4>
          <p className="text-[13px] text-[#4f6f9f]">
            Made for solo YouTubers doing everything themselves - no designer, no team, no
            complicated tools.
          </p>
        </div>
        <div className="rounded-xl border border-[#8eaedf] bg-[#dbe8fb]/60 p-6">
          <h4 className="mb-2 font-medium text-[#1f3f75]">Thumbnails Without Design Skills</h4>
          <p className="text-[13px] text-[#4f6f9f]">
            Describe your video and let AI generate thumbnails you can tweak in minutes, even if
            you&apos;ve never designed before.
          </p>
        </div>
        <div className="rounded-xl border border-[#8eaedf] bg-[#dbe8fb]/60 p-6">
          <h4 className="mb-2 font-medium text-[#1f3f75]">Stop Losing Clicks</h4>
          <p className="text-[13px] text-[#4f6f9f]">
            Create better looking thumbnails fast so your videos don&apos;t get ignored - even with
            a small audience.
          </p>
        </div>
      </div>
    </div>
  );
}
