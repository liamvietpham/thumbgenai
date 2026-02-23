export default function RefundPolicyPage() {
  return (
    <div className="rounded-2xl border border-[#8eaedf] bg-[#dbe8fb]/70 p-8 text-[#4f6f9f] backdrop-blur-md md:p-12">
      <div className="mb-16 text-center">
        <h1 className="mb-6 bg-linear-to-r from-[#2f5ea5] to-[#5d83bf] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
          Refund Policy
        </h1>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-xl font-medium text-[#1d447f]">1. Overview</h2>
          <div className="text-sm leading-relaxed text-[#4f6f9f]">
            <p>
              Thank you for using <strong>ThumbgenAI</strong>. Because our service provides digital
              credits that are delivered instantly and can be used immediately, all purchases are
              final and non-refundable except in the limited cases outlined below.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-medium text-[#1d447f]">2. Non-Refundable Purchases</h2>
          <div className="text-sm leading-relaxed text-[#4f6f9f]">
            <p className="mb-4">We do not issue refunds for:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Change of mind after purchase</li>
              <li>Unused or partially used credits</li>
              <li>Dissatisfaction with generated thumbnails or designs</li>
              <li>Purchasing the wrong plan or credit package</li>
              <li>Account inactivity or failure to use credits</li>
            </ul>
            <p className="mt-4">
              Once credits are added to your account, they cannot be exchanged for cash or
              transferred.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-medium text-[#1d447f]">
            3. Refunds Due to Technical Issues
          </h2>
          <div className="text-sm leading-relaxed text-[#4f6f9f]">
            <p className="mb-4">
              A refund or credit re-issue may be considered only if all of the following conditions
              are met:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Payment was successfully processed and deducted</li>
              <li>Credits were not added due to a verified system error</li>
              <li>Our internal systems confirm the failure</li>
            </ul>
            <p className="mt-4">
              If approved, we may restore the missing credits or issue a refund to the original
              payment method at our discretion.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-medium text-[#1d447f]">
            4. How to Request Support or a Refund Review
          </h2>
          <div className="text-sm leading-relaxed text-[#4f6f9f]">
            <p className="mb-4">
              If you believe a technical error has occurred, please contact us at{' '}
              <strong className="text-[#2f5ea5]">support@thumbnailgo.com</strong> and include:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Your registered account email</li>
              <li>Transaction ID or receipt</li>
              <li>Date of payment</li>
              <li>Description of the issue</li>
              <li>Screenshots or supporting evidence (if available)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-medium text-[#1d447f]">
            5. Fraudulent or Unauthorized Payments
          </h2>
          <div className="text-sm leading-relaxed text-[#4f6f9f]">
            <p>
              If we detect fraud, abuse, chargebacks, or suspicious activity, we reserve the right
              to suspend or restrict the associated account, deny refund requests, and report the
              activity to the payment provider or relevant authorities.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-medium text-[#1d447f]">6. Changes to This Policy</h2>
          <div className="text-sm leading-relaxed text-[#4f6f9f]">
            <p>
              We may update this Refund Policy from time to time. Continued use of ThumbgenAI after
              changes take effect constitutes acceptance of the updated policy.
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
