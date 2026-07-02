"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, HardHat, ArrowRight } from "lucide-react";
import { Suspense } from "react";

const PLAN_NAMES: Record<string, string> = {
  starter: "Starter Package",
  professional: "Professional Package",
  enterprise: "Enterprise Package",
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") ?? "";

  return (
    <main
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background:
          "radial-gradient(circle at 50% 30%, rgba(16,185,129,0.12), transparent 40%), linear-gradient(160deg,#07100f 0%,#040907 100%)",
      }}
    >
      <div
        className="w-full max-w-md text-center rounded-3xl p-10"
        style={{
          background: "rgba(14,19,16,0.95)",
          border: "1px solid rgba(16,185,129,0.20)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.40)",
        }}
      >
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: "rgba(16,185,129,0.15)" }}
        >
          <CheckCircle2 size={34} style={{ color: "#10b981" }} />
        </div>

        <span
          className="inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4"
          style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}
        >
          Payment Confirmed
        </span>

        <h1 className="text-3xl font-black mb-2" style={{ color: "#f7f4ee", letterSpacing: "-0.02em" }}>
          You&apos;re all set!
        </h1>
        {plan && PLAN_NAMES[plan] && (
          <p className="text-sm mb-1" style={{ color: "#bab6a9" }}>
            <span style={{ color: "#ffb274", fontWeight: 700 }}>{PLAN_NAMES[plan]}</span> has been activated.
          </p>
        )}
        <p className="text-sm mt-3 mb-8" style={{ color: "#bab6a9" }}>
          Our team will reach out within one business day to schedule your kickoff call. Check your inbox for the receipt.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
            style={{
              background: "linear-gradient(135deg,#ffb274,#ff9f35)",
              color: "#07100f",
              boxShadow: "0 10px 26px rgba(255,162,58,0.28)",
            }}
          >
            Contact Our Team
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#bab6a9",
            }}
          >
            <HardHat size={14} />
            Back to IronPeak
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
