import { motion } from "framer-motion";
import {
  Dumbbell,
  Medal,
  Footprints,
  Swords,
  Target,
  Trophy,
  Users,
  Heart,
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

const sportCategories = [
  {
    title: "Outdoor Games",
    icon: Target,
    color: "bg-emerald-100 text-emerald-700",
    sports: [
      {
        name: "Football",
        description:
          "Football is one of the most popular sports at school. Students receive regular coaching, participate in inter-house tournaments, and represent the school at district and state-level competitions.",
      },
      {
        name: "Cricket",
        description:
          "Cricket practice is held on the school ground with professional coaching. Students develop batting, bowling, and fielding skills through drills and match practice.",
      },
      {
        name: "Basketball",
        description:
          "Basketball develops agility, coordination, and teamwork. The school has a dedicated court and students participate in inter-school basketball meets.",
      },
      {
        name: "Volleyball",
        description:
          "Volleyball is played during physical education periods and inter-house tournaments. It builds upper body strength and team coordination.",
      },
      {
        name: "Kabaddi",
        description:
          "Kabaddi is a traditional Indian sport that develops stamina, strength, and quick reflexes. It is a favourite during inter-house competitions.",
      },
    ],
  },
  {
    title: "Indoor Games",
    icon: Swords,
    color: "bg-blue-100 text-blue-700",
    sports: [
      {
        name: "Table Tennis",
        description:
          "Table tennis sharpens reflexes and concentration. The school has indoor tables and students participate in district-level table tennis tournaments.",
      },
      {
        name: "Badminton",
        description:
          "Badminton is played both recreationally and competitively. Students receive coaching in singles and doubles formats.",
      },
      {
        name: "Chess",
        description:
          "Chess develops strategic thinking, patience, and problem-solving skills. The school conducts chess tournaments and participates in inter-school events.",
      },
      {
        name: "Carrom",
        description:
          "Carrom is a popular indoor game that improves focus and precision. It is played during activity periods and house competitions.",
      },
    ],
  },
  {
    title: "Athletics",
    icon: Footprints,
    color: "bg-amber-100 text-amber-700",
    sports: [
      {
        name: "Track Events",
        description:
          "Sprints, middle-distance races, and relay events are conducted during annual sports day and inter-house meets. Coaching is provided for state-level athletics participation.",
      },
      {
        name: "Field Events",
        description:
          "Long jump, high jump, shot put, and discus throw are part of the athletics curriculum. Students receive technical coaching for each discipline.",
      },
      {
        name: "Cross-Country",
        description:
          "Cross-country running is organised annually, promoting endurance and fitness among students from middle school upwards.",
      },
    ],
  },
  {
    title: "Yoga & Fitness",
    icon: Heart,
    color: "bg-purple-100 text-purple-700",
    sports: [
      {
        name: "Daily Yoga Practice",
        description:
          "Located in Gamharia, our students practise yoga daily. Sessions include asanas, pranayama, and meditation for physical and mental well-being.",
      },
      {
        name: "Wellness Programs",
        description:
          "Wellness weeks are conducted each term with nutrition talks, fitness challenges, mindfulness sessions, and health check-up camps.",
      },
      {
        name: "Physical Training",
        description:
          "Regular physical training sessions include warm-up exercises, strength training, and flexibility drills tailored to different age groups.",
      },
    ],
  },
];

const houseSystem = [
  { name: "Ganga House", color: "bg-orange-500" },
  { name: "Yamuna House", color: "bg-blue-500" },
  { name: "Saraswati House", color: "bg-yellow-500" },
  { name: "Alaknanda House", color: "bg-green-500" },
];

export default function SportsActivitiesPage() {
  return (
    <>
      <Helmet>
        <title>Sports Activities | Vani Vidya Mandir School, Gamharia</title>
        <meta
          name="description"
          content="Explore sports activities at Vani Vidya Mandir School, Gamharia — outdoor games, indoor games, athletics, yoga, fitness, and inter-house competitions."
        />
        <meta
          name="keywords"
          content="school sports Gamharia, football cricket basketball, yoga school Gamharia, athletics, indoor games, inter-house sports, Vani Vidya Mandir sports"
        />
        <link rel="canonical" href="https://devbhoomischool.vercel.app/sports-activities" />
        <meta property="og:title" content="Sports Activities | Vani Vidya Mandir School, Gamharia" />
        <meta
          property="og:description"
          content="Comprehensive sports program at Vani Vidya Mandir School — outdoor and indoor games, athletics, yoga, fitness, and annual sports day."
        />
        <meta property="og:url" content="https://devbhoomischool.vercel.app/sports-activities" />
      </Helmet>

      <div className="page-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(247,203,31,0.18),transparent_40%)]" />
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
            <span className="text-white">Sports Activities</span>
          </nav>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#F7CB1F] md:text-sm">
              Fitness, Sport & Well-being
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              Sports Activities
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              A strong sports program that builds physical fitness, team spirit,
              discipline, and character through a wide range of indoor and
              outdoor activities.
            </p>
          </div>
        </div>
      </div>

      {sportCategories.map((category) => {
        const CatIcon = category.icon;
        return (
          <section
            key={category.title}
            className="section-pad bg-paper even:bg-[#f4f2ed]"
          >
            <div className="container-page">
              <SectionHeader
                title={category.title}
                subtitle={`${category.title} offered at Vani Vidya Mandir School for holistic physical development.`}
                icon={<CatIcon className="h-6 w-6" />}
              />

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {category.sports.map((sport) => (
                  <SectionMotion key={sport.name}>
                    <article className="card-surface group flex h-full flex-col p-6">
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${category.color}`}
                        >
                          <Medal className="h-5 w-5" />
                        </span>
                        <h3 className="text-lg font-bold text-primary">
                          {sport.name}
                        </h3>
                      </div>
                      <p className="mt-4 flex-1 font-body text-sm leading-7 text-muted">
                        {sport.description}
                      </p>
                    </article>
                  </SectionMotion>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section-pad bg-[#014E4E]">
        <div className="container-page">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F7CB1F]">
              Inter-House System
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-snug text-white">
              Inter-House Competitions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-[15px] leading-8 text-white/70">
              The four houses compete throughout the year across sports,
              academics, and cultural events. The House Cup is awarded at the
              annual prize ceremony.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {houseSystem.map((house) => (
              <SectionMotion key={house.name}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition duration-300 hover:bg-white/10">
                  <div
                    className={`mx-auto h-16 w-16 rounded-2xl ${house.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">
                    {house.name}
                  </h3>
                  <p className="mt-2 font-body text-sm text-white/60">
                    Competing with honour and school spirit
                  </p>
                </div>
              </SectionMotion>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white">
              Annual Sports Day
            </h3>
            <p className="mx-auto mt-4 max-w-3xl font-body text-base leading-7 text-white/70">
              The Annual Sports Day is one of the most anticipated events at
              Vani Vidya Mandir School. Students from all classes participate in
              track events, field events, drills, march past, and group
              performances. Parents are invited to cheer for their children and
              celebrate the spirit of sportsmanship.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {[
                "March Past",
                "Track Events",
                "Field Events",
                "Drill Display",
                "Yoga Display",
                "Prize Distribution",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#F7CB1F]/40 bg-white/10 px-4 py-1.5 text-sm font-semibold text-[#F7CB1F]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="container-page">
          <SectionHeader
            title="Sports Philosophy"
            subtitle="At Vani Vidya Mandir School, sports are an integral part of education — not an add-on."
            icon={<Dumbbell className="h-6 w-6" />}
          />
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              {
                icon: Trophy,
                title: "Skill Development",
                desc: "Students learn sport-specific skills, rules, and strategies through structured coaching and practice.",
              },
              {
                icon: Users,
                title: "Team Spirit",
                desc: "Team sports teach cooperation, communication, leadership, and the value of working toward a common goal.",
              },
              {
                icon: Heart,
                title: "Health & Wellness",
                desc: "Regular physical activity promotes fitness, mental well-being, discipline, and a healthy lifestyle.",
              },
            ].map((item) => {
              const ItemIcon = item.icon;
              return (
                <SectionMotion key={item.title}>
                  <div className="card-surface p-7 text-center">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <ItemIcon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-body text-sm leading-7 text-muted">
                      {item.desc}
                    </p>
                  </div>
                </SectionMotion>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
