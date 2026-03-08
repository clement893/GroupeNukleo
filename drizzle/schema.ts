import { boolean, integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */

// Define enum for user roles
export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// LEO Contact table for email capture
export const leoContacts = pgTable("leo_contacts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 255 }),
  conversationContext: text("conversationContext"), // Store last message or context
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type LeoContact = typeof leoContacts.$inferSelect;
export type InsertLeoContact = typeof leoContacts.$inferInsert;

// LEO Sessions table for analytics tracking
export const leoSessions = pgTable("leo_sessions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  sessionId: varchar("sessionId", { length: 64 }).notNull().unique(), // UUID for session
  pageContext: varchar("pageContext", { length: 50 }).notNull(), // home, agencies, services, etc.
  messageCount: integer("messageCount").default(0).notNull(), // Number of messages exchanged
  emailCaptured: integer("emailCaptured").default(0).notNull(), // 0 or 1
  capturedEmail: varchar("capturedEmail", { length: 320 }), // Email if captured
  conversationDuration: integer("conversationDuration"), // Duration in seconds
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type LeoSession = typeof leoSessions.$inferSelect;
export type InsertLeoSession = typeof leoSessions.$inferInsert;

// AI Readiness Assessment table
export const aiAssessments = pgTable("ai_assessments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),

  // User Info
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  jobTitle: varchar("jobTitle", { length: 100 }),
  phone: varchar("phone", { length: 50 }),

  // Context
  companySize: varchar("companySize", { length: 50 }),
  industry: varchar("industry", { length: 100 }),

  // Scores
  globalScore: integer("globalScore").notNull(),
  strategyScore: integer("strategyScore").notNull(),
  dataScore: integer("dataScore").notNull(),
  technologyScore: integer("technologyScore").notNull(),
  talentScore: integer("talentScore").notNull(),
  governanceScore: integer("governanceScore").notNull(),
  cultureScore: integer("cultureScore").notNull(),
  maturityLevel: varchar("maturityLevel", { length: 50 }).notNull(),

  // Responses (JSON)
  responses: text("responses").notNull(),

  // Tracking
  pdfDownloaded: integer("pdfDownloaded").default(0).notNull(),
  pdfDownloadedAt: timestamp("pdfDownloadedAt"),
  consultationRequested: integer("consultationRequested").default(0).notNull(),
  consultationRequestedAt: timestamp("consultationRequestedAt"),

  // Marketing
  utmSource: varchar("utmSource", { length: 100 }),
  utmMedium: varchar("utmMedium", { length: 100 }),
  utmCampaign: varchar("utmCampaign", { length: 100 }),
});

export type AiAssessment = typeof aiAssessments.$inferSelect;
export type InsertAiAssessment = typeof aiAssessments.$inferInsert;

// Media Assets table for Media Center
export const mediaAssets = pgTable("media_assets", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  fileKey: varchar("fileKey", { length: 512 }).notNull(),
  url: varchar("url", { length: 1024 }).notNull(),
  size: integer("size").notNull(), // in bytes
  mimeType: varchar("mimeType", { length: 100 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(), // 'logo', 'brand', 'photo', 'screenshot'
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type MediaAsset = typeof mediaAssets.$inferSelect;
export type InsertMediaAsset = typeof mediaAssets.$inferInsert;

// Agency Leads table for qualification chatbot
export const agencyLeads = pgTable("agency_leads", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 320 }).notNull(),
  companyName: varchar("companyName", { length: 255 }),
  agencySize: varchar("agencySize", { length: 50 }), // '1-5', '6-20', '21-50', '50+'
  techNeeds: text("techNeeds"), // JSON array of tech needs
  budget: varchar("budget", { length: 50 }), // '<10k', '10-50k', '50-100k', '100k+'
  urgency: varchar("urgency", { length: 50 }), // 'immediate', '1-3 months', '3-6 months', 'exploring'
  qualificationScore: integer("qualificationScore"), // 0-100 based on answers
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type AgencyLead = typeof agencyLeads.$inferSelect;
export type InsertAgencyLead = typeof agencyLeads.$inferInsert;

// Admin Users table for separate admin authentication
export const adminUsers = pgTable("admin_users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  lastLoginAt: timestamp("lastLoginAt"),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;

// Loaders table for managing loading screen animations
export const loaders = pgTable("loaders", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: text("description"),
  cssCode: text("css_code").notNull(), // HTML/CSS code for the loader
  isActive: boolean("is_active").default(false).notNull(), // Whether this loader is in rotation
  displayOrder: integer("display_order").default(0).notNull(), // Order in rotation
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Loader = typeof loaders.$inferSelect;
export type InsertLoader = typeof loaders.$inferInsert;

// Testimonials table for client testimonials with multilingual support
export const testimonials = pgTable("testimonials", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  client: varchar("client", { length: 255 }).notNull(),
  contact: varchar("contact", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  textEn: text("text_en").notNull(), // English testimonial text
  textFr: text("text_fr").notNull(), // French testimonial text
  displayOrder: integer("display_order").default(0).notNull(), // Order for display
  isActive: boolean("is_active").default(true).notNull(), // Whether to show this testimonial
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

// AI Trend Radar tables
export const radarTechnologies = pgTable("radar_technologies", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull().unique(), // e.g., "Agentic AI", "Multimodal LLMs"
  slug: varchar("slug", { length: 255 }).notNull().unique(), // e.g., "agentic-ai"
  description: text("description").notNull(), // Definition in plain language
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type RadarTechnology = typeof radarTechnologies.$inferSelect;
export type InsertRadarTechnology = typeof radarTechnologies.$inferInsert;

// Radar positions - stores the position of each technology at a specific date
export const radarPositions = pgTable("radar_positions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  technologyId: integer("technologyId").notNull(), // FK to radar_technologies
  date: timestamp("date").notNull(), // Date of this position snapshot
  maturityScore: integer("maturityScore").notNull(), // 0-100 (0 = Émergent, 100 = Établi)
  impactScore: integer("impactScore").notNull(), // 0-100 (0 = Faible, 100 = Élevé)
  // Detailed content generated by AI
  definition: text("definition").notNull(), // 2-3 paragraphs definition
  useCases: text("useCases").notNull(), // JSON array of use cases with examples
  maturityLevel: varchar("maturityLevel", { length: 50 }).notNull(), // "Émergent", "Maturité Moyenne", "Établi"
  maturityJustification: text("maturityJustification").notNull(), // Why this maturity level
  impactBusiness: text("impactBusiness").notNull(), // Quantified business impact
  adoptionBarriers: text("adoptionBarriers").notNull(), // JSON array of barriers
  recommendations: text("recommendations").notNull(), // JSON object with recommendations by maturity level
  aiGeneratedAt: timestamp("aiGeneratedAt").defaultNow().notNull(), // When AI generated this content
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type RadarPosition = typeof radarPositions.$inferSelect;
export type InsertRadarPosition = typeof radarPositions.$inferInsert;

// AI News Newsletter Subscribers table
export const aiNewsSubscribers = pgTable("ai_news_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  source: varchar("source", { length: 100 }).default("ai-trend-radar").notNull(), // Track where subscription came from
  consent: boolean("consent").default(true).notNull(), // User consent to receive emails
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const startProjectSubmissions = pgTable("start_project_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  projectType: varchar("projectType", { length: 100 }).notNull(),
  budget: varchar("budget", { length: 50 }).notNull(),
  description: text("description").notNull(),
  consent: boolean("consent").default(true).notNull(), // User consent to be contacted
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type StartProjectSubmission = typeof startProjectSubmissions.$inferSelect;
export type InsertStartProjectSubmission = typeof startProjectSubmissions.$inferInsert;

export type AINewsSubscriber = typeof aiNewsSubscribers.$inferSelect;
export type InsertAINewsSubscriber = typeof aiNewsSubscribers.$inferInsert;

// Contact Messages table
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  message: text("message").notNull(),
  consent: boolean("consent").default(true).notNull(), // User consent to be contacted
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;

// Page Visibility table for managing which pages are visible on the site
export const pageVisibility = pgTable("page_visibility", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  path: varchar("path", { length: 255 }).notNull().unique(), // e.g., "/manifesto", "/projects", "/fr/manifesto"
  isVisible: boolean("isVisible").default(true).notNull(), // Whether the page is visible
  description: text("description"), // Optional description of the page
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type PageVisibility = typeof pageVisibility.$inferSelect;
export type InsertPageVisibility = typeof pageVisibility.$inferInsert;

// Page texts table for managing all site copy in EN/FR (overrides or supplements locale JSON)
export const pageTexts = pgTable("page_texts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  key: varchar("key", { length: 512 }).notNull().unique(), // e.g. "common.loading", "nav.home"
  textEn: text("text_en").notNull(), // English text
  textFr: text("text_fr").notNull(), // French text
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type PageText = typeof pageTexts.$inferSelect;
export type InsertPageText = typeof pageTexts.$inferInsert;

// Analytics Configuration table for managing tracking scripts
export const analytics = pgTable("analytics", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  provider: varchar("provider", { length: 50 }).notNull().unique(), // 'google-analytics', 'facebook-pixel', 'linkedin-insight'
  isEnabled: boolean("isEnabled").default(false).notNull(), // Whether this analytics provider is active
  trackingId: varchar("trackingId", { length: 255 }), // GA4 Measurement ID, Facebook Pixel ID, LinkedIn Partner ID
  additionalConfig: text("additionalConfig"), // JSON string for additional configuration
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = typeof analytics.$inferInsert;

// Carousel logos (homepage / logos strip) - persisted in DB so they survive deploys
export const carouselLogos = pgTable("carousel_logos", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  src: varchar("src", { length: 512 }).notNull(),
  alt: varchar("alt", { length: 255 }).notNull(),
  url: varchar("url", { length: 512 }).default("").notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type CarouselLogo = typeof carouselLogos.$inferSelect;
export type InsertCarouselLogo = typeof carouselLogos.$inferInsert;

// Site media (union video, press release) - URLs stored when using R2
export const siteMedia = pgTable("site_media", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  key: varchar("key", { length: 64 }).notNull().unique(), // 'union_video' | 'press_release' | 'hero_cover'
  url: varchar("url", { length: 1024 }).notNull(),
  metadata: text("metadata"), // JSON e.g. {"objectPosition": "center top"} for hero_cover
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type SiteMedia = typeof siteMedia.$inferSelect;
export type InsertSiteMedia = typeof siteMedia.$inferInsert;
