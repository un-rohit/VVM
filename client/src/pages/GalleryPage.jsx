import { ImageIcon, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../components/SectionHeader.jsx";
import { galleryImages } from "../data/siteData.js";

const categories = ["All", "Campus", "Events", "Sports", "Classroom", "Activities"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const photos = useMemo(
    () =>
      activeCategory === "All"
        ? galleryImages
        : galleryImages.filter(([, , category]) => category === activeCategory),
    [activeCategory],
  );

  return (
    <>
      <Helmet>
        <title>Photo Gallery | Vani Vidya Mandir School, Gamharia</title>
        <meta name="description" content="Explore the photo gallery of Vani Vidya Mandir School, Gamharia — campus life, sports, events, classrooms, and student activities." />
        <meta name="keywords" content="school gallery Gamharia, Vani Vidya Mandir photos, school campus images, student activities Jamshedpur" />
        <link rel="canonical" href="https://devbhoomischool.vercel.app/gallery" />
        <meta property="og:title" content="Photo Gallery | Vani Vidya Mandir School, Gamharia" />
        <meta property="og:description" content="A glimpse into daily school life — classrooms, sports, events, and the vibrant Vani Vidya Mandir campus." />
        <meta property="og:url" content="https://devbhoomischool.vercel.app/gallery" />
      </Helmet>

      {/* Page Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(247,203,31,0.18),transparent_40%)]" />
        <div className="container-page relative">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-white">Gallery</span>
          </nav>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#F7CB1F] md:text-sm">
              Campus Life & Events
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              School Gallery
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              A glimpse into daily school life — classrooms, sports, events, and the vibrant Vani Vidya Mandir campus.
            </p>
          </div>
        </div>
      </div>

      <section className="bg-paper section-pad">
        <div className="container-page">
          <SectionHeader
            title="Photo Gallery"
            subtitle="Campus life, events, sports, classrooms, and student activities"
            icon={<ImageIcon className="h-6 w-6" />}
          />

          <div className="mb-9 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-5 py-2 text-sm font-bold transition ${
                  activeCategory === category
                    ? "border-[#014E4E] bg-[#014E4E] text-white shadow-[0_12px_26px_rgba(1,78,78,0.18)]"
                    : "border-[#014E4E]/15 bg-white text-[#014E4E] hover:border-[#014E4E] hover:bg-[#014E4E] hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
            {photos.map(([image, , category, title], index) => (
              <figure
                key={`${image}-${index}`}
                className="group mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-[#014E4E]/10 bg-white shadow-[0_14px_40px_rgba(15,77,67,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(15,77,67,0.16)]"
              >
                <div className="relative overflow-hidden">
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
                </div>
                <figcaption className="p-5">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#d79a21]">
                    {category}
                  </span>
                  <p className="mt-2 text-base font-bold leading-6 text-[#014E4E]">{title}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          {photos.length === 0 && (
            <p className="rounded-lg border border-dashed border-slate-200 bg-white p-10 text-center font-body text-sm text-muted">
              No photos in this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}