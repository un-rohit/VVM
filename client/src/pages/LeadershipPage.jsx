import { ArrowLeft, Quote, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../components/SectionHeader.jsx";
import { leaders } from "../data/siteData.js";

export default function LeadershipPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.slice(1);

    window.setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, [hash]);

  return (
    <section className="bg-[#f4f2ed]">
      <Helmet>
        <title>Leadership | Vani Vidya Mandir School, Gamharia</title>
        <meta name="description" content="Read messages from the Chairman and Principal of Vani Vidya Mandir School, Gamharia — their vision for student growth, discipline, values, and academic excellence." />
        <meta name="keywords" content="school leadership Gamharia, chairman message, principal message, Vani Vidya Mandir management, school vision" />
        <link rel="canonical" href="https://vanividyamandir.vercel.app/leadership" />
        <meta property="og:title" content="Leadership Messages | Vani Vidya Mandir School, Gamharia" />
        <meta property="og:description" content="Messages from our Chairman and Principal on education, values, and the school's academic vision." />
        <meta property="og:url" content="https://vanividyamandir.vercel.app/leadership" />
      </Helmet>

      <div className="relative overflow-hidden bg-[#014E4E] py-14 text-white md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(247,203,31,0.22),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.10),transparent_42%)]" />

        <div className="container-page relative">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85 backdrop-blur transition hover:border-[#F7CB1F]/60 hover:text-[#F7CB1F]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#F7CB1F] md:text-sm">
              From the Leadership Desk
            </p>

            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl">
              Words that guide our school community forward.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              Read the messages from our leadership team on student growth,
              discipline, values, and the school’s academic vision.
            </p>
          </div>
        </div>
      </div>

      <div className="container-page py-14 md:py-20">
        <SectionHeader
          title="Leadership Messages"
          subtitle="Guiding words from our School Management and Headmaster"
          icon={<ShieldCheck className="h-6 w-6" />}
        />

        <div className="mx-auto max-w-5xl space-y-12">
          {leaders.map((leader) => (
            <article
              id={leader.id}
              key={leader.id}
              className="scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-[#014E4E]/10 bg-white shadow-[0_24px_70px_rgba(15,77,67,0.12)]"
            >
              <div className="grid lg:grid-cols-[280px_minmax(0,1fr)]">
                <aside className="relative bg-[#014E4E] p-7 text-white">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(247,203,31,0.18),transparent_45%)]" />

                  <div className="relative">
                    <div className="mx-auto h-44 w-44 overflow-hidden rounded-full border-4 border-white/20 bg-white/10 shadow-xl">
                      <img
                        src={leader.image}
                        alt={`${leader.name}, ${leader.role}`}
                        className="h-full w-full object-cover object-top"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="mt-6 text-center">
                      <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#F7CB1F]">
                        {leader.role}
                      </p>

                      <h2 className="mt-2 text-2xl font-bold leading-tight text-white">
                        {leader.name}
                      </h2>
                    </div>

                    <div className="mx-auto mt-7 h-px w-20 bg-[#F7CB1F]/70" />

                    <p className="mt-7 text-center text-sm leading-6 text-white/75">
                      Vani Vidya Mandir School believes that leadership begins
                      with responsibility, trust, and student-first decisions.
                    </p>
                  </div>
                </aside>

                <div className="relative p-7 sm:p-9 lg:p-12">
                  <Quote className="absolute right-8 top-8 h-16 w-16 text-[#014E4E]/5" />

                  <p className="max-w-3xl text-2xl font-bold leading-9 text-[#014E4E]">
                    {leader.quote}
                  </p>

                  <p className="mt-7 text-lg font-semibold text-[#174C43]">
                    {leader.greeting}
                  </p>

                  <div className="mt-5 max-w-3xl space-y-5 text-[15.5px] leading-8 text-slate-600">
                    {(
                      leader.fullMessage || [leader.message, leader.followUp]
                    ).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-9 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#014E4E]">
                        {leader.name}
                      </p>
                      <p className="text-sm text-slate-500">{leader.role}</p>
                    </div>

                    <div className="rounded-full bg-[#f7fbfa] px-5 py-2 text-sm font-semibold text-[#014E4E] ring-1 ring-[#014E4E]/10">
                      Knowledge • Character • Excellence
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
