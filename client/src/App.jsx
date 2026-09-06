import { Navigate, Route, Routes } from "react-router-dom";
import { cloneElement, isValidElement, useEffect, useState } from "react";
import Layout from "./components/Layout.jsx";
import { dashboardFor, getCurrentAdmin } from "./data/adminAuth.js";
import AboutPage from "./pages/AboutPage.jsx";
import AcademicProgramsPage from "./pages/AcademicProgramsPage.jsx";
import AcademicsPage from "./pages/AcademicsPage.jsx";
import AdmissionsPage from "./pages/AdmissionsPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import ClubsSocietiesPage from "./pages/ClubsSocietiesPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import DeveloperDashboard from "./pages/DeveloperDashboard.jsx";
import EventsGalleryPage from "./pages/EventsGalleryPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import FacilitiesPage from "./pages/FacilitiesPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import Home from "./pages/Home.jsx";
import LeadershipPage from "./pages/LeadershipPage.jsx";
import NoticesPage from "./pages/NoticesPage.jsx";
import PlaceholderPage from "./pages/PlaceholderPage.jsx";
import SportsActivitiesPage from "./pages/SportsActivitiesPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/developer/login" element={<Navigate to="/admin/login" replace />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedDashboardRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedDashboardRoute>
        }
      />
      <Route
        path="/developer/dashboard"
        element={
          <ProtectedDashboardRoute roles={["developer"]}>
            <DeveloperDashboard />
          </ProtectedDashboardRoute>
        }
      />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/developer" element={<Navigate to="/developer/dashboard" replace />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/academics" element={<AcademicsPage />} />
        <Route path="/academic-programs" element={<AcademicProgramsPage />} />
        <Route path="/clubs-societies" element={<ClubsSocietiesPage />} />
        <Route path="/sports-activities" element={<SportsActivitiesPage />} />
        <Route path="/events-gallery" element={<EventsGalleryPage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/leadership" element={<LeadershipPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="*" element={<PlaceholderPage />} />
      </Route>
    </Routes>
  );
}

function ProtectedDashboardRoute({ roles, children }) {
  const [user, setUser] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    getCurrentAdmin()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setDone(true));
  }, []);

  if (!done) return null;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to={dashboardFor(user)} replace />;

  return isValidElement(children) ? cloneElement(children, { currentAdmin: user }) : children;
}