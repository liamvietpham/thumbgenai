export default function PrivacyPolicyPage() {
  return (
    <div className="rounded-2xl border border-[#8eaedf] bg-[#dbe8fb]/70 p-8 text-[#4f6f9f] backdrop-blur-md md:p-12">
      <div className="mb-16 text-center">
        <h1 className="mb-6 bg-linear-to-r from-[#2f5ea5] to-[#5d83bf] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
          Privacy Policy
        </h1>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-xl font-medium text-[#1d447f]">1. Introduction</h2>
          <div className="text-sm leading-relaxed text-[#4f6f9f]">
            <p>
              Welcome to <strong>ThumbgenAI</strong>. We respect your privacy and are committed to
              protecting your personal data. This Privacy Policy explains how we collect, use, and
              safeguard your information when you use our AI-powered thumbnail generation services.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-medium text-[#1d447f]">2. Information We Collect</h2>
          <div className="text-sm leading-relaxed text-[#4f6f9f]">
            <p className="mb-4">We may collect the following types of data:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Identity Data:</strong> name, username.
              </li>
              <li>
                <strong>Contact Data:</strong> email address.
              </li>
              <li>
                <strong>Account Data:</strong> login status, subscription details.
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type, device information.
              </li>
              <li>
                <strong>Usage Data:</strong> interactions with our website and tools.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-medium text-[#1d447f]">
            3. User Content &amp; AI Processing
          </h2>
          <div className="text-sm leading-relaxed text-[#4f6f9f]">
            <p className="mb-4">
              When using ThumbgenAI, you may upload images, text prompts, or branding assets
              (&ldquo;User Content&rdquo;) for the purpose of generating thumbnails.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>User Content is processed solely to provide the requested service.</li>
              <li>
                <strong>We do not train AI models on your content.</strong>
              </li>
              <li>Your content is not shared publicly or reused without permission.</li>
              <li>
                Third-party AI services, if used, are bound by strict data-protection agreements.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-medium text-[#1d447f]">4. How We Use Your Data</h2>
          <div className="text-sm leading-relaxed text-[#4f6f9f]">
            <p className="mb-4">We use your data only when legally permitted, including to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Provide and operate our services.</li>
              <li>Generate AI-powered thumbnails.</li>
              <li>Improve performance, reliability, and security.</li>
              <li>Communicate service-related updates.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-medium text-[#1d447f]">
            5. Data Retention &amp; Security
          </h2>
          <div className="text-sm leading-relaxed text-[#4f6f9f]">
            <p className="mb-4">
              We retain personal data and user content only as long as necessary to provide the
              service or comply with legal requirements.
            </p>
            <p>
              We apply appropriate technical and organizational security measures, including
              encrypted connections and restricted internal access, to protect your data.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-medium text-[#1d447f]">6. Your Privacy Rights</h2>
          <div className="text-sm leading-relaxed text-[#4f6f9f]">
            <p>
              Depending on your location, you may have the right to access, correct, or delete your
              personal data, object to processing, or withdraw consent at any time. Requests can be
              made through our Contact page.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-medium text-[#1d447f]">7. Contact Us</h2>
          <div className="text-sm leading-relaxed text-[#4f6f9f]">
            <p>
              If you have any questions about this Privacy Policy or how we handle your data, please
              contact us via our Contact page or email us at{' '}
              <strong>support@thumbnailgo.com</strong>.
            </p>
          </div>
        </section>

        <div className="border-t border-[#8eaedf] pt-8 text-sm text-[#6b88b5]">
          Last updated: 06-01-2026
        </div>
      </div>
    </div>
  );
}
