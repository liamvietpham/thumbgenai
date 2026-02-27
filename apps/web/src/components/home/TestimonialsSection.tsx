
import VerifyBadgeIcon from '@/assets/icons/verify-badge.svg';

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
  return <VerifyBadgeIcon className="mt-0.5 h-3 w-3" />;
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
