import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Award,
  Baby,
  MoveRight,
  BookOpen,
  BookUser,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Download,
  Eye,
  GraduationCap,
  Handshake,
  ImageIcon,
  Mail,
  Medal,
  MessageSquare,
  Newspaper,
  School,
  Search,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Send,
  X,
} from "lucide-react";
import SectionHeader from "../components/SectionHeader.jsx";
import SimpleCarousel from "../components/SimpleCarousel.jsx";
import PdfModal from "../components/PdfModal.jsx";
import {
  achievements,
  facilities,
  faqs,
  galleryImages,
  heroSlides,
  leaders,
  missionCards,
  programs,
  teachers,
  testimonials,
  toppers as staticToppers,
} from "../data/siteData.js";
import heroImg from "../../assets/gallery/slide.webp";
import gallery6 from "../../assets/gallery/g14.webp";
import {
  getPublicSchool,
  getLatestNews,
  directPdfUrl,
  submitEnquiry,
} from "../services/contentApi.js";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const ICON_MAP = {
  users: Users,
  school: School,
  trend: TrendingUp,
  teacher: BookUser,
  award: Award,
  child: Baby,
  book: BookOpen,
  graduate: GraduationCap,
  cap: GraduationCap,
  medal: Medal,
  target: Target,
  eye: Eye,
  handshake: Handshake,
  calendar: Calendar,
  newspaper: Newspaper,
};

export default function Home({ focusSection }) {
  const [schoolInfo, setSchoolInfo] = useState(null);
  const [features, setFeatures] = useState({
    notices: true,
    news: true,
    events: true,
  });
  const [notices, setNotices] = useState([]);
  const [activePdf, setActivePdf] = useState(null);
  const [newsItems, setNewsItems] = useState([]);
  const [events, setEvents] = useState([]);
  const [toppers, setToppers] = useState(staticToppers);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    setLoadError("");
    Promise.all([getPublicSchool(), getLatestNews(50).catch(() => [])])
      .then(([school, allNews]) => {
        setSchoolInfo(school.school || null);
        setFeatures(
          school.features || { notices: true, news: true, events: true },
        );
        setNotices(school.starredNotices || []);
        setNewsItems(allNews.length ? allNews : school.newsItems || []);
        setEvents(school.upcomingEvents || []);
        if (school.toppers && school.toppers.length > 0) {
          setToppers({
            class10: school.toppers.filter((t) => t.className === "class10"),
            class12: school.toppers.filter((t) => t.className === "class12"),
          });
        } else {
          setToppers(staticToppers);
        }
      })
      .catch((err) =>
        setLoadError(err.response?.data?.message || "Could not load school."),
      );
  }, []);
  useEffect(() => {
    // title managed by Helmet
  }, [schoolInfo]);
  useEffect(() => {
    if (!focusSection) return;
    document
      .getElementById(focusSection)
      ?.scrollIntoView({ behavior: "smooth" });
  }, [focusSection]);

  return (
    <>
      <Helmet>
        <title>
          Vani Vidya Mandir School, Gamharia | Jamshedpur
        </title>
        <meta
          name="description"
          content="Vani Vidya Mandir School, Gamharia — a school serving Jamshedpur with modern learning spaces, dedicated faculty, and value-based education. Admissions open for 2026-27."
        />
        <meta
          name="keywords"
          content="Vani Vidya Mandir School, Gamharia school, Jamshedpur school admission 2026, English medium school Jharkhand, school near Chota Gamharia"
        />
        <link rel="canonical" href="https://vanividyamandir.vercel.app/" />
        <meta
          property="og:title"
          content="Vani Vidya Mandir School, Gamharia"
        />
        <meta
          property="og:description"
          content="Vani Vidya Mandir School in Gamharia offers a supportive learning environment with modern facilities, dedicated faculty, and value-based education."
        />
        <meta property="og:url" content="https://vanividyamandir.vercel.app/" />
      </Helmet>

      <Hero />
      <MissionVision />
      <Leadership />
      <Teachers />
      {loadError && (
        <p className="container-page py-4 text-sm font-semibold text-red-600">
          {loadError}
        </p>
      )}
      {features.notices !== false && (
        <NoticeBoard
          notices={notices}
          noticePath="/notices"
          onOpenPdf={setActivePdf}
        />
      )}
      {(features.news !== false || features.events !== false) && (
        <NewsEvents
          newsItems={newsItems}
          upcomingEvents={events}
          showNews={features.news !== false}
          showEvents={features.events !== false}
        />
      )}
      <Facilities />
      <Testimonials />
      <Achievements />
      <Toppers toppers={toppers} />
      <AcademicPrograms />
      <AdmissionCta />
      <Gallery />
      <Faq />
      <Contact />
      <PdfModal
        title={activePdf?.title}
        file={activePdf?.file}
        onClose={() => setActivePdf(null)}
      />
    </>
  );
}

