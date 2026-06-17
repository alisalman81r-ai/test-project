import {
  ArrowLeft,
  ArrowRight,
  Clock,
  HardHat,
  Mail,
  MapPin,
  Phone,
  Warehouse,
} from "lucide-react";

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
  return (
    <main>
      <section className="contact-page">
        <nav className="nav contact-nav" aria-label="Primary navigation">
          <a className="brand" href="/">
            <span className="brand-mark">
              <HardHat size={21} strokeWidth={2.4} />
            </span>
            IronPeak
          </a>
          <div className="nav-links">
            <a href="/#services">Services</a>
            <a href="/#projects">Projects</a>
            <a href="/#process">Process</a>
            <a href="/contact">Contact</a>
          </div>
          <a className="nav-call" href="/">
            <ArrowLeft size={17} />
            Back home
          </a>
        </nav>

        <div className="contact-page-inner">
          <div className="contact-page-copy">
            <p className="eyebrow">Contact IronPeak</p>
            <h1>Tell us about your next build.</h1>
            <p>
              Share the project address, rough scope, and target timeline. Our
              team will review the details and follow up with a practical next
              step.
            </p>

            <div className="contact-methods">
              {contactMethods.map((method) => {
                const Icon = method.icon;

                return (
                  <a href={method.href} className="contact-method" key={method.label}>
                    <Icon size={22} />
                    <span>
                      <small>{method.label}</small>
                      {method.value}
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="contact-note">
              <Clock size={20} />
              <span>Response time: usually within one business day.</span>
            </div>
          </div>

          <form className="quote-form contact-page-form">
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="you@example.com" />
            </label>
            <label>
              Phone
              <input type="tel" name="phone" placeholder="(555) 000-0000" />
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
              <textarea name="message" placeholder="Share a few details" rows={5} />
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
