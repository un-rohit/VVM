import { motion } from "framer-motion";
import {
  Atom,
  BookOpen,
  Code2,
  Feather,
  Music,
  Palette,
  Sparkles,
  TreePine,
  Trophy,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../components/SectionHeader.jsx";

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

const clubs = [
  {
    name: "Science Club",
    icon: Atom,
    color: "bg-cyan-100 text-cyan-700",
    description:
      "The Science Club encourages students to explore scientific concepts through experiments, model-making, quizzes, and exhibitions. Members participate in the annual Science & Heritage Exhibition and state-level science fairs.",
    activities: [
      "Hands-on experiments and demonstrations",
      "Science quiz and Olympiad preparation",
      "Model-making and working projects",
      "Nature study and field observations",
      "Annual science exhibition participation",
    ],
  },
  {
    name: "Eco Club",
    icon: TreePine,
    color: "bg-emerald-100 text-emerald-700",
    description:
      "The Eco Club creates environmental awareness and promotes sustainable practices among students. From Ganga cleanliness drives to tree plantation, members lead the school's green initiatives.",
    activities: [
      "Tree plantation and campus greening",
      "Ganga cleanliness awareness drives",
      "Waste segregation and recycling programs",
      "Energy conservation campaigns",
      "Eco-friendly festival celebrations",
    ],
  },
  {
    name: "Literary Club",
    icon: Feather,
    color: "bg-amber-100 text-amber-700",
    description:
      "The Literary Club nurtures language skills, creative writing, and a love for reading. Members engage in poetry, story writing, book reviews, and literary competitions throughout the year.",
    activities: [
      "Creative writing and poetry sessions",
      "Book review and reading circles",
      "Storytelling and narrative skills",
      "Essay writing competitions",
      "School magazine contributions",
    ],
  },
  {
    name: "Art Club",
    icon: Palette,
    color: "bg-pink-100 text-pink-700",
    description:
      "The Art Club provides a platform for students to explore visual arts including painting, sketching, clay modelling, and craft. Members showcase their work during school exhibitions and cultural events.",
    activities: [
      "Painting and sketching workshops",
      "Clay modelling and sculpture",
      "Rangoli and decorative art",
      "Poster-making and greeting cards",
      "Annual art exhibition",
    ],
  },
  {
    name: "Music Club",
    icon: Music,
    color: "bg-purple-100 text-purple-700",
    description:
      "The Music Club develops vocal and instrumental skills through regular practice and performances. Students learn classical and contemporary music and perform at assemblies and school functions.",
    activities: [
      "Vocal training and choir practice",
      "Instrumental music (keyboard, tabla, guitar)",
      "School assembly performances",
      "Annual day cultural programs",
      "Inter-school music competitions",
    ],
  },
  {
    name: "Coding Club",
    icon: Code2,
    color: "bg-blue-100 text-blue-700",
    description:
      "The Coding Club introduces students to programming, logical thinking, and digital creativity. From block-based coding to text-based languages, members build projects and participate in tech challenges.",
    activities: [
      "Block-based coding for beginners",
      "Python and web development basics",
      "App and game design projects",
      "Robotics and hardware tinkering",
      "Tech quiz and hackathon participation",
    ],
  },
  {
    name: "Debate Club",
    icon: BookOpen,
    color: "bg-indigo-100 text-indigo-700",
    description:
      "The Debate Club builds confidence, critical thinking, and public speaking skills. Members participate in debates, elocution, group discussions, and Model United Nations (MUN) conferences.",
    activities: [
      "Debate practice and competitions",
      "Elocution and extempore speaking",
      "Group discussions on current affairs",
      "Mock Parliament sessions",
      "Inter-house and inter-school debates",
    ],
  },
];

const benefits = [
  {
    icon: Users,
    title: "Teamwork & Leadership",
    desc: "Clubs teach students to collaborate, lead, and take responsibility.",
  },
  {
    icon: Sparkles,
    title: "Creativity & Expression",
    desc: "Students explore their talents and express themselves confidently.",
  },
  {
    icon: Trophy,
    title: "Recognition & Achievement",
    desc: "Club participation is recognised through certificates and awards.",
  },
];

export default function ClubsSocietiesPage() {
  return (
    <>
      <Helmet>
        <title>Clubs & Societies | Vani Vidya Mandir School, Gamharia</title>
        <meta
          name="description"
          content="Explore clubs and societies at Vani Vidya Mandir School, Gamharia — Science Club, Eco Club, Literary Club, Art Club, Music Club, Coding Club, and Debate Club."
        />
        <meta
          name="keywords"
          content="school clubs Gamharia, science club, eco club, debate club, coding club, music club, art club, literary club, Vani Vidya Mandir societies"
        />
        <link rel="canonical" href="https://vanividyamandir.vercel.app/clubs-societies" />
        <meta property="og:title" content="Clubs & Societies | Vani Vidya Mandir School, Gamharia" />
        <meta
          property="og:description"
          content="Discover a wide range of clubs and societies at Vani Vidya Mandir School — from Science and Coding to Music, Art, and Debate."
        />
        <meta property="og:url" content="https://vanividyamandir.vercel.app/clubs-societies" />
      </Helmet>

      <div className="page-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(247,203,31,0.18),transparent_40%)]" />
        <div className="container-page relative">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <Link to="/academics" className="hover:text-white transition">
              Academics
            </Link>
            <span>/</span>
            <span className="text-white">Clubs & Societies</span>
          </nav>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#F7CB1F] md:text-sm">
              Beyond the Classroom
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              Clubs & Societies
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              Our clubs and societies provide students with opportunities to
              explore interests, develop talents, and build lifelong skills
              beyond the academic curriculum.
            </p>
          </div>
        </div>
      </div>

      <section className="section-pad bg-paper">
        <div className="container-page">
          <SectionHeader
            title="Our Clubs"
            subtitle="Every student is encouraged to join at least one club and discover their passion."
            icon={<Sparkles className="h-6 w-6" />}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club) => {
              const ClubIcon = club.icon;
              return (
                <SectionMotion key={club.name}>
                  <article className="card-surface group flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1">
                    <div className="mb-5 flex items-center gap-4">
                      <span
                        className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${club.color} transition-all duration-300 group-hover:scale-110`}
                      >
                        <ClubIcon className="h-7 w-7" />
                      </span>
                      <h3 className="text-xl font-bold text-primary">
                        {club.name}
                      </h3>
                    </div>

                    <p className="flex-1 font-body text-sm leading-7 text-muted">
                      {club.description}
                    </p>

                    <div className="mt-5 border-t border-slate-100 pt-5">
                      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-accent">
                        Activities
                      </p>
                      <ul className="space-y-2">
                        {club.activities.map((activity) => (
                          <li
                            key={activity}
                            className="flex items-start gap-2 font-body text-sm text-muted"
                          >
                            <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                              <svg
                                className="h-2.5 w-2.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </SectionMotion>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#014E4E]">
        <div className="container-page">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F7CB1F]">
              Why Join a Club?
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-snug text-white">
              Benefits of Club Participation
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-[15px] leading-8 text-white/70">
              Club activities help students discover their strengths, build
              confidence, and develop skills that last a lifetime.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => {
              const BenIcon = benefit.icon;
              return (
                <SectionMotion key={benefit.title}>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition duration-300 hover:bg-white/10">
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#F7CB1F]/15 text-[#F7CB1F]">
                      <BenIcon className="h-8 w-8" />
                    </span>
                    <h3 className="mt-6 text-xl font-bold text-white">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 font-body text-sm leading-7 text-white/65">
                      {benefit.desc}
                    </p>
                  </div>
                </SectionMotion>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f4f2ed]">
        <div className="container-page">
          <SectionHeader
            title="Join a Club"
            subtitle="Club registration happens at the beginning of each academic session. Students can also participate in multiple clubs."
            icon={<Users className="h-6 w-6" />}
          />
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-body text-base leading-8 text-muted">
              Club membership is open to all students from Class III onwards.
              Each club meets once a week during activity period, with
              additional practice sessions before competitions and events.
              Students are encouraged to suggest new club ideas and take on
              leadership roles within their chosen club.
            </p>
            <div className="mt-8">
              <Link
                to="/contact"
                className="primary-btn inline-flex items-center gap-2"
              >
                Enquire About Clubs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
