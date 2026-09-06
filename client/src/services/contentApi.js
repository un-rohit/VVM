// client/src/services/contentApi.js
import api from "./api.js";

const formRequest = (body) => ({
  headers:
    body?.constructor?.name === "FormData"
      ? { "Content-Type": "multipart/form-data" }
      : undefined,
});

export const directPdfUrl = (notice) => {
  const url = String(notice?.pdfUrl || "").trim();
  if (!url) return "";
  if (/^https?:\/\//i.test(url) || url.startsWith("data:"))
    return encodeURI(url);
  const baseUrl = String(api.defaults.baseURL || "")
    .trim()
    .replace(/\/api\/?$/, "");
  return encodeURI(baseUrl + url);
};

export const getPublicSchool = () =>
  api.get("/public/school").then((r) => r.data.data);

// NOTICES
export const getStarredNotices = () =>
  api.get("/notices/starred").then((r) => r.data.data);
export const getAllNotices = () => api.get("/notices").then((r) => r.data.data);
export const toggleNoticeStar = (id) =>
  api.patch(`/notices/${id}/star`).then((r) => r.data.data);
export const deleteNotice = (id) =>
  api.delete(`/notices/${id}`).then((r) => r.data);
export const updateNotice = (id, body) =>
  api.put(`/notices/${id}`, body, formRequest(body)).then((r) => r.data.data);
export const createNotice = (body) =>
  api.post("/notices", body, formRequest(body)).then((r) => r.data.data);

// NEWS
export const getLatestNews = (limit = 4) =>
  api.get(`/news?limit=${limit}`).then((r) => r.data.data);
export const getAllNews = () => api.get("/news").then((r) => r.data.data);
export const updateNews = (id, body) =>
  api.put(`/news/${id}`, body, formRequest(body)).then((r) => r.data.data);
export const deleteNews = (id) => api.delete(`/news/${id}`).then((r) => r.data);
export const createNews = (body) =>
  api.post("/news", body, formRequest(body)).then((r) => r.data.data);

// UPCOMING EVENTS
export const getUpcomingEvents = (limit = 15) =>
  api.get(`/events?limit=${limit}`).then((r) => r.data.data);
export const getAllEvents = () => api.get("/events").then((r) => r.data.data);
export const createEvent = (body) =>
  api.post("/events", body).then((r) => r.data.data);
export const updateEvent = (id, body) =>
  api.put(`/events/${id}`, body).then((r) => r.data.data);
export const deleteEvent = (id) =>
  api.delete(`/events/${id}`).then((r) => r.data);

// TOPPERS
export const getAllToppers = () => api.get("/toppers").then((r) => r.data.data);
export const createTopper = (body) =>
  api.post("/toppers", body).then((r) => r.data.data);
export const updateTopper = (id, body) =>
  api.put(`/toppers/${id}`, body).then((r) => r.data.data);
export const deleteTopper = (id) =>
  api.delete(`/toppers/${id}`).then((r) => r.data);

// ENQUIRIES
export const submitEnquiry = (body) =>
  api.post("/enquiries", body).then((r) => r.data);
export const getAllEnquiries = () =>
  api.get("/enquiries").then((r) => r.data.data);
export const markEnquiryRead = (id) =>
  api.patch(`/enquiries/${id}/read`).then((r) => r.data.data);
export const deleteEnquiry = (id) =>
  api.delete(`/enquiries/${id}`).then((r) => r.data);
