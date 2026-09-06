import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import FloatingSocialBar from "./FloatingSocialBar.jsx";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 page-enter">
        <Outlet />
      </main>
      <Footer />
      <FloatingSocialBar />
    </div>
  );
}
