import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import MailIcon from '@/assets/icons/mail.svg';
import UserIcon from '@/assets/icons/user.svg';

export function ContactSection() {
  return (
    <section>
      <p className="mx-auto mt-28 w-max rounded-full border border-[#5d83bf] bg-[#d5e4fb] px-10 py-2 text-center font-medium text-[#2f5ea5]">
        Contact
      </p>
      <h2 className="mx-auto mt-4 text-center text-3xl font-semibold text-[#1d447f]">Grow your channel</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-[#4f6f9f]">
        Have questions about our Thumbnail Generator, Ready to scale your views? Let&apos;s talk.
      </p>

      <form className="mx-auto mt-16 grid w-full max-w-2xl gap-3 text-[#4f6f9f] sm:grid-cols-2 sm:gap-5">
        <div>
          <p className="mb-2 font-medium text-[#2f5ea5]">Your name</p>
          <div className="flex items-center rounded-lg bg-[#dbe8fb]/80 pl-3 ring-2 ring-[#8eaedf] transition-all focus-within:ring-[#2f5ea5]">
            <UserIcon className="size-5 text-[#2f5ea5]" aria-hidden="true" />
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full bg-transparent p-3 text-[#1f3f75] outline-none placeholder:text-[#6b88b5]"
              name="name"
              defaultValue=""
            />
          </div>
        </div>

        <div>
          <p className="mb-2 font-medium text-[#2f5ea5]">Email id</p>
          <div className="flex items-center rounded-lg bg-[#dbe8fb]/80 pl-3 ring-2 ring-[#8eaedf] transition-all focus-within:ring-[#2f5ea5]">
            <MailIcon className="size-5 text-[#2f5ea5]" aria-hidden="true" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent p-3 text-[#1f3f75] outline-none placeholder:text-[#6b88b5]"
              name="email"
              defaultValue=""
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <p className="mb-2 font-medium text-[#2f5ea5]">Message</p>
          <textarea
            name="message"
            rows={8}
            placeholder="Enter your message"
            className="w-full resize-none rounded-lg bg-[#dbe8fb]/80 p-3 text-[#1f3f75] outline-none ring-2 ring-[#8eaedf] transition-all placeholder:text-[#6b88b5] focus:ring-[#2f5ea5]"
          ></textarea>
        </div>

        <button
          type="submit"
          className="flex w-max items-center gap-2 rounded-full bg-[#2f5ea5] px-10 py-3 text-white transition-all hover:bg-[#244a82]"
        >
          Submit
          <ArrowRightIcon className="size-5" aria-hidden="true" />
        </button>
      </form>
    </section>
  );
}
