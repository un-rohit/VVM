import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../components/SectionHeader.jsx";
import { galleryImages, upcomingEvents as staticEvents } from "../data/siteData.js";

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

const eventPhotos = galleryImages.filter(
  ([, , category]) => category === "Events",
);

export default function EventsGalleryPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const move = (direction) => {
    setActiveIndex(
      (current) =>
        (current + direction + eventPhotos.length) % eventPhotos.length,
    );
  };

  const activeImage =
    activeIndex === null ? null : eventPhotos[activeIndex]?.[0];

  return (
    <>
      <Helmet>
        <title>Events Gallery | Vani Vidya Mandir School, Gamharia</title>
        <meta
          name="description"
          content="Browse the events gallery of Vani Vidya Mandir School, Gamharia — cultural programs, annual functions, celebrations, and student activities."
        />
        <meta
          name="keywords"
          content="school events gallery Gamharia, Vani Vidya Mandir events, school function photos, cultural events Jamshedpur"
        />
        <link rel="canonical" href="https://devbhoomischool.vercel.app/events-gallery" />
        <meta property="og:title" content="Events Gallery | Vani Vidya Mandir School, Gamharia" />
        <meta
          property="og:description"
          content="Photos from school events — annual functions, celebrations, competitions, and special days at Vani Vidya Mandir School."
        />
        <meta property="og:url" content="https://devbhoomischool.vercel.app/events-gallery" />
      </Helmet>

      <div className="page-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(247,203,31,0.18),transparent_40%)]" />
        <div className="container-page relative">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <Link to="/events" className="hover:text-white transition">
              Events
            </Link>
            <span>/</span>
            <span className="text-white">Events Gallery</span>
          </nav>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#F7CB1F] md:text-sm">
              Moments That Matter
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              Events Gallery
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              A visual journey through school events — annual functions, cultural
              celebrations, competitions, and special days that make school life
              memorable.
            </p>
          </div>
        </div>
      </div>

      <section className="section-pad bg-paper">
        <div className="container-page">
          <SectionHeader
            title="Event Photographs"
            subtitle="Capturing the spirit of celebrations, competitions, and community at Vani Vidya Mandir School."
            icon={<ImageIcon className="h-6 w-6" />}
          />

          {eventPhotos.length > 0 ? (
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
              {eventPhotos.map(([image, , category, title], index) => (
                <figure
                  key={`${image}-${index}`}
                  className="group mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-[#014E4E]/10 bg-white shadow-[0_14px_40px_rgba(15,77,67,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(15,77,67,0.16)]"
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="relative block w-full overflow-hidden text-left"
                  >
                    <img
                      src={image}
                      alt={title}
                      className="w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#012f2f]/80 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                    <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#014E4E] opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
                      <Search className="h-5 w-5" />
                    </span>
                  </button>
                  <figcaption className="p-5">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#d79a21]">
                      {category}
                    </span>
                    <p className="mt-2 text-base font-bold leading-6 text-[#014E4E]">
                      {title}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-slate-200 bg-white p-10 text-center font-body text-sm text-muted">
              Event photos will be added soon. Check back later.
            </p>
          )}
        </div>
      </section>

      <section className="section-pad bg-[#f4f2ed]">
        <div className="container-page">
          <SectionHeader
            title="Upcoming Events"
            subtitle="Mark your calendar for the upcoming school events and activities."
            icon={<Calendar className="h-6 w-6" />}
          />
          <div className="mx-auto grid max-w-4xl gap-4">
            {staticEvents.map(([day, month, title, venue]) => (
              <SectionMotion key={`${day}-${month}-${title}`}>
                <article className="card-surface flex items-center gap-6 p-5 sm:p-7">
                  <div className="flex shrink-0 flex-col items-center justify-center rounded-xl bg-primary px-4 py-3 text-white">
                    <span className="text-3xl font-bold leading-none">
                      {day}
                    </span>
                    <span className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/75">
                      {month}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-bold text-primary">
                      {title}
                    </h3>
                    <p className="mt-1 flex items-center gap-2 font-body text-sm text-muted">
                      <Calendar className="h-4 w-4 shrink-0" />
                      {venue}
                    </p>
                  </div>
                </article>
              </SectionMotion>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/events" className="primary-btn inline-flex items-center gap-2">
              View All Events & News
            </Link>
          </div>
        </div>
      </section>

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
              alt="Selected event photo"
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
              {activeIndex + 1} / {eventPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
