"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { WAIVER_TEXT } from "./waiver-text";

export default function Tryout() {
  return (
    <Suspense>
      <TryoutContent />
    </Suspense>
  );
}

function TryoutContent() {
  const searchParams = useSearchParams();
  const applicantId = searchParams.get("id") || "";
  const [agreed, setAgreed] = useState(false);
  const [fullName, setFullName] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/waiver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicantId,
          fullName,
          emergencyName,
          emergencyPhone,
          agreedToWaiver: agreed,
          signedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-gold tracking-[0.3em] uppercase text-sm mb-4">
            You&apos;re All Set
          </p>
          <h1 className="font-heading text-3xl md:text-4xl mb-6">
            See You on the Court
          </h1>
          <p className="text-charcoal/60 text-lg leading-relaxed mb-4">
            Your waiver has been signed and we&apos;ve got you down for your
            tryout session. Check your email for the details.
          </p>
          <p className="text-charcoal/60 leading-relaxed mb-10">
            Show up on time, bring water, and come ready to play.
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

  const inputClasses =
    "w-full border border-charcoal/20 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-red transition-colors";
  const labelClasses =
    "block text-sm tracking-wide uppercase text-charcoal/70 mb-2";

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center mb-10">
          <p className="text-gold tracking-[0.3em] uppercase text-sm mb-4">
            Tryout Session
          </p>
          <h1 className="font-heading text-3xl md:text-4xl mb-4">
            Welcome to Your Tryout
          </h1>
          <p className="text-charcoal/60 leading-relaxed">
            Before you step on the court, please review and sign the waiver
            below.
          </p>
        </div>

        {/* Tryout Details */}
        <div className="border border-charcoal/10 bg-white p-6 md:p-8 mb-8">
          <h2 className="font-heading text-xl mb-4">Tryout Details</h2>
          <div className="space-y-3 text-charcoal/70">
            <div className="flex justify-between">
              <span className="text-sm uppercase tracking-wide text-charcoal/50">
                What to Bring
              </span>
              <span>Basketball shoes, water, towel</span>
            </div>
            <hr className="border-charcoal/10" />
            <div className="flex justify-between">
              <span className="text-sm uppercase tracking-wide text-charcoal/50">
                Duration
              </span>
              <span>2 hours</span>
            </div>
            <hr className="border-charcoal/10" />
            <div className="flex justify-between">
              <span className="text-sm uppercase tracking-wide text-charcoal/50">
                Cost
              </span>
              <span className="text-gold font-medium">Free</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-charcoal/50">
            Date, time, and location will be sent to you separately via email or
            text.
          </p>
        </div>

        {/* Waiver */}
        <div className="mb-8">
          <h2 className="font-heading text-xl mb-4">Liability Waiver</h2>
          <div className="border border-charcoal/10 bg-white p-6 h-64 overflow-y-scroll text-sm text-charcoal/70 leading-relaxed whitespace-pre-wrap">
            {WAIVER_TEXT}
          </div>
        </div>

        {/* Signature Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className={labelClasses}>
              Full Legal Name (as signature) *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`${inputClasses} font-heading text-lg`}
              placeholder="LeBron Raymone James"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="emergencyName" className={labelClasses}>
                Emergency Contact Name *
              </label>
              <input
                type="text"
                id="emergencyName"
                name="emergencyName"
                required
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                className={inputClasses}
                placeholder="Savannah James"
              />
            </div>
            <div>
              <label htmlFor="emergencyPhone" className={labelClasses}>
                Emergency Contact Phone *
              </label>
              <input
                type="tel"
                id="emergencyPhone"
                name="emergencyPhone"
                required
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                className={inputClasses}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
              className="mt-1 h-4 w-4 accent-red"
            />
            <label htmlFor="agree" className="text-sm text-charcoal/70">
              I have read the Assumption of Risk, Waiver of Liability, and
              Indemnity Agreement above. I fully understand its terms and
              voluntarily agree to be bound by them. By typing my name above, I
              am providing my electronic signature.
            </label>
          </div>

          <div className="bg-cream-dark p-4 text-sm text-charcoal/50">
            <p>
              <span className="font-medium text-charcoal/70">Date:</span>{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {error && <p className="text-red text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting || !agreed || !fullName}
            className="w-full bg-red text-cream text-sm tracking-widest uppercase px-8 py-4 hover:bg-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Sign Waiver & Confirm"}
          </button>
        </form>
      </div>
    </section>
  );
}
