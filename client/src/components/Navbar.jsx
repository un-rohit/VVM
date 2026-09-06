import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems, quickActions, schoolInfo } from "../data/siteData.js";
import logo from "../../assets/gallery/logo.png";

function PlainLink({ item, className = "", onClick }) {
  const [label, href, external] = item;
  const isExternal = external === true || (href && (href.startsWith("http") || href.startsWith("mailto")));

  if (isExternal) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer" onClick={onClick}>
        {label}
      </a>
    );
  }

  return (
    <Link className={className} to={href} onClick={onClick}>
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location.pathname]);

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenMenu(null);
  };

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : "shadow-sm"}`}>
        {/* Mobile Header */}
        <div className="flex min-h-[68px] items-center justify-between bg-[#014E4E] px-4 lg:hidden">
          <Link to="/" onClick={closeMobile} aria-label="Home" className="flex rounded-xl bg-white px-3 py-2 shadow-md">
            <img className="h-12 w-auto object-contain sm:h-14" src={logo} alt={schoolInfo.name} />
          </Link>

          <div className="flex items-center gap-2">
            <a
              href={schoolInfo.mapplsUrl}
              aria-label="Open directions"
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <MapPin className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
              className="grid h-10 w-10 place-items-center rounded-md text-white transition-all duration-300 hover:bg-white/10"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-white">
          <div className="container-page">
            <div className="flex items-stretch gap-0 py-3">
              <Link to="/" className="ml-4 flex shrink-0 items-center pr-2 xl:ml-0 xl:pr-6 2xl:pr-8" aria-label="Home" onClick={closeMobile}>
                <img className="h-24 w-auto transition-all duration-300 xl:h-28 2xl:h-32" src={logo} alt={schoolInfo.name} />
              </Link>

              <div className="flex flex-1 flex-col justify-between pl-2 xl:pl-5 2xl:pl-8">
                <div className="flex items-center justify-end gap-5 py-1 xl:gap-8 xl:py-2 2xl:gap-10">
                  <ContactItem icon={<MapPin className="h-5 w-5 xl:h-6 xl:w-6" />} title="LOCATION">
                    <a href={schoolInfo.mapplsUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                      Open directions on Mappls
                    </a>
                  </ContactItem>

                  <ContactItem icon={<MapPin className="h-5 w-5 xl:h-6 xl:w-6" />} title="ADDRESS">
                    <span className="block">{schoolInfo.address}</span>
                  </ContactItem>

                  <ContactItem icon={<Mail className="h-5 w-5 xl:h-6 xl:w-6" />} title="UPDATES">
                    <a href={schoolInfo.facebookUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                      Follow the school on Facebook
                    </a>
                  </ContactItem>
                </div>

                <div className="flex h-8 items-center gap-1 overflow-hidden rounded-tl-full bg-[#F4C400] pl-5 xl:h-10 xl:pl-7">
                  {quickActions.map((action, i) => {
                    const [label, href, external] = action;
                    return (
                      <a
                        key={label}
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                        className={`flex h-full items-center px-3 py-1 text-[13px] font-semibold text-[#014E4E] transition-colors hover:bg-[#e6b800] xl:px-4 xl:text-[15px] 2xl:px-5 2xl:text-[16px] ${i < quickActions.length - 1 ? "border-r border-[#c9a800]/60" : ""}`}
                      >
                        {label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <nav className="-mt-3 border-t border-slate-100 bg-primary text-white">
            <div className="container-page">
              <ul className="flex min-h-12 items-center justify-center gap-0 xl:min-h-14 xl:gap-0.5">
                {navItems.map((nav, index) => (
                  <li key={nav.label} className="group relative">
                    {nav.items ? (
                      <>
                        <button
                          type="button"
                          className="flex min-h-12 items-center gap-1 whitespace-nowrap px-1 text-[10.5px] font-semibold uppercase tracking-normal transition-colors hover:bg-white/10 hover:text-amber-100 xl:min-h-14 xl:gap-1.5 xl:px-2 xl:text-[12.5px] xl:tracking-[0.4px] 2xl:px-3 2xl:text-[14px]"
                        >
                          {nav.label}
                          <ChevronDown className="h-3 w-3 xl:h-3.5 xl:w-3.5" />
                        </button>

                        <div
                          className={`invisible absolute top-full z-50 w-72 translate-y-2 rounded-xl bg-white p-2 text-ink opacity-0 shadow-elevated transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
                            index >= navItems.length - 2 ? "right-0" : "left-0"
                          }`}
                        >
                          {nav.items.map((item) => (
                            <PlainLink
                              key={item[0]}
                              item={item}
                              className="block rounded-lg px-4 py-2.5 text-[13.5px] font-medium transition-colors hover:bg-mist hover:text-primary"
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        to={nav.path}
                        className="flex min-h-12 items-center whitespace-nowrap px-1 text-[10.5px] font-semibold uppercase tracking-normal transition-colors hover:bg-white/10 hover:text-amber-100 xl:min-h-14 xl:px-2 xl:text-[12.5px] xl:tracking-[0.4px] 2xl:px-3 2xl:text-[14px]"
                      >
                        {nav.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full z-50 max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-slate-200 bg-white shadow-elevated lg:hidden"
            >
              <div className="px-4 py-3">
                {/* Mobile contact strip */}
                <div className="mb-3 flex items-center justify-around rounded-xl bg-[#014E4E]/5 py-3">
                  <a href={schoolInfo.mapplsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-semibold text-primary">
                    <MapPin className="h-3.5 w-3.5" /> Directions
                  </a>
                  <a href={schoolInfo.facebookUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-semibold text-primary">
                    <Mail className="h-3.5 w-3.5" /> Facebook
                  </a>
                </div>

                <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200">
                  {navItems.map((nav, index) => (
                    <li key={nav.label}>
                      {nav.items ? (
                        <>
                          <button
                            type="button"
                            className="flex w-full items-center justify-between px-4 py-3.5 text-left text-[14px] font-semibold text-primary"
                            onClick={() => setOpenMenu(openMenu === index ? null : index)}
                          >
                            {nav.label}
                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openMenu === index ? "rotate-180" : ""}`} />
                          </button>

                          <AnimatePresence initial={false}>
                            {openMenu === index && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-mist/40"
                              >
                                <div className="grid gap-0.5 p-2">
                                  {nav.items.map((item) => (
                                    <PlainLink
                                      key={item[0]}
                                      item={item}
                                      onClick={closeMobile}
                                      className="rounded-lg px-3 py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-white hover:text-primary"
                                    />
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          to={nav.path}
                          onClick={closeMobile}
                          className="block px-4 py-3.5 text-[14px] font-semibold text-primary"
                        >
                          {nav.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

function ContactItem({ icon, title, children }) {
  return (
    <div className="flex min-w-0 items-center gap-3 xl:gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#014E4E] text-white xl:h-12 xl:w-12">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[12px] font-bold uppercase tracking-[0.5px] text-[#014E4E] xl:text-[13px]">
          {title}
        </span>
        <span className="block text-[13px] leading-[1.35] text-slate-700 xl:text-[14px]" style={{ fontFamily: "var(--font-body)" }}>
          {children}
        </span>
      </span>
    </div>
  );
}
