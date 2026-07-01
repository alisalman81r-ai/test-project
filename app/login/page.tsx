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
    <>
      <style>{`
        @keyframes bgDrift {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(3%, 2%) scale(1.06); }
          66%  { transform: translate(-2%, 4%) scale(1.03); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes orb1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.55; }
          50%       { transform: translate(6%, 8%) scale(1.18); opacity: 0.75; }
        }
        @keyframes orb2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
          50%       { transform: translate(-5%, -6%) scale(1.14); opacity: 0.55; }
        }
        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes photoPan {
          0%   { transform: translate(0, 0); }
          100% { transform: translate(-3%, -2%); }
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,178,116,0); }
          50%       { box-shadow: 0 0 0 6px rgba(255,178,116,0.12); }
        }
        @keyframes backBtn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .login-card         { animation: cardEntrance 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-brand         { animation: fadeSlideUp 0.55s ease both; animation-delay: 0.15s; }
        .anim-heading       { animation: fadeSlideUp 0.55s ease both; animation-delay: 0.28s; }
        .anim-sub           { animation: fadeSlideUp 0.55s ease both; animation-delay: 0.36s; }
        .anim-field-1       { animation: fadeSlideUp 0.5s ease both;  animation-delay: 0.44s; }
        .anim-field-2       { animation: fadeSlideUp 0.5s ease both;  animation-delay: 0.52s; }
        .anim-btn           { animation: fadeSlideUp 0.5s ease both;  animation-delay: 0.62s; }
        .anim-footer        { animation: fadeSlideUp 0.5s ease both;  animation-delay: 0.72s; }
        .anim-back          { animation: backBtn 0.6s cubic-bezier(0.22,1,0.36,1) both 0.1s; }
        .btn-shimmer {
          background-size: 200% auto;
          background-image: linear-gradient(135deg, #ffb274 0%, #ff9f35 30%, #ffd0a0 50%, #ff9f35 70%, #ffb274 100%);
          animation: shimmer 2.4s linear infinite;
          transition: box-shadow 0.2s, transform 0.15s;
        }
        .btn-shimmer:hover:not(:disabled) {
          box-shadow: 0 16px 36px rgba(255,162,58,0.42) !important;
          transform: translateY(-1px);
        }
        .btn-shimmer:active:not(:disabled) { transform: scale(0.98); }
        .photo-pan { animation: photoPan 14s ease-in-out infinite alternate; }
        .badge-pulse { animation: badgePulse 2.8s ease-in-out infinite; }
      `}</style>

      <div
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#07100f 0%,#040907 100%)" }}
      >
        {/* Animated background orbs */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: "-30%",
            background:
              "radial-gradient(circle at 28% 22%, rgba(255,162,58,0.22) 0%, transparent 40%), radial-gradient(circle at 76% 72%, rgba(255,178,116,0.12) 0%, transparent 38%)",
            animation: "bgDrift 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none"
          style={{
            top: "5%", left: "8%",
            background: "radial-gradient(circle, rgba(255,162,58,0.18), transparent 70%)",
            filter: "blur(40px)",
            animation: "orb1 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full pointer-events-none"
          style={{
            bottom: "8%", right: "10%",
            background: "radial-gradient(circle, rgba(255,140,40,0.14), transparent 70%)",
            filter: "blur(32px)",
            animation: "orb2 15s ease-in-out infinite",
          }}
        />

        {/* Back to site */}
        <Link
          href="/"
          className="anim-back fixed top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all text-[#bab6a9] hover:text-[#ffb274] hover:bg-[#ffb274]/10"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,178,116,0.18)" }}
        >
          <ArrowLeft size={14} />
          Back to site
        </Link>

        {/* Card */}
        <div
          className="login-card w-full flex overflow-hidden relative z-10"
          style={{
            maxWidth: 880,
            borderRadius: 28,
            boxShadow: "0 48px 120px rgba(0,0,0,0.60), 0 0 0 1px rgba(255,178,116,0.14)",
          }}
        >
          {/* ── Left: Form panel ── */}
          <div
            className="flex-1 flex flex-col justify-center px-10 py-12"
            style={{ background: "#0a1512", minWidth: 0 }}
          >
            {/* Brand */}
            <div className="anim-brand flex items-center gap-2.5 mb-10">
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
            <h1 className="anim-heading font-bold text-3xl mb-1" style={{ color: "#f7f4ee", letterSpacing: "-0.02em" }}>
              Welcome back 👋
            </h1>
            <p className="anim-sub text-sm mb-8" style={{ color: "#bab6a9" }}>
              Sign in to your admin portal
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div
                className="anim-field-1 flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                onFocusCapture={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,178,116,0.55)";
                  e.currentTarget.style.background = "rgba(255,178,116,0.06)";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(255,178,116,0.08)";
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
                className="anim-field-2 flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                onFocusCapture={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,178,116,0.55)";
                  e.currentTarget.style.background = "rgba(255,178,116,0.06)";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(255,178,116,0.08)";
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
                    animation: "fadeSlideUp 0.3s ease both",
                  }}
                >
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="anim-btn btn-shimmer w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                style={{
                  color: "#07100f",
                  boxShadow: "0 12px 28px rgba(255,162,58,0.30)",
                }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full border-2 inline-block"
                      style={{
                        borderColor: "rgba(7,16,15,0.3)",
                        borderTopColor: "#07100f",
                        animation: "spin 0.7s linear infinite",
                      }}
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

            <p className="anim-footer text-center text-xs mt-8" style={{ color: "rgba(186,182,169,0.40)" }}>
              IronPeak Construction © {new Date().getFullYear()}
            </p>
          </div>

          {/* ── Right: Photo panel ── */}
          <div
            className="hidden md:block relative overflow-hidden"
            style={{ width: 360, flexShrink: 0 }}
          >
            <div
              className="photo-pan absolute"
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

            {/* Overlay gradients */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, rgba(10,21,18,0.55) 0%, transparent 40%), linear-gradient(to top, rgba(7,16,15,0.70) 0%, transparent 55%)",
              }}
            />

            {/* Bottom caption */}
            <div
              className="absolute bottom-6 left-6 right-6 z-10"
              style={{ animation: "fadeSlideUp 0.7s ease both 0.5s" }}
            >
              <span
                className="badge-pulse inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-3"
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

      {/* spin keyframe for loading spinner */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
