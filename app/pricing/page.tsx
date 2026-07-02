"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  HardHat,
  ArrowLeft,
  Check,
  Zap,
  Shield,
  Crown,
  ArrowRight,
  Phone,
} from "lucide-react";
import { Suspense } from "react";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for small projects",
    price: 299,
    icon: Zap,
    color: "#3b82f6",
    features: [
      "Initial site consultation",
      "Project feasibility report",
      "Basic cost estimate",
      "1 revision included",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "Most popular for mid-scale builds",
    price: 999,
    icon: Shield,
    color: "#ffb274",
    features: [
      "Everything in Starter",
      "Full project management",
      "Dedicated site supervisor",
      "Weekly progress reports",
      "3 design revisions",
      "Priority phone support",
    ],
    cta: "Get Professional",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Complete solution for large builds",
    price: 2499,
    icon: Crown,
    color: "#10b981",
    features: [
      "Everything in Professional",
      "End-to-end project delivery",
      "Dedicated account manager",
      "Daily progress updates",
      "Unlimited revisions",
      "24/7 emergency support",
      "Post-build warranty",
    ],
    cta: "Go Enterprise",
    popular: false,
  },
];

function PricingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cancelled = searchParams.get("cancelled");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleCheckout(planId: string) {
    setLoadingPlan(planId);
    setError("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.url) {
        router.push(data.url);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setLoadingPlan(null);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoadingPlan(null);
    }
  }

  return (
    <main
      className="min-h-screen text-[#f7f4ee]"
      style={{
        background:
          "radial-gradient(circle at 20% 10%, rgba(255,162,58,0.14), transparent 35%), radial-gradient(circle at 80% 85%, rgba(255,178,116,0.08), transparent 30%), linear-gradient(160deg,#07100f 0%,#040907 100%)",
      }}
    >
      {/* Nav */}
      <nav
        className="flex items-center justify-between max-w-5xl mx-auto px-6 py-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <Link href="/" className="flex items-center gap-2 font-extrabold text-base">
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "#ffb274" }}
          >
            <HardHat size={18} color="#07100f" strokeWidth={2.5} />
          </span>
          Iron<span style={{ color: "#ffb274" }}>Peak</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all text-[#bab6a9] hover:text-[#ffb274]"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <ArrowLeft size={14} />
          Back to site
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Cancelled banner */}
        {cancelled && (
          <div
            className="mb-8 px-5 py-3.5 rounded-2xl text-sm text-center"
            style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.20)", color: "#fca5a5" }}
          >
            Payment was cancelled — your card was not charged. Choose a plan below to try again.
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4"
            style={{ background: "rgba(255,178,116,0.12)", border: "1px solid rgba(255,178,116,0.20)", color: "#ffb274" }}
          >
            <HardHat size={11} />
            Service Packages
          </span>
          <h1
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Choose your build package
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#bab6a9" }}>
            Transparent pricing, no hidden fees. Pay once and let IronPeak handle the rest.
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div
            className="mb-8 px-5 py-3.5 rounded-2xl text-sm text-center"
            style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.20)", color: "#fca5a5" }}
          >
            {error}
          </div>
        )}

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => {
            const Icon = plan.icon;
            const isLoading = loadingPlan === plan.id;

            return (
              <div
                key={plan.id}
                className="relative flex flex-col rounded-3xl p-7 transition-all hover:-translate-y-1"
                style={{
                  background: plan.popular
                    ? "rgba(255,178,116,0.07)"
                    : "rgba(14,19,16,0.92)",
                  border: plan.popular
                    ? "1.5px solid rgba(255,178,116,0.40)"
                    : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: plan.popular
                    ? "0 32px 80px rgba(255,162,58,0.12)"
                    : "0 24px 60px rgba(0,0,0,0.24)",
                  transition: "transform .2s ease, box-shadow .2s ease",
                }}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                    style={{ background: "#ffb274", color: "#07100f" }}
                  >
                    Most Popular
                  </div>
                )}

                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: plan.color + "20" }}
                  >
                    <Icon size={18} style={{ color: plan.color }} />
                  </div>
                  <div>
                    <p className="font-bold text-base" style={{ color: "#f7f4ee" }}>{plan.name}</p>
                    <p className="text-xs" style={{ color: "#bab6a9" }}>{plan.tagline}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black" style={{ color: "#f7f4ee" }}>
                      ${plan.price.toLocaleString()}
                    </span>
                    <span className="text-sm mb-1.5" style={{ color: "#bab6a9" }}>one-time</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "#c9c5b6" }}>
                      <Check size={15} className="shrink-0 mt-0.5" style={{ color: plan.color }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleCheckout(plan.id)}
                  disabled={!!loadingPlan}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  style={
                    plan.popular
                      ? {
                          background: "linear-gradient(135deg,#ffb274,#ff9f35)",
                          color: "#07100f",
                          boxShadow: "0 10px 26px rgba(255,162,58,0.30)",
                        }
                      : {
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "#f7f4ee",
                        }
                  }
                >
                  {isLoading ? (
                    <>
                      <span
                        className="w-4 h-4 rounded-full border-2 inline-block"
                        style={{
                          borderColor: plan.popular ? "rgba(7,16,15,0.25)" : "rgba(255,255,255,0.2)",
                          borderTopColor: plan.popular ? "#07100f" : "#f7f4ee",
                          animation: "loginSpin .7s linear infinite",
                        }}
                      />
                      Redirecting…
                    </>
                  ) : (
                    <>
                      {plan.cta}
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom / contact strip */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-7 py-5 rounded-3xl"
          style={{ background: "rgba(14,19,16,0.92)", border: "1px solid rgba(255,178,116,0.12)" }}
        >
          <div>
            <p className="font-bold" style={{ color: "#f7f4ee" }}>Need a custom scope?</p>
            <p className="text-sm" style={{ color: "#bab6a9" }}>
              Large commercial builds, government contracts, or unique requirements — let&apos;s talk.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
            style={{
              background: "rgba(255,178,116,0.12)",
              border: "1px solid rgba(255,178,116,0.22)",
              color: "#ffb274",
            }}
          >
            <Phone size={14} />
            Contact Us
          </Link>
        </div>

        {/* Trust strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs" style={{ color: "#bab6a9" }}>
          {["Secure Stripe payments", "No hidden fees", "Licensed & insured", "Money-back if project not started"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <Check size={12} style={{ color: "#ffb274" }} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function PricingPage() {
  return (
    <Suspense>
      <PricingContent />
    </Suspense>
  );
}
