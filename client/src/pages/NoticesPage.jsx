import { Calendar, FileText, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PdfModal from "../components/PdfModal.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { directPdfUrl, getPublicSchool } from "../services/contentApi.js";


const isPdfUrl = (url) => typeof url === "string" && url.trim().length > 0;
const isPdfData = (data) =>
  typeof data === "string" && data.startsWith("data:application/pdf");
const hasPdf = (notice) => isPdfUrl(notice.pdfUrl) || isPdfData(notice.pdfData);

export default function NoticesPage() {
  const [schoolName, setSchoolName] = useState("");
  const [notices, setNotices] = useState([]);
  const [activePdf, setActivePdf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    getPublicSchool()
      .then((school) => {
        setSchoolName(school.school?.name || "");
        setNotices(school.notices || []);
      })
      .catch((err) => setError(err.response?.data?.message || "Could not load notices."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Notice Board | Vani Vidya Mandir School, Gamharia</title>
        <meta name="description" content="Stay informed with the latest notices, circulars, and school announcements from Vani Vidya Mandir School, Gamharia." />
        <meta name="keywords" content="school notices Gamharia, circulars, school announcements, Vani Vidya Mandir notice board, school updates" />
        <link rel="canonical" href="https://devbhoomischool.vercel.app/notices" />
        <meta property="og:title" content="Notice Board | Vani Vidya Mandir School, Gamharia" />
        <meta property="og:description" content="Latest notices, circulars, and announcements from Vani Vidya Mandir School." />
        <meta property="og:url" content="https://devbhoomischool.vercel.app/notices" />
      </Helmet>

      {/* Page Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(247,203,31,0.18),transparent_40%)]" />
        <div className="container-page relative">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-white">Notice Board</span>
          </nav>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#F7CB1F] md:text-sm">
              School Announcements
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              Notice Board
            </h1>
            <p className="mt-5 text-base leading-7 text-white/80 md:text-lg">
              Stay informed with the latest notices, announcements, and circulars from Vani Vidya Mandir School.
            </p>
          </div>
        </div>
      </div>

      <section className="section-pad bg-paper">
      <div className="container-page">
        <SectionHeader
          title={schoolName ? `${schoolName} Notices` : "School Notices"}
          subtitle="Complete list of school notices and announcements"
          icon={
            <span className="group grid h-12 w-12 place-items-center rounded-full bg-white shadow-md ring-1 ring-[#014E4E]/10 transition-all duration-300 hover:scale-110 hover:bg-[#014E4E]">
              <FileText className="h-6 w-6 text-[#014E4E] transition-all duration-300 group-hover:text-white" />
            </span>
          }
        />

        {error && (
          <p className="mb-5 rounded-lg border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
          </p>
        )}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {notices.map((notice) => (
            <article key={notice._id || notice.id || notice.title} className="card-surface flex h-full flex-col p-4 sm:p-6">
              <span className="mb-3 grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-accent sm:mb-5 sm:h-11 sm:w-11">
                <Calendar />
              </span>
              <h3 className="text-base font-semibold text-primary sm:text-lg">{notice.title}</h3>
              {notice.date && <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-accent">{String(notice.date).slice(0, 10)}</p>}
              {notice.text && (
                <p className="mt-2 flex-1 font-body text-sm leading-6 text-muted sm:mt-3 sm:leading-7">
                  {notice.text}
                </p>
              )}
              {hasPdf(notice) && (
                <button
                  type="button"
                  onClick={() => setActivePdf({
                    title: notice.title,
                    file: { name: notice.pdfName, url: directPdfUrl(notice), data: notice.pdfData },
                  })}
                  className="secondary-btn mt-4 w-fit sm:mt-5"
                >
                  Read More <MoveRight className="h-4 w-4" />
                </button>
              )}
            </article>
          ))}
        </div>

        {!loading && !notices.length && !error && (
          <p className="rounded-lg border border-dashed border-slate-200 bg-white p-10 text-center font-body text-sm text-muted">
            No notices published yet.
          </p>
        )}
        {loading && (
          <p className="rounded-lg border border-dashed border-slate-200 bg-white p-10 text-center font-body text-sm text-muted">
            Loading notices...
          </p>
        )}
      </div>
      <PdfModal
        title={activePdf?.title}
        file={activePdf?.file}
        onClose={() => setActivePdf(null)}
      />
    </section>
    </>
  );
}