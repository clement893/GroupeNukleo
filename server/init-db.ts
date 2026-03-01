import { Request, Response } from "express";
import { getDb } from "./db";
import { sql } from "drizzle-orm";

export async function initDatabase(req: Request, res: Response) {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database connection failed" });
    }

    // Create role enum type
    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE role AS ENUM ('user', 'admin');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Create users table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        "openId" VARCHAR(64) NOT NULL UNIQUE,
        name TEXT,
        email VARCHAR(320),
        "loginMethod" VARCHAR(64),
        role role DEFAULT 'user' NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "lastSignedIn" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create leo_contacts table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS leo_contacts (
        id SERIAL PRIMARY KEY,
        email VARCHAR(320) NOT NULL,
        name VARCHAR(255),
        "conversationContext" TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create leo_sessions table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS leo_sessions (
        id SERIAL PRIMARY KEY,
        "sessionId" VARCHAR(64) NOT NULL UNIQUE,
        "pageContext" VARCHAR(50) NOT NULL,
        "messageCount" INTEGER DEFAULT 0 NOT NULL,
        "emailCaptured" INTEGER DEFAULT 0 NOT NULL,
        "capturedEmail" VARCHAR(320),
        "conversationDuration" INTEGER,
        "startedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "completedAt" TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create ai_assessments table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS ai_assessments (
        id SERIAL PRIMARY KEY,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "firstName" VARCHAR(100) NOT NULL,
        "lastName" VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        "jobTitle" VARCHAR(100),
        phone VARCHAR(50),
        "companySize" VARCHAR(50),
        industry VARCHAR(100),
        "globalScore" INTEGER NOT NULL,
        "strategyScore" INTEGER NOT NULL,
        "dataScore" INTEGER NOT NULL,
        "technologyScore" INTEGER NOT NULL,
        "talentScore" INTEGER NOT NULL,
        "governanceScore" INTEGER NOT NULL,
        "cultureScore" INTEGER NOT NULL,
        "maturityLevel" VARCHAR(50) NOT NULL,
        responses TEXT NOT NULL,
        "pdfDownloaded" INTEGER DEFAULT 0 NOT NULL,
        "pdfDownloadedAt" TIMESTAMP,
        "consultationRequested" INTEGER DEFAULT 0 NOT NULL,
        "consultationRequestedAt" TIMESTAMP,
        "utmSource" VARCHAR(100),
        "utmMedium" VARCHAR(100),
        "utmCampaign" VARCHAR(100)
      );
    `);

    // Create media_assets table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS media_assets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        "fileKey" VARCHAR(512) NOT NULL,
        url VARCHAR(1024) NOT NULL,
        size INTEGER NOT NULL,
        "mimeType" VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create agency_leads table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS agency_leads (
        id SERIAL PRIMARY KEY,
        email VARCHAR(320) NOT NULL,
        "companyName" VARCHAR(255),
        "agencySize" VARCHAR(50),
        "techNeeds" TEXT,
        budget VARCHAR(50),
        urgency VARCHAR(50),
        "qualificationScore" INTEGER,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create admin_users table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        "passwordHash" VARCHAR(255) NOT NULL,
        email VARCHAR(320) NOT NULL UNIQUE,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "lastLoginAt" TIMESTAMP
      );
    `);

    // Create loaders table (loading screen animations)
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS loaders (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        css_code TEXT NOT NULL,
        is_active BOOLEAN DEFAULT false NOT NULL,
        display_order INTEGER DEFAULT 0 NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create page_visibility table (which pages are visible on the site)
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS page_visibility (
        id SERIAL PRIMARY KEY,
        path VARCHAR(255) NOT NULL UNIQUE,
        "isVisible" BOOLEAN DEFAULT true NOT NULL,
        description TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_page_visibility_path ON page_visibility(path);
    `);

    // Create radar_technologies table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS radar_technologies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create radar_positions table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS radar_positions (
        id SERIAL PRIMARY KEY,
        "technologyId" INTEGER NOT NULL REFERENCES radar_technologies(id) ON DELETE CASCADE,
        date TIMESTAMP NOT NULL,
        "maturityScore" INTEGER NOT NULL CHECK ("maturityScore" >= 0 AND "maturityScore" <= 100),
        "impactScore" INTEGER NOT NULL CHECK ("impactScore" >= 0 AND "impactScore" <= 100),
        definition TEXT NOT NULL,
        "useCases" TEXT NOT NULL,
        "maturityLevel" VARCHAR(50) NOT NULL,
        "maturityJustification" TEXT NOT NULL,
        "impactBusiness" TEXT NOT NULL,
        "adoptionBarriers" TEXT NOT NULL,
        recommendations TEXT NOT NULL,
        "aiGeneratedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create index for faster queries
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_radar_positions_technology_date 
      ON radar_positions("technologyId", date DESC);
    `);

    // Create ai_news_subscribers table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS ai_news_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(320) NOT NULL UNIQUE,
        source VARCHAR(100) DEFAULT 'ai-trend-radar' NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create start_project_submissions table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS start_project_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(320) NOT NULL,
        company VARCHAR(255) NOT NULL,
        "projectType" VARCHAR(100) NOT NULL,
        budget VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create contact_messages table (formulaire de contact du site → admin Contact Messages)
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        email VARCHAR(320) NOT NULL,
        company VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        consent BOOLEAN DEFAULT true NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create testimonials table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        client VARCHAR(255) NOT NULL,
        contact VARCHAR(255) NOT NULL,
        title VARCHAR(255),
        company VARCHAR(255),
        text_en TEXT,
        text_fr TEXT,
        display_order INTEGER DEFAULT 0 NOT NULL,
        is_active BOOLEAN DEFAULT true NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create analytics table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS analytics (
        id SERIAL PRIMARY KEY,
        provider VARCHAR(50) NOT NULL UNIQUE,
        "isEnabled" BOOLEAN DEFAULT false NOT NULL,
        "trackingId" VARCHAR(255),
        "additionalConfig" TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create indexes for analytics table
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_analytics_provider ON analytics(provider);
    `);
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_analytics_enabled ON analytics("isEnabled");
    `);

    res.json({ 
      message: "Database initialized successfully! All tables created.",
      tables: [
        "users",
        "leo_contacts", 
        "leo_sessions",
        "ai_assessments",
        "media_assets",
        "agency_leads",
        "admin_users",
        "loaders",
        "page_visibility",
        "radar_technologies",
        "radar_positions",
        "ai_news_subscribers",
        "start_project_submissions",
        "contact_messages",
        "testimonials",
        "analytics"
      ]
    });
  } catch (error) {
    // Don't log full error details to avoid rate limiting
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    const errorCode = error instanceof Error && 'code' in error ? (error as any).code : null;
    
    // Log concise error message
    if (errorCode === 'ECONNREFUSED') {
      console.error("[Init DB] Error: Database connection refused");
    } else {
      console.error(`[Init DB] Error: ${errorMsg}`);
    }
    
    res.status(500).json({ 
      error: "Failed to initialize database",
      details: errorCode === 'ECONNREFUSED' ? "Database connection refused" : errorMsg
    });
  }
}
