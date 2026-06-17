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
      <section className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="flex items-center justify-between gap-6 max-w-4xl mx-auto px-6 py-4" aria-label="Primary navigation">
          <a className="inline-flex items-center gap-2 font-black text-base" href="/">
            <span className="inline-grid place-items-center w-9 h-9 rounded bg-yellow-500 text-gray-900">
              <HardHat size={21} strokeWidth={2.4} />
            </span>
            IronPeak
          </a>
          <div className="hidden md:flex items-center gap-8 text-gray-900 text-sm">
            <a href="/#services" className="hover:text-gray-600">Services</a>
            <a href="/#projects" className="hover:text-gray-600">Projects</a>
            <a href="/#process" className="hover:text-gray-600">Process</a>
            <a href="/contact" className="hover:text-gray-600">Contact</a>
          </div>
          <a className="inline-flex items-center gap-2 px-4 min-h-10 rounded border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-900 text-sm font-medium" href="/">
            <ArrowLeft size={17} />
            Back home
          </a>
        </nav>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Copy */}
          <div>
            <p className="text-orange-600 text-xs font-black uppercase tracking-widest mb-3">Contact IronPeak</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 leading-tight">Tell us about your next build.</h1>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Share the project address, rough scope, and target timeline. Our
              team will review the details and follow up with a practical next
              step.
            </p>

            {/* Contact Methods */}
            <div className="space-y-4 mb-8">
              {contactMethods.map((method) => {
                const Icon = method.icon;

                return (
                  <a href={method.href} className="flex items-center gap-4 p-4 border border-gray-300 rounded hover:bg-gray-50 transition" key={method.label}>
                    <Icon size={22} className="text-orange-600 flex-shrink-0" />
                    <span className="text-left">
                      <small className="block text-xs text-gray-600 mb-1">{method.label}</small>
                      <span className="font-semibold text-gray-900">{method.value}</span>
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Contact Note */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded border border-gray-200">
              <Clock size={20} className="text-gray-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">Response time: usually within one business day.</span>
            </div>
          </div>

          {/* Right Column - Image + Form */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80"
                alt="Construction site overview"
                className="w-full h-80 object-cover"
              />
            </div>
            <form className="grid gap-4 p-6 rounded border border-gray-200 bg-gray-50">
              <label className="grid gap-2 text-sm font-black">
                Name
                <input type="text" name="name" placeholder="Your name" className="w-full border border-gray-300 rounded px-3 py-3 text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-600" />
              </label>
              <label className="grid gap-2 text-sm font-black">
                Email
                <input type="email" name="email" placeholder="you@example.com" className="w-full border border-gray-300 rounded px-3 py-3 text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-600" />
              </label>
              <label className="grid gap-2 text-sm font-black">
                Phone
                <input type="tel" name="phone" placeholder="(555) 000-0000" className="w-full border border-gray-300 rounded px-3 py-3 text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-600" />
              </label>
              <label className="grid gap-2 text-sm font-black">
                Project Type
                <select name="projectType" defaultValue="" className="w-full border border-gray-300 rounded px-3 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-600">
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
                <textarea name="message" placeholder="Share a few details" rows={5} className="w-full border border-gray-300 rounded px-3 py-3 text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-600 resize-none" />
              </label>
              <button type="submit" className="inline-flex items-center justify-center gap-2 min-h-12 px-5 rounded bg-orange-600 hover:bg-orange-700 text-white font-black mt-2 w-full">
                Send Inquiry
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-gray-600">
        <a className="inline-flex items-center gap-2 font-black text-gray-900" href="/">
          <span className="inline-grid place-items-center w-8 h-8 rounded bg-yellow-500 text-gray-900">
            <Warehouse size={20} />
          </span>
          IronPeak
        </a>
        <p className="text-sm">Licensed, bonded, and insured general contractors.</p>
      </footer>
    </main>
  );
}
