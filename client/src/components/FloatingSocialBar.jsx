"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/* Icons — thin, monochrome/teal line icons (no brand colors)                 */
/* -------------------------------------------------------------------------- */

function IconInstagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[18px] w-[18px] shrink-0"
      aria-hidden="true"
    >
      <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-3.25a1.17 1.17 0 1 1 0 2.34 1.17 1.17 0 0 1 0-2.34Z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[18px] w-[18px] shrink-0"
      aria-hidden="true"
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.435H7.078v-3.492h3.047V9.413c0-3.026 1.792-4.698 4.533-4.698 1.312 0 2.686.236 2.686.236v2.974h-1.513c-1.49 0-1.956.932-1.956 1.888v2.26h3.328l-.532 3.492h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[18px] w-[18px] shrink-0"
      aria-hidden="true"
    >
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.9 24 12 24 12s0-3.9-.5-5.8ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </svg>
  );
}
function IconWhatsApp() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[18px] w-[18px] shrink-0"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26C2.168 6.442 6.603 2.009 12.055 2.009c2.64 0 5.122 1.03 6.988 2.896a9.825 9.825 0 0 1 2.893 6.993c-.003 5.45-4.437 9.884-9.885 9.884Zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.479-8.413Z" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[18px] w-[18px] shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h2.79c.81 0 1.53.518 1.786 1.287l1.19 3.57a1.875 1.875 0 0 1-.47 1.943l-1.15 1.15a12.035 12.035 0 0 0 5.53 5.53l1.15-1.15a1.875 1.875 0 0 1 1.943-.47l3.57 1.19A1.875 1.875 0 0 1 21 17.835v2.79A1.875 1.875 0 0 1 19.125 22.5h-.75C9.055 22.5 1.5 14.945 1.5 5.625v-.75Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="6" r="2.2" />
      <circle cx="19" cy="6" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />

      <path d="m9.6 10.2-3-2.6.9-1 3 2.6-.9 1Zm4.8 0-.9-1 3-2.6.9 1-3 2.6ZM7.5 17.4l-.9-1 3-2.6.9 1-3 2.6Zm9 0-3-2.6.9-1 3 2.6-.9 1Z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */

import { schoolInfo } from "../data/siteData.js";

function IconMapPin() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[18px] w-[18px] shrink-0"
      aria-hidden="true"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[18px] w-[18px] shrink-0"
      aria-hidden="true"
    >
      <path d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

const socials = [
  {
    id: "facebook",
    Icon: IconFacebook,
    label: "Official Facebook Page",
    href: schoolInfo.facebookUrl,
  },
  {
    id: "mappls",
    Icon: IconMapPin,
    label: "Mappls Directions (Pin: f7773d)",
    href: schoolInfo.mapplsUrl,
  },
  {
    id: "justdial",
    Icon: IconStar,
    label: "Justdial 4.6★ Profile",
    href: schoolInfo.justdialUrl,
  },
];

export default function FloatingSocialBar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const radius = 85;
  const startAngle = -68;
  const endAngle = 68;
  const angleStep =
    socials.length > 1 ? (endAngle - startAngle) / (socials.length - 1) : 0;

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const closeOnOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("touchstart", closeOnOutsideClick);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("touchstart", closeOnOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      {/* Faint tap-catcher for outside-click on mobile — no visible darkening */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div
        ref={containerRef}
        className="fixed right-1 top-1/2 z-50 h-[52px] w-[52px] -translate-y-1/2 lg:hidden"
      >
        {/* Radial social buttons — no backing panel, each button is self-contained glass */}
        <div id="floating-social-menu" role="menu" aria-hidden={!isOpen}>
          <AnimatePresence>
            {isOpen &&
              socials.map(({ id, Icon, label, href }, index) => {
                const angle = startAngle + index * angleStep;
                const radians = (angle * Math.PI) / 180;
                const x = -Math.cos(radians) * radius;
                const y = Math.sin(radians) * radius;
                const isExternal = href.startsWith("http");

                return (
                  <motion.a
                    key={id}
                    role="menuitem"
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    title={label}
                    onClick={() => setIsOpen(false)}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0.7 }}
                    animate={{ x, y, opacity: 1, scale: 1 }}
                    exit={{ x: 0, y: 0, opacity: 0, scale: 0.7 }}
                    transition={{
                      delay: index * 0.035,
                      type: "spring",
                      stiffness: 300,
                      damping: 26,
                      mass: 0.7,
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="
                      group
                      absolute left-[4px] top-[4px]
                      flex h-11 w-11
                      items-center justify-center
                      rounded-full
                      border border-white/50
                      bg-white/70
                      text-[#014E4E]
                      shadow-[0_8px_20px_rgba(1,78,78,0.18)]
                      backdrop-blur-md
                      transition-all duration-200
                      hover:border-[#F7CB1F]/50
                      hover:bg-white/85
                      hover:shadow-[0_10px_24px_rgba(1,78,78,0.22)]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#014E4E]/30
                      focus-visible:ring-offset-2
                    "
                  >
                    <span className="transition-transform duration-200 group-hover:scale-105">
                      <Icon />
                    </span>
                    <span className="sr-only">{label}</span>
                  </motion.a>
                );
              })}
          </AnimatePresence>
        </div>

        {/* Main toggle button */}
        <motion.button
          type="button"
          aria-label={isOpen ? "Close social menu" : "Open social menu"}
          aria-expanded={isOpen}
          aria-controls="floating-social-menu"
          onClick={() => setIsOpen((previous) => !previous)}
          whileTap={{ scale: 0.93 }}
          className={`
            relative z-20
            flex h-[52px] w-[52px]
            items-center justify-center
            rounded-full
            border
            backdrop-blur-xl
            outline-none
            transition-colors duration-300
            focus-visible:ring-2
            focus-visible:ring-[#014E4E]/30
            focus-visible:ring-offset-2
            ${
              isOpen
                ? "border-[#F7CB1F]/50 bg-[#014E4E] text-white shadow-[0_6px_20px_rgba(1,78,78,0.28)]"
                : "border-white/70 bg-white/90 text-[#014E4E] shadow-[0_6px_20px_rgba(1,78,78,0.14)]"
            }
          `}
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="relative flex items-center justify-center"
          >
            <ShareIcon />
            {!isOpen && (
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#F7CB1F]" />
            )}
          </motion.span>
        </motion.button>
      </div>
    </>
  );
}
