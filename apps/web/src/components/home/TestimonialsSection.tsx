const testimonialsTop = [
  {
    name: 'Sophia Carter',
    handle: '@sophiacodes',
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
    text: 'This SaaS app has completely streamlined our onboarding process. What used to take hours now takes minutes!',
  },
  {
    name: 'Ethan Walker',
    handle: '@ethanwrites',
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
    text: "We've tried several tools, but nothing comes close in terms of speed and simplicity. Absolute game-changer.",
  },
  {
    name: 'Maya Patel',
    handle: '@mayapatel',
    image:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
    text: 'The automation features alone have saved our team countless hours every week. Worth every penny.',
  },
  {
    name: 'Liam Brooks',
    handle: '@liambrooks',
    image:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
    text: 'Setup was ridiculously easy. Within 10 minutes, we were running live and onboarding our first customers.',
  },
  {
    name: 'Olivia Bennett',
    handle: '@oliviadesigns',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60',
    text: 'The quality of the generated designs is top-notch. It has become an essential part of my creative workflow.',
  },
  {
    name: 'James Wilson',
    handle: '@jamesvlogs',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60',
    text: 'I was skeptical about AI design, but this tool proved me wrong. The results are consistently impressive.',
  },
  {
    name: 'Isabella Garcia',
    handle: '@isabellacreates',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=60',
    text: 'The interface is so intuitive. I can go from an idea to a finished product in less than a minute.',
  },
  {
    name: 'Noah Thompson',
    handle: '@noahdigital',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=60',
    text: 'Finally, a tool that actually delivers on its promise of speed and quality. Highly recommended for any creator.',
  },
];

const testimonialsBottom = [
  {
    name: 'Lucas Miller',
    handle: '@lucas_edits',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=60',
    text: "The click-through rate on my videos has increased by 40% since I started using ThumbgenAI. It's a must-have for YouTubers.",
  },
  {
    name: 'Aarav Mehta',
    handle: '@aaravyt',
    image:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&auto=format&fit=crop&q=60',
    text: 'I generate 5-6 thumbnail variations per video and pick the best one. My average CTR jumped noticeably within a week.',
  },
  {
    name: 'Chloe Ramirez',
    handle: '@chloemedia',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=60',
    text: 'This tool understands what actually makes people click. Faces, contrast, emotions - it nails all of it automatically.',
  },
  {
    name: 'Daniel Kim',
    handle: '@dankimstudio',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=60',
    text: 'As an agency owner, this saves us hours per client. Thumbnails that used to take 30 minutes now take under 60 seconds.',
  },
  {
    name: 'Marcus Johnson',
    handle: '@marcusgrowth',
    image:
      'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=200&auto=format&fit=crop&q=60',
    text: 'The AI suggestions are surprisingly smart. It picks text placement and colors that perform better, not just look good.',
  },
  {
    name: 'Emily Turner',
    handle: '@emilyvlogs',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=60',
    text: 'I stopped outsourcing thumbnails completely. This app pays for itself in the first few videos.',
  },
  {
    name: 'Rohit Verma',
    handle: '@rohitclips',
    image:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&auto=format&fit=crop&q=60',
    text: "Perfect for daily uploads. Fast, consistent, and optimized for YouTube's algorithm.",
  },
  {
    name: 'Sofia Lindstrom',
    handle: '@sofiamakes',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=60',
    text: "The templates don't feel generic at all. Every thumbnail still feels custom and on-brand.",
  },
];

function VerifyBadge() {
  return (
    <svg className="mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
        fill="#2196F3"
      />
    </svg>
  );
}

function TestimonialCard({ name, handle, image, text }: { name: string; handle: string; image: string; text: string }) {
  return (
    <div className="mx-4 w-72 shrink-0 rounded-lg border border-[#8eaedf] bg-[#dbe8fb]/80 p-4 shadow-[0_10px_24px_rgba(58,94,148,0.12)] backdrop-blur-sm">
      <div className="flex gap-2">
        <img alt={name} loading="lazy" width="50" height="50" decoding="async" data-nimg="1" className="size-11 rounded-full object-cover" src={image} />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="text-[#1f3f75]">{name}</p>
            <VerifyBadge />
          </div>
          <span className="text-xs text-[#5272a2]">{handle}</span>
        </div>
      </div>
      <p className="pt-4 text-sm text-[#4b6690] line-clamp-2">{text}</p>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: typeof testimonialsTop; reverse?: boolean }) {
  const loopItems = [...items, ...items];

  return (
    <div className="w-full overflow-hidden py-5">
      <div
        className={`flex w-max flex-nowrap items-stretch animate-[marquee-scroll_70s_linear_infinite] ${
          reverse ? '[animation-direction:reverse]' : ''
        }`}
      >
        {loopItems.map((item, index) => (
          <TestimonialCard key={`${item.handle}-${reverse ? 'rev' : 'norm'}-${index}`} {...item} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials">
      <p className="mx-auto mt-28 w-max rounded-full border border-[#5d83bf] bg-[#d5e4fb] px-10 py-2 text-center font-medium text-[#2f5ea5]">
        Testimonials
      </p>
      <h2 className="mx-auto mt-4 text-center text-3xl font-semibold text-[#1d447f]">Loved by creators</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-[#4f6f9f]">
        See how our AI thumbnails generator are helping channels explode their views.
      </p>

      <div className="max-w-5xl mx-auto mt-11">
        <MarqueeRow items={testimonialsTop} />
      </div>

      <div className="max-w-5xl mx-auto">
        <MarqueeRow items={testimonialsBottom} reverse />
      </div>
    </section>
  );
}
