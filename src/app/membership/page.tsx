"use client";

import { useState } from "react";

export default function Membership() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-gold tracking-[0.3em] uppercase text-sm mb-4">
          Welcome to the Club
        </p>
        <h1 className="font-heading text-3xl md:text-4xl mb-6">
          Secure Your Membership
        </h1>
        <p className="text-charcoal/60 text-lg leading-relaxed mb-10">
          You&apos;ve been invited to join Palm Beach Basketball Club.
          Complete your membership payment below to lock in your spot.
        </p>

        <div className="border border-charcoal/10 p-8 md:p-12 bg-white">
          <h2 className="font-heading text-2xl mb-2">Club Membership</h2>
          <p className="text-charcoal/50 mb-6">
            Monthly dues &middot; Cancel anytime
          </p>
          <p className="text-4xl font-heading font-bold text-charcoal mb-8">
            $50<span className="text-lg font-normal text-charcoal/50">/mo</span>
          </p>
          <ul className="text-left text-charcoal/70 space-y-3 mb-10 max-w-sm mx-auto">
            {[
              "Weekly organized sessions",
              "Access to member-only events",
              "Community of high-character men",
              "Priority court booking",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-gold mt-0.5">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>

          {error && <p className="text-red text-sm mb-4">{error}</p>}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-red text-cream text-sm tracking-widest uppercase px-8 py-4 hover:bg-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Redirecting..." : "Pay & Join"}
          </button>

          <p className="mt-4 text-xs text-charcoal/40">
            Secure payment powered by Stripe. You can cancel your membership at
            any time.
          </p>
        </div>
      </div>
    </section>
  );
}