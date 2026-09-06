const express = require("express");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const newsRoutes = require("./routes/newsRoutes");
const eventRoutes = require("./routes/eventRoutes");
const developerRoutes = require("./routes/developerRoutes");
const publicRoutes = require("./routes/publicRoutes");
const topperRoutes = require("./routes/topperRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");

const app = express();

if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "frame-ancestors": ["'self'", "https://vanividyamandir.vercel.app/"],
      },
    },
  }),
);

const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://vanividyamandir.vercel.app",
  "http://localhost:5173",
].filter(Boolean);

const hostFrom = (value = "") => {
  try {
    return new URL(
      value.includes("://") ? value : `https://${value}`,
    ).hostname.toLowerCase();
  } catch {
    return "";
  }
};

const allowedHosts = [
  process.env.CLIENT_DOMAIN,
  process.env.PUBLIC_BASE_DOMAIN,
  process.env.CLIENT_URL,
  "vanividyamandir.com",
]
  .map(hostFrom)
  .filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (allowedOrigins.includes(origin)) return true;
  const host = hostFrom(origin);
  return (
    host.endsWith(".vercel.app") ||
    allowedHosts.some(
      (allowed) => host === allowed || host.endsWith(`.${allowed}`),
    )
  );
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (isAllowedOrigin(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  next();
});

app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) =>
      process.env.NODE_ENV === "development" ||
      req.method === "OPTIONS" ||
      req.path.startsWith("/auth/"),
    message: { success: false, message: "Too many requests" },
  }),
);

app.use("/api/public", rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests" },
}));

app.use((req, res, next) => {
  if (/^\/api\/(public|notices|news|events|toppers)/.test(req.path) && req.method === "GET") {
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=120");
  }
  next();
});

app.use(compression({ level: 6, threshold: 1024 }));

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/toppers", topperRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/developer", developerRoutes);
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running." });
});

app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

app.use(errorHandler);
module.exports = app;
