import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Eye,
  FileText,
  Handshake,
  MapPin,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../components/SectionHeader.jsx";
import { missionCards, schoolInfo, teachers } from "../data/siteData.js";

const ICON_MAP = {
  target: Target,
  eye: Eye,
  handshake: Handshake,
};

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

export default function AboutPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, [hash]);

  return (
    <>
      <Helmet>
        <title>About Us | Vani Vidya Mandir School, Gamharia</title>
        <meta name="description" content="Learn about Vani Vidya Mandir School, Gamharia — our mission, vision, values, faculty, and the learning culture that shapes students in Jamshedpur." />
        <meta name="keywords" content="about Vani Vidya Mandir School, school history Gamharia, school mission vision, faculty Jamshedpur school" />
        <link rel="canonical" href="https://devbhoomischool.vercel.app/about" />
        <meta property="og:title" content="About Us | Vani Vidya Mandir School, Gamharia" />
        <meta property="og:description" content="Discover the mission, vision, values, and learning culture of Vani Vidya Mandir School in Gamharia, Jamshedpur." />
        <meta property="og:url" content="https://devbhoomischool.vercel.app/about" />
      </Helmet>

      {/* Page Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(247,203,31,0.22),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.10),transparent_42%)]" />
        <div className="container-page relative">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </nav>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#F7CB1F] md:text-sm">
              Vani Vidya Mandir School
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              A School Rooted in Values, Built for the Future
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              Since our founding, we have been shaping confident, curious, and compassionate young citizens in Gamharia, Jamshedpur.
            </p>
          </div>
        </div>
      </div>

      {/* About School */}
      <section className="section-pad bg-paper">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <SectionMotion>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">
                Our Story
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-snug text-primary">
                About Vani Vidya Mandir School
              </h2>
              <div className="mt-6 space-y-4 font-body text-[15px] leading-8 text-slate-600">
                <p>
                  Vani Vidya Mandir School is a value-led institution located in Gamharia, Jamshedpur. We provide structured, meaningful education with a strong focus on discipline, curiosity, and character.
                </p>
                <p>
                  Our campus is designed for learning and growth — with smart classrooms, modern laboratories, a well-stocked library, open sports spaces, and a culture of assembly, debate, music, and community service that shapes character every single day.
                </p>
                <p>
                  We believe that true education combines academic rigour with moral clarity. Our students leave with not just marks and certificates, but with the discipline, communication skills, and ethical grounding to lead meaningful lives.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/admissions" className="primary-btn">
                  Apply for Admission <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/leadership" className="secondary-btn">
                  Leadership Messages
                </Link>
              </div>
            </SectionMotion>

            <SectionMotion className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: <BookOpen className="h-6 w-6" />,
                  title: "Community Roots",
                  text: "Of trusted education in Gamharia",
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "5,000+ Students",
                  text: "Enrolled across all classes",
                },
                {
                  icon: <ShieldCheck className="h-6 w-6" />,
                  title: "100% Board Results",
                  text: "Consistent academic excellence",
                },
                {
                  icon: <MapPin className="h-6 w-6" />,
                  title: "Gamharia Campus",
                  text: "Safe, spacious, and inspiring learning environment",
                },
              ].map((stat) => (
                <div
                  key={stat.title}
                  className="card-surface flex flex-col gap-3 p-6"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                    {stat.icon}
                  </span>
                  <p className="text-xl font-bold text-primary">{stat.title}</p>
                  <p className="font-body text-sm text-muted">{stat.text}</p>
                </div>
              ))}
            </SectionMotion>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="scroll-mt-28 section-pad bg-[#014E4E]">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
            className="mx-auto mb-10 max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Our Mission, Vision & Values
            </h2>
            <p className="mt-3 font-body text-base leading-7 text-white/70">
              The guiding principles that shape every classroom, assembly, and interaction at Vani Vidya Mandir School.
            </p>
            <div className="mt-5 flex items-center justify-center gap-4">
              <span className="h-px w-20 rounded-full bg-white/25" />
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white">
                <Target className="h-5 w-5" />
              </span>
              <span className="h-px w-20 rounded-full bg-white/25" />
            </div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {missionCards.map((card) => {
              const CardIcon = ICON_MAP[card.icon];
              return (
                <SectionMotion key={card.title}>
                  <article className="flex h-full flex-col items-center rounded-2xl border border-white/10 bg-white/8 p-8 text-center backdrop-blur">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-[#F7CB1F] text-[#014E4E]">
                      {CardIcon && <CardIcon className="h-7 w-7" />}
                    </span>
                    <h3 className="mt-6 text-xl font-bold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-3 font-body text-sm leading-7 text-white/70">
                      {card.text}
                    </p>
                  </article>
                </SectionMotion>
              );
            })}
          </div>
        </div>
      </section>

      {/* School Ethos */}
      <section className="section-pad bg-paper">
        <div className="container-page">
          <SectionHeader
            title="What Makes Us Different"
            subtitle="At Vani Vidya Mandir School, we nurture the whole child — not just the student."
            icon={<ShieldCheck className="h-6 w-6" />}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Character-First Education",
                text: "Morning assemblies, house systems, leadership duties, and community service build responsibility and ethics from the very first year.",
              },
              {
                title: "Academic Rigour",
                text: "Clear lesson planning, concept-based teaching, regular assessments, and guided revision ensure every student progresses steadily.",
              },
              {
                title: "Himalayan Environment",
                text: "Our campus in Gamharia offers children a calm, inspiring environment — close to the community and focused on learning.",
              },
              {
                title: "Parent Partnership",
                text: "We believe parents are equal partners in education. Regular PTMs, written communication, and open-door teacher access keep families informed and involved.",
              },
              {
                title: "Co-Curricular Excellence",
                text: "Debate, art, music, sports, yoga, science exhibitions, and cultural programmes ensure all-round personality development.",
              },
              {
                title: "Safe & Secure Campus",
                text: "CCTV surveillance, trained staff, GPS-enabled transport, and well-monitored entry-exit protocols keep every child safe throughout the school day.",
              },
            ].map((item) => (
              <SectionMotion key={item.title}>
                <article className="card-surface h-full p-6">
                  <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                  <p className="mt-3 font-body text-sm leading-7 text-muted">
                    {item.text}
                  </p>
                </article>
              </SectionMotion>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section id="faculty" className="scroll-mt-28 section-pad bg-[#f4f2ed]">
        <div className="container-page">
          <SectionHeader
            title="Our Faculty"
            subtitle="Experienced educators committed to guiding every student with patience, expertise, and care."
            icon={<Users className="h-6 w-6" />}
          />
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {teachers.map(([name, subject, photo]) => (
              <SectionMotion key={name}>
                <article className="card-surface overflow-hidden text-center">
                  <div className="aspect-square overflow-hidden bg-mist">
                    <img
                      src={photo}
                      alt={`${name} – ${subject}`}
                      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-bold text-primary">{name}</p>
                    <p className="mt-1 font-body text-sm text-accent">{subject}</p>
                  </div>
                </article>
              </SectionMotion>
            ))}
          </div>
        </div>
      </section>

      {/* Mandatory Disclosure */}
      <section id="disclosure" className="scroll-mt-28 section-pad bg-paper">
        <div className="container-page">
          <SectionHeader
            title="Mandatory Public Disclosure"
            subtitle="Regulatory information as required under school affiliation norms."
            icon={<FileText className="h-6 w-6" />}
          />
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
              <table className="w-full font-body text-sm">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Information</th>
                    <th className="px-6 py-4 text-left font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ["School Name", "Vani Vidya Mandir School"],
                    ["Location", schoolInfo.address],
                    ["Mappls Pin", "f7773d"],
                    ["Facebook", schoolInfo.facebookUrl],
                    ["Principal", "To be updated"],
                    ["Contact", "Public phone not listed"],
                    ["Email", "Public email not listed"],
                    ["Classes Offered", "Nursery to Senior Secondary"],
                    ["Medium of Instruction", "English"],
                    ["School Type", "Co-Educational Day School"],
                    ["Status", "Active"],
                  ].map(([label, value], i) => (
                    <tr key={label} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                      <td className="px-6 py-3 font-semibold text-primary">{label}</td>
                      <td className="px-6 py-3 text-muted">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-center font-body text-sm text-muted">
              For complete mandatory disclosure documents, please visit the school office, open the Mappls listing, or follow the Facebook page.
              <a href={schoolInfo.mapplsUrl} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">
                Open Mappls
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
