import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../components/SectionHeader.jsx";
import { schoolInfo } from "../data/siteData.js";
import { submitEnquiry } from "../services/contentApi.js";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function SectionMotion({ children, className = "" }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus("");
    try {
      await submitEnquiry({ parentName: form.name, studentName: form.name, email: form.email, phone: form.phone, message: form.message, subject: "General Enquiry" });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Vani Vidya Mandir School, Gamharia</title>
        <meta name="description" content="Contact Vani Vidya Mandir School, Gamharia — School Road, Chota Gamharia, Jamshedpur. Find the Mappls pin, Facebook page, and enquiry form here." />
        <meta name="keywords" content="contact Vani Vidya Mandir School, Gamharia school address, Jamshedpur school enquiry, Mappls pin f7773d" />
        <link rel="canonical" href="https://vanividyamandir.vercel.app/contact" />
        <meta property="og:title" content="Contact Us | Vani Vidya Mandir School, Gamharia" />
        <meta property="og:description" content="Get in touch with Vani Vidya Mandir School. Use the Mappls listing, Facebook page, or enquiry form." />
        <meta property="og:url" content="https://vanividyamandir.vercel.app/contact" />
      </Helmet>

      {/* Page Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(247,203,31,0.20),transparent_40%)]" />
        <div className="container-page relative">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-white">Contact Us</span>
          </nav>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#F7CB1F] md:text-sm">
              Get In Touch
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              We’d Love to Hear From You
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              Whether you have an admission query, a general question, or wish to visit the campus, our team is always happy to help.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="section-pad bg-paper">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: <MapPin className="h-6 w-6" />,
                title: "School Address & Mappls",
                content: schoolInfo.address,
                sub: "Mappls Pin: f7773d | Near Julumtand Ground",
                action: { href: schoolInfo.mapplsUrl, label: "Open in Mappls" },
              },
              {
                icon: <Phone className="h-6 w-6" />,
                title: "Facebook Page",
                content: "facebook.com/gamhariavvm",
                sub: "Official community updates & events",
                action: { href: schoolInfo.facebookUrl, label: "Visit Facebook" },
              },
              {
                icon: <Mail className="h-6 w-6" />,
                title: "Justdial Profile",
                content: "Rated 4.6 / 5 (20+ verified reviews)",
                sub: "Listed under premier schools in Gamharia",
                action: { href: schoolInfo.justdialUrl, label: "View on Justdial" },
              },
            ].map((card) => (
              <SectionMotion key={card.title}>
                <article className="card-surface flex h-full flex-col items-center gap-5 p-8 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-white">
                    {card.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-primary">{card.title}</h3>
                    <p className="mt-2 font-body text-sm text-ink">{card.content}</p>
                    <p className="mt-1 font-body text-xs text-muted">{card.sub}</p>
                  </div>
                  {card.action && (
                    <a
                      href={card.action.href}
                      target={card.action.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.action.href.startsWith("http") ? "noreferrer" : undefined}
                      className="mt-auto primary-btn text-sm"
                    >
                      {card.action.label}
                    </a>
                  )}
                </article>
              </SectionMotion>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-pad bg-[#f4f2ed]">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_480px]">
            {/* Contact Form */}
            <SectionMotion>
              <div className="card-surface p-8 lg:p-10">
                <h2 className="text-2xl font-bold text-primary">Send Us a Message</h2>
                <p className="mt-2 font-body text-sm text-muted">
                  Fill in the form and we'll get back to you within one working day.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-ink">Full Name *</label>
                      <input
                        required
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-ink">Phone Number *</label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-ink">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-ink">Your Message *</label>
                    <textarea
                      required
                      rows={5}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      className="input-field resize-none"
                      placeholder="Your question or message..."
                    />
                  </div>

                  {status === "success" && (
                    <p className="rounded-lg bg-green-50 p-4 text-sm font-semibold text-green-700">
                      ✓ Message sent! We'll be in touch soon.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="rounded-lg bg-red-50 p-4 text-sm font-semibold text-red-700">
                      Could not send. Please use the Mappls or Facebook links above.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="primary-btn w-full justify-center disabled:opacity-60"
                  >
                    {sending ? "Sending..." : "Send Message"}
                    {!sending && <Send className="h-4 w-4" />}
                  </button>
                </form>
              </div>
            </SectionMotion>

            {/* Side Panel */}
            <div className="space-y-6">
              <SectionMotion>
                <div className="card-surface p-7">
                  <h3 className="text-xl font-bold text-primary">School Timings</h3>
                  <div className="mt-5 space-y-4 font-body text-sm">
                    {[
                      ["School Timings", "Monday – Saturday", "9:00 AM – 4:00 PM"],
                      ["Office Hours", "Monday – Saturday", "9:00 AM – 5:00 PM"],
                      ["Admissions Enquiry", "Monday – Saturday", "9:00 AM – 5:00 PM"],
                    ].map(([dept, days, time]) => (
                      <div key={dept} className="flex items-start gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <div>
                          <p className="font-semibold text-ink">{dept}</p>
                          <p className="text-muted">{days}</p>
                          <p className="font-semibold text-primary">{time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionMotion>

              <SectionMotion>
                <div className="card-surface p-7">
                  <h3 className="text-xl font-bold text-primary">Quick Links & Portals</h3>
                  <div className="mt-5 space-y-4">
                    {[
                      { dept: "Mappls Pin", value: "f7773d", href: schoolInfo.mapplsUrl },
                      { dept: "Facebook", value: "facebook.com/gamhariavvm", href: schoolInfo.facebookUrl },
                      { dept: "Justdial", value: "4.6★ (20+ Reviews)", href: schoolInfo.justdialUrl },
                      { dept: "Campus", value: "School Road, Chota Gamharia", href: null },
                    ].map((c) => (
                      <div key={c.dept} className="flex items-center gap-3 font-body text-sm">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                          {c.dept === "Facebook" ? <Mail className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
                        </span>
                        <div>
                          <p className="font-semibold text-ink">{c.dept}</p>
                          {c.href ? (
                            <a href={c.href} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                              {c.value}
                            </a>
                          ) : (
                            <span className="text-primary">{c.value}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionMotion>

              <SectionMotion>
                <Link
                  to="/admissions"
                  className="flex w-full items-center justify-between gap-4 rounded-2xl bg-primary p-7 text-white transition hover:bg-emerald-900"
                >
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-[#F7CB1F]">
                      Admissions 2026–27
                    </p>
                    <p className="mt-1 text-xl font-bold">Apply Now</p>
                    <p className="mt-1 font-body text-sm text-white/70">
                      Limited seats available
                    </p>
                  </div>
                  <ArrowRight className="h-6 w-6 shrink-0 text-[#F7CB1F]" />
                </Link>
              </SectionMotion>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-paper pb-16">
        <div className="container-page">
          <SectionHeader
            title="Find Us on the Map"
            subtitle="Located on School Road, Chota Gamharia, Jamshedpur — use Mappls or the Facebook page for directions and updates."
            icon={<MapPin className="h-6 w-6" />}
          />
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-card">
            <iframe
              src="https://www.google.com/maps?q=School%20Road%20Chota%20Gamharia%20Jamshedpur&output=embed"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vani Vidya Mandir School Location, Gamharia"
            />
          </div>
        </div>
      </section>
    </>
  );
}
