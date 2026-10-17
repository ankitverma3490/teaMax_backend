# ☕ TeaMax Café — REST API Backend

Production-ready backend built with **Node.js**, **Express**, **TypeScript**, and **Prisma ORM** backed by **PostgreSQL**.

---

## 🚀 Features

- **TypeScript Native**: Full end-to-end type safety with strict TypeScript configuration.
- **PostgreSQL & Prisma ORM**: Relational schema, migrations, auto-generated type-safe client, and relational queries.
- **Robust Security**:
  - `bcryptjs` password hashing (10 salt rounds)
  - `jsonwebtoken` (JWT) stateless authentication
  - Role-Based Access Control (`SUPER_ADMIN`, `ADMIN`, `MANAGER`, `STAFF`)
  - `helmet` security headers & configurable `cors` whitelist
- **Input Validation**: Runtime request validation powered by `zod` for body, query, and path parameters.
- **Centralized Error Handling**: Unified `AppError` class catching Prisma constraint errors, validation errors, and operational exceptions.
- **RESTful Architecture**:
  - Authentication & Profiles (`/api/v1/auth`)
  - Tea Categories (`/api/v1/categories`)
  - Menu Items & Dietary Tags (`/api/v1/menu-items`)
  - Café Outlets & Flagship Centres (`/api/v1/centres`)
  - Customer & Franchise Reviews (`/api/v1/reviews`)
  - Chai Culture Blogs (`/api/v1/blogs`)
  - Offers & Promotional Banners (`/api/v1/offers`)
  - Franchise Applications & Leads (`/api/v1/enquiries`)
  - Admin Analytics & Statistics (`/api/v1/dashboard`)
- **Developer Experience**: Hot reloading with `tsx watch` for lightning-fast development.

---

## 🛠️ Project Structure

```
TeaMax backend/
├── prisma/
│   ├── schema.prisma       # Prisma PostgreSQL models & enums
│   └── seed.ts             # Comprehensive database seed script
├── src/
│   ├── config/             # Config & env loader
│   │   └── env.ts
│   ├── controllers/        # Express route handlers
│   │   ├── auth.controller.ts
│   │   ├── category.controller.ts
│   │   ├── menuItem.controller.ts
│   │   ├── centre.controller.ts
│   │   ├── review.controller.ts
│   │   ├── blog.controller.ts
│   │   ├── offer.controller.ts
│   │   ├── enquiry.controller.ts
│   │   └── dashboard.controller.ts
│   ├── middleware/         # Auth, RBAC, Validation & Error middleware
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validate.middleware.ts
│   ├── routes/             # API v1 routes
│   │   ├── auth.routes.ts
│   │   ├── category.routes.ts
│   │   ├── menuItem.routes.ts
│   │   ├── centre.routes.ts
│   │   ├── review.routes.ts
│   │   ├── blog.routes.ts
│   │   ├── offer.routes.ts
│   │   ├── enquiry.routes.ts
│   │   ├── dashboard.routes.ts
│   │   └── index.ts
│   ├── schemas/            # Zod validation schemas
│   ├── services/           # Prisma data access layer
│   ├── types/              # TypeScript declarations & Express extensions
│   ├── utils/              # Prisma client, JWT, bcrypt, apiResponse helpers
│   ├── app.ts              # Express application factory
│   └── server.ts           # Server bootstrap & graceful shutdown
├── .env.example
├── .env
├── package.json
└── tsconfig.json
```

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and set your PostgreSQL connection string:

```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/teamax_db?schema=public"
JWT_SECRET="your_secure_random_jwt_secret_key"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:5173,http://localhost:3000,http://localhost:3001"
```

> **Note on PostgreSQL**: You can use a local PostgreSQL server, Docker (`docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres`), or any cloud provider like Supabase, Neon, or Railway.

### 3. Database Migration & Seeding
```bash
# Push schema or run migrations
npm run db:push

# Seed with default TeaMax sample data & admin account
npm run prisma:seed
```

**Default Admin Credentials created by seed:**
- **Email**: `admin@teamaxcafe.com`
- **Password**: `Password@123`

### 4. Run Development Server
```bash
npm run dev
```
The server will start at `http://localhost:5000`.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 📡 API Reference (`/api/v1`)

