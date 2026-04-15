import LocationIcon from '@/components/icons/generated/LocationIcon';
import MailIcon from '@/components/icons/generated/MailIcon';

const fieldShellClass =
  'w-full rounded-[1rem] border border-[rgba(194,198,214,0.55)] bg-[var(--surface-container-low)] px-4 py-3 text-[var(--on-surface)] placeholder:text-[var(--outline)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,88,190,0.16)] transition-all';

export default function ContactPage() {
  return (
    <div className="grid gap-12 pt-10 md:grid-cols-2 md:gap-16 md:pt-20">
      <div className="space-y-10">
        <div className="space-y-4">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-[var(--on-surface)] md:text-5xl">
            Get in Touch
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-[var(--on-surface-variant)]">
            Have a question, feedback, or need support? We&apos;d love to hear from you. Fill out
            the form and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              icon: <MailIcon aria-hidden="true" />,
              label: 'Email',
              value: 'support@thumbnailai.com',
            },
            {
              icon: <LocationIcon aria-hidden="true" />,
              label: 'Location',
              value: 'Bangalore, India',
            },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-[1rem] border border-[rgba(194,198,214,0.5)] bg-[var(--surface-container-lowest)] text-[var(--primary)] shadow-sm">
                {icon}
              </div>
              <div>
                <p className="font-medium text-[var(--on-surface)]">{label}</p>
                <p className="text-sm text-[var(--on-surface-variant)]">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-[rgba(194,198,214,0.5)] bg-[var(--surface-container-lowest)] p-8 shadow-[0_12px_36px_rgba(0,88,190,0.06)]">
        <form className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--on-surface-variant)]">Name</label>
              <input
                required
                name="name"
                type="text"
                placeholder="John Doe"
                defaultValue=""
                className={fieldShellClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--on-surface-variant)]">Email</label>
              <input
                required
                name="email"
                type="email"
                placeholder="john@example.com"
                defaultValue=""
                className={fieldShellClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--on-surface-variant)]">Subject</label>
            <input
              required
              name="subject"
              type="text"
              placeholder="How can we help?"
              defaultValue=""
              className={fieldShellClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--on-surface-variant)]">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell us more regarding your inquiry..."
              className={`${fieldShellClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-[1rem] bg-gradient-to-r from-[#0058be] to-[#2170e4] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[rgba(0,88,190,0.20)] tonal-transition hover:scale-[1.01]"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
