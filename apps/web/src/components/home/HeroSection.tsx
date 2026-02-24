'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';

export function HeroSection() {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const maxTilt = 5;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt * 2;

    setTilt({ rotateX, rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <section className="relative">
      <div className="overflow-hidden rounded-3xl">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-190 -translate-x-1/2" />

        <div className="relative mx-auto max-w-3xl text-center">
          <Link
            href="/generate"
            className="group mx-auto inline-flex w-full max-w-sm items-center justify-between gap-2 rounded-full bg-[#eaf2ff] px-3 py-1.5 text-[#5573a3] sm:w-auto sm:max-w-none sm:justify-start sm:px-2 sm:py-1"
          >
            <span className="rounded-full bg-[#255fbe] px-3.5 py-1 text-xs text-white">Free</span>
            <span className="min-w-0 truncate text-base sm:text-inherit">#1 AI Thumbnail Generator For YouTube</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-[#7b93bb] transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </Link>

          <h1 className="text-5xl/17 md:text-6xl/21 font-medium max-w-3xl text-center text-[#1b3f78]">
            AI Thumbnail Generator for your{' '}
            <span className="rounded-xl bg-linear-to-r from-[#1e4f9f] to-[#3f7fe9] px-2 py-1 text-white md:px-3">
              Videos.
            </span>
          </h1>

          <p className="text-base text-center text-[#48648e] max-w-lg mt-6 mx-auto">
            Stop wasting hours on design. Get high-converting thumbnails in seconds with our
            advanced AI.
          </p>

          <div className="mx-auto mt-8 flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-3xl sm:flex-row sm:items-center">
            <Link
              className="flex h-11 w-full items-center justify-center rounded-full bg-[#255fbe] px-6 text-base text-white transition hover:bg-[#1e4f9f] sm:w-auto sm:px-7 sm:text-lg"
              href="/generate"
            >
              Generate now
            </Link>
            <Link
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#255fbe] px-6 text-base text-[#36557f] transition hover:border-[#1e4f9f] hover:bg-[#eaf2ff] hover:text-[#1f4e94] sm:w-auto sm:text-lg"
              href="/community"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span className="whitespace-nowrap">View Creations</span>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-14 mt-12">
            <div className="flex items-center gap-2">
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
                className="size-5 text-[#255fbe]"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
              <p className="text-[#5b739b]">No design skills needed</p>
            </div>
            <div className="flex items-center gap-2">
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
                className="size-5 text-[#255fbe]"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
              <p className="text-[#5b739b]">Fast generation</p>
            </div>
            <div className="flex items-center gap-2">
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
                className="size-5 text-[#255fbe]"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
              <p className="text-[#5b739b]">High CTR templates</p>
            </div>
          </div>
        </div>

        <figure className="relative mt-16 mx-auto flex w-full max-w-4xl items-center justify-center perspective-distant">
          <div
            className="relative w-full max-w-4xl transform-3d transition-transform duration-1000 ease-out will-change-transform"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg)`,
            }}
          >
            <div className="w-full overflow-hidden rounded-[15px] bg-[linear-gradient(180deg,#255fbe_0%,rgba(37,95,190,0.28)_35%,rgba(37,95,190,0)_100%)] p-1">
              <img
                alt="hero section showcase"
                loading="lazy"
                width="1280"
                height="720"
                decoding="async"
                data-nimg="1"
                className="block w-full rounded-[14px] will-change-transform transform:[translateZ(0)]"
                src="/hero_img.webp"
                style={{ color: 'transparent' }}
              />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
