import {
  ArrowRight,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  HardHat,
  Hammer,
  MapPin,
  Phone,
  Ruler,
  ShieldCheck,
  Warehouse,
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Commercial Builds",
    text: "this is called construction.",
  },
  {
    icon: Hammer,
    title: "Renovations",
    text: "Structural upgrades, tenant improvements, remodels, and finish work with minimal operational disruption.",
  },
  {
    icon: Ruler,
    title: "Preconstruction",
    text: "Budgeting, site planning, scheduling, permitting, and buildability reviews before work begins.",
  },
  {
    icon: ClipboardCheck,
    title: "Project Management",
    text: "Daily coordination.",
  },
];

const projects = [
  {
    name: "Riverside Office Campus",
    type: "Commercial",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Northline Industrial Hub",
    type: "Industrial",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Cedar Ridge Homes",
    type: "Residential",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
];

const steps = [
  "Site walk and scope discovery",
  "Transparent estimate and schedule",
  "Permits, procurement, and mobilization",
  "Build, inspect, hand over, and support",
];

export default function Home() {
  return (
    <main>
      <section
        className="relative min-h-screen flex flex-col"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=85")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        id="home"
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/75"></div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between gap-6 max-w-6xl mx-auto w-full px-6 py-6 animate-fade-up animate-delay-100" aria-label="Primary navigation">
          <a className="inline-flex items-center gap-3 font-black text-lg text-white" href="/">
            <span className="inline-grid place-items-center w-10 h-10 rounded bg-slate-100 text-slate-900">
              <HardHat size={24} strokeWidth={2.6} />
            </span>
            IronPeak
          </a>
          <div className="hidden lg:flex items-center gap-8 text-white text-sm font-medium">
            <a href="#services" className="hover:text-orange-300 transition">Services</a>
            <a href="#projects" className="hover:text-orange-300 transition">Projects</a>
            <a href="#process" className="hover:text-orange-300 transition">Process</a>
            <a href="/contact" className="hover:text-orange-300 transition">Contact</a>
          </div>
          <a className="inline-flex items-center gap-2 px-5 py-2 rounded bg-orange-500 hover:bg-orange-600 text-white text-sm font-black transition" href="tel:+15550148200">
            <Phone size={17} />
            Call Us
          </a>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full py-20 animate-fade-up animate-delay-150">
            <p className="text-orange-300 text-sm font-black uppercase tracking-widest mb-4 animate-fade-up animate-delay-200">Licensed general contractors</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 max-w-3xl animate-fade-up animate-delay-250">
              The Journey Beyond Your Imagination
            </h1>
            <p className="text-lg text-slate-200 leading-relaxed mb-8 max-w-2xl animate-fade-up animate-delay-300">
              Commercial and residential construction delivered with disciplined planning, clean job sites, and crews that keep the work moving forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animate-delay-350">
              <a className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-orange-500 hover:bg-orange-600 text-white font-black transition animate-pop animate-delay-400" href="/contact">
                Request a Quote
                <ArrowRight size={18} />
              </a>
              <a className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded border-2 border-white text-white hover:bg-white/10 font-black transition animate-pop animate-delay-450" href="#projects">
                View Projects
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Company Highlights */}
        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 pb-16 animate-fade-up animate-delay-500">
          <div className="grid grid-cols-3 gap-6 md:gap-8">
            <div className="text-white animate-pop animate-delay-550">
              <p className="text-3xl md:text-4xl font-black mb-1">24+</p>
              <p className="text-white/80 text-sm">active crews</p>
            </div>
            <div className="text-white">
              <p className="text-3xl md:text-4xl font-black mb-1">18 yrs</p>
              <p className="text-white/80 text-sm">field experience</p>
            </div>
            <div className="text-white">
              <p className="text-3xl md:text-4xl font-black mb-1">96%</p>
              <p className="text-white/80 text-sm">on-time milestones</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section intro">
        <div className="section-heading">
          <p className="eyebrow">Built for owners, operators, and developers</p>
          <h2>Practical construction teams for demanding job sites.</h2>
        </div>
        <div className="intro-copy">
          <p>
            IronPeak coordinates architects, engineers, subcontractors, and
            inspectors through one accountable construction lead. The result is
            fewer surprises, faster decisions, and a site that stays organized.
          </p>
          <div className="trust-row">
            <span>
              <ShieldCheck size={18} />
              Safety-led crews
            </span>
            <span>
              <CalendarCheck size={18} />
              Weekly reporting
            </span>
            <span>
              <MapPin size={18} />
              Regional coverage
            </span>
          </div>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="section-heading compact">
          <p className="eyebrow">Services</p>
          <h2>From planning table to final punch list.</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article className="service-card" key={service.title}>
                <Icon size={28} />
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="project-band" id="projects">
        <div className="section project-heading">
          <div className="section-heading compact">
            <p className="eyebrow">Selected work</p>
            <h2>Recent projects across commercial, residential, and industrial sites.</h2>
          </div>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.name}>
              <img src={project.image} alt={`${project.name} construction project`} />
              <div className="project-info">
                <span>{project.type}</span>
                <h3>{project.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section process" id="process">
        <div className="process-visual">
          <img
            src="https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?auto=format&fit=crop&w=1100&q=80"
            alt="Construction team reviewing plans on site"
          />
        </div>
        <div className="process-content">
          <p className="eyebrow">Process</p>
          <h2>A clearer build path from day one.</h2>
          <p>
            Every project starts with scope clarity and ends with documented
            closeout. We keep schedule, budget, safety, and quality visible at
            every stage.
          </p>
          <ol>
            {steps.map((step) => (
              <li key={step}>
                <CheckCircle2 size={20} />
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="contact-band" id="contact">
        <div className="contact-inner">
          <div>
            <p className="eyebrow">Start a project</p>
            <h2>Tell us what you are building.</h2>
            <p>
              Send the project address, target timeline, and rough scope. We
              will respond with the next practical step.
            </p>
          </div>
          <form className="quote-form">
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="you@example.com" />
            </label>
            <label>
              Project Type
              <select name="projectType" defaultValue="">
                <option value="" disabled>
                  Select a type
                </option>
                <option>Commercial build</option>
                <option>Residential project</option>
                <option>Renovation</option>
                <option>Project management</option>
              </select>
            </label>
            <label>
              Message
              <textarea name="message" placeholder="Share a few details" rows={4} />
            </label>
            <button type="submit">
              Send Inquiry
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <a className="brand" href="/">
          <span className="brand-mark">
            <Warehouse size={20} />
          </span>
          IronPeak
        </a>
        <p>Licensed, bonded, and insured general contractors.</p>
      </footer>
    </main>
  );
}
