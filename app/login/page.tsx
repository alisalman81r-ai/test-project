"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Lock, HardHat, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/admin");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "radial-gradient(circle at 30% 20%, rgba(255,162,58,0.18), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,178,116,0.10), transparent 35%), linear-gradient(135deg,#07100f 0%,#040907 100%)",
      }}
    >
      {/* Back to site */}
      <Link
        href="/"
        className="fixed top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all text-[#bab6a9] hover:text-[#ffb274] hover:bg-[#ffb274]/10"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,178,116,0.18)" }}
      >
        <ArrowLeft size={14} />
        Back to site
      </Link>

      {/* Card */}
      <div
        className="w-full flex overflow-hidden"
        style={{
          maxWidth: 880,
          borderRadius: 28,
          boxShadow: "0 48px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,178,116,0.12)",
        }}
      >
        {/* ── Left: Form panel ── */}
        <div
          className="flex-1 flex flex-col justify-center px-10 py-12"
          style={{ background: "#0a1512", minWidth: 0 }}
        >
          {/* Brand */}
          <div className="flex items-center gap-2.5 mb-10">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "#ffb274" }}
            >
              <HardHat size={18} color="#07100f" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-lg tracking-tight" style={{ color: "#f7f4ee" }}>
              Iron<span style={{ color: "#ffb274" }}>Peak</span>
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-bold text-3xl mb-1" style={{ color: "#f7f4ee", letterSpacing: "-0.02em" }}>
            Welcome back 👋
          </h1>
          <p className="text-sm mb-8" style={{ color: "#bab6a9" }}>
            Sign in to your admin portal
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
              onFocusCapture={(e) => (e.currentTarget.style.borderColor = "rgba(255,178,116,0.50)")}
              onBlurCapture={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
            >
              <Mail size={15} style={{ color: "#bab6a9", flexShrink: 0 }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-[#bab6a9]/50"
                style={{ color: "#f7f4ee" }}
              />
            </div>

            {/* Password */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
              onFocusCapture={(e) => (e.currentTarget.style.borderColor = "rgba(255,178,116,0.50)")}
              onBlurCapture={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
            >
              <Lock size={15} style={{ color: "#bab6a9", flexShrink: 0 }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-[#bab6a9]/50"
                style={{ color: "#f7f4ee" }}
              />
            </div>

            {error && (
              <p
                className="text-sm rounded-xl px-4 py-2.5"
                style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.22)", color: "#fca5a5" }}
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              style={{
                background: loading ? "#ffb274" : "linear-gradient(135deg,#ffb274 0%,#ff9f35 100%)",
                color: "#07100f",
                boxShadow: "0 12px 28px rgba(255,162,58,0.28)",
              }}
            >
              {loading ? "Signing in…" : (
                <>
                  Log In
                  <ArrowRight size={15} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs mt-8" style={{ color: "rgba(186,182,169,0.45)" }}>
            IronPeak Construction © {new Date().getFullYear()}
          </p>
        </div>

        {/* ── Right: Decorative panel ── */}
        <div
          className="hidden md:flex flex-col items-center justify-between relative overflow-hidden"
          style={{
            width: 360,
            flexShrink: 0,
            background:
              "radial-gradient(circle at 60% 30%, rgba(255,162,58,0.55) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(255,178,116,0.30) 0%, transparent 45%), linear-gradient(160deg,#1a2e20 0%,#07100f 50%,#0d1f18 100%)",
            padding: "48px 36px",
          }}
        >
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,rgba(255,255,255,0.03) 0 1px,transparent 1px 72px), repeating-linear-gradient(90deg,rgba(255,255,255,0.03) 0 1px,transparent 1px 72px)",
            }}
          />

          {/* Top badge */}
          <div className="relative z-10 w-full">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
              style={{ background: "rgba(255,178,116,0.15)", border: "1px solid rgba(255,178,116,0.25)", color: "#ffb274" }}
            >
              <HardHat size={11} />
              Admin Portal
            </span>
          </div>

          {/* Centre illustration — stacked stat cards */}
          <div className="relative z-10 w-full flex flex-col gap-3">
            {[
              { label: "Projects Completed", value: "240+", color: "#ffb274" },
              { label: "Active Quotes",       value: "18",   color: "#10b981" },
              { label: "Years of Experience", value: "15+",  color: "#8b5cf6" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between px-5 py-4 rounded-2xl"
                style={{
                  background: "rgba(10,21,18,0.72)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span className="text-sm" style={{ color: "rgba(247,244,238,0.65)" }}>{item.label}</span>
                <span className="text-xl font-black" style={{ color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Bottom tagline */}
          <div className="relative z-10 text-center">
            <p className="font-extrabold text-xl leading-tight" style={{ color: "#f7f4ee", letterSpacing: "-0.02em" }}>
              Built on trust.<br />
              <span style={{ color: "#ffb274" }}>Finished on time.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
