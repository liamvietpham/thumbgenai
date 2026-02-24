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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31"
              height="34"
              viewBox="0 0 31 34"
              fill="none"
              className="text-[#7ea6e6]"
            >
              <path
                d="M2.61599 20.1992C2.31123 20.2002 2.01243 20.1153 1.7543 19.9544C1.49617 19.7935 1.28932 19.5631 1.15776 19.2901C1.02621 19.017 0.975365 18.7125 1.01113 18.4119C1.04689 18.1113 1.1678 17.8269 1.3598 17.5918L17.3038 1.2761C17.4234 1.13898 17.5863 1.04633 17.7659 1.01334C17.9456 0.980347 18.1311 1.00898 18.2922 1.09455C18.4532 1.18011 18.5802 1.31752 18.6523 1.48421C18.7244 1.65091 18.7372 1.83699 18.6888 2.0119L15.5966 11.6414C15.5055 11.8838 15.4748 12.1445 15.5074 12.4012C15.54 12.6579 15.6347 12.903 15.7836 13.1153C15.9325 13.3276 16.131 13.5009 16.3621 13.6203C16.5932 13.7397 16.85 13.8017 17.1105 13.8008H28.384C28.6888 13.7998 28.9876 13.8847 29.2457 14.0456C29.5038 14.2065 29.7107 14.4369 29.8422 14.7099C29.9738 14.983 30.0246 15.2875 29.9889 15.5881C29.9531 15.8887 29.8322 16.1731 29.6402 16.4082L13.6962 32.7239C13.5766 32.861 13.4137 32.9537 13.2341 32.9867C13.0544 33.0197 12.8689 32.991 12.7078 32.9055C12.5468 32.8199 12.4198 32.6825 12.3477 32.5158C12.2756 32.3491 12.2628 32.163 12.3112 31.9881L15.4034 22.3586C15.4945 22.1162 15.5252 21.8555 15.4926 21.5988C15.46 21.3421 15.3653 21.097 15.2164 20.8847C15.0675 20.6724 14.869 20.4991 14.6379 20.3797C14.4068 20.2603 14.15 20.1983 13.8895 20.1992H2.61599Z"
                stroke="url(#paint0_linear_7113_911)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_7113_911"
                  x1="15.5"
                  y1="1"
                  x2="15.5"
                  y2="33"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="currentColor" />
                  <stop offset="1" stopColor="currentColor" />
                </linearGradient>
              </defs>
            </svg>
            <h3 className="text-base font-medium text-white">Smart Analysis</h3>
            <p className="text-slate-300 line-clamp-2 pb-4">
              Our AI analyzes video content to suggest the most clickable concepts.
            </p>
          </div>
        </div>

        <div className="p-px rounded-[13px] bg-linear-to-br from-sky-600 to-sky-900 not-md:w-full">
          <div className="p-6 rounded-xl space-y-4 border border-sky-900 bg-slate-950 md:max-w-80 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="34"
              viewBox="0 0 33 34"
              fill="none"
              className="text-[#7ea6e6]"
            >
              <path
                d="M8.61719 13.7773V32.43"
                stroke="url(#paint0_linear_7113_912)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.0664 7.37672L19.512 13.7808H28.5741C29.0567 13.7808 29.5327 13.8931 29.9643 14.109C30.396 14.3248 30.7715 14.6382 31.0611 15.0243C31.3506 15.4104 31.5463 15.8586 31.6327 16.3334C31.719 16.8083 31.6936 17.2967 31.5585 17.76L27.9368 30.1951C27.7484 30.8408 27.3557 31.4081 26.8176 31.8116C26.2795 32.2152 25.625 32.4334 24.9523 32.4334H3.96814C3.14365 32.4334 2.35292 32.1059 1.76991 31.5229C1.1869 30.9398 0.859375 30.1491 0.859375 29.3246V16.8895C0.859375 16.0651 1.1869 15.2743 1.76991 14.6913C2.35292 14.1083 3.14365 13.7808 3.96814 13.7808H8.25825C8.83661 13.7805 9.40342 13.6188 9.89494 13.314C10.3865 13.0092 10.7832 12.5734 11.0406 12.0554L16.4032 1.3457C17.1362 1.35478 17.8577 1.52938 18.5138 1.85647C19.1698 2.18355 19.7435 2.65466 20.1919 3.2346C20.6403 3.81453 20.9518 4.4883 21.1033 5.20555C21.2547 5.92281 21.2421 6.66502 21.0664 7.37672Z"
                stroke="url(#paint1_linear_7113_912)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_7113_912"
                  x1="9.11719"
                  y1="13.7773"
                  x2="9.11719"
                  y2="32.43"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="currentColor" />
                  <stop offset="1" stopColor="currentColor" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_7113_912"
                  x1="16.2711"
                  y1="1.3457"
                  x2="16.2711"
                  y2="32.4334"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="currentColor" />
                  <stop offset="1" stopColor="currentColor" />
                </linearGradient>
              </defs>
            </svg>
            <h3 className="text-base font-medium text-white">Eye-Catching Designs</h3>
            <p className="text-slate-300 line-clamp-2 pb-4">
              Generate vibrant, high-contrast thumbnails that stand out in the feed.
            </p>
          </div>
        </div>

        <div className="not-md:w-full">
          <div className="p-6 rounded-xl space-y-4 border border-sky-900 bg-slate-950 md:max-w-80 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              className="text-[#7ea6e6]"
            >
              <path
                d="M12.2778 23.0721C18.2777 23.0721 23.1415 18.2084 23.1415 12.2089C23.1415 6.20931 18.2777 1.3457 12.2778 1.3457C6.27792 1.3457 1.41406 6.20931 1.41406 12.2089C1.41406 18.2084 6.27792 23.0721 12.2778 23.0721Z"
                stroke="url(#paint0_linear_7113_915)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.5825 32.3826C27.5824 32.3826 32.4462 27.519 32.4462 21.5194C32.4462 15.5199 27.5824 10.6562 21.5825 10.6562C15.5826 10.6562 10.7188 15.5199 10.7188 21.5194C10.7188 27.519 15.5826 32.3826 21.5825 32.3826Z"
                stroke="url(#paint1_linear_7113_915)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_7113_915"
                  x1="12.2778"
                  y1="1.3457"
                  x2="12.2778"
                  y2="23.0721"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="currentColor" />
                  <stop offset="1" stopColor="currentColor" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_7113_915"
                  x1="21.5825"
                  y1="10.6562"
                  x2="21.5825"
                  y2="32.3826"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="currentColor" />
                  <stop offset="1" stopColor="currentColor" />
                </linearGradient>
              </defs>
            </svg>
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
                className="size-5 group-hover:translate-x-0.5 transition duration-300"
                aria-hidden="true"
              >
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
