import {
  CalendarDays,
  Edit,
  FileText,
  GraduationCap,
  ImageIcon,
  LogOut,
  Mail,
  MessageSquare,
  Newspaper,
  Plus,
  Save,
  Search,
  Star,
  Trash2,
  X,
  School,
  Menu,
  User,
  LayoutDashboard,
  ChevronRight,
  Clock,
  CheckCircle,
  Phone,
  Eye,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PdfModal from "../components/PdfModal.jsx";
import { logoutAdmin } from "../data/adminAuth.js";
import {
  createEvent,
  createNews,
  createNotice,
  createTopper,
  deleteEvent as deleteEventRecord,
  deleteNews,
  deleteNotice,
  deleteTopper,
  getAllEvents,
  getAllNews,
  getAllNotices,
  getAllToppers,
  directPdfUrl,
  toggleNoticeStar as apiToggleNoticeStar,
  updateEvent,
  updateNews,
  updateNotice,
  updateTopper,
  getAllEnquiries,
  deleteEnquiry as apiDeleteEnquiry,
  markEnquiryRead,
} from "../services/contentApi.js";

const adminSections = [
  { id: "notices", label: "Notices", desc: "School announcements & PDFs" },
  {
    id: "newsEvents",
    label: "Latest News & Events",
    desc: "Media coverage & campus updates",
  },
  {
    id: "upcomingEvents",
    label: "Upcoming Events",
    desc: "Schedules & calendar activities",
  },
  { id: "toppers", label: "Toppers", desc: "High performing student ranks" },
  { id: "enquiries", label: "Enquiries", desc: "Admission enquiries from parents" },
];

const sectionIcons = {
  notices: Newspaper,
  newsEvents: Newspaper,
  upcomingEvents: CalendarDays,
  toppers: GraduationCap,
  enquiries: MessageSquare,
};

const limits = {
  noticeTitle: 90,
  topperName: 60,
  topperBatch: 20,
  topperMessage: 140,
  eventTitle: 80,
  eventText: 220,
  newsTitle: 90,
  newsText: 320,
};

const featureBySection = {
  notices: "notices",
  newsEvents: "news",
  upcomingEvents: "events",
};

const uploadLimits = {
  image: { bytes: 4 * 1024 * 1024, label: "4 MB" },
  pdf: { bytes: 2 * 1024 * 1024, label: "2 MB" },
};

const readFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const optimizeImage = (file) =>
  new Promise((resolve, reject) => {
    const image = new window.Image();
    const url = window.URL.createObjectURL(file);

    image.onload = () => {
      const maxSide = 1200;
      const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));

      const context = canvas.getContext("2d");
      context.fillStyle = "#fff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      window.URL.revokeObjectURL(url);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Image optimization failed."));
            return;
          }
          readFile(blob).then(resolve, reject);
        },
        "image/jpeg",
        0.82,
      );
    };

    image.onerror = () => {
      window.URL.revokeObjectURL(url);
      reject(new Error("Image load failed."));
    };
    image.src = url;
  });

const cleanPercent = (value) => {
  const next = String(value)
    .replace(/[^\d.]/g, "")
    .replace(/(\..*)\./g, "$1");
  if (next === "") return "";
  return Number(next) > 100 ? "100" : next;
};

const emptyContent = {
  notices: [],
  newsEvents: [],
  upcomingEvents: [],
  toppers: [],
  enquiries: [],
};

function createEmptyRecord(section) {
  const base = { id: `record-${Date.now()}` };
  if (section === "notices")
    return {
      ...base,
      title: "",
      date: "",
      text: "",
      pdfName: "",
      starred: false,
    };
  if (section === "newsEvents")
    return { ...base, title: "", date: "", image: "", imageName: "", text: "" };
  if (section === "upcomingEvents")
    return { ...base, date: "", title: "", text: "" };
  if (section === "toppers") {
    return {
      ...base,
      className: "class10",
      name: "",
      score: "",
      batch: "",
      message: "",
      image: "",
      imageName: "",
    };
  }
  return { ...base, title: "", text: "" };
}

const dateInput = (value) => (value ? String(value).slice(0, 10) : "");
const withId = (item) => ({
  ...item,
  id: item._id || item.id,
  date: dateInput(item.date),
});
const normalizeContent = ({
  notices,
  newsEvents,
  upcomingEvents,
  toppers,
  enquiries = [],
}) => ({
  notices: notices.map(withId),
  newsEvents: newsEvents.map((item) => ({
    ...withId(item),
    image: item.imageUrl || item.image || "",
  })),
  upcomingEvents: upcomingEvents.map(withId),
  toppers: toppers.map((item) => ({
    ...withId(item),
    score: String(item.score ?? ""),
  })),
  enquiries: enquiries.map((item) => ({ ...item, id: item._id || item.id })),
});

const formData = (record, fileField, apiField) => {
  const data = new window.FormData();
  ["title", "text", "date", "starred", "removePdf"].forEach((field) => {
    if (record[field] !== undefined) data.append(field, record[field]);
  });
  if (record[fileField]) data.append(apiField, record[fileField]);
  return data;
};

