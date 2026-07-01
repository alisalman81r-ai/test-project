"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  HardHat,
  Mail,
  MapPin,
  Phone,
  Warehouse,
} from "lucide-react";
import { initScrollReveal } from "../scrollReveal";

const contactMethods = [
  {
    icon: Phone,
    label: "Call",
    value: "(555) 014-8200",
    href: "tel:+15550148200",
  },
  {
    icon: Mail,
    label: "Email",
    value: "projects@ironpeak.build",
    href: "mailto:projects@ironpeak.build",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "214 Builder Ave, Denver, CO",
    href: "https://maps.google.com",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  useEffect(() => initScrollReveal(), [isSubmitted]);

  // Spotlight effect — updates DOM directly to avoid re-renders on every mousemove
  const spotlightRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0, rafId: 0 });

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      mouse.current.tx = e.clientX;
      mouse.current.ty = e.clientY;
    }

    function loop() {
      const m = mouse.current;
      // smooth lerp toward target
      m.x += (m.tx - m.x) * 0.08;
      m.y += (m.ty - m.y) * 0.08;
      if (el) {
        el.style.background = `radial-gradient(650px circle at ${m.x}px ${m.y}px,
          rgba(255,162,58,0.13) 0%,
          rgba(255,178,116,0.06) 25%,
          transparent 70%)`;
      }
      m.rafId = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove);
    mouse.current.rafId = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(mouse.current.rafId);
    };
  }, []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const storedSubmissions = JSON.parse(
      localStorage.getItem("allSubmissions") || "[]"
    );

    const newSubmission = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      source: "contact",
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      projectType: formData.projectType,
      message: formData.message.trim(),
      submittedAt: new Date().toISOString(),
      status: "pending",
    };

    localStorage.setItem(
      "allSubmissions",
      JSON.stringify([...storedSubmissions, newSubmission])
    );

    setSubmittedName(formData.name.trim());
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
    });
  };

  return (
    <main className="relative">
      {/* Spotlight overlay — pointer-events-none so it never blocks clicks */}
      <div
        ref={spotlightRef}
        className="fixed inset-0 z-0 pointer-events-none transition-none"
        aria-hidden="true"
      />

      <section className="relative z-10 min-h-screen bg-[#050907] text-white" style={{ background: "linear-gradient(160deg,#050907 0%,#040806 100%)" }}>
        {/* Navigation */}
        <nav className="flex items-center justify-between gap-6 max-w-4xl mx-auto px-6 py-4 animate-fade-up animate-delay-100" aria-label="Primary navigation" data-scroll-reveal>
          <a className="inline-flex items-center gap-2 font-black text-base" href="/">
            <span className="inline-grid place-items-center w-9 h-9 rounded bg-orange-300 text-slate-950">
              <HardHat size={21} strokeWidth={2.4} />
            </span>
            IronPeak
          </a>
          <div className="hidden md:flex items-center gap-8 text-slate-200 text-sm">
            <a href="/#services" className="hover:text-orange-200">Services</a>
            <a href="/#projects" className="hover:text-orange-200">Projects</a>
            <a href="/#process" className="hover:text-orange-200">Process</a>
            <a href="/contact" className="hover:text-orange-200">Contact</a>
          </div>
          <a className="inline-flex items-center gap-2 px-4 min-h-10 rounded border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium" href="/">
            <ArrowLeft size={17} />
            Back home
          </a>
        </nav>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Copy */}
          <div className="animate-fade-up animate-delay-150" data-scroll-reveal="slide-left">
            <p className="text-orange-600 text-xs font-black uppercase tracking-widest mb-3">Contact IronPeak</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 leading-tight">Tell us about your next build.</h1>
            <p className="text-slate-300 text-base leading-relaxed mb-8">
              Share the project address, rough scope, and target timeline. Our
              team will review the details and follow up with a practical next
              step.
            </p>

            {/* Contact Methods */}
            <div className="space-y-4 mb-8 animate-fade-up animate-delay-200" data-scroll-reveal>
              {contactMethods.map((method, index) => {
                const Icon = method.icon;

                return (
                  <a
                    href={method.href}
                    className="flex items-center gap-4 p-4 border border-white/10 bg-white/5 rounded hover:bg-white/10 transition animate-pop animate-delay-250"
                    key={method.label}
                    data-scroll-reveal="slide-left"
                    data-scroll-delay={`${index * 90}ms`}
                  >
                    <Icon size={22} className="text-orange-300 flex-shrink-0" />
                    <span className="text-left">
                      <small className="block text-xs text-slate-400 mb-1">{method.label}</small>
                      <span className="font-semibold text-white">{method.value}</span>
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Contact Note */}
            <div className="flex items-start gap-3 p-4 bg-orange-300/10 rounded border border-orange-200/15 animate-fade-up animate-delay-300" data-scroll-reveal="scale">
              <Clock size={20} className="text-orange-200 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-200">Response time: usually within one business day.</span>
            </div>
          </div>

          {/* Right Column - Image + Form */}
          <div className="space-y-6 animate-fade-up animate-delay-200" data-scroll-reveal="slide-right">
            <div className="overflow-hidden rounded-3xl shadow-xl animate-pop animate-delay-300" data-scroll-reveal="scale">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80"
                alt="Construction site overview"
                className="w-full h-80 object-cover"
              />
            </div>

            {isSubmitted ? (
              <div className="rounded-3xl border border-emerald-400/25 bg-emerald-500/10 p-8 text-center shadow-sm animate-fade-up" data-scroll-reveal="scale">
                <div className="flex justify-center mb-4">
                  <CheckCircle2 size={52} className="text-emerald-300" />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-200">Message sent</p>
                <h2 className="mt-3 text-3xl font-black text-white">
                  Thank you{submittedName ? `, ${submittedName}` : ""}!
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  We’ve received your message and our team will review it shortly. A member of our staff will contact you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4 p-6 rounded border border-white/10 bg-white/5 animate-fade-up animate-delay-350" data-scroll-reveal="scale">
                <label className="grid gap-2 text-sm font-black">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full border border-white/10 rounded px-3 py-3 text-white bg-slate-950/80 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </label>
                <label className="grid gap-2 text-sm font-black">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full border border-white/10 rounded px-3 py-3 text-white bg-slate-950/80 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </label>
                <label className="grid gap-2 text-sm font-black">
                  Phone
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                    className="w-full border border-white/10 rounded px-3 py-3 text-white bg-slate-950/80 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </label>
                <label className="grid gap-2 text-sm font-black">
                  Project Type
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full border border-white/10 rounded px-3 py-3 text-white bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    required
                  >
                    <option value="" disabled>
                      Select a type
                    </option>
                    <option>Commercial build</option>
                    <option>Residential project</option>
                    <option>Renovation</option>
                    <option>Project management</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-black">
                  Message
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share a few details"
                    rows={5}
                    required
                    className="w-full border border-white/10 rounded px-3 py-3 text-white bg-slate-950/80 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
                  />
                </label>
                <button type="submit" className="inline-flex items-center justify-center gap-2 min-h-12 px-5 rounded bg-orange-600 hover:bg-orange-700 text-white font-black mt-2 w-full animate-pop animate-delay-400">
                  Send Inquiry
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-slate-400" data-scroll-reveal>
        <a className="inline-flex items-center gap-2 font-black text-white" href="/">
          <span className="inline-grid place-items-center w-8 h-8 rounded bg-orange-300 text-slate-950">
            <Warehouse size={20} />
          </span>
          IronPeak
        </a>
        <p className="text-sm">Licensed, bonded, and insured general contractors.</p>
      </footer>
    </main>
  );
}
