import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  ClipboardList,
  FileText,
  HelpCircle,
  Mail,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../components/SectionHeader.jsx";
import { faqs, schoolInfo } from "../data/siteData.js";
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

const admissionSteps = [
  {
    step: "01",
    title: "Submit Enquiry",
    desc: "Fill in the online enquiry form or visit the school office to register your interest and receive an information pack.",
  },
  {
    step: "02",
    title: "Interaction / Assessment",
    desc: "The student attends a brief interaction session with the class teacher. This is a friendly conversation, not a stressful exam.",
  },
  {
    step: "03",
    title: "Document Submission",
    desc: "Submit required documents including the birth certificate, previous school report card, address proof, and passport photographs.",
  },
  {
    step: "04",
    title: "Seat Confirmation",
    desc: "Upon successful interaction and seat availability, the admission form is completed and the fee structure is shared.",
  },
  {
    step: "05",
    title: "Fee Payment",
    desc: "Pay the admission fee and first-term fee to confirm the seat. The fee receipt and admission card are issued.",
  },
  {
    step: "06",
    title: "Welcome to the Family",
    desc: "Attend the parent orientation session and receive the school diary, uniform details, and academic calendar for the term.",
  },
];

const keyDates = [
  ["Admission Form Availability", "November – January (for the upcoming session)"],
  ["Interaction Dates", "February – March (confirmed individually)"],
  ["Admission Confirmation", "March – April"],
  ["Session Commencement", "First week of April"],
  ["Orientation for New Parents", "April – May (announced separately)"],
];

const documents = [
  "Birth Certificate (original + photocopy)",
  "Previous school Transfer Certificate (TC)",
  "Previous class Report Card",
  "Passport-size photographs (4 copies)",
  "Address proof (Aadhaar / Voter ID / Electricity Bill)",
  "Caste Certificate (if applicable)",
  "Medical / Immunisation Record",
];