const isPdfUrl = (url) => typeof url === "string" && url.trim().length > 0;
const isPdfData = (data) =>
  typeof data === "string" && data.startsWith("data:application/pdf");
const hasPdf = (record) => isPdfUrl(record.pdfUrl) || isPdfData(record.pdfData);
const openPdf = (record, setPdfPreview) => {
  if (hasPdf(record)) {
    setPdfPreview({
      title: record.title,
      file: {
        name: record.pdfName,
        url: directPdfUrl(record),
        data: record.pdfData,
      },
    });
  }
};
const topperBody = (record) => ({
  className: record.className,
  name: record.name,
  score: Number(record.score),
  batch: record.batch,
  message: record.message,
  image: record.image,
  imageName: record.imageName,
});

export default function AdminDashboard({ currentAdmin }) {
  const navigate = useNavigate();
  const [content, setContent] = useState(emptyContent);
  const [activeSection, setActiveSection] = useState("notices");
  const [editing, setEditing] = useState(null);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [pdfPreview, setPdfPreview] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [enquiryDetail, setEnquiryDetail] = useState(null);

  const enabledSections = useMemo(
    () =>
      adminSections.filter(({ id }) => {
        const feature = featureBySection[id];
        return !feature || currentAdmin?.features?.[feature] !== false;
      }),
    [currentAdmin],
  );

  useEffect(() => {
    let alive = true;
    setContentLoading(true);
    setLoadError("");
    Promise.all([
      currentAdmin?.features?.notices === false
        ? Promise.resolve([])
        : getAllNotices(),
      currentAdmin?.features?.news === false
        ? Promise.resolve([])
        : getAllNews(),
      currentAdmin?.features?.events === false
        ? Promise.resolve([])
        : getAllEvents(),
      getAllToppers(),
      getAllEnquiries().catch(() => []),
    ])
      .then(([notices, newsEvents, upcomingEvents, toppers, enquiries]) => {
        if (alive)
          setContent(
            normalizeContent({ notices, newsEvents, upcomingEvents, toppers, enquiries }),
          );
      })
      .catch((err) => {
        if (alive)
          setLoadError(
            err.response?.data?.message || "Could not load dashboard content.",
          );
      })
      .finally(() => {
        if (alive) setContentLoading(false);
      });
    return () => {
      alive = false;
    };

  }, [currentAdmin]);

  useEffect(() => {
    if (!enabledSections.some((item) => item.id === activeSection)) {
      setActiveSection(enabledSections[0]?.id || "notices");
    }
  }, [activeSection, enabledSections]);

  const section =
    enabledSections.find((item) => item.id === activeSection) ||
    enabledSections[0] ||
    adminSections[0];

  const records = useMemo(
    () => content[activeSection] || [],
    [activeSection, content],
  );

  const visibleRecords = useMemo(
    () =>
      records.filter((record) => {
        const textMatch = JSON.stringify(record)
          .toLowerCase()
          .includes(search.toLowerCase());
        const filterMatch = filter === "all" || record.className === filter;
        return textMatch && filterMatch;
      }),
    [filter, records, search],
  );

  const saveRecord = async (event) => {
    event.preventDefault();
    setLoading(true);

    const validationErrors = validateRecord(activeSection, editing);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) {
      setNotice({ type: "error", text: "Please fix the highlighted fields." });
      setLoading(false);
      return;
    }

    try {
      const exists = Boolean(editing._id);
      let savedRecord;
      if (activeSection === "notices") {
        const body = formData(editing, "pdfFile", "pdf");
        savedRecord = exists
          ? await updateNotice(editing._id, body)
          : await createNotice(body);
      } else if (activeSection === "newsEvents") {
        const body = formData(editing, "imageFile", "image");
        savedRecord = exists
          ? await updateNews(editing._id, body)
          : await createNews(body);
      } else if (activeSection === "upcomingEvents") {
        const body = {
          title: editing.title,
          text: editing.text,
          date: editing.date,
        };
        savedRecord = exists
          ? await updateEvent(editing._id, body)
          : await createEvent(body);
      } else {
        const body = topperBody({
          ...editing,
          score: cleanPercent(editing.score),
        });
        savedRecord = exists
          ? await updateTopper(editing._id, body)
          : await createTopper(body);
      }

      const normalized = normalizeContent({
        ...emptyContent,
        [activeSection]: [savedRecord],
      })[activeSection][0];
      setContent((current) => ({
        ...current,
        [activeSection]: exists
          ? current[activeSection].map((item) =>
              item._id === savedRecord._id ? normalized : item,
            )
          : [normalized, ...current[activeSection]],
      }));
      setNotice({
        type: "success",
        text: exists
          ? "Record updated successfully."
          : "Record created successfully.",
      });
      setEditing(null);
      setErrors({});
    } catch (err) {
      setNotice({
        type: "error",
        text: err.response?.data?.message || "Save failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      if (activeSection === "notices") await deleteNotice(pendingDelete._id);
      else if (activeSection === "newsEvents")
        await deleteNews(pendingDelete._id);
      else if (activeSection === "upcomingEvents")
        await deleteEventRecord(pendingDelete._id);
      else if (activeSection === "enquiries")
        await apiDeleteEnquiry(pendingDelete._id);
      else await deleteTopper(pendingDelete._id);

      setContent((current) => ({
        ...current,
        [activeSection]: current[activeSection].filter(
          (item) => item._id !== pendingDelete._id,
        ),
      }));
      setNotice({ type: "success", text: "Record deleted successfully." });
    } catch (err) {
      setNotice({
        type: "error",
        text: err.response?.data?.message || "Delete failed.",
      });
    } finally {
      setPendingDelete(null);
    }
  };

  const toggleNoticeStar = async (record) => {
    try {
      const updated = await apiToggleNoticeStar(record._id);
      const normalized = normalizeContent({
        ...emptyContent,
        notices: [updated],
      }).notices[0];
      setContent((current) => ({
        ...current,
        notices: current.notices.map((item) =>
          item._id === updated._id ? normalized : item,
        ),
      }));
      setNotice({
        type: "success",
        text: updated.starred
          ? "Notice starred for the home page."
          : "Notice removed from the home page.",
      });
    } catch (err) {
      setNotice({
        type: "error",
        text: err.response?.data?.message || "Could not update notice.",
      });
    }
  };

  const logout = () => {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  const sidebarContent = (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#0a352e] to-[#041916] text-white">
      {/* Branding */}
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/25 ring-1 ring-accent/30">
          <School className="h-5 w-5 text-accent" />
        </div>
        <div>
          <span className="block text-[15px] text-accent font-semibold tracking-wider">
            MANAGEMENT SYSTEM
          </span>
        </div>
      </div>

      {/* Admin Profile */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5 bg-white/[0.02]">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
          <User className="h-4 w-4 text-accent" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-white/90">
            {currentAdmin?.username || "School Administrator"}
          </p>
          <span className="block text-[10px] text-white/50 truncate uppercase font-semibold">
            {currentAdmin?.role === "developer"
              ? "Developer Access"
              : "School Admin"}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 px-3 py-6">
        <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-white/30">
          Dashboard Sections
        </p>
        {enabledSections.map((item) => {
          const Icon = sectionIcons[item.id];
          const isActive = activeSection === item.id;
          const unreadCount =
            item.id === "enquiries"
              ? (content.enquiries || []).filter((e) => !e.isRead).length
              : 0;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveSection(item.id);
                setEditing(null);
                setErrors({});
                setFilter("all");
                setMobileSidebarOpen(false);
              }}
              className={`flex w-full items-center gap-3.5 rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition duration-200 ${
                isActive
                  ? "bg-accent text-slate-950 shadow-md shadow-accent/20"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon
                className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-slate-950" : "text-white/40"}`}
              />
              <span className="flex-1 truncate">{item.label}</span>
              {unreadCount > 0 ? (
                <span
                  className={`min-w-[18px] rounded-full px-1.5 py-0.5 text-center text-[10px] font-bold leading-none ${
                    isActive
                      ? "bg-slate-900 text-accent"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              ) : (
                <ChevronRight
                  className={`h-3.5 w-3.5 opacity-60 transition-transform ${isActive ? "translate-x-1" : ""}`}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom info & Logout */}
      <div className="border-t border-white/10 p-4 space-y-3">
        <div className="rounded-lg bg-black/20 p-3 text-[11px] text-white/55 space-y-1">
          <p className="truncate font-semibold text-white/70">
            {currentAdmin?.school?.name || "Developer Console"}
          </p>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-accent" />
            <span>Session: 7 days active</span>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600/15 border border-red-500/20 py-2.5 text-xs font-bold text-red-400 transition hover:bg-red-600 hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" />
          Log Out Portal
        </button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen flex bg-slate-50 font-heading text-slate-800">
      {/* ─── SIDEBAR (Desktop) ─── */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 shadow-xl lg:block">
        <div className="sticky top-0 h-screen">{sidebarContent}</div>
      </aside>

      {/* ─── MOBILE DRAWER OVERLAY ─── */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative z-10 flex w-72 max-w-xs flex-col shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="absolute right-4 top-4 rounded-full bg-black/20 p-2 text-white hover:bg-black/40 focus:outline-none"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── MAIN WORKING AREA ─── */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between px-4 py-4 md:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 lg:hidden"
                aria-label="Open sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
                  {currentAdmin?.school?.name || "School Admin Dashboard"}
                </h1>
                <p className="hidden text-xs text-slate-500 sm:block font-body">
                  Manage announcement boards, toppers, calendar schedules &
                  media
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e7f2f5] px-3 py-1.5 text-xs font-semibold text-primary">
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>{section.label}</span>
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content Grid */}
        <div className="flex-1 p-4 md:p-8 space-y-8">
          {/* Section Analytics Overview */}
          <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {enabledSections.map((item) => {
              const Icon = sectionIcons[item.id];
              const isSelected = activeSection === item.id;
              return (
                <motion.button
                  whileHover={{ y: -2 }}
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveSection(item.id);
                    setEditing(null);
                    setErrors({});
                    setFilter("all");
                  }}
                  className={`relative overflow-hidden rounded-2xl border p-5 text-left transition duration-200 ${
                    isSelected
                      ? "border-[#0f4d43]/30 bg-white shadow-lg shadow-emerald-900/5 ring-1 ring-primary/20"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="block text-2xl font-bold text-slate-900 tracking-tight">
                        {(content[item.id] || []).length}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1 block">
                        {item.label}
                      </span>
                    </div>
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-xl transition ${
                        isSelected
                          ? "bg-accent/20 text-slate-950"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                  </div>
                  {/* Selected Indicator Bar */}
                  {isSelected && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0f4d43]" />
                  )}
                </motion.button>
              );
            })}
          </section>

          {notice && (
            <NoticeMessage notice={notice} onClose={() => setNotice(null)} />
          )}

          {/* Table & Editor Panel Layout */}
          {activeSection === "enquiries" ? (
            <EnquiriesPanel
              enquiries={content.enquiries || []}
              search={search}
              onSearch={setSearch}
              contentLoading={contentLoading}
              onMarkRead={async (enq) => {
                try {
                  const updated = await markEnquiryRead(enq._id);
                  setContent((c) => ({
                    ...c,
                    enquiries: c.enquiries.map((e) =>
                      e._id === updated._id ? { ...e, isRead: true } : e,
                    ),
                  }));
                } catch {
                  setNotice({ type: "error", text: "Could not mark as read." });
                }
              }}
              onDelete={(enq) => setPendingDelete(enq)}
              onView={(enq) => setEnquiryDetail(enq)}
            />
          ) : (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
              {/* Left Data Table Area */}
              <section className="rounded-2xl border border-slate-200 bg-white shadow-md p-5 md:p-6 space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                      Manage {section.label}
                    </h2>
                    <p className="text-xs text-slate-500 font-body mt-0.5">
                      {section.desc}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(createEmptyRecord(activeSection));
                      setErrors({});
                    }}
                    className="inline-flex min-h-10 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-md hover:bg-emerald-950 transition"
                  >
                    <Plus className="h-4.5 w-4.5" />
                    Add New Entry
                  </button>
                </div>

                {/* Filters & Searches */}
                <div
                  className={`grid gap-3 ${activeSection === "toppers" ? "md:grid-cols-[1fr_180px]" : ""}`}
                >
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder={`Search ${section.label.toLowerCase()}...`}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary/50 focus:bg-white focus:ring-4 focus:ring-primary/10"
                    />
                  </div>
                  {activeSection === "toppers" && (
                    <select
                      value={filter}
                      onChange={(event) => setFilter(event.target.value)}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold outline-none transition focus:border-primary/50 focus:bg-white"
                    >
                      <option value="all">All Classes</option>
                      <option value="class10">Class X (10th)</option>
                      <option value="class12">Class XII (12th)</option>
                    </select>
                  )}
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-100">
                  <table className="w-full min-w-[620px] text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                        <th className="px-5 py-3.5">Record Info</th>
                        <th className="px-5 py-3.5">Category/Meta</th>
                        <th className="px-5 py-3.5 text-right">Action Panel</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {visibleRecords.map((record) => (
                        <tr
                          key={record.id}
                          className="group hover:bg-slate-50/70 transition"
                        >
                          <td className="px-5 py-4 font-semibold text-slate-800">
                            <span className="line-clamp-1 block text-[13.5px] group-hover:text-primary transition">
                              {record.title || record.name}
                            </span>
                            {activeSection !== "notices" && (
                              <span className="mt-1 line-clamp-1 font-body text-xs font-normal text-slate-500">
                                {record.text || record.message}
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-xs font-semibold text-slate-500">
                            {activeSection === "toppers" ? (
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                                  record.className === "class12"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {record.className === "class12"
                                  ? "Class XII"
                                  : "Class X"}
                              </span>
                            ) : (
                              <span className="line-clamp-1 font-body text-slate-500 text-[11.5px]">
                                {detailFor(activeSection, record)}
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-1.5">
                              {activeSection === "notices" && (
                                <>
                                  <IconButton
                                    label={
                                      record.starred
                                        ? "Remove star from home page"
                                        : "Star notice on home page"
                                    }
                                    onClick={() => toggleNoticeStar(record)}
                                    icon={
                                      <Star
                                        className={
                                          record.starred
                                            ? "h-4 w-4 fill-accent text-accent"
                                            : "h-4 w-4"
                                        }
                                      />
                                    }
                                  />
                                  {hasPdf(record) && (
                                    <IconButton
                                      label="Open attachment PDF"
                                      onClick={() =>
                                        openPdf(record, setPdfPreview)
                                      }
                                      icon={<FileText className="h-4 w-4" />}
                                    />
                                  )}
                                </>
                              )}
                              <IconButton
                                label="Edit details"
                                onClick={() => {
                                  setEditing(record);
                                  setErrors({});
                                }}
                                icon={<Edit className="h-4 w-4" />}
                              />
                              <IconButton
                                label="Delete entry"
                                onClick={() => setPendingDelete(record)}
                                icon={<Trash2 className="h-4 w-4 text-red-500" />}
                                danger
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {!visibleRecords.length && (
                    <div className="py-12 text-center">
                      <Newspaper className="mx-auto h-8 w-8 text-slate-300" />
                      <p className="mt-3 font-semibold text-slate-400 text-xs">
                        {contentLoading
                          ? "Syncing data, please wait..."
                          : loadError || "No matching database files."}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Right Editor Aside Panel */}
              <aside className="shrink-0">
                <div className="xl:sticky xl:top-24">
                  <AnimatePresence mode="wait">
                    {editing ? (
                      <motion.div
                        key="form-editor"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 15 }}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg space-y-4"
                      >
                        <RecordForm
                          section={activeSection}
                          record={editing}
                          errors={errors}
                          loading={loading}
                          onChange={setEditing}
                          onCancel={() => {
                            setEditing(null);
                            setErrors({});
                          }}
                          onSubmit={saveRecord}
                          onFileError={(text) =>
                            setNotice({ type: "error", text })
                          }
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty-placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center bg-white shadow-sm"
                      >
                        <Plus className="mx-auto h-8 w-8 text-[#0f4d43]" />
                        <h3 className="mt-4 text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Record Form Editor
                        </h3>
                        <p className="mt-2 font-body text-xs leading-5 text-slate-400">
                          Choose a record from the list to update its contents, or
                          create a brand new entry using the button above.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        record={pendingDelete}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />

      <PdfModal
        title={pdfPreview?.title}
        file={pdfPreview?.file}
        onClose={() => setPdfPreview(null)}
      />

      {/* Enquiry Detail Modal */}
      <AnimatePresence>
        {enquiryDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setEnquiryDetail(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <h2 className="text-base font-bold text-slate-900">Enquiry Details</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setEnquiryDetail(null)}
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <DetailRow icon={<User className="h-4 w-4 text-primary" />} label="Parent" value={enquiryDetail.parentName} />
                <DetailRow icon={<GraduationCap className="h-4 w-4 text-primary" />} label="Student" value={enquiryDetail.studentName} />
                <DetailRow icon={<Mail className="h-4 w-4 text-primary" />} label="Email" value={enquiryDetail.email} />
                <DetailRow icon={<Phone className="h-4 w-4 text-primary" />} label="Phone" value={enquiryDetail.phone} />
                {enquiryDetail.className && (
                  <DetailRow icon={<GraduationCap className="h-4 w-4 text-primary" />} label="Class" value={enquiryDetail.className} />
                )}
                {enquiryDetail.message && (
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Message</p>
                    <p className="text-xs text-slate-700 leading-relaxed">{enquiryDetail.message}</p>
                  </div>
                )}
                <p className="text-[10px] text-slate-400 font-semibold">
                  Received: {new Date(enquiryDetail.createdAt).toLocaleString()}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function RecordForm({
  section,
  record,
  errors,
  loading,
  onChange,
  onCancel,
  onSubmit,
  onFileError,
}) {
  const setField = (name, value) => onChange({ ...record, [name]: value });
  const removeUpload = ({ dataField, nameField }) =>
    onChange({
      ...record,
      [dataField]: "",
      [`${dataField}File`]: null,
      [`${dataField}Url`]: "",
      [`${dataField}Data`]: "",
      [nameField]: "",
      ...(dataField === "pdf" ? { removePdf: true, pdfUrl: "" } : {}),
    });

  const upload = async (event, { type, dataField, nameField }) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const valid =
      type === "image"
        ? file.type.startsWith("image/")
        : file.type === "application/pdf";
    if (!valid) {
      onFileError(
        type === "pdf"
          ? "Please upload a PDF file."
          : "Please upload an image file.",
      );
      event.target.value = "";
      return;
    }

    if (file.size > uploadLimits[type].bytes) {
      onFileError(
        `${type === "pdf" ? "PDF" : "Image"} must be ${uploadLimits[type].label} or smaller.`,
      );
      event.target.value = "";
      return;
    }

    try {
      const data = type === "image" ? await optimizeImage(file) : "";
      onChange({
        ...record,
        [dataField]: data,
        [`${dataField}File`]: file,
        [nameField]: file.name,
        ...(dataField === "pdf" ? { removePdf: false } : {}),
      });
    } catch {
      onFileError("File upload failed. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          {record.id.startsWith("record-")
            ? "New Record Entry"
            : "Modify Details"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          aria-label="Close form"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {section === "toppers" && (
          <>
            <Field label="School Academic Class" error={errors.className}>
              <select
                value={record.className}
                onChange={(event) => setField("className", event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold outline-none transition focus:border-primary/50 focus:bg-white"
                required
              >
                <option value="class10">Class X (10th)</option>
                <option value="class12">Class XII (12th)</option>
              </select>
            </Field>
            <TextInput
              label="Full Student Name"
              name="name"
              record={record}
              errors={errors}
              onChange={setField}
              limit={limits.topperName}
              placeholder="e.g. John Doe"
            />
            <PercentageInput
              record={record}
              errors={errors}
              onChange={setField}
            />
            <TextInput
              label="Academic Year/Batch"
              name="batch"
              record={record}
              errors={errors}
              onChange={setField}
              limit={limits.topperBatch}
              required={false}
              placeholder="e.g. 2025 - 2026"
            />
            <UploadField
              label="Upload Topper Photo"
              accept="image/*"
              name={record.imageName || ""}
              error={errors.image}
              hint={`Dimensions square preferred (up to ${uploadLimits.image.label})`}
              icon={<ImageIcon className="h-4.5 w-4.5" />}
              onChange={(event) =>
                upload(event, {
                  type: "image",
                  dataField: "image",
                  nameField: "imageName",
                })
              }
              onRemove={() =>
                removeUpload({ dataField: "image", nameField: "imageName" })
              }
            />
            {record.image && (
              <div className="flex justify-center pt-2">
                <img
                  src={record.image}
                  alt="Topper preview"
                  className="h-20 w-20 rounded-full border-2 border-primary/20 object-cover"
                />
              </div>
            )}
            <LimitedText
              label="Student Achievement Quote"
              name="message"
              record={record}
              errors={errors}
              onChange={setField}
              limit={limits.topperMessage}
              rows={3}
              placeholder="Write a message of appreciation..."
            />
          </>
        )}

        {section === "notices" && (
          <>
            <DateInput
              label="Issue/Publish Date"
              name="date"
              record={record}
              errors={errors}
              onChange={setField}
            />
            <TextInput
              label="Notice Header Title"
              name="title"
              record={record}
              errors={errors}
              onChange={setField}
              limit={limits.noticeTitle}
              placeholder="Notice description title..."
            />
            <UploadField
              label="Upload PDF Document"
              accept="application/pdf"
              name={record.pdfName || ""}
              error={errors.pdfFile}
              hint={`Only PDF format (up to ${uploadLimits.pdf.label})`}
              icon={<FileText className="h-4.5 w-4.5" />}
              onChange={(event) =>
                upload(event, {
                  type: "pdf",
                  dataField: "pdf",
                  nameField: "pdfName",
                })
              }
              onRemove={() =>
                removeUpload({ dataField: "pdf", nameField: "pdfName" })
              }
            />
            {(record.pdfName || isPdfUrl(record.pdfUrl)) && (
              <p
                className="block w-full min-w-0 truncate text-[11px] font-semibold text-primary/70"
                title={record.pdfName || "Uploaded PDF"}
              >
                PDF Attached: {record.pdfName || "Uploaded PDF"}
              </p>
            )}
          </>
        )}

        {section === "upcomingEvents" && (
          <>
            <DateInput
              label="Calendar Date"
              name="date"
              record={record}
              errors={errors}
              onChange={setField}
            />
            <TextInput
              label="Event Name/Title"
              name="title"
              record={record}
              errors={errors}
              onChange={setField}
              limit={limits.eventTitle}
              placeholder="e.g. Sports Carnival 2026"
            />
            <LimitedText
              label="Event Description"
              name="text"
              record={record}
              errors={errors}
              onChange={setField}
              limit={limits.eventText}
              rows={3}
              placeholder="Describe event agendas or timeslots..."
            />
          </>
        )}

        {section === "newsEvents" && (
          <>
            <UploadField
              label="Cover Media Image"
              accept="image/*"
              name={record.imageName || ""}
              error={errors.image}
              hint={`High definition image (up to ${uploadLimits.image.label})`}
              icon={<ImageIcon className="h-4.5 w-4.5" />}
              onChange={(event) =>
                upload(event, {
                  type: "image",
                  dataField: "image",
                  nameField: "imageName",
                })
              }
              onRemove={() =>
                removeUpload({ dataField: "image", nameField: "imageName" })
              }
            />
            {record.image && (
              <img
                src={record.image}
                alt="News preview"
                className="h-24 w-full rounded-xl object-cover border border-slate-200"
              />
            )}
            <DateInput
              label="Publish/Media Date"
              name="date"
              record={record}
              errors={errors}
              onChange={setField}
            />
            <TextInput
              label="News Article Heading"
              name="title"
              record={record}
              errors={errors}
              onChange={setField}
              limit={limits.newsTitle}
              placeholder="e.g. Alumni Meet Celebrations..."
            />
            <LimitedText
              label="Full News Article Text"
              name="text"
              record={record}
              errors={errors}
              onChange={setField}
              limit={limits.newsText}
              rows={4}
              placeholder="Write the full report description..."
            />
          </>
        )}

        <button
          type="submit"
          className="inline-flex min-h-10.5 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-emerald-700 px-5 text-sm font-semibold text-white shadow-md shadow-primary/10 hover:from-primary hover:to-emerald-800 transition"
          disabled={loading}
        >
          <Save className="h-4 w-4 text-accent" />
          {loading ? "Syncing data..." : "Save Modifications"}
        </button>
      </div>
    </form>
  );
}

function LimitedText({
  label,
  name,
  record,
  errors,
  onChange,
  limit,
  rows,
  placeholder = "",
}) {
  const value = record[name] || "";
  const remaining = limit - value.length;

  return (
    <Field label={label} error={errors[name]}>
      <textarea
        value={value}
        maxLength={limit}
        onChange={(event) => onChange(name, event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs outline-none transition focus:border-primary/50 focus:bg-white resize-none"
        rows={rows}
        placeholder={placeholder}
        required
      />
      <div className="text-[10px] font-semibold text-slate-400 text-right mt-1">
        {remaining} characters remaining
      </div>
    </Field>
  );
}

function TextInput({
  label,
  name,
  record,
  errors,
  onChange,
  limit,
  required = true,
  placeholder = "",
}) {
  const value = record[name] || "";

  return (
    <Field label={label} error={errors[name]}>
      <input
        value={value}
        maxLength={limit}
        onChange={(event) => onChange(name, event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs outline-none transition focus:border-primary/50 focus:bg-white"
        required={required}
        placeholder={placeholder}
      />
      <div className="text-[10px] font-semibold text-slate-400 text-right mt-1">
        {limit - value.length} characters remaining
      </div>
    </Field>
  );
}

function PercentageInput({ record, errors, onChange }) {
  return (
    <Field label="Final Score Percentage" error={errors.score}>
      <div className="relative">
        <input
          type="number"
          min="0"
          max="100"
          step="0.01"
          inputMode="decimal"
          value={record.score || ""}
          onKeyDown={(event) => {
            if (["e", "E", "+", "-"].includes(event.key))
              event.preventDefault();
          }}
          onChange={(event) =>
            onChange("score", cleanPercent(event.target.value))
          }
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-3.5 pr-10 text-xs outline-none transition focus:border-primary/50 focus:bg-white"
          required
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
          %
        </span>
      </div>
    </Field>
  );
}

function DateInput({ label, name, record, errors, onChange }) {
  return (
    <Field label={label} error={errors[name]}>
      <input
        type="date"
        value={record[name] || ""}
        onChange={(event) => onChange(name, event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs outline-none transition focus:border-primary/50 focus:bg-white [color-scheme:light]"
        required
      />
    </Field>
  );
}

function UploadField({
  label,
  accept,
  name,
  error,
  hint,
  icon,
  onChange,
  onRemove,
}) {
  return (
    <Field label={label} error={error}>
      <div className="grid gap-2">
        <label className="flex h-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-primary/25 bg-[#e7f2f5]/40 px-4 py-3 text-center text-xs font-semibold text-primary transition hover:bg-[#e7f2f5]/80">
          {icon}
          <span className="block w-full truncate font-bold text-slate-700">
            {name || "Select document file"}
          </span>
          <span className="text-[10px] font-normal text-slate-400">{hint}</span>
          <input
            key={name || "empty"}
            type="file"
            accept={accept}
            onChange={onChange}
            className="sr-only"
          />
        </label>
        {name && (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex min-h-9 w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            <X className="h-3.5 w-3.5" />
            Delete upload
          </button>
        )}
      </div>
    </Field>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="grid gap-1.5 text-xs font-bold text-slate-700">
      <span>{label}</span>
      {children}
      {error && (
        <span className="text-[10px] font-semibold text-red-600 flex items-center gap-1">
          <span>●</span> {error}
        </span>
      )}
    </div>
  );
}

function IconButton({ label, icon, onClick, danger = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`grid h-8.5 w-8.5 place-items-center rounded-lg border border-slate-200 transition ${
        danger
          ? "hover:border-red-500 hover:bg-red-50 text-slate-500"
          : "hover:border-primary hover:bg-slate-100/50 text-slate-500 hover:text-primary"
      }`}
      title={label}
      aria-label={label}
    >
      {icon}
    </button>
  );
}

function NoticeMessage({ notice, onClose }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-xs font-semibold ${
        notice.type === "success"
          ? "bg-[#e7f2f5] border border-primary/20 text-[#0f4d43]"
          : "bg-red-50 border border-red-200 text-red-700"
      }`}
    >
      <span>{notice.text}</span>
      <button type="button" onClick={onClose} aria-label="Dismiss message">
        <X className="h-4 w-4 opacity-60 hover:opacity-100" />
      </button>
    </div>
  );
}

function ConfirmModal({ record, onCancel, onConfirm }) {
  if (!record) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
        <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">
          Confirm Delete
        </h2>
        <p className="mt-3 font-body text-xs leading-relaxed text-slate-500">
          Are you sure you want to permanently remove{" "}
          <strong className="text-slate-800">
            &quot;{record.title || record.name || `${record.parentName} (${record.studentName})`}&quot;
          </strong>
          ? This action cannot be undone.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex min-h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex min-h-9 items-center justify-center rounded-xl bg-red-600 px-4 text-xs font-bold text-white hover:bg-red-700 transition"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function detailFor(section, record) {
  if (section === "toppers") {
    return `${record.className === "class12" ? "Class XII" : "Class X"} - ${record.score || 0}%`;
  }
  if (section === "notices")
    return [
      record.starred ? "Home priority" : "",
      record.date,
      record.pdfName || "No PDF",
    ]
      .filter(Boolean)
      .join(" - ");
  if (section === "upcomingEvents")
    return record.date || `${record.day || ""} ${record.month || ""}`.trim();
  return record.date;
}

function validateRecord(section, record) {
  const errors = {};
  const requireField = (field, label) => {
    if (!String(record[field] || "").trim())
      errors[field] = `${label} is required.`;
  };
  const limitField = (field, label, limit) => {
    if ((record[field] || "").length > limit)
      errors[field] = `${label} must be ${limit} characters or fewer.`;
  };

  if (section === "toppers") {
    requireField("name", "Name");
    requireField("score", "Percentage");
    requireField("message", "Message");
    requireField("image", "Image");
    const score = Number(record.score);
    if (
      record.score !== "" &&
      (Number.isNaN(score) || score < 0 || score > 100)
    ) {
      errors.score = "Percentage must be a number between 0 and 100.";
    }
    limitField("name", "Name", limits.topperName);
    limitField("batch", "Batch", limits.topperBatch);
    limitField("message", "Message", limits.topperMessage);
    return errors;
  }

  if (section === "notices") {
    requireField("date", "Date");
    requireField("title", "Title");
    limitField("title", "Title", limits.noticeTitle);
    return errors;
  }

  requireField("date", "Date");
  requireField("title", "Title");
  requireField("text", "Description");

  if (section === "upcomingEvents") {
    limitField("title", "Title", limits.eventTitle);
    limitField("text", "Description", limits.eventText);
  }

  if (section === "newsEvents") {
    if (!record.imageFile && !record.imageUrl && !record.image)
      errors.image = "Image is required.";
    limitField("title", "Title", limits.newsTitle);
    limitField("text", "Description", limits.newsText);
  }

  return errors;
}

function EnquiriesPanel({
  enquiries,
  search,
  onSearch,
  contentLoading,
  onMarkRead,
  onDelete,
  onView,
}) {
  const openEnquiry = (enquiry) => {
    onView(enquiry);
    if (!enquiry.isRead) onMarkRead(enquiry);
  };

  const filtered = enquiries.filter((item) => {
    const term = search.toLowerCase();
    return (
      item.parentName?.toLowerCase().includes(term) ||
      item.studentName?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.phone?.toLowerCase().includes(term) ||
      item.className?.toLowerCase().includes(term) ||
      item.message?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Admission Enquiries
          </h2>
          <p className="text-xs text-slate-500 font-body mt-0.5">
            Manage inquiries submitted by parents via the website
          </p>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search enquiries..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-xs outline-none transition focus:border-primary/50 focus:bg-white focus:ring-4 focus:ring-primary/10"
          />
        </div>
      </div>

      {contentLoading ? (
        <div className="py-12 text-center border border-slate-200 rounded-2xl bg-white shadow-sm">
          <p className="font-semibold text-slate-400 text-xs">Syncing data, please wait...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center border border-slate-200 rounded-2xl bg-white shadow-sm">
          <MessageSquare className="mx-auto h-8 w-8 text-slate-300" />
          <p className="mt-3 font-semibold text-slate-400 text-xs">No enquiries found.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((enquiry) => (
            <div
              key={enquiry._id}
              role="button"
              tabIndex={0}
              onClick={() => openEnquiry(enquiry)}
              onKeyDown={(e) => e.key === "Enter" && openEnquiry(enquiry)}
              className={`relative rounded-2xl border p-5 transition duration-200 bg-white shadow-sm hover:shadow-lg cursor-pointer flex flex-col justify-between group ${
                enquiry.isRead
                  ? "border-slate-200 hover:border-primary/30"
                  : "border-primary/30 ring-1 ring-primary/10 hover:ring-primary/30"
              }`}
            >
              {!enquiry.isRead && (
                <span className="absolute right-4 top-4 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary uppercase">
                  New
                </span>
              )}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <User className="h-4 w-4 text-slate-400" />
                  <span className="font-semibold text-slate-800 text-sm group-hover:text-primary transition-colors">
                    {enquiry.parentName}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-500 font-body mb-4">
                  <p>
                    <strong className="text-slate-700">Student:</strong> {enquiry.studentName}
                  </p>
                  {enquiry.className && (
                    <p>
                      <strong className="text-slate-700">Class:</strong> {enquiry.className}
                    </p>
                  )}
                  <p className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" /> {enquiry.email}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" /> {enquiry.phone}
                  </p>
                </div>
                {enquiry.message && (
                  <p className="line-clamp-2 text-xs bg-slate-50 rounded-lg p-2.5 text-slate-600 border border-slate-100 font-body">
                    {enquiry.message}
                  </p>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-[10px] text-slate-400 font-semibold">
                  {new Date(enquiry.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  {!enquiry.isRead && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onMarkRead(enquiry); }}
                      className="rounded-lg border border-primary/20 bg-primary/5 p-1.5 text-primary transition hover:bg-primary hover:text-white"
                      title="Mark as read"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onDelete(enquiry); }}
                    className="rounded-lg border border-slate-200 bg-white p-1.5 text-red-500 transition hover:bg-red-50 hover:border-red-200"
                    title="Delete enquiry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 py-1.5 border-b border-slate-50">
      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-slate-50 text-slate-500">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="truncate text-xs font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}
