var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc7) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc7 = __getOwnPropDesc(from, key)) || desc7.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// shared/const.ts
var COOKIE_NAME, ONE_YEAR_MS, AXIOS_TIMEOUT_MS, UNAUTHED_ERR_MSG, NOT_ADMIN_ERR_MSG;
var init_const = __esm({
  "shared/const.ts"() {
    "use strict";
    COOKIE_NAME = "app_session_id";
    ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
    AXIOS_TIMEOUT_MS = 3e4;
    UNAUTHED_ERR_MSG = "Please login (10001)";
    NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";
  }
});

// drizzle/schema.ts
var schema_exports = {};
__export(schema_exports, {
  adminUsers: () => adminUsers,
  agencyLeads: () => agencyLeads,
  aiAssessments: () => aiAssessments,
  aiNewsSubscribers: () => aiNewsSubscribers,
  analytics: () => analytics,
  carouselLogos: () => carouselLogos,
  contactMessages: () => contactMessages,
  leoContacts: () => leoContacts,
  leoSessions: () => leoSessions,
  loaders: () => loaders,
  mediaAssets: () => mediaAssets,
  pageTexts: () => pageTexts,
  pageVisibility: () => pageVisibility,
  radarPositions: () => radarPositions,
  radarTechnologies: () => radarTechnologies,
  roleEnum: () => roleEnum,
  startProjectSubmissions: () => startProjectSubmissions,
  testimonials: () => testimonials,
  users: () => users
});
import { boolean, integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
var roleEnum, users, leoContacts, leoSessions, aiAssessments, mediaAssets, agencyLeads, adminUsers, loaders, testimonials, radarTechnologies, radarPositions, aiNewsSubscribers, startProjectSubmissions, contactMessages, pageVisibility, pageTexts, analytics, carouselLogos;
var init_schema = __esm({
  "drizzle/schema.ts"() {
    "use strict";
    roleEnum = pgEnum("role", ["user", "admin"]);
    users = pgTable("users", {
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
      lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
    });
    leoContacts = pgTable("leo_contacts", {
      id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
      email: varchar("email", { length: 320 }).notNull(),
      name: varchar("name", { length: 255 }),
      conversationContext: text("conversationContext"),
      // Store last message or context
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    leoSessions = pgTable("leo_sessions", {
      id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
      sessionId: varchar("sessionId", { length: 64 }).notNull().unique(),
      // UUID for session
      pageContext: varchar("pageContext", { length: 50 }).notNull(),
      // home, agencies, services, etc.
      messageCount: integer("messageCount").default(0).notNull(),
      // Number of messages exchanged
      emailCaptured: integer("emailCaptured").default(0).notNull(),
      // 0 or 1
      capturedEmail: varchar("capturedEmail", { length: 320 }),
      // Email if captured
      conversationDuration: integer("conversationDuration"),
      // Duration in seconds
      startedAt: timestamp("startedAt").defaultNow().notNull(),
      completedAt: timestamp("completedAt"),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    aiAssessments = pgTable("ai_assessments", {
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
      utmCampaign: varchar("utmCampaign", { length: 100 })
    });
    mediaAssets = pgTable("media_assets", {
      id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
      name: varchar("name", { length: 255 }).notNull(),
      fileKey: varchar("fileKey", { length: 512 }).notNull(),
      url: varchar("url", { length: 1024 }).notNull(),
      size: integer("size").notNull(),
      // in bytes
      mimeType: varchar("mimeType", { length: 100 }).notNull(),
      category: varchar("category", { length: 50 }).notNull(),
      // 'logo', 'brand', 'photo', 'screenshot'
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    agencyLeads = pgTable("agency_leads", {
      id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
      email: varchar("email", { length: 320 }).notNull(),
      companyName: varchar("companyName", { length: 255 }),
      agencySize: varchar("agencySize", { length: 50 }),
      // '1-5', '6-20', '21-50', '50+'
      techNeeds: text("techNeeds"),
      // JSON array of tech needs
      budget: varchar("budget", { length: 50 }),
      // '<10k', '10-50k', '50-100k', '100k+'
      urgency: varchar("urgency", { length: 50 }),
      // 'immediate', '1-3 months', '3-6 months', 'exploring'
      qualificationScore: integer("qualificationScore"),
      // 0-100 based on answers
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    adminUsers = pgTable("admin_users", {
      id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
      username: varchar("username", { length: 100 }).notNull().unique(),
      passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
      email: varchar("email", { length: 320 }).notNull().unique(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      lastLoginAt: timestamp("lastLoginAt")
    });
    loaders = pgTable("loaders", {
      id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
      name: varchar("name", { length: 255 }).notNull().unique(),
      description: text("description"),
      cssCode: text("css_code").notNull(),
      // HTML/CSS code for the loader
      isActive: boolean("is_active").default(false).notNull(),
      // Whether this loader is in rotation
      displayOrder: integer("display_order").default(0).notNull(),
      // Order in rotation
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    testimonials = pgTable("testimonials", {
      id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
      client: varchar("client", { length: 255 }).notNull(),
      contact: varchar("contact", { length: 255 }).notNull(),
      title: varchar("title", { length: 255 }).notNull(),
      company: varchar("company", { length: 255 }).notNull(),
      textEn: text("text_en").notNull(),
      // English testimonial text
      textFr: text("text_fr").notNull(),
      // French testimonial text
      displayOrder: integer("display_order").default(0).notNull(),
      // Order for display
      isActive: boolean("is_active").default(true).notNull(),
      // Whether to show this testimonial
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    radarTechnologies = pgTable("radar_technologies", {
      id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
      name: varchar("name", { length: 255 }).notNull().unique(),
      // e.g., "Agentic AI", "Multimodal LLMs"
      slug: varchar("slug", { length: 255 }).notNull().unique(),
      // e.g., "agentic-ai"
      description: text("description").notNull(),
      // Definition in plain language
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    radarPositions = pgTable("radar_positions", {
      id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
      technologyId: integer("technologyId").notNull(),
      // FK to radar_technologies
      date: timestamp("date").notNull(),
      // Date of this position snapshot
      maturityScore: integer("maturityScore").notNull(),
      // 0-100 (0 = Émergent, 100 = Établi)
      impactScore: integer("impactScore").notNull(),
      // 0-100 (0 = Faible, 100 = Élevé)
      // Detailed content generated by AI
      definition: text("definition").notNull(),
      // 2-3 paragraphs definition
      useCases: text("useCases").notNull(),
      // JSON array of use cases with examples
      maturityLevel: varchar("maturityLevel", { length: 50 }).notNull(),
      // "Émergent", "Maturité Moyenne", "Établi"
      maturityJustification: text("maturityJustification").notNull(),
      // Why this maturity level
      impactBusiness: text("impactBusiness").notNull(),
      // Quantified business impact
      adoptionBarriers: text("adoptionBarriers").notNull(),
      // JSON array of barriers
      recommendations: text("recommendations").notNull(),
      // JSON object with recommendations by maturity level
      aiGeneratedAt: timestamp("aiGeneratedAt").defaultNow().notNull(),
      // When AI generated this content
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    aiNewsSubscribers = pgTable("ai_news_subscribers", {
      id: serial("id").primaryKey(),
      email: varchar("email", { length: 320 }).notNull().unique(),
      source: varchar("source", { length: 100 }).default("ai-trend-radar").notNull(),
      // Track where subscription came from
      consent: boolean("consent").default(true).notNull(),
      // User consent to receive emails
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    startProjectSubmissions = pgTable("start_project_submissions", {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      email: varchar("email", { length: 320 }).notNull(),
      company: varchar("company", { length: 255 }).notNull(),
      projectType: varchar("projectType", { length: 100 }).notNull(),
      budget: varchar("budget", { length: 50 }).notNull(),
      description: text("description").notNull(),
      consent: boolean("consent").default(true).notNull(),
      // User consent to be contacted
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    contactMessages = pgTable("contact_messages", {
      id: serial("id").primaryKey(),
      firstName: varchar("firstName", { length: 255 }).notNull(),
      lastName: varchar("lastName", { length: 255 }).notNull(),
      email: varchar("email", { length: 320 }).notNull(),
      company: varchar("company", { length: 255 }).notNull(),
      message: text("message").notNull(),
      consent: boolean("consent").default(true).notNull(),
      // User consent to be contacted
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    pageVisibility = pgTable("page_visibility", {
      id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
      path: varchar("path", { length: 255 }).notNull().unique(),
      // e.g., "/manifesto", "/projects", "/fr/manifesto"
      isVisible: boolean("isVisible").default(true).notNull(),
      // Whether the page is visible
      description: text("description"),
      // Optional description of the page
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    pageTexts = pgTable("page_texts", {
      id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
      key: varchar("key", { length: 512 }).notNull().unique(),
      // e.g. "common.loading", "nav.home"
      textEn: text("text_en").notNull(),
      // English text
      textFr: text("text_fr").notNull(),
      // French text
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    analytics = pgTable("analytics", {
      id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
      provider: varchar("provider", { length: 50 }).notNull().unique(),
      // 'google-analytics', 'facebook-pixel', 'linkedin-insight'
      isEnabled: boolean("isEnabled").default(false).notNull(),
      // Whether this analytics provider is active
      trackingId: varchar("trackingId", { length: 255 }),
      // GA4 Measurement ID, Facebook Pixel ID, LinkedIn Partner ID
      additionalConfig: text("additionalConfig"),
      // JSON string for additional configuration
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    carouselLogos = pgTable("carousel_logos", {
      id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
      src: varchar("src", { length: 512 }).notNull(),
      alt: varchar("alt", { length: 255 }).notNull(),
      url: varchar("url", { length: 512 }).default("").notNull(),
      displayOrder: integer("display_order").default(0).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
  }
});

// server/_core/env.ts
var ENV;
var init_env = __esm({
  "server/_core/env.ts"() {
    "use strict";
    ENV = {
      appId: process.env.VITE_APP_ID ?? "",
      cookieSecret: process.env.JWT_SECRET ?? "",
      databaseUrl: process.env.DATABASE_URL ?? "",
      oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
      ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
      isProduction: process.env.NODE_ENV === "production",
      forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
      forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
      googleClientId: process.env.GOOGLE_CLIENT_ID ?? "",
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      adminAllowedEmails: process.env.ADMIN_ALLOWED_EMAILS ?? "",
      baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
      internalPlatformUrl: process.env.INTERNAL_PLATFORM_URL ?? "",
      // URL de la plateforme interne pour récupérer les témoignages
      internalPlatformApiKey: process.env.INTERNAL_PLATFORM_API_KEY ?? ""
      // Clé API optionnelle pour l'authentification
    };
  }
});

// server/db.ts
var db_exports = {};
__export(db_exports, {
  createAdminUser: () => createAdminUser,
  createLeoSession: () => createLeoSession,
  getAdminByUsername: () => getAdminByUsername,
  getAdminStats: () => getAdminStats,
  getAllAgencyLeads: () => getAllAgencyLeads,
  getAllMediaAssets: () => getAllMediaAssets,
  getDb: () => getDb,
  getLeoAnalytics: () => getLeoAnalytics,
  getLeoContacts: () => getLeoContacts,
  getUserByOpenId: () => getUserByOpenId,
  saveAgencyLead: () => saveAgencyLead,
  saveLeoContact: () => saveLeoContact,
  updateLeoSession: () => updateLeoSession,
  upsertUser: () => upsertUser,
  verifyAdminPassword: () => verifyAdminPassword
});
import { eq, desc, count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import bcrypt from "bcrypt";
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const client = postgres(process.env.DATABASE_URL);
      _db = drizzle(client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function getAdminStats() {
  const db = await getDb();
  if (!db) {
    return { agencyLeads: 0, leoSessions: 0, aiAssessments: 0, leoContacts: 0, mediaAssets: 0, totalUsers: 0 };
  }
  try {
    const [agencyLeadsCount, leoSessionsCount, aiAssessmentsCount, leoContactsCount, mediaAssetsCount, usersCount] = await Promise.all([
      db.select({ count: count() }).from(agencyLeads),
      db.select({ count: count() }).from(leoSessions),
      db.select({ count: count() }).from(aiAssessments),
      db.select({ count: count() }).from(leoContacts),
      db.select({ count: count() }).from(mediaAssets),
      db.select({ count: count() }).from(users)
    ]);
    return {
      agencyLeads: agencyLeadsCount[0]?.count ?? 0,
      leoSessions: leoSessionsCount[0]?.count ?? 0,
      aiAssessments: aiAssessmentsCount[0]?.count ?? 0,
      leoContacts: leoContactsCount[0]?.count ?? 0,
      mediaAssets: mediaAssetsCount[0]?.count ?? 0,
      totalUsers: usersCount[0]?.count ?? 0
    };
  } catch (error) {
    console.error("[Database] getAdminStats error:", error);
    return { agencyLeads: 0, leoSessions: 0, aiAssessments: 0, leoContacts: 0, mediaAssets: 0, totalUsers: 0 };
  }
}
async function getAllAgencyLeads() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get agency leads: database not available");
    return [];
  }
  try {
    return await db.select().from(agencyLeads).orderBy(desc(agencyLeads.createdAt));
  } catch (error) {
    console.error("[Database] Error getting agency leads:", error);
    return [];
  }
}
async function getLeoContacts() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get LEO contacts: database not available");
    return [];
  }
  try {
    return await db.select().from(leoContacts).orderBy(desc(leoContacts.createdAt));
  } catch (error) {
    console.error("[Database] Error getting LEO contacts:", error);
    return [];
  }
}
async function saveAgencyLead(lead) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save agency lead: database not available");
    return;
  }
  try {
    await db.insert(agencyLeads).values(lead);
  } catch (error) {
    console.error("[Database] Error saving agency lead:", error);
    throw error;
  }
}
async function saveLeoContact(contact) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save LEO contact: database not available");
    return;
  }
  try {
    await db.insert(leoContacts).values(contact);
  } catch (error) {
    console.error("[Database] Error saving LEO contact:", error);
    throw error;
  }
}
async function createLeoSession(session2) {
  const database = await getDb();
  if (!database) {
    console.warn("[Database] Cannot create LEO session: database not available");
    return;
  }
  try {
    const existing = await database.select().from(leoSessions).where(eq(leoSessions.sessionId, session2.sessionId)).limit(1);
    if (existing.length === 0) {
      await database.insert(leoSessions).values(session2);
    }
  } catch (error) {
    console.error("[Database] Error creating LEO session:", error);
    throw error;
  }
}
async function updateLeoSession(sessionId, data) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update LEO session: database not available");
    return;
  }
  try {
    await db.update(leoSessions).set(data).where(eq(leoSessions.sessionId, sessionId));
  } catch (error) {
    console.error("[Database] Error updating LEO session:", error);
    throw error;
  }
}
async function getLeoAnalytics() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get LEO analytics: database not available");
    return [];
  }
  try {
    return await db.select().from(leoSessions).orderBy(desc(leoSessions.startedAt));
  } catch (error) {
    console.error("[Database] Error getting LEO analytics:", error);
    return [];
  }
}
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getAllMediaAssets() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get media assets: database not available");
    return [];
  }
  try {
    const { mediaAssets: mediaAssets2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    const result = await db.select().from(mediaAssets2);
    return result;
  } catch (error) {
    console.error("[Database] Error fetching media assets:", error);
    return [];
  }
}
async function createAdminUser(data) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create admin user: database not available");
    throw new Error("Database not available");
  }
  try {
    const passwordHash = await bcrypt.hash(data.password, 10);
    await db.insert(adminUsers).values({
      username: data.username,
      passwordHash,
      email: data.email
    });
    return { success: true };
  } catch (error) {
    console.error("[Database] Error creating admin user:", error);
    throw error;
  }
}
async function getAdminByUsername(username) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get admin: database not available");
    return null;
  }
  try {
    const result = await db.select().from(adminUsers).where(eq(adminUsers.username, username)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Error getting admin:", error);
    return null;
  }
}
async function verifyAdminPassword(username, password) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot verify admin: database not available");
    return null;
  }
  try {
    const admin = await getAdminByUsername(username);
    if (!admin) return null;
    const isValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isValid) return null;
    await db.update(adminUsers).set({ lastLoginAt: /* @__PURE__ */ new Date() }).where(eq(adminUsers.id, admin.id));
    return admin;
  } catch (error) {
    console.error("[Database] Error verifying admin password:", error);
    return null;
  }
}
var _db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    init_env();
    _db = null;
  }
});

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    path: "/",
    sameSite: isProduction ? "strict" : "none",
    secure: isSecureRequest(req),
    maxAge: 7 * 24 * 60 * 60 * 1e3
    // 7 days
  };
}
var init_cookies = __esm({
  "server/_core/cookies.ts"() {
    "use strict";
  }
});

// shared/_core/errors.ts
var HttpError, ForbiddenError;
var init_errors = __esm({
  "shared/_core/errors.ts"() {
    "use strict";
    HttpError = class extends Error {
      constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = "HttpError";
      }
    };
    ForbiddenError = (msg) => new HttpError(403, msg);
  }
});

// server/_core/sdk.ts
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString, EXCHANGE_TOKEN_PATH, GET_USER_INFO_PATH, GET_USER_INFO_WITH_JWT_PATH, OAuthService, createOAuthHttpClient, SDKServer, sdk;
var init_sdk = __esm({
  "server/_core/sdk.ts"() {
    "use strict";
    init_const();
    init_errors();
    init_db();
    init_env();
    isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
    EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
    GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
    GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
    OAuthService = class {
      constructor(client) {
        this.client = client;
        console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
        if (!ENV.oAuthServerUrl) {
          console.error(
            "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
          );
        }
      }
      decodeState(state) {
        const redirectUri = atob(state);
        return redirectUri;
      }
      async getTokenByCode(code, state) {
        const payload = {
          clientId: ENV.appId,
          grantType: "authorization_code",
          code,
          redirectUri: this.decodeState(state)
        };
        const { data } = await this.client.post(
          EXCHANGE_TOKEN_PATH,
          payload
        );
        return data;
      }
      async getUserInfoByToken(token) {
        const { data } = await this.client.post(
          GET_USER_INFO_PATH,
          {
            accessToken: token.accessToken
          }
        );
        return data;
      }
    };
    createOAuthHttpClient = () => axios.create({
      baseURL: ENV.oAuthServerUrl,
      timeout: AXIOS_TIMEOUT_MS
    });
    SDKServer = class {
      client;
      oauthService;
      constructor(client = createOAuthHttpClient()) {
        this.client = client;
        this.oauthService = new OAuthService(this.client);
      }
      deriveLoginMethod(platforms, fallback) {
        if (fallback && fallback.length > 0) return fallback;
        if (!Array.isArray(platforms) || platforms.length === 0) return null;
        const set = new Set(
          platforms.filter((p) => typeof p === "string")
        );
        if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
        if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
        if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
        if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
          return "microsoft";
        if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
        const first = Array.from(set)[0];
        return first ? first.toLowerCase() : null;
      }
      /**
       * Exchange OAuth authorization code for access token
       * @example
       * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
       */
      async exchangeCodeForToken(code, state) {
        return this.oauthService.getTokenByCode(code, state);
      }
      /**
       * Get user information using access token
       * @example
       * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
       */
      async getUserInfo(accessToken) {
        const data = await this.oauthService.getUserInfoByToken({
          accessToken
        });
        const loginMethod = this.deriveLoginMethod(
          data?.platforms,
          data?.platform ?? data.platform ?? null
        );
        return {
          ...data,
          platform: loginMethod,
          loginMethod
        };
      }
      parseCookies(cookieHeader) {
        if (!cookieHeader) {
          return /* @__PURE__ */ new Map();
        }
        const parsed = parseCookieHeader(cookieHeader);
        return new Map(Object.entries(parsed));
      }
      getSessionSecret() {
        const secret = ENV.cookieSecret;
        return new TextEncoder().encode(secret);
      }
      /**
       * Create a session token for a Manus user openId
       * @example
       * const sessionToken = await sdk.createSessionToken(userInfo.openId);
       */
      async createSessionToken(openId, options = {}) {
        return this.signSession(
          {
            openId,
            appId: ENV.appId,
            name: options.name || ""
          },
          options
        );
      }
      async signSession(payload, options = {}) {
        const issuedAt = Date.now();
        const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
        const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
        const secretKey = this.getSessionSecret();
        return new SignJWT({
          openId: payload.openId,
          appId: payload.appId,
          name: payload.name
        }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
      }
      async verifySession(cookieValue) {
        if (!cookieValue) {
          console.warn("[Auth] Missing session cookie");
          return null;
        }
        try {
          const secretKey = this.getSessionSecret();
          const { payload } = await jwtVerify(cookieValue, secretKey, {
            algorithms: ["HS256"]
          });
          const { openId, appId, name } = payload;
          if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
            console.warn("[Auth] Session payload missing required fields");
            return null;
          }
          return {
            openId,
            appId,
            name
          };
        } catch (error) {
          console.warn("[Auth] Session verification failed", String(error));
          return null;
        }
      }
      async getUserInfoWithJwt(jwtToken) {
        const payload = {
          jwtToken,
          projectId: ENV.appId
        };
        const { data } = await this.client.post(
          GET_USER_INFO_WITH_JWT_PATH,
          payload
        );
        const loginMethod = this.deriveLoginMethod(
          data?.platforms,
          data?.platform ?? data.platform ?? null
        );
        return {
          ...data,
          platform: loginMethod,
          loginMethod
        };
      }
      async authenticateRequest(req) {
        const cookies = this.parseCookies(req.headers.cookie);
        const sessionCookie = cookies.get(COOKIE_NAME);
        const session2 = await this.verifySession(sessionCookie);
        if (!session2) {
          throw ForbiddenError("Invalid session cookie");
        }
        const sessionUserId = session2.openId;
        const signedInAt = /* @__PURE__ */ new Date();
        let user = await getUserByOpenId(sessionUserId);
        if (!user) {
          try {
            const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
            await upsertUser({
              openId: userInfo.openId,
              name: userInfo.name || null,
              email: userInfo.email ?? null,
              loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
              lastSignedIn: signedInAt
            });
            user = await getUserByOpenId(userInfo.openId);
          } catch (error) {
            console.error("[Auth] Failed to sync user from OAuth:", error);
            throw ForbiddenError("Failed to sync user info");
          }
        }
        if (!user) {
          throw ForbiddenError("User not found");
        }
        await upsertUser({
          openId: user.openId,
          lastSignedIn: signedInAt
        });
        return user;
      }
    };
    sdk = new SDKServer();
  }
});

// server/_core/notification.ts
import { TRPCError } from "@trpc/server";
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}
var TITLE_MAX_LENGTH, CONTENT_MAX_LENGTH, trimValue, isNonEmptyString2, buildEndpointUrl, validatePayload;
var init_notification = __esm({
  "server/_core/notification.ts"() {
    "use strict";
    init_env();
    TITLE_MAX_LENGTH = 1200;
    CONTENT_MAX_LENGTH = 2e4;
    trimValue = (value) => value.trim();
    isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
    buildEndpointUrl = (baseUrl) => {
      const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
      return new URL(
        "webdevtoken.v1.WebDevService/SendNotification",
        normalizedBase
      ).toString();
    };
    validatePayload = (input) => {
      if (!isNonEmptyString2(input.title)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Notification title is required."
        });
      }
      if (!isNonEmptyString2(input.content)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Notification content is required."
        });
      }
      const title = trimValue(input.title);
      const content = trimValue(input.content);
      if (title.length > TITLE_MAX_LENGTH) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
        });
      }
      if (content.length > CONTENT_MAX_LENGTH) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
        });
      }
      return { title, content };
    };
  }
});

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t, router, publicProcedure, requireUser, protectedProcedure, adminProcedure;
var init_trpc = __esm({
  "server/_core/trpc.ts"() {
    "use strict";
    init_const();
    t = initTRPC.context().create({
      transformer: superjson
    });
    router = t.router;
    publicProcedure = t.procedure;
    requireUser = t.middleware(async (opts) => {
      const { ctx, next } = opts;
      if (!ctx.user) {
        throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
      }
      return next({
        ctx: {
          ...ctx,
          user: ctx.user
        }
      });
    });
    protectedProcedure = t.procedure.use(requireUser);
    adminProcedure = t.procedure.use(
      t.middleware(async (opts) => {
        const { ctx, next } = opts;
        if (!ctx.user || ctx.user.role !== "admin") {
          throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
        }
        return next({
          ctx: {
            ...ctx,
            user: ctx.user
          }
        });
      })
    );
  }
});

// server/_core/systemRouter.ts
import { z } from "zod";
var systemRouter;
var init_systemRouter = __esm({
  "server/_core/systemRouter.ts"() {
    "use strict";
    init_notification();
    init_trpc();
    systemRouter = router({
      health: publicProcedure.input(
        z.object({
          timestamp: z.number().min(0, "timestamp cannot be negative")
        })
      ).query(() => ({
        ok: true
      })),
      notifyOwner: adminProcedure.input(
        z.object({
          title: z.string().min(1, "title is required"),
          content: z.string().min(1, "content is required")
        })
      ).mutation(async ({ input }) => {
        const delivered = await notifyOwner(input);
        return {
          success: delivered
        };
      })
    });
  }
});

// server/_core/llm.ts
async function invokeLLM(params) {
  assertApiKey();
  const {
    messages,
    tools,
    toolChoice,
    tool_choice,
    outputSchema,
    output_schema,
    responseFormat,
    response_format
  } = params;
  const payload = {
    model: "gemini-2.5-flash",
    messages: messages.map(normalizeMessage)
  };
  if (tools && tools.length > 0) {
    payload.tools = tools;
  }
  const normalizedToolChoice = normalizeToolChoice(
    toolChoice || tool_choice,
    tools
  );
  if (normalizedToolChoice) {
    payload.tool_choice = normalizedToolChoice;
  }
  payload.max_tokens = 32768;
  payload.thinking = {
    "budget_tokens": 128
  };
  const normalizedResponseFormat = normalizeResponseFormat({
    responseFormat,
    response_format,
    outputSchema,
    output_schema
  });
  if (normalizedResponseFormat) {
    payload.response_format = normalizedResponseFormat;
  }
  const response = await fetch(resolveApiUrl(), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${ENV.forgeApiKey}`
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `LLM invoke failed: ${response.status} ${response.statusText} \u2013 ${errorText}`
    );
  }
  return await response.json();
}
var ensureArray, normalizeContentPart, normalizeMessage, normalizeToolChoice, resolveApiUrl, assertApiKey, normalizeResponseFormat;
var init_llm = __esm({
  "server/_core/llm.ts"() {
    "use strict";
    init_env();
    ensureArray = (value) => Array.isArray(value) ? value : [value];
    normalizeContentPart = (part) => {
      if (typeof part === "string") {
        return { type: "text", text: part };
      }
      if (part.type === "text") {
        return part;
      }
      if (part.type === "image_url") {
        return part;
      }
      if (part.type === "file_url") {
        return part;
      }
      throw new Error("Unsupported message content part");
    };
    normalizeMessage = (message) => {
      const { role, name, tool_call_id } = message;
      if (role === "tool" || role === "function") {
        const content = ensureArray(message.content).map((part) => typeof part === "string" ? part : JSON.stringify(part)).join("\n");
        return {
          role,
          name,
          tool_call_id,
          content
        };
      }
      const contentParts = ensureArray(message.content).map(normalizeContentPart);
      if (contentParts.length === 1 && contentParts[0].type === "text") {
        return {
          role,
          name,
          content: contentParts[0].text
        };
      }
      return {
        role,
        name,
        content: contentParts
      };
    };
    normalizeToolChoice = (toolChoice, tools) => {
      if (!toolChoice) return void 0;
      if (toolChoice === "none" || toolChoice === "auto") {
        return toolChoice;
      }
      if (toolChoice === "required") {
        if (!tools || tools.length === 0) {
          throw new Error(
            "tool_choice 'required' was provided but no tools were configured"
          );
        }
        if (tools.length > 1) {
          throw new Error(
            "tool_choice 'required' needs a single tool or specify the tool name explicitly"
          );
        }
        return {
          type: "function",
          function: { name: tools[0].function.name }
        };
      }
      if ("name" in toolChoice) {
        return {
          type: "function",
          function: { name: toolChoice.name }
        };
      }
      return toolChoice;
    };
    resolveApiUrl = () => ENV.forgeApiUrl && ENV.forgeApiUrl.trim().length > 0 ? `${ENV.forgeApiUrl.replace(/\/$/, "")}/v1/chat/completions` : "https://forge.manus.im/v1/chat/completions";
    assertApiKey = () => {
      if (!ENV.forgeApiKey) {
        throw new Error("OPENAI_API_KEY is not configured");
      }
    };
    normalizeResponseFormat = ({
      responseFormat,
      response_format,
      outputSchema,
      output_schema
    }) => {
      const explicitFormat = responseFormat || response_format;
      if (explicitFormat) {
        if (explicitFormat.type === "json_schema" && !explicitFormat.json_schema?.schema) {
          throw new Error(
            "responseFormat json_schema requires a defined schema object"
          );
        }
        return explicitFormat;
      }
      const schema = outputSchema || output_schema;
      if (!schema) return void 0;
      if (!schema.name || !schema.schema) {
        throw new Error("outputSchema requires both name and schema");
      }
      return {
        type: "json_schema",
        json_schema: {
          name: schema.name,
          schema: schema.schema,
          ...typeof schema.strict === "boolean" ? { strict: schema.strict } : {}
        }
      };
    };
  }
});

// server/_core/logger.ts
import winston from "winston";
function sanitizeLogData(data) {
  if (typeof data !== "object" || data === null) {
    return data;
  }
  const sensitiveKeys = ["password", "token", "secret", "apiKey", "api_key", "authorization"];
  const sanitized = { ...data };
  for (const key in sanitized) {
    if (sensitiveKeys.some((sk) => key.toLowerCase().includes(sk))) {
      sanitized[key] = "[REDACTED]";
    } else if (typeof sanitized[key] === "object") {
      sanitized[key] = sanitizeLogData(sanitized[key]);
    }
  }
  return sanitized;
}
var logger;
var init_logger = __esm({
  "server/_core/logger.ts"() {
    "use strict";
    logger = winston.createLogger({
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
      format: winston.format.combine(
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss"
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
      defaultMeta: { service: "nukleo-digital" },
      transports: [
        // Write all logs to console
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(
              (info) => `${info.timestamp} ${info.level}: ${info.message}`
            )
          )
        })
      ]
    });
    if (process.env.NODE_ENV === "production") {
      logger.add(new winston.transports.File({
        filename: "logs/error.log",
        level: "error",
        maxsize: 5242880,
        // 5MB
        maxFiles: 5
      }));
      logger.add(new winston.transports.File({
        filename: "logs/combined.log",
        maxsize: 5242880,
        // 5MB
        maxFiles: 5
      }));
    }
  }
});

// shared/assessment.types.ts
import { z as z2 } from "zod";
var emailCaptureSchema;
var init_assessment_types = __esm({
  "shared/assessment.types.ts"() {
    "use strict";
    emailCaptureSchema = z2.object({
      firstName: z2.string().min(1, "First name is required"),
      lastName: z2.string().min(1, "Last name is required"),
      email: z2.string().email("Invalid email address"),
      company: z2.string().min(1, "Company is required"),
      jobTitle: z2.string().optional(),
      phone: z2.string().optional(),
      companySize: z2.string().optional(),
      industry: z2.string().optional(),
      consent: z2.boolean().refine((val) => val === true, "You must consent to receive the report")
    });
  }
});

// server/_core/sendgrid.ts
import sgMail from "@sendgrid/mail";
async function sendEmail(options) {
  if (!SENDGRID_API_KEY) {
    console.warn("[SendGrid] API key not configured");
    return false;
  }
  if (!SENDGRID_FROM_EMAIL) {
    console.warn("[SendGrid] From email not configured");
    return false;
  }
  try {
    await sgMail.send({
      to: options.to,
      from: {
        email: SENDGRID_FROM_EMAIL,
        name: SENDGRID_FROM_NAME || "Nukleo Digital"
      },
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, "")
      // Strip HTML for text version
    });
    console.log(`[SendGrid] Email sent successfully to ${options.to}`);
    return true;
  } catch (error) {
    console.error("[SendGrid] Failed to send email:", error);
    return false;
  }
}
function generateAssessmentEmail(data) {
  const { firstName, lastName, globalScore, maturityLevel, dimensionScores } = data;
  const getScoreColor = (score) => {
    if (score < 40) return "#ef4444";
    if (score < 70) return "#eab308";
    return "#22c55e";
  };
  const dimensionRows = dimensionScores.map(
    (dim) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151; font-weight: 500;">
          ${dim.label}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
          <span style="color: ${getScoreColor(dim.score)}; font-weight: 700; font-size: 18px;">
            ${dim.score}/100
          </span>
        </td>
      </tr>
    `
  ).join("");
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AI Readiness Report</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); padding: 40px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">
                Your AI Readiness Report
              </h1>
              <p style="margin: 12px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                Comprehensive Assessment Results
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 40px 40px 20px;">
              <p style="margin: 0; color: #111827; font-size: 18px; line-height: 1.6;">
                Hi <strong>${firstName} ${lastName}</strong>,
              </p>
              <p style="margin: 16px 0 0; color: #6b7280; font-size: 16px; line-height: 1.6;">
                Thank you for completing the AI Readiness Assessment! Here's your comprehensive report with personalized insights.
              </p>
            </td>
          </tr>

          <!-- Global Score -->
          <tr>
            <td style="padding: 20px 40px;">
              <div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); padding: 32px; border-radius: 12px; text-align: center;">
                <p style="margin: 0; color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                  Your AI Readiness Score
                </p>
                <p style="margin: 12px 0 0; color: ${getScoreColor(globalScore)}; font-size: 64px; font-weight: 700; line-height: 1;">
                  ${globalScore}<span style="font-size: 24px; color: #9ca3af;">/100</span>
                </p>
                <p style="margin: 12px 0 0; padding: 8px 24px; background-color: ${getScoreColor(globalScore)}20; border: 2px solid ${getScoreColor(globalScore)}40; border-radius: 24px; display: inline-block; color: ${getScoreColor(globalScore)}; font-weight: 700; font-size: 18px;">
                  ${maturityLevel}
                </p>
              </div>
            </td>
          </tr>

          <!-- Dimension Scores -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 20px; color: #111827; font-size: 24px; font-weight: 700;">
                Dimension Breakdown
              </h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                ${dimensionRows}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 20px 40px 40px;">
              <div style="background-color: #f9fafb; padding: 24px; border-radius: 12px; text-align: center;">
                <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                  Ready to accelerate your AI transformation?
                </p>
                <a href="https://nukleo.digital/contact" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px;">
                  Schedule a Consultation
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                <strong>Nukleo Digital</strong><br>
                Architects of Your AI Future
              </p>
              <p style="margin: 12px 0 0; color: #9ca3af; font-size: 12px;">
                This email was sent because you completed our AI Readiness Assessment.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
var SENDGRID_API_KEY, SENDGRID_FROM_EMAIL, SENDGRID_FROM_NAME;
var init_sendgrid = __esm({
  "server/_core/sendgrid.ts"() {
    "use strict";
    SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL;
    SENDGRID_FROM_NAME = process.env.SENDGRID_FROM_NAME;
    if (SENDGRID_API_KEY) {
      sgMail.setApiKey(SENDGRID_API_KEY);
    }
  }
});

// server/routers/assessment.ts
import { z as z3 } from "zod";
var assessmentRouter;
var init_assessment = __esm({
  "server/routers/assessment.ts"() {
    "use strict";
    init_trpc();
    init_db();
    init_schema();
    init_assessment_types();
    init_sendgrid();
    assessmentRouter = router({
      save: publicProcedure.input(
        z3.object({
          // User info
          firstName: z3.string(),
          lastName: z3.string(),
          email: z3.string().email(),
          company: z3.string(),
          jobTitle: z3.string().optional(),
          phone: z3.string().optional(),
          companySize: z3.string().optional(),
          industry: z3.string().optional(),
          // Scores
          globalScore: z3.number(),
          strategyScore: z3.number(),
          dataScore: z3.number(),
          technologyScore: z3.number(),
          talentScore: z3.number(),
          governanceScore: z3.number(),
          cultureScore: z3.number(),
          maturityLevel: z3.string(),
          // Responses
          answers: z3.record(z3.string(), z3.number()),
          // Marketing
          utmSource: z3.string().optional(),
          utmMedium: z3.string().optional(),
          utmCampaign: z3.string().optional()
        })
      ).mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }
        await db.insert(aiAssessments).values({
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          company: input.company,
          jobTitle: input.jobTitle,
          phone: input.phone,
          companySize: input.companySize,
          industry: input.industry,
          globalScore: input.globalScore,
          strategyScore: input.strategyScore,
          dataScore: input.dataScore,
          technologyScore: input.technologyScore,
          talentScore: input.talentScore,
          governanceScore: input.governanceScore,
          cultureScore: input.cultureScore,
          maturityLevel: input.maturityLevel,
          responses: JSON.stringify(input.answers),
          utmSource: input.utmSource,
          utmMedium: input.utmMedium,
          utmCampaign: input.utmCampaign
        });
        const dimensionScores = [
          { label: "Strategy", score: input.strategyScore },
          { label: "Data", score: input.dataScore },
          { label: "Technology", score: input.technologyScore },
          { label: "Talent", score: input.talentScore },
          { label: "Governance", score: input.governanceScore },
          { label: "Culture", score: input.cultureScore }
        ];
        const emailHtml = generateAssessmentEmail({
          firstName: input.firstName,
          lastName: input.lastName,
          globalScore: input.globalScore,
          maturityLevel: input.maturityLevel,
          dimensionScores
        });
        const emailSent = await sendEmail({
          to: input.email,
          subject: `Your AI Readiness Report - Score: ${input.globalScore}/100`,
          html: emailHtml
        });
        return {
          success: true,
          emailSent
        };
      }),
      validateEmail: publicProcedure.input(emailCaptureSchema).mutation(async ({ input }) => {
        return { valid: true };
      })
    });
  }
});

// server/routers/contact.ts
import { z as z4 } from "zod";
function generateContactEmail(data) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); padding: 40px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                New Contact Form Submission
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">Name:</strong>
                    <span style="color: #6b7280;">${data.firstName} ${data.lastName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">Email:</strong>
                    <a href="mailto:${data.email}" style="color: #8b5cf6; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">Company:</strong>
                    <span style="color: #6b7280;">${data.company}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0;">
                    <strong style="color: #374151; display: block; margin-bottom: 8px;">Message:</strong>
                    <p style="margin: 0; color: #6b7280; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                  </td>
                </tr>
              </table>

              <div style="margin-top: 32px; padding: 20px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
                <a href="mailto:${data.email}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">
                  Reply to ${data.firstName}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                Submitted on ${(/* @__PURE__ */ new Date()).toLocaleString()}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
function generateConfirmationEmail(firstName) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Us</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); padding: 40px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">
                Thank You!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #111827; font-size: 18px;">
                Hi <strong>${firstName}</strong>,
              </p>
              <p style="margin: 0 0 20px; color: #6b7280; font-size: 16px; line-height: 1.6;">
                Thank you for reaching out to Nukleo Digital! We've received your message and our team will get back to you within 24 hours.
              </p>
              <p style="margin: 0 0 20px; color: #6b7280; font-size: 16px; line-height: 1.6;">
                In the meantime, feel free to explore our resources and learn more about how we're helping organizations become AI-native leaders.
              </p>

              <div style="margin: 32px 0; text-align: center;">
                <a href="https://nukleo.digital/resources" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px;">
                  Explore Resources
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                <strong>Nukleo Digital</strong><br>
                Architects of Your AI Future
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
function generateWelcomeEmail() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Nukleo Digital Newsletter</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); padding: 40px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">
                Welcome to Nukleo Digital!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #111827; font-size: 18px;">
                Thank you for subscribing!
              </p>
              <p style="margin: 0 0 20px; color: #6b7280; font-size: 16px; line-height: 1.6;">
                You're now part of our community of AI-native leaders. Get ready to receive:
              </p>
              <ul style="margin: 0 0 20px; padding-left: 20px; color: #6b7280; font-size: 16px; line-height: 1.8;">
                <li>Latest insights on Agentic AI and automation</li>
                <li>Technical guides and best practices</li>
                <li>Industry analysis and trend reports</li>
                <li>Exclusive invitations to webinars and events</li>
              </ul>

              <div style="margin: 32px 0; text-align: center;">
                <a href="https://nukleo.digital/ai-readiness" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px;">
                  Take the AI Readiness Assessment
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                <strong>Nukleo Digital</strong><br>
                Architects of Your AI Future
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
var contactSchema, newsletterSchema, contactRouter;
var init_contact = __esm({
  "server/routers/contact.ts"() {
    "use strict";
    init_trpc();
    init_sendgrid();
    init_db();
    init_schema();
    contactSchema = z4.object({
      firstName: z4.string().min(1, "First name is required"),
      lastName: z4.string().min(1, "Last name is required"),
      email: z4.string().email("Invalid email address"),
      company: z4.string().min(1, "Company is required"),
      message: z4.string().min(10, "Message must be at least 10 characters")
    });
    newsletterSchema = z4.object({
      email: z4.string().email("Invalid email address")
    });
    contactRouter = router({
      send: publicProcedure.input(contactSchema).mutation(async ({ input }) => {
        try {
          const db = await getDb();
          if (db) {
            try {
              await db.insert(contactMessages).values({
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                company: input.company,
                message: input.message
              });
              console.log(`[Contact] Successfully saved message from ${input.firstName} ${input.lastName} (${input.email})`);
            } catch (dbError) {
              console.error("[Contact] Database error:", dbError);
            }
          }
          const emailSent = await sendEmail({
            to: "clement@nukleo.com",
            subject: `New Contact Form Submission from ${input.firstName} ${input.lastName}`,
            html: generateContactEmail(input)
          });
          if (!emailSent) {
            throw new Error("Failed to send email");
          }
          try {
            await sendEmail({
              to: input.email,
              subject: "Thank you for contacting Nukleo Digital",
              html: generateConfirmationEmail(input.firstName)
            });
            console.log(`[Contact] Confirmation email sent to ${input.email}`);
          } catch (emailError) {
            console.warn("[Contact] Failed to send confirmation email:", emailError);
          }
          return {
            success: true
          };
        } catch (error) {
          console.error("Contact form error:", error);
          throw new Error("Failed to send message. Please try again.");
        }
      }),
      subscribe: publicProcedure.input(newsletterSchema).mutation(async ({ input }) => {
        try {
          const db = await getDb();
          if (!db) {
            console.error("[Newsletter] Database connection failed");
            throw new Error("Database connection failed");
          }
          let isNewSubscriber = true;
          try {
            const result = await db.insert(aiNewsSubscribers).values({
              email: input.email,
              source: "ai-trend-radar"
            }).returning({ id: aiNewsSubscribers.id });
            console.log(`[Newsletter] Successfully saved subscription for ${input.email}`, result);
          } catch (dbError) {
            const errorMessage = dbError?.message || dbError?.toString() || "";
            const errorCode = dbError?.code || "";
            const errorConstraint = dbError?.constraint || "";
            const isDuplicate = errorMessage.includes("unique") || errorMessage.includes("duplicate") || errorMessage.includes("already exists") || errorCode.includes("23505") || errorCode === "23505" || errorConstraint === "ai_news_subscribers_email_unique" || errorConstraint?.includes("email_unique");
            if (isDuplicate) {
              console.log(`[Newsletter] Email ${input.email} already subscribed, skipping insert`);
              isNewSubscriber = false;
            } else {
              console.error("[Newsletter] Database error:", dbError);
              console.error("[Newsletter] Error message:", errorMessage);
              console.error("[Newsletter] Error code:", errorCode);
              console.error("[Newsletter] Error constraint:", errorConstraint);
              console.error("[Newsletter] Full error:", JSON.stringify(dbError, Object.getOwnPropertyNames(dbError), 2));
              throw new Error(`Database error: ${errorMessage || "Unknown error"}`);
            }
          }
          try {
            const emailSent = await sendEmail({
              to: process.env.SENDGRID_FROM_EMAIL || "hello@nukleo.com",
              subject: `New AI News Newsletter Subscription: ${input.email}`,
              html: `
              <h2>New AI News Newsletter Subscription</h2>
              <p><strong>Email:</strong> ${input.email}</p>
              <p><strong>Source:</strong> AI Trend Radar</p>
              <p><strong>Date:</strong> ${(/* @__PURE__ */ new Date()).toLocaleString()}</p>
              <p><strong>New Subscriber:</strong> ${isNewSubscriber ? "Yes" : "No (already subscribed)"}</p>
            `
            });
            if (!emailSent) {
              console.warn("[Newsletter] Failed to send notification email, but subscription was saved to DB");
            }
          } catch (emailError) {
            console.warn("[Newsletter] Error sending notification email:", emailError);
          }
          try {
            await sendEmail({
              to: input.email,
              subject: "Welcome to Nukleo Digital AI News Newsletter",
              html: generateWelcomeEmail()
            });
            console.log(`[Newsletter] Welcome email sent to ${input.email}`);
          } catch (emailError) {
            console.warn("[Newsletter] Failed to send welcome email:", emailError);
          }
          return {
            success: true,
            message: isNewSubscriber ? "Successfully subscribed!" : "You are already subscribed!"
          };
        } catch (error) {
          console.error("[Newsletter] Subscription error:", error);
          const errorMessage = error?.message || "Failed to subscribe. Please try again.";
          throw new Error(errorMessage);
        }
      })
    });
  }
});

// server/routers/mediaAssets.ts
var mediaAssetsRouter;
var init_mediaAssets = __esm({
  "server/routers/mediaAssets.ts"() {
    "use strict";
    init_trpc();
    init_db();
    mediaAssetsRouter = router({
      list: publicProcedure.query(async () => {
        try {
          return await getAllMediaAssets();
        } catch (error) {
          console.error("[MediaAssets] Error fetching media assets:", error);
          return [];
        }
      })
    });
  }
});

// server/routers/startProject.ts
import { z as z5 } from "zod";
var startProjectRouter;
var init_startProject = __esm({
  "server/routers/startProject.ts"() {
    "use strict";
    init_trpc();
    init_sendgrid();
    init_db();
    init_schema();
    startProjectRouter = router({
      submit: publicProcedure.input(
        z5.object({
          name: z5.string().min(1, "Name is required"),
          email: z5.string().email("Valid email is required"),
          company: z5.string().min(1, "Company is required"),
          projectType: z5.string().min(1, "Project type is required"),
          budget: z5.string().min(1, "Budget is required"),
          description: z5.string().min(1, "Description is required")
        })
      ).mutation(async ({ input }) => {
        const { name, email, company, projectType, budget, description } = input;
        const adminEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); padding: 40px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">
                \u{1F3AF} New Project Request
              </h1>
              <p style="margin: 12px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                Someone wants to start a project with Nukleo
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 24px; color: #111827; font-size: 24px; font-weight: 700;">
                Contact Information
              </h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Name</strong>
                    <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong>
                    <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">
                      <a href="mailto:${email}" style="color: #8b5cf6; text-decoration: none;">${email}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Company</strong>
                    <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${company}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Project Type</strong>
                    <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${projectType}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Budget</strong>
                    <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${budget}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Description</strong>
                    <p style="margin: 8px 0 0; color: #111827; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${description}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                <strong>Nukleo Digital</strong><br>
                Internal Notification System
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;
        const clientEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Project Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); padding: 40px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">
                Thank You, ${name.split(" ")[0]}!
              </h1>
              <p style="margin: 12px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                We've received your project request
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0; color: #111827; font-size: 18px; line-height: 1.6;">
                Hi <strong>${name}</strong>,
              </p>
              <p style="margin: 16px 0 0; color: #6b7280; font-size: 16px; line-height: 1.6;">
                Thank you for reaching out to Nukleo Digital! We're excited to learn more about your project.
              </p>
              <p style="margin: 16px 0 0; color: #6b7280; font-size: 16px; line-height: 1.6;">
                Our team will review your request and get back to you within <strong>24 hours</strong> to discuss the next steps.
              </p>

              <!-- What's Next -->
              <div style="margin: 32px 0; padding: 24px; background-color: #f9fafb; border-radius: 12px; border-left: 4px solid #8b5cf6;">
                <h3 style="margin: 0 0 12px; color: #111827; font-size: 18px; font-weight: 700;">
                  What happens next?
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #6b7280; font-size: 15px; line-height: 1.8;">
                  <li>Our team reviews your project details</li>
                  <li>We'll schedule a discovery call to understand your needs</li>
                  <li>We'll prepare a tailored proposal for your project</li>
                </ul>
              </div>

              <!-- Your Request Summary -->
              <h3 style="margin: 32px 0 16px; color: #111827; font-size: 20px; font-weight: 700;">
                Your Request Summary
              </h3>
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 13px;">Project Type</strong>
                    <p style="margin: 4px 0 0; color: #111827; font-size: 15px;">${projectType}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 13px;">Budget</strong>
                    <p style="margin: 4px 0 0; color: #111827; font-size: 15px;">${budget}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px;">
                    <strong style="color: #6b7280; font-size: 13px;">Company</strong>
                    <p style="margin: 4px 0 0; color: #111827; font-size: 15px;">${company}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <div style="margin: 32px 0 0; text-align: center;">
                <p style="margin: 0 0 16px; color: #6b7280; font-size: 15px;">
                  In the meantime, feel free to explore our work
                </p>
                <a href="https://nukleo.digital/projects" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px;">
                  View Our Projects
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0; color: #111827; font-size: 15px; font-weight: 600;">
                Nukleo Digital
              </p>
              <p style="margin: 8px 0 0; color: #6b7280; font-size: 14px;">
                Architects of Your AI Future
              </p>
              <p style="margin: 16px 0 0; color: #9ca3af; font-size: 13px;">
                <a href="mailto:hello@nukleo.com" style="color: #8b5cf6; text-decoration: none;">hello@nukleo.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;
        try {
          const db = await getDb();
          if (!db) {
            console.error("[StartProject] \u26A0\uFE0F Database connection not available");
          } else {
            try {
              console.log(`[StartProject] Attempting to save submission for ${name} (${email})`);
              const result = await db.insert(startProjectSubmissions).values({
                name,
                email,
                company,
                projectType,
                budget,
                description
              }).returning({ id: startProjectSubmissions.id });
              console.log(`[StartProject] \u2705 Successfully saved submission for ${name} (${email})`, result);
              console.log(`[StartProject] Submission ID: ${result[0]?.id}`);
            } catch (dbError) {
              console.error("[StartProject] \u274C Database error:", dbError);
              console.error("[StartProject] Error message:", dbError?.message);
              console.error("[StartProject] Error code:", dbError?.code);
              console.error("[StartProject] Full error:", JSON.stringify(dbError, Object.getOwnPropertyNames(dbError), 2));
              if (dbError?.message?.includes("does not exist") || dbError?.code === "42P01") {
                console.error("[StartProject] \u26A0\uFE0F Table 'start_project_submissions' does not exist!");
                console.error("[StartProject] \u26A0\uFE0F Please run migrations: pnpm db:push or npm run db:push");
              }
            }
          }
          const adminEmailSent = await sendEmail({
            to: "clement@nukleo.com",
            subject: `\u{1F3AF} New Project Request from ${name} (${company})`,
            html: adminEmailHtml
          });
          const clientEmailSent = await sendEmail({
            to: email,
            subject: "Thank you for your project request - Nukleo Digital",
            html: clientEmailHtml
          });
          if (!adminEmailSent || !clientEmailSent) {
            console.warn("[StartProject] One or more emails failed to send");
          }
          return {
            success: true,
            message: "Project request submitted successfully"
          };
        } catch (error) {
          console.error("[StartProject] Error:", error);
          throw new Error("Failed to submit project request");
        }
      })
    });
  }
});

// server/routers/agencies.ts
import { z as z6 } from "zod";
import { TRPCError as TRPCError3 } from "@trpc/server";
var agenciesRouter;
var init_agencies = __esm({
  "server/routers/agencies.ts"() {
    "use strict";
    init_trpc();
    init_db();
    agenciesRouter = router({
      getAllLeads: protectedProcedure.query(async ({ ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError3({ code: "FORBIDDEN", message: "Admin access required" });
        }
        try {
          return await getAllAgencyLeads();
        } catch (error) {
          console.error("[Agencies] Error fetching leads:", error);
          return [];
        }
      }),
      saveLead: publicProcedure.input(
        z6.object({
          email: z6.string().email(),
          companyName: z6.string().optional(),
          agencySize: z6.string().optional(),
          techNeeds: z6.array(z6.string()).optional(),
          budget: z6.string().optional(),
          urgency: z6.string().optional()
        })
      ).mutation(async ({ input }) => {
        let qualificationScore = 0;
        if (input.agencySize === "50+") qualificationScore += 30;
        else if (input.agencySize === "21-50") qualificationScore += 25;
        else if (input.agencySize === "6-20") qualificationScore += 20;
        else if (input.agencySize === "1-5") qualificationScore += 10;
        if (input.budget === "100k+") qualificationScore += 40;
        else if (input.budget === "50-100k") qualificationScore += 30;
        else if (input.budget === "10-50k") qualificationScore += 20;
        else if (input.budget === "<10k") qualificationScore += 10;
        if (input.urgency === "immediate") qualificationScore += 30;
        else if (input.urgency === "1-3 months") qualificationScore += 20;
        else if (input.urgency === "3-6 months") qualificationScore += 10;
        else if (input.urgency === "exploring") qualificationScore += 5;
        await saveAgencyLead({
          email: input.email,
          companyName: input.companyName,
          agencySize: input.agencySize,
          techNeeds: input.techNeeds ? JSON.stringify(input.techNeeds) : null,
          budget: input.budget,
          urgency: input.urgency,
          qualificationScore
        });
        return { success: true, qualificationScore };
      })
    });
  }
});

// server/routers/leoAnalytics.ts
var leoAnalyticsRouter;
var init_leoAnalytics = __esm({
  "server/routers/leoAnalytics.ts"() {
    "use strict";
    init_trpc();
    init_db();
    leoAnalyticsRouter = router({
      getAnalytics: adminProcedure.query(async () => {
        const sessions = await getLeoAnalytics();
        const totalSessions = sessions.length;
        const completedSessions = sessions.filter((s) => s.emailCaptured === 1).length;
        const completionRate = totalSessions > 0 ? completedSessions / totalSessions * 100 : 0;
        const totalMessages = sessions.reduce((sum, s) => sum + (s.messageCount || 0), 0);
        const avgMessages = totalSessions > 0 ? totalMessages / totalSessions : 0;
        const sessionsWithDuration = sessions.filter((s) => s.conversationDuration);
        const totalDuration = sessionsWithDuration.reduce((sum, s) => sum + (s.conversationDuration || 0), 0);
        const avgDuration = sessionsWithDuration.length > 0 ? totalDuration / sessionsWithDuration.length : 0;
        const byPage = {};
        sessions.forEach((session2) => {
          if (!byPage[session2.pageContext]) {
            byPage[session2.pageContext] = {
              total: 0,
              completed: 0,
              completionRate: 0,
              avgMessages: 0,
              avgDuration: 0
            };
          }
          byPage[session2.pageContext].total++;
          if (session2.emailCaptured === 1) {
            byPage[session2.pageContext].completed++;
          }
        });
        Object.keys(byPage).forEach((page) => {
          const pageData = byPage[page];
          pageData.completionRate = pageData.total > 0 ? pageData.completed / pageData.total * 100 : 0;
          const pageSessions = sessions.filter((s) => s.pageContext === page);
          const pageMessages = pageSessions.reduce((sum, s) => sum + (s.messageCount || 0), 0);
          pageData.avgMessages = pageSessions.length > 0 ? pageMessages / pageSessions.length : 0;
          const pageSessionsWithDuration = pageSessions.filter((s) => s.conversationDuration);
          const pageDuration = pageSessionsWithDuration.reduce((sum, s) => sum + (s.conversationDuration || 0), 0);
          pageData.avgDuration = pageSessionsWithDuration.length > 0 ? pageDuration / pageSessionsWithDuration.length : 0;
        });
        const funnel = {
          started: totalSessions,
          engaged: sessions.filter((s) => (s.messageCount || 0) >= 3).length,
          // 3+ messages
          qualified: sessions.filter((s) => (s.messageCount || 0) >= 5).length,
          // 5+ messages
          converted: completedSessions
          // Email captured
        };
        const thirtyDaysAgo = /* @__PURE__ */ new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentSessions = sessions.filter((s) => new Date(s.startedAt) >= thirtyDaysAgo);
        const dailyData = {};
        recentSessions.forEach((session2) => {
          const date = new Date(session2.startedAt).toISOString().split("T")[0];
          if (!dailyData[date]) {
            dailyData[date] = { date, sessions: 0, conversions: 0 };
          }
          dailyData[date].sessions++;
          if (session2.emailCaptured === 1) {
            dailyData[date].conversions++;
          }
        });
        const timeSeriesData = Object.values(dailyData).sort((a, b) => a.date.localeCompare(b.date));
        return {
          overview: {
            totalSessions,
            completedSessions,
            completionRate,
            avgMessages,
            avgDuration
          },
          byPage,
          funnel,
          timeSeries: timeSeriesData,
          recentSessions: sessions.slice(0, 50)
          // Last 50 sessions
        };
      })
    });
  }
});

// server/routers/adminAuth.ts
import { z as z7 } from "zod";
import jwt from "jsonwebtoken";
var ADMIN_JWT_SECRET, ADMIN_COOKIE_NAME, adminAuthRouter;
var init_adminAuth = __esm({
  "server/routers/adminAuth.ts"() {
    "use strict";
    init_trpc();
    init_db();
    init_env();
    ADMIN_JWT_SECRET = ENV.cookieSecret + "-admin";
    ADMIN_COOKIE_NAME = "admin_session";
    adminAuthRouter = router({
      login: publicProcedure.input(
        z7.object({
          username: z7.string().min(1),
          password: z7.string().min(1)
        })
      ).mutation(async ({ input, ctx }) => {
        const admin = await verifyAdminPassword(input.username, input.password);
        if (!admin) {
          throw new Error("Invalid credentials");
        }
        const token = jwt.sign(
          { id: admin.id, username: admin.username, email: admin.email },
          ADMIN_JWT_SECRET,
          { expiresIn: "7d" }
        );
        ctx.res.cookie(ADMIN_COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1e3,
          // 7 days
          path: "/"
        });
        return {
          success: true,
          admin: {
            id: admin.id,
            username: admin.username,
            email: admin.email
          }
        };
      }),
      logout: publicProcedure.mutation(({ ctx }) => {
        ctx.res.clearCookie(ADMIN_COOKIE_NAME, { path: "/" });
        return { success: true };
      }),
      checkAuth: publicProcedure.query(({ ctx }) => {
        const token = ctx.req.cookies[ADMIN_COOKIE_NAME];
        if (!token) {
          return { authenticated: false, admin: null };
        }
        try {
          const decoded = jwt.verify(token, ADMIN_JWT_SECRET);
          return {
            authenticated: true,
            admin: {
              id: decoded.id,
              username: decoded.username,
              email: decoded.email
            }
          };
        } catch (error) {
          return { authenticated: false, admin: null };
        }
      }),
      // Create first admin - DISABLED FOR SECURITY
      // This route should only be enabled temporarily during initial setup
      // To enable: set ENABLE_CREATE_FIRST_ADMIN=true in environment variables
      // After creating the first admin, remove this route or keep it disabled
      createFirstAdmin: publicProcedure.input(
        z7.object({
          username: z7.string().min(3),
          password: z7.string().min(8),
          email: z7.string().email(),
          secret: z7.string().optional()
          // Optional secret key for additional protection
        })
      ).mutation(async ({ input }) => {
        if (process.env.ENABLE_CREATE_FIRST_ADMIN !== "true") {
          throw new Error("Admin creation is disabled. Contact system administrator.");
        }
        const requiredSecret = process.env.CREATE_ADMIN_SECRET;
        if (requiredSecret && input.secret !== requiredSecret) {
          throw new Error("Invalid secret key");
        }
        try {
          await createAdminUser({
            username: input.username,
            password: input.password,
            email: input.email
          });
          return { success: true };
        } catch (error) {
          console.error("[Admin Auth] Error creating admin:", error);
          throw new Error("Failed to create admin user");
        }
      })
    });
  }
});

// server/routers/admin.ts
import { count as count2, desc as desc2, eq as eq2, and } from "drizzle-orm";
async function fetchTestimonialsFromExternalPlatform(language) {
  if (!ENV.internalPlatformUrl) {
    console.warn("[Admin] INTERNAL_PLATFORM_URL not configured");
    return [];
  }
  try {
    const baseUrl = ENV.internalPlatformUrl.replace(/\/$/, "");
    const url = `${baseUrl}/api/public/testimonials?language=${language}`;
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };
    if (ENV.internalPlatformApiKey) {
      headers["Authorization"] = `Bearer ${ENV.internalPlatformApiKey}`;
      headers["x-api-key"] = ENV.internalPlatformApiKey;
      console.log(`[Admin] Fetching testimonials from ${url} with API key authentication`);
    } else {
      console.warn("[Admin] INTERNAL_PLATFORM_API_KEY not configured, making unauthenticated request");
      throw new Error("INTERNAL_PLATFORM_API_KEY est requise pour acc\xE9der \xE0 l'API");
    }
    console.log(`[Admin] Making request to: ${url}`);
    console.log(`[Admin] Headers:`, JSON.stringify(headers, null, 2));
    const response = await fetch(url, {
      method: "GET",
      headers,
      signal: AbortSignal.timeout(1e4)
      // Timeout de 10 secondes pour la synchronisation
    });
    const contentType = response.headers.get("content-type") || "";
    const responseText = await response.text();
    console.log(`[Admin] Response status: ${response.status}`);
    console.log(`[Admin] Response Content-Type: ${contentType}`);
    console.log(`[Admin] Response preview: ${responseText.substring(0, 300)}`);
    if (!response.ok) {
      console.error(`[Admin] API error ${response.status}: ${responseText.substring(0, 1e3)}`);
      if (response.status === 500) {
        throw new Error(`Erreur serveur (500) sur le HUB. V\xE9rifiez les logs du HUB pour plus de d\xE9tails. R\xE9ponse: ${responseText.substring(0, 300)}`);
      }
      throw new Error(`API returned ${response.status}: ${response.statusText}. Response: ${responseText.substring(0, 300)}`);
    }
    if (!contentType.includes("application/json")) {
      console.error(`[Admin] Expected JSON but got ${contentType}. Response: ${responseText.substring(0, 1e3)}`);
      if (responseText.trim().startsWith("<!DOCTYPE") || responseText.trim().startsWith("<html")) {
        throw new Error(`L'API a retourn\xE9 du HTML au lieu de JSON (status: ${response.status}). Cela peut indiquer une erreur d'authentification ou une erreur serveur. V\xE9rifiez que la cl\xE9 API est correcte et que l'endpoint existe. R\xE9ponse: ${responseText.substring(0, 300)}`);
      }
      throw new Error(`L'API a retourn\xE9 ${contentType} au lieu de JSON. R\xE9ponse: ${responseText.substring(0, 300)}`);
    }
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error(`[Admin] Failed to parse JSON response: ${responseText.substring(0, 500)}`);
      throw new Error(`Impossible de parser la r\xE9ponse JSON. R\xE9ponse re\xE7ue: ${responseText.substring(0, 200)}`);
    }
    let testimonialsArray = [];
    if (Array.isArray(data)) {
      testimonialsArray = data;
    } else if (data.testimonials && Array.isArray(data.testimonials)) {
      testimonialsArray = data.testimonials;
    } else {
      console.warn(`[Admin] Unexpected response format:`, JSON.stringify(data).substring(0, 200));
      return [];
    }
    console.log(`[Admin] Successfully fetched ${testimonialsArray.length} testimonials (${language})`);
    return testimonialsArray.map((item) => {
      const textFr = language === "fr" ? item.text || item.textFr || "" : item.textFr || "";
      const textEn = language === "en" ? item.text || item.textEn || "" : item.textEn || "";
      const titleFr = language === "fr" ? item.title || item.titleFr || "" : item.titleFr || "";
      const titleEn = language === "en" ? item.title || item.titleEn || "" : item.titleEn || "";
      return {
        id: item.id,
        client: item.clientName || item.client || "",
        contact: item.clientName || item.contact || item.name || "",
        // clientName est utilisé comme contact
        title: titleFr || titleEn || item.title || "",
        company: item.companyName || item.company || "",
        textFr,
        textEn,
        displayOrder: item.displayOrder || item.order || item.rating || 0,
        // Utiliser rating comme fallback pour l'ordre
        isActive: item.isActive !== false && item.status !== "offline"
        // Considérer comme actif si pas explicitement offline
      };
    });
  } catch (error) {
    console.error(`[Admin] Error fetching testimonials (${language}):`, error.message);
    throw error;
  }
}
var adminRouter;
var init_admin = __esm({
  "server/routers/admin.ts"() {
    "use strict";
    init_trpc();
    init_db();
    init_schema();
    init_env();
    adminRouter = router({
      getStats: adminProcedure.query(async () => {
        try {
          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }
          const [
            agencyLeadsCount,
            leoSessionsCount,
            aiAssessmentsCount,
            leoContactsCount,
            mediaAssetsCount,
            usersCount
          ] = await Promise.all([
            db.select({ count: count2() }).from(agencyLeads),
            db.select({ count: count2() }).from(leoSessions),
            db.select({ count: count2() }).from(aiAssessments),
            db.select({ count: count2() }).from(leoContacts),
            db.select({ count: count2() }).from(mediaAssets),
            db.select({ count: count2() }).from(users)
          ]);
          return {
            agencyLeads: agencyLeadsCount[0]?.count || 0,
            leoSessions: leoSessionsCount[0]?.count || 0,
            aiAssessments: aiAssessmentsCount[0]?.count || 0,
            leoContacts: leoContactsCount[0]?.count || 0,
            mediaAssets: mediaAssetsCount[0]?.count || 0,
            totalUsers: usersCount[0]?.count || 0
          };
        } catch (error) {
          console.error("[Admin] Error fetching stats:", error);
          return {
            agencyLeads: 0,
            leoSessions: 0,
            aiAssessments: 0,
            leoContacts: 0,
            mediaAssets: 0,
            totalUsers: 0
          };
        }
      }),
      getLeoContacts: adminProcedure.query(async () => {
        try {
          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }
          const contacts = await db.select().from(leoContacts).orderBy(desc2(leoContacts.createdAt));
          return contacts;
        } catch (error) {
          console.error("[Admin] Error fetching LEO contacts:", error);
          return [];
        }
      }),
      getAINewsSubscribers: adminProcedure.query(async () => {
        try {
          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }
          const subscribers = await db.select().from(aiNewsSubscribers).orderBy(desc2(aiNewsSubscribers.createdAt));
          return subscribers;
        } catch (error) {
          console.error("[Admin] Error fetching AI News subscribers:", error);
          return [];
        }
      }),
      getStartProjectSubmissions: adminProcedure.query(async () => {
        try {
          console.log("[Admin] Starting to fetch start project submissions...");
          const db = await getDb();
          if (!db) {
            console.error("[Admin] Database connection not available");
            throw new Error("Database not available");
          }
          console.log("[Admin] Database connection OK, querying start_project_submissions table...");
          const submissions = await db.select().from(startProjectSubmissions).orderBy(desc2(startProjectSubmissions.createdAt));
          console.log(`[Admin] Successfully fetched ${submissions.length} start project submissions`);
          if (submissions.length > 0) {
            console.log("[Admin] First submission:", JSON.stringify(submissions[0], null, 2));
          } else {
            console.log("[Admin] No submissions found in database (table exists but is empty)");
          }
          return submissions;
        } catch (error) {
          console.error("[Admin] Error fetching start project submissions:", error);
          console.error("[Admin] Error message:", error?.message);
          console.error("[Admin] Error code:", error?.code);
          console.error("[Admin] Error stack:", error?.stack);
          console.error("[Admin] Full error:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
          if (error?.message?.includes("does not exist") || error?.code === "42P01") {
            console.error("[Admin] \u26A0\uFE0F Table 'start_project_submissions' does not exist. Please run migrations.");
          }
          return [];
        }
      }),
      getContactMessages: adminProcedure.query(async () => {
        try {
          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }
          const messages = await db.select().from(contactMessages).orderBy(desc2(contactMessages.createdAt));
          return messages;
        } catch (error) {
          console.error("[Admin] Error fetching contact messages:", error);
          return [];
        }
      }),
      // Statut de configuration pour la synchro témoignages (admin uniquement, pas de valeur sensible)
      getTestimonialsSyncConfig: adminProcedure.query(() => ({
        hasUrl: Boolean(ENV.internalPlatformUrl?.trim()),
        hasApiKey: Boolean(ENV.internalPlatformApiKey?.trim())
      })),
      // Synchroniser les témoignages depuis la plateforme interne
      syncTestimonials: adminProcedure.mutation(async () => {
        if (!ENV.internalPlatformUrl) {
          throw new Error("INTERNAL_PLATFORM_URL n'est pas configur\xE9e");
        }
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }
        try {
          const [frTestimonials, enTestimonials] = await Promise.all([
            fetchTestimonialsFromExternalPlatform("fr"),
            fetchTestimonialsFromExternalPlatform("en")
          ]);
          const testimonialsMap = /* @__PURE__ */ new Map();
          frTestimonials.forEach((t2) => {
            const id = t2.id || 0;
            if (!testimonialsMap.has(id)) {
              testimonialsMap.set(id, {
                id,
                client: t2.client,
                contact: t2.contact,
                title: t2.title,
                company: t2.company,
                textFr: t2.textFr || t2.text || "",
                textEn: "",
                displayOrder: t2.displayOrder || 0,
                isActive: t2.isActive !== false
              });
            } else {
              const existing = testimonialsMap.get(id);
              existing.textFr = t2.textFr || t2.text || existing.textFr;
            }
          });
          enTestimonials.forEach((t2) => {
            const id = t2.id || 0;
            if (!testimonialsMap.has(id)) {
              testimonialsMap.set(id, {
                id,
                client: t2.client,
                contact: t2.contact,
                title: t2.title,
                company: t2.company,
                textFr: "",
                textEn: t2.textEn || t2.text || "",
                displayOrder: t2.displayOrder || 0,
                isActive: t2.isActive !== false
              });
            } else {
              const existing = testimonialsMap.get(id);
              existing.textEn = t2.textEn || t2.text || existing.textEn;
            }
          });
          const testimonialsToSync = Array.from(testimonialsMap.values());
          if (testimonialsToSync.length === 0) {
            return {
              success: false,
              message: "Aucun t\xE9moignage trouv\xE9 sur la plateforme interne",
              synced: 0
            };
          }
          let synced = 0;
          let updated = 0;
          let created = 0;
          for (const testimonial of testimonialsToSync) {
            const existing = await db.select().from(testimonials).where(
              and(
                eq2(testimonials.client, testimonial.client),
                eq2(testimonials.contact, testimonial.contact)
              )
            ).limit(1);
            const testimonialData = {
              client: testimonial.client,
              contact: testimonial.contact,
              title: testimonial.title,
              company: testimonial.company,
              textEn: testimonial.textEn || "",
              textFr: testimonial.textFr || "",
              displayOrder: testimonial.displayOrder,
              isActive: testimonial.isActive
            };
            if (existing.length > 0) {
              await db.update(testimonials).set({
                ...testimonialData,
                updatedAt: /* @__PURE__ */ new Date()
              }).where(eq2(testimonials.id, existing[0].id));
              updated++;
            } else {
              await db.insert(testimonials).values(testimonialData);
              created++;
            }
            synced++;
          }
          return {
            success: true,
            message: `Synchronisation r\xE9ussie : ${synced} t\xE9moignages synchronis\xE9s (${created} cr\xE9\xE9s, ${updated} mis \xE0 jour)`,
            synced,
            created,
            updated
          };
        } catch (error) {
          console.error("[Admin] Error syncing testimonials:", error);
          throw new Error(`Erreur lors de la synchronisation : ${error.message}`);
        }
      })
    });
  }
});

// server/html-sanitizer.ts
function sanitizeLoaderHTML(html) {
  if (!html || typeof html !== "string") {
    return html;
  }
  let sanitized = html;
  const h1Matches = sanitized.match(/<h1[^>]*>/gi);
  if (h1Matches && h1Matches.length > 1) {
    let h1Count = 0;
    sanitized = sanitized.replace(/<h1([^>]*)>/gi, (match, attributes) => {
      h1Count++;
      if (h1Count === 1) {
        return match;
      } else {
        return `<h2${attributes}>`;
      }
    });
    let h1CloseCount = 0;
    sanitized = sanitized.replace(/<\/h1>/gi, (match) => {
      h1CloseCount++;
      if (h1CloseCount === 1) {
        return match;
      } else {
        return "</h2>";
      }
    });
  }
  sanitized = sanitized.replace(
    /<img([^>]*?)(?:\s+alt\s*=\s*["'][^"']*["'])?([^>]*?)>/gi,
    (match, before, after) => {
      if (/alt\s*=/i.test(match)) {
        return match;
      }
      const srcMatch = match.match(/src\s*=\s*["']([^"']+)["']/i);
      const src = srcMatch ? srcMatch[1] : "";
      let altText = "D\xE9coration Nukleo Digital";
      if (src.includes("logo") || src.includes("nukleo") || src.includes("Nukleo")) {
        altText = "Logo Nukleo Digital";
      } else if (src.includes("arrow")) {
        altText = "Fl\xE8che d\xE9corative Nukleo Digital";
      } else if (src.includes("particle") || src.includes("shape")) {
        altText = "\xC9l\xE9ment d\xE9coratif";
      }
      const beforeAlt = before || "";
      const afterAlt = after || "";
      return `<img${beforeAlt} alt="${altText}"${afterAlt}>`;
    }
  );
  sanitized = sanitized.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "");
  sanitized = sanitized.replace(/javascript:/gi, "");
  return sanitized;
}
function validateLoaderHTML(html) {
  const errors = [];
  const warnings = [];
  if (!html || typeof html !== "string") {
    return { isValid: false, errors: ["HTML content is empty or invalid"], warnings: [] };
  }
  const h1Matches = html.match(/<h1[^>]*>/gi);
  if (h1Matches && h1Matches.length > 1) {
    errors.push(`Found ${h1Matches.length} <h1> tags. Only one is allowed.`);
  }
  const imgMatches = html.match(/<img[^>]*>/gi);
  if (imgMatches) {
    imgMatches.forEach((img, index) => {
      if (!/alt\s*=/i.test(img)) {
        errors.push(`Image ${index + 1} is missing alt attribute: ${img.substring(0, 50)}...`);
      }
    });
  }
  if (/<script[^>]*>/i.test(html)) {
    warnings.push("HTML contains <script> tags which will be removed for security.");
  }
  if (/\son\w+\s*=/i.test(html)) {
    warnings.push("HTML contains event handlers (onclick, etc.) which will be removed for security.");
  }
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
var init_html_sanitizer = __esm({
  "server/html-sanitizer.ts"() {
    "use strict";
  }
});

// server/loaders.ts
var loaders_exports = {};
__export(loaders_exports, {
  createLoader: () => createLoader,
  deleteLoader: () => deleteLoader,
  getActiveLoaders: () => getActiveLoaders,
  getAllLoaders: () => getAllLoaders,
  getLoaderById: () => getLoaderById,
  toggleLoaderActive: () => toggleLoaderActive,
  updateLoader: () => updateLoader
});
import { eq as eq3, desc as desc3 } from "drizzle-orm";
async function getAllLoaders() {
  const database = await getDb();
  if (!database) return [];
  try {
    return await database.select().from(loaders).orderBy(desc3(loaders.createdAt));
  } catch (error) {
    console.warn("[Loaders] Table may not exist yet:", error);
    return [];
  }
}
async function getActiveLoaders() {
  const database = await getDb();
  if (!database) return [];
  try {
    return await database.select().from(loaders).where(eq3(loaders.isActive, true)).orderBy(loaders.displayOrder);
  } catch (error) {
    console.warn("[Loaders] Table may not exist yet:", error);
    return [];
  }
}
async function getLoaderById(id) {
  const database = await getDb();
  if (!database) return null;
  const result = await database.select().from(loaders).where(eq3(loaders.id, id)).limit(1);
  return result[0] || null;
}
async function createLoader(data) {
  const database = await getDb();
  if (!database) {
    throw new Error("Database not available");
  }
  try {
    const sanitizedData = {
      ...data,
      cssCode: data.cssCode ? sanitizeLoaderHTML(data.cssCode) : data.cssCode
    };
    const result = await database.insert(loaders).values({
      ...sanitizedData,
      updatedAt: /* @__PURE__ */ new Date()
    }).returning();
    return result[0];
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    const errorCode = error instanceof Error && "code" in error ? error.code : null;
    if (errorCode === "ECONNREFUSED") {
      throw new Error("Database connection refused");
    }
    throw new Error(`Failed to create loader: ${errorMsg}`);
  }
}
async function updateLoader(id, data) {
  const database = await getDb();
  if (!database) throw new Error("Database not available");
  const sanitizedData = {
    ...data,
    cssCode: data.cssCode ? sanitizeLoaderHTML(data.cssCode) : data.cssCode
  };
  const result = await database.update(loaders).set({
    ...sanitizedData,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq3(loaders.id, id)).returning();
  return result[0];
}
async function deleteLoader(id) {
  const database = await getDb();
  if (!database) throw new Error("Database not available");
  await database.delete(loaders).where(eq3(loaders.id, id));
}
async function toggleLoaderActive(id) {
  const database = await getDb();
  if (!database) throw new Error("Database not available");
  const loader = await getLoaderById(id);
  if (!loader) throw new Error("Loader not found");
  const result = await database.update(loaders).set({
    isActive: !loader.isActive,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq3(loaders.id, id)).returning();
  return result[0];
}
var init_loaders = __esm({
  "server/loaders.ts"() {
    "use strict";
    init_db();
    init_schema();
    init_html_sanitizer();
  }
});

// server/migrate-loaders.ts
async function migrateLoaders() {
  console.log("\u{1F504} Starting loader migration...\n");
  try {
    const allLoaders = await getAllLoaders();
    console.log(`\u{1F4CA} Found ${allLoaders.length} loaders to check
`);
    let updated = 0;
    let skipped = 0;
    let errors = 0;
    for (const loader of allLoaders) {
      console.log(`
\u{1F4DD} Processing loader: "${loader.name}" (ID: ${loader.id})`);
      const validation = validateLoaderHTML(loader.cssCode);
      if (validation.isValid && validation.warnings.length === 0) {
        console.log("  \u2705 Already valid, skipping...");
        skipped++;
        continue;
      }
      if (validation.errors.length > 0) {
        console.log("  \u26A0\uFE0F  Issues found:");
        validation.errors.forEach((error) => console.log(`     - ${error}`));
      }
      if (validation.warnings.length > 0) {
        console.log("  \u26A0\uFE0F  Warnings:");
        validation.warnings.forEach((warning) => console.log(`     - ${warning}`));
      }
      const sanitized = sanitizeLoaderHTML(loader.cssCode);
      if (sanitized === loader.cssCode) {
        console.log("  \u2139\uFE0F  No changes needed");
        skipped++;
        continue;
      }
      try {
        await updateLoader(loader.id, { cssCode: sanitized });
        console.log("  \u2705 Updated successfully");
        updated++;
      } catch (error) {
        console.error(`  \u274C Error updating loader: ${error}`);
        errors++;
      }
    }
    console.log("\n" + "=".repeat(50));
    console.log("\u{1F4CA} Migration Summary:");
    console.log(`   \u2705 Updated: ${updated}`);
    console.log(`   \u23ED\uFE0F  Skipped: ${skipped}`);
    console.log(`   \u274C Errors: ${errors}`);
    console.log("=".repeat(50) + "\n");
    if (errors === 0) {
      console.log("\u2705 Migration completed successfully!");
    } else {
      console.log("\u26A0\uFE0F  Migration completed with errors. Please review the output above.");
    }
  } catch (error) {
    console.error("\u274C Migration failed:", error);
    throw error;
  }
}
var init_migrate_loaders = __esm({
  "server/migrate-loaders.ts"() {
    "use strict";
    init_loaders();
    init_html_sanitizer();
  }
});

// server/loadersRouter.ts
import { z as z8 } from "zod";
var loadersRouter;
var init_loadersRouter = __esm({
  "server/loadersRouter.ts"() {
    "use strict";
    init_trpc();
    init_loaders();
    init_html_sanitizer();
    init_migrate_loaders();
    loadersRouter = router({
      getAll: publicProcedure.query(async () => {
        try {
          const result = await getAllLoaders();
          return Array.isArray(result) ? result : [];
        } catch (error) {
          console.warn("[Loaders Router] Error in getAll:", error);
          return [];
        }
      }),
      getActive: publicProcedure.query(async () => {
        try {
          const result = await getActiveLoaders();
          return Array.isArray(result) ? result : [];
        } catch (error) {
          console.warn("[Loaders Router] Error in getActive:", error);
          return [];
        }
      }),
      getById: publicProcedure.input(z8.object({ id: z8.number() })).query(async ({ input }) => {
        return await getLoaderById(input.id);
      }),
      create: publicProcedure.input(
        z8.object({
          name: z8.string().min(1).max(255),
          description: z8.string().optional(),
          cssCode: z8.string().min(1),
          isActive: z8.boolean().default(false),
          displayOrder: z8.number().default(0)
        })
      ).mutation(async ({ input }) => {
        return await createLoader(input);
      }),
      update: publicProcedure.input(
        z8.object({
          id: z8.number(),
          name: z8.string().min(1).max(255).optional(),
          description: z8.string().optional(),
          cssCode: z8.string().min(1).optional(),
          isActive: z8.boolean().optional(),
          displayOrder: z8.number().optional()
        })
      ).mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await updateLoader(id, data);
      }),
      delete: publicProcedure.input(z8.object({ id: z8.number() })).mutation(async ({ input }) => {
        await deleteLoader(input.id);
        return { success: true };
      }),
      toggleActive: publicProcedure.input(z8.object({ id: z8.number() })).mutation(async ({ input }) => {
        return await toggleLoaderActive(input.id);
      }),
      validate: publicProcedure.input(z8.object({ cssCode: z8.string() })).query(async ({ input }) => {
        return validateLoaderHTML(input.cssCode);
      }),
      // Admin routes
      checkAll: adminProcedure.query(async () => {
        try {
          const allLoaders = await getAllLoaders();
          const safeLoaders = Array.isArray(allLoaders) ? allLoaders : [];
          const results = safeLoaders.map((loader) => {
            const validation = validateLoaderHTML(loader.cssCode);
            return {
              id: loader.id,
              name: loader.name,
              isActive: loader.isActive,
              ...validation
            };
          });
          const needsMigration = results.filter((r) => !r.isValid || r.errors.length > 0 || r.warnings.length > 0);
          return {
            total: results.length,
            needsMigration: needsMigration.length,
            results,
            summary: {
              valid: results.filter((r) => r.isValid && r.errors.length === 0 && r.warnings.length === 0).length,
              hasErrors: results.filter((r) => r.errors.length > 0).length,
              hasWarnings: results.filter((r) => r.warnings.length > 0).length
            }
          };
        } catch (error) {
          console.error("[Loaders Router] Error in checkAll:", error);
          return {
            total: 0,
            needsMigration: 0,
            results: [],
            summary: {
              valid: 0,
              hasErrors: 0,
              hasWarnings: 0
            }
          };
        }
      }),
      migrateAll: adminProcedure.mutation(async () => {
        await migrateLoaders();
        return { success: true, message: "Migration completed. Check server logs for details." };
      })
    });
  }
});

// server/routers/testimonials.ts
import { z as z9 } from "zod";
import { eq as eq4, desc as desc4 } from "drizzle-orm";
var testimonialsRouter;
var init_testimonials = __esm({
  "server/routers/testimonials.ts"() {
    "use strict";
    init_trpc();
    init_db();
    init_schema();
    testimonialsRouter = router({
      getAll: publicProcedure.input(
        z9.object({
          language: z9.enum(["fr", "en"]).default("en")
        }).optional()
      ).query(async ({ input }) => {
        const language = input?.language || "en";
        const db = await getDb();
        if (!db) {
          console.warn("[Database] Cannot get testimonials: database not available");
          return [];
        }
        try {
          const allTestimonials = await db.select().from(testimonials).where(eq4(testimonials.isActive, true)).orderBy(desc4(testimonials.displayOrder), desc4(testimonials.createdAt));
          const safeTestimonials = Array.isArray(allTestimonials) ? allTestimonials : [];
          return safeTestimonials.map((testimonial) => ({
            id: testimonial.id,
            client: testimonial.client,
            contact: testimonial.contact,
            title: testimonial.title,
            company: testimonial.company,
            text: language === "fr" ? testimonial.textFr : testimonial.textEn,
            displayOrder: testimonial.displayOrder
          }));
        } catch (error) {
          if (error instanceof Error && "code" in error && error.code === "ECONNREFUSED") {
            return [];
          }
          console.error("Error fetching testimonials from database:", error);
          return [];
        }
      })
    });
  }
});

// server/routers/radar.ts
var radar_exports = {};
__export(radar_exports, {
  radarRouter: () => radarRouter,
  seedRadarTechnologies: () => seedRadarTechnologies
});
import { z as z10 } from "zod";
import { eq as eq5, desc as desc5, and as and2, gte, lte } from "drizzle-orm";
async function generateNewsForTechnology(technology, latestPosition) {
  const prompt = `Tu es un expert en intelligence artificielle et tendances technologiques mondiales.

G\xE9n\xE8re une nouvelle br\xE8ve et pertinente (style article de blog/news) sur la technologie suivante :

Technologie: ${technology.name}
Description: ${technology.description}

${latestPosition ? `
Contexte actuel:
- Maturit\xE9: ${latestPosition.maturityScore}/100 (${latestPosition.maturityLevel})
- Impact: ${latestPosition.impactScore}/100
` : ""}

G\xE9n\xE8re une nouvelle bas\xE9e sur des d\xE9veloppements R\xC9CENTS MONDIAUX r\xE9els avec:
1. Un titre accrocheur bas\xE9 sur des tendances r\xE9elles (max 80 caract\xE8res)
2. Un r\xE9sum\xE9 de 2-3 phrases d\xE9crivant les d\xE9veloppements r\xE9cents (max 200 caract\xE8res)
3. Un ton professionnel mais accessible
4. Focus sur les d\xE9veloppements R\xC9CENTS MONDIAUX, cas d'usage concrets, ou implications business
5. Le nom d'une source cr\xE9dible (TechCrunch, The Verge, MIT Technology Review, etc.) - mais NE PAS inventer d'URL

CRITIQUE: 
- NE JAMAIS inventer ou g\xE9n\xE9rer d'URLs fictives
- Si tu ne connais pas une URL r\xE9elle et v\xE9rifiable, laisse le champ "url" vide ou null
- Les nouvelles doivent \xEAtre bas\xE9es sur des tendances r\xE9elles, mais sans pr\xE9tendre avoir une URL sp\xE9cifique si tu n'en connais pas une

R\xE9ponds en JSON avec cette structure exacte:
{
  "title": "titre accrocheur bas\xE9 sur tendances r\xE9elles",
  "summary": "r\xE9sum\xE9 de 2-3 phrases d\xE9crivant les d\xE9veloppements r\xE9cents mondiaux",
  "source": "nom de la source cr\xE9dible (ex: TechCrunch, The Verge, MIT Technology Review)",
  "url": null
}

Si tu connais une URL r\xE9elle et v\xE9rifiable, tu peux l'inclure. Sinon, utilise null pour le champ url.`;
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "Tu es un journaliste sp\xE9cialis\xE9 en IA et tendances technologiques. Tu g\xE9n\xE8res des nouvelles br\xE8ves et pertinentes en JSON. IMPORTANT: Ne JAMAIS inventer d'URLs. Si tu ne connais pas une URL r\xE9elle et v\xE9rifiable, utilise null pour le champ url."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      responseFormat: {
        type: "json_object"
      },
      maxTokens: 500
    });
    const content = response.choices[0]?.message?.content;
    if (!content || typeof content !== "string") {
      throw new Error("Invalid AI response");
    }
    const parsed = JSON.parse(content);
    let url = parsed.url;
    if (url && typeof url === "string" && url.trim() !== "" && url !== "null") {
      try {
        const urlObj = new URL(url);
        if (!["http:", "https:"].includes(urlObj.protocol)) {
          url = void 0;
        }
        if (url.includes("exemple.com") || url.includes("example.com") || url.includes("placeholder")) {
          url = void 0;
        }
      } catch {
        url = void 0;
      }
    } else {
      url = void 0;
    }
    return {
      id: `news-${technology.slug}-${Date.now()}`,
      title: parsed.title,
      summary: parsed.summary,
      technology: technology.name,
      technologySlug: technology.slug,
      date: /* @__PURE__ */ new Date(),
      source: parsed.source || "Nukleo Digital AI Radar",
      url
      // URL vers l'article réel si disponible
    };
  } catch (error) {
    return {
      id: `news-${technology.slug}-${Date.now()}`,
      title: `${technology.name}: Tendances et d\xE9veloppements r\xE9cents mondiaux`,
      summary: `D\xE9couvrez les derni\xE8res \xE9volutions et cas d'usage de ${technology.name} \xE0 travers le monde.`,
      technology: technology.name,
      technologySlug: technology.slug,
      date: /* @__PURE__ */ new Date(),
      source: "Nukleo Digital AI Radar",
      url: void 0
      // Pas d'URL pour les fallbacks
    };
  }
}
async function generateRadarPosition(technology, previousPosition) {
  const previousDate = previousPosition ? typeof previousPosition.date === "string" ? new Date(previousPosition.date) : previousPosition.date instanceof Date ? previousPosition.date : new Date(previousPosition.date) : null;
  const prompt = `Tu es un expert en intelligence artificielle et tendances technologiques pour le march\xE9 canadien francophone. 

Analyse la technologie suivante et g\xE9n\xE8re une position pour le radar des tendances IA :

Technologie: ${technology.name}
Description: ${technology.description}

${previousPosition && previousDate ? `
Position pr\xE9c\xE9dente (${previousDate.toISOString().split("T")[0]}):
- Maturit\xE9: ${previousPosition.maturityScore}/100 (${previousPosition.maturityLevel})
- Impact: ${previousPosition.impactScore}/100
` : "C'est la premi\xE8re analyse de cette technologie."}

G\xE9n\xE8re une analyse compl\xE8te avec:
1. Maturit\xE9 technologique (0-100): 0 = \xC9mergent, 100 = \xC9tabli
2. Impact business (0-100): 0 = Faible, 100 = \xC9lev\xE9
3. D\xE9finition d\xE9taill\xE9e (2-3 paragraphes en fran\xE7ais)
4. Cas d'usage concrets avec exemples d'entreprises
5. Justification du niveau de maturit\xE9
6. Impact business quantifi\xE9
7. Barri\xE8res \xE0 l'adoption (co\xFBt, comp\xE9tences, infrastructure)
8. Recommandations d'adoption par niveau de maturit\xE9 organisationnelle

R\xE9ponds en JSON avec cette structure exacte:
{
  "maturityScore": nombre 0-100,
  "impactScore": nombre 0-100,
  "definition": "texte de 2-3 paragraphes",
  "useCases": [{"title": "titre", "description": "description", "examples": ["exemple1", "exemple2"]}],
  "maturityLevel": "\xC9mergent" | "Maturit\xE9 Moyenne" | "\xC9tabli",
  "maturityJustification": "justification d\xE9taill\xE9e",
  "impactBusiness": "impact quantifi\xE9 avec m\xE9triques",
  "adoptionBarriers": [{"type": "Co\xFBt" | "Comp\xE9tences" | "Infrastructure", "description": "description"}],
  "recommendations": {
    "Explorateur": "recommandation pour explorateurs",
    "Exp\xE9rimentateur": "recommandation pour exp\xE9rimentateurs",
    "Adopteur": "recommandation pour adopteurs",
    "Int\xE9grateur": "recommandation pour int\xE9grateurs",
    "Leader IA": "recommandation pour leaders IA"
  }
}`;
  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: "Tu es un expert en IA et tendances technologiques. Tu g\xE9n\xE8res des analyses structur\xE9es en JSON."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    responseFormat: {
      type: "json_object"
    },
    maxTokens: 4e3
  });
  const content = response.choices[0]?.message?.content;
  if (!content || typeof content !== "string") {
    throw new Error("Invalid AI response");
  }
  const parsed = JSON.parse(content);
  return {
    maturityScore: parsed.maturityScore,
    impactScore: parsed.impactScore,
    definition: parsed.definition,
    useCases: JSON.stringify(parsed.useCases),
    maturityLevel: parsed.maturityLevel,
    maturityJustification: parsed.maturityJustification,
    impactBusiness: parsed.impactBusiness,
    adoptionBarriers: JSON.stringify(parsed.adoptionBarriers),
    recommendations: JSON.stringify(parsed.recommendations)
  };
}
async function seedRadarTechnologies() {
  const db = await getDb();
  if (!db) {
    console.error("Database connection failed, skipping radar seed");
    return;
  }
  const existing = await db.select().from(radarTechnologies);
  if (existing.length > 0) {
    const techs = await db.select().from(radarTechnologies);
    for (const tech of techs) {
      const hasPosition = await db.select().from(radarPositions).where(eq5(radarPositions.technologyId, tech.id)).limit(1);
      if (hasPosition.length === 0) {
        try {
          const initialPosition = await generateRadarPosition(
            { name: tech.name, description: tech.description },
            null
          );
          const today = /* @__PURE__ */ new Date();
          today.setHours(0, 0, 0, 0);
          await db.insert(radarPositions).values({
            technologyId: tech.id,
            date: today,
            ...initialPosition
          });
        } catch (error) {
          console.error(`Failed to generate initial position for ${tech.name}:`, error);
        }
      }
    }
    return;
  }
  for (const tech of INITIAL_TECHNOLOGIES) {
    const [inserted] = await db.insert(radarTechnologies).values(tech).returning();
    try {
      const initialPosition = await generateRadarPosition(
        { name: tech.name, description: tech.description },
        null
      );
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      await db.insert(radarPositions).values({
        technologyId: inserted.id,
        date: today,
        ...initialPosition
      });
    } catch (error) {
      console.error(`Failed to generate initial position for ${tech.name}:`, error);
    }
  }
}
var INITIAL_TECHNOLOGIES, radarRouter;
var init_radar = __esm({
  "server/routers/radar.ts"() {
    "use strict";
    init_trpc();
    init_db();
    init_schema();
    init_llm();
    INITIAL_TECHNOLOGIES = [
      { name: "Agentic AI", slug: "agentic-ai", description: "Syst\xE8mes d'agents autonomes capables de planifier et d'ex\xE9cuter des t\xE2ches complexes multi-\xE9tapes sans supervision humaine constante" },
      { name: "Multimodal LLMs", slug: "multimodal-llms", description: "Mod\xE8les de langage capables de traiter simultan\xE9ment texte, images, audio et vid\xE9o pour des interactions plus riches" },
      { name: "AI Agents", slug: "ai-agents", description: "Assistants IA sp\xE9cialis\xE9s int\xE9gr\xE9s dans des workflows m\xE9tier sp\xE9cifiques comme sales, customer support, ou data analysis" },
      { name: "RAG Systems", slug: "rag-systems", description: "Retrieval-Augmented Generation, combinant recherche s\xE9mantique et g\xE9n\xE9ration pour r\xE9duire les hallucinations et ancrer les r\xE9ponses dans des donn\xE9es propri\xE9taires" },
      { name: "AI Orchestration", slug: "ai-orchestration", description: "Plateformes de coordination de multiples mod\xE8les IA et agents pour des workflows complexes" },
      { name: "Edge AI", slug: "edge-ai", description: "D\xE9ploiement de mod\xE8les IA directement sur appareils edge pour latence r\xE9duite et confidentialit\xE9 accrue" },
      { name: "Synthetic Data", slug: "synthetic-data", description: "G\xE9n\xE9ration de donn\xE9es d'entra\xEEnement synth\xE9tiques pour contourner les limitations de donn\xE9es r\xE9elles" },
      { name: "AI Governance", slug: "ai-governance", description: "Frameworks, outils et processus pour assurer conformit\xE9, \xE9thique et auditabilit\xE9 des syst\xE8mes IA" }
    ];
    radarRouter = router({
      getCurrent: publicProcedure.query(async () => {
        const db = await getDb();
        if (!db) {
          console.warn("[Radar] Database connection failed");
          return [];
        }
        try {
          const technologies = await db.select().from(radarTechnologies).orderBy(radarTechnologies.name);
          if (!technologies || technologies.length === 0) {
            return [];
          }
          const positions = await Promise.all(
            technologies.map(async (tech) => {
              const latestPosition = await db.select().from(radarPositions).where(eq5(radarPositions.technologyId, tech.id)).orderBy(desc5(radarPositions.date)).limit(1);
              return {
                technology: tech,
                position: latestPosition[0] || null
              };
            })
          );
          return positions.filter((p) => p.position !== null);
        } catch (error) {
          const errorMessage = error?.message || "";
          const errorCode = error?.code || "";
          if (errorMessage.includes("does not exist") || errorMessage.includes("relation") || errorCode === "42P01" || errorMessage.includes("radar_technologies")) {
            console.warn("[Radar] Tables not initialized yet, returning empty array. Error:", errorMessage);
            return [];
          }
          console.error("[Radar] Error fetching radar data:", error);
          throw error;
        }
      }),
      getHistory: publicProcedure.input(z10.object({
        technologyId: z10.number().optional(),
        startDate: z10.date().optional(),
        endDate: z10.date().optional()
      })).query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        try {
          let query = db.select().from(radarPositions);
          if (input.technologyId) {
            query = query.where(eq5(radarPositions.technologyId, input.technologyId));
          }
          if (input.startDate) {
            query = query.where(gte(radarPositions.date, input.startDate));
          }
          if (input.endDate) {
            query = query.where(lte(radarPositions.date, input.endDate));
          }
          return query.orderBy(desc5(radarPositions.date));
        } catch (error) {
          const errorMessage = error?.message || "";
          if (errorMessage.includes("does not exist") || errorMessage.includes("relation") || error?.code === "42P01") {
            console.warn("[Radar] Tables not initialized yet, returning empty array");
            return [];
          }
          throw error;
        }
      }),
      getTechnology: publicProcedure.input(z10.object({ slug: z10.string() })).query(async ({ input }) => {
        const db = await getDb();
        if (!db) return null;
        try {
          const tech = await db.select().from(radarTechnologies).where(eq5(radarTechnologies.slug, input.slug)).limit(1);
          if (!tech[0]) return null;
          const latestPosition = await db.select().from(radarPositions).where(eq5(radarPositions.technologyId, tech[0].id)).orderBy(desc5(radarPositions.date)).limit(1);
          return {
            technology: tech[0],
            position: latestPosition[0] || null
          };
        } catch (error) {
          const errorMessage = error?.message || "";
          if (errorMessage.includes("does not exist") || errorMessage.includes("relation") || error?.code === "42P01") {
            console.warn("[Radar] Tables not initialized yet, returning null");
            return null;
          }
          throw error;
        }
      }),
      // Get latest AI news related to radar technologies
      getLatestNews: publicProcedure.input(z10.object({ limit: z10.number().min(1).max(10).default(5) }).optional()).query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        try {
          const technologies = await db.select().from(radarTechnologies).orderBy(radarTechnologies.name);
          if (technologies.length === 0) {
            return [];
          }
          const limit = input?.limit || 5;
          const selectedTechs = technologies.slice(0, limit);
          const newsItems = await Promise.all(
            selectedTechs.map(async (tech) => {
              try {
                const latestPosition = await db.select().from(radarPositions).where(eq5(radarPositions.technologyId, tech.id)).orderBy(desc5(radarPositions.date)).limit(1);
                const news = await generateNewsForTechnology(tech, latestPosition[0] || null);
                return news;
              } catch (error) {
                console.error(`Error generating news for ${tech.name}:`, error);
                return null;
              }
            })
          );
          return newsItems.filter((item) => item !== null);
        } catch (error) {
          const errorMessage = error?.message || "";
          if (errorMessage.includes("does not exist") || errorMessage.includes("relation") || error?.code === "42P01") {
            console.warn("[Radar] Tables not initialized yet, returning empty array");
            return [];
          }
          console.error("[Radar] Error fetching news:", error);
          return [];
        }
      }),
      // Generate daily refresh - should be called by cron job
      refreshDaily: publicProcedure.mutation(async () => {
        const db = await getDb();
        if (!db) throw new Error("Database connection failed");
        const technologies = await db.select().from(radarTechnologies);
        const today = /* @__PURE__ */ new Date();
        today.setHours(0, 0, 0, 0);
        const results = [];
        for (const tech of technologies) {
          const existingToday = await db.select().from(radarPositions).where(
            and2(
              eq5(radarPositions.technologyId, tech.id),
              gte(radarPositions.date, today)
            )
          ).limit(1);
          if (existingToday.length > 0) {
            results.push({ technology: tech.name, status: "skipped", reason: "Already updated today" });
            continue;
          }
          const previousPosition = await db.select().from(radarPositions).where(eq5(radarPositions.technologyId, tech.id)).orderBy(desc5(radarPositions.date)).limit(1);
          try {
            const newPosition = await generateRadarPosition(tech, previousPosition[0] || null);
            await db.insert(radarPositions).values({
              technologyId: tech.id,
              date: today,
              ...newPosition
            });
            results.push({ technology: tech.name, status: "success" });
          } catch (error) {
            console.error(`Error generating position for ${tech.name}:`, error);
            results.push({ technology: tech.name, status: "error", error: String(error) });
          }
        }
        return { results, date: today };
      })
    });
  }
});

// server/routers/pageVisibility.ts
import { eq as eq6, desc as desc6 } from "drizzle-orm";
import { z as z11 } from "zod";
var pageVisibilityRouter;
var init_pageVisibility = __esm({
  "server/routers/pageVisibility.ts"() {
    "use strict";
    init_trpc();
    init_db();
    init_schema();
    pageVisibilityRouter = router({
      // Get all pages visibility (public - needed for frontend menu/footer filtering)
      // This is safe because it only returns visibility status, not sensitive data
      getAll: publicProcedure.query(async () => {
        try {
          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }
          const pages = await db.select().from(pageVisibility).orderBy(desc6(pageVisibility.updatedAt));
          return Array.isArray(pages) ? pages : [];
        } catch (error) {
          const code = (error && typeof error === "object" && "code" in error ? error.code : null) || (error && typeof error === "object" && "cause" in error && error.cause && typeof error.cause === "object" && "code" in error.cause ? error.cause.code : null);
          if (code === "ECONNREFUSED" || code === "42P01") {
            if (code === "42P01") {
              console.warn("[PageVisibility] Table page_visibility does not exist yet; run init-db or deploy with updated init-db.");
            }
            return [];
          }
          console.error("[PageVisibility] Error fetching pages:", error);
          return [];
        }
      }),
      // Get visibility for a specific path (public - needed for frontend routing)
      getByPath: publicProcedure.input(z11.object({ path: z11.string() })).query(async ({ input }) => {
        try {
          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }
          const page = await db.select().from(pageVisibility).where(eq6(pageVisibility.path, input.path)).limit(1);
          return page[0] || { path: input.path, isVisible: true };
        } catch (error) {
          const code = (error && typeof error === "object" && "code" in error ? error.code : null) || (error && typeof error === "object" && "cause" in error && error.cause && typeof error.cause === "object" && "code" in error.cause ? error.cause.code : null);
          if (code === "42P01") {
            console.warn("[PageVisibility] Table page_visibility does not exist yet; run init-db or deploy with updated init-db.");
          } else {
            console.error("[PageVisibility] Error fetching page visibility:", error);
          }
          return { path: input.path, isVisible: true };
        }
      }),
      // Update visibility for a page (admin only)
      updateVisibility: adminProcedure.input(
        z11.object({
          path: z11.string(),
          isVisible: z11.boolean(),
          description: z11.string().optional()
        })
      ).mutation(async ({ input }) => {
        try {
          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }
          const existing = await db.select().from(pageVisibility).where(eq6(pageVisibility.path, input.path)).limit(1);
          if (existing.length > 0) {
            await db.update(pageVisibility).set({
              isVisible: input.isVisible,
              description: input.description,
              updatedAt: /* @__PURE__ */ new Date()
            }).where(eq6(pageVisibility.path, input.path));
          } else {
            await db.insert(pageVisibility).values({
              path: input.path,
              isVisible: input.isVisible,
              description: input.description
            });
          }
          return { success: true };
        } catch (error) {
          console.error("[PageVisibility] Error updating visibility:", error);
          throw new Error("Failed to update page visibility");
        }
      }),
      // Bulk update visibility (admin only)
      bulkUpdate: adminProcedure.input(
        z11.array(
          z11.object({
            path: z11.string(),
            isVisible: z11.boolean(),
            description: z11.string().optional()
          })
        )
      ).mutation(async ({ input }) => {
        try {
          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }
          for (const page of input) {
            const existing = await db.select().from(pageVisibility).where(eq6(pageVisibility.path, page.path)).limit(1);
            if (existing.length > 0) {
              await db.update(pageVisibility).set({
                isVisible: page.isVisible,
                description: page.description,
                updatedAt: /* @__PURE__ */ new Date()
              }).where(eq6(pageVisibility.path, page.path));
            } else {
              await db.insert(pageVisibility).values({
                path: page.path,
                isVisible: page.isVisible,
                description: page.description
              });
            }
          }
          return { success: true };
        } catch (error) {
          console.error("[PageVisibility] Error bulk updating:", error);
          throw new Error("Failed to bulk update page visibility");
        }
      })
    });
  }
});

// server/routers/analytics.ts
import { eq as eq7 } from "drizzle-orm";
import { z as z12 } from "zod";
var analyticsRouter;
var init_analytics = __esm({
  "server/routers/analytics.ts"() {
    "use strict";
    init_trpc();
    init_db();
    init_schema();
    analyticsRouter = router({
      // Get all analytics configurations (admin only)
      getAll: adminProcedure.query(async () => {
        try {
          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }
          const configs = await db.select().from(analytics);
          return Array.isArray(configs) ? configs : [];
        } catch (error) {
          if (error instanceof Error && "code" in error && error.code === "ECONNREFUSED") {
            return [];
          }
          console.error("[Analytics] Error fetching configurations:", error);
          return [];
        }
      }),
      // Get active analytics configurations only (public for frontend to load scripts)
      // This is safe because it only returns enabled configs, not sensitive data
      getActive: publicProcedure.query(async () => {
        try {
          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }
          const configs = await db.select().from(analytics).where(eq7(analytics.isEnabled, true));
          return Array.isArray(configs) ? configs : [];
        } catch (error) {
          if (error instanceof Error && "code" in error && error.code === "ECONNREFUSED") {
            return [];
          }
          console.error("[Analytics] Error fetching active configurations:", error);
          return [];
        }
      }),
      // Get configuration for a specific provider (admin only)
      getByProvider: adminProcedure.input(z12.object({ provider: z12.string() })).query(async ({ input }) => {
        try {
          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }
          const config = await db.select().from(analytics).where(eq7(analytics.provider, input.provider)).limit(1);
          return config[0] || null;
        } catch (error) {
          console.error("[Analytics] Error fetching configuration:", error);
          return null;
        }
      }),
      // Update or create analytics configuration
      upsert: publicProcedure.input(
        z12.object({
          provider: z12.enum(["google-analytics", "facebook-pixel", "linkedin-insight"]),
          isEnabled: z12.boolean(),
          trackingId: z12.string().optional(),
          additionalConfig: z12.string().optional()
        })
      ).mutation(async ({ input }) => {
        try {
          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }
          const existing = await db.select().from(analytics).where(eq7(analytics.provider, input.provider)).limit(1);
          if (existing.length > 0) {
            await db.update(analytics).set({
              isEnabled: input.isEnabled,
              trackingId: input.trackingId,
              additionalConfig: input.additionalConfig,
              updatedAt: /* @__PURE__ */ new Date()
            }).where(eq7(analytics.provider, input.provider));
          } else {
            await db.insert(analytics).values({
              provider: input.provider,
              isEnabled: input.isEnabled,
              trackingId: input.trackingId,
              additionalConfig: input.additionalConfig
            });
          }
          return { success: true };
        } catch (error) {
          console.error("[Analytics] Error upserting configuration:", error);
          throw new Error("Failed to update analytics configuration");
        }
      }),
      // Delete analytics configuration (admin only)
      delete: adminProcedure.input(z12.object({ provider: z12.string() })).mutation(async ({ input }) => {
        try {
          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }
          await db.delete(analytics).where(eq7(analytics.provider, input.provider));
          return { success: true };
        } catch (error) {
          console.error("[Analytics] Error deleting configuration:", error);
          throw new Error("Failed to delete analytics configuration");
        }
      })
    });
  }
});

// server/routers/migrate.ts
import postgres2 from "postgres";
var migrateRouter;
var init_migrate = __esm({
  "server/routers/migrate.ts"() {
    "use strict";
    init_trpc();
    init_db();
    migrateRouter = router({
      createPageVisibilityTable: publicProcedure.mutation(async () => {
        try {
          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }
          if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL not set");
          }
          const client = postgres2(process.env.DATABASE_URL);
          const migrationSQL = `
        CREATE TABLE IF NOT EXISTS page_visibility (
          id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          path VARCHAR(255) NOT NULL UNIQUE,
          "isVisible" BOOLEAN NOT NULL DEFAULT true,
          description TEXT,
          "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_page_visibility_path ON page_visibility(path);

        COMMENT ON TABLE page_visibility IS 'Stores visibility status for pages on the site';
        COMMENT ON COLUMN page_visibility.path IS 'The URL path of the page (e.g., /manifesto, /fr/manifesto)';
        COMMENT ON COLUMN page_visibility."isVisible" IS 'Whether the page is visible (true) or hidden (false)';
      `;
          await client.unsafe(migrationSQL);
          const result = await client`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'page_visibility'
        );
      `;
          await client.end();
          return {
            success: true,
            message: "Table page_visibility cr\xE9\xE9e avec succ\xE8s",
            tableExists: result[0]?.exists || false
          };
        } catch (error) {
          console.error("[Migration] Error:", error);
          return {
            success: false,
            message: error.message || "Erreur lors de la cr\xE9ation de la table",
            error: error.code || "UNKNOWN_ERROR"
          };
        }
      }),
      createAnalyticsTable: publicProcedure.mutation(async () => {
        try {
          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }
          if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL not set");
          }
          const client = postgres2(process.env.DATABASE_URL);
          const migrationSQL = `
        CREATE TABLE IF NOT EXISTS analytics (
          id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          provider VARCHAR(50) NOT NULL UNIQUE,
          "isEnabled" BOOLEAN NOT NULL DEFAULT false,
          "trackingId" VARCHAR(255),
          "additionalConfig" TEXT,
          "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_analytics_provider ON analytics(provider);
        CREATE INDEX IF NOT EXISTS idx_analytics_enabled ON analytics("isEnabled");

        COMMENT ON TABLE analytics IS 'Stores analytics and tracking configuration';
        COMMENT ON COLUMN analytics.provider IS 'Analytics provider: google-analytics, facebook-pixel, linkedin-insight';
        COMMENT ON COLUMN analytics."isEnabled" IS 'Whether this analytics provider is active';
        COMMENT ON COLUMN analytics."trackingId" IS 'Tracking ID for the provider (GA4 Measurement ID, Pixel ID, Partner ID)';
      `;
          await client.unsafe(migrationSQL);
          const result = await client`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'analytics'
        );
      `;
          await client.end();
          return {
            success: true,
            message: "Table analytics cr\xE9\xE9e avec succ\xE8s",
            tableExists: result[0]?.exists || false
          };
        } catch (error) {
          console.error("[Migration] Error:", error);
          return {
            success: false,
            message: error.message || "Erreur lors de la cr\xE9ation de la table",
            error: error.code || "UNKNOWN_ERROR"
          };
        }
      })
    });
  }
});

// server/routers/pageTexts.ts
import { eq as eq8, asc } from "drizzle-orm";
import { z as z13 } from "zod";
var pageTextsRouter;
var init_pageTexts = __esm({
  "server/routers/pageTexts.ts"() {
    "use strict";
    init_trpc();
    init_db();
    init_schema();
    pageTextsRouter = router({
      /** List all page texts (admin) */
      getAll: adminProcedure.query(async () => {
        try {
          const db = await getDb();
          if (!db) return [];
          const rows = await db.select().from(pageTexts).orderBy(asc(pageTexts.key));
          return rows;
        } catch (e) {
          const code = e && typeof e === "object" && "code" in e ? e.code : null;
          if (code === "42P01") {
            console.warn("[PageTexts] Table page_texts does not exist yet. Run init-db or migration.");
            return [];
          }
          console.error("[PageTexts] getAll error:", e);
          throw e;
        }
      }),
      /** Public: get all translations for a language (flat key -> value). Used by frontend to override locale JSON. */
      getTranslations: publicProcedure.input(z13.object({ lang: z13.enum(["en", "fr"]) })).query(async ({ input }) => {
        const db = await getDb();
        if (!db) return {};
        const rows = await db.select().from(pageTexts).orderBy(asc(pageTexts.key));
        const out = {};
        for (const row of rows) {
          const value = input.lang === "en" ? row.textEn : row.textFr;
          if (value) out[row.key] = value;
        }
        return out;
      }),
      /** Update one page text (admin) */
      update: adminProcedure.input(
        z13.object({
          id: z13.number(),
          textEn: z13.string(),
          textFr: z13.string()
        })
      ).mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.update(pageTexts).set({
          textEn: input.textEn,
          textFr: input.textFr,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq8(pageTexts.id, input.id));
        return { success: true };
      }),
      /** Create a new page text (admin) */
      create: adminProcedure.input(
        z13.object({
          key: z13.string().min(1).max(512),
          textEn: z13.string(),
          textFr: z13.string()
        })
      ).mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const [row] = await db.insert(pageTexts).values({
          key: input.key,
          textEn: input.textEn,
          textFr: input.textFr
        }).returning();
        return row;
      }),
      /** Delete a page text (admin) */
      delete: adminProcedure.input(z13.object({ id: z13.number() })).mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.delete(pageTexts).where(eq8(pageTexts.id, input.id));
        return { success: true };
      }),
      /** Import flat keys from JSON (admin). Payload: { en: Record<string, string>, fr: Record<string, string> } - keys must match. */
      importFromJson: adminProcedure.input(
        z13.object({
          en: z13.record(z13.string()),
          fr: z13.record(z13.string())
        })
      ).mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const keys = /* @__PURE__ */ new Set([...Object.keys(input.en), ...Object.keys(input.fr)]);
        let created = 0;
        let updated = 0;
        for (const key of keys) {
          const textEn = input.en[key] ?? "";
          const textFr = input.fr[key] ?? "";
          const existing = await db.select().from(pageTexts).where(eq8(pageTexts.key, key)).limit(1);
          if (existing.length > 0) {
            await db.update(pageTexts).set({ textEn, textFr, updatedAt: /* @__PURE__ */ new Date() }).where(eq8(pageTexts.id, existing[0].id));
            updated++;
          } else {
            await db.insert(pageTexts).values({ key, textEn, textFr });
            created++;
          }
        }
        return { created, updated, total: keys.size };
      })
    });
  }
});

// server/routers/projectsImages.ts
var projectsImages_exports = {};
__export(projectsImages_exports, {
  listImages: () => listImages,
  projectsImagesRouter: () => projectsImagesRouter
});
import { z as z14 } from "zod";
import fs from "fs/promises";
import path from "path";
import { existsSync } from "fs";
async function ensureProjectsDir() {
  if (!existsSync(PROJECTS_IMAGES_DIR)) {
    await fs.mkdir(PROJECTS_IMAGES_DIR, { recursive: true });
  }
  if (process.env.NODE_ENV === "production" && !existsSync(DIST_PROJECTS_IMAGES_DIR)) {
    await fs.mkdir(DIST_PROJECTS_IMAGES_DIR, { recursive: true });
  }
}
async function listImages() {
  await ensureProjectsDir();
  try {
    const filesSet = /* @__PURE__ */ new Set();
    if (existsSync(PROJECTS_IMAGES_DIR)) {
      try {
        const files = await fs.readdir(PROJECTS_IMAGES_DIR);
        console.log(`[ProjectsImages] Found ${files.length} files in upload directory: ${PROJECTS_IMAGES_DIR}`);
        files.forEach((file) => filesSet.add(file));
      } catch (error) {
        console.error("[ProjectsImages] Error reading upload directory:", error);
      }
    } else {
      console.log(`[ProjectsImages] Upload directory does not exist: ${PROJECTS_IMAGES_DIR}`);
    }
    if (process.env.NODE_ENV === "production" && existsSync(DIST_PROJECTS_IMAGES_DIR)) {
      try {
        const distFiles = await fs.readdir(DIST_PROJECTS_IMAGES_DIR);
        console.log(`[ProjectsImages] Found ${distFiles.length} files in dist directory: ${DIST_PROJECTS_IMAGES_DIR}`);
        distFiles.forEach((file) => filesSet.add(file));
      } catch (error) {
        console.error("[ProjectsImages] Error reading dist directory:", error);
      }
    }
    const imageFiles = Array.from(filesSet).filter(
      (file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );
    console.log(`[ProjectsImages] Total image files found: ${imageFiles.length}`);
    const imagesWithStats = await Promise.all(
      imageFiles.map(async (file) => {
        let filePath = path.join(PROJECTS_IMAGES_DIR, file);
        let found = existsSync(filePath);
        if (!found && process.env.NODE_ENV === "production") {
          const distFilePath = path.join(DIST_PROJECTS_IMAGES_DIR, file);
          if (existsSync(distFilePath)) {
            filePath = distFilePath;
            found = true;
          }
        }
        if (!found) {
          return null;
        }
        try {
          const stats = await fs.stat(filePath);
          return {
            name: file,
            size: stats.size,
            modified: stats.mtime,
            url: `/projects/${file}`
          };
        } catch (error) {
          console.error(`[ProjectsImages] Error getting stats for ${file}:`, error);
          return null;
        }
      })
    );
    const validImages = imagesWithStats.filter((img) => img !== null);
    console.log(`[ProjectsImages] Valid images after filtering: ${validImages.length}`);
    const sorted = validImages.sort(
      (a, b) => b.modified.getTime() - a.modified.getTime()
    );
    console.log(`[ProjectsImages] Returning ${sorted.length} images`);
    return sorted;
  } catch (error) {
    console.error("[ProjectsImages] Error listing images:", error);
    return [];
  }
}
var PROJECTS_IMAGES_DIR, DIST_PROJECTS_IMAGES_DIR, projectsImagesRouter;
var init_projectsImages = __esm({
  "server/routers/projectsImages.ts"() {
    "use strict";
    init_trpc();
    PROJECTS_IMAGES_DIR = path.resolve(process.cwd(), "client", "public", "projects");
    DIST_PROJECTS_IMAGES_DIR = path.resolve(process.cwd(), "dist", "public", "projects");
    projectsImagesRouter = router({
      // List all project images (public - for the projects page)
      list: publicProcedure.query(async () => {
        try {
          return await listImages();
        } catch (error) {
          console.error("[ProjectsImages] Error in list procedure:", error);
          return [];
        }
      }),
      // List all project images (admin - same as public but requires auth)
      listAdmin: adminProcedure.query(async () => {
        return await listImages();
      }),
      // Delete an image
      delete: adminProcedure.input(z14.object({ filename: z14.string() })).mutation(async ({ input }) => {
        await ensureProjectsDir();
        const filePath = path.join(PROJECTS_IMAGES_DIR, input.filename);
        const resolvedPath = path.resolve(filePath);
        const resolvedDir = path.resolve(PROJECTS_IMAGES_DIR);
        if (!resolvedPath.startsWith(resolvedDir)) {
          throw new Error("Invalid file path");
        }
        try {
          await fs.unlink(filePath);
          return { success: true };
        } catch (error) {
          console.error("[ProjectsImages] Error deleting image:", error);
          throw new Error("Failed to delete image");
        }
      }),
      // Get upload URL (for client-side upload)
      getUploadUrl: adminProcedure.query(() => {
        return {
          url: "/api/admin/projects-images/upload"
        };
      })
    });
  }
});

// server/projectsApi.ts
import fs2 from "fs/promises";
import path2 from "path";
import { z as z15 } from "zod";
import { sql as sql2 } from "drizzle-orm";
async function readProjects() {
  const db = await getDb();
  if (db) {
    try {
      const result = await db.execute(sql2`SELECT value FROM projects_store WHERE key = 'projects' LIMIT 1`);
      const rows = Array.isArray(result) ? result : result?.rows ?? [];
      const row = rows[0];
      if (row?.value) {
        const data = JSON.parse(row.value);
        const projects = Array.isArray(data?.projects) ? data.projects : [];
        const parsed = projects.map((p) => projectSchema.safeParse(p)).filter((r) => r.success).map((r) => r.data);
        return parsed;
      }
    } catch {
    }
  }
  try {
    const raw = await fs2.readFile(PROJECTS_FILE, "utf-8");
    const data = JSON.parse(raw);
    const projects = Array.isArray(data.projects) ? data.projects : [];
    return projects.map((p) => projectSchema.safeParse(p)).filter((r) => r.success).map((r) => r.data);
  } catch {
    try {
      const fallbackPath = path2.join(process.cwd(), "dist", "data", "fallback-projects.json");
      const raw = await fs2.readFile(fallbackPath, "utf-8");
      const data = JSON.parse(raw);
      const projects = Array.isArray(data.projects) ? data.projects : [];
      return projects.map((p) => projectSchema.safeParse(p)).filter((r) => r.success).map((r) => r.data);
    } catch {
      return [];
    }
  }
}
async function writeProjects(projects) {
  const payload = JSON.stringify({ projects }, null, 2);
  await fs2.mkdir(DATA_DIR, { recursive: true });
  await fs2.writeFile(PROJECTS_FILE, payload, "utf-8");
  const db = await getDb();
  if (db) {
    try {
      await db.execute(
        sql2`INSERT INTO projects_store (key, value, "updatedAt") VALUES ('projects', ${payload}, NOW()) ON CONFLICT (key) DO UPDATE SET value = ${payload}, "updatedAt" = NOW()`
      );
    } catch {
    }
  }
}
async function initProjects(projects) {
  const parsed = projects.map((p) => projectSchema.safeParse(p)).filter((r) => r.success).map((r) => r.data);
  await writeProjects(parsed);
  return parsed;
}
async function updateProject(input) {
  const projects = await readProjects();
  const index = projects.findIndex((p) => p.slug === input.slug);
  if (index === -1) {
    projects.push(input);
  } else {
    projects[index] = input;
  }
  await writeProjects(projects);
  return input;
}
async function setTriptychSlugs(input) {
  const projects = await readProjects();
  if (projects.length === 0) {
    throw new Error("Aucun projet en base. Cliquez d'abord sur \xAB Initialiser depuis le site \xBB puis enregistrez les triptyques.");
  }
  const homeSlugs = input.homeTriptychSlugs.slice(0, 3);
  const projectsSlugs = input.projectsTriptychSlugs.slice(0, 3);
  const homeImg = input.homeTriptychImageBySlug ?? {};
  const projectsImg = input.projectsTriptychImageBySlug ?? {};
  const updated = projects.map((p) => ({
    ...p,
    featuredOnHomeTriptych: homeSlugs.includes(p.slug),
    homeTriptychImage: homeSlugs.includes(p.slug) && homeImg[p.slug] ? homeImg[p.slug] : void 0,
    homeTriptychOrder: homeSlugs.includes(p.slug) ? homeSlugs.indexOf(p.slug) : void 0,
    featuredOnProjectsTriptych: projectsSlugs.includes(p.slug),
    projectsTriptychImage: projectsSlugs.includes(p.slug) && projectsImg[p.slug] ? projectsImg[p.slug] : void 0,
    projectsTriptychOrder: projectsSlugs.includes(p.slug) ? projectsSlugs.indexOf(p.slug) : void 0
  }));
  const projectsOrder = projectsSlugs.map((s) => updated.find((p) => p.slug === s)).filter((p) => Boolean(p));
  const rest = updated.filter((p) => !projectsSlugs.includes(p.slug));
  const reordered = [...projectsOrder, ...rest];
  await writeProjects(reordered);
  return reordered;
}
async function setCarouselSlugs(input) {
  const projects = await readProjects();
  if (projects.length === 0) {
    throw new Error("Aucun projet en base. Cliquez d'abord sur \xAB Initialiser depuis le site \xBB puis enregistrez le carousel.");
  }
  const slugs = input.carouselSlugs.slice(0, MAX_CAROUSEL_SLIDES);
  const imageBySlug = input.imageBySlug || {};
  const updated = projects.map((p) => ({
    ...p,
    featuredOnHomeCarousel: slugs.includes(p.slug),
    homeCarouselImage: slugs.includes(p.slug) && imageBySlug[p.slug] ? imageBySlug[p.slug] : void 0,
    homeCarouselOrder: slugs.includes(p.slug) ? slugs.indexOf(p.slug) : void 0
  }));
  const carouselOrder = slugs.map((s) => updated.find((p) => p.slug === s)).filter((p) => Boolean(p));
  const rest = updated.filter((p) => !slugs.includes(p.slug));
  const reordered = [...carouselOrder, ...rest];
  await writeProjects(reordered);
  return reordered;
}
var DATA_DIR, PROJECTS_FILE, projectCategoryEnum, projectSchema, MAX_CAROUSEL_SLIDES;
var init_projectsApi = __esm({
  "server/projectsApi.ts"() {
    "use strict";
    init_db();
    DATA_DIR = process.env.DATA_PATH ? path2.resolve(process.env.DATA_PATH) : path2.resolve(process.cwd(), "data");
    PROJECTS_FILE = path2.join(DATA_DIR, "projects.json");
    projectCategoryEnum = z15.enum([
      "Brand",
      "Site web",
      "Plateforme",
      "Marketing num\xE9rique",
      "Campagnes",
      "Transformation"
    ]);
    projectSchema = z15.object({
      slug: z15.string().min(1),
      key: z15.string().min(1),
      title: z15.string().min(1),
      client: z15.string().min(1),
      year: z15.string(),
      category: projectCategoryEnum,
      services: z15.string(),
      websiteUrl: z15.string().optional(),
      description: z15.object({
        fr: z15.string(),
        en: z15.string()
      }),
      images: z15.array(z15.string()),
      /** Afficher dans le triptyque de la page d'accueil */
      featuredOnHomeTriptych: z15.boolean().optional(),
      /** Image à afficher dans le triptyque accueil (nom de fichier); si absent, utilise images[0] */
      homeTriptychImage: z15.string().optional(),
      /** Ordre dans le triptyque accueil (0, 1, 2) pour garder l'ordre choisi */
      homeTriptychOrder: z15.number().min(0).max(2).optional(),
      /** Afficher dans le triptyque de la page Projets */
      featuredOnProjectsTriptych: z15.boolean().optional(),
      /** Image à afficher dans le triptyque page Projets; si absent, utilise images[0] */
      projectsTriptychImage: z15.string().optional(),
      /** Ordre dans le triptyque page Projets (0, 1, 2) pour garder l'ordre choisi */
      projectsTriptychOrder: z15.number().min(0).max(2).optional(),
      /** Afficher dans le carrousel "Latest project" en haut de la page d'accueil */
      featuredOnHomeCarousel: z15.boolean().optional(),
      /** Image à afficher dans le carrousel accueil (nom de fichier); si absent, utilise images[0] */
      homeCarouselImage: z15.string().optional(),
      /** Ordre dans le carrousel accueil (0..5) pour garder l'ordre choisi */
      homeCarouselOrder: z15.number().min(0).max(5).optional()
    });
    MAX_CAROUSEL_SLIDES = 6;
  }
});

// server/routers/projects.ts
import { z as z16 } from "zod";
var projectsRouter;
var init_projects = __esm({
  "server/routers/projects.ts"() {
    "use strict";
    init_trpc();
    init_projectsApi();
    projectsRouter = router({
      list: publicProcedure.query(() => readProjects()),
      listAdmin: adminProcedure.query(() => readProjects()),
      initFromClient: adminProcedure.input(z16.object({ projects: z16.array(projectSchema) })).mutation(({ input }) => initProjects(input.projects)),
      update: adminProcedure.input(projectSchema).mutation(({ input }) => updateProject(input)),
      setTriptychSlugs: adminProcedure.input(
        z16.object({
          homeTriptychSlugs: z16.array(z16.string()).max(3),
          projectsTriptychSlugs: z16.array(z16.string()).max(3),
          homeTriptychImageBySlug: z16.record(z16.string(), z16.string()).optional(),
          projectsTriptychImageBySlug: z16.record(z16.string(), z16.string()).optional()
        })
      ).mutation(
        ({ input }) => setTriptychSlugs({
          homeTriptychSlugs: input.homeTriptychSlugs,
          projectsTriptychSlugs: input.projectsTriptychSlugs,
          homeTriptychImageBySlug: input.homeTriptychImageBySlug ?? {},
          projectsTriptychImageBySlug: input.projectsTriptychImageBySlug ?? {}
        })
      ),
      setCarouselSlugs: adminProcedure.input(
        z16.object({
          carouselSlugs: z16.array(z16.string()).max(6),
          imageBySlug: z16.record(z16.string(), z16.string()).optional()
        })
      ).mutation(({ input }) => setCarouselSlugs({ carouselSlugs: input.carouselSlugs, imageBySlug: input.imageBySlug ?? {} }))
    });
  }
});

// server/carouselLogosApi.ts
import fs3 from "fs/promises";
import path3 from "path";
import { z as z17 } from "zod";
import { eq as eq9, asc as asc2 } from "drizzle-orm";
function rowToLogo(row) {
  return {
    id: String(row.id),
    src: row.src,
    alt: row.alt,
    url: row.url ?? "",
    displayOrder: row.displayOrder
  };
}
async function seedFromJsonIfNeeded(db) {
  if (!db) return;
  const existing = await db.select().from(carouselLogos).limit(1);
  if (existing.length > 0) return;
  try {
    const raw = await fs3.readFile(LOGOS_FILE, "utf-8");
    const data = JSON.parse(raw);
    const logos = Array.isArray(data.logos) ? data.logos : [];
    const valid = logos.map((l) => logoSchema.safeParse(l)).filter((r) => r.success).map((r) => r.data);
    if (valid.length === 0) return;
    for (let i = 0; i < valid.length; i++) {
      await db.insert(carouselLogos).values({
        src: valid[i].src,
        alt: valid[i].alt,
        url: valid[i].url ?? "",
        displayOrder: valid[i].displayOrder ?? i
      });
    }
    console.log(`[CarouselLogos] Seeded ${valid.length} logos from JSON into DB`);
  } catch {
  }
}
async function readLogos() {
  const db = await getDb();
  if (db) {
    try {
      await seedFromJsonIfNeeded(db);
      const rows = await db.select().from(carouselLogos).orderBy(asc2(carouselLogos.displayOrder));
      return rows.map(rowToLogo);
    } catch (e) {
      console.warn("[CarouselLogos] DB read failed, falling back to JSON:", e);
    }
  }
  try {
    const raw = await fs3.readFile(LOGOS_FILE, "utf-8");
    const data = JSON.parse(raw);
    const logos = Array.isArray(data.logos) ? data.logos : [];
    return logos.map((l) => logoSchema.safeParse(l)).filter((r) => r.success).map((r) => r.data).sort((a, b) => a.displayOrder - b.displayOrder);
  } catch {
    return [];
  }
}
async function writeLogos(logos) {
  await fs3.mkdir(DATA_DIR2, { recursive: true });
  const sorted = [...logos].sort((a, b) => a.displayOrder - b.displayOrder);
  await fs3.writeFile(LOGOS_FILE, JSON.stringify({ logos: sorted }, null, 2), "utf-8");
}
async function addLogo(input) {
  const db = await getDb();
  if (db) {
    try {
      const logos2 = await db.select().from(carouselLogos).orderBy(asc2(carouselLogos.displayOrder));
      const maxOrder2 = logos2.length === 0 ? 0 : Math.max(...logos2.map((l) => l.displayOrder), -1) + 1;
      const [inserted] = await db.insert(carouselLogos).values({
        src: input.src,
        alt: input.alt,
        url: input.url ?? "",
        displayOrder: maxOrder2
      }).returning();
      if (inserted) return rowToLogo(inserted);
    } catch (e) {
      console.warn("[CarouselLogos] DB add failed, falling back to JSON:", e);
    }
  }
  const logos = await readLogos();
  const maxOrder = logos.length === 0 ? 0 : Math.max(...logos.map((l) => l.displayOrder), -1) + 1;
  const newLogo = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    src: input.src,
    alt: input.alt,
    url: input.url ?? "",
    displayOrder: maxOrder
  };
  logos.push(newLogo);
  await writeLogos(logos);
  return newLogo;
}
async function updateLogo(input) {
  const db = await getDb();
  const numId = parseInt(input.id, 10);
  if (db && !Number.isNaN(numId)) {
    try {
      const [updated] = await db.update(carouselLogos).set({
        ...input.src !== void 0 && { src: input.src },
        ...input.alt !== void 0 && { alt: input.alt },
        ...input.url !== void 0 && { url: input.url },
        ...input.displayOrder !== void 0 && { displayOrder: input.displayOrder },
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq9(carouselLogos.id, numId)).returning();
      if (updated) return rowToLogo(updated);
    } catch (e) {
      console.warn("[CarouselLogos] DB update failed, falling back to JSON:", e);
    }
  }
  const logos = await readLogos();
  const index = logos.findIndex((l) => l.id === input.id);
  if (index === -1) throw new Error("Logo introuvable");
  const current = logos[index];
  logos[index] = {
    ...current,
    ...input.src !== void 0 && { src: input.src },
    ...input.alt !== void 0 && { alt: input.alt },
    ...input.url !== void 0 && { url: input.url },
    ...input.displayOrder !== void 0 && { displayOrder: input.displayOrder }
  };
  await writeLogos(logos);
  return logos[index];
}
async function removeLogo(id) {
  const db = await getDb();
  const numId = parseInt(id, 10);
  if (db && !Number.isNaN(numId)) {
    try {
      const result = await db.delete(carouselLogos).where(eq9(carouselLogos.id, numId)).returning({ id: carouselLogos.id });
      if (result.length > 0) return;
    } catch (e) {
      console.warn("[CarouselLogos] DB delete failed, falling back to JSON:", e);
    }
  }
  const logos = await readLogos();
  const filtered = logos.filter((l) => l.id !== id);
  if (filtered.length === logos.length) throw new Error("Logo introuvable");
  await writeLogos(filtered);
}
async function reorderLogos(order) {
  const db = await getDb();
  if (db) {
    try {
      for (const { id, displayOrder } of order) {
        const numId = parseInt(id, 10);
        if (!Number.isNaN(numId)) {
          await db.update(carouselLogos).set({ displayOrder, updatedAt: /* @__PURE__ */ new Date() }).where(eq9(carouselLogos.id, numId));
        }
      }
      return readLogos();
    } catch (e) {
      console.warn("[CarouselLogos] DB reorder failed, falling back to JSON:", e);
    }
  }
  const logos = await readLogos();
  const orderMap = new Map(order.map((o) => [o.id, o.displayOrder]));
  for (const logo of logos) {
    const o = orderMap.get(logo.id);
    if (o !== void 0) logo.displayOrder = o;
  }
  await writeLogos(logos);
  return readLogos();
}
var DATA_DIR2, LOGOS_FILE, logoSchema;
var init_carouselLogosApi = __esm({
  "server/carouselLogosApi.ts"() {
    "use strict";
    init_db();
    init_schema();
    DATA_DIR2 = path3.resolve(process.cwd(), "data");
    LOGOS_FILE = path3.join(DATA_DIR2, "carousel-logos.json");
    logoSchema = z17.object({
      id: z17.string(),
      src: z17.string().min(1),
      alt: z17.string().min(1),
      url: z17.string().optional().default(""),
      displayOrder: z17.number().int().min(0)
    });
  }
});

// server/routers/carouselLogos.ts
import { z as z18 } from "zod";
var carouselLogosRouter;
var init_carouselLogos = __esm({
  "server/routers/carouselLogos.ts"() {
    "use strict";
    init_trpc();
    init_carouselLogosApi();
    carouselLogosRouter = router({
      getAll: publicProcedure.query(() => readLogos()),
      getAllAdmin: adminProcedure.query(() => readLogos()),
      add: adminProcedure.input(
        z18.object({
          src: z18.string().min(1),
          alt: z18.string().min(1),
          url: z18.string().optional().default("")
        })
      ).mutation(({ input }) => addLogo(input)),
      update: adminProcedure.input(
        z18.object({
          id: z18.string(),
          src: z18.string().min(1).optional(),
          alt: z18.string().min(1).optional(),
          url: z18.string().optional(),
          displayOrder: z18.number().int().min(0).optional()
        })
      ).mutation(({ input }) => updateLogo(input)),
      remove: adminProcedure.input(z18.object({ id: z18.string() })).mutation(({ input }) => removeLogo(input.id)),
      reorder: adminProcedure.input(z18.array(z18.object({ id: z18.string(), displayOrder: z18.number().int().min(0) }))).mutation(({ input }) => reorderLogos(input))
    });
  }
});

// server/routers.ts
var routers_exports = {};
__export(routers_exports, {
  appRouter: () => appRouter
});
import { z as z19 } from "zod";
var appRouter;
var init_routers = __esm({
  "server/routers.ts"() {
    "use strict";
    init_const();
    init_cookies();
    init_systemRouter();
    init_trpc();
    init_llm();
    init_logger();
    init_assessment();
    init_contact();
    init_mediaAssets();
    init_startProject();
    init_agencies();
    init_leoAnalytics();
    init_adminAuth();
    init_admin();
    init_loadersRouter();
    init_testimonials();
    init_radar();
    init_pageVisibility();
    init_analytics();
    init_migrate();
    init_pageTexts();
    init_projectsImages();
    init_projects();
    init_carouselLogos();
    init_db();
    appRouter = router({
      // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
      system: systemRouter,
      assessment: assessmentRouter,
      contact: contactRouter,
      mediaAssets: mediaAssetsRouter,
      startProject: startProjectRouter,
      agencies: agenciesRouter,
      leoAnalytics: leoAnalyticsRouter,
      adminAuth: adminAuthRouter,
      admin: adminRouter,
      loaders: loadersRouter,
      testimonials: testimonialsRouter,
      radar: radarRouter,
      pageVisibility: pageVisibilityRouter,
      analytics: analyticsRouter,
      migrate: migrateRouter,
      pageTexts: pageTextsRouter,
      projectsImages: projectsImagesRouter,
      projects: projectsRouter,
      carouselLogos: carouselLogosRouter,
      auth: router({
        me: publicProcedure.query((opts) => opts.ctx.user),
        logout: publicProcedure.mutation(({ ctx }) => {
          const cookieOptions = getSessionCookieOptions(ctx.req);
          ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
          return {
            success: true
          };
        })
      }),
      leo: router({
        chat: publicProcedure.input(
          z19.object({
            messages: z19.array(
              z19.object({
                role: z19.enum(["user", "assistant", "system"]),
                content: z19.string().min(1, "Message cannot be empty").max(2e3, "Message too long (max 2000 characters)").refine(
                  (val) => !val.includes("<script>") && !val.includes("javascript:"),
                  "Invalid characters in message"
                )
              })
            ).max(50, "Too many messages in history")
          })
        ).mutation(async ({ input }) => {
          try {
            const systemPrompt = `You are Leo, the AI assistant of Nukleo Digital, an agency specialized in digital transformation and artificial intelligence.

Your role:
- Help visitors understand how AI can transform their business
- Present Nukleo's services (AI, digital transformation, platforms, operations)
- Qualify needs and encourage contact with the team
- Advise on AI transformation strategies, from pilot phase to industrialization

Your style:
- Friendly, dynamic, and professional
- Short responses: 2-3 sentences maximum
- 1-2 emojis maximum per message
- Always ask a follow-up question to maintain engagement
- Consultative approach: understand before proposing

Key knowledge about Nukleo:
- Nukleo Digital: "Architects of your AI future"
- Services: AI Marketing, digital platforms, intelligent operations
- Team: Cl\xE9ment (CEO), Alexei, Antoine, S\xE9verine, Omar, Timoth\xE9, Hind, Sarah, Meriem, Camille, Maxime, Jean-Fran\xE7ois, Margaux, Marie-Claire, Ricardo

AI technical expertise (knowledge base):
- AI Fundamentals: Machine Learning, Deep Learning, Generative AI, NLP
- AI project lifecycle: from use case to industrialization (identification, data, development, evaluation, pilot deployment, industrialization)
- AI Strategy: business objectives alignment, roadmap, KPIs, ROI
- AI Governance: transparency, security, compliance (AI Act, GDPR), accountability, ethics
- Algorithmic bias: data audit, fairness testing, human oversight, team diversity
- Data: data quality = AI success, data strategy, infrastructure (data lakes), data governance
- 2025 Technologies: GPT-4, Claude 3, Gemini (generative AI), Amazon SageMaker, Azure ML (cloud ML), DataRobot (low-code), TensorFlow, PyTorch (open source)
- Implementation steps: Business Case, PoC, MVP, iterative development, integration, monitoring
- 91% of companies consider AI a priority in 2025, 44% have concrete projects
- Moving from pilot to scale: major 2025 challenge

Limitations:
- Don't make promises about pricing or timelines
- Redirect to the team for very detailed technical questions or sector-specific inquiries
- Stay honest about AI capabilities and limitations`;
            const response = await invokeLLM({
              messages: [
                { role: "system", content: systemPrompt },
                ...input.messages
              ]
            });
            return {
              content: response.choices[0].message.content || "Sorry, I couldn't generate a response. Could you rephrase your question?"
            };
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            const hasApiKey = !!process.env.BUILT_IN_FORGE_API_KEY;
            const hasApiUrl = !!process.env.BUILT_IN_FORGE_API_URL;
            logger.error("Leo Chat Error", sanitizeLogData({
              message: errorMessage,
              hasApiKey,
              hasApiUrl,
              errorType: error instanceof Error ? error.constructor.name : typeof error
            }));
            const lastUserMessage = input.messages[input.messages.length - 1]?.content || "";
            let fallbackMessage;
            if (!hasApiKey) {
              fallbackMessage = "I'm currently being set up. Please contact the team at hello@nukleo.com for assistance! \u{1F4E7}";
            } else if (errorMessage.includes("fetch failed") || errorMessage.includes("ECONNREFUSED")) {
              fallbackMessage = "I'm having trouble connecting to my AI service right now. Could you try again in a moment? \u{1F504}";
            } else if (errorMessage.includes("401") || errorMessage.includes("403")) {
              fallbackMessage = "There's an authentication issue with my AI service. Please contact hello@nukleo.com! \u{1F510}";
            } else {
              const fallbackResponses = [
                "I'm experiencing some technical difficulties right now. Could you try rephrasing your question? \u{1F504}",
                "I'm having trouble connecting to my AI brain at the moment. Can you ask me again in a different way? \u{1F914}",
                "Something went wrong on my end. Let's try again - could you rephrase your question? \u{1F4A1}",
                "I'm having a moment of confusion. Could you ask your question differently? \u{1F60A}"
              ];
              const fallbackIndex = lastUserMessage.length % fallbackResponses.length;
              fallbackMessage = fallbackResponses[fallbackIndex];
            }
            return {
              content: fallbackMessage
            };
          }
        }),
        saveContact: publicProcedure.input(
          z19.object({
            email: z19.string().email(),
            name: z19.string().optional(),
            conversationContext: z19.string().optional()
          })
        ).mutation(async ({ input }) => {
          try {
            await saveLeoContact({
              email: input.email,
              name: input.name,
              conversationContext: input.conversationContext
            });
            return {
              success: true,
              message: "Contact saved successfully"
            };
          } catch (error) {
            logger.error("Leo Save Contact Error", sanitizeLogData({
              message: error instanceof Error ? error.message : "Unknown error",
              email: input.email
            }));
            return {
              success: true,
              message: "Contact saved successfully"
            };
          }
        }),
        createSession: publicProcedure.input(
          z19.object({
            sessionId: z19.string(),
            pageContext: z19.string()
          })
        ).mutation(async ({ input }) => {
          try {
            await createLeoSession({
              sessionId: input.sessionId,
              pageContext: input.pageContext
            });
            return { success: true };
          } catch (error) {
            logger.error("Leo Create Session Error", sanitizeLogData({
              message: error instanceof Error ? error.message : "Unknown error",
              sessionId: input.sessionId
            }));
            return { success: true };
          }
        }),
        updateSession: publicProcedure.input(
          z19.object({
            sessionId: z19.string(),
            messageCount: z19.number().optional(),
            emailCaptured: z19.number().optional(),
            capturedEmail: z19.string().optional(),
            conversationDuration: z19.number().optional(),
            completedAt: z19.date().optional()
          })
        ).mutation(async ({ input }) => {
          try {
            const { sessionId, ...data } = input;
            await updateLeoSession(sessionId, data);
            return { success: true };
          } catch (error) {
            logger.error("Leo Update Session Error", sanitizeLogData({
              message: error instanceof Error ? error.message : "Unknown error",
              sessionId: input.sessionId
            }));
            return { success: true };
          }
        })
      })
    });
  }
});

// server/_core/context.ts
var context_exports = {};
__export(context_exports, {
  createContext: () => createContext
});
import jwt2 from "jsonwebtoken";
async function createContext(opts) {
  let user = null;
  const req = opts.req;
  if (req.isAuthenticated && req.isAuthenticated() && req.user) {
    const passportUser = req.user;
    const email = passportUser.email?.toLowerCase();
    const allowedEmails = ENV.adminAllowedEmails?.split(",").map((e) => e.trim().toLowerCase()) || [];
    if (email && allowedEmails.includes(email)) {
      const now = /* @__PURE__ */ new Date();
      user = {
        id: passportUser.id || 0,
        openId: passportUser.id || `passport-${email}`,
        email,
        name: passportUser.name || passportUser.displayName || null,
        loginMethod: "google",
        role: "admin",
        createdAt: now,
        updatedAt: now,
        lastSignedIn: now
      };
      console.log(`[Context] Admin authenticated via Passport: ${email} (role: ${user.role})`);
    } else {
      try {
        user = await sdk.authenticateRequest(opts.req);
      } catch (error) {
        user = null;
      }
    }
  } else {
    try {
      user = await sdk.authenticateRequest(opts.req);
    } catch (error) {
      user = null;
    }
  }
  if (!user) {
    const adminToken = opts.req.cookies?.[ADMIN_COOKIE_NAME2];
    if (adminToken && ADMIN_JWT_SECRET2 && ADMIN_JWT_SECRET2 !== "-admin") {
      try {
        const decoded = jwt2.verify(adminToken, ADMIN_JWT_SECRET2);
        const now = /* @__PURE__ */ new Date();
        user = {
          id: decoded.id,
          openId: `admin-${decoded.id}`,
          // Synthetic openId for admin
          email: decoded.email || null,
          name: decoded.username || null,
          loginMethod: "admin",
          role: "admin",
          createdAt: now,
          updatedAt: now,
          lastSignedIn: now
        };
        console.log(`[Context] Admin authenticated via JWT: ${decoded.email} (role: ${user.role})`);
      } catch (error) {
        console.log(`[Context] Invalid admin token: ${error instanceof Error ? error.message : "unknown error"}`);
        user = null;
      }
    } else {
      if (opts.req.path?.includes("/admin") || opts.req.path?.includes("projectsImages")) {
        console.log(`[Context] No admin token found. Cookie present: ${!!adminToken}, Secret configured: ${!!(ADMIN_JWT_SECRET2 && ADMIN_JWT_SECRET2 !== "-admin")}`);
      }
    }
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}
var ADMIN_JWT_SECRET2, ADMIN_COOKIE_NAME2;
var init_context = __esm({
  "server/_core/context.ts"() {
    "use strict";
    init_sdk();
    init_env();
    ADMIN_JWT_SECRET2 = ENV.cookieSecret + "-admin";
    ADMIN_COOKIE_NAME2 = "admin_session";
  }
});

// client/src/data/projectsData.ts
var projectsData_exports = {};
__export(projectsData_exports, {
  PROJECTS_DATA: () => PROJECTS_DATA,
  getAllProjectSlugs: () => getAllProjectSlugs,
  getProjectByKey: () => getProjectByKey,
  getProjectBySlug: () => getProjectBySlug
});
function getProjectBySlug(slug) {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}
function getProjectByKey(key) {
  return PROJECTS_DATA.find((p) => p.key === key);
}
function getAllProjectSlugs() {
  return PROJECTS_DATA.map((p) => p.slug);
}
var PROJECTS_DATA;
var init_projectsData = __esm({
  "client/src/data/projectsData.ts"() {
    "use strict";
    PROJECTS_DATA = [
      {
        slug: "succes-scolaire",
        key: "SuccesScolaire",
        title: "Succ\xE8s Scolaire",
        client: "Succ\xE8s Scolaire",
        year: "2025",
        category: "Site web",
        services: "Strat\xE9gie de marque, Direction artistique, Maquettes UI/UX",
        websiteUrl: "https://succezscolaire.ca",
        description: {
          fr: "Succ\xE8s Scolaire est une entreprise qu\xE9b\xE9coise sp\xE9cialis\xE9e en tutorat en ligne. Avec Nukleo, nous nous sommes occup\xE9 de la refonte compl\xE8te du site. L'objectif \xE9tait de concevoir un site vivant et ludique, qui stimule la curiosit\xE9 et donne envie d'apprendre. Nous avons repens\xE9 l'architecture du site aux multiples sous-pages, tout en assurant une navigation intuitive et la pr\xE9servation des contenus essentiels.",
          en: "Succ\xE8s Scolaire is a Quebec-based company specializing in online tutoring. With Nukleo, we handled the complete redesign of the site. The goal was to create a lively and playful website that stimulates curiosity and makes learning appealing. We rethought the architecture of the multi-page site while ensuring intuitive navigation and preserving essential content."
        },
        images: [
          "SuccesScolaire_1.png",
          "SuccesScolaire_2.png",
          "SuccesScolaire_3.png",
          "SuccesScolaire_4.jpg",
          "SuccesScolaire_5.jpg"
        ]
      },
      {
        slug: "humankind",
        key: "Humankind",
        title: "HumanKind",
        client: "HumanKind",
        year: "2025",
        category: "Site web",
        services: "Direction artistique, Maquettes UI/UX, Strat\xE9gie digitale",
        description: {
          fr: "HumanKind est une entreprise de recrutement bas\xE9e aux Royaumes-Unis et en Nouvelle-\xC9cosse. Avec Nukleo, nous avons travaill\xE9 sur la conception d'un site web destin\xE9 aux entreprises, dans une approche r\xE9solument B2B. Nous avons d\xE9clin\xE9 l'identit\xE9 visuelle de la marque en maquettes haute-fid\xE9lit\xE9, en assurant la coh\xE9rence entre branding et interface digitale. L'objectif \xE9tait de cr\xE9er une plateforme professionnelle et accueillante, qui inspire confiance et mette en avant l'expertise de HumanKind dans le recrutement international.",
          en: "HumanKind is a recruitment company based in the UK and Nova Scotia. With Nukleo, we worked on designing a website aimed at businesses, with a decidedly B2B approach. We translated the brand's visual identity into high-fidelity mockups, ensuring consistency between branding and digital interface. The goal was to create a professional and welcoming platform that inspires trust and highlights HumanKind's expertise in international recruitment."
        },
        images: [
          "Humankind_1.png",
          "Humankind_2.png",
          "Humankind_3.png",
          "Humankind_4.jpg",
          "Humankind_5.jpg"
        ]
      },
      {
        slug: "defi-28-jours",
        key: "Defi28",
        title: "D\xE9fi 28 jours sans alcool",
        client: "Fondation Jean Lapointe",
        year: "2024",
        category: "Campagnes",
        services: "Id\xE9ation de campagne, Direction artistique, Direction de tournage, D\xE9clinaisons visuelles",
        description: {
          fr: "La Fondation Jean Lapointe sensibilise le public aux dangers de la d\xE9pendance \xE0 l'alcool. Gr\xE2ce au D\xE9fi 28 jours sans alcool, elle mobilise la population tout en r\xE9coltant des fonds pour soutenir ses actions de pr\xE9vention et d'accompagnement. Nukleo a accompagn\xE9 la Fondation dans l'id\xE9ation et la conception de la campagne, en assurant la direction artistique et la d\xE9clinaison compl\xE8te des visuels. L'agence a \xE9galement adapt\xE9 le site web pour soutenir la campagne et dirig\xE9 les tournages afin de garantir une coh\xE9rence visuelle et narrative sur l'ensemble des canaux. R\xE9sultat : une mobilisation massive et plus de 749 000 $ amass\xE9s pour la cause.",
          en: "The Jean Lapointe Foundation raises public awareness about the dangers of alcohol addiction. Through the 28-Day No-Alcohol Challenge, it mobilizes the population while raising funds to support its prevention and support actions. Nukleo accompanied the Foundation in the ideation and design of the campaign, handling the artistic direction and complete visual rollout. The agency also adapted the website to support the campaign and directed the shoots to ensure visual and narrative consistency across all channels. The result: massive mobilization and over $749,000 raised for the cause."
        },
        images: [
          "Defi28_1.jpg",
          "Defi28_2.jpg",
          "Defi28_3.jpg",
          "Defi28_4.jpg",
          "Defi28_5.jpg",
          "Defi28_6.png",
          "Defi28_7.png",
          "Defi28_8.jpg"
        ]
      },
      {
        slug: "fondation-jean-lapointe",
        key: "FJL",
        title: "Fondation Jean Lapointe \u2014 Site web",
        client: "Fondation Jean Lapointe",
        year: "2026",
        category: "Site web",
        services: "Wireframes, Maquettes UI, D\xE9veloppement",
        websiteUrl: "https://fondationjeanlapointe.ca",
        description: {
          fr: "La Fondation Jean Lapointe est une organisation qui lutte contre les probl\xE8mes de d\xE9pendance. Elle a fait appel \xE0 Nukleo afin de d\xE9velopper une version plus actuelle et esth\xE9tique de son site web. Le processus s'est fait en plusieurs \xE9tapes, en commen\xE7ant par la production de wireframes, des propositions de maquettes UI pouss\xE9es, et s'est termin\xE9 avec le d\xE9veloppement du site web.",
          en: "The Jean Lapointe Foundation is an organization that fights addiction problems. They called on Nukleo to develop a more current and aesthetic version of their website. The process took place in several stages, starting with the production of wireframes, high-quality UI mockup proposals, and ending with the development of the website."
        },
        images: [
          "FJL_1.png",
          "FJL_2.png",
          "FJL_3.png",
          "FJL_4.png",
          "FJL_5.png"
        ]
      },
      {
        slug: "arsenal-media",
        key: "Arsenal",
        title: "Arsenal Media",
        client: "Arsenal Media",
        year: "2024",
        category: "Site web",
        services: "Conception UI/UX, D\xE9veloppement",
        websiteUrl: "https://arsenalmedia.ca",
        description: {
          fr: "Arsenal Media est le plus important radiodiffuseur au Qu\xE9bec, un groupe m\xE9diatique int\xE9gr\xE9 et ind\xE9pendant qui rejoint des millions de Qu\xE9b\xE9cois. Ce ne sont pas une, ni deux, ni trois, mais bien 18 stations de radio pour lesquelles Nukleo a assur\xE9 la refonte. Avec un lecteur int\xE9gr\xE9, la possibilit\xE9 d'\xE9couter en direct, de rejouer une \xE9mission, de retrouver une musique ou encore de consulter le programme de la station, nous avons r\xE9alis\xE9 un travail complet alliant UX design, UI design et d\xE9veloppement technique.",
          en: "Arsenal Media is the largest broadcaster in Quebec, an integrated and independent media group reaching millions of Quebecers. It's not one, two, or three, but 18 radio stations for which Nukleo handled the redesign. With an integrated player, the ability to listen live, replay a show, find a song, or check the station's schedule, we delivered comprehensive work combining UX design, UI design, and technical development."
        },
        images: [
          "Arsenal_1.png",
          "Arsenal_2.jpg",
          "Arsenal_3.png",
          "Arsenal_4.png"
        ]
      },
      {
        slug: "attitude-fraiche",
        key: "AttitudeFraiche",
        title: "Attitude Fra\xEEche",
        client: "Attitude Fra\xEEche",
        year: "2024",
        category: "Site web",
        services: "Conception UI/UX, D\xE9veloppement",
        websiteUrl: "https://attitudefraiche.ca",
        description: {
          fr: "Attitude Fra\xEEche, un leader dans la production de mesclun, de laitues et d'autres l\xE9gumes de plein champ, a lanc\xE9 avec nous un site web repens\xE9 pour am\xE9liorer l'exp\xE9rience utilisateur et mettre en valeur son engagement envers des pratiques agricoles \xE9coresponsables. Nukleo s'est charg\xE9 de la conception compl\xE8te du site web, des maquettes UX jusqu'au d\xE9veloppement, en passant par le design UI.",
          en: "Attitude Fra\xEEche, a leader in the production of mesclun, lettuces, and other field vegetables, launched a redesigned website with us to improve the user experience and highlight their commitment to eco-responsible farming practices. Nukleo handled the complete design of the website, from UX mockups to development, including UI design."
        },
        images: [
          "AttitudeFraiche_1.png",
          "AttitudeFraiche_2.png",
          "AttitudeFraiche_3.png",
          "AttitudeFraiche_4.png",
          "AttitudeFraiche_5.jpg"
        ]
      },
      {
        slug: "bazar-verdunois",
        key: "BazarVerdunois",
        title: "Bazar Verdunois",
        client: "Bazar Verdunois",
        year: "2025",
        category: "Brand",
        services: "Design de logo, Direction artistique, D\xE9clinaison de visuels",
        description: {
          fr: "Le Bazar Verdunois est un march\xE9 d'artisanat qui se tient plusieurs fois par ann\xE9e \xE0 Verdun \u2014 March\xE9 du Livre, March\xE9 d'Automne, March\xE9 d'Hiver, March\xE9 de No\xEBl. Nukleo a accompagn\xE9 le Bazar dans la conception de son identit\xE9 visuelle : cr\xE9ation du logo, \xE9laboration de l'univers graphique et d\xE9clinaison visuelle pour chacun de leurs \xE9v\xE9nements. L'agence a \xE9galement r\xE9alis\xE9 les maquettes UI en pr\xE9paration du futur site web. Le d\xE9fi consistait \xE0 valoriser les six facettes artistiques du Bazar \u2014 poterie, couture, peinture, tatouages, \xE9criture et bijouterie.",
          en: "Le Bazar Verdunois is a craft market held several times a year in Verdun \u2014 Book Market, Autumn Market, Winter Market, Christmas Market. Nukleo accompanied the Bazar in designing its visual identity: logo creation, development of the graphic universe, and visual rollout for each of their events. The agency also created UI mockups in preparation for the future website. The challenge was to highlight the six artistic facets of the Bazar \u2014 pottery, sewing, painting, tattoos, writing, and jewelry."
        },
        images: [
          "BazarVerdunois_1.png",
          "BazarVerdunois_2.png",
          "BazarVerdunois_3.jpg",
          "BazarVerdunois_4.jpg",
          "BazarVerdunois_5.jpg",
          "BazarVerdunois_6.jpg"
        ]
      },
      {
        slug: "toit-a-moi",
        key: "ToitAMoi",
        title: "Toit \xE0 Moi",
        client: "Toit \xE0 Moi",
        year: "2025",
        category: "Brand",
        services: "Design de logo, Direction artistique, Cr\xE9ation d'univers de marque, D\xE9veloppement du site web",
        description: {
          fr: "Toit \xE0 moi Canada est inspir\xE9 de Toit \xE0 moi France. Le concept vise \xE0 offrir un toit aux personnes sans abris et de leur rendre ainsi leur dignit\xE9. Pour son lancement, Nukleo a \xE9t\xE9 mandat\xE9 pour concevoir l'identit\xE9 visuelle et le site web. Nous avons travaill\xE9 sur l'adaptation du logo, en restant fid\xE8le \xE0 l'esprit du logo initial, tout en cr\xE9ant un univers graphique propre au march\xE9 canadien. L'identit\xE9 se veut ronde, color\xE9e et inspirante, refl\xE9tant l'accueil et la chaleur d'un v\xE9ritable \xAB chez soi \xBB.",
          en: "Toit \xE0 moi Canada is inspired by Toit \xE0 moi France. The concept aims to provide shelter for homeless people and restore their dignity. For its launch, Nukleo was mandated to design the visual identity and website. We worked on adapting the logo, staying true to the spirit of the original, while creating a graphic universe specific to the Canadian market. The identity is meant to be rounded, colorful, and inspiring, reflecting the warmth and welcome of a true 'home'."
        },
        images: [
          "ToitAMoi_1.jpg",
          "ToitAMoi_2.png",
          "ToitAMoi_3.png"
        ]
      },
      {
        slug: "mbam",
        key: "MBAM",
        title: "Fondation du MBAM",
        client: "Fondation du Mus\xE9e des Beaux-Arts de Montr\xE9al",
        year: "2024",
        category: "Campagnes",
        services: "Design de logo, Direction artistique",
        description: {
          fr: "Pour animer les soir\xE9es phares de la Fondation du Mus\xE9e des Beaux-Arts de Montr\xE9al, Nukleo a con\xE7u l'identit\xE9 visuelle propre \xE0 chacune des trois soir\xE9es : In Situ (Cercle des Anges), Contre-Jour (Cercle des Jeunes Philanthropes) et Perspectives (Cercle des Anges). L'agence a pris en charge la conception des logos et assur\xE9 la direction artistique des trois univers afin de cr\xE9er des exp\xE9riences visuelles \xE0 la fois coh\xE9rentes et diff\xE9renci\xE9es.",
          en: "To animate the flagship evenings of the Montreal Museum of Fine Arts Foundation, Nukleo designed the visual identity for each of the three events: In Situ (Cercle des Anges), Contre-Jour (Cercle des Jeunes Philanthropes), and Perspectives (Cercle des Anges). The agency handled logo design and artistic direction for all three universes to create visually consistent yet differentiated experiences."
        },
        images: [
          "MBAM_1.png",
          "MBAM_2.png",
          "MBAM_3.png",
          "MBAM_4.png",
          "MBAM_5.png",
          "MBAM_6.png"
        ]
      },
      {
        slug: "summit-law",
        key: "SummitLaw",
        title: "Summit Law",
        client: "Summit Law",
        year: "2025",
        category: "Brand",
        services: "Design de logo, Direction artistique, D\xE9clinaison des supports visuels",
        description: {
          fr: "Anciennement Bos Law, ce cabinet d'avocats \xE9tabli \xE0 Ottawa a confi\xE9 \xE0 Nukleo la refonte compl\xE8te de leur identit\xE9, d\xE9sormais port\xE9e sous le nom Summit Law. Summit Law, c'est un cabinet \xE9l\xE9gant, accessible et tourn\xE9 vers ses clients. Nukleo a con\xE7u une identit\xE9 visuelle moderne et lumineuse, mariant vert profond et jaune-vert, et a d\xE9velopp\xE9 un univers de marque coh\xE9rent d\xE9clin\xE9 sur l'ensemble des supports.",
          en: "Formerly Bos Law, this Ottawa-based law firm entrusted Nukleo with the complete redesign of their identity, now known as Summit Law. Summit Law is an elegant, accessible, and client-focused firm. Nukleo designed a modern and luminous visual identity, combining deep green and yellow-green, and developed a coherent brand universe across all materials."
        },
        images: [
          "SummitLaw_1.jpg",
          "SummitLaw_2.jpg",
          "SummitLaw_3.jpg",
          "SummitLaw_4.jpg",
          "SummitLaw_5.jpg",
          "SummitLaw_6.jpg",
          "SummitLaw_7.jpg",
          "SummitLaw_8.jpg"
        ]
      },
      {
        slug: "affilia",
        key: "Affilia",
        title: "Affilia",
        client: "Affilia",
        year: "2024",
        category: "Brand",
        services: "Cr\xE9ation de nom, Strat\xE9gie de marque, Conception de logo, Direction artistique, D\xE9veloppement du site web",
        websiteUrl: "https://affilia.ca",
        description: {
          fr: "Anciennement connu sous le nom de CMKZ, Affilia est un cabinet d'avocats bas\xE9 \xE0 Montr\xE9al. Pour refl\xE9ter l'\xE9volution de leur \xE9quipe et de leur vision strat\xE9gique, le cabinet souhaitait se repositionner et moderniser son image. Avec Nukleo, nous avons men\xE9 ce processus de transformation de bout en bout : cr\xE9ation du nouveau nom, conception du logo et de l'univers graphique, d\xE9clinaison des supports visuels ainsi que la r\xE9alisation compl\xE8te du site web.",
          en: "Formerly known as CMKZ, Affilia is a Montreal-based law firm. To reflect the evolution of their team and strategic vision, the firm wanted to reposition itself and modernize its image. With Nukleo, we led this transformation process from end to end: creating the new name, designing the logo and graphic universe, rolling out visual materials, and building the complete website."
        },
        images: [
          "Affilia_1.jpg",
          "Affilia_2.jpg",
          "Affilia_3.jpg",
          "Affilia_4.jpg",
          "Affilia_5.png",
          "Affilia_6.png",
          "Affilia_7.jpg",
          "Affilia_8.png"
        ]
      },
      {
        slug: "adele-blais",
        key: "AdeleBlais",
        title: "Ad\xE8le Blais",
        client: "Ad\xE8le Blais",
        year: "2025",
        category: "Plateforme",
        services: "Confection, D\xE9ploiement",
        description: {
          fr: "Ad\xE8le Blais est une artiste peintre qui souhaite pr\xE9senter ses \u0153uvres en r\xE9alit\xE9 augment\xE9e. Nukleo a confectionn\xE9 et d\xE9ploy\xE9 l'application mobile permettant de visualiser directement les \u0153uvres en r\xE9alit\xE9 augment\xE9e sur votre t\xE9l\xE9phone. Une exp\xE9rience immersive qui repousse les fronti\xE8res entre l'art et la technologie.",
          en: "Ad\xE8le Blais is a painter who wanted to present her works in augmented reality. Nukleo built and deployed the mobile application that allows you to view the works directly in augmented reality on your phone. An immersive experience that pushes the boundaries between art and technology."
        },
        images: [
          "AdeleBlais_1.png",
          "AdeleBlais_2.png",
          "AdeleBlais_3.png",
          "AdeleBlais_4.png"
        ]
      },
      {
        slug: "sycle",
        key: "Sycle",
        title: "Sycle",
        client: "Sycle",
        year: "2024",
        category: "Brand",
        services: "Direction artistique, Conception du logo, Maquettes UI/UX, D\xE9veloppement",
        websiteUrl: "https://sycle.ca",
        description: {
          fr: "Sycle est une entreprise qui valorise le sulfate de sodium au Qu\xE9bec. Nukleo s'est occup\xE9 de la conception du logo, ainsi que de la conception des wireframes et de l'UI, en plus du d\xE9veloppement du site. Le logo reprend le concept des fl\xE8ches en cercle, ce qui rappelle le recyclage, un enjeu majeur dans l'industrie dans laquelle Sycle \xE9volue.",
          en: "Sycle is a company that recycles sodium sulfate in Quebec. Nukleo handled the logo design, wireframes, UI design, and website development. The logo uses the concept of circular arrows, evoking recycling \u2014 a key issue in the industry in which Sycle operates."
        },
        images: [
          "Sycle_2.png",
          "Sycle_3.png",
          "Sycle_4.png"
        ]
      },
      {
        slug: "recrute-action",
        key: "RecruteAction",
        title: "Recrute Action",
        client: "Recrute Action",
        year: "2025",
        category: "Site web",
        services: "Maquettes UI/UX, D\xE9veloppement",
        websiteUrl: "https://recruteaction.com",
        description: {
          fr: "Recrute Action est une firme de recrutement situ\xE9e \xE0 Montr\xE9al et \xE0 Dover (\xC9tats-Unis). L'enjeu ? Avoir un site plus actuel dans lequel le parcours utilisateur est simple et intuitif. Nukleo s'est occup\xE9 de la refonte du site, comprenant les wireframes, les maquettes UI ainsi que le d\xE9veloppement.",
          en: "Recrute Action is a recruitment firm located in Montreal and Dover (USA). The challenge? Having a more current website where the user journey is simple and intuitive. Nukleo handled the site redesign, including wireframes, UI mockups, and development."
        },
        images: [
          "RecruteAction_1.jpg",
          "RecruteAction_2.png"
        ]
      },
      {
        slug: "matchstick-theatre",
        key: "Matchstick",
        title: "Matchstick Theatre",
        client: "Matchstick Theatre",
        year: "2025",
        category: "Site web",
        services: "Maquettes UI/UX, D\xE9veloppement",
        websiteUrl: "https://matchsticktheatre.ca",
        description: {
          fr: "Matchstick est une troupe de th\xE9\xE2tre canadienne bas\xE9e en Nouvelle-\xC9cosse. Son travail place au c\u0153ur de sa d\xE9marche la collaboration avec les communaut\xE9s locales, la mise en valeur des voix sous-repr\xE9sent\xE9es et la cr\xE9ation d'\u0153uvres offrant au public des moments de v\xE9rit\xE9 partag\xE9s. En faisant appel \xE0 Nukleo, la troupe a pu se doter d'une nouvelle image gr\xE2ce \xE0 une refonte compl\xE8te de son site web.",
          en: "Matchstick is a Canadian theatre company based in Nova Scotia. Its work centers on collaboration with local communities, amplifying underrepresented voices, and creating works that offer audiences shared moments of truth. By working with Nukleo, the company was able to give itself a new image through a complete website redesign."
        },
        images: [
          "Matchstick_1.png",
          "Matchstick_2.png",
          "Matchstick_3.jpg"
        ]
      },
      {
        slug: "maison-jean-lapointe",
        key: "MJL",
        title: "Maison Jean Lapointe",
        client: "Maison Jean Lapointe",
        year: "2024",
        category: "Campagnes",
        services: "Direction artistique, Conception visuelle",
        description: {
          fr: "La Maison Jean Lapointe et La Fondation Jean Lapointe ont fait appel aux services de Nukleo pour la conception de leur rapport annuel 2024 et 2025. Un rapport color\xE9, accessible et attractif, qui refl\xE8te l'engagement de l'organisation envers ses b\xE9n\xE9ficiaires et ses donateurs.",
          en: "The Maison Jean Lapointe and the Jean Lapointe Foundation called on Nukleo's services for the design of their 2024 and 2025 annual reports. A colorful, accessible, and attractive report that reflects the organization's commitment to its beneficiaries and donors."
        },
        images: [
          "MJL_1.png",
          "MJL_2.png",
          "MJL_3.png",
          "MJL_4.png",
          "MJL_5.png",
          "MJL_6.png"
        ]
      },
      {
        slug: "cqde",
        key: "CQDE",
        title: "CQDE",
        client: "CQDE",
        year: "2025",
        category: "Campagnes",
        services: "Id\xE9ation de campagne, Direction artistique, D\xE9clinaisons visuelles",
        description: {
          fr: "Le CQDE est un organisme qu\xE9b\xE9cois qui \u0153uvre \xE0 la protection de l'environnement par des actions juridiques, \xE9ducatives et de sensibilisation. Nukleo a orchestr\xE9 pour le CQDE une campagne int\xE9gr\xE9e combinant infolettres, publications organiques sur les m\xE9dias sociaux et publicit\xE9s payantes cibl\xE9es. L'objectif fix\xE9 de 35 000 $ en dons a \xE9t\xE9 atteint gr\xE2ce \xE0 une strat\xE9gie de contenu align\xE9e sur les actions r\xE9centes du CQDE.",
          en: "The CQDE is a Quebec organization working to protect the environment through legal, educational, and awareness-raising actions. Nukleo orchestrated an integrated campaign for the CQDE combining newsletters, organic social media posts, and targeted paid advertising. The set goal of $35,000 in donations was achieved through a content strategy aligned with the CQDE's recent actions."
        },
        images: [
          "CQDE_1.png",
          "CQDE_2.png",
          "CQDE_3.png",
          "CQDE_4.png",
          "CQDE_5.png"
        ]
      },
      {
        slug: "municipalite-de-clare",
        key: "CDENE",
        title: "Municipalit\xE9 de Clare",
        client: "CD\xC9N\xC9",
        year: "2025",
        category: "Campagnes",
        services: "Id\xE9ation de campagne, Direction artistique, Direction de tournage, D\xE9clinaisons visuelles",
        description: {
          fr: "Le CD\xC9N\xC9 a mandat\xE9 Nukleo pour concevoir une campagne digitale visant \xE0 attirer des francophones du monde entier \xE0 s'installer en Nouvelle-\xC9cosse, et plus particuli\xE8rement dans la municipalit\xE9 de Clare. Structur\xE9e en deux volets \u2014 \xAB Vivre en Clare \xBB en jaune et \xAB S'installer en famille \xE0 Clare \xBB en bleu \u2014 la campagne d\xE9livre des messages cibl\xE9s et adapt\xE9s \xE0 deux publics distincts. Les r\xE9sultats ont largement d\xE9pass\xE9 les attentes.",
          en: "The CD\xC9N\xC9 mandated Nukleo to design a digital campaign aimed at attracting French speakers from around the world to settle in Nova Scotia, and more specifically in the municipality of Clare. Structured in two parts \u2014 'Living in Clare' in yellow and 'Settling as a family in Clare' in blue \u2014 the campaign delivers targeted messages tailored to two distinct audiences. The results far exceeded expectations."
        },
        images: [
          "CDENE_1.png",
          "CDENE_2.png",
          "CDENE_3.png",
          "CDENE_4.png"
        ]
      },
      {
        slug: "reseau-sante-nouvelle-ecosse",
        key: "ReseauSante",
        title: "R\xE9seau Sant\xE9 Nouvelle-\xC9cosse",
        client: "R\xE9seau Sant\xE9 Nouvelle-\xC9cosse",
        year: "2025",
        category: "Campagnes",
        services: "Direction artistique, Id\xE9ation de campagne, Strat\xE9gie digitale",
        description: {
          fr: "R\xE9seau Sant\xE9 Nouvelle-\xC9cosse est le principal fournisseur de services de sant\xE9 de la province. Dans le but de faire progresser la m\xE9decine, l'organisation recherche des patients simul\xE9s pour enrichir la formation de ses m\xE9decins. Pour soutenir cette initiative, Nukleo a \xE9t\xE9 mandat\xE9 afin de concevoir une campagne de communication \xE0 la fois percutante et visuelle.",
          en: "R\xE9seau Sant\xE9 Nouvelle-\xC9cosse is the province's main healthcare provider. In order to advance medicine, the organization seeks simulated patients to enrich the training of its doctors. To support this initiative, Nukleo was mandated to design a communication campaign that is both impactful and visual."
        },
        images: [
          "ReseauSante_1.jpg",
          "ReseauSante_2.png",
          "ReseauSante_3.jpg"
        ]
      },
      {
        slug: "les-voix-ferrees",
        key: "VoixFerrees",
        title: "Les Voix Ferr\xE9es",
        client: "Les Voix Ferr\xE9es",
        year: "2024",
        category: "Campagnes",
        services: "Direction artistique, Conception visuelle",
        description: {
          fr: "Les Voix Ferr\xE9es, c'est un ensemble vocal bas\xE9 \xE0 Montr\xE9al qui fait principalement du a cappella. Pour leurs \xE9v\xE9nements-b\xE9n\xE9fice (Spag Show et \xC9tat de veille), ils ont confi\xE9 \xE0 Nukleo la cr\xE9ation des programmes graphiques. Nous nous sommes occup\xE9 de l'illustration principale, de la mise en page et de la direction visuelle des livrets.",
          en: "Les Voix Ferr\xE9es is a vocal ensemble based in Montreal that primarily performs a cappella. For their benefit events (Spag Show and \xC9tat de veille), they entrusted Nukleo with the creation of the graphic programs. We handled the main illustration, layout, and visual direction of the booklets."
        },
        images: [
          "VoixFerrees_1.png",
          "VoixFerrees_2.png",
          "VoixFerrees_3.png",
          "VoixFerrees_4.png"
        ]
      },
      {
        slug: "zu",
        key: "Zu",
        title: "Z\xFA",
        client: "Z\xFA",
        year: "2024",
        category: "Campagnes",
        services: "Direction artistique, Conception de visuels, Strat\xE9gie de communication, Gestion des m\xE9dias sociaux",
        description: {
          fr: "Z\xFA est un organisme montr\xE9alais qui propulse les entrepreneur\xB7e\xB7s et startups des industries cr\xE9atives et technologiques. Pour Z\xFA, Nukleo con\xE7oit et ex\xE9cute une strat\xE9gie de communication num\xE9rique compl\xE8te qui soutient ses \xE9v\xE9nements phares (Sommets Influence et \xC9mergence). Elle inclut la cr\xE9ation de contenus r\xE9guliers, la gestion de campagnes publicitaires (Google Grant, Meta) et l'optimisation continue du site web.",
          en: "Z\xFA is a Montreal organization that propels entrepreneurs and startups in the creative and technology industries. For Z\xFA, Nukleo designs and executes a complete digital communication strategy that supports its flagship events (Sommets Influence and \xC9mergence). It includes the creation of regular content, management of advertising campaigns (Google Grant, Meta), and continuous website optimization."
        },
        images: [
          "Zu_1.png",
          "Zu_2.png",
          "Zu_3.png",
          "Zu_4.png"
        ]
      },
      {
        slug: "doctoctoc",
        key: "DocTocToc",
        title: "DocTocToc",
        client: "DocTocToc",
        year: "2025",
        category: "Campagnes",
        services: "Direction artistique, Strat\xE9gie de communication, R\xE9seaux sociaux, Conception de visuels",
        description: {
          fr: "DocTocToc est un organisme sans but lucratif qui facilite l'acc\xE8s aux soins de sant\xE9 pour les enfants de 0 \xE0 5 ans et leur famille. Pour DocTocToc, Nukleo a con\xE7u et d\xE9ploy\xE9 une strat\xE9gie de communication int\xE9gr\xE9e afin d'accompagner le lancement officiel de l'organisation, incluant l'ensemble des contenus promotionnels et la production compl\xE8te de l'\xE9v\xE9nement inaugural.",
          en: "DocTocToc is a non-profit organization that facilitates access to healthcare for children aged 0 to 5 and their families. For DocTocToc, Nukleo designed and deployed an integrated communication strategy to support the official launch of the organization, including all promotional content and the complete production of the inaugural event."
        },
        images: [
          "DocTocToc_1.jpg",
          "DocTocToc_2.png",
          "DocTocToc_3.jpg"
        ]
      },
      {
        slug: "diner-en-blanc",
        key: "DinerEnBlanc",
        title: "D\xEEner en Blanc",
        client: "D\xEEner en Blanc",
        year: "2025",
        category: "Site web",
        services: "Conception UI/UX",
        websiteUrl: "https://dinerenblanc.com",
        description: {
          fr: "D\xEEner en Blanc, l'exp\xE9rience gastronomique embl\xE9matique \xE0 l'\xE9chelle mondiale, a rafra\xEEchi son image de marque avec un site web repens\xE9, alliant \xE9l\xE9gance et accessibilit\xE9 pour un public international.",
          en: "D\xEEner en Blanc, the iconic gastronomic experience on a global scale, refreshed its brand image with a redesigned website, combining elegance and accessibility for an international audience."
        },
        images: [
          "DinerEnBlanc_1.png",
          "DinerEnBlanc_2.jpg",
          "DinerEnBlanc_3.png"
        ]
      },
      {
        slug: "ajefne",
        key: "AJEFNE",
        title: "AJEFNE",
        client: "AJEFNE",
        year: "2025",
        category: "Site web",
        services: "Conception UI/UX, D\xE9veloppement",
        websiteUrl: "https://ajefne.ca",
        description: {
          fr: "L'AJEFN\xC9 est un organisme \xE0 but non lucratif qui facilite l'acc\xE8s aux services juridiques en fran\xE7ais pour les communaut\xE9s acadienne et francophone. AJEFNE a fait affaire avec Nukleo pour la refonte de son site web. Nous avons travaill\xE9 \xE0 d\xE9velopper une plateforme repr\xE9sentative des services offerts, afin de bien guider l'utilisateur vers les informations recherch\xE9es.",
          en: "AJEFN\xC9 is a non-profit organization that facilitates access to legal services in French for the Acadian and Francophone communities. AJEFNE worked with Nukleo for the redesign of its website. We worked to develop a platform representative of the services offered, in order to properly guide the user towards the information they are looking for."
        },
        images: [
          "AJEFNE_1.png",
          "AJEFNE_2.jpg"
        ]
      },
      // ─── Projets sans description textuelle complète ───────────────────────────
      {
        slug: "amq",
        key: "AMQ",
        title: "Association Marketing Qu\xE9bec",
        client: "Association Marketing Qu\xE9bec",
        year: "2025",
        category: "Site web",
        services: "Conception UI/UX, D\xE9veloppement",
        websiteUrl: "https://associationmarketingquebec.ca",
        description: {
          fr: "L'Association Marketing Qu\xE9bec (AMQ) rassemble depuis 1987 les professionnels du marketing, des communications et du num\xE9rique au Qu\xE9bec. Sa mission : inspirer, partager et r\xE9seauter. Nukleo a r\xE9alis\xE9 la refonte compl\xE8te du site web de l'AMQ, en modernisant l'exp\xE9rience utilisateur tout en pr\xE9servant l'identit\xE9 de cette institution incontournable du marketing qu\xE9b\xE9cois. Le nouveau site refl\xE8te la vision de l'AMQ : \xEAtre la r\xE9f\xE9rence marketing au Qu\xE9bec, en f\xE9d\xE9rant les talents et en propulsant les id\xE9es.",
          en: "The Association Marketing Qu\xE9bec (AMQ) has been bringing together marketing, communications, and digital professionals in Quebec since 1987. Its mission: inspire, share, and network. Nukleo carried out the complete redesign of the AMQ website, modernizing the user experience while preserving the identity of this cornerstone institution of Quebec marketing. The new site reflects AMQ's vision: to be the marketing reference in Quebec, by uniting talent and propelling ideas."
        },
        images: ["AMQ_1.png"]
      },
      {
        slug: "egf",
        key: "EGF",
        title: "Elizabeth Greenshields Foundation",
        client: "Elizabeth Greenshields Foundation",
        year: "2025",
        category: "Site web",
        services: "Conception UI/UX, D\xE9veloppement",
        websiteUrl: "https://www.elizabethgreenshieldsfoundation.ca/en",
        description: {
          fr: "La Fondation Elizabeth Greenshields soutient les jeunes artistes repr\xE9sentatifs du monde entier dans les domaines de la peinture, de la sculpture, de la gravure et du dessin. Nukleo a r\xE9alis\xE9 la refonte compl\xE8te du site web de la Fondation, en cr\xE9ant une exp\xE9rience digitale \xE0 la hauteur du prestige de l'institution. Le nouveau site met en valeur les boursiers du monde entier et facilite l'acc\xE8s aux ressources pour les artistes \xE9mergents, tout en refl\xE9tant l'engagement de la Fondation envers l'excellence artistique.",
          en: "The Elizabeth Greenshields Foundation exists to support young representational artists from around the world in the fields of painting, sculpture, printmaking, and drawing. Nukleo carried out the complete redesign of the Foundation's website, creating a digital experience worthy of the institution's prestige. The new site showcases grantees from around the world and facilitates access to resources for emerging artists, while reflecting the Foundation's commitment to artistic excellence."
        },
        images: ["EGF_1.png", "EGF_2.jpg"]
      },
      {
        slug: "cfm",
        key: "CFM",
        title: "CFM",
        client: "CFM",
        year: "2024",
        category: "Campagnes",
        services: "Direction artistique, Conception visuelle",
        description: {
          fr: "Direction artistique et conception visuelle pour CFM.",
          en: "Artistic direction and visual design for CFM."
        },
        images: ["CFM_1.png", "CFM_2.png"]
      },
      {
        slug: "globecar",
        key: "Globecar",
        title: "Globecar",
        client: "Globecar",
        year: "2024",
        category: "Site web",
        services: "Gestion du site web, Maintenance \xE9volutive, Am\xE9liorations",
        websiteUrl: "https://www.globecar.com/en/",
        description: {
          fr: "Globe Car & Truck Rental est la r\xE9f\xE9rence montr\xE9alaise pour la location de v\xE9hicules abordables : voitures, camions, fourgonnettes et v\xE9hicules \xE9lectriques, avec des avantages inclus comme l'assistance routi\xE8re et la couverture responsabilit\xE9 civile. Nukleo assure la gestion, la maintenance \xE9volutive et les am\xE9liorations continues du site web de Globecar, garantissant une exp\xE9rience de r\xE9servation fluide et performante pour les milliers de clients qui passent par la plateforme chaque mois.",
          en: "Globe Car & Truck Rental is the Montreal reference for affordable vehicle rentals: cars, trucks, vans, and electric vehicles, with included benefits like roadside assistance and liability coverage. Nukleo handles the management, ongoing maintenance, and continuous improvements of Globecar's website, ensuring a smooth and high-performing booking experience for the thousands of customers who use the platform every month."
        },
        images: ["Globecar_1.png", "Globecar_2.jpeg"]
      },
      {
        slug: "go-coupon",
        key: "GoCoupon",
        title: "GoCoupons",
        client: "GoCoupons",
        year: "2024",
        category: "Plateforme",
        services: "Maintenance \xE9volutive, D\xE9veloppement, Int\xE9gration IA",
        description: {
          fr: "GoCoupons est la plateforme de r\xE9f\xE9rence au Canada pour les coupons de caisse et les offres de remboursement. Elle permet aux consommateurs d'\xE9conomiser sur leurs achats quotidiens gr\xE2ce \xE0 des coupons imprimables et des offres de cashback. Nukleo assure la maintenance et l'\xE9volution continue de la plateforme, en garantissant sa stabilit\xE9, ses performances et l'int\xE9gration de nouvelles fonctionnalit\xE9s. L'agence travaille \xE9galement sur des projets d'intelligence artificielle pour enrichir l'exp\xE9rience utilisateur et optimiser la personnalisation des offres.",
          en: "GoCoupons is the reference platform in Canada for cash coupons and rebate offers. It allows consumers to save on their daily purchases through printable coupons and cashback offers. Nukleo handles the ongoing maintenance and evolution of the platform, ensuring its stability, performance, and the integration of new features. The agency is also working on artificial intelligence projects to enrich the user experience and optimize offer personalization."
        },
        images: ["GoCoupon_1.png", "GoCoupon_2.jpeg"]
      },
      {
        slug: "pmp",
        key: "PMP",
        title: "PMP Strategy",
        client: "PMP Strategy",
        year: "2024",
        category: "Site web",
        services: "Conception UI/UX, D\xE9veloppement",
        websiteUrl: "https://pmpstrategy.com/en/",
        description: {
          fr: "PMP Strategy est un cabinet de conseil en strat\xE9gie de premier plan, pr\xE9sent dans onze villes \xE0 travers le monde \u2014 Paris, Londres, Montr\xE9al, New York, Seattle, Luxembourg, Duba\xEF, Casablanca, Toronto, Bruxelles et Madrid. Sp\xE9cialis\xE9 dans les secteurs des t\xE9l\xE9communications, des m\xE9dias, de la technologie, de l'\xE9nergie, des transports et des services financiers, PMP Strategy accompagne ses clients dans leurs transformations num\xE9riques, leurs enjeux ESG et la cr\xE9ation de valeur. Nukleo a r\xE9alis\xE9 la refonte compl\xE8te du site web de PMP Strategy, en modernisant l'exp\xE9rience utilisateur et en repensant l'architecture de l'information pour refl\xE9ter l'envergure internationale du cabinet.",
          en: "PMP Strategy is a leading strategy consulting firm present in eleven cities around the world \u2014 Paris, London, Montreal, New York, Seattle, Luxembourg, Dubai, Casablanca, Toronto, Brussels, and Madrid. Specialized in telecommunications, media, technology, energy, transport, and financial services, PMP Strategy supports its clients through digital transformations, ESG challenges, and value creation. Nukleo carried out the complete redesign of PMP Strategy's website, modernizing the user experience and rethinking the information architecture to reflect the firm's international scope."
        },
        images: ["PMP_1.png", "PMP_2.png"]
      },
      {
        slug: "queertech",
        key: "Queertech",
        title: "QueerTech",
        client: "QueerTech",
        year: "2024",
        category: "Site web",
        services: "Conception UI/UX, D\xE9veloppement, Communications, Marketing annuel",
        websiteUrl: "https://queertech.org/en",
        description: {
          fr: "QueerTech est une organisation canadienne qui habilite les personnes 2SLGBTQIA+ \xE0 int\xE9grer l'industrie technologique, \xE0 faire progresser leur carri\xE8re et \xE0 lancer des entreprises innovantes. Nukleo a accompagn\xE9 QueerTech dans la refonte de son site web, en cr\xE9ant une exp\xE9rience num\xE9rique inclusive et dynamique qui refl\xE8te la mission de l'organisation. Au-del\xE0 du site, Nukleo assure \xE9galement les communications et le marketing annuel de QueerTech, en soutenant la croissance de la communaut\xE9 et la visibilit\xE9 de ses programmes phares : QT Access, QT Leaders et QT Founders.",
          en: "QueerTech is a Canadian organization that empowers 2SLGBTQIA+ people to break into the tech industry, advance their careers, and launch innovative businesses. Nukleo accompanied QueerTech in the redesign of its website, creating an inclusive and dynamic digital experience that reflects the organization's mission. Beyond the site, Nukleo also handles QueerTech's annual communications and marketing, supporting community growth and the visibility of its flagship programs: QT Access, QT Leaders, and QT Founders."
        },
        images: ["Queertech_1.png", "Queertech_2.png", "Queertech_3.jpeg"]
      },
      {
        slug: "nouvelle-ile",
        key: "NouvelleIle",
        title: "Nouvelle \xCEle",
        client: "Verticale \u2014 Centre d'artistes",
        year: "2024",
        category: "Site web",
        services: "Conception UI/UX, D\xE9veloppement",
        websiteUrl: "https://nouvelle-ile.ca",
        description: {
          fr: "Nouvelle \xCEle est une plateforme de m\xE9diation culturelle num\xE9rique con\xE7ue par Verticale, un centre d'artistes de Laval. Elle prend la forme d'une carte interactive accessible en ligne, o\xF9 chaque ic\xF4ne repr\xE9sente une \u0153uvre d'art \xE9ph\xE9m\xE8re cr\xE9\xE9e sp\xE9cialement pour un lieu particulier de la ville. Nukleo a d\xE9velopp\xE9 cette plateforme originale qui r\xE9v\xE8le l'existence de plus d'une trentaine d'\u0153uvres diffus\xE9es par Verticale au cours des quinze derni\xE8res ann\xE9es, invitant le public \xE0 renouveler son regard sur les espaces qui nous entourent et \xE0 cultiver l'esprit des lieux.",
          en: "Nouvelle \xCEle is a digital cultural mediation platform designed by Verticale, an artist-run centre in Laval. It takes the form of an interactive map accessible online, where each icon represents an ephemeral artwork created specifically for a particular location in the city. Nukleo developed this original platform that reveals the existence of over thirty works presented by Verticale over the past fifteen years, inviting the public to renew their perspective on the spaces around us and to cultivate the spirit of places."
        },
        images: ["NouvelleIle_1.jpg", "NouvelleIle_2.png"]
      },
      {
        slug: "o-salon",
        key: "OSalon",
        title: "O Salon",
        client: "O Salon",
        year: "2024",
        category: "Site web",
        services: "Conception UI/UX, D\xE9veloppement",
        websiteUrl: "https://osalonmtl.ca",
        description: {
          fr: "O Salon est un salon de coiffure haut de gamme situ\xE9 au c\u0153ur du Plateau Mont-Royal \xE0 Montr\xE9al. Chaleureux et convivial, il propose des services de coiffure, de coloration et de maquillage non genr\xE9s, r\xE9alis\xE9s par une \xE9quipe diversifi\xE9e qui se forme r\xE9guli\xE8rement aux derni\xE8res tendances. Nukleo a r\xE9alis\xE9 la refonte compl\xE8te du site web d'O Salon, en cr\xE9ant une exp\xE9rience en ligne qui refl\xE8te l'identit\xE9 unique et l'atmosph\xE8re accueillante du salon.",
          en: "O Salon is a high-end hair salon located in the heart of Montreal's Plateau Mont-Royal neighbourhood. Warm and welcoming, it offers gender-neutral hairdressing, colouring, and makeup services, delivered by a diverse team that regularly trains in the latest trends. Nukleo carried out the complete redesign of O Salon's website, creating an online experience that reflects the salon's unique identity and welcoming atmosphere."
        },
        images: ["OSalon_1.jpg"]
      },
      {
        slug: "psy-etc",
        key: "PsyEtc",
        title: "Psy etc.",
        client: "Psy etc.",
        year: "2024",
        category: "Marketing num\xE9rique",
        services: "Direction artistique, R\xE9seaux sociaux",
        description: {
          fr: "Direction artistique et cr\xE9ation de contenu pour les r\xE9seaux sociaux de Psy etc.",
          en: "Artistic direction and content creation for Psy etc.'s social media."
        },
        images: ["PsyEtc_1.jpg"]
      },
      // ─── Nouveaux projets issus des offres de services ───────────────────────────
      {
        slug: "theatre-nova-scotia",
        key: "TheaterNS",
        title: "Theatre Nova Scotia",
        client: "Theatre Nova Scotia",
        year: "2025",
        category: "Site web",
        services: "Conception UI/UX, D\xE9veloppement, Maintenance \xE9volutive",
        websiteUrl: "https://theatrens.ca",
        description: {
          fr: "Theatre Nova Scotia est l'organisation provinciale d\xE9di\xE9e au d\xE9veloppement du th\xE9\xE2tre professionnel et communautaire en Nouvelle-\xC9cosse. Elle chapeaute un \xE9cosyst\xE8me num\xE9rique de quatre sites web : theatrens.ca, performns.ca, dramafest.ca et le site des Merritt Awards. Nukleo a r\xE9alis\xE9 la conception et le d\xE9veloppement de ces plateformes, en assurant une exp\xE9rience utilisateur coh\xE9rente, accessible et conforme aux standards WCAG/ADA. L'agence assure \xE9galement la maintenance annuelle de l'ensemble de l'\xE9cosyst\xE8me digital, garantissant la stabilit\xE9, la s\xE9curit\xE9 et l'\xE9volution continue des quatre sites.",
          en: "Theatre Nova Scotia is the provincial organization dedicated to the development of professional and community theatre in Nova Scotia. It oversees a digital ecosystem of four websites: theatrens.ca, performns.ca, dramafest.ca, and the Merritt Awards site. Nukleo designed and developed these platforms, ensuring a consistent, accessible, and WCAG/ADA-compliant user experience. The agency also provides annual maintenance for the entire digital ecosystem, ensuring the stability, security, and continuous evolution of all four sites."
        },
        images: [
          "TheaterNS_1.jpeg"
        ]
      },
      // ─── Projets issus des nouvelles offres de services ───────────────────────────
      {
        slug: "cdene",
        key: "CDENE",
        title: "CD\xC9N\xC9",
        client: "CD\xC9N\xC9",
        year: "2025",
        category: "Campagnes",
        services: "Id\xE9ation de campagne, Direction artistique, Production vid\xE9o, Strat\xE9gie de communication",
        description: {
          fr: "Le Conseil de d\xE9veloppement \xE9conomique des Nouvelles-\xC9cosse (CD\xC9N\xC9) est un organisme francophone qui soutient le d\xE9veloppement \xE9conomique et l'attraction de nouveaux r\xE9sidents en Nouvelle-\xC9cosse. Nukleo a \xE9t\xE9 mandat\xE9 par le CD\xC9N\xC9 pour concevoir et produire plusieurs campagnes de communication, notamment une s\xE9rie de vid\xE9os visant \xE0 attirer les alumnis de l'Universit\xE9 Sainte-Anne \xE0 revenir s'\xE9tablir dans la province. L'agence a assur\xE9 la direction artistique, supervis\xE9 les tournages sur place \xE0 Halifax et livr\xE9 des contenus authentiques et inspirants pour rejoindre les communaut\xE9s francophones du Canada et de l'international.",
          en: "The Conseil de d\xE9veloppement \xE9conomique des Nouvelles-\xC9cosse (CD\xC9N\xC9) is a Francophone organization that supports economic development and the attraction of new residents to Nova Scotia. Nukleo was mandated by CD\xC9N\xC9 to design and produce several communication campaigns, including a series of videos aimed at attracting Universit\xE9 Sainte-Anne alumni to return and settle in the province. The agency handled the artistic direction, supervised on-site shoots in Halifax, and delivered authentic and inspiring content to reach Francophone communities across Canada and internationally."
        },
        images: [
          "CDENE_1.png",
          "CDENE_2.png",
          "CDENE_3.png",
          "CDENE_4.png"
        ]
      },
      {
        slug: "arsenal-nouvelles",
        key: "ArsenalNouvelles",
        title: "Arsenal \u2014 Sites de nouvelles",
        client: "Arsenal",
        year: "2025",
        category: "Site web",
        services: "Maintenance \xE9volutive, D\xE9veloppement, H\xE9bergement",
        description: {
          fr: "Arsenal est un groupe m\xE9dia ind\xE9pendant qui op\xE8re plusieurs sites de nouvelles et de radio au Qu\xE9bec. Nukleo assure la maintenance mensuelle de l'ensemble de l'\xE9cosyst\xE8me digital d'Arsenal, incluant les sites de nouvelles et les sites des stations de radio (Viva, Hit Country, O). L'agence g\xE8re la surveillance des serveurs, les mises \xE0 jour de s\xE9curit\xE9, l'optimisation des performances et les banques d'heures pour les \xE9volutions et am\xE9liorations continues.",
          en: "Arsenal is an independent media group operating several news and radio websites in Quebec. Nukleo handles the monthly maintenance of Arsenal's entire digital ecosystem, including news sites and radio station websites (Viva, Hit Country, O). The agency manages server monitoring, security updates, performance optimization, and hour banks for ongoing evolutions and improvements."
        },
        images: [
          "ArsenalNouvelles_1.png"
        ]
      },
      {
        slug: "entertain-ai",
        key: "EntertainAI",
        title: "Entertainment AI",
        client: "Entertainment AI",
        year: "2025",
        category: "Marketing num\xE9rique",
        services: "Strat\xE9gie marketing num\xE9rique, Gestion des campagnes publicitaires, SEO, R\xE9seaux sociaux",
        websiteUrl: "https://entertainmentai.ca",
        description: {
          fr: "Entertainment AI est une conf\xE9rence annuelle d\xE9di\xE9e \xE0 l'intersection de l'intelligence artificielle et des industries cr\xE9atives. Nukleo a con\xE7u et d\xE9ploy\xE9 une strat\xE9gie de marketing num\xE9rique compl\xE8te pour maximiser les ventes de billets de l'\xE9dition 2026. Le mandat a inclus l'optimisation du site web, la configuration des outils de suivi et de retargeting, la gestion des campagnes multicanales (LinkedIn, Meta, Google Ads), l'activation du programme Google Ad Grants et la mise en place d'une strat\xE9gie d'infolettres automatis\xE9e.",
          en: "Entertainment AI is an annual conference dedicated to the intersection of artificial intelligence and the creative industries. Nukleo designed and deployed a comprehensive digital marketing strategy to maximize ticket sales for the 2026 edition. The mandate included website optimization, tracking and retargeting setup, management of multichannel campaigns (LinkedIn, Meta, Google Ads), activation of the Google Ad Grants program, and the implementation of an automated newsletter strategy."
        },
        images: []
      },
      {
        slug: "hhhusher",
        key: "HHHusher",
        title: "HHHusher",
        client: "HHHusher",
        year: "2025",
        category: "Marketing num\xE9rique",
        services: "Strat\xE9gie marketing num\xE9rique, Gestion des campagnes publicitaires, Marketing par courriel",
        description: {
          fr: "HHHusher est une entreprise innovante qui commercialise un syst\xE8me de sourdine r\xE9volutionnaire pour batteries acoustiques, permettant aux batteurs de jouer \xE0 volume r\xE9duit sans compromettre la sensation de jeu. Apr\xE8s le lancement de son site transactionnel Shopify, HHHusher a mandat\xE9 Nukleo pour \xE9laborer une strat\xE9gie de marketing num\xE9rique structur\xE9e visant \xE0 acc\xE9l\xE9rer les ventes aupr\xE8s de deux march\xE9s cibles : les musiciens (B2C) et les studios professionnels (B2B). L'agence a mis en place un tunnel de conversion optimis\xE9, des campagnes Meta et Google Ads, une strat\xE9gie d'influence et l'int\xE9gration de Klaviyo pour l'automatisation des communications.",
          en: "HHHusher is an innovative company that markets a revolutionary muting system for acoustic drums, allowing drummers to play at reduced volume without compromising the feel of playing. After the launch of its Shopify transactional site, HHHusher mandated Nukleo to develop a structured digital marketing strategy aimed at accelerating sales to two target markets: musicians (B2C) and professional studios (B2B). The agency set up an optimized conversion funnel, Meta and Google Ads campaigns, an influencer strategy, and Klaviyo integration for communication automation."
        },
        images: []
      },
      {
        slug: "centre-des-femmes-de-montreal",
        key: "CentreFemmes",
        title: "Centre des femmes de Montr\xE9al",
        client: "Centre des femmes de Montr\xE9al",
        year: "2025",
        category: "Marketing num\xE9rique",
        services: "Gestion des r\xE9seaux sociaux, Campagnes publicitaires, Infolettres, Photographie, Strat\xE9gie de communication",
        description: {
          fr: "Le Centre des femmes de Montr\xE9al est un organisme communautaire f\xE9ministe dont la mission est d'aider les femmes \xE0 s'aider elles-m\xEAmes, en leur offrant des services d'\xE9ducation populaire, de soutien et d'entraide. Nukleo a pris en charge les communications num\xE9riques du Centre pour une p\xE9riode de six mois, incluant la gestion des r\xE9seaux sociaux (Facebook, LinkedIn, Instagram), la cr\xE9ation et l'envoi d'infolettres, la gestion de campagnes publicitaires cibl\xE9es pour rejoindre les femmes qui ont le plus besoin des services, la mise \xE0 jour du site web et la coordination d'une s\xE9ance photo professionnelle pour renouveler la banque d'images de l'organisme.",
          en: "The Centre des femmes de Montr\xE9al is a feminist community organization whose mission is to help women help themselves, by offering popular education, support, and mutual aid services. Nukleo took charge of the Centre's digital communications for a period of six months, including social media management (Facebook, LinkedIn, Instagram), newsletter creation and distribution, management of targeted advertising campaigns to reach the women who most need the services, website updates, and coordination of a professional photo shoot to renew the organization's image bank."
        },
        images: []
      },
      {
        slug: "filles-de-louest",
        key: "FillesOuest",
        title: "Filles de l'Ouest",
        client: "Filles de l'Ouest",
        year: "2025",
        category: "Campagnes",
        services: "Direction artistique, Conception visuelle",
        description: {
          fr: "Direction artistique et conception visuelle pour Filles de l'Ouest.",
          en: "Artistic direction and visual design for Filles de l'Ouest."
        },
        images: []
      },
      {
        slug: "arise",
        key: "Arise",
        title: "Arise",
        client: "Arise",
        year: "2025",
        category: "Plateforme",
        services: "Conception UI/UX, D\xE9veloppement, Plateforme d'\xE9valuation",
        description: {
          fr: "Arise Human Capital cherche \xE0 lancer une plateforme SaaS B2B innovante : l'outil d'\xE9valuation holistique du leadership. Con\xE7ue pour r\xE9volutionner la fa\xE7on dont les organisations d\xE9veloppent leurs leaders, la plateforme int\xE8gre quatre modules d'\xE9valuation compl\xE9mentaires \u2014 MBTI, TKI, 360\xB0 et Wellness \u2014 pour offrir une vision compl\xE8te du potentiel de chaque individu. Nukleo a con\xE7u et d\xE9velopp\xE9 le MVP de cette plateforme, en cr\xE9ant une interface \xE9l\xE9gante, intuitive et s\xE9curis\xE9e qui guide les leaders \xE0 travers leur parcours d'\xE9valuation. La plateforme g\xE9n\xE8re automatiquement des rapports PDF personnalis\xE9s, offre un tableau de bord administrateur complet et est construite pour \xE9voluer vers des fonctionnalit\xE9s d'intelligence artificielle.",
          en: "Arise Human Capital is looking to launch an innovative B2B SaaS platform: the Holistic Leadership Assessment tool. Designed to revolutionize how organizations develop their leaders, the platform integrates four complementary assessment modules \u2014 MBTI, TKI, 360\xB0, and Wellness \u2014 to offer a complete view of each individual's potential. Nukleo designed and developed the MVP of this platform, creating an elegant, intuitive, and secure interface that guides leaders through their assessment journey. The platform automatically generates personalized PDF reports, offers a comprehensive admin dashboard, and is built to evolve toward artificial intelligence features."
        },
        images: []
      }
    ];
  }
});

// server/enable-projects-page.ts
var enable_projects_page_exports = {};
__export(enable_projects_page_exports, {
  enableProjectsPage: () => enableProjectsPage
});
import { eq as eq10 } from "drizzle-orm";
async function enableProjectsPage() {
  try {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }
    const paths = ["/projects", "/fr/projects"];
    for (const path7 of paths) {
      const existing = await db.select().from(pageVisibility).where(eq10(pageVisibility.path, path7)).limit(1);
      if (existing.length > 0) {
        await db.update(pageVisibility).set({
          isVisible: true,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq10(pageVisibility.path, path7));
        console.log(`\u2705 Updated ${path7} to visible`);
      } else {
        await db.insert(pageVisibility).values({
          path: path7,
          isVisible: true,
          description: path7 === "/projects" ? "Page des projets" : "Page des projets en fran\xE7ais"
        });
        console.log(`\u2705 Created ${path7} as visible`);
      }
    }
    console.log("\n\u2705 Projects pages enabled successfully!");
  } catch (error) {
    console.error("\u274C Error enabling projects pages:", error);
    throw error;
  }
}
var init_enable_projects_page = __esm({
  "server/enable-projects-page.ts"() {
    "use strict";
    init_db();
    init_schema();
    if (import.meta.url === `file://${process.argv[1]}`) {
      enableProjectsPage().then(() => process.exit(0)).catch((error) => {
        console.error(error);
        process.exit(1);
      });
    }
  }
});

// server/storage.ts
var storage_exports = {};
__export(storage_exports, {
  storageGet: () => storageGet,
  storagePut: () => storagePut
});
function getStorageConfig() {
  const baseUrl = ENV.forgeApiUrl;
  const apiKey = ENV.forgeApiKey;
  if (!baseUrl || !apiKey) {
    throw new Error(
      "Storage proxy credentials missing: set BUILT_IN_FORGE_API_URL and BUILT_IN_FORGE_API_KEY"
    );
  }
  return { baseUrl: baseUrl.replace(/\/+$/, ""), apiKey };
}
function buildUploadUrl(baseUrl, relKey) {
  const url = new URL("v1/storage/upload", ensureTrailingSlash(baseUrl));
  url.searchParams.set("path", normalizeKey(relKey));
  return url;
}
async function buildDownloadUrl(baseUrl, relKey, apiKey) {
  const downloadApiUrl = new URL(
    "v1/storage/downloadUrl",
    ensureTrailingSlash(baseUrl)
  );
  downloadApiUrl.searchParams.set("path", normalizeKey(relKey));
  const response = await fetch(downloadApiUrl, {
    method: "GET",
    headers: buildAuthHeaders(apiKey)
  });
  return (await response.json()).url;
}
function ensureTrailingSlash(value) {
  return value.endsWith("/") ? value : `${value}/`;
}
function normalizeKey(relKey) {
  return relKey.replace(/^\/+/, "");
}
function toFormData(data, contentType, fileName) {
  const blob = typeof data === "string" ? new Blob([data], { type: contentType }) : new Blob([data], { type: contentType });
  const form = new FormData();
  form.append("file", blob, fileName || "file");
  return form;
}
function buildAuthHeaders(apiKey) {
  return { Authorization: `Bearer ${apiKey}` };
}
async function storagePut(relKey, data, contentType = "application/octet-stream") {
  const { baseUrl, apiKey } = getStorageConfig();
  const key = normalizeKey(relKey);
  const uploadUrl = buildUploadUrl(baseUrl, key);
  const formData = toFormData(data, contentType, key.split("/").pop() ?? key);
  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: buildAuthHeaders(apiKey),
    body: formData
  });
  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(
      `Storage upload failed (${response.status} ${response.statusText}): ${message}`
    );
  }
  const url = (await response.json()).url;
  return { key, url };
}
async function storageGet(relKey) {
  const { baseUrl, apiKey } = getStorageConfig();
  const key = normalizeKey(relKey);
  return {
    key,
    url: await buildDownloadUrl(baseUrl, key, apiKey)
  };
}
var init_storage = __esm({
  "server/storage.ts"() {
    "use strict";
    init_env();
  }
});

// server/seed-loaders.ts
var seed_loaders_exports = {};
__export(seed_loaders_exports, {
  seedLoaders: () => seedLoaders
});
async function seedLoaders() {
  try {
    console.log("\u2139\uFE0F seedLoaders: Test Loader supprim\xE9 d\xE9finitivement");
  } catch (error) {
    console.error("\u274C Erreur dans seedLoaders:", error);
    throw error;
  }
}
var init_seed_loaders = __esm({
  "server/seed-loaders.ts"() {
    "use strict";
  }
});

// server/loader-text-utils.ts
var generateAlternatingText;
var init_loader_text_utils = __esm({
  "server/loader-text-utils.ts"() {
    "use strict";
    generateAlternatingText = (textClass, textStyles, bottomPosition = "25%") => {
      return `
    <div class="${textClass}">
      <span class="text-item" data-text="Choose Intelligence">Choose Intelligence</span>
      <span class="text-item" data-text="Choose Creativity">Choose Creativity</span>
      <span class="text-item" data-text="Choose The Future">Choose The Future</span>
    </div>
    <style>
      .${textClass} {
        position: fixed;
        bottom: ${bottomPosition};
        left: 50%;
        transform: translateX(-50%);
        z-index: 10000;
        pointer-events: none;
        height: 1.5em;
        overflow: hidden;
      }
      .${textClass} .text-item {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        animation: text-cycle-${textClass} 6s ease-in-out infinite;
        white-space: nowrap;
        ${textStyles}
      }
      .${textClass} .text-item:nth-child(1) {
        animation-delay: 0s;
      }
      .${textClass} .text-item:nth-child(2) {
        animation-delay: 2s;
      }
      .${textClass} .text-item:nth-child(3) {
        animation-delay: 4s;
      }
      @keyframes text-cycle-${textClass} {
        0%, 30% {
          opacity: 0;
          transform: translateX(-50%) translateY(20px);
        }
        5%, 25% {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        35%, 100% {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
      }
    </style>
  `;
    };
  }
});

// server/seed-creative-loaders.ts
var seed_creative_loaders_exports = {};
__export(seed_creative_loaders_exports, {
  seedCreativeLoaders: () => seedCreativeLoaders
});
async function seedCreativeLoaders() {
  try {
    const existingLoaders = await Promise.resolve().then(() => (init_loaders(), loaders_exports)).then(
      (m) => m.getAllLoaders()
    );
    const creativeLoaders = [
      {
        name: "Cosmic Vortex",
        description: "Particules cosmiques avec effet de vortex et rotation infinie",
        cssCode: loader1,
        isActive: false,
        displayOrder: 1
      },
      {
        name: "Neon Glitch",
        description: "Effet de glitch n\xE9on avec scan lines et anneaux expansifs",
        cssCode: loader2,
        isActive: false,
        displayOrder: 2
      },
      {
        name: "Geometric Morph",
        description: "Formes g\xE9om\xE9triques qui se transforment et se morphisent",
        cssCode: loader3,
        isActive: false,
        displayOrder: 3
      },
      {
        name: "Wave Vibration",
        description: "Ondes et vibrations avec particules flottantes",
        cssCode: loader4,
        isActive: false,
        displayOrder: 4
      },
      {
        name: "Particle Explosion",
        description: "Explosion de particules color\xE9es avec effet de feu",
        cssCode: loader5,
        isActive: false,
        displayOrder: 5
      },
      {
        name: "Geometric Lines",
        description: "Lignes g\xE9om\xE9triques modernes avec effet de scan \xE9l\xE9gant",
        cssCode: loader6,
        isActive: false,
        displayOrder: 6
      },
      {
        name: "Floating Particles",
        description: "Particules \xE9l\xE9gantes flottantes avec mouvement fluide",
        cssCode: loader7,
        isActive: false,
        displayOrder: 7
      },
      {
        name: "Light Rays",
        description: "Rayons de lumi\xE8re \xE9l\xE9gants avec rotation douce",
        cssCode: loader8,
        isActive: false,
        displayOrder: 8
      },
      {
        name: "Minimalist Abstract",
        description: "Formes abstraites minimalistes avec style \xE9pur\xE9",
        cssCode: loader9,
        isActive: false,
        displayOrder: 9
      }
    ];
    let created = 0;
    for (const loader of creativeLoaders) {
      const exists = existingLoaders.some((l) => l.name === loader.name);
      if (!exists) {
        await createLoader(loader);
        created++;
        console.log(`\u2705 Loader "${loader.name}" cr\xE9\xE9 avec succ\xE8s`);
      } else {
        console.log(`\u2139\uFE0F Loader "${loader.name}" existe d\xE9j\xE0`);
      }
    }
    console.log(`\u2705 ${created} nouveaux loaders cr\xE9atifs cr\xE9\xE9s`);
    return { success: true, created };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    const errorCode = error instanceof Error && "code" in error ? error.code : null;
    if (errorCode === "ECONNREFUSED") {
      console.error("\u274C Erreur lors de la cr\xE9ation des loaders cr\xE9atifs: Database connection refused");
      throw new Error("Database connection refused");
    }
    console.error(`\u274C Erreur lors de la cr\xE9ation des loaders cr\xE9atifs: ${errorMsg}`);
    throw error;
  }
}
var loader1, loader2, loader3, loader4, loader5, loader6, loader7, loader8, loader9;
var init_seed_creative_loaders = __esm({
  "server/seed-creative-loaders.ts"() {
    "use strict";
    init_loaders();
    init_loader_text_utils();
    loader1 = `<div class="nukleo-loader-cosmic">
  <style>
    .nukleo-loader-cosmic {
      position: fixed;
      inset: 0;
      background: radial-gradient(ellipse at center, #1a0b2e 0%, #000000 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-cosmic::before {
      content: '';
      position: absolute;
      inset: -50%;
      background: conic-gradient(
        from 0deg,
        transparent 0deg,
        rgba(139, 92, 236, 0.3) 90deg,
        transparent 180deg,
        rgba(236, 72, 153, 0.3) 270deg,
        transparent 360deg
      );
      animation: cosmic-rotate 8s linear infinite;
    }
    
    @keyframes cosmic-rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .nukleo-loader-cosmic .logo-container {
      position: relative;
      z-index: 10;
      animation: cosmic-pulse 2s ease-in-out infinite;
    }
    
    @keyframes cosmic-pulse {
      0%, 100% { 
        transform: scale(1) rotate(0deg);
        filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.8)) drop-shadow(0 0 60px rgba(236, 72, 153, 0.6));
      }
      50% { 
        transform: scale(1.1) rotate(5deg);
        filter: drop-shadow(0 0 50px rgba(139, 92, 246, 1)) drop-shadow(0 0 100px rgba(236, 72, 153, 0.8)) drop-shadow(0 0 150px rgba(34, 211, 238, 0.6));
      }
    }
    
    .nukleo-loader-cosmic .logo-container img {
      width: 220px;
      height: auto;
      animation: logo-glow 3s ease-in-out infinite;
    }
    
    @keyframes logo-glow {
      0%, 100% { filter: brightness(1) drop-shadow(0 0 20px rgba(139, 92, 246, 0.6)); }
      50% { filter: brightness(1.3) drop-shadow(0 0 40px rgba(139, 92, 246, 1)) drop-shadow(0 0 80px rgba(236, 72, 153, 0.8)); }
    }
    
    .nukleo-loader-cosmic .particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-cosmic .particle {
      position: absolute;
      width: 6px;
      height: 6px;
      background: radial-gradient(circle, rgba(139, 92, 246, 1), transparent);
      border-radius: 50%;
      box-shadow: 0 0 15px rgba(139, 92, 246, 0.8);
      animation: particle-orbit 4s linear infinite;
    }
    
    @keyframes particle-orbit {
      from {
        transform: rotate(0deg) translateX(150px) rotate(0deg);
        opacity: 0.3;
      }
      50% {
        opacity: 1;
      }
      to {
        transform: rotate(360deg) translateX(150px) rotate(-360deg);
        opacity: 0.3;
      }
    }
    
    .nukleo-loader-cosmic .text {
      color: rgba(255, 255, 255, 0.95);
      font-family: 'Aktiv Grotesk', sans-serif;
      font-size: 16px;
      letter-spacing: 0.5em;
      text-transform: uppercase;
      font-weight: 300;
      text-shadow: 0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(236, 72, 153, 0.6);
    }
  </style>
  
  <div class="particles">
    ${Array.from({ length: 12 }, (_, i) => `
      <div class="particle" style="
        animation-delay: ${i * 0.33}s;
        animation-duration: ${4 + i % 3 * 0.5}s;
      "></div>
    `).join("")}
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText("nukleo-loader-cosmic-text", "color: rgba(255, 255, 255, 0.95); font-family: 'Aktiv Grotesk', sans-serif; font-size: 16px; letter-spacing: 0.5em; text-transform: uppercase; font-weight: 300; text-shadow: 0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(236, 72, 153, 0.6);", "25%")}
</div>`;
    loader2 = `<div class="nukleo-loader-glitch">
  <style>
    .nukleo-loader-glitch {
      position: fixed;
      inset: 0;
      background: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-glitch::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 255, 255, 0.03) 2px,
          rgba(0, 255, 255, 0.03) 4px
        );
      animation: scan-line 0.1s linear infinite;
    }
    
    @keyframes scan-line {
      from { transform: translateY(0); }
      to { transform: translateY(4px); }
    }
    
    .nukleo-loader-glitch .logo-wrapper {
      position: relative;
      z-index: 10;
    }
    
    .nukleo-loader-glitch .logo-wrapper::before,
    .nukleo-loader-glitch .logo-wrapper::after {
      content: '';
      position: absolute;
      inset: -30px;
      border: 2px solid;
      border-radius: 50%;
      animation: ring-expand 2s ease-out infinite;
    }
    
    .nukleo-loader-glitch .logo-wrapper::before {
      border-color: rgba(0, 255, 255, 0.6);
      animation-delay: 0s;
    }
    
    .nukleo-loader-glitch .logo-wrapper::after {
      border-color: rgba(255, 0, 255, 0.6);
      animation-delay: 0.5s;
    }
    
    @keyframes ring-expand {
      0% {
        transform: scale(0.5);
        opacity: 1;
      }
      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }
    
    .nukleo-loader-glitch .logo {
      position: relative;
      width: 250px;
      height: auto;
      filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 40px rgba(255, 0, 255, 0.6));
      animation: glitch-effect 3s infinite;
    }
    
    @keyframes glitch-effect {
      0%, 90%, 100% {
        transform: translate(0);
        filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 40px rgba(255, 0, 255, 0.6));
      }
      91% {
        transform: translate(-3px, 3px);
        filter: drop-shadow(0 0 30px rgba(0, 255, 255, 1)) drop-shadow(0 0 60px rgba(255, 0, 255, 0.8));
      }
      92% {
        transform: translate(3px, -3px);
        filter: drop-shadow(0 0 40px rgba(255, 0, 255, 1)) drop-shadow(0 0 80px rgba(0, 255, 255, 0.8));
      }
      93% {
        transform: translate(-2px, 2px);
        filter: drop-shadow(0 0 50px rgba(0, 255, 255, 1)) drop-shadow(0 0 100px rgba(255, 0, 255, 1));
      }
    }
    
    .nukleo-loader-glitch .text {
      color: rgba(0, 255, 255, 0.9);
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      letter-spacing: 0.4em;
      text-transform: uppercase;
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(255, 0, 255, 0.6);
    }
  </style>
  
  <div class="logo-wrapper">
    <img class="logo" src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText("nukleo-loader-glitch-text", "color: rgba(0, 255, 255, 0.9); font-family: 'JetBrains Mono', monospace; font-size: 14px; letter-spacing: 0.4em; text-transform: uppercase; text-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(255, 0, 255, 0.6);", "30%")}
</div>`;
    loader3 = `<div class="nukleo-loader-morph">
  <style>
    .nukleo-loader-morph {
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-morph .shapes {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .nukleo-loader-morph .shape {
      position: absolute;
      border: 3px solid;
      animation: morph-shape 4s ease-in-out infinite;
    }
    
    .nukleo-loader-morph .shape-1 {
      width: 300px;
      height: 300px;
      border-color: rgba(139, 92, 246, 0.6);
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      animation-delay: 0s;
    }
    
    .nukleo-loader-morph .shape-2 {
      width: 250px;
      height: 250px;
      border-color: rgba(236, 72, 153, 0.6);
      clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
      animation-delay: 0.5s;
    }
    
    .nukleo-loader-morph .shape-3 {
      width: 200px;
      height: 200px;
      border-color: rgba(34, 211, 238, 0.6);
      border-radius: 50%;
      animation-delay: 1s;
    }
    
    @keyframes morph-shape {
      0%, 100% {
        transform: rotate(0deg) scale(1);
        opacity: 0.6;
        filter: blur(0px);
      }
      25% {
        transform: rotate(90deg) scale(1.1);
        opacity: 0.8;
        filter: blur(1px);
      }
      50% {
        transform: rotate(180deg) scale(0.9);
        opacity: 1;
        filter: blur(0px);
      }
      75% {
        transform: rotate(270deg) scale(1.05);
        opacity: 0.8;
        filter: blur(1px);
      }
    }
    
    .nukleo-loader-morph .logo-container {
      position: relative;
      z-index: 10;
      animation: logo-morph 3s ease-in-out infinite;
    }
    
    @keyframes logo-morph {
      0%, 100% {
        transform: scale(1) rotate(0deg);
        filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.6));
      }
      33% {
        transform: scale(1.05) rotate(-5deg);
        filter: drop-shadow(0 0 40px rgba(236, 72, 153, 0.8));
      }
      66% {
        transform: scale(1.05) rotate(5deg);
        filter: drop-shadow(0 0 50px rgba(34, 211, 238, 0.8));
      }
    }
    
    .nukleo-loader-morph .logo-container img {
      width: 200px;
      height: auto;
    }
    
    .nukleo-loader-morph .text {
      color: rgba(255, 255, 255, 0.9);
      font-family: 'Aktiv Grotesk', sans-serif;
      font-size: 15px;
      letter-spacing: 0.4em;
      text-transform: uppercase;
      text-shadow: 0 0 20px rgba(139, 92, 246, 0.8);
    }
  </style>
  
  <div class="shapes">
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText("nukleo-loader-morph-text", "color: rgba(255, 255, 255, 0.9); font-family: 'Aktiv Grotesk', sans-serif; font-size: 15px; letter-spacing: 0.4em; text-transform: uppercase; text-shadow: 0 0 20px rgba(139, 92, 246, 0.8);", "28%")}
</div>`;
    loader4 = `<div class="nukleo-loader-waves">
  <style>
    .nukleo-loader-waves {
      position: fixed;
      inset: 0;
      background: linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-waves .wave {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle at center,
        transparent 0%,
        rgba(139, 92, 246, 0.1) 30%,
        transparent 60%
      );
      animation: wave-expand 3s ease-out infinite;
    }
    
    .nukleo-loader-waves .wave-1 {
      animation-delay: 0s;
    }
    
    .nukleo-loader-waves .wave-2 {
      animation-delay: 1s;
    }
    
    .nukleo-loader-waves .wave-3 {
      animation-delay: 2s;
    }
    
    @keyframes wave-expand {
      0% {
        transform: scale(0.5);
        opacity: 0.8;
      }
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }
    
    .nukleo-loader-waves .logo-container {
      position: relative;
      z-index: 10;
      animation: logo-vibrate 2s ease-in-out infinite;
    }
    
    @keyframes logo-vibrate {
      0%, 100% {
        transform: translate(0, 0) scale(1);
        filter: drop-shadow(0 0 25px rgba(139, 92, 246, 0.7));
      }
      25% {
        transform: translate(2px, -2px) scale(1.02);
        filter: drop-shadow(0 0 35px rgba(139, 92, 246, 0.9));
      }
      50% {
        transform: translate(-2px, 2px) scale(1.02);
        filter: drop-shadow(0 0 45px rgba(236, 72, 153, 0.9));
      }
      75% {
        transform: translate(2px, 2px) scale(1.02);
        filter: drop-shadow(0 0 35px rgba(34, 211, 238, 0.9));
      }
    }
    
    .nukleo-loader-waves .logo-container img {
      width: 220px;
      height: auto;
    }
    
    .nukleo-loader-waves .particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-waves .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(139, 92, 246, 0.8);
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(139, 92, 246, 0.6);
      animation: particle-float 4s ease-in-out infinite;
    }
    
    @keyframes particle-float {
      0%, 100% {
        transform: translate(0, 0) scale(1);
        opacity: 0.3;
      }
      50% {
        transform: translate(30px, -40px) scale(1.5);
        opacity: 1;
      }
    }
    
    .nukleo-loader-waves .text {
      color: rgba(255, 255, 255, 0.9);
      font-family: 'Aktiv Grotesk', sans-serif;
      font-size: 14px;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      text-shadow: 0 0 15px rgba(139, 92, 246, 0.7);
    }
  </style>
  
  <div class="wave wave-1"></div>
  <div class="wave wave-2"></div>
  <div class="wave wave-3"></div>
  
  <div class="particles">
    ${Array.from({ length: 15 }, (_, i) => {
      const positions = [
        [20, 25],
        [45, 30],
        [70, 20],
        [30, 50],
        [60, 60],
        [80, 45],
        [25, 70],
        [75, 25],
        [15, 55],
        [85, 65],
        [40, 15],
        [55, 75],
        [20, 40],
        [65, 50],
        [35, 80]
      ];
      const [left, top] = positions[i] || [50, 50];
      return `
        <div class="particle" style="
          left: ${left}%;
          top: ${top}%;
          animation-delay: ${i * 0.2}s;
          animation-duration: ${3 + i % 3 * 0.5}s;
        "></div>
      `;
    }).join("")}
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText("nukleo-loader-waves-text", "color: rgba(255, 255, 255, 0.9); font-family: 'Aktiv Grotesk', sans-serif; font-size: 14px; letter-spacing: 0.35em; text-transform: uppercase; text-shadow: 0 0 15px rgba(139, 92, 246, 0.7);", "30%")}
</div>`;
    loader5 = `<div class="nukleo-loader-explosion">
  <style>
    .nukleo-loader-explosion {
      position: fixed;
      inset: 0;
      background: radial-gradient(ellipse at center, #1a0b2e 0%, #000000 70%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-explosion::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle at 50% 50%,
        rgba(139, 92, 246, 0.2) 0%,
        rgba(236, 72, 153, 0.15) 30%,
        transparent 60%
      );
      animation: explosion-pulse 2s ease-in-out infinite;
    }
    
    @keyframes explosion-pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 0.5;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.8;
      }
    }
    
    .nukleo-loader-explosion .logo-container {
      position: relative;
      z-index: 10;
      animation: logo-explode 2.5s ease-in-out infinite;
    }
    
    @keyframes logo-explode {
      0%, 100% {
        transform: scale(1) rotate(0deg);
        filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.8)) drop-shadow(0 0 60px rgba(236, 72, 153, 0.6));
      }
      25% {
        transform: scale(1.1) rotate(-3deg);
        filter: drop-shadow(0 0 50px rgba(139, 92, 246, 1)) drop-shadow(0 0 100px rgba(236, 72, 153, 0.8));
      }
      50% {
        transform: scale(1.15) rotate(0deg);
        filter: drop-shadow(0 0 60px rgba(139, 92, 246, 1)) drop-shadow(0 0 120px rgba(236, 72, 153, 1)) drop-shadow(0 0 180px rgba(34, 211, 238, 0.8));
      }
      75% {
        transform: scale(1.1) rotate(3deg);
        filter: drop-shadow(0 0 50px rgba(139, 92, 246, 1)) drop-shadow(0 0 100px rgba(236, 72, 153, 0.8));
      }
    }
    
    .nukleo-loader-explosion .logo-container img {
      width: 240px;
      height: auto;
    }
    
    .nukleo-loader-explosion .particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-explosion .particle {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      animation: particle-explode 3s ease-out infinite;
    }
    
    .nukleo-loader-explosion .particle-1 {
      background: radial-gradient(circle, rgba(139, 92, 246, 1), transparent);
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.8);
    }
    
    .nukleo-loader-explosion .particle-2 {
      background: radial-gradient(circle, rgba(236, 72, 153, 1), transparent);
      box-shadow: 0 0 20px rgba(236, 72, 153, 0.8);
    }
    
    .nukleo-loader-explosion .particle-3 {
      background: radial-gradient(circle, rgba(34, 211, 238, 1), transparent);
      box-shadow: 0 0 20px rgba(34, 211, 238, 0.8);
    }
    
    @keyframes particle-explode {
      0% {
        transform: translate(0, 0) scale(0);
        opacity: 1;
      }
      50% {
        opacity: 1;
      }
      100% {
        transform: translate(var(--tx), var(--ty)) scale(1);
        opacity: 0;
      }
    }
    
    .nukleo-loader-explosion .text {
      color: rgba(255, 255, 255, 0.95);
      font-family: 'Aktiv Grotesk', sans-serif;
      font-size: 16px;
      letter-spacing: 0.45em;
      text-transform: uppercase;
      font-weight: 300;
      text-shadow: 
        0 0 10px rgba(139, 92, 246, 0.8),
        0 0 20px rgba(236, 72, 153, 0.6),
        0 0 30px rgba(34, 211, 238, 0.4);
    }
  </style>
  
  <div class="particles">
    ${(() => {
      const particles = [];
      for (let i = 0; i < 20; i++) {
        const angle = i / 20 * Math.PI * 2;
        const distance = 120 + Math.random() * 60;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const type = i % 3 + 1;
        particles.push(`
          <div class="particle particle-${type}" style="
            --tx: ${tx}px;
            --ty: ${ty}px;
            animation-delay: ${i * 0.1}s;
            animation-duration: ${2.5 + Math.random() * 1}s;
          "></div>
        `);
      }
      return particles.join("");
    })()}
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText("nukleo-loader-explosion-text", "color: rgba(255, 255, 255, 0.95); font-family: 'Aktiv Grotesk', sans-serif; font-size: 16px; letter-spacing: 0.45em; text-transform: uppercase; font-weight: 300; text-shadow: 0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(236, 72, 153, 0.6), 0 0 30px rgba(34, 211, 238, 0.4);", "28%")}
</div>`;
    loader6 = `<div class="nukleo-loader-geometric">
  <style>
    .nukleo-loader-geometric {
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #1a0b2e 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-geometric::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.1) 50%, transparent 70%),
        linear-gradient(-45deg, transparent 30%, rgba(236, 72, 153, 0.08) 50%, transparent 70%);
      animation: geometric-scan 4s ease-in-out infinite;
    }
    
    @keyframes geometric-scan {
      0%, 100% { opacity: 0.3; transform: translateX(-100%); }
      50% { opacity: 0.6; transform: translateX(100%); }
    }
    
    .nukleo-loader-geometric .lines {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-geometric .line {
      position: absolute;
      background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.6), transparent);
      height: 1px;
      animation: line-sweep 3s ease-in-out infinite;
    }
    
    .nukleo-loader-geometric .line-horizontal {
      width: 100%;
      left: 0;
    }
    
    .nukleo-loader-geometric .line-vertical {
      width: 1px;
      height: 100%;
      background: linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.6), transparent);
    }
    
    @keyframes line-sweep {
      0%, 100% { opacity: 0; transform: scaleX(0); }
      50% { opacity: 1; transform: scaleX(1); }
    }
    
    .nukleo-loader-geometric .logo-container {
      position: relative;
      z-index: 10;
      animation: geometric-pulse 2.5s ease-in-out infinite;
    }
    
    @keyframes geometric-pulse {
      0%, 100% { 
        transform: scale(1);
        filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.6));
      }
      50% { 
        transform: scale(1.05);
        filter: drop-shadow(0 0 50px rgba(139, 92, 246, 0.9)) drop-shadow(0 0 80px rgba(236, 72, 153, 0.6));
      }
    }
    
    .nukleo-loader-geometric .logo-container img {
      width: 200px;
      height: auto;
    }
  </style>
  
  <div class="lines">
    ${Array.from({ length: 5 }, (_, i) => `
      <div class="line line-horizontal" style="top: ${20 + i * 15}%; animation-delay: ${i * 0.3}s;"></div>
      <div class="line line-vertical" style="left: ${20 + i * 15}%; animation-delay: ${i * 0.3 + 0.15}s;"></div>
    `).join("")}
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText("nukleo-loader-geometric-text", "color: rgba(255, 255, 255, 0.95); font-family: 'Aktiv Grotesk', sans-serif; font-size: 14px; letter-spacing: 0.4em; text-transform: uppercase; font-weight: 300; text-shadow: 0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(236, 72, 153, 0.6);", "28%")}
</div>`;
    loader7 = `<div class="nukleo-loader-floating">
  <style>
    .nukleo-loader-floating {
      position: fixed;
      inset: 0;
      background: radial-gradient(ellipse at center, #1a0b2e 0%, #0f0519 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-floating::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 70% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%);
      animation: floating-glow 6s ease-in-out infinite;
    }
    
    @keyframes floating-glow {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.1); }
    }
    
    .nukleo-loader-floating .particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-floating .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: radial-gradient(circle, rgba(139, 92, 246, 1), rgba(139, 92, 246, 0));
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(139, 92, 246, 0.8);
      animation: float 8s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0) translateX(0) scale(1);
        opacity: 0.4;
      }
      25% {
        transform: translateY(-30px) translateX(20px) scale(1.2);
        opacity: 0.8;
      }
      50% {
        transform: translateY(-60px) translateX(-10px) scale(1);
        opacity: 1;
      }
      75% {
        transform: translateY(-30px) translateX(-20px) scale(1.2);
        opacity: 0.8;
      }
    }
    
    .nukleo-loader-floating .logo-container {
      position: relative;
      z-index: 10;
      animation: floating-logo 3s ease-in-out infinite;
    }
    
    @keyframes floating-logo {
      0%, 100% { 
        transform: translateY(0) scale(1);
        filter: drop-shadow(0 0 25px rgba(139, 92, 246, 0.7));
      }
      50% { 
        transform: translateY(-10px) scale(1.03);
        filter: drop-shadow(0 0 40px rgba(139, 92, 246, 0.9)) drop-shadow(0 0 60px rgba(236, 72, 153, 0.5));
      }
    }
    
    .nukleo-loader-floating .logo-container img {
      width: 200px;
      height: auto;
    }
  </style>
  
  <div class="particles">
    ${Array.from({ length: 15 }, (_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 8;
      return `<div class="particle" style="left: ${left}%; top: ${top}%; animation-delay: ${delay}s;"></div>`;
    }).join("")}
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText("nukleo-loader-floating-text", "color: rgba(255, 255, 255, 0.95); font-family: 'Aktiv Grotesk', sans-serif; font-size: 14px; letter-spacing: 0.4em; text-transform: uppercase; font-weight: 300; text-shadow: 0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(236, 72, 153, 0.6);", "28%")}
</div>`;
    loader8 = `<div class="nukleo-loader-rays">
  <style>
    .nukleo-loader-rays {
      position: fixed;
      inset: 0;
      background: radial-gradient(ellipse at center, #1a0b2e 0%, #000000 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-rays::before {
      content: '';
      position: absolute;
      inset: -50%;
      background: conic-gradient(
        from 0deg,
        transparent 0deg,
        rgba(139, 92, 246, 0.15) 45deg,
        rgba(236, 72, 153, 0.2) 90deg,
        rgba(139, 92, 246, 0.15) 135deg,
        transparent 180deg,
        rgba(139, 92, 246, 0.15) 225deg,
        rgba(236, 72, 153, 0.2) 270deg,
        rgba(139, 92, 246, 0.15) 315deg,
        transparent 360deg
      );
      animation: rays-rotate 12s linear infinite;
    }
    
    @keyframes rays-rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .nukleo-loader-rays .rays {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-rays .ray {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 2px;
      height: 40%;
      background: linear-gradient(180deg, rgba(139, 92, 246, 0.8), transparent);
      transform-origin: top center;
      animation: ray-pulse 2s ease-in-out infinite;
    }
    
    @keyframes ray-pulse {
      0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
      50% { opacity: 0.8; transform: scaleY(1); }
    }
    
    .nukleo-loader-rays .logo-container {
      position: relative;
      z-index: 10;
      animation: rays-logo 2.5s ease-in-out infinite;
    }
    
    @keyframes rays-logo {
      0%, 100% { 
        transform: scale(1);
        filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.7)) drop-shadow(0 0 50px rgba(236, 72, 153, 0.5));
      }
      50% { 
        transform: scale(1.05);
        filter: drop-shadow(0 0 50px rgba(139, 92, 246, 1)) drop-shadow(0 0 80px rgba(236, 72, 153, 0.8));
      }
    }
    
    .nukleo-loader-rays .logo-container img {
      width: 200px;
      height: auto;
    }
  </style>
  
  <div class="rays">
    ${Array.from({ length: 12 }, (_, i) => {
      const angle = i / 12 * 360;
      return `<div class="ray" style="transform: rotate(${angle}deg) translateY(-50%); animation-delay: ${i * 0.15}s;"></div>`;
    }).join("")}
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText("nukleo-loader-rays-text", "color: rgba(255, 255, 255, 0.95); font-family: 'Aktiv Grotesk', sans-serif; font-size: 14px; letter-spacing: 0.4em; text-transform: uppercase; font-weight: 300; text-shadow: 0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(236, 72, 153, 0.6);", "28%")}
</div>`;
    loader9 = `<div class="nukleo-loader-minimalist">
  <style>
    .nukleo-loader-minimalist {
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, #0f0519 0%, #1a0b2e 50%, #0f0519 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-minimalist::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
      animation: minimalist-pulse 4s ease-in-out infinite;
    }
    
    @keyframes minimalist-pulse {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.2); }
    }
    
    .nukleo-loader-minimalist .shapes {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-minimalist .shape {
      position: absolute;
      border: 1px solid rgba(139, 92, 246, 0.4);
      animation: shape-rotate 6s linear infinite;
    }
    
    .nukleo-loader-minimalist .shape-circle {
      border-radius: 50%;
      border: 1px solid rgba(139, 92, 246, 0.3);
    }
    
    .nukleo-loader-minimalist .shape-square {
      border: 1px solid rgba(236, 72, 153, 0.3);
    }
    
    @keyframes shape-rotate {
      from { transform: rotate(0deg) scale(1); opacity: 0.3; }
      50% { transform: rotate(180deg) scale(1.1); opacity: 0.6; }
      to { transform: rotate(360deg) scale(1); opacity: 0.3; }
    }
    
    .nukleo-loader-minimalist .logo-container {
      position: relative;
      z-index: 10;
      animation: minimalist-logo 3s ease-in-out infinite;
    }
    
    @keyframes minimalist-logo {
      0%, 100% { 
        transform: scale(1);
        filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.5));
      }
      50% { 
        transform: scale(1.02);
        filter: drop-shadow(0 0 35px rgba(139, 92, 246, 0.8)) drop-shadow(0 0 50px rgba(236, 72, 153, 0.4));
      }
    }
    
    .nukleo-loader-minimalist .logo-container img {
      width: 200px;
      height: auto;
    }
  </style>
  
  <div class="shapes">
    ${Array.from({ length: 6 }, (_, i) => {
      const size = 80 + i * 40;
      const left = 50 - size / 2 / 10;
      const top = 50 - size / 2 / 10;
      const type = i % 2 === 0 ? "shape-circle" : "shape-square";
      const delay = i * 0.5;
      return `<div class="shape ${type}" style="width: ${size}px; height: ${size}px; left: ${left}%; top: ${top}%; animation-delay: ${delay}s;"></div>`;
    }).join("")}
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText("nukleo-loader-minimalist-text", "color: rgba(255, 255, 255, 0.95); font-family: 'Aktiv Grotesk', sans-serif; font-size: 14px; letter-spacing: 0.4em; text-transform: uppercase; font-weight: 300; text-shadow: 0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(236, 72, 153, 0.6);", "28%")}
</div>`;
  }
});

// server/seed-crazy-loaders.ts
var seed_crazy_loaders_exports = {};
__export(seed_crazy_loaders_exports, {
  seedCrazyLoaders: () => seedCrazyLoaders
});
async function seedCrazyLoaders() {
  try {
    const existingLoaders = await Promise.resolve().then(() => (init_loaders(), loaders_exports)).then(
      (m) => m.getAllLoaders()
    );
    const crazyLoaders = [
      {
        name: "Ocean Depths",
        description: "Vagues profondes avec bulles et cr\xE9atures marines - ambiance oc\xE9anique immersive",
        cssCode: loaderOcean,
        isActive: false,
        displayOrder: 10
      },
      // AI Neural Network supprimé définitivement
      {
        name: "Funk Disco",
        description: "Disco avec couleurs vives, formes dansantes et effets psych\xE9d\xE9liques - style funk",
        cssCode: loaderFunk,
        isActive: false,
        displayOrder: 12
      },
      {
        name: "Basquiat Graffiti",
        description: "Style graffiti avec couleurs primaires, formes brutes et \xE9nergie brute - hommage Basquiat",
        cssCode: loaderBasquiat,
        isActive: false,
        displayOrder: 13
      },
      {
        name: "Elegant Minimalist",
        description: "Lignes fines et effets subtils avec style luxe - design minimaliste et \xE9l\xE9gant",
        cssCode: loaderElegant,
        isActive: false,
        displayOrder: 14
      },
      {
        name: "Luxe Sophisticated",
        description: "Effets de lumi\xE8re douce et transitions fluides - style sophistiqu\xE9 et raffin\xE9",
        cssCode: loaderLuxe,
        isActive: false,
        displayOrder: 15
      }
    ];
    let created = 0;
    for (const loader of crazyLoaders) {
      const exists = existingLoaders.some((l) => l.name === loader.name);
      if (!exists) {
        await createLoader(loader);
        created++;
        console.log(`\u2705 Loader "${loader.name}" cr\xE9\xE9 avec succ\xE8s`);
      } else {
        console.log(`\u2139\uFE0F Loader "${loader.name}" existe d\xE9j\xE0`);
      }
    }
    console.log(`\u2705 ${created} nouveaux loaders cr\xE9atifs cr\xE9\xE9s`);
    return { success: true, created };
  } catch (error) {
    console.error("\u274C Erreur lors de la cr\xE9ation des loaders cr\xE9atifs:", error);
    throw error;
  }
}
var loaderOcean, loaderFunk, loaderBasquiat, loaderElegant, loaderLuxe;
var init_seed_crazy_loaders = __esm({
  "server/seed-crazy-loaders.ts"() {
    "use strict";
    init_loaders();
    init_loader_text_utils();
    loaderOcean = `<div class="nukleo-loader-ocean">
  <style>
    .nukleo-loader-ocean {
      position: fixed;
      inset: 0;
      background: linear-gradient(180deg, #001122 0%, #003366 30%, #004488 60%, #001122 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-ocean::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 20% 50%, rgba(0, 191, 255, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(0, 150, 255, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 50% 20%, rgba(64, 224, 208, 0.15) 0%, transparent 50%);
      animation: ocean-shimmer 4s ease-in-out infinite;
    }
    
    @keyframes ocean-shimmer {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
    
    .nukleo-loader-ocean .waves {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 200px;
      overflow: hidden;
    }
    
    .nukleo-loader-ocean .wave {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 200%;
      height: 100px;
      background: linear-gradient(90deg, 
        transparent 0%,
        rgba(0, 191, 255, 0.4) 25%,
        rgba(64, 224, 208, 0.5) 50%,
        rgba(0, 191, 255, 0.4) 75%,
        transparent 100%
      );
      border-radius: 50% 50% 0 0;
      animation: wave-move 3s ease-in-out infinite;
    }
    
    .nukleo-loader-ocean .wave-1 {
      animation-delay: 0s;
      opacity: 0.7;
      height: 80px;
    }
    
    .nukleo-loader-ocean .wave-2 {
      animation-delay: 0.5s;
      opacity: 0.5;
      height: 100px;
    }
    
    .nukleo-loader-ocean .wave-3 {
      animation-delay: 1s;
      opacity: 0.3;
      height: 120px;
    }
    
    @keyframes wave-move {
      0% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(-10px); }
      100% { transform: translateX(-50%) translateY(0); }
    }
    
    .nukleo-loader-ocean .bubbles {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-ocean .bubble {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(0, 191, 255, 0.3));
      border: 2px solid rgba(255, 255, 255, 0.5);
      animation: bubble-rise 4s ease-in infinite;
    }
    
    @keyframes bubble-rise {
      0% {
        transform: translateY(100vh) scale(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) scale(1);
        opacity: 0;
      }
    }
    
    .nukleo-loader-ocean .logo-container {
      position: relative;
      z-index: 10;
      animation: logo-float 3s ease-in-out infinite;
      filter: drop-shadow(0 0 30px rgba(0, 191, 255, 0.6)) drop-shadow(0 0 60px rgba(64, 224, 208, 0.4));
    }
    
    @keyframes logo-float {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      25% {
        transform: translateY(-10px) rotate(1deg);
      }
      50% {
        transform: translateY(-5px) rotate(0deg);
      }
      75% {
        transform: translateY(-10px) rotate(-1deg);
      }
    }
    
    .nukleo-loader-ocean .logo-container img {
      width: 250px;
      height: auto;
      filter: drop-shadow(0 0 20px rgba(0, 191, 255, 0.8));
    }
    
    .nukleo-loader-ocean .text {
      color: rgba(255, 255, 255, 0.95);
      font-family: 'Aktiv Grotesk', sans-serif;
      font-size: 16px;
      letter-spacing: 0.5em;
      text-transform: uppercase;
      font-weight: 300;
      text-shadow: 
        0 0 20px rgba(0, 191, 255, 0.8),
        0 0 40px rgba(64, 224, 208, 0.6),
        0 2px 10px rgba(0, 0, 0, 0.5);
    }
  </style>
  
  <div class="waves">
    <div class="wave wave-1"></div>
    <div class="wave wave-2"></div>
    <div class="wave wave-3"></div>
  </div>
  
  <div class="bubbles">
    ${Array.from({ length: 20 }, (_, i) => {
      const size = 10 + Math.random() * 30;
      const left = Math.random() * 100;
      const delay = Math.random() * 4;
      const duration = 3 + Math.random() * 2;
      return `
        <div class="bubble" style="
          width: ${size}px;
          height: ${size}px;
          left: ${left}%;
          animation-delay: ${delay}s;
          animation-duration: ${duration}s;
        "></div>
      `;
    }).join("")}
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText("nukleo-loader-ocean-text", "color: rgba(255, 255, 255, 0.95); font-family: 'Aktiv Grotesk', sans-serif; font-size: 16px; letter-spacing: 0.5em; text-transform: uppercase; font-weight: 300; text-shadow: 0 0 20px rgba(0, 191, 255, 0.8), 0 0 40px rgba(64, 224, 208, 0.6), 0 2px 10px rgba(0, 0, 0, 0.5);", "25%")}
</div>`;
    loaderFunk = `<div class="nukleo-loader-funk">
  <style>
    .nukleo-loader-funk {
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, #ff006e 0%, #8338ec 25%, #3a86ff 50%, #ff006e 75%, #8338ec 100%);
      background-size: 400% 400%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
      animation: funk-gradient 3s ease infinite;
    }
    
    @keyframes funk-gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .nukleo-loader-funk::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 30% 30%, rgba(255, 0, 110, 0.4), transparent 50%),
        radial-gradient(circle at 70% 70%, rgba(131, 56, 236, 0.4), transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(58, 134, 255, 0.3), transparent 50%);
      animation: funk-shimmer 2s ease-in-out infinite;
    }
    
    @keyframes funk-shimmer {
      0%, 100% { opacity: 0.6; transform: rotate(0deg); }
      50% { opacity: 1; transform: rotate(180deg); }
    }
    
    .nukleo-loader-funk .disco-ball {
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
      width: 150px;
      height: 150px;
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(200, 200, 200, 0.6));
      border-radius: 50%;
      box-shadow: 
        0 0 50px rgba(255, 255, 255, 0.8),
        0 0 100px rgba(255, 0, 110, 0.6),
        inset -20px -20px 40px rgba(0, 0, 0, 0.3);
      animation: disco-spin 3s linear infinite;
    }
    
    @keyframes disco-spin {
      from { transform: translateX(-50%) rotate(0deg); }
      to { transform: translateX(-50%) rotate(360deg); }
    }
    
    .nukleo-loader-funk .disco-light {
      position: absolute;
      width: 200px;
      height: 200px;
      background: conic-gradient(
        from 0deg,
        rgba(255, 0, 110, 0.8),
        rgba(131, 56, 236, 0.8),
        rgba(58, 134, 255, 0.8),
        rgba(255, 0, 110, 0.8)
      );
      border-radius: 50%;
      filter: blur(40px);
      animation: disco-light-rotate 2s linear infinite;
    }
    
    @keyframes disco-light-rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .nukleo-loader-funk .shapes {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-funk .shape {
      position: absolute;
      animation: funk-dance 3s ease-in-out infinite;
    }
    
    .nukleo-loader-funk .shape-1 {
      width: 100px;
      height: 100px;
      background: linear-gradient(45deg, rgba(255, 0, 110, 0.8), rgba(131, 56, 236, 0.8));
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
      top: 20%;
      left: 15%;
      animation-delay: 0s;
    }
    
    .nukleo-loader-funk .shape-2 {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, rgba(58, 134, 255, 0.8), rgba(255, 0, 110, 0.8));
      clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
      top: 70%;
      right: 20%;
      animation-delay: 0.5s;
    }
    
    .nukleo-loader-funk .shape-3 {
      width: 120px;
      height: 120px;
      background: linear-gradient(90deg, rgba(131, 56, 236, 0.8), rgba(58, 134, 255, 0.8));
      border-radius: 50%;
      bottom: 15%;
      left: 10%;
      animation-delay: 1s;
    }
    
    @keyframes funk-dance {
      0%, 100% {
        transform: translate(0, 0) rotate(0deg) scale(1);
        opacity: 0.7;
      }
      25% {
        transform: translate(20px, -20px) rotate(90deg) scale(1.2);
        opacity: 1;
      }
      50% {
        transform: translate(-20px, 20px) rotate(180deg) scale(0.9);
        opacity: 0.8;
      }
      75% {
        transform: translate(20px, 20px) rotate(270deg) scale(1.1);
        opacity: 1;
      }
    }
    
    .nukleo-loader-funk .logo-container {
      position: relative;
      z-index: 10;
      animation: logo-funk 2s ease-in-out infinite;
      filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 60px rgba(255, 0, 110, 0.8)) drop-shadow(0 0 90px rgba(131, 56, 236, 0.6));
    }
    
    @keyframes logo-funk {
      0%, 100% {
        transform: scale(1) rotate(0deg);
        filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 60px rgba(255, 0, 110, 0.8));
      }
      25% {
        transform: scale(1.1) rotate(2deg);
        filter: drop-shadow(0 0 40px rgba(255, 255, 255, 1)) drop-shadow(0 0 80px rgba(255, 0, 110, 1)) drop-shadow(0 0 120px rgba(131, 56, 236, 0.8));
      }
      50% {
        transform: scale(1.15) rotate(0deg);
        filter: drop-shadow(0 0 50px rgba(255, 255, 255, 1)) drop-shadow(0 0 100px rgba(255, 0, 110, 1)) drop-shadow(0 0 150px rgba(131, 56, 236, 1)) drop-shadow(0 0 200px rgba(58, 134, 255, 0.8));
      }
      75% {
        transform: scale(1.1) rotate(-2deg);
        filter: drop-shadow(0 0 40px rgba(255, 255, 255, 1)) drop-shadow(0 0 80px rgba(255, 0, 110, 1)) drop-shadow(0 0 120px rgba(131, 56, 236, 0.8));
      }
    }
    
    .nukleo-loader-funk .logo-container img {
      width: 260px;
      height: auto;
    }
    
    .nukleo-loader-funk .text {
      color: rgba(255, 255, 255, 1);
      font-family: 'Aktiv Grotesk', sans-serif;
      font-size: 18px;
      letter-spacing: 0.6em;
      text-transform: uppercase;
      font-weight: 700;
      text-shadow: 
        0 0 10px rgba(255, 255, 255, 1),
        0 0 20px rgba(255, 0, 110, 0.8),
        0 0 30px rgba(131, 56, 236, 0.6),
        0 0 40px rgba(58, 134, 255, 0.4);
    }
  </style>
  
  <div class="disco-light" style="top: 5%; left: 50%; transform: translateX(-50%);"></div>
  <div class="disco-ball"></div>
  
  <div class="shapes">
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText("nukleo-loader-funk-text", "color: rgba(255, 255, 255, 1); font-family: 'Aktiv Grotesk', sans-serif; font-size: 18px; letter-spacing: 0.6em; text-transform: uppercase; font-weight: 700; text-shadow: 0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 0, 110, 0.8), 0 0 30px rgba(131, 56, 236, 0.6), 0 0 40px rgba(58, 134, 255, 0.4);", "25%")}
</div>`;
    loaderBasquiat = `<div class="nukleo-loader-basquiat">
  <style>
    .nukleo-loader-basquiat {
      position: fixed;
      inset: 0;
      background: #ffd700;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-basquiat::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          rgba(0, 0, 0, 0.05) 10px,
          rgba(0, 0, 0, 0.05) 20px
        );
      opacity: 0.3;
    }
    
    .nukleo-loader-basquiat .paint-splashes {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-basquiat .splash {
      position: absolute;
      border-radius: 50% 40% 60% 30%;
      animation: splash-appear 2s ease-out infinite;
    }
    
    .nukleo-loader-basquiat .splash-red {
      background: #ff0000;
      width: 120px;
      height: 100px;
      top: 15%;
      left: 10%;
      animation-delay: 0s;
    }
    
    .nukleo-loader-basquiat .splash-blue {
      background: #0000ff;
      width: 90px;
      height: 110px;
      top: 70%;
      right: 15%;
      animation-delay: 0.5s;
    }
    
    .nukleo-loader-basquiat .splash-black {
      background: #000000;
      width: 150px;
      height: 130px;
      top: 40%;
      left: 5%;
      animation-delay: 1s;
    }
    
    @keyframes splash-appear {
      0% {
        transform: scale(0) rotate(0deg);
        opacity: 0;
      }
      50% {
        transform: scale(1.2) rotate(180deg);
        opacity: 0.8;
      }
      100% {
        transform: scale(1) rotate(360deg);
        opacity: 0.6;
      }
    }
    
    .nukleo-loader-basquiat .crown {
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 60px;
      border: 6px solid #000000;
      border-bottom: none;
      clip-path: polygon(0% 100%, 20% 0%, 40% 50%, 50% 0%, 60% 50%, 80% 0%, 100% 100%);
      animation: crown-bounce 1.5s ease-in-out infinite;
    }
    
    @keyframes crown-bounce {
      0%, 100% {
        transform: translateX(-50%) translateY(0) rotate(0deg);
      }
      50% {
        transform: translateX(-50%) translateY(-15px) rotate(5deg);
      }
    }
    
    .nukleo-loader-basquiat .lines {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-basquiat .line {
      position: absolute;
      background: #000000;
      animation: line-draw 2s ease-in-out infinite;
    }
    
    .nukleo-loader-basquiat .line-1 {
      width: 200px;
      height: 4px;
      top: 25%;
      left: 20%;
      transform: rotate(15deg);
      animation-delay: 0s;
    }
    
    .nukleo-loader-basquiat .line-2 {
      width: 150px;
      height: 4px;
      bottom: 30%;
      right: 25%;
      transform: rotate(-20deg);
      animation-delay: 0.3s;
    }
    
    .nukleo-loader-basquiat .line-3 {
      width: 180px;
      height: 4px;
      top: 60%;
      left: 15%;
      transform: rotate(10deg);
      animation-delay: 0.6s;
    }
    
    @keyframes line-draw {
      0% {
        width: 0;
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        width: var(--final-width);
        opacity: 0.8;
      }
    }
    
    .nukleo-loader-basquiat .logo-container {
      position: relative;
      z-index: 10;
      animation: logo-basquiat 2.5s ease-in-out infinite;
      filter: drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.8)) drop-shadow(-2px -2px 0px rgba(255, 0, 0, 0.6));
    }
    
    @keyframes logo-basquiat {
      0%, 100% {
        transform: scale(1) rotate(0deg);
        filter: drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.8)) drop-shadow(-2px -2px 0px rgba(255, 0, 0, 0.6));
      }
      25% {
        transform: scale(1.05) rotate(-1deg);
        filter: drop-shadow(6px 6px 0px rgba(0, 0, 0, 1)) drop-shadow(-3px -3px 0px rgba(255, 0, 0, 0.8)) drop-shadow(2px 2px 0px rgba(0, 0, 255, 0.6));
      }
      50% {
        transform: scale(1.08) rotate(1deg);
        filter: drop-shadow(8px 8px 0px rgba(0, 0, 0, 1)) drop-shadow(-4px -4px 0px rgba(255, 0, 0, 1)) drop-shadow(4px 4px 0px rgba(0, 0, 255, 0.8));
      }
      75% {
        transform: scale(1.05) rotate(-1deg);
        filter: drop-shadow(6px 6px 0px rgba(0, 0, 0, 1)) drop-shadow(-3px -3px 0px rgba(255, 0, 0, 0.8)) drop-shadow(2px 2px 0px rgba(0, 0, 255, 0.6));
      }
    }
    
    .nukleo-loader-basquiat .logo-container img {
      width: 280px;
      height: auto;
      filter: contrast(1.2) brightness(1.1);
    }
    
    .nukleo-loader-basquiat .text {
      color: #000000;
      font-family: 'Arial Black', sans-serif;
      font-size: 20px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      font-weight: 900;
      text-shadow: 
        3px 3px 0px rgba(255, 0, 0, 0.8),
        -2px -2px 0px rgba(0, 0, 255, 0.6),
        4px 4px 8px rgba(0, 0, 0, 0.5);
    }
  </style>
  
  <div class="paint-splashes">
    <div class="splash splash-red"></div>
    <div class="splash splash-blue"></div>
    <div class="splash splash-black"></div>
  </div>
  
  <div class="crown"></div>
  
  <div class="lines">
    <div class="line line-1" style="--final-width: 200px;"></div>
    <div class="line line-2" style="--final-width: 150px;"></div>
    <div class="line line-3" style="--final-width: 180px;"></div>
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText("nukleo-loader-basquiat-text", "color: #000000; font-family: 'Arial Black', sans-serif; font-size: 20px; letter-spacing: 0.3em; text-transform: uppercase; font-weight: 900; text-shadow: 3px 3px 0px rgba(255, 0, 0, 0.8), -2px -2px 0px rgba(0, 0, 255, 0.6), 4px 4px 8px rgba(0, 0, 0, 0.5);", "22%")}
</div>`;
    loaderElegant = `<div class="nukleo-loader-elegant">
  <style>
    .nukleo-loader-elegant {
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-elegant::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
      animation: elegant-glow 4s ease-in-out infinite;
    }
    
    @keyframes elegant-glow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
    
    .nukleo-loader-elegant .elegant-lines {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-elegant .line {
      position: absolute;
      background: linear-gradient(90deg, 
        transparent,
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.15),
        rgba(255, 255, 255, 0.1),
        transparent
      );
      height: 1px;
      animation: line-sweep 3s ease-in-out infinite;
    }
    
    .nukleo-loader-elegant .line-horizontal {
      width: 100%;
      left: 0;
    }
    
    .nukleo-loader-elegant .line-vertical {
      width: 1px;
      height: 100%;
      top: 0;
    }
    
    .nukleo-loader-elegant .line-h-1 {
      top: 20%;
      animation-delay: 0s;
    }
    
    .nukleo-loader-elegant .line-h-2 {
      top: 50%;
      animation-delay: 0.5s;
    }
    
    .nukleo-loader-elegant .line-h-3 {
      top: 80%;
      animation-delay: 1s;
    }
    
    .nukleo-loader-elegant .line-v-1 {
      left: 20%;
      animation-delay: 0.25s;
    }
    
    .nukleo-loader-elegant .line-v-2 {
      left: 50%;
      animation-delay: 0.75s;
    }
    
    .nukleo-loader-elegant .line-v-3 {
      left: 80%;
      animation-delay: 1.25s;
    }
    
    @keyframes line-sweep {
      0%, 100% {
        opacity: 0;
        transform: scaleX(0);
      }
      50% {
        opacity: 1;
        transform: scaleX(1);
      }
    }
    
    .nukleo-loader-elegant .logo-container {
      position: relative;
      z-index: 10;
      animation: logo-elegant 3s ease-in-out infinite;
      filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.1)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.05));
    }
    
    @keyframes logo-elegant {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
        filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.1)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.05));
      }
      50% {
        transform: scale(1.02);
        opacity: 0.95;
        filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.15)) drop-shadow(0 0 60px rgba(255, 255, 255, 0.08));
      }
    }
    
    .nukleo-loader-elegant .logo-container img {
      width: 220px;
      height: auto;
      opacity: 0.95;
    }
    
    .nukleo-loader-elegant .text {
      color: rgba(255, 255, 255, 0.7);
      font-family: 'Aktiv Grotesk', sans-serif;
      font-size: 13px;
      letter-spacing: 0.4em;
      text-transform: uppercase;
      font-weight: 300;
    }
    
    .nukleo-loader-elegant .corner-decoration {
      position: absolute;
      width: 60px;
      height: 60px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      animation: corner-fade 4s ease-in-out infinite;
    }
    
    .nukleo-loader-elegant .corner-top-left {
      top: 40px;
      left: 40px;
      border-right: none;
      border-bottom: none;
      animation-delay: 0s;
    }
    
    .nukleo-loader-elegant .corner-top-right {
      top: 40px;
      right: 40px;
      border-left: none;
      border-bottom: none;
      animation-delay: 1s;
    }
    
    .nukleo-loader-elegant .corner-bottom-left {
      bottom: 40px;
      left: 40px;
      border-right: none;
      border-top: none;
      animation-delay: 2s;
    }
    
    .nukleo-loader-elegant .corner-bottom-right {
      bottom: 40px;
      right: 40px;
      border-left: none;
      border-top: none;
      animation-delay: 3s;
    }
    
    @keyframes corner-fade {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.7; }
    }
  </style>
  
  <div class="elegant-lines">
    <div class="line line-horizontal line-h-1"></div>
    <div class="line line-horizontal line-h-2"></div>
    <div class="line line-horizontal line-h-3"></div>
    <div class="line line-vertical line-v-1"></div>
    <div class="line line-vertical line-v-2"></div>
    <div class="line line-vertical line-v-3"></div>
  </div>
  
  <div class="corner-decoration corner-top-left"></div>
  <div class="corner-decoration corner-top-right"></div>
  <div class="corner-decoration corner-bottom-left"></div>
  <div class="corner-decoration corner-bottom-right"></div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  <div class="text" style="position: fixed; bottom: 28%; left: 50%; transform: translateX(-50%); z-index: 10000; pointer-events: none; color: rgba(255, 255, 255, 0.7); font-family: 'Aktiv Grotesk', sans-serif; font-size: 13px; letter-spacing: 0.4em; text-transform: uppercase; font-weight: 300;">Choose Intelligence</div>
</div>`;
    loaderLuxe = `<div class="nukleo-loader-luxe">
  <style>
    .nukleo-loader-luxe {
      position: fixed;
      inset: 0;
      background: radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-luxe::before {
      content: '';
      position: absolute;
      inset: -50%;
      background: conic-gradient(
        from 0deg,
        transparent 0deg,
        rgba(255, 255, 255, 0.02) 45deg,
        transparent 90deg,
        rgba(255, 255, 255, 0.02) 135deg,
        transparent 180deg,
        rgba(255, 255, 255, 0.02) 225deg,
        transparent 270deg,
        rgba(255, 255, 255, 0.02) 315deg,
        transparent 360deg
      );
      animation: luxe-rotate 20s linear infinite;
    }
    
    @keyframes luxe-rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .nukleo-loader-luxe .luxe-particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-luxe .luxe-particle {
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      box-shadow: 0 0 6px rgba(255, 255, 255, 0.3);
      animation: luxe-particle-float 8s ease-in-out infinite;
    }
    
    @keyframes luxe-particle-float {
      0%, 100% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
        transform: scale(1);
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translate(var(--tx), var(--ty)) scale(0);
        opacity: 0;
      }
    }
    
    .nukleo-loader-luxe .luxe-ring {
      position: absolute;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: luxe-ring-expand 4s ease-out infinite;
    }
    
    .nukleo-loader-luxe .luxe-ring-1 {
      width: 200px;
      height: 200px;
      animation-delay: 0s;
    }
    
    .nukleo-loader-luxe .luxe-ring-2 {
      width: 300px;
      height: 300px;
      animation-delay: 1s;
    }
    
    .nukleo-loader-luxe .luxe-ring-3 {
      width: 400px;
      height: 400px;
      animation-delay: 2s;
    }
    
    @keyframes luxe-ring-expand {
      0% {
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0.6;
      }
      50% {
        opacity: 0.3;
      }
      100% {
        transform: translate(-50%, -50%) scale(1.2);
        opacity: 0;
      }
    }
    
    .nukleo-loader-luxe .logo-container {
      position: relative;
      z-index: 10;
      animation: logo-luxe 4s ease-in-out infinite;
      filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.15)) drop-shadow(0 0 60px rgba(255, 255, 255, 0.08));
    }
    
    @keyframes logo-luxe {
      0%, 100% {
        transform: scale(1);
        filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.15)) drop-shadow(0 0 60px rgba(255, 255, 255, 0.08));
      }
      25% {
        transform: scale(1.01);
        filter: drop-shadow(0 0 40px rgba(255, 255, 255, 0.2)) drop-shadow(0 0 80px rgba(255, 255, 255, 0.1));
      }
      50% {
        transform: scale(1.02);
        filter: drop-shadow(0 0 50px rgba(255, 255, 255, 0.25)) drop-shadow(0 0 100px rgba(255, 255, 255, 0.12));
      }
      75% {
        transform: scale(1.01);
        filter: drop-shadow(0 0 40px rgba(255, 255, 255, 0.2)) drop-shadow(0 0 80px rgba(255, 255, 255, 0.1));
      }
    }
    
    .nukleo-loader-luxe .logo-container img {
      width: 240px;
      height: auto;
      opacity: 0.98;
    }
    
    .nukleo-loader-luxe .text {
      color: rgba(255, 255, 255, 0.65);
      font-family: 'Aktiv Grotesk', sans-serif;
      font-size: 12px;
      letter-spacing: 0.5em;
      text-transform: uppercase;
      font-weight: 200;
    }
  </style>
  
  <div class="luxe-particles">
    ${(() => {
      const particles = [];
      for (let i = 0; i < 12; i++) {
        const angle = i / 12 * Math.PI * 2;
        const distance = 150 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        particles.push(`
          <div class="luxe-particle" style="
            --tx: ${tx}px;
            --ty: ${ty}px;
            left: 50%;
            top: 50%;
            animation-delay: ${i * 0.5}s;
            animation-duration: ${6 + Math.random() * 2}s;
          "></div>
        `);
      }
      return particles.join("");
    })()}
  </div>
  
  <div class="luxe-ring luxe-ring-1"></div>
  <div class="luxe-ring luxe-ring-2"></div>
  <div class="luxe-ring luxe-ring-3"></div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  <div class="text" style="position: fixed; bottom: 28%; left: 50%; transform: translateX(-50%); z-index: 10000; pointer-events: none; color: rgba(255, 255, 255, 0.65); font-family: 'Aktiv Grotesk', sans-serif; font-size: 12px; letter-spacing: 0.5em; text-transform: uppercase; font-weight: 200;">Choose Intelligence</div>
</div>`;
  }
});

// server/_core/index.ts
import "dotenv/config";
import express2 from "express";
import { createServer } from "http";
import net from "net";
import path6 from "path";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// server/_core/oauth.ts
init_const();
init_db();
init_cookies();
init_sdk();
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app) {
  app.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/_core/index.ts
init_routers();
init_context();

// server/sitemap.ts
import { Router } from "express";
var router2 = Router();
var STATIC_PATHS = [
  { path: "", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.9", changefreq: "monthly" },
  { path: "/approche", priority: "0.8", changefreq: "monthly" },
  { path: "/projects", priority: "0.8", changefreq: "weekly" },
  { path: "/resources", priority: "0.9", changefreq: "weekly" },
  { path: "/contact", priority: "0.7", changefreq: "monthly" },
  { path: "/leo", priority: "0.7", changefreq: "monthly" },
  { path: "/services", priority: "0.9", changefreq: "weekly" },
  { path: "/services/tech", priority: "0.8", changefreq: "monthly" },
  { path: "/services/studio", priority: "0.8", changefreq: "monthly" },
  { path: "/services/agency", priority: "0.8", changefreq: "monthly" },
  { path: "/services/consulting", priority: "0.8", changefreq: "monthly" },
  { path: "/privacy-policy", priority: "0.4", changefreq: "yearly" },
  { path: "/nukleo-time-privacy", priority: "0.4", changefreq: "yearly" },
  { path: "/terms-of-service", priority: "0.4", changefreq: "yearly" },
  { path: "/cookie-policy", priority: "0.4", changefreq: "yearly" },
  { path: "/faq", priority: "0.6", changefreq: "monthly" }
];
var RESOURCE_ARTICLE_IDS = [
  "agentic-ai-playbook",
  "pilot-to-scale",
  "agentic-marketing",
  "building-agentic-systems",
  "roi-ai-investment"
];
function getBaseUrl(req) {
  const siteUrl = process.env.SITE_URL;
  if (siteUrl) return siteUrl.replace(/\/$/, "");
  const host = req.get("host");
  const protocol = req.get("x-forwarded-proto") || req.protocol || "http";
  return host ? `${protocol}://${host}` : "https://nukleo.digital";
}
router2.get("/sitemap.xml", (req, res) => {
  const baseUrl = getBaseUrl(req);
  const currentDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const urls = [];
  for (const { path: path7, priority, changefreq } of STATIC_PATHS) {
    const enPath = path7 || "/";
    const frPath = path7 ? `/fr${path7}` : "/fr";
    const locEn = `${baseUrl}${enPath}`;
    const locFr = `${baseUrl}${frPath}`;
    urls.push(`  <url>
    <loc>${locEn}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${locEn}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${locFr}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${locEn}"/>
  </url>`);
    urls.push(`  <url>
    <loc>${locFr}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${locEn}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${locFr}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${locEn}"/>
  </url>`);
  }
  for (const id of RESOURCE_ARTICLE_IDS) {
    const enPath = `/resources/${id}`;
    const frPath = `/fr/resources/${id}`;
    const locEn = `${baseUrl}${enPath}`;
    const locFr = `${baseUrl}${frPath}`;
    urls.push(`  <url>
    <loc>${locEn}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${locEn}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${locFr}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${locEn}"/>
  </url>`);
    urls.push(`  <url>
    <loc>${locFr}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${locEn}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${locFr}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${locEn}"/>
  </url>`);
  }
  try {
    const { PROJECTS_DATA: PROJECTS_DATA2 } = (init_projectsData(), __toCommonJS(projectsData_exports));
    for (const project of PROJECTS_DATA2) {
      const enPath = `/projects/${project.slug}`;
      const frPath = `/fr/projects/${project.slug}`;
      const locEn = `${baseUrl}${enPath}`;
      const locFr = `${baseUrl}${frPath}`;
      urls.push(`  <url>
    <loc>${locEn}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${locEn}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${locFr}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${locEn}"/>
  </url>`);
      urls.push(`  <url>
    <loc>${locFr}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${locEn}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${locFr}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${locEn}"/>
  </url>`);
    }
  } catch {
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`;
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.send(sitemap);
});
router2.get("/robots.txt", (req, res) => {
  const baseUrl = getBaseUrl(req);
  const robots = `# Nukleo Digital
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(robots);
});
var sitemap_default = router2;

// server/_core/vite.ts
import express from "express";
import fs4 from "fs";
import { nanoid } from "nanoid";
import path5 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path4 from "path";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
var plugins = [
  react(),
  tailwindcss(),
  jsxLocPlugin(),
  // Bundle analyzer - only in production builds
  process.env.ANALYZE === "true" && visualizer({
    open: true,
    filename: "dist/stats.html",
    gzipSize: true,
    brotliSize: true,
    template: "treemap"
    // 'sunburst' | 'treemap' | 'network'
  })
].filter(Boolean);
var vite_config_default = defineConfig({
  plugins,
  base: "/",
  // Explicit base path for proper asset resolution
  resolve: {
    alias: {
      "@": path4.resolve(import.meta.dirname, "client", "src"),
      "@shared": path4.resolve(import.meta.dirname, "shared"),
      "@assets": path4.resolve(import.meta.dirname, "attached_assets")
    }
  },
  envDir: path4.resolve(import.meta.dirname),
  root: path4.resolve(import.meta.dirname, "client"),
  publicDir: path4.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path4.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    sourcemap: false,
    minify: "esbuild",
    target: "es2020",
    cssCodeSplit: true,
    cssMinify: true,
    // Reduce inline limit for mobile - smaller initial HTML
    assetsInlineLimit: 1024,
    reportCompressedSize: false,
    // Optimize chunk size for mobile
    chunkSizeWarningLimit: 400,
    // Further reduced
    rollupOptions: {
      output: {
        // Optimize chunk names for better caching
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split(".") || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return "assets/images/[name]-[hash][extname]";
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return "assets/fonts/[name]-[hash][extname]";
          }
          return "assets/[ext]/[name]-[hash][extname]";
        },
        manualChunks: (id) => {
          if (id.includes("wouter")) {
            return;
          }
          if (id.includes("hooks/useLocalizedPath") || id.includes("useLocalizedPath")) {
            return;
          }
          if (id.includes("contexts/LanguageContext") || id.includes("LanguageContext")) {
            return;
          }
          if (id.includes("node_modules")) {
            if (id.includes("react/") && !id.includes("react-dom")) {
              return "react-core";
            }
            if (id.includes("react-dom")) {
              if (id.includes("react-dom/client")) {
                return "react-dom-client";
              }
              return "react-dom";
            }
            if (id.includes("scheduler")) {
              return "react-scheduler";
            }
            if (id.includes("lucide-react")) {
              return "icons-vendor";
            }
            if (id.includes("recharts") || id.includes("d3-") || id.includes("chart.js")) {
              return "charts-vendor";
            }
            if (id.includes("@trpc")) {
              return "trpc-vendor";
            }
            if (id.includes("@tanstack/react-query")) {
              return "react-query-vendor";
            }
            if (id.includes("framer-motion")) {
              return "animation-vendor";
            }
            if (id.includes("streamdown") || id.includes("react-markdown")) {
              return "markdown-vendor";
            }
            if (id.includes("@radix-ui")) {
              return "radix-vendor";
            }
            if (id.includes("react-hook-form") || id.includes("@hookform")) {
              return "forms-vendor";
            }
            return "vendor";
          }
          if (id.includes("/pages/admin/") || id.includes("/components/Admin") || id.includes("/components/ProtectedAdminRoute") || id.includes("/components/DashboardLayout") || id.includes("/styles/admin.css") || id.includes("/hooks/useAdminAuth") || id.includes("admin.css")) {
            return "admin";
          }
          if (id.includes("/pages/services/")) {
            return "services";
          }
          if (id.includes("/components/radar/")) {
            return "radar";
          }
          if (id.includes("/components/glossary/")) {
            return "glossary";
          }
          if (id.includes("/components/UniversalLEO") || id.includes("/components/Leo") || id.includes("/pages/Leo")) {
            return "leo";
          }
          if (id.includes("/components/TestimonialsCarousel") || id.includes("/components/ClientLogos")) {
            return "carousels";
          }
          if (id.includes("/components/TrendRadar") || id.includes("/pages/AITrendRadar") || id.includes("/pages/RadarNew")) {
            return "radar-charts";
          }
        }
      }
    }
  },
  optimizeDeps: {
    // Do NOT include useLocalizedPath: pre-bundling creates a duplicate LanguageContext
    // and useLanguage() then runs outside the app's LanguageProvider.
    include: ["wouter"]
  },
  // Optimize CSS loading - defer non-critical CSS
  css: {
    devSourcemap: false
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1"
    ],
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/_core/vite.ts
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path5.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs4.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  let distPath = path5.resolve(process.cwd(), "dist", "public");
  if (!fs4.existsSync(distPath)) {
    const altPath = path5.resolve(import.meta.dirname, "..", "..", "dist", "public");
    if (fs4.existsSync(altPath)) {
      console.log(`[Static] Found build directory at alternative path: ${altPath}`);
      distPath = altPath;
    } else {
      console.error(
        `Could not find the build directory at: ${distPath} or ${altPath}`
      );
      console.error(`Current working directory: ${process.cwd()}`);
      console.error(`__dirname equivalent: ${import.meta.dirname}`);
      return;
    }
  }
  console.log(`[Static] Serving static files from: ${distPath}`);
  const assetsJsPath = path5.join(distPath, "assets", "js");
  if (fs4.existsSync(assetsJsPath)) {
    const files = fs4.readdirSync(assetsJsPath);
    console.log(`[Static] Found ${files.length} JS files in assets/js:`, files.slice(0, 5));
  } else {
    console.error(`[Static] \u26A0\uFE0F assets/js directory not found at: ${assetsJsPath}`);
  }
  app.use("/assets/js", express.static(path5.join(distPath, "assets", "js"), {
    maxAge: "1y",
    immutable: true,
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      res.setHeader("Vary", "Accept-Encoding");
      if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript; charset=utf-8");
      }
    }
  }));
  app.use("/assets/css", express.static(path5.join(distPath, "assets", "css"), {
    maxAge: "1y",
    immutable: true,
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      res.setHeader("Vary", "Accept-Encoding");
    }
  }));
  app.use("/fonts", express.static(path5.join(distPath, "fonts"), {
    maxAge: "1y",
    immutable: true,
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      res.setHeader("Vary", "Accept-Encoding");
    }
  }));
  app.use("/images", express.static(path5.join(distPath, "images"), {
    maxAge: "1y",
    immutable: false,
    // Images might be updated
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      res.setHeader("Cache-Control", "public, max-age=31536000, stale-while-revalidate=86400");
      res.setHeader("Vary", "Accept");
      if (filePath.endsWith(".webp")) {
        res.setHeader("Content-Type", "image/webp");
      } else if (filePath.endsWith(".svg")) {
        res.setHeader("Content-Type", "image/svg+xml");
      }
    }
  }));
  app.use(express.static(distPath, {
    maxAge: "1y",
    immutable: false,
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      const ext = path5.extname(filePath).toLowerCase();
      if (filePath.includes("/assets/") && (ext === ".js" || ext === ".css")) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        res.setHeader("Vary", "Accept-Encoding");
        if (ext === ".js") {
          res.setHeader("Content-Type", "application/javascript; charset=utf-8");
        }
      } else if (ext === ".woff2" || ext === ".woff" || ext === ".ttf" || ext === ".otf" || ext === ".eot") {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        res.setHeader("Vary", "Accept-Encoding");
      } else if (ext === ".webp" || ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif" || ext === ".svg" || ext === ".ico") {
        res.setHeader("Cache-Control", "public, max-age=31536000, stale-while-revalidate=86400");
        res.setHeader("Vary", "Accept");
        if (ext === ".webp") {
          res.setHeader("Content-Type", "image/webp");
        } else if (ext === ".svg") {
          res.setHeader("Content-Type", "image/svg+xml");
        } else if (ext === ".ico") {
          res.setHeader("Content-Type", "image/x-icon");
        }
      } else {
        res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=3600");
      }
    }
  }));
}

// server/init-db.ts
init_db();
import { sql as sql3 } from "drizzle-orm";
async function initDatabase(req, res) {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database connection failed" });
    }
    await db.execute(sql3`
      DO $$ BEGIN
        CREATE TYPE role AS ENUM ('user', 'admin');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
    await db.execute(sql3`
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
    await db.execute(sql3`
      CREATE TABLE IF NOT EXISTS leo_contacts (
        id SERIAL PRIMARY KEY,
        email VARCHAR(320) NOT NULL,
        name VARCHAR(255),
        "conversationContext" TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
    await db.execute(sql3`
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
    await db.execute(sql3`
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
    await db.execute(sql3`
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
    await db.execute(sql3`
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
    await db.execute(sql3`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        "passwordHash" VARCHAR(255) NOT NULL,
        email VARCHAR(320) NOT NULL UNIQUE,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "lastLoginAt" TIMESTAMP
      );
    `);
    await db.execute(sql3`
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
    await db.execute(sql3`
      CREATE TABLE IF NOT EXISTS page_visibility (
        id SERIAL PRIMARY KEY,
        path VARCHAR(255) NOT NULL UNIQUE,
        "isVisible" BOOLEAN DEFAULT true NOT NULL,
        description TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
    await db.execute(sql3`
      CREATE INDEX IF NOT EXISTS idx_page_visibility_path ON page_visibility(path);
    `);
    await db.execute(sql3`
      CREATE TABLE IF NOT EXISTS radar_technologies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
    await db.execute(sql3`
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
    await db.execute(sql3`
      CREATE INDEX IF NOT EXISTS idx_radar_positions_technology_date 
      ON radar_positions("technologyId", date DESC);
    `);
    await db.execute(sql3`
      CREATE TABLE IF NOT EXISTS ai_news_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(320) NOT NULL UNIQUE,
        source VARCHAR(100) DEFAULT 'ai-trend-radar' NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
    await db.execute(sql3`
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
    await db.execute(sql3`
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
    await db.execute(sql3`
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
    await db.execute(sql3`
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
    await db.execute(sql3`
      CREATE INDEX IF NOT EXISTS idx_analytics_provider ON analytics(provider);
    `);
    await db.execute(sql3`
      CREATE INDEX IF NOT EXISTS idx_analytics_enabled ON analytics("isEnabled");
    `);
    await db.execute(sql3`
      CREATE TABLE IF NOT EXISTS page_texts (
        id SERIAL PRIMARY KEY,
        key VARCHAR(512) NOT NULL UNIQUE,
        text_en TEXT NOT NULL,
        text_fr TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
    await db.execute(sql3`
      CREATE INDEX IF NOT EXISTS idx_page_texts_key ON page_texts(key);
    `);
    await db.execute(sql3`
      CREATE TABLE IF NOT EXISTS carousel_logos (
        id SERIAL PRIMARY KEY,
        src VARCHAR(512) NOT NULL,
        alt VARCHAR(255) NOT NULL,
        url VARCHAR(512) DEFAULT '' NOT NULL,
        display_order INTEGER DEFAULT 0 NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
    await db.execute(sql3`
      CREATE INDEX IF NOT EXISTS idx_carousel_logos_display_order ON carousel_logos(display_order);
    `);
    await db.execute(sql3`
      CREATE TABLE IF NOT EXISTS projects_store (
        key VARCHAR(64) PRIMARY KEY DEFAULT 'projects',
        value TEXT NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
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
        "analytics",
        "page_texts",
        "carousel_logos",
        "projects_store"
      ]
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    const errorCode = error instanceof Error && "code" in error ? error.code : null;
    if (errorCode === "ECONNREFUSED") {
      console.error("[Init DB] Error: Database connection refused");
    } else {
      console.error(`[Init DB] Error: ${errorMsg}`);
    }
    res.status(500).json({
      error: "Failed to initialize database",
      details: errorCode === "ECONNREFUSED" ? "Database connection refused" : errorMsg
    });
  }
}

// server/_core/index.ts
init_logger();
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import compression from "compression";

// server/_core/sentry.ts
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
function initSentry() {
  if (!process.env.SENTRY_DSN) {
    console.log("\u26A0\uFE0F  Sentry DSN not configured, error monitoring disabled");
    return false;
  }
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || "development",
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,
    // Profiling (optional, requires @sentry/profiling-node)
    profilesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,
    integrations: [
      nodeProfilingIntegration(),
      Sentry.httpIntegration(),
      Sentry.expressIntegration()
    ],
    // Release tracking
    release: process.env.SENTRY_RELEASE || void 0,
    // Ignore specific errors
    ignoreErrors: [
      // Browser extensions
      "ResizeObserver loop limit exceeded",
      "Non-Error promise rejection captured",
      // Network errors that are expected
      "NetworkError",
      "Failed to fetch"
    ],
    beforeSend(event, hint) {
      if (event.request) {
        delete event.request.cookies;
        delete event.request.headers?.["authorization"];
        delete event.request.headers?.["cookie"];
        delete event.request.headers?.["x-api-key"];
      }
      if (event.user) {
        delete event.user.ip_address;
      }
      if (event.request?.url?.includes("/health")) {
        return null;
      }
      return event;
    },
    // Configure alerting thresholds
    beforeSendTransaction(event) {
      if (event.transaction && event.contexts?.trace?.duration) {
        const duration = event.contexts.trace.duration;
        if (duration > 5e3) {
          event.tags = { ...event.tags, slow_transaction: true };
        }
      }
      return event;
    }
  });
  if (process.env.SENTRY_ENVIRONMENT) {
    Sentry.setTag("environment", process.env.SENTRY_ENVIRONMENT);
  }
  console.log("\u2705 Sentry initialized for server-side error monitoring");
  return true;
}

// server/_core/index.ts
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport2 from "passport";

// server/_core/googleAuth.ts
init_env();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
var DEFAULT_ADMIN_EMAILS = ["clement@nukleo.com"].map((e) => e.toLowerCase());
function configureGoogleAuth() {
  if (!ENV.googleClientId || !ENV.googleClientSecret) {
    console.warn("[Google Auth] Missing credentials, Google OAuth disabled");
    return false;
  }
  const clientIdPreview = ENV.googleClientId.length > 20 ? `${ENV.googleClientId.substring(0, 10)}...${ENV.googleClientId.substring(ENV.googleClientId.length - 10)}` : ENV.googleClientId;
  const callbackURL = `${ENV.baseUrl}/api/auth/google/callback`;
  console.log(`[Google Auth] Configuring OAuth with:`);
  console.log(`  - Client ID: ${clientIdPreview}`);
  console.log(`  - Callback URL: ${callbackURL}`);
  console.log(`  - Base URL: ${ENV.baseUrl}`);
  const fromEnv = ENV.adminAllowedEmails?.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean) || [];
  const allowedEmails = [.../* @__PURE__ */ new Set([...DEFAULT_ADMIN_EMAILS, ...fromEnv])];
  if (fromEnv.length === 0) {
    console.log(`[Google Auth] No ADMIN_ALLOWED_EMAILS set, using default allowed: ${allowedEmails.join(", ")}`);
  } else {
    console.log(`[Google Auth] Allowed emails: ${allowedEmails.join(", ")}`);
  }
  passport.use(
    new GoogleStrategy(
      {
        clientID: ENV.googleClientId,
        clientSecret: ENV.googleClientSecret,
        callbackURL
      },
      (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value?.toLowerCase();
          if (!email) {
            console.error("[Google Auth] No email found in Google profile");
            return done(null, false, { message: "No email found in Google profile" });
          }
          if (!allowedEmails.includes(email)) {
            console.log(`[Google Auth] Unauthorized email attempt: ${email}`);
            return done(null, false, { message: "Email not authorized" });
          }
          const adminUser = {
            id: profile.id,
            email,
            name: profile.displayName,
            picture: profile.photos?.[0]?.value
          };
          console.log(`[Google Auth] Successful login: ${email}`);
          return done(null, adminUser);
        } catch (error) {
          console.error("[Google Auth] Error in OAuth callback:", error);
          return done(error, false);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  console.log("[Google Auth] Configured successfully");
  return true;
}
function requireAdminAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  const ADMIN_COOKIE_NAME3 = "admin_session";
  const ADMIN_JWT_SECRET3 = process.env.JWT_SECRET + "-admin";
  const adminToken = req.cookies?.[ADMIN_COOKIE_NAME3];
  if (adminToken && ADMIN_JWT_SECRET3 && ADMIN_JWT_SECRET3 !== "-admin") {
    try {
      const jwt4 = __require("jsonwebtoken");
      const decoded = jwt4.verify(adminToken, ADMIN_JWT_SECRET3);
      if (decoded && decoded.id) {
        return next();
      }
    } catch (error) {
    }
  }
  console.log(`[AdminAuth] Unauthorized access attempt to ${req.path}`);
  res.status(401).json({ error: "Unauthorized - Admin login required" });
}

// server/_core/index.ts
init_db();
init_carouselLogosApi();
init_schema();
import { eq as eq11 } from "drizzle-orm";
import postgres3 from "postgres";
import { sql as sql4 } from "drizzle-orm";
import multer from "multer";
import { promises as fs5 } from "fs";
import { existsSync as existsSync2, mkdirSync, readdirSync } from "fs";

// server/_core/csrf.ts
import crypto from "crypto";
var CSRF_SECRET = process.env.CSRF_SECRET || process.env.JWT_SECRET || "nukleo-csrf-secret";
var CSRF_TOKEN_LENGTH = 32;
function generateCSRFToken() {
  return crypto.randomBytes(CSRF_TOKEN_LENGTH).toString("hex");
}
function csrfTokenMiddleware(req, res, next) {
  if (!req.session?.csrfToken) {
    req.session.csrfToken = generateCSRFToken();
  }
  res.locals.csrfToken = req.session.csrfToken;
  next();
}

// server/_core/index.ts
init_env();
import jwt3 from "jsonwebtoken";
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function checkDatabaseConnection() {
  if (!process.env.DATABASE_URL) {
    return false;
  }
  try {
    const { getDb: getDb2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const db = await getDb2();
    if (!db) {
      return false;
    }
    await db.execute(sql4`SELECT 1`);
    return true;
  } catch (error) {
    const errorCode = error instanceof Error && "code" in error ? error.code : "UNKNOWN";
    if (errorCode === "ECONNREFUSED") {
      logger.warn("Database connection refused. Check DATABASE_URL and ensure database is running.");
    }
    return false;
  }
}
async function startServer() {
  initSentry();
  const dbAvailable = await checkDatabaseConnection();
  const app = express2();
  const server = createServer(app);
  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
  }
  if (process.env.SENTRY_DSN) {
    app.use((req, res, next) => {
      Sentry.setUser({
        ip_address: req.ip
      });
      Sentry.setContext("request", {
        method: req.method,
        url: req.url,
        headers: {
          "user-agent": req.get("user-agent")
        }
      });
      next();
    });
  }
  app.use(compression({ level: 9 }));
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://fonts.googleapis.com",
          "https://*.manusvm.computer",
          "https://www.googletagmanager.com",
          "https://*.googletagmanager.com",
          "https://www.google-analytics.com"
        ],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        connectSrc: [
          "'self'",
          "https://api.manus.im",
          "https://*.railway.app",
          "https://*.manusvm.computer",
          "https://fonts.googleapis.com",
          "https://fonts.gstatic.com",
          "https://*.googleusercontent.com",
          "https://www.googletagmanager.com",
          "https://*.googletagmanager.com",
          "https://www.google-analytics.com",
          "https://*.google-analytics.com",
          "https://google-analytics.com"
        ],
        frameSrc: ["'self'", "https://www.google.com", "https://maps.google.com", "https://maps.googleapis.com", "https://www.openstreetmap.org"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: process.env.NODE_ENV === "production" ? [] : null,
        // CSP Reporting - log violations for monitoring (optional endpoint)
        reportUri: process.env.CSP_REPORT_URI || "/api/csp-report"
      }
    },
    hsts: {
      maxAge: 31536e3,
      includeSubDomains: true,
      preload: true
    },
    crossOriginEmbedderPolicy: false
    // Allow embedding for OAuth
  }));
  app.use(cors({
    origin: process.env.NODE_ENV === "production" ? [
      "https://nukleo.digital",
      "https://nukleodigital-production.up.railway.app",
      "https://www.nukleo.digital",
      "https://ingenious-rebirth-production-7f81.up.railway.app",
      /^https:\/\/[a-z0-9-]+\.up\.railway\.app$/
    ] : true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
  }));
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1e3,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).setHeader("Content-Type", "application/json").send(
        JSON.stringify({ error: "Too many requests from this IP, please try again later." })
      );
    }
  });
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1e3,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).setHeader("Content-Type", "application/json").send(
        JSON.stringify({ error: "Too many authentication attempts, please try again later." })
      );
    }
  });
  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));
  app.use(cookieParser());
  let sessionStore;
  if (dbAvailable && process.env.DATABASE_URL) {
    try {
      const PgSession = connectPgSimple(session);
      sessionStore = new PgSession({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: true,
        tableName: "session"
      });
      logger.info("Using PostgreSQL session store");
    } catch (error) {
      logger.warn("PostgreSQL session store unavailable, using MemoryStore");
      const MemoryStore = session.MemoryStore;
      sessionStore = new MemoryStore();
    }
  } else {
    logger.warn("Database not available, using MemoryStore for sessions (sessions will be lost on restart)");
    const MemoryStore = session.MemoryStore;
    sessionStore = new MemoryStore();
  }
  app.use(session({
    store: sessionStore,
    secret: process.env.JWT_SECRET || "nukleo-admin-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1e3,
      // 24 hours
      sameSite: "lax"
    }
  }));
  app.use(csrfTokenMiddleware);
  app.use(passport2.initialize());
  app.use(passport2.session());
  const googleAuthConfigured = configureGoogleAuth();
  if (googleAuthConfigured) {
    app.get("/api/auth/google", authLimiter, (req, res, next) => {
      console.log(`[Google Auth] OAuth request initiated from: ${req.get("referer") || "unknown"}`);
      passport2.authenticate("google", {
        scope: ["profile", "email"]
      })(req, res, next);
    });
    app.get(
      "/api/auth/google/callback",
      (req, res, next) => {
        console.log(`[Google Auth] Callback received with code: ${req.query.code ? "present" : "missing"}`);
        console.log(`[Google Auth] Callback error: ${req.query.error || "none"}`);
        passport2.authenticate("google", {
          failureRedirect: "/admin/login?error=unauthorized",
          failureFlash: false
        }, (err, user, info) => {
          if (err) {
            console.error("[Google Auth] Authentication error:", err);
            return res.redirect(`/admin/login?error=${encodeURIComponent(err.message || "authentication_failed")}`);
          }
          if (!user) {
            console.error("[Google Auth] Authentication failed:", info);
            return res.redirect(`/admin/login?error=${encodeURIComponent(info?.message || "unauthorized")}`);
          }
          req.logIn(user, (loginErr) => {
            if (loginErr) {
              console.error("[Google Auth] Login error:", loginErr);
              return res.redirect(`/admin/login?error=${encodeURIComponent(loginErr.message || "login_failed")}`);
            }
            const ADMIN_COOKIE_NAME3 = "admin_session";
            const ADMIN_JWT_SECRET3 = (ENV.cookieSecret || "") + "-admin";
            if (ADMIN_JWT_SECRET3 && ADMIN_JWT_SECRET3 !== "-admin") {
              try {
                const token = jwt3.sign(
                  { id: 1, username: user.name || user.email, email: user.email },
                  ADMIN_JWT_SECRET3,
                  { expiresIn: "24h" }
                );
                res.cookie(ADMIN_COOKIE_NAME3, token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "lax",
                  maxAge: 24 * 60 * 60 * 1e3,
                  path: "/"
                });
              } catch (e) {
                console.error("[Google Auth] Failed to set admin_session cookie:", e);
              }
            }
            console.log(`[Google Auth] User logged in successfully: ${user.email}`);
            return res.redirect("/admin");
          });
        })(req, res, next);
      }
    );
  } else {
    app.get("/api/auth/google", (req, res) => {
      res.status(503).json({
        error: "Google OAuth is not configured",
        message: "Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables"
      });
    });
    app.get("/api/auth/google/callback", (req, res) => {
      res.status(503).json({
        error: "Google OAuth is not configured",
        message: "Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables"
      });
    });
  }
  app.post("/api/auth/logout", (req, res) => {
    const ADMIN_COOKIE_NAME3 = "admin_session";
    res.clearCookie(ADMIN_COOKIE_NAME3, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    });
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ success: true });
    });
  });
  app.get("/api/auth/me", (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  });
  app.get("/api/admin/agency-leads", requireAdminAuth, async (req, res) => {
    try {
      const leads = await getAllAgencyLeads();
      res.json(leads);
    } catch (e) {
      console.error("[Admin] agency-leads error", e);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });
  app.get("/api/admin/stats", requireAdminAuth, async (req, res) => {
    try {
      const stats = await getAdminStats();
      res.json(stats);
    } catch (e) {
      console.error("[Admin] stats error", e);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });
  app.post("/api/admin/carousel-logos", requireAdminAuth, async (req, res) => {
    try {
      const { src, alt, url } = req.body || {};
      if (!src?.trim() || !alt?.trim()) return res.status(400).json({ error: "src and alt required" });
      const logo = await addLogo({ src: src.trim(), alt: alt.trim(), url: url?.trim() || void 0 });
      res.json(logo);
    } catch (e) {
      console.error("[Admin] carousel-logos add error", e);
      res.status(500).json({ error: e instanceof Error ? e.message : "Failed to add logo" });
    }
  });
  app.patch("/api/admin/carousel-logos", requireAdminAuth, async (req, res) => {
    try {
      const { id, src, alt, url, displayOrder } = req.body || {};
      if (!id) return res.status(400).json({ error: "id required" });
      const logo = await updateLogo({ id, src, alt, url, displayOrder });
      res.json(logo);
    } catch (e) {
      console.error("[Admin] carousel-logos update error", e);
      res.status(500).json({ error: e instanceof Error ? e.message : "Failed to update logo" });
    }
  });
  app.delete("/api/admin/carousel-logos/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: "id required" });
      await removeLogo(id);
      res.json({ success: true });
    } catch (e) {
      console.error("[Admin] carousel-logos delete error", e);
      res.status(500).json({ error: e instanceof Error ? e.message : "Failed to delete logo" });
    }
  });
  app.post("/api/admin/carousel-logos/reorder", requireAdminAuth, async (req, res) => {
    try {
      const order = req.body;
      if (!Array.isArray(order)) return res.status(400).json({ error: "order must be an array of { id, displayOrder }" });
      const logos = await reorderLogos(order);
      res.json(logos);
    } catch (e) {
      console.error("[Admin] carousel-logos reorder error", e);
      res.status(500).json({ error: e instanceof Error ? e.message : "Failed to reorder" });
    }
  });
  const CAROUSEL_LOGOS_DIR = path6.resolve(process.cwd(), "client", "public", "demo", "logos");
  const carouselLogoUpload = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => {
        if (!existsSync2(CAROUSEL_LOGOS_DIR)) mkdirSync(CAROUSEL_LOGOS_DIR, { recursive: true });
        cb(null, CAROUSEL_LOGOS_DIR);
      },
      filename: (_req, file, cb) => {
        const ext = path6.extname(file.originalname) || ".png";
        const base = path6.basename(file.originalname, path6.extname(file.originalname)).replace(/[^a-zA-Z0-9_-]/g, "_");
        cb(null, `${base}-${Date.now()}${ext}`);
      }
    }),
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      const ok = /^image\/(png|jpeg|jpg|gif|webp|svg\+xml)$/i.test(file.mimetype);
      cb(ok ? null : new Error("Format non support\xE9. Utilisez PNG, JPG, WebP ou SVG."), ok);
    }
  });
  app.post("/api/admin/carousel-logos/upload", requireAdminAuth, carouselLogoUpload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "Aucun fichier" });
    const publicPath = `/demo/logos/${req.file.filename}`;
    res.json({ path: publicPath });
  });
  app.get("/api/admin/analytics-config", requireAdminAuth, async (req, res) => {
    try {
      const db = await getDb();
      if (!db) return res.json([]);
      const configs = await db.select().from(analytics);
      res.json(Array.isArray(configs) ? configs : []);
    } catch (e) {
      console.error("[Admin] analytics-config GET error", e);
      res.status(500).json({ error: "Failed to fetch analytics config" });
    }
  });
  app.put("/api/admin/analytics-config", requireAdminAuth, async (req, res) => {
    try {
      const { provider, isEnabled, trackingId } = req.body || {};
      if (!provider || typeof isEnabled !== "boolean") {
        return res.status(400).json({ error: "provider and isEnabled required" });
      }
      const db = await getDb();
      if (!db) return res.status(503).json({ error: "Database not available" });
      const existing = await db.select().from(analytics).where(eq11(analytics.provider, provider)).limit(1);
      if (existing.length > 0) {
        await db.update(analytics).set({
          isEnabled,
          trackingId: trackingId ?? existing[0].trackingId,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq11(analytics.provider, provider));
      } else {
        await db.insert(analytics).values({
          provider,
          isEnabled,
          trackingId: trackingId || null
        });
      }
      res.json({ success: true });
    } catch (e) {
      console.error("[Admin] analytics-config PUT error", e);
      res.status(500).json({ error: "Failed to update analytics config" });
    }
  });
  app.get("/api/admin/leo-contacts", requireAdminAuth, async (req, res) => {
    try {
      const contacts = await getLeoContacts();
      res.json(contacts);
    } catch (e) {
      console.error("[Admin] leo-contacts error", e);
      res.status(500).json({ error: "Failed to fetch LEO contacts" });
    }
  });
  app.get("/api/admin/leo-analytics", requireAdminAuth, async (req, res) => {
    try {
      const sessions = await getLeoAnalytics();
      const totalSessions = sessions.length;
      const completedSessions = sessions.filter((s) => s.emailCaptured === 1).length;
      const completionRate = totalSessions > 0 ? completedSessions / totalSessions * 100 : 0;
      const totalMessages = sessions.reduce((sum, s) => sum + (s.messageCount || 0), 0);
      const avgMessages = totalSessions > 0 ? totalMessages / totalSessions : 0;
      const sessionsWithDuration = sessions.filter((s) => s.conversationDuration);
      const totalDuration = sessionsWithDuration.reduce((sum, s) => sum + (s.conversationDuration || 0), 0);
      const avgDuration = sessionsWithDuration.length > 0 ? totalDuration / sessionsWithDuration.length : 0;
      const byPage = {};
      sessions.forEach((session2) => {
        if (!byPage[session2.pageContext]) {
          byPage[session2.pageContext] = { total: 0, completed: 0, completionRate: 0, avgMessages: 0, avgDuration: 0 };
        }
        byPage[session2.pageContext].total++;
        if (session2.emailCaptured === 1) byPage[session2.pageContext].completed++;
      });
      Object.keys(byPage).forEach((page) => {
        const pageData = byPage[page];
        pageData.completionRate = pageData.total > 0 ? pageData.completed / pageData.total * 100 : 0;
        const pageSessions = sessions.filter((s) => s.pageContext === page);
        pageData.avgMessages = pageSessions.length > 0 ? pageSessions.reduce((sum, s) => sum + (s.messageCount || 0), 0) / pageSessions.length : 0;
        const withDur = pageSessions.filter((s) => s.conversationDuration);
        pageData.avgDuration = withDur.length > 0 ? withDur.reduce((sum, s) => sum + (s.conversationDuration || 0), 0) / withDur.length : 0;
      });
      const thirtyDaysAgo = /* @__PURE__ */ new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentSessionsForSeries = sessions.filter((s) => new Date(s.startedAt) >= thirtyDaysAgo);
      const dailyData = {};
      recentSessionsForSeries.forEach((session2) => {
        const date = new Date(session2.startedAt).toISOString().split("T")[0];
        if (!dailyData[date]) dailyData[date] = { date, sessions: 0, conversions: 0 };
        dailyData[date].sessions++;
        if (session2.emailCaptured === 1) dailyData[date].conversions++;
      });
      const timeSeriesData = Object.values(dailyData).sort((a, b) => a.date.localeCompare(b.date));
      res.json({
        overview: { totalSessions, completedSessions, completionRate, avgMessages, avgDuration },
        byPage,
        funnel: {
          started: totalSessions,
          engaged: sessions.filter((s) => (s.messageCount || 0) >= 3).length,
          qualified: sessions.filter((s) => (s.messageCount || 0) >= 5).length,
          converted: completedSessions
        },
        timeSeries: timeSeriesData,
        recentSessions: sessions.slice(0, 50)
      });
    } catch (e) {
      console.error("[Admin] leo-analytics error", e);
      res.status(500).json({ error: "Failed to fetch LEO analytics" });
    }
  });
  registerOAuthRoutes(app);
  app.use(sitemap_default);
  app.post("/api/init-db", initDatabase);
  app.post("/api/enable-projects", async (req, res) => {
    try {
      const { enableProjectsPage: enableProjectsPage2 } = await Promise.resolve().then(() => (init_enable_projects_page(), enable_projects_page_exports));
      await enableProjectsPage2();
      res.json({ success: true, message: "Projects pages enabled successfully" });
    } catch (error) {
      console.error("[API] Error enabling projects pages:", error);
      res.status(500).json({ error: error.message || "Failed to enable projects pages" });
    }
  });
  const PROJECTS_IMAGES_DIR2 = path6.resolve(process.cwd(), "client", "public", "projects");
  const USE_BUCKET = !!(process.env.BUILT_IN_FORGE_API_URL && process.env.BUILT_IN_FORGE_API_KEY);
  const multerStorage = USE_BUCKET ? multer.memoryStorage() : multer.diskStorage({
    destination: (req, file, cb) => {
      if (!existsSync2(PROJECTS_IMAGES_DIR2)) {
        mkdirSync(PROJECTS_IMAGES_DIR2, { recursive: true });
      }
      cb(null, PROJECTS_IMAGES_DIR2);
    },
    filename: (req, file, cb) => {
      const sanitized = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
      cb(null, sanitized);
    }
  });
  const imageFileFilter = (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp"
    ];
    const allowedExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;
    const isValidMime = allowedMimes.includes(file.mimetype);
    const isValidExtension = allowedExtensions.test(file.originalname);
    if (isValidMime && isValidExtension) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed."));
    }
  };
  const upload = multer({
    storage: multerStorage,
    limits: {
      fileSize: 10 * 1024 * 1024
      // 10MB max file size
    },
    fileFilter: imageFileFilter
  });
  app.post(
    "/api/admin/projects-images/upload",
    requireAdminAuth,
    (req, res, next) => {
      console.log("[ProjectsImages] Auth check passed, processing upload...");
      next();
    },
    upload.single("image"),
    async (req, res, next) => {
      try {
        console.log("[ProjectsImages] Upload request received", {
          hasFile: !!req.file,
          fileField: req.file?.fieldname,
          fileName: req.file?.originalname,
          fileSize: req.file?.size
        });
        if (!req.file) {
          console.error("[ProjectsImages] No file in request");
          return res.status(400).json({ error: "No file uploaded. Please select an image file." });
        }
        const sanitized = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filename = USE_BUCKET ? sanitized : req.file.filename;
        let fileBuffer;
        if (USE_BUCKET) {
          fileBuffer = req.file.buffer;
        } else {
          try {
            fileBuffer = await fs5.readFile(req.file.path);
          } catch (readError) {
            console.error("[ProjectsImages] Failed to read uploaded file:", readError);
          }
        }
        try {
          if (!existsSync2(PROJECTS_IMAGES_DIR2)) {
            mkdirSync(PROJECTS_IMAGES_DIR2, { recursive: true });
          }
          if (USE_BUCKET && fileBuffer) {
            await fs5.writeFile(
              path6.join(PROJECTS_IMAGES_DIR2, sanitized),
              fileBuffer
            );
          } else if (!USE_BUCKET) {
            const destPath = path6.join(PROJECTS_IMAGES_DIR2, filename);
            await fs5.rename(req.file.path, destPath);
          }
        } catch (localError) {
          console.error("[ProjectsImages] Failed to save locally:", localError);
          if (!USE_BUCKET && req.file.path) {
            try {
              await fs5.unlink(req.file.path);
            } catch (cleanupError) {
            }
          }
          return res.status(500).json({ error: "Failed to save image locally" });
        }
        if (USE_BUCKET && fileBuffer) {
          try {
            const { storagePut: storagePut2 } = await Promise.resolve().then(() => (init_storage(), storage_exports));
            const storageKey = `projects/${sanitized}`;
            const contentType = req.file.mimetype || "image/jpeg";
            await storagePut2(
              storageKey,
              fileBuffer,
              contentType
            );
            console.log(`[ProjectsImages] Image also saved to bucket: ${storageKey}`);
          } catch (bucketError) {
            console.warn("[ProjectsImages] Failed to save to bucket (non-critical):", bucketError);
          }
        }
        console.log("[ProjectsImages] Upload successful", {
          filename,
          url: `/projects/${filename}`,
          size: req.file.size
        });
        res.json({
          success: true,
          filename,
          originalName: req.file.originalname,
          size: req.file.size,
          url: `/projects/${filename}`,
          message: USE_BUCKET ? "Image uploaded successfully (local + bucket backup)" : "Image uploaded successfully"
        });
      } catch (error) {
        console.error("[ProjectsImages] Upload error:", error);
        console.error("[ProjectsImages] Error stack:", error.stack);
        if (error instanceof multer.MulterError) {
          if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ error: "File too large. Maximum size is 10MB" });
          }
          return res.status(400).json({ error: `Upload error: ${error.message}` });
        }
        res.status(500).json({ error: error.message || "Failed to upload image" });
      }
    }
  );
  app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      console.error("[Multer] error:", err.code, req.path);
      if (err.code === "LIMIT_FILE_SIZE") {
        const msg = req.path === "/api/admin/carousel-logos/upload" ? "Fichier trop volumineux (2 Mo max)" : "File too large. Maximum size is 10MB";
        return res.status(400).json({ error: msg });
      }
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    }
    if (err && req.path === "/api/admin/projects-images/upload") {
      console.error("[ProjectsImages] Upload middleware error:", err);
      return res.status(400).json({ error: err.message || "Upload failed" });
    }
    if (err && req.path === "/api/admin/carousel-logos/upload") {
      return res.status(400).json({ error: err.message || "Upload failed" });
    }
    next(err);
  });
  app.post("/api/csp-report", express2.json({ limit: "1mb" }), (req, res) => {
    if (process.env.NODE_ENV === "development" || process.env.LOG_CSP_VIOLATIONS === "true") {
      logger.warn("[CSP Violation]", {
        "csp-report": req.body,
        ip: req.ip,
        userAgent: req.get("user-agent")
      });
    }
    res.status(204).send();
  });
  const weatherLimiter = rateLimit({
    windowMs: 15 * 60 * 1e3,
    max: 30,
    message: { error: "Too many weather requests" },
    standardHeaders: true,
    legacyHeaders: false
  });
  function getClientIp(req) {
    const raw = req.get("x-forwarded-for");
    let ip;
    if (raw) {
      const parts = raw.split(",").map((s) => s.trim()).filter(Boolean);
      ip = parts.length ? parts[0] ?? parts[parts.length - 1] : void 0;
    }
    if (!ip) ip = req.ip || req.socket?.remoteAddress || void 0;
    if (!ip) return void 0;
    ip = ip.replace(/^::ffff:/, "");
    if (!ip || ip === "::1" || ip === "127.0.0.1") return void 0;
    return ip;
  }
  app.get("/api/weather", weatherLimiter, async (req, res) => {
    const clientIp = getClientIp(req);
    if (!clientIp) {
      const lat = 48.8566;
      const lon = 2.3522;
      const city = "Paris";
      const region = "\xCEle-de-France";
      const country = "France";
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
        const wRes = await fetch(url, { signal: AbortSignal.timeout(8e3) });
        if (!wRes.ok) return res.status(502).json({ error: "Weather service unavailable" });
        const j = await wRes.json();
        const temp = typeof j?.current?.temperature_2m === "number" ? Math.round(j.current.temperature_2m) : 24;
        const weatherCode = typeof j?.current?.weather_code === "number" ? j.current.weather_code : 0;
        return res.json({
          temperature: temp,
          weatherCode,
          city,
          region,
          country,
          locationLabel: `${city}, ${region}`
        });
      } catch (e) {
        logger.warn("[Weather] Open-Meteo failed (local fallback)", e);
        return res.status(502).json({ error: "Weather service unavailable" });
      }
    }
    let geo = null;
    try {
      const geoRes = await fetch(`https://ipapi.co/${clientIp}/json/`, {
        headers: { "Accept": "application/json", "User-Agent": "NukleoWeather/1.0" },
        signal: AbortSignal.timeout(8e3)
      });
      if (geoRes.ok) {
        const j2 = await geoRes.json();
        const lat = Number(j2.latitude);
        const lon = Number(j2.longitude);
        if (Number.isFinite(lat) && Number.isFinite(lon)) {
          geo = {
            city: j2.city ?? "",
            region: j2.region ?? j2.region_code ?? "",
            country: j2.country_name ?? j2.country ?? "",
            lat,
            lon
          };
        }
      }
      if (!geo) {
        const ipApiRes = await fetch(`http://ip-api.com/json/${clientIp}?fields=status,city,regionName,country,lat,lon`, {
          signal: AbortSignal.timeout(6e3)
        });
        if (ipApiRes.ok) {
          const j2 = await ipApiRes.json();
          if (j2.status === "success" && Number.isFinite(Number(j2.lat)) && Number.isFinite(Number(j2.lon))) {
            geo = {
              city: j2.city ?? "",
              region: j2.regionName ?? "",
              country: j2.country ?? "",
              lat: Number(j2.lat),
              lon: Number(j2.lon)
            };
          }
        }
      }
      if (!geo) {
        logger.warn("[Weather] Geo failed for both providers", { ip: clientIp });
        return res.status(502).json({ error: "Geolocation unavailable" });
      }
      const locationLabel = [geo.city, geo.region, geo.country].filter(Boolean).slice(0, 2).join(", ") || "Unknown";
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${geo.lat}&longitude=${geo.lon}&current=temperature_2m,weather_code`;
      const wRes = await fetch(weatherUrl, { signal: AbortSignal.timeout(8e3) });
      if (!wRes.ok) return res.status(502).json({ error: "Weather service unavailable" });
      const j = await wRes.json();
      const temp = typeof j?.current?.temperature_2m === "number" ? Math.round(j.current.temperature_2m) : null;
      const weatherCode = typeof j?.current?.weather_code === "number" ? j.current.weather_code : 0;
      if (temp === null) return res.status(502).json({ error: "Weather data invalid" });
      return res.json({
        temperature: temp,
        weatherCode,
        city: geo.city || "Unknown",
        region: geo.region,
        country: geo.country,
        locationLabel
      });
    } catch (e) {
      logger.warn("[Weather] Failed", { ip: clientIp, error: e instanceof Error ? e.message : e });
      return res.status(502).json({ error: "Weather service unavailable" });
    }
  });
  app.use("/api/trpc", generalLimiter);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  const projectsImagesPath = path6.resolve(process.cwd(), "client", "public", "projects");
  const distProjectsImagesPath = path6.resolve(process.cwd(), "dist", "public", "projects");
  if (!existsSync2(projectsImagesPath)) {
    try {
      mkdirSync(projectsImagesPath, { recursive: true });
      console.log(`[Static] Created projects directory: ${projectsImagesPath}`);
    } catch (error) {
      console.error(`[Static] Failed to create projects directory: ${projectsImagesPath}`, error);
    }
  }
  if (process.env.NODE_ENV === "production" && !existsSync2(distProjectsImagesPath)) {
    try {
      mkdirSync(distProjectsImagesPath, { recursive: true });
      console.log(`[Static] Created dist projects directory: ${distProjectsImagesPath}`);
    } catch (error) {
      console.error(`[Static] Failed to create dist projects directory: ${distProjectsImagesPath}`, error);
    }
  }
  if (process.env.NODE_ENV === "development") {
    app.get("/api/debug/auth-check", (req, res) => {
      const isPassportAuth = req.isAuthenticated && req.isAuthenticated();
      const ADMIN_COOKIE_NAME3 = "admin_session";
      const ADMIN_JWT_SECRET3 = process.env.JWT_SECRET + "-admin";
      const adminToken = req.cookies?.[ADMIN_COOKIE_NAME3];
      let isJwtAuth = false;
      if (adminToken && ADMIN_JWT_SECRET3 && ADMIN_JWT_SECRET3 !== "-admin") {
        try {
          const jwt4 = __require("jsonwebtoken");
          const decoded = jwt4.verify(adminToken, ADMIN_JWT_SECRET3);
          isJwtAuth = !!(decoded && decoded.id);
        } catch (error) {
        }
      }
      res.json({
        authenticated: isPassportAuth || isJwtAuth,
        passportAuth: isPassportAuth,
        jwtAuth: isJwtAuth,
        hasCookie: !!adminToken,
        cookieName: ADMIN_COOKIE_NAME3
      });
    });
    app.get("/api/debug/projects-images", async (req, res) => {
      try {
        const files = existsSync2(projectsImagesPath) ? await fs5.readdir(projectsImagesPath) : [];
        const imageFiles = files.filter(
          (file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
        );
        res.json({
          path: projectsImagesPath,
          exists: existsSync2(projectsImagesPath),
          files: imageFiles,
          total: imageFiles.length,
          cwd: process.cwd(),
          nodeEnv: process.env.NODE_ENV
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    app.get("/api/debug/projects-images-trpc", async (req, res) => {
      try {
        const { listImages: listImages2 } = await Promise.resolve().then(() => (init_projectsImages(), projectsImages_exports));
        const result = await listImages2();
        res.json({
          success: true,
          count: result.length,
          images: result
        });
      } catch (error) {
        console.error("[Debug] Error calling listImages:", error);
        res.status(500).json({
          error: error.message,
          stack: error.stack
        });
      }
    });
  }
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  app.use("/projects", (req, res, next) => {
    if (req.path === "/" || req.path === "") {
      return next();
    }
    const requestedFile = req.path.replace(/^\//, "");
    if (requestedFile.endsWith("/")) {
      return next();
    }
    if (!/\.(png|jpg|jpeg|gif|webp)$/i.test(requestedFile)) {
      return next();
    }
    let filePath = path6.join(projectsImagesPath, requestedFile);
    let foundPath = null;
    if (existsSync2(filePath)) {
      foundPath = filePath;
    } else if (process.env.NODE_ENV === "production") {
      const distFilePath = path6.join(distProjectsImagesPath, requestedFile);
      if (existsSync2(distFilePath)) {
        foundPath = distFilePath;
      }
    }
    console.log(`[Projects] Request: ${req.method} ${req.path} -> ${filePath}${foundPath ? ` (found: ${foundPath})` : " (not found)"}`);
    if (foundPath) {
      filePath = foundPath;
      try {
        const stats = __require("fs").statSync(filePath);
        if (stats.isFile()) {
          console.log(`[Projects] \u2713 Serving: ${filePath} (${stats.size} bytes)`);
          res.setHeader("Cache-Control", "public, max-age=31536000, stale-while-revalidate=86400");
          res.setHeader("Vary", "Accept");
          const ext = path6.extname(filePath).toLowerCase();
          if (ext === ".jpg" || ext === ".jpeg") {
            res.setHeader("Content-Type", "image/jpeg");
          } else if (ext === ".png") {
            res.setHeader("Content-Type", "image/png");
          } else if (ext === ".gif") {
            res.setHeader("Content-Type", "image/gif");
          } else if (ext === ".webp") {
            res.setHeader("Content-Type", "image/webp");
          }
          return res.sendFile(filePath, (err) => {
            if (err) {
              console.error(`[Projects] \u2717 Error serving file: ${err.message}`);
              if (!res.headersSent) {
                next(err);
              }
            }
          });
        }
      } catch (statError) {
        console.error(`[Projects] \u2717 Error checking file stats: ${statError}`);
      }
    }
    console.log(`[Projects] \u2717 File not found: ${filePath}`);
    return res.status(404).send("Image not found");
  });
  console.log(`[Static] Serving project images from: ${projectsImagesPath}${process.env.NODE_ENV === "production" ? ` and ${distProjectsImagesPath}` : ""}`);
  app.get("/en", (req, res) => {
    res.redirect(301, "/");
  });
  app.get("/en/", (req, res) => {
    res.redirect(301, "/");
  });
  if (process.env.NODE_ENV !== "development") {
    const distPath = path6.resolve(process.cwd(), "dist", "public");
    app.get("*", async (req, res) => {
      const isAssetFile = req.path.startsWith("/assets/") || req.path.startsWith("/fonts/") || req.path.startsWith("/images/") || req.path.match(/\.(js|css|woff2?|eot|ttf|otf|png|jpg|jpeg|gif|svg|ico|webp)$/i);
      const isProjectsImage = req.path.startsWith("/projects/") && req.path.match(/\.(png|jpg|jpeg|gif|webp)$/i);
      if (isAssetFile || isProjectsImage) {
        return res.status(404).send("File not found");
      }
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.setHeader("X-Content-Type-Options", "nosniff");
      const indexPath = path6.resolve(distPath, "index.html");
      if (!existsSync2(indexPath)) {
        logger.error(`[Static] index.html not found at ${indexPath}`);
        return res.status(500).send("Application not available. Please try again later.");
      }
      try {
        const htmlContent = await fs5.readFile(indexPath, "utf-8");
        const assetsJsPath = path6.join(distPath, "assets", "js");
        if (existsSync2(assetsJsPath)) {
          const availableChunks = new Set(readdirSync(assetsJsPath).filter((f) => f.endsWith(".js")));
          const chunkRefs = /* @__PURE__ */ new Set();
          const scriptSrcRegex = /<script[^>]+src=["']([^"']+\.js[^"']*)["']/gi;
          let match;
          while ((match = scriptSrcRegex.exec(htmlContent)) !== null) {
            const src = match[1].split("?")[0].split("#")[0];
            if (src.includes("/assets/js/")) {
              const chunkName = path6.basename(src);
              chunkRefs.add(chunkName);
            }
          }
          const linkPreloadRegex = /<link[^>]+href=["']([^"']+\.js[^"']*)["']/gi;
          while ((match = linkPreloadRegex.exec(htmlContent)) !== null) {
            const src = match[1].split("?")[0].split("#")[0];
            if (src.includes("/assets/js/")) {
              const chunkName = path6.basename(src);
              chunkRefs.add(chunkName);
            }
          }
          const inlineScriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
          while ((match = inlineScriptRegex.exec(htmlContent)) !== null) {
            const scriptContent = match[1];
            const importRegex = /(?:import\(|import\.meta\.resolve\(|["'])([^"']*\/assets\/js\/[^"']+\.js[^"']*)/gi;
            let importMatch;
            while ((importMatch = importRegex.exec(scriptContent)) !== null) {
              const src = importMatch[1].split("?")[0].split("#")[0];
              if (src.includes("/assets/js/")) {
                const chunkName = path6.basename(src);
                chunkRefs.add(chunkName);
              }
            }
          }
          const missingChunks = [];
          for (const chunkRef of chunkRefs) {
            if (!availableChunks.has(chunkRef)) {
              missingChunks.push(chunkRef);
            }
          }
          if (chunkRefs.size > 0) {
            logger.info(`[Static] Verified ${chunkRefs.size} chunk references in HTML, ${missingChunks.length} missing`);
          }
          if (missingChunks.length > 0) {
            logger.error(`[Static] \u26A0\uFE0F CRITICAL: HTML references ${missingChunks.length} missing chunks:`, missingChunks);
            logger.error(`[Static] Available chunks: ${Array.from(availableChunks).slice(0, 10).join(", ")}...`);
            logger.error(`[Static] This will cause "Failed to fetch dynamically imported module" errors.`);
            logger.error(`[Static] The build is incomplete. Please rebuild the application.`);
            let cleanedHtml = htmlContent;
            for (const missingChunk of missingChunks) {
              const scriptRegex = new RegExp(`<script[^>]+src=["'][^"']*${missingChunk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^"']*["'][^>]*></script>`, "gi");
              cleanedHtml = cleanedHtml.replace(scriptRegex, "");
              const linkRegex = new RegExp(`<link[^>]+href=["'][^"']*${missingChunk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^"']*["'][^>]*>`, "gi");
              cleanedHtml = cleanedHtml.replace(linkRegex, "");
              logger.warn(`[Static] Removed reference to missing chunk: ${missingChunk}`);
            }
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            return res.send(cleanedHtml);
          }
        }
        res.sendFile(indexPath);
      } catch (error) {
        logger.error(`[Static] Error reading/verifying index.html:`, error);
        res.sendFile(indexPath);
      }
    });
  }
  app.use((err, req, res, next) => {
    const errorMessage = err?.message || String(err) || "Unknown error";
    const errorStack = err?.stack || "No stack trace";
    const errorName = err?.name || "Error";
    const errorCode = err?.code || null;
    logger.error(`[ERROR HANDLER] ${errorName}: ${errorMessage}`, {
      error: errorMessage,
      name: errorName,
      code: errorCode,
      stack: errorStack,
      url: req.url,
      method: req.method,
      path: req.path,
      body: req.body ? JSON.stringify(req.body).substring(0, 500) : void 0,
      query: Object.keys(req.query).length > 0 ? req.query : void 0,
      params: Object.keys(req.params).length > 0 ? req.params : void 0,
      headers: {
        "user-agent": req.get("user-agent"),
        "content-type": req.get("content-type")
      }
    });
    console.error("[ERROR HANDLER] Full error details:", {
      message: errorMessage,
      name: errorName,
      code: errorCode,
      stack: errorStack,
      url: req.url
    });
    if (process.env.SENTRY_DSN && err instanceof Error) {
      Sentry.captureException(err, {
        tags: {
          errorCode: errorCode || "UNKNOWN",
          errorName
        },
        extra: {
          url: req.url,
          method: req.method,
          statusCode: res.statusCode
        },
        level: "error"
      });
    }
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({
      error: "Internal Server Error",
      message: process.env.NODE_ENV === "production" ? "An unexpected error occurred" : errorMessage,
      ...errorCode && { code: errorCode }
    });
  });
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, async () => {
    logger.info(`Server running on http://localhost:${port}/`);
    if (!dbAvailable) {
      logger.warn("\u26A0\uFE0F Database not available. Server running in degraded mode (static files only).");
      logger.warn("\u26A0\uFE0F Database features will be unavailable until connection is restored.");
      logger.warn("\u26A0\uFE0F Sessions are stored in memory (will be lost on restart).");
      return;
    }
    if (process.env.DATABASE_URL) {
      try {
        logger.info("[Server] Initializing database tables...");
        const mockReq = {
          body: {}
        };
        const mockRes = {
          status: (code) => ({
            json: (data) => {
              if (code === 200) {
                logger.info("[Server] \u2705 Database tables initialized successfully");
              } else {
                const errorMsg = data?.error || data?.details || "Unknown error";
                logger.error(`[Server] \u26A0\uFE0F Database initialization failed: ${errorMsg}`);
              }
            }
          }),
          json: (data) => {
            logger.info("[Server] \u2705 Database tables initialized successfully");
          }
        };
        await initDatabase(mockReq, mockRes);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        logger.error(`[Server] \u26A0\uFE0F Failed to initialize database: ${errorMsg}`);
        return;
      }
    }
    try {
      const { seedLoaders: seedLoaders2 } = await Promise.resolve().then(() => (init_seed_loaders(), seed_loaders_exports));
      await seedLoaders2();
      const { seedCreativeLoaders: seedCreativeLoaders2 } = await Promise.resolve().then(() => (init_seed_creative_loaders(), seed_creative_loaders_exports));
      await seedCreativeLoaders2();
      const { seedCrazyLoaders: seedCrazyLoaders2 } = await Promise.resolve().then(() => (init_seed_crazy_loaders(), seed_crazy_loaders_exports));
      await seedCrazyLoaders2();
      try {
        if (process.env.DATABASE_URL) {
          const client = postgres3(process.env.DATABASE_URL);
          const tableCheck = await client`
            SELECT EXISTS (
              SELECT FROM information_schema.tables 
              WHERE table_schema = 'public' 
              AND table_name = 'radar_technologies'
            ) as exists;
          `;
          const tableExists = Array.isArray(tableCheck) && tableCheck.length > 0 && tableCheck[0]?.exists;
          if (!tableExists) {
            logger.info("Radar tables not found, creating them...");
            await client.unsafe(`
              CREATE TABLE IF NOT EXISTS radar_technologies (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                slug VARCHAR(255) NOT NULL UNIQUE,
                description TEXT NOT NULL,
                "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
              );
            `);
            await client.unsafe(`
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
            await client.unsafe(`
              CREATE INDEX IF NOT EXISTS idx_radar_positions_technology_date 
              ON radar_positions("technologyId", date DESC);
            `);
            await client.unsafe(`
              CREATE TABLE IF NOT EXISTS ai_news_subscribers (
                id SERIAL PRIMARY KEY,
                email VARCHAR(320) NOT NULL UNIQUE,
                source VARCHAR(100) DEFAULT 'ai-trend-radar' NOT NULL,
                "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
              );
            `);
            await client.end();
            logger.info("Radar tables created successfully");
          } else {
            await client.end();
          }
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        logger.error(`Failed to initialize radar tables: ${errorMsg}`);
      }
      try {
        const { seedRadarTechnologies: seedRadarTechnologies2 } = await Promise.resolve().then(() => (init_radar(), radar_exports));
        await seedRadarTechnologies2();
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        logger.error(`Failed to seed radar technologies: ${errorMsg}`);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      logger.error(`Failed to seed loaders: ${errorMsg}`);
    }
    setupRadarDailyRefresh();
  });
}
function setupRadarDailyRefresh() {
  const refreshRadar = async () => {
    try {
      const { appRouter: appRouter2 } = await Promise.resolve().then(() => (init_routers(), routers_exports));
      const { createContext: createContext2 } = await Promise.resolve().then(() => (init_context(), context_exports));
      const mockReq = { headers: {}, cookies: {} };
      const mockRes = { setHeader: () => {
      }, cookie: () => {
      } };
      const context = await createContext2({ req: mockReq, res: mockRes });
      const caller = appRouter2.createCaller(context);
      await caller.radar.refreshDaily();
      logger.info("Radar daily refresh completed successfully");
    } catch (error) {
      logger.error("Radar daily refresh failed:", error);
    }
  };
  const now = /* @__PURE__ */ new Date();
  const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 6e4);
  const nextRefresh = new Date(utcNow);
  nextRefresh.setUTCHours(2, 0, 0, 0);
  if (nextRefresh <= utcNow) {
    nextRefresh.setUTCDate(nextRefresh.getUTCDate() + 1);
  }
  const msUntilRefresh = nextRefresh.getTime() - utcNow.getTime();
  setTimeout(() => {
    refreshRadar();
    setInterval(refreshRadar, 24 * 60 * 60 * 1e3);
  }, msUntilRefresh);
  logger.info(`Radar daily refresh scheduled for ${nextRefresh.toISOString()}`);
}
startServer().catch((error) => {
  const errorMsg = error instanceof Error ? error.message : "Unknown error";
  logger.error(`Failed to start server: ${errorMsg}`);
  process.exit(1);
});
