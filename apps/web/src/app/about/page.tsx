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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4.5"
                >
                  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4.5"
                >
                  <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
                  <path d="m14 7 3 3"></path>
                  <path d="M5 6v4"></path>
                  <path d="M19 14v4"></path>
                  <path d="M10 2v2"></path>
                  <path d="M7 8H5"></path>
                  <path d="M21 16h-2"></path>
                  <path d="M11 3H9"></path>
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4.5"
                >
                  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
                  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
                  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
                  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
                </svg>
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