function SectionMotion({ children, className = "" }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.45 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-ink sm:min-h-[83vh]">
      <AnimatePresence mode="wait">
        <motion.img
          key={heroSlides[active]}
          src={heroSlides[active]}
          alt="School campus"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 bg-fix h-full w-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-primary/35 to-transparent" />
      <div className="container-page relative flex min-h-[360px] items-center pb-10 pt-20 sm:min-h-[440px] sm:pb-12 sm:pt-24 md:min-h-[620px] md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl text-white"
        >
          <p className="mb-4 w-fit rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
            Admissions Open for Session 2026 - 27
          </p>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Vani Vidya Mandir School, Gamharia
          </h1>
          <p className="mt-5 max-w-2xl font-body text-lg leading-8 text-white/85">
            Purposeful learning, clear values, and a campus culture shaped for
            growing children in Gamharia.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="primary-btn bg-accent text-ink hover:bg-white hover:text-primary"
            >
              Apply Now <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#gallery"
              className="secondary-btn border-white/40 bg-white/10 text-white hover:bg-white hover:text-primary"
            >
              View Gallery
            </a>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {heroSlides.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            onClick={() => setActive(index)}
            className={`h-2.5 rounded-full transition-all ${active === index ? "w-10 bg-accent" : "w-2.5 bg-white/70"}`}
          />
        ))}
      </div>
    </section>
  );
}

