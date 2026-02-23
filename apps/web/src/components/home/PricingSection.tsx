const plans = [
  {
    name: 'Starter',
    price: '$9',
    credits: '500 credits',
    perks: [
      '50 Premium AI Thumbnails',
      'Best for starters',
      'Access to all AI models',
      'No watermark on downloads',
      'High-quality',
      'Commercial usage allowed',
      'Credits never expire',
    ],
  },
  {
    name: 'Pro',
    price: '$19',
    credits: '1100 credits',
    perks: [
      '110 Premium AI Thumbnails',
      'Best for intermediate',
      'Access to all AI models',
      'No watermark on downloads',
      'High-quality',
      'Commercial usage allowed',
      'Credits never expire',
    ],
    popular: true,
  },
  {
    name: 'Ultra',
    price: '$49',
    credits: '2800 credits',
    perks: [
      '280 Premium AI Thumbnails',
      'Best for professionals',
      'Access to all AI models',
      'No watermark on downloads',
      'High-quality',
      'Commercial usage allowed',
      'Credits never expire',
    ],
  },
];

export function PricingSection({ className }: { className?: string }) {
  return (
    <section id="pricing" className={`${className || ''} mt-28`}>
      <p className="mx-auto w-max rounded-full border border-[#5d83bf] bg-[#d5e4fb] px-10 py-2 text-center font-medium text-[#2f5ea5]">
        Pricing
      </p>
      <h2 className="mx-auto mt-4 text-center text-3xl font-semibold text-[#1d447f]">
        Simple Pricing
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-[#4f6f9f]">
        Choose the plan that fits your creation schedule. Cancel anytime.
      </p>

      <div className="mt-20 flex flex-wrap items-center justify-center gap-8">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`relative w-72 rounded-xl border p-6 pb-8 text-left not-md:w-full ${
              plan.popular
                ? 'border-[#5d83bf] bg-[#a9c2e9]/80 shadow-[0_14px_30px_rgba(40,79,138,0.2)]'
                : 'border-[#8eaedf] bg-[#dbe8fb]/80 shadow-[0_10px_24px_rgba(58,94,148,0.12)]'
            }`}
          >
            {plan.popular ? (
              <p className="absolute -top-3.5 right-8 rounded-full bg-[#2f5ea5] px-3 py-1 text-sm text-white">
                Most Popular
              </p>
            ) : null}

            <p className="font-semibold text-[#1f3f75]">{plan.name}</p>
            <h4 className="text-3xl font-semibold text-[#1d447f]">
              {plan.price}{' '}
              <span className="text-sm font-medium text-[#4f6f9f]">/ {plan.credits}</span>
            </h4>

            <ul className="mt-6 list-none space-y-2 text-[#4b6690]">
              {plan.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2">
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
                    className="size-4.5 text-[#2f5ea5]"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <p>{perk}</p>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className={`mt-7 w-full rounded-md py-2.5 font-medium transition-all ${
                plan.popular
                  ? 'bg-[#1f4f95] text-white hover:bg-[#183f77]'
                  : 'bg-[#2f5ea5] text-white hover:bg-[#244a82]'
              }`}
            >
              Buy Now
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
