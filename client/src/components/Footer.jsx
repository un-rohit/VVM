import { ArrowUp, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { footerGroups, footerInfo, schoolInfo } from "../data/siteData.js";

const socialLinks = [
  {
    label: "Facebook",
    href: schoolInfo.facebookUrl,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Directions (Mappls)",
    href: schoolInfo.mapplsUrl,
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    label: "Justdial Profile",
    href: schoolInfo.justdialUrl,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="bg-[#014E4E] text-white">
      {/* Main grid */}
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Col 1 – Brand */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold leading-snug text-white" style={{ fontFamily: "var(--font-heading)" }}>{footerInfo.name}</h3>

          <p className="mt-4 text-sm leading-7 text-white/65" style={{ fontFamily: "var(--font-body)" }}>
            {footerInfo.about}
          </p>

          {/* Social icons */}
          <div className="mt-6 flex items-center justify-center gap-3 sm:justify-start">
            {socialLinks.map(({ label, icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition-all duration-200 hover:border-[#F7CB1F] hover:bg-[#F7CB1F] hover:text-[#014E4E]"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Cols 2 & 3 – Link groups */}
        {footerGroups.map(([title, links]) => (
          <div key={title} className="text-center sm:text-left">
            <FooterHeading>{title}</FooterHeading>
            <ul className="mt-5 space-y-3 text-sm text-white/70" style={{ fontFamily: "var(--font-body)" }}>
              {links.map(([label, path]) => (
                <li key={label}>
                  <a href={path} className="transition-colors duration-200 hover:text-[#F7CB1F]">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Col 4 – Contact */}
        <div className="text-center sm:text-left">
          <FooterHeading>Contact & Visit</FooterHeading>
          <ul className="mt-5 space-y-3.5 text-sm text-white/70" style={{ fontFamily: "var(--font-body)" }}>
            <ContactRow icon={<MapPin className="h-4 w-4 shrink-0 text-[#F7CB1F]" />}>
              <span>{footerInfo.address}</span>
            </ContactRow>
            <ContactRow icon={<MapPin className="h-4 w-4 shrink-0 text-[#F7CB1F]" />}>
              <a href={schoolInfo.mapplsUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#F7CB1F]">
                Open directions on Mappls (Pin: f7773d)
              </a>
            </ContactRow>
            <ContactRow icon={<span className="text-[#F7CB1F] font-bold">★</span>}>
              <a href={schoolInfo.justdialUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#F7CB1F]">
                Justdial Rating: 4.6 / 5 (20+ reviews)
              </a>
            </ContactRow>
            <li className="pt-1 text-xs text-white/50">
              Hours: Mon – Sat, 9:00 AM – 5:00 PM
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="container-page flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-center text-sm text-white/45" style={{ fontFamily: "var(--font-body)" }}>
            &copy; {new Date().getFullYear()} {footerInfo.name}. All Rights Reserved.
          </p>
          <p className="text-center text-xs text-white/30" style={{ fontFamily: "var(--font-body)" }}>
            Designed with care for Vani Vidya Mandir School, Gamharia
          </p>
        </div>
      </div>

      {/* Back to top */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 grid h-11 w-11 place-items-center rounded-full bg-[#014E4E] text-white shadow-elevated transition-all duration-300 hover:bg-[#174C43] hover:-translate-y-0.5 lg:bottom-8 lg:right-8 ${
          showTop ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}

function FooterHeading({ children }) {
  return (
    <h4 className="relative inline-block pb-3 text-base font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
      {children}
      <span className="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#F7CB1F] sm:left-0 sm:translate-x-0" />
    </h4>
  );
}

function ContactRow({ icon, children }) {
  return (
    <li className="flex items-start justify-center gap-3 sm:justify-start">
      <span className="mt-0.5">{icon}</span>
      <span className="text-left">{children}</span>
    </li>
  );
}
