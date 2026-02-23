export function CtaSection() {
  return (
    <section className="mt-40 flex max-w-5xl flex-col items-center justify-between gap-6 rounded-2xl bg-linear-to-b from-[#3b67ab] to-[#244a82] px-6 py-16 text-left text-white md:mx-auto md:w-full md:flex-row xl:px-20">
      <div>
        <p className="bg-linear-to-r from-white to-[#9ec0ff] bg-clip-text text-4xl font-semibold text-transparent md:text-[46px] md:leading-15">
          Ready to go viral?
        </p>
        <p className="bg-linear-to-r from-white to-[#9ec0ff] bg-clip-text text-lg text-transparent">
          Join thousands of creators using AI to boost their CTR.
        </p>
      </div>
      <button className="mt-4 rounded-full bg-white px-12 py-3 text-sm text-[#1f3f75] transition hover:bg-[#d9e7fb]">
        Get Started
      </button>
    </section>
  );
}
