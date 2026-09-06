# DevBhoomi School Website & Management SaaS

A modern, multi-tenant school management system with a dynamic public-facing website and role-based admin dashboards. Built for educational institutions, the platform combines a rich public frontend with a full-featured content management backend, subscription-based feature gating, and a developer super-admin console.

---

## Live Demo

[![Vercel](https://img.shields.io/badge/Live_Demo-000?logo=vercel&logoColor=white)](https://devbhoomischool.vercel.app)


---

## Screenshots

| Home Page | Admin Dashboard | Notice Board |
|:---:|:---:|:---:|
| TODO | TODO | TODO |


---

## Key Features

### Public Website
- **Dynamic Hero Carousel** — Full-width slideshow with school imagery and announcements
- **Notice Board** — Paginated, searchable notices with PDF preview and starred/pinned notices
- **Academic Toppers** — Showcase top performers for Class X & XII with photos, scores, and personal messages
- **News & Events Timeline** — Sliding timeline layout for upcoming events and recent news
- **Interactive Sections** — Leadership profiles, Teacher directory, Facilities showcase, Testimonials, FAQ accordion, and enquiry/contact form
- **SEO Optimized** — Open Graph tags, Twitter Cards, JSON-LD structured data (Schema.org School), sitemap, and robots.txt

### Admin Dashboard (`/admin/dashboard`)
- Full CRUD for Notices (with PDF upload to Cloudinary), News (with image upload), Events, and Toppers
- Enquiry inbox — view, mark as read, and manage admissions enquiries
- Star/unstar notices (max 4) with drag-free toggle
- Search and filter across all content types

### Developer Console (`/developer/dashboard`)
- Multi-tenant school management — create, activate/deactivate, and delete school tenants
- Subscription plan management — assign Basic / Standard / Premium / Custom plans
- Feature toggling — granular enable/disable of Notice Board, News, and Events per school
- Admin account management — create, enable/disable, and delete school administrators

### Security & Multi-Tenancy
- JWT authentication with HttpOnly cookies and Bearer token fallback
- Role-based access control (`admin` / `developer`)
- Feature-gating middleware restricts content modules based on school subscription plan
- Rate limiting, Helmet security headers, CORS whitelisting, MongoDB injection sanitization
- School-scoped data isolation — each admin only sees their own school's content

---

## Tech Stack

### Frontend

[![React](https://img.shields.io/badge/React_19-20232A?logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite_6-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![React Router](https://img.shields.io/badge/React_Router_7-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)](https://axios-http.com)

### Backend

[![Node.js](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express_5-000?logo=express&logoColor=white)](https://expressjs.com)
[![JWT](https://img.shields.io/badge/JWT-000?logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![bcryptjs](https://img.shields.io/badge/bcryptjs-3178C6?logo=npm&logoColor=white)](https://www.npmjs.com/package/bcryptjs)
[![Multer](https://img.shields.io/badge/Multer-FF6C37?logo=npm&logoColor=white)](https://github.com/expressjs/multer)

### Database & Storage

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Mongoose](https://img.shields.io/badge/Mongoose_9-880000?logo=mongoose&logoColor=white)](https://mongoosejs.com)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com)

### Security

[![Helmet](https://img.shields.io/badge/Helmet-000?logo=helmet&logoColor=white)](https://helmetjs.github.io)
[![Rate Limit](https://img.shields.io/badge/Express_Rate_Limit-000?logo=express&logoColor=white)](https://www.npmjs.com/package/express-rate-limit)

### Deployment

[![Vercel](https://img.shields.io/badge/Frontend_Vercel-000?logo=vercel&logoColor=white)](https://vercel.com)
[![Render](https://img.shields.io/badge/Backend_Render-46E3B7?logo=render&logoColor=white)](https://render.com)
[![MongoDB Atlas](https://img.shields.io/badge/Database_Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)

---

## Folder Structure

```
Schoolwebsite/
├── client/                        # React Frontend (Vite)
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── assets/
│   │   ├── gallery/               # Campus/event slideshow images
│   │   ├── teachers/              # Teacher profile photos
│   │   └── toppers/               # Topper profile photos
│   ├── src/
│   │   ├── components/            # Reusable UI widgets
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── FloatingSocialBar.jsx
│   │   │   ├── PdfModal.jsx
│   │   │   ├── SectionHeader.jsx
│   │   │   └── SimpleCarousel.jsx
│   │   ├── config/
│   │   │   └── schoolPlans.js
│   │   ├── data/
│   │   │   ├── adminAuth.js
│   │   │   ├── contentStore.js
│   │   │   └── siteData.js
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Landing page (14 sections)
│   │   │   ├── AboutPage.jsx
│   │   │   ├── AcademicsPage.jsx
│   │   │   ├── AdmissionsPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── EventsPage.jsx
│   │   │   ├── FacilitiesPage.jsx
│   │   │   ├── GalleryPage.jsx
│   │   │   ├── LeadershipPage.jsx
│   │   │   ├── NoticesPage.jsx
│   │   │   ├── PlaceholderPage.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── DeveloperDashboard.jsx
│   │   ├── services/
│   │   │   ├── api.js             # Axios instance + auth interceptor
│   │   │   ├── contentApi.js      # CRUD API functions
│   │   │   ├── developerApi.js    # Developer endpoints
│   │   │   └── tenant.js          # Tenant URL helper
│   │   ├── App.jsx                # Route definitions
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Tailwind v4 + custom design system
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json
│   └── package.json
│
├── server/                        # Express Backend
│   ├── config/
│   │   ├── db.js                  # MongoDB connection
│   │   ├── cloudinary.js          # Cloudinary SDK config
│   │   └── schoolPlans.js         # Plan/feature logic
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── developerController.js
│   │   ├── enquiryController.js
│   │   ├── eventController.js
│   │   ├── newsController.js
│   │   ├── noticeController.js
│   │   ├── publicController.js
│   │   └── topperController.js
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT verification, role/feature guards
│   │   ├── errorHandler.js        # Global error handler
│   │   └── uploadMiddleware.js    # Multer (image/pdf) config
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Enquiry.js
│   │   ├── NewsEvent.js
│   │   ├── Notice.js
│   │   ├── School.js
│   │   ├── Topper.js
│   │   └── UpcomingEvent.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── developerRoutes.js
│   │   ├── enquiryRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── newsRoutes.js
│   │   ├── noticeRoutes.js
│   │   ├── publicRoutes.js
│   │   └── topperRoutes.js
│   ├── scripts/
│   │   ├── createAdmin.js
│   │   ├── createDeveloper.js
│   │   └── resetAdmin.js
│   ├── utils/
│   │   ├── apiResponse.js
│   │   ├── asyncHandler.js
│   │   └── schoolScope.js
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── shared/
    └── schoolPlans.json           # Plan tiers & feature mapping
```

---

## Installation

### Prerequisites

- Node.js v18+
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- [Cloudinary](https://cloudinary.com) account (for image/PDF uploads)

### Setup

```bash
# Clone the repository
git clone https://github.com/manishkandari9/Schoolwebsite.git
cd Schoolwebsite

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

## Environment Variables

### Backend (`server/.env`)

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin credentials (for seeding)
ADMIN_EMAIL=admin@school.com
ADMIN_PASSWORD=your_secure_password

# Developer credentials (for seeding)
DEVELOPER_USERNAME=developer
DEVELOPER_PASSWORD=your_secure_password
```

### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Running the Application

### Start Backend

```bash
cd server
npm run dev     # Nodemon — hot reload on http://localhost:5000
```

### Seed Database Users

```bash
cd server
npm run seed:developer     # Creates/updates the developer account
node scripts/resetAdmin.js # Resets the admin account (uses ADMIN_EMAIL/PASSWORD from .env)
```

### Start Frontend

```bash
cd client
npm run dev     # Vite dev server on http://localhost:5173
```

---

## API Overview

### Authentication

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/login` | Public | Admin/developer login |
| POST | `/api/auth/logout` | Public | Clear session |
| GET | `/api/auth/me` | Protected | Current user info |

### Notices

| Method | Endpoint | Feature Gate | Description |
|--------|----------|-------------|-------------|
| GET | `/api/notices` | `notices` | List all notices |
| GET | `/api/notices/starred` | `notices` | Starred notices (top 4) |
| GET | `/api/notices/:id/pdf` | `notices` | Proxy PDF from Cloudinary |
| POST | `/api/notices` | `notices` | Create notice (PDF upload) |
| PUT | `/api/notices/:id` | `notices` | Update notice |
| PATCH | `/api/notices/:id/star` | `notices` | Toggle starred |
| DELETE | `/api/notices/:id` | `notices` | Delete notice |

### News

| Method | Endpoint | Feature Gate | Description |
|--------|----------|-------------|-------------|
| GET | `/api/news` | `news` | List news (paginated) |
| POST | `/api/news` | `news` | Create news (image upload) |
| PUT | `/api/news/:id` | `news` | Update news |
| DELETE | `/api/news/:id` | `news` | Delete news |

### Events

| Method | Endpoint | Feature Gate | Description |
|--------|----------|-------------|-------------|
| GET | `/api/events` | `events` | List upcoming events |
| POST | `/api/events` | `events` | Create event |
| PUT | `/api/events/:id` | `events` | Update event |
| DELETE | `/api/events/:id` | `events` | Delete event |

### Toppers

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/toppers` | List all toppers |
| POST | `/api/toppers` | Create topper |
| PUT | `/api/toppers/:id` | Update topper |
| DELETE | `/api/toppers/:id` | Delete topper |

### Enquiries

| Method | Endpoint | Rate Limit | Description |
|--------|----------|------------|-------------|
| POST | `/api/enquiries` | 5/15min | Submit admission enquiry |
| GET | `/api/enquiries` | — | List enquiries (protected) |
| PATCH | `/api/enquiries/:id/read` | — | Mark as read (protected) |
| DELETE | `/api/enquiries/:id` | — | Delete enquiry (protected) |

### Developer (requires `developer` role)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/developer/schools` | List school tenants |
| POST | `/api/developer/schools` | Create school |
| PATCH | `/api/developer/schools/:id` | Update school |
| DELETE | `/api/developer/schools/:id` | Delete school + related data |
| GET | `/api/developer/admins` | List all admins |
| POST | `/api/developer/schools/:schoolId/admins` | Create admin for school |
| PATCH | `/api/developer/admins/:id` | Update admin |
| DELETE | `/api/developer/admins/:id` | Delete admin |

### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/public/school` | Aggregated public data for the active school |
| GET | `/api/health` | Server health check |

---

## Real-Time Features

> **Not yet implemented.** The current architecture uses standard REST API polling. Planned real-time features:
>
> - **Socket.io** for live notice board updates and enquiry notifications in the admin dashboard
> - **Toast notifications** when new enquiries are submitted
> - **Live sync** of notices/news/events across admin sessions

---

## Project Workflow

1. **Public visitors** browse the school website (Home, About, Academics, Admissions, etc.). Dynamic content (notices, news, events, toppers) is fetched from the backend API via Axios and rendered with React.

2. **School administrators** log in via `/admin/login` and manage content through the Admin Dashboard — creating notices (with PDF uploads), publishing news (with images), scheduling events, and managing topper profiles. All actions are protected by JWT authentication and feature-gating middleware.

3. **The Developer** (super-admin) accesses `/developer/dashboard` to manage school tenants, assign subscription plans, toggle features, and manage admin accounts across all schools.

4. **Data flow:** Every content model has a `school` reference field, enforcing multi-tenant isolation. The `schoolScope.js` utility ensures that queries are always scoped to the authenticated admin's school (or the active school for public requests).

5. **Subscription gating:** The `requireFeature` middleware checks the school's plan-defined features array before allowing access to protected routes. Developer accounts bypass this check. Plans are defined in `shared/schoolPlans.json`.

---

## Deployment

### Frontend → Vercel

```bash
cd client

# Build static assets
npm run build

# Deploy (requires Vercel CLI or GitHub integration)
vercel --prod
```

The `client/vercel.json` file contains an SPA rewrite rule to route all paths through `index.html`. Set the environment variable `VITE_API_URL` to your production backend URL in the Vercel dashboard.

### Backend → Render

1. Push the `server/` directory to a new GitHub repository (or use the monorepo root).
2. On [Render Dashboard](https://dashboard.render.com), create a **New Web Service**.
3. Connect your repository, set:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add all environment variables from `server/.env` (use production values).
5. Deploy.

### Database → MongoDB Atlas

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Whitelist Render's IP range (or `0.0.0.0/0` for development).
3. Copy the connection string and set it as `MONGO_URI` in your Render environment variables.

> **TODO:** Add a Dockerfile and docker-compose.yml for containerized deployment.

---

## Future Improvements

- [ ] **Real-time notifications** via Socket.io for admin dashboard updates
- [ ] **Email notifications** — notify admins of new enquiries via Nodemailer
- [ ] **Student/Parent portal** with individual logins, attendance tracking, and grade reports
- [ ] **Payment gateway** integration for fee collection (Razorpay / Stripe)
- [ ] **File manager** — browse, organize, and reuse uploaded PDFs/images across modules
- [ ] **Dark mode** toggle for the public website
- [ ] **Multi-language support** (i18n)
- [ ] **Analytics dashboard** — page views, enquiry trends, user activity
- [ ] **Docker support** — Dockerfile and docker-compose for one-command setup
- [ ] **CI/CD pipeline** — automated testing and deployment with GitHub Actions

---

## Author

**Your Name**  
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/yourusername)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/yourusername)

> **TODO:** Replace the GitHub and LinkedIn links with your actual profiles.

---

## License

This project is licensed under the [MIT License](LICENSE).