### Health Check
- `GET /api/health` — Probes server uptime and database connectivity.

### Authentication (`/api/v1/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Public | Register new staff / admin |
| `POST` | `/api/v1/auth/login` | Public | Login and receive Bearer JWT |
| `GET` | `/api/v1/auth/me` | Authenticated | Retrieve current user profile |
| `PUT` | `/api/v1/auth/profile` | Authenticated | Update user profile |
| `PUT` | `/api/v1/auth/change-password` | Authenticated | Change password |

### Categories (`/api/v1/categories`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/categories` | Public | List all categories (`?status=active`) |
| `GET` | `/api/v1/categories/:id` | Public | Get category by ID with menu items |
| `POST` | `/api/v1/categories` | Admin | Create category |
| `PUT` | `/api/v1/categories/:id` | Admin | Update category |
| `DELETE` | `/api/v1/categories/:id` | Admin | Delete category |

### Menu Items (`/api/v1/menu-items`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/menu-items` | Public | List menu items (`?categoryId=...&dietary=veg&isFeatured=true`) |
| `GET` | `/api/v1/menu-items/:id` | Public | Get single menu item |
| `POST` | `/api/v1/menu-items` | Admin/Manager | Create menu item |
| `PUT` | `/api/v1/menu-items/:id` | Admin/Manager | Update menu item |
| `DELETE` | `/api/v1/menu-items/:id` | Admin | Delete menu item |

### Centres / Outlets (`/api/v1/centres`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/centres` | Public | List all café outlets (`?city=Bengaluru`) |
| `GET` | `/api/v1/centres/:id` | Public | Get outlet by ID or slug |
| `POST` | `/api/v1/centres` | Admin | Create new outlet |
| `PUT` | `/api/v1/centres/:id` | Admin | Update outlet |
| `DELETE` | `/api/v1/centres/:id` | Admin | Delete outlet |

### Franchise Applications & Enquiries (`/api/v1/enquiries`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/v1/enquiries/franchise` | Public | Submit franchise application from website/popup |
| `GET` | `/api/v1/enquiries` | Admin/Manager | List all franchise leads (`?status=new`) |
| `GET` | `/api/v1/enquiries/:id` | Admin/Manager | Get lead details |
| `PATCH` | `/api/v1/enquiries/:id/status` | Admin/Manager | Update status (`contacted`, `approved`, etc.) |
| `DELETE` | `/api/v1/enquiries/:id` | Admin | Delete lead |

### Reviews (`/api/v1/reviews`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/reviews` | Public | List published reviews (`?reviewType=customer`) |
| `POST` | `/api/v1/reviews` | Public | Submit customer review |
| `PUT` | `/api/v1/reviews/:id` | Admin | Update review status or details |
| `DELETE` | `/api/v1/reviews/:id` | Admin | Delete review |

### Chai Culture Blogs (`/api/v1/blogs`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/blogs` | Public | List published articles (`?category=Chai+Culture`) |
| `GET` | `/api/v1/blogs/:id` | Public | Get article by ID or slug |
| `POST` | `/api/v1/blogs` | Admin/Manager | Create new blog post |
| `PUT` | `/api/v1/blogs/:id` | Admin/Manager | Update blog post |
| `DELETE` | `/api/v1/blogs/:id` | Admin | Delete blog post |

### Offers & Promos (`/api/v1/offers`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/offers` | Public | List active offers (`?activeOnly=true`) |
| `POST` | `/api/v1/offers` | Admin | Create promotion / voucher |
| `PUT` | `/api/v1/offers/:id` | Admin | Update offer |
| `DELETE` | `/api/v1/offers/:id` | Admin | Delete offer |

### Dashboard Analytics (`/api/v1/dashboard`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/dashboard/stats` | Admin/Manager | Overall metrics & totals |
| `GET` | `/api/v1/dashboard/activity` | Admin/Manager | Recent enquiries, reviews & notifications |

---

## 🛡️ Standard Response Format

All responses follow a predictable JSON structure:

```json
{
  "success": true,
  "message": "Items fetched successfully",
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 50,
    "total": 120,
    "totalPages": 3
  }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Validation Error",
  "error": [
    { "field": "email", "message": "Please provide a valid email address" }
  ]
}
```
