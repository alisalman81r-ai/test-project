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
      <section className="hero" id="home">
        <nav className="nav" aria-label="Primary navigation">
          <a className="brand" href="/">
            <span className="brand-mark">
              <HardHat size={41} strokeWidth={2.6} />
            </span>
            IronPeak
          </a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#process">Process</a>
            <a href="/contact">Contact</a>
          </div>
          <a className="nav-call" href="tel:+15550148200">
            <Phone size={17} />
            (555) 014-8200
          </a>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">Licensed general contractors</p>
          <h1>IronPeak Construction</h1>
          <p className="hero-copy">
            Commercial and residential construction delivered with disciplined
            planning, clean job sites, and crews that keep the work moving.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="/contact">
              Request a Quote
              <ArrowRight size={18} />
            </a>
            <a className="button secondary" href="#projects">
              View Projects
            </a>
          </div>
        </div>

        <div className="hero-panel" aria-label="Company highlights">
          <div>
            <strong>24+</strong>
            <span>active crews</span>
          </div>
          <div>
            <strong>18 yrs</strong>
            <span>field experience</span>
          </div>
          <div>
            <strong>96%</strong>
            <span>on-time milestones</span>
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