function MissionVision() {
  return (
    <section className="section-pad bg-paper">
      <div className="container-page">
        <SectionHeader
          title="Vani Vidya Mandir School, Gamharia"
          subtitle="Purposeful learning, clear values, and a campus culture shaped for growing children in Gamharia."
          icon={
            <span className="group grid h-12 w-12 place-items-center rounded-full bg-white shadow-md ring-1 ring-[#014E4E]/10 transition-all duration-300 hover:scale-110 hover:bg-[#014E4E]">
              <BookOpen className="h-6 w-6 text-[#014E4E] transition-all duration-300 group-hover:text-white" />
            </span>
          }
        />

        <div className="grid gap-5 md:grid-cols-3">
          {missionCards.map((card) => {
            const CardIcon = ICON_MAP[card.icon];
            return (
              <SectionMotion key={card.title}>
                <article className="card-surface group flex h-full flex-col items-center p-7 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-white transition-all duration-500 group-hover:scale-110 group-hover:bg-yellow-400 group-hover:text-primary group-hover:[transform:rotateY(180deg)]">
                    {CardIcon && <CardIcon className="h-7 w-7" />}
                  </span>

                  <h3 className="mt-6 text-xl font-semibold text-primary">
                    {card.title}
                  </h3>

                  <p className="mt-3 font-body text-sm leading-7 text-muted">
                    {card.text}
                  </p>
                </article>
              </SectionMotion>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section className="section-pad bg-[#f4f2ed]">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-6 lg:px-8">
        <SectionHeader
          title="From the Leadership Desk"
          subtitle="Chairman and Headmaster / Principal Messages"
          icon={
            <span className="group grid h-12 w-12 place-items-center rounded-full bg-white shadow-md ring-1 ring-[#014E4E]/10 transition-all duration-300 hover:scale-110 hover:bg-[#014E4E]">
              <MessageSquare className="h-6 w-6 text-[#014E4E] transition-all duration-300 group-hover:text-white" />
            </span>
          }
        />

        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          {leaders.map((leader, index) => (
            <SectionMotion key={leader.name} className="h-full">
              <Link
                to={`/leadership#${leader.id}`}
                className="block h-full focus:outline-none focus:ring-4 focus:ring-[#014E4E]/20"
              >
                <article className="flex h-full cursor-pointer flex-col">
                  <h2 className="mb-6 text-center text-lg font-bold uppercase tracking-[0.06em] text-[#174C43] sm:text-xl lg:mb-8">
                    Message From The {leader.role}
                  </h2>

                  <div className="grid h-full min-h-[520px] overflow-hidden bg-white shadow-xl ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,77,67,0.18)] md:grid-cols-[0.45fr_0.55fr]">
                    <div
                      className={`relative flex min-h-[260px] items-center justify-center bg-[#174C43] p-6 text-center md:min-h-full ${
                        index % 2 === 1 ? "md:order-1" : ""
                      }`}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_35%)]" />

                      <div className="relative z-10 flex h-full flex-col items-center justify-center">
                        <p className="mb-6 max-w-[280px] font-body text-sm leading-7 text-white/90 sm:text-[15px]">
                          “{leader.message}”
                        </p>

                        <span className="group inline-flex items-center justify-center gap-3 border border-white/90 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-white hover:text-[#174C43]">
                          Read Message
                          <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">
                            ›
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="relative min-h-[260px] overflow-hidden md:min-h-full">
                      <img
                        src={leader.image}
                        alt={`${leader.name} - ${leader.role}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top transition duration-700 ease-out hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 px-5 py-4 sm:px-6 sm:py-5">
                        <div className="mb-2 h-[2px] w-12 bg-white/80" />

                        <h3 className="text-base font-bold text-white sm:text-lg">
                          {leader.name}
                        </h3>

                        <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-white/80">
                          {leader.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </SectionMotion>
          ))}
        </div>
      </div>
    </section>
  );
}
function Teachers() {
  return (
    <section className="section-pad overflow-hidden bg-[#F8F9FA]">
      <div className="container-page">
        <SectionHeader
          title="Our Expert Teachers"
          subtitle="Dedicated mentors shaping bright futures"
          icon={
            <span className="group grid h-12 w-12 place-items-center rounded-full bg-white shadow-md ring-1 ring-[#014E4E]/10 transition-all duration-300 hover:scale-110 hover:bg-[#014E4E]">
              <BookUser className="h-6 w-6 text-[#014E4E] transition-all duration-300 group-hover:text-white" />
            </span>
          }
        />

        <div className="relative mt-10 overflow-hidden md:p-5 p-2">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#F8F9FA] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#F8F9FA] to-transparent" />

          <div className="flex w-max gap-5 animate-teacher-scroll hover:[animation-play-state:paused]">
            {[...teachers, ...teachers].map(([name, role, image], index) => (
              <article
                key={`${name}-${index}`}
                className="group w-[255px] shrink-0 rounded-xl border border-[#014E4E]/10 bg-white p-5 text-center shadow-[0_12px_32px_rgba(15,77,67,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#014E4E]/25 hover:shadow-[0_18px_42px_rgba(15,77,67,0.14)]"
              >
                <div className="mx-auto grid h-31 w-31 place-items-center rounded-full bg-[#F3F7F6] ring-1 ring-[#014E4E]/10">
                  <img
                    className="h-31 w-31 rounded-full object-cover shadow-md transition duration-300 group-hover:scale-105"
                    src={image}
                    alt={name}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold leading-tight text-[#014E4E]">
                  {name}
                </h3>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  {role}
                </p>

                <div className="mx-auto mt-4 h-px w-12 bg-[#014E4E]/15" />

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Inspiring students through focused learning and personal
                  guidance.
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NoticeBoard({ notices, noticePath = "/notices", onOpenPdf }) {
  const homeNotices = notices.slice(0, 4);

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat section-pad lg:bg-fixed"
      style={{
        backgroundImage: `url(${heroImg})`,
      }}
    >
      <div className="container-page relative z-10">
        <div className="[&_h2]:!text-white [&_h2]:drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] [&_p]:!text-white/80 [&_p]:drop-shadow-[0_2px_5px_rgba(0,0,0,0.45)]">
          <SectionHeader
            title="Notice Board"
            subtitle="Important updates, circulars, and school announcements"
            icon={
              <span className="group grid h-12 w-12 place-items-center rounded-full border border-white/40 bg-white/95 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#014E4E]">
                <Newspaper className="h-6 w-6 text-[#014E4E] transition-all duration-300 group-hover:text-white" />
              </span>
            }
          />
        </div>

        <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {homeNotices.map((notice, index) => (
            <SectionMotion
              key={notice._id || `${notice.title}-${index}`}
              className="h-full"
            >
              <article className="flex h-full flex-col rounded-2xl border border-white/35 bg-white/95 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <span className="mb-4 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#F7CB1F]/20 text-[#014E4E]">
                  <Calendar className="h-5 w-5" />
                </span>

                <h3 className="text-lg font-bold leading-6 text-[#014E4E]">
                  {notice.title}
                </h3>

                {notice.text && (
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {notice.text}
                  </p>
                )}

                {typeof notice.pdfUrl === "string" && notice.pdfUrl.trim() && (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenPdf({
                        title: notice.title,
                        file: {
                          name: notice.pdfName,
                          url: directPdfUrl(notice),
                        },
                      })
                    }
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#014E4E] transition-colors hover:text-[#d79a21]"
                  >
                    Read More
                    <MoveRight className="h-4 w-4" />
                  </button>
                )}
              </article>
            </SectionMotion>
          ))}
        </div>

        {!homeNotices.length && (
          <p className="py-10 text-center font-body text-sm text-white/80">
            No notices published yet.
          </p>
        )}

        <div className="mt-8 text-center">
          <Link
            to={noticePath}
            className="secondary-btn border-white bg-white text-[#014E4E] hover:bg-[#014E4E] hover:text-white"
          >
            View All Notices
          </Link>
        </div>
      </div>
    </section>
  );
}

function NewsEvents({
  newsItems,
  upcomingEvents,
  showNews = true,
  showEvents = true,
}) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0);
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? new Date(0) : d;
  };

  const sortedNews = [...newsItems].sort(
    (a, b) => parseDate(b.date) - parseDate(a.date),
  );

  return (
    <section id="events" className="section-pad bg-[#F5F3EE]">
      <div className="container-page">
        <SectionHeader
          title="School News & Upcoming Events."
          subtitle="Stay updated with school announcements & upcoming activities"
          icon={
            <span className="group grid h-12 w-12 place-items-center rounded-full bg-white shadow-md ring-1 ring-[#014E4E]/10 transition-all duration-300 hover:scale-110 hover:bg-[#014E4E]">
              <Newspaper className="h-6 w-6 text-[#014E4E] transition-all duration-300 group-hover:text-white" />
            </span>
          }
        />

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.75fr_0.85fr]">
          {showNews && (
            <div className="min-w-0">
              <ColumnTitle
                icon={<Newspaper className="h-6 w-6 text-[#014E4E]" />}
                title="Latest News & Events"
              />

              <div className="mt-6">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div />
                  <Link
                    to="/events"
                    className="whitespace-nowrap rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-bold text-primary shadow-sm transition hover:bg-primary hover:text-white sm:text-sm"
                  >
                    All Events
                  </Link>
                </div>
                {sortedNews.length > 0 ? (
                  <SimpleCarousel className="pb-3">
                    {sortedNews.map((news, index) => {
                      const formattedDate = news.date
                        ? new Date(news.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "";
                      return (
                        <article
                          key={news._id || `${news.title}-${index}`}
                          className="card-surface group flex h-full flex-col overflow-hidden rounded-2xl bg-white"
                        >
                          <div className="relative h-[180px] shrink-0 overflow-hidden sm:h-[200px]">
                            {news.imageUrl ? (
                              <img
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src={news.imageUrl}
                                alt={news.title}
                                loading="lazy"
                                decoding="async"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-slate-100">
                                <Newspaper className="h-10 w-10 text-slate-300" />
                              </div>
                            )}

                            {formattedDate && (
                              <span className="absolute bottom-3 left-3 rounded-full bg-[#FFD600] px-3 py-1.5 text-[11px] font-bold text-[#014E4E] shadow-md sm:bottom-4 sm:left-4 sm:px-4 sm:py-2 sm:text-xs">
                                {formattedDate}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-1 flex-col p-4 sm:p-5">
                            <h3 className="line-clamp-2 text-sm font-bold leading-tight text-[#014E4E] sm:text-base sm:leading-6">
                              {news.title}
                            </h3>

                            <p className="mt-2 line-clamp-3 flex-1 font-body text-xs leading-6 text-muted sm:text-sm sm:leading-7">
                              {news.text}
                            </p>
                          </div>
                        </article>
                      );
                    })}
                  </SimpleCarousel>
                ) : (
                  <p className="font-body text-sm text-muted">
                    No news published yet.
                  </p>
                )}
              </div>
            </div>
          )}

          {showEvents && (
            <aside className="min-w-0">
              <ColumnTitle
                icon={<Calendar className="h-6 w-6 text-[#014E4E]" />}
                title="Upcoming Events"
              />

              <div className="card-surface custom-scrollbar mt-6 max-h-[493px] overflow-y-auto rounded-2xl bg-white p-6 pr-5 shadow-card">
                {upcomingEvents.map((event, index) => {
                  const d = new Date(event.date);
                  const day = d.getDate();
                  const month = d
                    .toLocaleString("en-IN", { month: "short" })
                    .toUpperCase();
                  const year = d.getFullYear();

                  const maxLength = 85;
                  const shouldTruncate = event.text?.length > maxLength;
                  const shortText = shouldTruncate
                    ? `${event.text.slice(0, maxLength).trim()}...`
                    : event.text;

                  return (
                    <div
                      key={event._id || `${event.title}-${index}`}
                      className="flex items-start gap-4 border-b border-slate-100 py-4 first:pt-0 last:border-0 last:pb-0"
                    >
                      <span className="flex h-[96px] w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#014E4E] text-center text-white shadow-sm">
                        <span className="text-xl font-bold leading-none">
                          {day}
                        </span>
                        <span className="mt-1 text-xs font-semibold leading-none uppercase">
                          {month}
                        </span>
                        <span className="mt-1 text-[12px] font-medium leading-none text-white/75">
                          {year}
                        </span>
                      </span>

                      <span className="min-w-0 pt-1 leading-6">
                        <h4 className="line-clamp-2 font-bold text-[#014E4E]">
                          {event.title}
                        </h4>
                        <p className="mt-1 font-body text-sm leading-4 text-muted">
                          {shortText}{" "}
                          {shouldTruncate && (
                            <button
                              type="button"
                              onClick={() => setSelectedEvent(event)}
                              className="inline cursor-pointer font-semibold text-[#014E4E] underline decoration-[#014E4E]/40 underline-offset-2 transition hover:text-[#D79A21]"
                            >
                              Read more
                            </button>
                          )}
                        </p>
                      </span>
                    </div>
                  );
                })}
                {!upcomingEvents.length && (
                  <p className="py-6 text-center font-body text-sm text-muted">
                    No events published yet.
                  </p>
                )}
              </div>
            </aside>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-[#014E4E] hover:text-white"
                aria-label="Close event details"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="pr-10">
                <p className="mb-2 font-body text-sm font-semibold text-[#D79A21]">
                  {new Date(selectedEvent.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <h3
                  id="event-modal-title"
                  className="text-xl font-bold text-[#014E4E]"
                >
                  {selectedEvent.title}
                </h3>
              </div>

              <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1">
                <p className="whitespace-pre-line font-body text-sm leading-7 text-slate-600">
                  {selectedEvent.text}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Toppers({ toppers }) {
  const [tab, setTab] = useState("class10");
  const activeToppers = toppers[tab] || [];

  return (
    <section className="section-pad bg-[#F8FAFC]">
      <div className="container-page">
        <SectionHeader
          title="Our Board Exam Achievers"
          subtitle="Class X & XII Top Performers - School's Pride"
          icon={
            <span className="group grid h-12 w-12 place-items-center rounded-full bg-white ring-1 ring-[#014E4E]/10 transition-all duration-300 hover:scale-110 hover:bg-[#014E4E]">
              <GraduationCap className="h-6 w-6 text-[#014E4E] transition-all duration-300 group-hover:text-white" />
            </span>
          }
        />

        <div className="mb-12 mt-6 flex justify-center gap-3 sm:mb-20">
          {[
            ["class10", "Class X Toppers"],
            ["class12", "Class XII Toppers"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-full border border-[#014E4E] px-5 py-2 text-sm font-bold transition-all duration-300 ${
                tab === id
                  ? "bg-[#014E4E] text-white"
                  : "bg-white text-[#014E4E] hover:bg-[#014E4E] hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-[1320px] bg-transparent">
          {activeToppers.length > 0 ? (
            <SimpleCarousel
              key={tab}
              className="bg-transparent pt-6 sm:pt-8 [&>*]:!shadow-none [&>*]:!bg-transparent [&>[data-carousel-item]]:!min-w-[99%] [&>[data-carousel-item]]:!shadow-none sm:[&>[data-carousel-item]]:!min-w-[48%] lg:[&>[data-carousel-item]]:!min-w-[31.5%]"
            >
              {activeToppers.map((item, index) => {
                const [name, score, message, image, batch] = Array.isArray(item)
                  ? item
                  : [
                      item.name,
                      typeof item.score === "number"
                        ? `${item.score}%`
                        : item.score,
                      item.message,
                      item.image,
                      item.batch,
                    ];

                return (
                  <article
                    key={name}
                    className="relative flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white px-5 pb-5 pt-12 text-center transition-all duration-300 hover:-translate-y-2 sm:px-8 sm:pb-8 sm:pt-16"
                  >
                    <div>
                      <span className="absolute left-1/2 top-0 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-[#014E4E] text-base font-bold text-white sm:h-12 sm:w-12 sm:text-lg">
                        {index + 1}
                      </span>

                      <img
                        className="mx-auto h-32 w-32 rounded-full border-4 border-[#E8EEF2] object-cover sm:h-36 sm:w-3 lg:h-44 lg:w-44"
                        src={image}
                        alt={name}
                        loading="lazy"
                        decoding="async"
                      />

                      <h3 className="mt-4 text-base font-bold text-slate-950 sm:mt-6 sm:text-lg">
                        {name}
                      </h3>

                      <p className="mt-1 text-xl font-bold text-[#014E4E] sm:text-2xl">
                        {score}
                      </p>

                      {batch && (
                        <p className="mt-1 text-xs font-semibold text-muted">
                          {batch}
                        </p>
                      )}
                    </div>

                    <p className="mt-4 line-clamp-3 font-body text-sm italic text-slate-500 sm:mt-5">
                      {message}
                    </p>
                  </article>
                );
              })}
            </SimpleCarousel>
          ) : null}
        </div>

        {!activeToppers.length && (
          <p className="py-10 text-center font-body text-sm text-muted">
            No toppers published yet.
          </p>
        )}
      </div>
    </section>
  );
}

function Facilities() {
  return (
    <section id="facilities" className="section-pad bg-[#E4E2DD]">
      <div className="mx-auto max-w-[1850px] px-5">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-[#174C43] sm:text-4xl section-title">
            Campus Facilities
          </h2>

          <p className="mx-auto mt-2 max-w-4xl text-sm text-[#5F6763] sm:text-base">
            A balanced campus environment designed to support academics,
            creativity, physical fitness, values, and student safety.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="h-px w-20 bg-[#174C43]/20" />

            <span className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-md ring-1 ring-[#014E4E]/10">
              <School className="h-5 w-5 text-[#014E4E]" />
            </span>

            <span className="h-px w-20 bg-[#174C43]/20" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {facilities.slice(0, 5).map((facility) => (
            <article
              key={facility.title}
              className="group relative h-[330px] overflow-hidden rounded-md shadow-lg ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl sm:h-[380px] lg:h-[430px] xl:h-[490px]"
            >
              <img
                src={facility.image}
                alt={facility.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#014E4E]/75 via-[#014E4E]/15 to-transparent opacity-80 transition duration-500 group-hover:opacity-100" />

              {/* Normal bottom title */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-4 transition-all duration-500 group-hover:translate-y-8 group-hover:opacity-0">
                <div className="rounded-md bg-[#174C43]/95 px-4 py-3 text-center shadow-lg backdrop-blur-sm">
                  <h3 className="text-base font-bold leading-tight text-white sm:text-lg">
                    {facility.title}
                  </h3>
                </div>
              </div>

              {/* Hover slide-up overlay */}
              <div className="absolute inset-x-4 bottom-4 z-20 translate-y-[115%] rounded-md bg-[#174C43]/95 p-5 text-white shadow-xl backdrop-blur-sm transition-all duration-700 ease-out group-hover:translate-y-0">
                <h3 className="text-xl font-semibold leading-tight">
                  {facility.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-white/95">
                  {facility.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const gap = 16;

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setCardWidth(Math.floor((w - gap * 2) / 3));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="section-pad overflow-hidden bg-[#f4f2ed]">
      <div className="mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-wide text-[#174C43] sm:text-3xl md:text-4xl">
            Testimonials
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            What Parents & Students Say About Us
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[#174C43]/20 sm:w-24" />
            <span className="text-xl text-[#174C43]/45">&#10087;</span>
            <span className="h-px w-16 bg-[#174C43]/20 sm:w-24" />
          </div>
        </div>

        <div
          ref={containerRef}
          className="mx-auto max-w-7xl overflow-hidden md:p-5 p-2"
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              gap: `${gap}px`,
              transform: cardWidth
                ? `translateX(-${activeIndex * (cardWidth + gap)}px)`
                : "none",
            }}
          >
            {[...testimonials, ...testimonials].map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="relative flex min-h-[260px] shrink-0 flex-col rounded-md border border-black/10 bg-white/85 p-5  backdrop-blur-sm sm:p-6"
                style={{ width: cardWidth || "33.333%", minWidth: "260px" }}
              >
                <span className="absolute right-4 top-1 font-serif text-6xl font-black leading-none text-[#174C43] opacity-75 sm:right-5 sm:text-7xl">
                  &rdquo;
                </span>
                <p className="relative z-10 flex-1 text-[13px] mt-2 leading-6 text-slate-800 sm:text-[13.5px] sm:leading-7">
                  {item.text}
                </p>
                <div className="relative z-10 mt-auto flex items-center gap-3 pt-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="h-11 w-11 rounded-full border-2 border-[#174C43] object-cover p-0.5 shadow-sm sm:h-12 sm:w-12"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-[#174C43]">
                      {item.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500">{item.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedCount({ value }) {
  const [count, setCount] = useState(1);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  const number = parseInt(String(value).replace(/\D/g, ""), 10) || 0;
  const suffix = String(value).replace(/[0-9]/g, "");

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.35 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let startTime;
    const duration = 1800;

    const animate = (time) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount(Math.max(1, Math.floor(easeOut * number)));

      if (progress < 1) {
        window.requestAnimationFrame(animate);
      }
    };

    window.requestAnimationFrame(animate);
  }, [started, number]);

  return (
    <span ref={ref}>
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

function Achievements() {
  return (
    <section
      id="achievements"
      className="section-pad overflow-hidden bg-[#E4E2DD]"
    >
      <div className="container-page">
        <SectionHeader
          title="Our Achievements"
          subtitle="Milestones that reflect our excellence in education"
          icon={
            <span className="group grid h-12 w-12 place-items-center rounded-full bg-white shadow-md ring-1 ring-[#014E4E]/10 transition-all duration-300 hover:scale-110 hover:bg-[#014E4E]">
              <Trophy className="h-6 w-6 text-[#014E4E] transition-all duration-300 group-hover:text-white" />
            </span>
          }
        />

        <div className="grid auto-rows-[240px] gap-4 md:grid-cols-3 md:auto-rows-[260px]">
          {achievements.map(([count, label, icon, image, span]) => {
            const AchIcon = ICON_MAP[icon];

            return (
              <article
                key={label}
                className={`group relative overflow-hidden rounded-2xl bg-white shadow-[0_18px_45px_rgba(15,77,67,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,77,67,0.18)] ${span}`}
              >
                <img
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  src={image}
                  alt={label}
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2f2b]/95 via-[#174C43]/45 to-black/10" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  {AchIcon && <AchIcon className="mb-4 h-8 w-8 text-white" />}

                  <h3 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    <AnimatedCount value={count} />
                  </h3>

                  <p className="mt-2 max-w-[260px] text-sm font-medium leading-6 text-white/90">
                    {label}
                  </p>

                  <div className="mt-5 h-px w-20 bg-white/30 transition-all duration-500 group-hover:w-32" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AcademicPrograms() {
  return (
    <section id="academics" className="section-pad bg-[#E4E2DD]">
      <div className="container-page">
        <SectionHeader
          title="Academic Programs"
          subtitle="Structured learning pathways from foundational to senior education"
          icon={
            <span className="group grid h-12 w-12 place-items-center rounded-full bg-white shadow-md ring-1 ring-[#014E4E]/10 transition-all duration-300 hover:scale-110 hover:bg-[#014E4E]">
              <BookOpen className="h-6 w-6 text-[#014E4E] transition-all duration-300 group-hover:text-white" />
            </span>
          }
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map(([title, text, icon], index) => {
            const ProgIcon = ICON_MAP[icon];

            return (
              <article
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-[#014E4E]/10 bg-white p-7 shadow-[0_16px_40px_rgba(15,77,67,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#014E4E]/25 hover:shadow-[0_22px_55px_rgba(15,77,67,0.14)]"
              >
                <div className="absolute right-5 top-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#014E4E]/8 text-xl font-extrabold text-[#014E4E]/45 ring-1 ring-[#014E4E]/10 transition-all duration-300 group-hover:bg-[#014E4E] group-hover:text-white">
                  0{index + 1}
                </div>

                <span className="grid h-14 w-14 place-items-center rounded-xl bg-[#014E4E]/10 text-[#014E4E] ring-1 ring-[#014E4E]/10 transition-all duration-300 group-hover:bg-[#014E4E] group-hover:text-white">
                  {ProgIcon && <ProgIcon className="h-7 w-7" />}
                </span>

                <h3 className="mt-6 text-xl font-bold text-[#014E4E]">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>

                <div className="mt-6 flex items-center justify-between border-t border-[#014E4E]/10 pt-5"></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AdmissionCta() {
  return (
    <section className="bg-[#F5F3EE] py-14">
      <div className="container-page">
        <div className="rounded-3xl bg-white p-8 text-[#004F3B] shadow-soft md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold text-primary md:text-3xl">
                Admissions Open for Session 2026 - 27
              </h2>
              <p className="mt-3 font-body leading-7 text-primary">
                Empower your child with academic excellence, modern facilities,
                and value-based education. Limited seats available - secure
                admission today.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href="#" className="secondary-btn hover:-translate-y-1">
                Download Prospectus <Download className="h-4 w-4 " />
              </a>
              <a
                href="#contact"
                className="primary-btn bg-primary text-white hover:bg-white hover:text-primary hover:-translate-y-1 hover:border-1"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const homeGalleryImages = galleryImages.slice(0, 13);
  const activeImage =
    activeIndex === null ? null : homeGalleryImages[activeIndex]?.[0];

  const move = (direction) => {
    setActiveIndex(
      (current) =>
        (current + direction + homeGalleryImages.length) %
        homeGalleryImages.length,
    );
  };

  return (
    <section id="gallery" className="section-pad overflow-hidden bg-paper">
      <div className="container-page">
        <SectionHeader
          title="School Gallery"
          subtitle="Capturing memories, achievements & campus life"
          icon={
            <span className="group grid h-12 w-12 place-items-center rounded-full bg-white shadow-md ring-1 ring-[#014E4E]/10 transition-all duration-300 hover:scale-110 hover:bg-[#014E4E]">
              <ImageIcon className="h-6 w-6 text-[#014E4E] transition-all duration-300 group-hover:text-white" />
            </span>
          }
        />

        <div className="grid auto-rows-[150px] gap-3 sm:auto-rows-[190px] md:grid-cols-4 lg:auto-rows-[220px]">
          {homeGalleryImages.map(([image, span, , title], index) => {
            const homeSpan = index === 0 ? "md:col-span-2 md:row-span-2" : "";

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`group relative overflow-hidden rounded-2xl bg-[#014E4E]/10 shadow-[0_16px_38px_rgba(15,77,67,0.10)] ring-1 ring-[#014E4E]/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(15,77,67,0.18)] ${homeSpan}`}
              >
                <img
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  src={image}
                  alt={title || "School gallery"}
                  loading="lazy"
                  decoding="async"
                />

                <span className="absolute inset-0 bg-gradient-to-t from-[#082f2b]/85 via-[#014E4E]/20 to-transparent opacity-40 transition duration-500 group-hover:opacity-100" />

                <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#014E4E] opacity-0 shadow-lg backdrop-blur-md transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <Search className="h-6 w-6" />
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-2 rounded-full bg-[#014E4E] px-7 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(1,78,78,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#174C43] hover:shadow-[0_18px_40px_rgba(1,78,78,0.28)]"
          >
            See More Photos
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-5"
            onClick={() => setActiveIndex(null)}
          >
            <button
              type="button"
              className="absolute right-5 top-5 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white hover:text-[#014E4E]"
              onClick={() => setActiveIndex(null)}
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="absolute left-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white hover:text-[#014E4E]"
              onClick={(event) => {
                event.stopPropagation();
                move(-1);
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <motion.img
              key={activeImage}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-h-[84vh] max-w-[92vw] rounded-2xl object-contain shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
              src={activeImage}
              alt="Selected gallery"
              onClick={(event) => event.stopPropagation()}
            />

            <button
              type="button"
              className="absolute right-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white hover:text-[#014E4E]"
              onClick={(event) => {
                event.stopPropagation();
                move(1);
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-md">
              {activeIndex + 1} / {homeGalleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative bg-cover bg-center bg-no-repeat bg-fixed section-pad">
      {/* Dark/soft overlay for readability */}
      <div className="absolute inset-0 bg-[#E4E2DD]/70" />

      <div className="container-page relative z-10">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about admissions & academics"
          icon={
            <span className="group grid h-12 w-12 place-items-center rounded-full bg-white shadow-md ring-1 ring-[#014E4E]/10 transition-all duration-300 hover:scale-110 hover:bg-[#014E4E]">
              <CircleHelp className="h-6 w-6 text-[#014E4E] transition-all duration-300 group-hover:text-white" />
            </span>
          }
        />

        <div className="lg:columns-2 lg:gap-4">
          {faqs.map(([question, answer], index) => (
            <div
              key={question}
              className="mb-4 break-inside-avoid overflow-hidden rounded-lg border border-white/50 bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-300 ease-out hover:shadow-xl"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-primary"
              >
                {question}

                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden px-6 pb-5 font-body text-sm leading-7 text-muted"
                  >
                    {answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({
    parentName: "",
    studentName: "",
    email: "",
    phone: "+91",
    className: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const MESSAGE_LIMIT = 300;
  const remaining = MESSAGE_LIMIT - form.message.length;

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const updatePhone = (event) => {
    let value = event.target.value;

    if (!value.startsWith("+91")) {
      value = "+91";
    }

    const digits = value.replace("+91", "").replace(/\D/g, "").slice(0, 10);

    setForm((current) => ({
      ...current,
      phone: `+91 ${digits}`,
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      await submitEnquiry(form);
      setSubmitted(true);

      setForm({
        parentName: "",
        studentName: "",
        email: "",
        phone: "+91",
        className: "",
        message: "",
      });
    } catch (err) {
      setSubmitError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white pt-14 md:pt-20">
      <div className="container-page">
        <SectionHeader
          title="Admission Enquiry"
          subtitle="Connect with us for admissions, queries, and school visits"
          icon={
            <span className="group grid h-12 w-12 place-items-center rounded-full bg-white shadow-md ring-1 ring-[#014E4E]/10 transition-all duration-300 hover:scale-110 hover:bg-[#014E4E]">
              <Mail className="h-6 w-6 text-[#014E4E] transition-all duration-300 group-hover:text-white" />
            </span>
          }
        />

        <div className="grid gap-5 overflow-hidden rounded-lg bg-white shadow-card lg:h-[760px] lg:grid-cols-2">
          <div className="relative h-72 overflow-hidden rounded-2xl sm:h-80 md:h-96 lg:h-full">
            <img
              className="absolute inset-0 h-full w-full object-cover object-center"
              src={gallery6}
              alt="School Campus"
            />
          </div>

          <form
            onSubmit={submitForm}
            className="flex flex-col justify-center overflow-hidden rounded-2xl p-8 shadow-lg md:p-10 lg:h-full lg:p-12"
          >
            <h3 className="mb-8 text-2xl font-semibold text-primary">
              Enquiry Form
            </h3>

            <div className="grid gap-5">
              <TextField
                name="parentName"
                placeholder="Parent Name"
                value={form.parentName}
                onChange={updateField}
              />

              <TextField
                name="studentName"
                placeholder="Student Name"
                value={form.studentName}
                onChange={updateField}
              />

              <TextField
                name="email"
                placeholder="Email Address"
                type="email"
                value={form.email}
                onChange={updateField}
              />

              <TextField
                name="phone"
                placeholder="+91 Phone Number"
                type="tel"
                value={form.phone}
                onChange={updatePhone}
              />

              <select
                name="className"
                value={form.className}
                onChange={updateField}
                required
                className="input-field"
              >
                <option value="">Select Class</option>
                <option>Pre-Primary</option>
                <option>Primary</option>
                <option>Middle</option>
                <option>Secondary</option>
                <option>Senior Secondary</option>
              </select>

              <textarea
                name="message"
                value={form.message}
                onChange={updateField}
                rows="5"
                maxLength={MESSAGE_LIMIT}
                placeholder="Your Message"
                className="input-field resize-none overflow-hidden"
              />

              <p
                className={`text-sm ${
                  remaining <= 20 ? "text-red-500" : "text-gray-500"
                }`}
              >
                {remaining} characters remaining
              </p>

              <p
                className={`min-h-5 text-sm text-red-500 ${
                  remaining <= 20 ? "" : "invisible"
                }`}
              >
                Warning: message limit is almost reached.
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="primary-btn flex w-full items-center justify-center border bg-primary text-white ease-out hover:-translate-y-1 hover:bg-white hover:text-primary hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Enquiry"}{" "}
                {!submitting && (
                  <span className="transition-all duration-300 ease-in-out hover:translate-x-2">
                    <Send className="h-4 w-4" />
                  </span>
                )}
              </button>

              {submitted && (
                <p className="rounded-lg bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                  Thank you! Your enquiry has been received. We will get back to
                  you soon.
                </p>
              )}

              {submitError && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {submitError}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="mt-14">
        <iframe
          title="School location map"
              src="https://www.google.com/maps?q=School%20Road%20Chota%20Gamharia%20Jamshedpur&output=embed"
          width="100%"
          height="420"
          className="border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
function TextField({ name, placeholder, type = "text", value, onChange }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="input-field"
    />
  );
}

function ColumnTitle({ icon, title }) {
  return (
    <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-primary after:h-px after:flex-1 after:bg-slate-200">
      {icon}
      {title}
    </h3>
  );
}
