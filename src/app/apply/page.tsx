"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Apply() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      age: (form.elements.namedItem("age") as HTMLInputElement).value,
      experience: (form.elements.namedItem("experience") as HTMLSelectElement).value,
      goals: (form.elements.namedItem("goals") as HTMLTextAreaElement).value,
      whyJoin: (form.elements.namedItem("whyJoin") as HTMLTextAreaElement).value,
      referral: (form.elements.namedItem("referral") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      router.push("/thank-you");
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  const inputClasses =
    "w-full border border-charcoal/20 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-red transition-colors";
  const labelClasses = "block text-sm tracking-wide uppercase text-charcoal/70 mb-2";

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center mb-12">
          <p className="text-gold tracking-[0.3em] uppercase text-sm mb-4">
            Membership Application
          </p>
          <h1 className="font-heading text-3xl md:text-4xl">
            Request a Tryout
          </h1>
          <p className="mt-4 text-charcoal/60 leading-relaxed">
            Fill out the application below. If we think you might be a good fit,
            we&apos;ll invite you to a tryout session.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className={labelClasses}>
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className={inputClasses}
                placeholder="LeBron"
              />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClasses}>
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className={inputClasses}
                placeholder="James"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={inputClasses}
              placeholder="john@example.com"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className={labelClasses}>
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className={inputClasses}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label htmlFor="age" className={labelClasses}>
                Age *
              </label>
              <input
                type="number"
                id="age"
                name="age"
                required
                min="18"
                className={inputClasses}
                placeholder="25"
              />
            </div>
          </div>

          <div>
            <label htmlFor="experience" className={labelClasses}>
              Basketball Experience *
            </label>
            <select
              id="experience"
              name="experience"
              required
              className={inputClasses}
              defaultValue=""
            >
              <option value="" disabled>
                Select your experience level
              </option>
              <option value="beginner">Beginner — Just getting started</option>
              <option value="recreational">Recreational — Play casually</option>
              <option value="competitive">
                Competitive — Played organized ball
              </option>
              <option value="advanced">
                Advanced — College / Semi-pro experience
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="goals" className={labelClasses}>
              What are your basketball goals? *
            </label>
            <textarea
              id="goals"
              name="goals"
              required
              rows={3}
              className={inputClasses}
              placeholder="Stay in shape, improve my game, find a consistent group to play with..."
            />
          </div>

          <div>
            <label htmlFor="whyJoin" className={labelClasses}>
              Why do you want to join Palm Beach Basketball Club? *
            </label>
            <textarea
              id="whyJoin"
              name="whyJoin"
              required
              rows={3}
              className={inputClasses}
              placeholder="Tell us what drew you to the club and what you'd bring to the group..."
            />
          </div>

          <div>
            <label htmlFor="referral" className={labelClasses}>
              How did you hear about us?
            </label>
            <input
              type="text"
              id="referral"
              name="referral"
              className={inputClasses}
              placeholder="Instagram, a friend, etc."
            />
          </div>

          {error && (
            <p className="text-red text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-red text-cream text-sm tracking-widest uppercase px-8 py-4 hover:bg-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>

          <p className="text-center text-xs text-charcoal/40">
            By submitting this application, you agree to be contacted by Palm
            Beach Basketball Club regarding your membership inquiry.
          </p>
        </form>
      </div>
    </section>
  );
}
