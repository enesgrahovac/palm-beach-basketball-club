export default function ThankYou() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-gold tracking-[0.3em] uppercase text-sm mb-4">
          Application Received
        </p>
        <h1 className="font-heading text-3xl md:text-4xl mb-6">
          Thank You for Applying
        </h1>
        <p className="text-charcoal/60 text-lg leading-relaxed mb-4">
          We&apos;ve received your application and will review it shortly. If
          we think you&apos;d be a good fit, we&apos;ll reach out to schedule
          your tryout session.
        </p>
        <p className="text-charcoal/60 leading-relaxed mb-10">
          In the meantime, keep an eye on your email. We typically respond
          within a few days.
        </p>
        <a
          href="/"
          className="inline-block border border-charcoal/20 text-charcoal text-sm tracking-widest uppercase px-8 py-3.5 hover:border-charcoal/40 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </section>
  );
}