export default function AdmissionsPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus("");
    try {
      await submitEnquiry({ parentName: form.name, studentName: form.name, email: form.email, phone: form.phone, message: form.message, subject: "Admission Enquiry" });
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
        <title>Admissions Open 2026-27 | Vani Vidya Mandir School, Gamharia</title>
        <meta name="description" content="Admissions open for the 2026-27 session at Vani Vidya Mandir School, Gamharia. Simple enquiry-led admission process with limited seats available." />
        <meta name="keywords" content="school admission Gamharia 2026, Jamshedpur school admission, Vani Vidya Mandir admission process, school fees Jharkhand" />
        <link rel="canonical" href="https://devbhoomischool.vercel.app/admissions" />
        <meta property="og:title" content="Admissions Open 2026-27 | Vani Vidya Mandir School, Gamharia" />
        <meta property="og:description" content="Join Vani Vidya Mandir School in Gamharia. Enquiry-led admissions, transparent process, and value-based education for your child." />
        <meta property="og:url" content="https://devbhoomischool.vercel.app/admissions" />
      </Helmet>

      {/* Page Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(247,203,31,0.20),transparent_40%)]" />
        <div className="container-page relative">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-white">Admissions</span>
          </nav>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#F7CB1F] md:text-sm">
              Admissions Open 2026 – 27
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              Join the Vani Vidya Mandir Community
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              We welcome students from Nursery to Class IX. Limited seats available. Start your child's journey with us today.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#enquiry-form" className="primary-btn bg-[#F7CB1F] text-[#014E4E] hover:bg-white">
                Apply Now <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={schoolInfo.mapplsUrl}
                target="_blank"
                rel="noreferrer"
                className="secondary-btn border-white/40 bg-white/10 text-white hover:bg-white hover:text-primary"
              >
                <Phone className="h-4 w-4" /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Admission Process */}
      <section className="section-pad bg-paper">
        <div className="container-page">
          <SectionHeader
            title="Admission Process"
            subtitle="A simple and transparent 6-step process designed to be stress-free for parents and students."
            icon={<ClipboardList className="h-6 w-6" />}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {admissionSteps.map((item) => (
              <SectionMotion key={item.step}>
                <article className="card-surface flex h-full flex-col gap-4 p-7">
                  <span className="text-4xl font-bold text-primary/15">{item.step}</span>
                  <div>
                    <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                    <p className="mt-2 font-body text-sm leading-7 text-muted">{item.desc}</p>
                  </div>
                </article>
              </SectionMotion>
            ))}
          </div>
        </div>
      </section>

      {/* Dates & Documents */}
      <section className="section-pad bg-[#f4f2ed]">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Key Dates */}
            <SectionMotion>
              <div className="card-surface h-full p-8">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-primary">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </span>
                  Key Admission Dates
                </h2>
                <div className="mt-6 divide-y divide-slate-100">
                  {keyDates.map(([event, date]) => (
                    <div key={event} className="grid py-4 sm:grid-cols-[1fr_auto]">
                      <p className="font-body text-sm text-muted">{event}</p>
                      <p className="mt-1 font-semibold text-primary sm:mt-0 sm:text-right">
                        {date}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 rounded-lg bg-accent/10 p-3 font-body text-xs text-muted">
                  * Dates are indicative. Please contact the admissions office for exact confirmed dates for the current session.
                </p>
              </div>
            </SectionMotion>

            {/* Documents */}
            <SectionMotion>
              <div className="card-surface h-full p-8">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-primary">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                    <ClipboardList className="h-5 w-5" />
                  </span>
                  Documents Required
                </h2>
                <ul className="mt-6 space-y-3">
                  {documents.map((doc) => (
                    <li key={doc} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="font-body text-sm text-muted">{doc}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-lg border border-primary/15 bg-primary/5 p-4">
                  <p className="font-body text-sm text-primary">
                    <strong>Note:</strong> Carry originals for verification and submit self-attested photocopies at the time of admission.
                  </p>
                </div>
              </div>
            </SectionMotion>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-pad bg-paper">
        <div className="container-page">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Common questions from parents about the admission process, fees, and school policies."
            icon={<HelpCircle className="h-6 w-6" />}
          />
          <div className="mx-auto max-w-4xl grid gap-4 md:grid-cols-2">
            {faqs.slice(0, 8).map(([q, a]) => (
              <SectionMotion key={q}>
                <div className="card-surface h-full p-6">
                  <p className="font-semibold text-primary">{q}</p>
                  <p className="mt-2 font-body text-sm leading-7 text-muted">{a}</p>
                </div>
              </SectionMotion>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry-form" className="scroll-mt-28 section-pad bg-[#014E4E]">
        <div className="container-page">
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#F7CB1F]">
                Get in Touch
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Submit an Admission Enquiry
              </h2>
              <p className="mt-3 font-body text-base text-white/70">
                Fill in the form and our admissions team will contact you within one working day.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-10 grid gap-5 rounded-2xl bg-white/10 p-8 backdrop-blur"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white">Parent / Guardian Name *</label>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="input-field bg-white"
                    placeholder="Full name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white">Phone Number *</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="input-field bg-white"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="input-field bg-white"
                  placeholder="your@email.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Message / Query</label>
                <textarea
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="input-field resize-none bg-white"
                  placeholder="Child's name, current class, and any queries..."
                />
              </div>

              {status === "success" && (
                <p className="rounded-lg bg-green-50 p-4 text-sm font-semibold text-green-700">
                  ✓ Enquiry submitted! Our team will contact you soon.
                </p>
              )}
              {status === "error" && (
                <p className="rounded-lg bg-red-50 p-4 text-sm font-semibold text-red-700">
                  Something went wrong. Please use the Mappls or Facebook links above to reach the school.
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="primary-btn w-full justify-center bg-[#F7CB1F] text-[#014E4E] hover:bg-white disabled:opacity-60"
              >
                {sending ? "Submitting..." : "Submit Enquiry"}
                {!sending && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={schoolInfo.mapplsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-body text-sm text-white/80 hover:text-white"
              >
                <Phone className="h-4 w-4" /> Open Mappls
              </a>
              <span className="hidden sm:block text-white/30">|</span>
              <a
                href={schoolInfo.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-body text-sm text-white/80 hover:text-white"
              >
                <Mail className="h-4 w-4" /> Facebook Page
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
