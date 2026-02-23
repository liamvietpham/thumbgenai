import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[#3f649d] bg-[#1b3f75]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="text-lg font-semibold text-[#f3f8ff]">
            Thumbgen<span className="text-[#9fc1f6]">AI</span>
          </div>
          <p className="mt-3 text-sm text-[#c8daf6]">
            AI thumbnail generator for creators.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#f3f8ff]">Pages</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/" className="text-[#c8daf6] transition hover:text-white">Home</Link></li>
            <li><Link href="/generate" className="text-[#c8daf6] transition hover:text-white">Generate</Link></li>
            <li><Link href="/community" className="text-[#c8daf6] transition hover:text-white">Community</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#f3f8ff]">Company</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/about" className="text-[#c8daf6] transition hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="text-[#c8daf6] transition hover:text-white">Contact Us</Link></li>
            <li><Link href="/pricing" className="text-[#c8daf6] transition hover:text-white">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#f3f8ff]">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/privacy-policy" className="text-[#c8daf6] transition hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-[#c8daf6] transition hover:text-white">Terms of Service</Link></li>
            <li><Link href="/refund-policy" className="text-[#c8daf6] transition hover:text-white">Refund Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#3f649d] py-4 text-center text-xs text-[#aac8e8]">
        © {new Date().getFullYear()} ThumbgenAI. All rights reserved.
      </div>
    </footer>
  );
}
