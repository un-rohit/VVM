import { motion } from "framer-motion";
import {
  Baby,
  BookOpen,
  GraduationCap,
  Medal,
  Music,
  Palette,
  School,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../components/SectionHeader.jsx";
import { programs } from "../data/siteData.js";

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

const PROGRAM_ICON_MAP = {
  child: Baby,
  school: School,
  book: BookOpen,
  graduate: GraduationCap,
  cap: GraduationCap,
  medal: Medal,
};

const clubs = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    name: "Science Club",
    desc: "Experiments, exhibitions, STEM projects, and nature study programs.",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    name: "Art & Craft Club",
    desc: "Painting, sketching, clay modelling, and cultural art forms.",
  },
  {
    icon: <Music className="h-6 w-6" />,
    name: "Music & Drama",
    desc: "Vocal practice, instrument training, stage productions, and assemblies.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    name: "Debate & Literary Club",
    desc: "Elocution, debate, creative writing, and public speaking development.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    name: "Eco & Environment Club",
    desc: "Ganga conservation awareness, plantation drives, and sustainability projects.",
  },
  {
    icon: <Trophy className="h-6 w-6" />,
    name: "Student Council",
    desc: "Leadership, discipline duties, school events, and community service.",
  },
];

const sports = [
  {
    name: "Football",
    desc: "Inter-house tournaments, state-level trials, and regular coaching sessions.",
  },
  {
    name: "Cricket",
    desc: "Practice on school grounds, inter-school competitions, and district representation.",
  },
  {
    name: "Yoga & Wellness",
    desc: "Daily yoga sessions, wellness weeks, and mindfulness programs woven into school life.",
  },
  {
    name: "Athletics",
    desc: "Track events, field activities, and participation in state-level athletics meets.",
  },
  {
    name: "Basketball",
    desc: "Team drills, inter-house competitions, and development of teamwork.",
  },
  {
    name: "Table Tennis & Badminton",
    desc: "Indoor sports facility for individual skill building and competition.",
  },
];

