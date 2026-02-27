export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-charcoal text-cream">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,26,26,0.15),_transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-32 md:py-44 text-center">
          <p className="text-gold tracking-[0.3em] uppercase text-sm mb-6">
            Est. 2025 &middot; Palm Beach, FL
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight">
            Where Character
            <br />
            <span className="text-red-light">Meets Competition</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed">
            Palm Beach Basketball Club is an exclusive men&apos;s basketball
            community. We don&apos;t select for status, wealth, or accolades
            &mdash; we select for character.
          </p>
          <div className="mt-12 flex justify-center gap-4">
            <a
              href="/apply"
              className="bg-red text-cream text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-red-dark transition-colors"
            >
              Request a Tryout
            </a>
            <a
              href="#principles"
              className="border border-cream/30 text-cream text-sm tracking-widest uppercase px-8 py-3.5 hover:border-cream/60 transition-colors"
            >
              Our Principles
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-gold tracking-[0.3em] uppercase text-sm text-center mb-4">
            The Process
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-center mb-16">
            How Membership Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Apply",
                description:
                  "Submit your application. Tell us about yourself, your basketball experience, and what you're looking for in a club.",
              },
              {
                step: "02",
                title: "Tryout",
                description:
                  "Your first session is a tryout. We get to know you on and off the court. It's not about skill — it's about who you are.",
              },
              {
                step: "03",
                title: "Membership",
                description:
                  "If you're a fit, you'll receive an invitation to join. Membership means you're part of the brotherhood — and held to its standards.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <p className="text-6xl font-heading text-cream-dark font-bold">
                  {item.step}
                </p>
                <h3 className="mt-4 font-heading text-xl">{item.title}</h3>
                <p className="mt-3 text-charcoal/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section id="principles" className="bg-charcoal text-cream py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-gold tracking-[0.3em] uppercase text-sm text-center mb-4">
            What We Stand For
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-center mb-6">
            Our Principles
          </h2>
          <p className="text-center text-cream/60 max-w-2xl mx-auto mb-16">
            These aren&apos;t suggestions. They&apos;re the standards every
            member agrees to uphold. You get checked for falling short, and you
            can lose your membership for failing to live by them.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Respect",
                description:
                  "Every man on this court deserves your respect — opponents, teammates, and yourself. No exceptions.",
              },
              {
                title: "Accountability",
                description:
                  "Own your actions. When you mess up, you own it. When a brother messes up, you hold him to it.",
              },
              {
                title: "Integrity",
                description:
                  "Play fair. Speak honestly. Be the same man on the court that you claim to be off it.",
              },
              {
                title: "Brotherhood",
                description:
                  "We compete hard and lift each other up. This isn't a pickup game — it's a community built on trust.",
              },
              {
                title: "Growth",
                description:
                  "Show up to get better — as a player and as a man. Complacency has no place here.",
              },
              {
                title: "Discipline",
                description:
                  "Be on time. Be prepared. Control your emotions. The standards don't bend because you had a bad day.",
              },
            ].map((principle) => (
              <div
                key={principle.title}
                className="border border-cream/10 p-8 hover:border-gold/30 transition-colors"
              >
                <h3 className="font-heading text-xl text-gold">
                  {principle.title}
                </h3>
                <p className="mt-3 text-cream/60 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not For Everyone */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-gold tracking-[0.3em] uppercase text-sm mb-4">
            A Different Kind of Club
          </p>
          <h2 className="font-heading text-3xl md:text-4xl mb-8">
            This Isn&apos;t for Everyone
          </h2>
          <p className="text-charcoal/60 text-lg leading-relaxed max-w-2xl mx-auto">
            We&apos;re not a league. We&apos;re not a pickup game. We&apos;re a
            club of men who hold themselves to a higher standard. If that sounds
            like you, we want to hear from you.
          </p>
          <a
            href="/apply"
            className="inline-block mt-10 bg-red text-cream text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-red-dark transition-colors"
          >
            Request a Tryout
          </a>
        </div>
      </section>
    </>
  );
}
