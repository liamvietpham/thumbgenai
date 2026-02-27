import LocationIcon from '@/assets/icons/location.svg';
import MailIcon from '@/assets/icons/mail.svg';

export default function ContactPage() {
  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-16">
      <div className="space-y-8">
        <div className="mb-16 text-center">
          <h1 className="mb-6 bg-linear-to-r from-[#2f5ea5] to-[#5d83bf] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[#4f6f9f]">
            Have a question, feedback, or need support? We&apos;d love to hear from you. Fill out
            the form below and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 text-[#4f6f9f]">
            <div className="rounded-xl border border-[#8eaedf] bg-[#dbe8fb]/70 p-3 text-[#2f5ea5]">
              <MailIcon aria-hidden="true" />
            </div>
            <div>
              <h4 className="font-medium text-[#1d447f]">Email</h4>
              <p className="text-sm text-[#4f6f9f]">support@thumbgenai.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[#4f6f9f]">
            <div className="rounded-xl border border-[#8eaedf] bg-[#dbe8fb]/70 p-3 text-[#2f5ea5]">
              <LocationIcon aria-hidden="true" />
            </div>
            <div>
              <h4 className="font-medium text-[#1d447f]">Location</h4>
              <p className="text-sm text-[#4f6f9f]">Bangalore, India</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#8eaedf] bg-[#dbe8fb]/70 p-8 backdrop-blur-md">
        <form className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#4f6f9f]">Name</label>
              <input
                required
                className="w-full rounded-lg border border-[#8eaedf] bg-[#dbe8fb]/80 px-4 py-3 text-[#1f3f75] transition-all placeholder:text-[#6b88b5] focus:outline-none focus:ring-2 focus:ring-[#2f5ea5]/50"
                placeholder="John Doe"
                type="text"
                defaultValue=""
                name="name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#4f6f9f]">Email</label>
              <input
                required
                className="w-full rounded-lg border border-[#8eaedf] bg-[#dbe8fb]/80 px-4 py-3 text-[#1f3f75] transition-all placeholder:text-[#6b88b5] focus:outline-none focus:ring-2 focus:ring-[#2f5ea5]/50"
                placeholder="john@example.com"
                type="email"
                defaultValue=""
                name="email"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#4f6f9f]">Subject</label>
            <input
              required
              className="w-full rounded-lg border border-[#8eaedf] bg-[#dbe8fb]/80 px-4 py-3 text-[#1f3f75] transition-all placeholder:text-[#6b88b5] focus:outline-none focus:ring-2 focus:ring-[#2f5ea5]/50"
              placeholder="How can we help?"
              type="text"
              defaultValue=""
              name="subject"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#4f6f9f]">Message</label>
            <textarea
              name="message"
              required
              rows={4}
              className="mt-2 w-full resize-none rounded-lg border border-[#8eaedf] bg-[#dbe8fb]/80 px-4 py-3 text-[#1f3f75] transition-all placeholder:text-[#6b88b5] focus:outline-none focus:ring-2 focus:ring-[#2f5ea5]/50"
              placeholder="Tell us more regarding your inquiry..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-linear-to-b from-[#2f5ea5] to-[#244a82] px-6 py-3 font-semibold text-white shadow-lg transition hover:shadow-[#2f5ea5]/25"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