export default function AcademicsPage() {
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
        <title>Academics | Vani Vidya Mandir School, Gamharia</title>
        <meta name="description" content="Explore academic programs at Vani Vidya Mandir School, Gamharia — from Nursery to Senior Secondary with smart classrooms, labs, clubs, and sports activities." />
        <meta name="keywords" content="academic programs Gamharia, school academics, clubs sports activities, smart classroom Gamharia" />
        <link rel="canonical" href="https://devbhoomischool.vercel.app/academics" />
        <meta property="og:title" content="Academics | Vani Vidya Mandir School, Gamharia" />
        <meta property="og:description" content="Complete academic programs from Nursery to Class XII with modern teaching methods and co-curricular activities." />
        <meta property="og:url" content="https://devbhoomischool.vercel.app/academics" />
      </Helmet>

      {/* Page Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(247,203,31,0.18),transparent_40%)]" />
        <div className="container-page relative">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-white">Academics</span>
          </nav>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#F7CB1F] md:text-sm">
              Learning at Vani Vidya Mandir
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              Academics, Co-Curriculars & Sports
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              A complete education that builds sharp minds, disciplined habits, creative expression, and a love for lifelong learning.
            </p>
          </div>
        </div>
      </div>

      {/* Academic Programs */}
      <section id="programs" className="scroll-mt-28 section-pad bg-paper">
        <div className="container-page">
          <SectionHeader
            title="Academic Programs"
            subtitle="From foundational learning to board-level excellence — a complete academic journey."
            icon={<GraduationCap className="h-6 w-6" />}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map(([name, desc, icon]) => {
              const Icon = PROGRAM_ICON_MAP[icon] || BookOpen;
              return (
                <SectionMotion key={name}>
                  <article className="card-surface group flex h-full flex-col gap-4 p-7">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-primary">{name}</h3>
                      <p className="mt-2 font-body text-sm leading-7 text-muted">{desc}</p>
                    </div>
                  </article>
                </SectionMotion>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curriculum Approach */}
      <section className="section-pad bg-[#014E4E]">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <SectionMotion>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F7CB1F]">
                Our Approach
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-snug text-white">
                Curriculum Designed for Deep Understanding
              </h2>
              <div className="mt-6 space-y-4 font-body text-[15px] leading-8 text-white/75">
                <p>
                  We follow a structured curriculum aligned with national board guidelines, taught by qualified subject specialists. Lessons are planned around clear concepts, visual aids, written practice, and regular revision — so students build genuine understanding, not just surface familiarity.
                </p>
                <p>
                  Class-wise reading programs, project-based learning, model-making, group discussions, and regular assessments complement daily classroom teaching. We believe that consistent small steps, guided by good teachers, lead to strong board results and lifelong learning habits.
                </p>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Regular diagnostic assessments",
                  "Concept-based lesson planning",
                  "Structured revision programs",
                  "Individual student tracking",
                  "Parent communication on progress",
                  "Board exam preparation from Class VIII",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#F7CB1F] text-[#014E4E]">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-body text-sm text-white/80">{point}</span>
                  </div>
                ))}
              </div>
            </SectionMotion>

            <SectionMotion>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8">
                <h3 className="text-xl font-bold text-white">Class-wise Structure</h3>
                <div className="mt-6 space-y-4">
                  {[
                    { stage: "Pre-Primary", classes: "Nursery, LKG, UKG", focus: "Play-based foundational learning, number sense, and language." },
                    { stage: "Primary", classes: "Class I – V", focus: "Core literacy, numeracy, EVS, and introduction to arts & sports." },
                    { stage: "Middle School", classes: "Class VI – VIII", focus: "Subject specialisation, labs, projects, and leadership." },
                    { stage: "Secondary", classes: "Class IX – X", focus: "Board preparation with focused academic and practical work." },
                    { stage: "Senior Secondary", classes: "Class XI – XII", focus: "Science, Commerce, or Arts streams with career guidance." },
                  ].map((item) => (
                    <div key={item.stage} className="rounded-xl border border-white/10 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-bold text-white">{item.stage}</p>
                        <span className="rounded-full bg-[#F7CB1F]/15 px-3 py-1 text-xs font-bold text-[#F7CB1F]">
                          {item.classes}
                        </span>
                      </div>
                      <p className="mt-2 font-body text-sm text-white/60">{item.focus}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionMotion>
          </div>
        </div>
      </section>

      {/* Clubs & Societies */}
      <section id="clubs" className="scroll-mt-28 section-pad bg-paper">
        <div className="container-page">
          <SectionHeader
            title="Clubs & Societies"
            subtitle="Structured co-curricular programs that build talent, teamwork, and leadership beyond the classroom."
            icon={<Trophy className="h-6 w-6" />}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club) => (
              <SectionMotion key={club.name}>
                <article className="card-surface group flex h-full flex-col gap-4 p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                    {club.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-primary">{club.name}</h3>
                    <p className="mt-2 font-body text-sm leading-7 text-muted">{club.desc}</p>
                  </div>
                </article>
              </SectionMotion>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/clubs-societies"
              className="primary-btn inline-flex items-center gap-2"
            >
              View All Clubs & Societies
            </Link>
          </div>
        </div>
      </section>

      {/* Sports */}
      <section id="sports" className="scroll-mt-28 section-pad bg-[#f4f2ed]">
        <div className="container-page">
          <SectionHeader
            title="Sports Activities"
            subtitle="Physical fitness, team spirit, and healthy competition — an essential part of school life at Vani Vidya Mandir."
            icon={<Medal className="h-6 w-6" />}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sports.map((sport) => (
              <SectionMotion key={sport.name}>
                <article className="card-surface flex h-full flex-col gap-3 p-6">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                    <h3 className="text-lg font-bold text-primary">{sport.name}</h3>
                  </div>
                  <p className="font-body text-sm leading-7 text-muted">{sport.desc}</p>
                </article>
              </SectionMotion>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/sports-activities"
              className="primary-btn inline-flex items-center gap-2"
            >
              View All Sports Activities
            </Link>
          </div>

          <div className="mt-14 rounded-2xl bg-primary p-8 text-center text-white md:p-12">
            <h3 className="text-2xl font-bold text-white">Inter-House Competitions</h3>
            <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-7 text-white/75">
              Our four houses — Ganga, Yamuna, Saraswati, and Alaknanda — compete across academics, arts, and sports throughout the year. The House Cup system builds pride, responsibility, and school spirit in every student.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {["Ganga House", "Yamuna House", "Saraswati House", "Alaknanda House"].map((house) => (
                <span
                  key={house}
                  className="rounded-full border border-[#F7CB1F]/50 bg-white/10 px-5 py-2 text-sm font-bold text-[#F7CB1F]"
                >
                  {house}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
