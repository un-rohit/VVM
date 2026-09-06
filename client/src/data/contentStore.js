import { useEffect, useState } from "react";
import {
  newsItems as seedNewsItems,
  notices as seedNotices,
  toppers as seedToppers,
  upcomingEvents as seedUpcomingEvents,
} from "./siteData.js";

// ponytail: localStorage is the backend for this frontend-only app; use a DB for multi-staff writes.
const STORAGE_KEY = "school-admin-content-v1";
const CHANGE_EVENT = "school-admin-content-change";

const makeId = (prefix, index) => `${prefix}-${index + 1}`;
const percentValue = (value) => Number.parseFloat(String(value || "").replace("%", "")) || 0;
const dateValue = (value) => {
  const time = Date.parse(value || "");
  return Number.isNaN(time) ? 0 : time;
};
const byDateDesc = (a, b) => dateValue(b.date) - dateValue(a.date);
const byDateAsc = (a, b) => dateValue(a.date) - dateValue(b.date);
const byNoticePriority = (a, b) =>
  Number(Boolean(b.starred)) - Number(Boolean(a.starred)) || byDateDesc(a, b);
const byPercentDesc = (a, b) => percentValue(b.score) - percentValue(a.score);
const asPercent = (value) => String(percentValue(value)).replace(/\.0$/, "");
const shortDate = (date) => {
  if (!date) return { day: "", month: "" };
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return { day: "", month: "" };

  return {
    day: String(parsed.getDate()).padStart(2, "0"),
    month: parsed.toLocaleString("en", { month: "short" }),
  };
};

function normalizeNotices(notices) {
  let starredCount = 0;

  return notices
    .map((item) => {
      const starred = Boolean(item.starred) && starredCount < 4;
      if (starred) starredCount += 1;

      return {
        ...item,
        date: item.date || "",
        pdfName: item.pdfName || "",
        pdfData: item.pdfData || "",
        starred,
      };
    })
    .sort(byNoticePriority);
}

export const adminSections = [
  { id: "notices", label: "Notices" },
  { id: "newsEvents", label: "Latest News & Events" },
  { id: "upcomingEvents", label: "Upcoming Events" },
  { id: "toppers", label: "Toppers" },
];

export const defaultContent = {
  notices: seedNotices.map(([title, text, link], index) => ({
    id: makeId("notice", index),
    title,
    text,
    link,
    date: "",
    pdfName: "",
    pdfData: "",
    starred: index < 4,
  })),
  newsEvents: seedNewsItems.map((item, index) => ({
    id: makeId("news", index),
    title: item.title,
    date: item.date,
    image: item.image,
    text: item.text,
  })),
  upcomingEvents: seedUpcomingEvents.map(([day, month, title, meta], index) => ({
    id: makeId("event", index),
    date: "",
    day,
    month,
    title,
    text: meta,
  })),
  toppers: [
    ...seedToppers.class10.map(([name, score, message, image], index) => ({
      id: makeId("topper-10", index),
      className: "class10",
      name,
      score: asPercent(score),
      batch: "",
      message,
      image,
    })),
    ...seedToppers.class12.map(([name, score, message, image], index) => ({
      id: makeId("topper-12", index),
      className: "class12",
      name,
      score: asPercent(score),
      batch: "",
      message,
      image,
    })),
  ],
  announcements: [
    {
      id: "announcement-1",
      title: "Admissions Open for Session 2026 - 27",
      text: "Limited seats available. Contact the school office for details.",
      priority: "High",
      published: true,
    },
  ],
};

export function createEmptyRecord(section) {
  const base = { id: `record-${Date.now()}` };

  if (section === "notices") {
    return {
      ...base,
      title: "",
      date: "",
      text: "",
      pdfName: "",
      pdfData: "",
      starred: false,
    };
  }

  if (section === "newsEvents") {
    return { ...base, title: "", date: "", image: "", imageName: "", text: "" };
  }

  if (section === "upcomingEvents") {
    return { ...base, date: "", title: "", text: "" };
  }

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

  return { ...base, title: "", text: "", priority: "Normal" };
}

function normalizeContent(content) {
  const savedNews = Array.isArray(content?.newsEvents) ? content.newsEvents : [];
  const oldEvents = savedNews.filter((item) => item.kind === "event");
  const oldNews = savedNews.filter((item) => item.kind !== "event");

  return {
    notices: normalizeNotices(
      Array.isArray(content?.notices) ? content.notices : defaultContent.notices,
    ),
    newsEvents: (Array.isArray(content?.newsEvents)
      ? oldNews.length
        ? oldNews
        : content.newsEvents
      : defaultContent.newsEvents)
      .map((item) => ({
        ...item,
        kind: undefined,
        imageName: item.imageName || "",
      }))
      .sort(byDateDesc),
    upcomingEvents: (Array.isArray(content?.upcomingEvents)
      ? content.upcomingEvents
      : oldEvents.length
        ? oldEvents.map((item) => ({ ...item, text: item.text || item.meta || "" }))
        : defaultContent.upcomingEvents)
      .map((item) => ({ ...item, date: item.date || "" }))
      .sort((a, b) => (dateValue(a.date) && dateValue(b.date) ? byDateAsc(a, b) : 0)),
    toppers: (Array.isArray(content?.toppers) ? content.toppers : defaultContent.toppers)
      .map((item) => ({
        ...item,
        score: asPercent(item.score),
        batch: item.batch || "",
        imageName: item.imageName || "",
      }))
      .sort(byPercentDesc),
    announcements: Array.isArray(content?.announcements)
      ? content.announcements
      : defaultContent.announcements,
  };
}

export function loadAdminContent() {
  if (typeof window === "undefined") return defaultContent;

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? normalizeContent(JSON.parse(saved)) : normalizeContent(defaultContent);
  } catch {
    return normalizeContent(defaultContent);
  }
}

export function saveAdminContent(content) {
  const nextContent = normalizeContent(content);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextContent));
  window.dispatchEvent(new window.Event(CHANGE_EVENT));
  return nextContent;
}

export function useAdminContent() {
  const [content, setContent] = useState(loadAdminContent);

  useEffect(() => {
    const refresh = () => setContent(loadAdminContent());

    window.addEventListener(CHANGE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CHANGE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return getPublishedContent(content);
}

export function getPublishedContent(content) {
  const data = normalizeContent(content);

  return {
    announcements: data.announcements.filter((item) => item.published),
    notices: data.notices.map((item) => ({
      title: item.title,
      date: item.date,
      text: item.text,
      pdfName: item.pdfName,
      pdfData: item.pdfData,
      starred: item.starred,
    })),
    newsItems: data.newsEvents.map((item) => ({
      title: item.title,
      date: item.date,
      image: item.image,
      text: item.text,
    })),
    upcomingEvents: data.upcomingEvents.slice(0, 15).map((item) => {
      const { day, month } = item.date
        ? shortDate(item.date)
        : { day: item.day, month: item.month };
      return [day, month, item.title, item.text || item.meta || ""];
    }),
    toppers: {
      class10: data.toppers
        .filter((item) => item.className === "class10")
        .map((item) => [item.name, `${asPercent(item.score)}%`, item.message, item.image, item.batch]),
      class12: data.toppers
        .filter((item) => item.className === "class12")
        .map((item) => [item.name, `${asPercent(item.score)}%`, item.message, item.image, item.batch]),
    },
  };
}
