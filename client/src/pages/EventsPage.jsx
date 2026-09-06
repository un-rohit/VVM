import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, MoveRight, Newspaper } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../components/SectionHeader.jsx";
import { newsItems as staticNews, upcomingEvents as staticEvents } from "../data/siteData.js";
import { getPublicSchool, getLatestNews } from "../services/contentApi.js";

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

const annualCalendar = [
  { month: "April", events: ["New Session Commencement", "Parent Orientation", "Sports Day Trials Begin"] },
  { month: "May", events: ["Inter-House Debate Competition", "Science Project Submissions"] },
  { month: "June", events: ["First Term Exams", "Yoga & Wellness Week"] },
  { month: "July", events: ["Independence Day Preparations", "Monsoon Safety Advisory"] },
  { month: "August", events: ["Independence Day Ceremony", "Science & Heritage Exhibition", "Inter-House Football"] },
  { month: "September", events: ["Teacher's Day Celebrations", "Navratri Cultural Program"] },
  { month: "October", events: ["Half-Yearly Exams", "Children's Day Events"] },
  { month: "November", events: ["Annual Sports Day", "Book Fair", "PTM — Second Term"] },
  { month: "December", events: ["Annual Day & Prize Distribution", "Christmas Celebrations", "Winter Break Begins"] },
  { month: "January", events: ["Republic Day Ceremony", "Admission Enquiry Season Opens"] },
  { month: "February", events: ["Second Term Exams", "Science Fair"] },
  { month: "March", events: ["Board Exams", "Annual Results & Prize Distribution"] },
];

export default function EventsPage() {
  const [newsItems, setNewsItems] = useState(staticNews);
  const [upcomingEvents, setUpcomingEvents] = useState(staticEvents);

  useEffect(() => {
    Promise.all([
      getPublicSchool(),
      getLatestNews(50).catch(() => []),
    ]).then(([school, allNews]) => {
      if (allNews.length) setNewsItems(allNews);
      else if (school.newsItems?.length) setNewsItems(school.newsItems);
      if (school.upcomingEvents?.length) setUpcomingEvents(school.upcomingEvents);
    }).catch(() => {});
  }, []);

  const normalizedEvents = upcomingEvents.map((event) => {
    if (Array.isArray(event)) {
      const [day, month, title, venue] = event;
      return { day, month, title, venue };
    }
    const d = new Date(event.date);
    return {
      day: String(d.getDate()),
      month: d.toLocaleString("en-IN", { month: "short" }),
      title: event.title,
      venue: event.text || "",
    };
  });

  const normalizedNews = newsItems.map((item) => ({
    ...item,
    image: item.image || item.imageUrl || "",
  }));

  return (
    <>
      <Helmet>
        <title>Events & News | Vani Vidya Mandir School, Gamharia</title>
        <meta name="description" content="Stay updated with the latest school news, upcoming events, annual calendar, and activities at Vani Vidya Mandir School, Gamharia." />
        <meta name="keywords" content="school events Gamharia, school news, annual calendar, Vani Vidya Mandir activities, school function dates" />
        <link rel="canonical" href="https://devbhoomischool.vercel.app/events" />
        <meta property="og:title" content="Events & News | Vani Vidya Mandir School, Gamharia" />
        <meta property="og:description" content="Latest school news, upcoming events, and the annual activity calendar for Vani Vidya Mandir School." />
        <meta property="og:url" content="https://devbhoomischool.vercel.app/events" />
      </Helmet>

      {/* Page Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(247,203,31,0.18),transparent_40%)]" />
        <div className="container-page relative">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-white">Events & News</span>
          </nav>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#F7CB1F] md:text-sm">
              School Life at Vani Vidya Mandir
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              Events, News & School Calendar
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              Stay updated with the latest school news, upcoming events, and annual activity calendar.
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <section className="section-pad bg-paper">
        <div className="container-page">
          <SectionHeader
            title="Upcoming Events"
            subtitle="Scheduled events and activities for the current academic session."
            icon={<Calendar className="h-6 w-6" />}
          />
          <div className="mx-auto max-w-4xl grid gap-4">
            {normalizedEvents.map((event) => (
              <SectionMotion key={`${event.day}-${event.month}-${event.title}`}>
                <article className="card-surface flex items-center gap-6 p-5 sm:p-7">
                  <div className="flex shrink-0 flex-col items-center justify-center rounded-xl bg-primary px-4 py-3 text-white">
                    <span className="text-3xl font-bold leading-none">{event.day}</span>
                    <span className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/75">
                      {event.month}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate text-lg font-bold text-primary">{event.title}</h3>
                    <p className="mt-1 flex items-center gap-2 font-body text-sm text-muted">
                      <MapPin className="h-4 w-4 shrink-0" />
                      {event.venue}
                    </p>
                  </div>
                </article>
              </SectionMotion>
            ))}
            {normalizedEvents.length === 0 && (
              <p className="rounded-lg border border-dashed border-slate-200 bg-white p-10 text-center font-body text-sm text-muted">
                No upcoming events scheduled yet. Check back soon.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="section-pad bg-[#f4f2ed]">
        <div className="container-page">
          <SectionHeader
            title="Latest School News"
            subtitle="Recent achievements, activities, and updates from Vani Vidya Mandir School."
            icon={<Newspaper className="h-6 w-6" />}
          />
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {normalizedNews.map((item) => (
              <SectionMotion key={item.title}>
                <article className="card-surface group flex h-full flex-col overflow-hidden">
                  <div className="aspect-video overflow-hidden bg-mist">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-accent">
                      <Clock className="h-3.5 w-3.5" />
                      {item.date}
                    </p>
                    <h3 className="text-base font-bold leading-6 text-primary">{item.title}</h3>
                    <p className="flex-1 font-body text-sm leading-7 text-muted line-clamp-3">
                      {item.text}
                    </p>
                  </div>
                </article>
              </SectionMotion>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Calendar */}
      <section className="section-pad bg-paper">
        <div className="container-page">
          <SectionHeader
            title="Annual Activity Calendar"
            subtitle="A month-wise overview of events, examinations, and key academic activities for the school year."
            icon={<Calendar className="h-6 w-6" />}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {annualCalendar.map((month) => (
              <SectionMotion key={month.month}>
                <div className="card-surface h-full p-6">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-primary">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                    {month.month}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {month.events.map((event) => (
                      <li
                        key={event}
                        className="flex items-start gap-2 font-body text-sm text-muted"
                      >
                        <MoveRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {event}
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionMotion>
            ))}
          </div>
          <p className="mt-8 text-center font-body text-sm text-muted">
            * Calendar is indicative. Exact dates are communicated through school notices and the student diary.
          </p>
        </div>
      </section>
    </>
  );
}
