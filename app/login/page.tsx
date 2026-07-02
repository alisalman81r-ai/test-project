"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#07100f 0%,#040907 100%)" }}
    >
      {/* Animated background layer */}
      <div
        className="login-bg-drift absolute pointer-events-none"
        style={{
          inset: "-30%",
          background:
            "radial-gradient(circle at 28% 22%, rgba(255,162,58,0.22) 0%, transparent 40%), radial-gradient(circle at 76% 72%, rgba(255,178,116,0.12) 0%, transparent 38%)",
        }}
      />

      {/* Orb 1 */}
      <div
        className="login-orb-1 absolute rounded-full pointer-events-none"
        style={{
          width: 420, height: 420,
          top: "4%", left: "6%",
          background: "radial-gradient(circle, rgba(255,162,58,0.22), transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      {/* Orb 2 */}
      <div
        className="login-orb-2 absolute rounded-full pointer-events-none"
        style={{
          width: 300, height: 300,
          bottom: "6%", right: "8%",
          background: "radial-gradient(circle, rgba(255,140,40,0.18), transparent 70%)",
          filter: "blur(36px)",
        }}
      />

      {/* Back to site */}
      <Link
        href="/"
        className="login-back fixed top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all text-[#bab6a9] hover:text-[#ffb274] hover:bg-[#ffb274]/10 z-50"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,178,116,0.20)" }}
      >
        <ArrowLeft size={14} />
        Back to site
      </Link>

      {/* Card */}
      <div
        className="login-card-in w-full flex overflow-hidden relative z-10"
        style={{
          maxWidth: 880,
          borderRadius: 28,
          boxShadow: "0 48px 120px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,178,116,0.14)",
        }}
      >
        {/* ── Left: Form panel ── */}
        <div
          className="flex-1 flex flex-col justify-center px-10 py-12"
          style={{ background: "#0a1512", minWidth: 0 }}
        >
          {/* Brand */}
          <div className="login-a1 flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#ffb274" }}>
              <HardHat size={18} color="#07100f" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-lg tracking-tight" style={{ color: "#f7f4ee" }}>
              Iron<span style={{ color: "#ffb274" }}>Peak</span>
            </span>
          </div>

          {/* Heading */}
          <h1 className="login-a2 font-bold mb-1" style={{ color: "#f7f4ee", letterSpacing: "-0.02em" }}>
            <span className="block text-lg font-semibold" style={{ color: "#bab6a9" }}>Sign in to</span>
            <span className="block text-3xl" style={{ color: "#ffb274" }}>IronPeak</span>
          </h1>
          <p className="login-a3 text-sm mb-8" style={{ color: "#bab6a9" }}>
            Sign in to your admin portal
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div
              className="login-a4 flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
                transition: "border-color .2s, background .2s, box-shadow .2s",
              }}
              onFocusCapture={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,178,116,0.55)";
                e.currentTarget.style.background = "rgba(255,178,116,0.06)";
                e.currentTarget.style.boxShadow = "0 0 0 4px rgba(255,178,116,0.10)";
              }}
              onBlurCapture={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.boxShadow = "none";
              }}
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
              className="login-a5 flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
                transition: "border-color .2s, background .2s, box-shadow .2s",
              }}
              onFocusCapture={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,178,116,0.55)";
                e.currentTarget.style.background = "rgba(255,178,116,0.06)";
                e.currentTarget.style.boxShadow = "0 0 0 4px rgba(255,178,116,0.10)";
              }}
              onBlurCapture={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.boxShadow = "none";
              }}
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
                style={{
                  background: "rgba(239,68,68,0.12)",
                  border: "1px solid rgba(239,68,68,0.22)",
                  color: "#fca5a5",
                  animation: "loginFadeUp .3s ease both",
                }}
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="login-a6 login-shimmer-btn w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              style={{ color: "#07100f", boxShadow: "0 12px 28px rgba(255,162,58,0.32)" }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span
                    className="login-spin w-4 h-4 rounded-full border-2 inline-block"
                    style={{ borderColor: "rgba(7,16,15,0.25)", borderTopColor: "#07100f" }}
                  />
                  Signing in…
                </span>
              ) : (
                <>
                  Log In
                  <ArrowRight size={15} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          <p className="login-a7 text-center text-xs mt-8" style={{ color: "rgba(186,182,169,0.40)" }}>
            IronPeak Construction © {new Date().getFullYear()}
          </p>
        </div>

        {/* ── Right: Photo panel ── */}
        <div
          className="hidden md:block relative overflow-hidden"
          style={{ width: 360, flexShrink: 0 }}
        >
          <div
            className="login-photo-pan absolute"
            style={{ inset: "-6%", willChange: "transform" }}
          >
            <Image
              src="/assets/01.png"
              alt="IronPeak Construction"
              fill
              className="object-cover"
              quality={100}
              priority
            />
          </div>

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(10,21,18,0.55) 0%, transparent 40%), linear-gradient(to top, rgba(7,16,15,0.72) 0%, transparent 55%)",
            }}
          />

          {/* Caption */}
          <div
            className="absolute bottom-6 left-6 right-6 z-10"
            style={{ animation: "loginFadeUp .7s ease both .5s" }}
          >
            <span
              className="login-badge-pulse inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-3"
              style={{
                background: "rgba(255,178,116,0.18)",
                border: "1px solid rgba(255,178,116,0.32)",
                color: "#ffb274",
                backdropFilter: "blur(8px)",
              }}
            >
              <HardHat size={11} />
              IronPeak Construction
            </span>
            <p
              className="font-extrabold text-xl leading-tight"
              style={{ color: "#f7f4ee", letterSpacing: "-0.02em", textShadow: "0 2px 14px rgba(0,0,0,0.55)" }}
            >
              Built on trust.<br />
              <span style={{ color: "#ffb274" }}>Finished on time.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
