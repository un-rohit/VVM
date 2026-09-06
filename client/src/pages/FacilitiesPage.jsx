import { motion } from "framer-motion";
import {
  BookOpen,
  Bus,
  Computer,
  FlaskConical,
  Library,
  Music,
  ShieldCheck,
  Tv,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../components/SectionHeader.jsx";
import { facilities } from "../data/siteData.js";

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

const extraFacilities = [
  {
    icon: <Bus className="h-6 w-6" />,
    title: "GPS-Enabled Transport",
    description:
      "Safe, GPS-tracked school buses covering major routes across Gamharia and surrounding areas. Trained drivers and attendants accompany students at all times.",
  },
  {
    icon: <Music className="h-6 w-6" />,
    title: "Music Room",
    description:
      "A dedicated music room equipped with instruments including harmonium, tabla, guitar, and keyboard for vocal and instrumental practice.",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Reading Program",
    description:
      "Structured daily reading periods, class libraries, and book-sharing events cultivate a reading culture from Pre-Primary onwards.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "CCTV & Security",
    description:
      "24/7 CCTV coverage across the campus with trained security staff ensuring the safety of every student throughout the school day.",
  },
  {
    icon: <Tv className="h-6 w-6" />,
    title: "AV Room & Auditorium",
    description:
      "A well-equipped auditorium and audio-visual room used for school assemblies, cultural programmes, and academic presentations.",
  },
  {
    icon: <Trophy className="h-6 w-6" />,
    title: "Playground & Open Grounds",
    description:
      "Spacious open grounds for football, cricket, athletics, and daily morning physical training on campus.",
  },
];

export default function FacilitiesPage() {
  return (
    <>
      <Helmet>
        <title>Facilities | Vani Vidya Mandir School, Gamharia</title>
        <meta name="description" content="Explore modern facilities at Vani Vidya Mandir School, Gamharia — smart classrooms, science labs, library, computer lab, sports ground, and more." />
        <meta name="keywords" content="school facilities Gamharia, smart classroom, school library, science lab, computer lab, school transport, Vani Vidya Mandir" />
        <link rel="canonical" href="https://vanividyamandir.vercel.app/facilities" />
        <meta property="og:title" content="Facilities | Vani Vidya Mandir School, Gamharia" />
        <meta property="og:description" content="Modern infrastructure including smart classrooms, labs, library, sports ground, and safe transport facilities." />
        <meta property="og:url" content="https://vanividyamandir.vercel.app/facilities" />
      </Helmet>

      {/* Page Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(247,203,31,0.20),transparent_40%)]" />
        <div className="container-page relative">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-white">Facilities</span>
          </nav>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#F7CB1F] md:text-sm">
              Campus Infrastructure
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              Modern Facilities for Better Learning
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              Every space at Vani Vidya Mandir School is designed with purpose — to support learning, safety, creativity, and healthy growth.
            </p>
          </div>
        </div>
      </div>

      {/* Core Facilities */}
      <section className="section-pad bg-paper">
        <div className="container-page">
          <SectionHeader
            title="Core Academic Facilities"
            subtitle="Infrastructure that makes teaching more effective and learning more engaging."
            icon={<FlaskConical className="h-6 w-6" />}
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => (
              <SectionMotion key={facility.title}>
                <article className="card-surface group flex h-full flex-col overflow-hidden">
                  <div className="aspect-video overflow-hidden bg-mist">
                    <img
                      src={facility.image}
                      alt={`${facility.title} at Vani Vidya Mandir School`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="text-xl font-bold text-primary">{facility.title}</h3>
                    <p className="font-body text-sm leading-7 text-muted">{facility.description}</p>
                  </div>
                </article>
              </SectionMotion>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Facilities */}
      <section className="section-pad bg-[#f4f2ed]">
        <div className="container-page">
          <SectionHeader
            title="Additional Campus Facilities"
            subtitle="Support services and infrastructure that make school life safe, comfortable, and enriching."
            icon={<ShieldCheck className="h-6 w-6" />}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {extraFacilities.map((facility) => (
              <SectionMotion key={facility.title}>
                <article className="card-surface flex h-full flex-col gap-4 p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    {facility.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-primary">{facility.title}</h3>
                    <p className="mt-2 font-body text-sm leading-7 text-muted">{facility.description}</p>
                  </div>
                </article>
              </SectionMotion>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-primary text-white">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold text-white">See the Campus in Person</h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-base leading-7 text-white/75">
            We welcome parents and students to visit the campus, meet the faculty, and experience the learning environment firsthand.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#F7CB1F] px-7 py-3.5 text-sm font-bold text-[#014E4E] shadow-soft transition hover:-translate-y-0.5 hover:bg-white"
            >
              Schedule a Visit
            </Link>
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-primary"
            >
              Apply for Admission
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
