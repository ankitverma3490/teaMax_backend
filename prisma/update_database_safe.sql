-- Safe Idempotent Database Update Script for TeaMax PostgreSQL
-- Run this directly in psql, pgAdmin, or on the server.

-- 1. Ensure Schema
CREATE SCHEMA IF NOT EXISTS "public";

-- 2. Create Role Enum if not exists
DO $$ BEGIN
  CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'MANAGER', 'STAFF');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. Users Table & New RBAC Columns
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STAFF',
    "phone" TEXT,
    "avatar" TEXT,
    "department" TEXT,
    "designation" TEXT,
    "permissions" JSONB,
    "timezone" TEXT DEFAULT 'Asia/Kolkata',
    "currency" TEXT DEFAULT '₹ INR',
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- If users table already existed, add new columns safely
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "designation" TEXT;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "permissions" JSONB;
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");

-- 4. Categories Table
CREATE TABLE IF NOT EXISTS "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "image" TEXT,
    "description" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "categories_slug_key" ON "categories"("slug");

-- 5. Menu Items Table
CREATE TABLE IF NOT EXISTS "menu_items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "availability" TEXT NOT NULL DEFAULT 'in_stock',
    "dietary" TEXT NOT NULL DEFAULT 'veg',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 4.8,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "menu_items_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "menu_items_categoryId_idx" ON "menu_items"("categoryId");

-- 6. Centres Table
CREATE TABLE IF NOT EXISTS "centres" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "coverImage" TEXT,
    "galleryImages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "shortDescription" TEXT,
    "detailedDescription" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "country" TEXT NOT NULL DEFAULT 'India',
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "locality" TEXT,
    "address" TEXT NOT NULL,
    "postalCode" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "contactNumber" TEXT,
    "email" TEXT,
    "whatsappNumber" TEXT,
    "websiteUrl" TEXT,
    "mapUrl" TEXT,
    "googleMapUrl" TEXT,
    "swiggyUrl" TEXT,
    "zomatoUrl" TEXT,
    "timings" JSONB,
    "holidayHours" TEXT,
    "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 4.8,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "facilities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "faqs" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "centres_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "centres_slug_key" ON "centres"("slug");
CREATE INDEX IF NOT EXISTS "centres_city_idx" ON "centres"("city");

-- 7. Reviews Table
CREATE TABLE IF NOT EXISTS "reviews" (
    "id" TEXT NOT NULL,
    "reviewerName" TEXT NOT NULL,
    "reviewerAvatar" TEXT,
    "reviewText" TEXT NOT NULL,
    "starRating" INTEGER NOT NULL DEFAULT 5,
    "reviewerRole" TEXT,
    "relatedCentreId" TEXT,
    "relatedCentreName" TEXT,
    "reviewType" TEXT NOT NULL DEFAULT 'customer',
    "categoryId" TEXT DEFAULT 'customer',
    "viewMoreLink" TEXT,
    "viewMoreLinkName" TEXT DEFAULT 'Read more',
    "displayOn" TEXT[] DEFAULT ARRAY['homepage']::TEXT[],
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'published',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "reviews_relatedCentreId_fkey" FOREIGN KEY ("relatedCentreId") REFERENCES "centres"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "reviews_relatedCentreId_idx" ON "reviews"("relatedCentreId");

-- 8. Blogs Table
CREATE TABLE IF NOT EXISTS "blogs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "coverImage" TEXT,
    "category" TEXT NOT NULL DEFAULT 'Chai Culture',
    "excerpt" TEXT,
    "authorId" TEXT,
    "author" TEXT,
    "authorDesignation" TEXT,
    "authorAvatar" TEXT,
    "readingTime" TEXT DEFAULT '4 min read',
    "content" TEXT NOT NULL,
    "seoTitle" TEXT,
    "metaDescription" TEXT,
    "seoKeywords" TEXT,
    "publishDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'published',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "blogs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "blogs_slug_key" ON "blogs"("slug");

-- 9. Offers Table
CREATE TABLE IF NOT EXISTS "offers" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bannerImage" TEXT,
    "shortDescription" TEXT,
    "detailedDescription" TEXT,
    "applicableCategory" TEXT,
    "discountType" TEXT NOT NULL DEFAULT 'percentage',
    "discountValue" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "promoCode" TEXT,
    "applicableCentres" TEXT NOT NULL DEFAULT 'all',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- 10. Franchise Enquiries Table
CREATE TABLE IF NOT EXISTS "franchise_enquiries" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "franchise_enquiries_pkey" PRIMARY KEY ("id")
);

-- 11. Notifications Table
CREATE TABLE IF NOT EXISTS "notifications" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'info',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- 12. Site Settings Table
CREATE TABLE IF NOT EXISTS "site_settings" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("key")
);

-- 13. Franchise Opportunities Table
CREATE TABLE IF NOT EXISTS "franchise_opportunities" (
    "id" TEXT NOT NULL,
    "franchiseName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "isFeatured" BOOLEAN NOT NULL DEFAULT true,
    "minBudget" TEXT DEFAULT '₹3.69 Lakhs*',
    "spaceRequired" TEXT DEFAULT '100 – 200 sq.ft',
    "timelineDays" TEXT DEFAULT '25 – 30 Days',
    "royalty" TEXT DEFAULT 'Zero Royalty (100% Profits to You)',
    "margins" TEXT DEFAULT '55% – 65% Gross Margins',
    "primaryImage" TEXT,
    "shortDescription" TEXT,
    "description" TEXT,
    "editorialLead" TEXT,
    "editorialBody" TEXT,
    "primeLocations" JSONB DEFAULT '[]',
    "faqs" JSONB DEFAULT '[]',
    "seoTitle" TEXT,
    "metaDescription" TEXT,
    "seoKeywords" TEXT,
    "applicantCount" INTEGER NOT NULL DEFAULT 0,
    "inquiries" JSONB DEFAULT '[]',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "franchise_opportunities_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "franchise_opportunities_slug_key" ON "franchise_opportunities"("slug");
CREATE INDEX IF NOT EXISTS "franchise_opportunities_city_idx" ON "franchise_opportunities"("city");
CREATE INDEX IF NOT EXISTS "franchise_opportunities_state_idx" ON "franchise_opportunities"("state");
CREATE INDEX IF NOT EXISTS "franchise_opportunities_status_idx" ON "franchise_opportunities"("status");
