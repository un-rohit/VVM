import { motion } from "framer-motion";
import {
  Baby,
  BookOpen,
  BookUser,
  GraduationCap,
  Medal,
  Monitor,
  School,
  Sparkles,
  Target,
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

const programLevels = [
  {
    stage: "Pre-Primary",
    classes: "Nursery, LKG & UKG",
    ageGroup: "Ages 3 – 5",
    icon: Baby,
    color: "bg-pink-100 text-pink-700",
    description:
      "A warm and caring environment where young learners begin their educational journey through play-based activities, storytelling, rhymes, art, and guided social interaction.",
    highlights: [
      "Play-based learning with Montessori-inspired methods",
      "Language development through stories and rhymes",
      "Number sense and pre-math skills",
      "Art, music, and creative movement",
      "Personal hygiene and social habits",
      "Regular parent-teacher communication",
    ],
  },
  {
    stage: "Primary School",
    classes: "Class I – V",
    ageGroup: "Ages 6 – 10",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-700",
    description:
      "Building strong foundations in literacy, numeracy, and general awareness. Students develop reading fluency, writing skills, mathematical thinking, and curiosity about the world around them.",
    highlights: [
      "English, Hindi, and Mathematics core curriculum",
      "Environmental Studies and General Science",
      "Computer fundamentals and digital literacy",
      "Art, music, and physical education",
      "Value education and moral science",
      "Class assemblies and public speaking",
    ],
  },
  {
    stage: "Middle School",
    classes: "Class VI – VIII",
    ageGroup: "Ages 11 – 13",
    icon: School,
    color: "bg-emerald-100 text-emerald-700",
    description:
      "A transitional phase where subject specialisation begins. Students explore Science, Social Studies, Mathematics, and Languages in greater depth with practical lab work and projects.",
    highlights: [
      "Subject-wise specialist teachers",
      "Science lab experiments and demonstrations",
      "Social studies projects and map work",
      "Advanced Mathematics and reasoning",
      "Third language introduction",
      "Inter-house competitions and leadership",
    ],
  },
  {
    stage: "Secondary School",
    classes: "Class IX – X",
    ageGroup: "Ages 14 – 15",
    icon: Target,
    color: "bg-amber-100 text-amber-700",
    description:
      "Focused preparation for board examinations with a balanced approach to academics, practical work, and co-curricular participation. Students receive individual attention and career guidance.",
    highlights: [
      "Structured board exam preparation",
      "Science practical sessions and lab records",
      "Mathematics intensive practice",
      "Social Science and languages curriculum",
      "Regular mock tests and performance analysis",
      "Career counselling and subject guidance",
    ],
  },
  {
    stage: "Senior Secondary",
    classes: "Class XI – XII",
    ageGroup: "Ages 16 – 17",
    icon: GraduationCap,
    color: "bg-purple-100 text-purple-700",
    description:
      "Students choose from Science, Commerce, or Arts streams and receive expert guidance for board examinations, competitive exams, and higher education pathways.",
    highlights: [
      "Science stream with Physics, Chemistry, Biology/Mathematics",
      "Commerce stream with Accountancy, Business Studies, Economics",
      "Arts stream with History, Geography, Political Science",
      "Project work and practical assessments",
      "Competitive exam preparation support",
      "College admission guidance and counselling",
    ],
  },
  {
    stage: "Co-Curricular Programs",
    classes: "All Classes",
    ageGroup: "Holistic Development",
    icon: Medal,
    color: "bg-cyan-100 text-cyan-700",
    description:
      "Beyond academics, students participate in sports, arts, music, dance, debate, community service, and leadership programs that build character, confidence, and teamwork.",
    highlights: [
      "Sports and physical fitness programs",
      "Music, dance, and performing arts",
      "Art and craft workshops",
      "Debate and public speaking",
      "Community service and outreach",
      "Student council and leadership duties",
    ],
  },
];

const teachingHighlights = [
  {
    icon: Monitor,
    title: "Smart Classrooms",
    description:
      "Interactive panels and digital content make lessons visual, engaging, and easier to understand.",
  },
  {
    icon: BookUser,
    title: "Expert Faculty",
    description:
      "Qualified and experienced teachers provide personal attention and academic guidance.",
  },
  {
    icon: Sparkles,
    title: "Holistic Approach",
    description:
      "Equal emphasis on academics, sports, arts, values, and life skills for complete development.",
  },
];

export default function AcademicProgramsPage() {
  return (
    <>
      <Helmet>
        <title>Academic Programs | Vani Vidya Mandir School, Gamharia</title>
        <meta
          name="description"
          content="Explore academic programs at Vani Vidya Mandir School, Gamharia — Pre-Primary to Senior Secondary with structured learning, smart classrooms, and expert faculty."
        />
        <meta
          name="keywords"
          content="academic programs Gamharia, school curriculum Jamshedpur, pre-primary to senior secondary, school programs Jharkhand, Vani Vidya Mandir academics"
        />
        <link rel="canonical" href="https://vanividyamandir.vercel.app/academic-programs" />
        <meta property="og:title" content="Academic Programs | Vani Vidya Mandir School, Gamharia" />
        <meta
          property="og:description"
          content="Complete academic programs from Pre-Primary to Senior Secondary at Vani Vidya Mandir School — modern classrooms, thoughtful teaching, and holistic development."
        />
        <meta property="og:url" content="https://vanividyamandir.vercel.app/academic-programs" />
      </Helmet>

      <div className="page-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(247,203,31,0.18),transparent_40%)]" />
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
            <span className="text-white">Academic Programs</span>
          </nav>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#F7CB1F] md:text-sm">
              A Complete Academic Journey
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              Academic Programs
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              From foundational learning in Pre-Primary to board-level excellence
              in Senior Secondary — our structured academic pathway ensures every
              child progresses with confidence and clarity.
            </p>
          </div>
        </div>
      </div>

      <section className="section-pad bg-paper">
        <div className="container-page">
          <SectionHeader
            title="Programs by Stage"
            subtitle="A stage-wise overview of our academic structure, curriculum focus, and learning outcomes."
            icon={<GraduationCap className="h-6 w-6" />}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programLevels.map((program) => {
              const ProgIcon = program.icon;
              return (
                <SectionMotion key={program.stage}>
                  <article className="card-surface group flex h-full flex-col p-7">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <span
                        className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${program.color} transition-all duration-300 group-hover:scale-110`}
                      >
                        <ProgIcon className="h-7 w-7" />
                      </span>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        {program.classes}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-primary">
                      {program.stage}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-accent">
                      {program.ageGroup}
                    </p>
                    <p className="mt-3 flex-1 font-body text-sm leading-7 text-muted">
                      {program.description}
                    </p>

                    <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5">
                      {program.highlights.map((item) => (
                        <li
                          key={item}
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
                          {item}
                        </li>
                      ))}
                    </ul>
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
              Teaching & Learning
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-snug text-white">
              How We Teach
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-[15px] leading-8 text-white/70">
              Our teaching methodology combines conceptual clarity, regular
              practice, and personal attention to help every student succeed.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {teachingHighlights.map((item) => {
              const ItemIcon = item.icon;
              return (
                <SectionMotion key={item.title}>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition duration-300 hover:bg-white/10">
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#F7CB1F]/15 text-[#F7CB1F]">
                      <ItemIcon className="h-8 w-8" />
                    </span>
                    <h3 className="mt-6 text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-body text-sm leading-7 text-white/65">
                      {item.description}
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
            title="Learning Approach"
            subtitle="Our curriculum is designed to develop conceptual understanding, critical thinking, and practical skills."
            icon={<Target className="h-6 w-6" />}
          />
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {[
              {
                title: "Concept-Based Learning",
                points: [
                  "Each topic is introduced with real-life context",
                  "Visual aids and demonstrations for clarity",
                  "Step-by-step progression from basic to advanced",
                  "Regular revision and reinforcement",
                ],
              },
              {
                title: "Continuous Assessment",
                points: [
                  "Unit tests, term exams, and mock tests",
                  "Practical and project-based evaluation",
                  "Individual performance tracking",
                  "Detailed feedback and improvement plans",
                ],
              },
              {
                title: "Personal Attention",
                points: [
                  "Small class sizes for better interaction",
                  "Remedial classes for additional support",
                  "Regular parent-teacher meetings",
                  "Counselling and guidance services",
                ],
              },
              {
                title: "Beyond the Classroom",
                points: [
                  "Field trips and educational excursions",
                  "Science exhibitions and fairs",
                  "Workshops by subject experts",
                  "Community engagement projects",
                ],
              },
            ].map((section) => (
              <SectionMotion key={section.title}>
                <div className="card-surface h-full p-7">
                  <h3 className="text-lg font-bold text-primary">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {section.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 font-body text-sm leading-6 text-muted"
                      >
                        <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                          <svg
                            className="h-3 w-3"
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
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionMotion>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
