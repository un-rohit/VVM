import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function PlaceholderPage() {
  const location = useLocation();
  const label = location.pathname
    .replace(/^\//, "")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return (
    <>
      <Helmet>
        <title>Page Not Found | Vani Vidya Mandir School, Gamharia</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="page-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(247,203,31,0.18),transparent_40%)]" />
        <div className="container-page relative">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#F7CB1F] md:text-sm">
              Error 404
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              Page Not Found
            </h1>
          </div>
        </div>
      </div>

      <section className="section-pad bg-paper">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-xl text-center"
          >
            <div className="mx-auto mb-8 grid h-24 w-24 place-items-center rounded-full bg-primary/10 text-primary">
              <Search className="h-10 w-10" />
            </div>

            <h2 className="text-2xl font-bold text-primary md:text-3xl">
              {label ? `"${label}" could not be found` : "This page doesn't exist"}
            </h2>

            <p className="mt-4 text-base leading-7 text-muted" style={{ fontFamily: "var(--font-body)" }}>
              The page you are looking for might have been moved, renamed, or is temporarily unavailable.
              Please check the URL or navigate back to our homepage.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/" className="primary-btn">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
              <Link to="/contact" className="secondary-btn">
                Contact Us
              </Link>
            </div>

            <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6 shadow-card">
              <p className="text-sm font-semibold text-primary">Quick Links</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {[
                  ["About Us", "/about"],
                  ["Admissions", "/admissions"],
                  ["Academics", "/academics"],
                  ["Contact", "/contact"],
                  ["Gallery", "/gallery"],
                  ["Notices", "/notices"],
                ].map(([label, path]) => (
                  <Link
                    key={path}
                    to={path}
                    className="rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
