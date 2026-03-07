import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import path from "path";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import sitemapRouter from "../sitemap";
import { serveStatic, setupVite } from "./vite";
import { initDatabase } from "../init-db";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import compression from "compression";
import { logger } from "./logger";
import { initSentry, Sentry } from "./sentry";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
import { configureGoogleAuth, requireAdminAuth } from "./googleAuth";
import { getDb, getAllAgencyLeads, getLeoAnalytics, getLeoContacts, getAdminStats } from "../db";
import { addLogo, updateLogo, removeLogo, reorderLogos } from "../carouselLogosApi";
import { getUnionVideoPath, getUnionVideoDir } from "../unionVideoApi";
import { getPressReleasePath, getPressReleaseDir } from "../pressReleaseApi";
import { analytics } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { sql } from "drizzle-orm";
import multer from "multer";
import { promises as fs } from "fs";
import { existsSync, mkdirSync, readdirSync } from "fs";
import { csrfTokenMiddleware, validateCSRF } from "./csrf";
import jwt from "jsonwebtoken";
import { ENV } from "./env";

/**
 * Vérifie si un port est disponible pour l'écoute.
 * 
 * @param port - Le numéro de port à vérifier
 * @returns Promise qui se résout à true si le port est disponible, false sinon
 */
function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

/**
 * Trouve un port disponible en commençant par le port de départ.
 * 
 * @param startPort - Le port de départ (défaut: 3000)
 * @returns Promise qui se résout au numéro de port disponible
 * @throws Error si aucun port disponible n'est trouvé dans la plage (20 ports)
 * 
 * @example
 * const port = await findAvailablePort(3000); // Cherche un port disponible à partir de 3000
 */
async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

// Helper function to check database connection
async function checkDatabaseConnection(): Promise<boolean> {
  if (!process.env.DATABASE_URL) {
    return false;
  }
  
  try {
    const { getDb } = await import("../db");
    const db = await getDb();
    if (!db) {
      return false;
    }
    
    // Try a simple query to verify connection
    await db.execute(sql`SELECT 1`);
    return true;
  } catch (error) {
    // Don't log full error details to avoid rate limiting
    const errorCode = error instanceof Error && 'code' in error ? (error as any).code : 'UNKNOWN';
    if (errorCode === 'ECONNREFUSED') {
      logger.warn("Database connection refused. Check DATABASE_URL and ensure database is running.");
    }
    return false;
  }
}

async function startServer() {
  // Initialize Sentry for error monitoring
  initSentry();
  
  // Check database connection early to determine session store
  const dbAvailable = await checkDatabaseConnection();
  
  const app = express();
  const server = createServer(app);
  
  // Trust proxy for Railway/production environments
  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
  }
  
  // Sentry request handler (must be first)
  // Track requests and user context
  if (process.env.SENTRY_DSN) {
    app.use((req, res, next) => {
      Sentry.setUser({
        ip_address: req.ip,
      });
      Sentry.setContext('request', {
        method: req.method,
        url: req.url,
        headers: {
          'user-agent': req.get('user-agent'),
        },
      });
      next();
    });
  }
  
  // Compression (gzip/brotli)
  app.use(compression({ level: 9 }));
  
  // Security: Helmet for HTTP headers
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
        upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
        // CSP Reporting - log violations for monitoring (optional endpoint)
        reportUri: process.env.CSP_REPORT_URI || '/api/csp-report',
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    crossOriginEmbedderPolicy: false, // Allow embedding for OAuth
  }));
  
  // Security: CORS configuration
  app.use(cors({
    origin: process.env.NODE_ENV === 'production'
      ? [
          'https://nukleo.digital',
          'https://nukleodigital-production.up.railway.app',
          'https://www.nukleo.digital',
          'https://ingenious-rebirth-production-7f81.up.railway.app',
          /^https:\/\/[a-z0-9-]+\.up\.railway\.app$/,
        ]
      : true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  }));
  
  // Security: Rate limiting - General (200 req/15min for API batch calls)
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).setHeader('Content-Type', 'application/json').send(
        JSON.stringify({ error: 'Too many requests from this IP, please try again later.' })
      );
    },
  });
  
  // Security: Rate limiting - Auth (20 req/15min)
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).setHeader('Content-Type', 'application/json').send(
        JSON.stringify({ error: 'Too many authentication attempts, please try again later.' })
      );
    },
  });
  
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Configure cookie parser for admin authentication
  app.use(cookieParser());
  
  // Configure session for Passport
  // Use PostgreSQL store if DB is available, otherwise use MemoryStore
  let sessionStore: session.Store;
  
  if (dbAvailable && process.env.DATABASE_URL) {
    try {
      // Use PostgreSQL store only if DB is available
      const PgSession = connectPgSimple(session);
      sessionStore = new PgSession({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: true,
        tableName: 'session',
      });
      logger.info("Using PostgreSQL session store");
    } catch (error) {
      // If PostgreSQL store fails, use MemoryStore
      logger.warn("PostgreSQL session store unavailable, using MemoryStore");
      const MemoryStore = session.MemoryStore;
      sessionStore = new MemoryStore();
    }
  } else {
    // DB not available, use MemoryStore
    logger.warn("Database not available, using MemoryStore for sessions (sessions will be lost on restart)");
    if (process.env.NODE_ENV === 'production') {
      logger.warn("In production, set DATABASE_URL for persistent sessions and full features. Currently using in-memory sessions (not suitable for production).");
    }
    const MemoryStore = session.MemoryStore;
    sessionStore = new MemoryStore();
  }
  
  app.use(session({
    store: sessionStore,
    secret: process.env.JWT_SECRET || 'nukleo-admin-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'lax',
    },
  }));
  
  // CSRF protection - add token to session (must be after session middleware)
  app.use(csrfTokenMiddleware);
  
  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());
  const googleAuthConfigured = configureGoogleAuth();
  
  // Google OAuth routes - only register if Google Auth is configured
  if (googleAuthConfigured) {
    app.get('/api/auth/google', authLimiter, (req, res, next) => {
      console.log(`[Google Auth] OAuth request initiated from: ${req.get('referer') || 'unknown'}`);
      passport.authenticate('google', {
        scope: ['profile', 'email'],
      })(req, res, next);
    });
    
    app.get('/api/auth/google/callback',
      (req, res, next) => {
        console.log(`[Google Auth] Callback received with code: ${req.query.code ? 'present' : 'missing'}`);
        console.log(`[Google Auth] Callback error: ${req.query.error || 'none'}`);
        passport.authenticate('google', { 
          failureRedirect: '/admin/login?error=unauthorized',
          failureFlash: false,
        }, (err, user, info) => {
          if (err) {
            console.error('[Google Auth] Authentication error:', err);
            return res.redirect(`/admin/login?error=${encodeURIComponent(err.message || 'authentication_failed')}`);
          }
          if (!user) {
            console.error('[Google Auth] Authentication failed:', info);
            return res.redirect(`/admin/login?error=${encodeURIComponent(info?.message || 'unauthorized')}`);
          }
          req.logIn(user, (loginErr) => {
            if (loginErr) {
              console.error('[Google Auth] Login error:', loginErr);
              return res.redirect(`/admin/login?error=${encodeURIComponent(loginErr.message || 'login_failed')}`);
            }
            // Set admin_session JWT cookie so tRPC context recognizes admin (fixes Railway session not sent with tRPC)
            const ADMIN_COOKIE_NAME = "admin_session";
            const ADMIN_JWT_SECRET = (ENV.cookieSecret || "") + "-admin";
            if (ADMIN_JWT_SECRET && ADMIN_JWT_SECRET !== "-admin") {
              try {
                const token = jwt.sign(
                  { id: 1, username: user.name || user.email, email: user.email },
                  ADMIN_JWT_SECRET,
                  { expiresIn: "24h" }
                );
                res.cookie(ADMIN_COOKIE_NAME, token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "lax",
                  maxAge: 24 * 60 * 60 * 1000,
                  path: "/",
                });
              } catch (e) {
                console.error("[Google Auth] Failed to set admin_session cookie:", e);
              }
            }
            console.log(`[Google Auth] User logged in successfully: ${user.email}`);
            return res.redirect('/admin');
          });
        })(req, res, next);
      }
    );
  } else {
    // Return helpful error if Google Auth is not configured
    app.get('/api/auth/google', (req, res) => {
      res.status(503).json({ 
        error: 'Google OAuth is not configured',
        message: 'Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables'
      });
    });
    
    app.get('/api/auth/google/callback', (req, res) => {
      res.status(503).json({ 
        error: 'Google OAuth is not configured',
        message: 'Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables'
      });
    });
  }
  
  // Logout route
  app.post('/api/auth/logout', (req, res) => {
    // Clear admin_session JWT cookie so tRPC no longer sees admin
    const ADMIN_COOKIE_NAME = "admin_session";
    res.clearCookie(ADMIN_COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      res.json({ success: true });
    });
  });
  
  // Check auth status
  app.get('/api/auth/me', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      res.status(401).json({ error: 'Not authenticated' });
    }
  });

  // Admin: agency leads (REST, same auth as /api/auth/me — avoids tRPC session issues on Railway)
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

  // Admin: carousel logos mutations (REST, same auth — so delete/add/update/reorder work on Railway)
  app.post("/api/admin/carousel-logos", requireAdminAuth, async (req, res) => {
    try {
      const { src, alt, url } = req.body || {};
      if (!src?.trim() || !alt?.trim()) return res.status(400).json({ error: "src and alt required" });
      const logo = await addLogo({ src: src.trim(), alt: alt.trim(), url: url?.trim() || undefined });
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

  const CAROUSEL_LOGOS_DIR = path.resolve(process.cwd(), "client", "public", "demo", "logos");
  const carouselLogoUpload = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => {
        if (!existsSync(CAROUSEL_LOGOS_DIR)) mkdirSync(CAROUSEL_LOGOS_DIR, { recursive: true });
        cb(null, CAROUSEL_LOGOS_DIR);
      },
      filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname) || ".png";
        const base = path.basename(file.originalname, path.extname(file.originalname)).replace(/[^a-zA-Z0-9_-]/g, "_");
        cb(null, `${base}-${Date.now()}${ext}`);
      },
    }),
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      const ok = /^image\/(png|jpeg|jpg|gif|webp|svg\+xml)$/i.test(file.mimetype);
      cb(ok ? null : new Error("Format non supporté. Utilisez PNG, JPG, WebP ou SVG."), ok);
    },
  });
  app.post("/api/admin/carousel-logos/upload", requireAdminAuth, carouselLogoUpload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "Aucun fichier" });
    const publicPath = `/demo/logos/${req.file.filename}`;
    res.json({ path: publicPath });
  });

  // Union section video (public + admin upload)
  app.get("/api/union-video", async (_req, res) => {
    try {
      const path = await getUnionVideoPath();
      res.json({ path });
    } catch (e) {
      console.error("[UnionVideo] GET error", e);
      res.json({ path: null });
    }
  });

  const UNION_VIDEO_DIR = getUnionVideoDir();
  const unionVideoUpload = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => {
        if (!existsSync(UNION_VIDEO_DIR)) mkdirSync(UNION_VIDEO_DIR, { recursive: true });
        cb(null, UNION_VIDEO_DIR);
      },
      filename: (_req, file, cb) => {
        const ext = /\.(mp4|webm)$/i.test(file.originalname) ? path.extname(file.originalname).toLowerCase() : ".mp4";
        cb(null, `union-video${ext}`);
      },
    }),
    limits: { fileSize: 100 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      const ok = /^video\/(mp4|webm)$/i.test(file.mimetype);
      cb(ok ? null : new Error("Format non supporté. Utilisez MP4 ou WebM."), ok);
    },
  });
  app.post("/api/admin/union-video/upload", requireAdminAuth, unionVideoUpload.single("video"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "Aucun fichier vidéo" });
    res.json({ path: `/demo/${req.file.filename}` });
  });

  // Press release PDF (public + admin upload)
  app.get("/api/press-release", async (_req, res) => {
    try {
      const path = await getPressReleasePath();
      res.json({ path });
    } catch (e) {
      console.error("[PressRelease] GET error", e);
      res.json({ path: null });
    }
  });

  const PRESS_RELEASE_DIR = getPressReleaseDir();
  const pressReleaseUpload = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => {
        if (!existsSync(PRESS_RELEASE_DIR)) mkdirSync(PRESS_RELEASE_DIR, { recursive: true });
        cb(null, PRESS_RELEASE_DIR);
      },
      filename: (_req, _file, cb) => {
        cb(null, "press-release.pdf");
      },
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      const ok = file.mimetype === "application/pdf";
      cb(ok ? null : new Error("Format non supporté. Utilisez un fichier PDF."), ok);
    },
  });
  app.post("/api/admin/press-release/upload", requireAdminAuth, pressReleaseUpload.single("pdf"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "Aucun fichier PDF" });
    res.json({ path: `/demo/${req.file.filename}` });
  });

  // Admin: analytics config (REST, same auth)
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
      const existing = await db.select().from(analytics).where(eq(analytics.provider, provider)).limit(1);
      if (existing.length > 0) {
        await db.update(analytics).set({
          isEnabled,
          trackingId: trackingId ?? existing[0].trackingId,
          updatedAt: new Date(),
        }).where(eq(analytics.provider, provider));
      } else {
        await db.insert(analytics).values({
          provider,
          isEnabled,
          trackingId: trackingId || null,
        });
      }
      res.json({ success: true });
    } catch (e) {
      console.error("[Admin] analytics-config PUT error", e);
      res.status(500).json({ error: "Failed to update analytics config" });
    }
  });

  // Admin: LEO contacts (REST, same auth — avoids tRPC session issues on Railway)
  app.get("/api/admin/leo-contacts", requireAdminAuth, async (req, res) => {
    try {
      const contacts = await getLeoContacts();
      res.json(contacts);
    } catch (e) {
      console.error("[Admin] leo-contacts error", e);
      res.status(500).json({ error: "Failed to fetch LEO contacts" });
    }
  });

  // Admin: LEO analytics (REST, same auth — computed same as leoAnalytics router)
  app.get("/api/admin/leo-analytics", requireAdminAuth, async (req, res) => {
    try {
      const sessions = await getLeoAnalytics();
      const totalSessions = sessions.length;
      const completedSessions = sessions.filter((s: { emailCaptured: number }) => s.emailCaptured === 1).length;
      const completionRate = totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0;
      const totalMessages = sessions.reduce((sum: number, s: { messageCount?: number }) => sum + (s.messageCount || 0), 0);
      const avgMessages = totalSessions > 0 ? totalMessages / totalSessions : 0;
      const sessionsWithDuration = sessions.filter((s: { conversationDuration?: number }) => s.conversationDuration);
      const totalDuration = sessionsWithDuration.reduce((sum: number, s: { conversationDuration?: number }) => sum + (s.conversationDuration || 0), 0);
      const avgDuration = sessionsWithDuration.length > 0 ? totalDuration / sessionsWithDuration.length : 0;
      const byPage: Record<string, { total: number; completed: number; completionRate: number; avgMessages: number; avgDuration: number }> = {};
      sessions.forEach((session: { pageContext: string; emailCaptured: number }) => {
        if (!byPage[session.pageContext]) {
          byPage[session.pageContext] = { total: 0, completed: 0, completionRate: 0, avgMessages: 0, avgDuration: 0 };
        }
        byPage[session.pageContext].total++;
        if (session.emailCaptured === 1) byPage[session.pageContext].completed++;
      });
      Object.keys(byPage).forEach(page => {
        const pageData = byPage[page];
        pageData.completionRate = pageData.total > 0 ? (pageData.completed / pageData.total) * 100 : 0;
        const pageSessions = sessions.filter((s: { pageContext: string }) => s.pageContext === page);
        pageData.avgMessages = pageSessions.length > 0 ? pageSessions.reduce((sum: number, s: { messageCount?: number }) => sum + (s.messageCount || 0), 0) / pageSessions.length : 0;
        const withDur = pageSessions.filter((s: { conversationDuration?: number }) => s.conversationDuration);
        pageData.avgDuration = withDur.length > 0 ? withDur.reduce((sum: number, s: { conversationDuration?: number }) => sum + (s.conversationDuration || 0), 0) / withDur.length : 0;
      });
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentSessionsForSeries = sessions.filter((s: { startedAt: Date }) => new Date(s.startedAt) >= thirtyDaysAgo);
      const dailyData: Record<string, { date: string; sessions: number; conversions: number }> = {};
      recentSessionsForSeries.forEach((session: { startedAt: Date; emailCaptured: number }) => {
        const date = new Date(session.startedAt).toISOString().split("T")[0];
        if (!dailyData[date]) dailyData[date] = { date, sessions: 0, conversions: 0 };
        dailyData[date].sessions++;
        if (session.emailCaptured === 1) dailyData[date].conversions++;
      });
      const timeSeriesData = Object.values(dailyData).sort((a, b) => a.date.localeCompare(b.date));
      res.json({
        overview: { totalSessions, completedSessions, completionRate, avgMessages, avgDuration },
        byPage,
        funnel: {
          started: totalSessions,
          engaged: sessions.filter((s: { messageCount?: number }) => (s.messageCount || 0) >= 3).length,
          qualified: sessions.filter((s: { messageCount?: number }) => (s.messageCount || 0) >= 5).length,
          converted: completedSessions,
        },
        timeSeries: timeSeriesData,
        recentSessions: sessions.slice(0, 50),
      });
    } catch (e) {
      console.error("[Admin] leo-analytics error", e);
      res.status(500).json({ error: "Failed to fetch LEO analytics" });
    }
  });

  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // Sitemap and robots.txt
  app.use(sitemapRouter);
  // Database initialization endpoint
  app.post("/api/init-db", initDatabase);
  
  // Temporary endpoint to enable projects page (can be removed after use)
  app.post("/api/enable-projects", async (req, res) => {
    try {
      const { enableProjectsPage } = await import("../enable-projects-page");
      await enableProjectsPage();
      res.json({ success: true, message: "Projects pages enabled successfully" });
    } catch (error: any) {
      console.error("[API] Error enabling projects pages:", error);
      res.status(500).json({ error: error.message || "Failed to enable projects pages" });
    }
  });

  // Projects images upload endpoint (admin only)
  const PROJECTS_IMAGES_DIR = path.resolve(process.cwd(), "client", "public", "projects");
  const USE_BUCKET = !!(process.env.BUILT_IN_FORGE_API_URL && process.env.BUILT_IN_FORGE_API_KEY);
  
  // Configure multer - use memory storage for bucket uploads, disk storage for local
  const multerStorage = USE_BUCKET 
    ? multer.memoryStorage()
    : multer.diskStorage({
        destination: (req, file, cb) => {
          if (!existsSync(PROJECTS_IMAGES_DIR)) {
            mkdirSync(PROJECTS_IMAGES_DIR, { recursive: true });
          }
          cb(null, PROJECTS_IMAGES_DIR);
        },
        filename: (req, file, cb) => {
          // Keep original filename, sanitize it
          const sanitized = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
          cb(null, sanitized);
        },
      });
  
  // File filter for image validation - checks both extension and MIME type
  const imageFileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Allowed MIME types
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ];
    
    // Allowed file extensions
    const allowedExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;
    
    // Check both MIME type and extension for security
    const isValidMime = allowedMimes.includes(file.mimetype);
    const isValidExtension = allowedExtensions.test(file.originalname);
    
    if (isValidMime && isValidExtension) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'));
    }
  };
  
  const upload = multer({
    storage: multerStorage,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
    fileFilter: imageFileFilter,
  });
  
  app.post("/api/admin/projects-images/upload", 
    requireAdminAuth, 
    (req, res, next) => {
      console.log("[ProjectsImages] Auth check passed, processing upload...");
      next();
    },
    upload.single('image'), 
    async (req, res, next) => {
      try {
        console.log("[ProjectsImages] Upload request received", {
          hasFile: !!req.file,
          fileField: req.file?.fieldname,
          fileName: req.file?.originalname,
          fileSize: req.file?.size,
        });

      if (!req.file) {
        console.error("[ProjectsImages] No file in request");
        return res.status(400).json({ error: 'No file uploaded. Please select an image file.' });
      }
      
      const sanitized = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
      const filename = USE_BUCKET ? sanitized : req.file.filename;
      
      // Get file buffer for bucket upload (if needed)
      let fileBuffer: Buffer | undefined;
      if (USE_BUCKET) {
        fileBuffer = req.file.buffer;
      } else {
        // Read file from disk if using local storage
        try {
          fileBuffer = await fs.readFile(req.file.path);
        } catch (readError) {
          console.error("[ProjectsImages] Failed to read uploaded file:", readError);
        }
      }
      
      // Always save to local public folder for immediate access
      try {
        if (!existsSync(PROJECTS_IMAGES_DIR)) {
          mkdirSync(PROJECTS_IMAGES_DIR, { recursive: true });
        }
        
        if (USE_BUCKET && fileBuffer) {
          // Write buffer to local folder
          await fs.writeFile(
            path.join(PROJECTS_IMAGES_DIR, sanitized),
            fileBuffer
          );
        } else if (!USE_BUCKET) {
          // Move file from temp location to public folder
          const destPath = path.join(PROJECTS_IMAGES_DIR, filename);
          await fs.rename(req.file.path, destPath);
        }
      } catch (localError) {
        console.error("[ProjectsImages] Failed to save locally:", localError);
        // Clean up temp file if using local storage
        if (!USE_BUCKET && req.file.path) {
          try {
            await fs.unlink(req.file.path);
          } catch (cleanupError) {
            // Ignore cleanup errors
          }
        }
        return res.status(500).json({ error: 'Failed to save image locally' });
      }
      
      // Also upload to bucket as backup if available
      if (USE_BUCKET && fileBuffer) {
        try {
          const { storagePut } = await import("../storage");
          const storageKey = `projects/${sanitized}`;
          const contentType = req.file.mimetype || 'image/jpeg';
          
          await storagePut(
            storageKey,
            fileBuffer,
            contentType
          );
          console.log(`[ProjectsImages] Image also saved to bucket: ${storageKey}`);
        } catch (bucketError) {
          console.warn("[ProjectsImages] Failed to save to bucket (non-critical):", bucketError);
          // Non-critical error, continue
        }
      }
      
      console.log("[ProjectsImages] Upload successful", {
        filename,
        url: `/projects/${filename}`,
        size: req.file.size,
      });

      res.json({ 
        success: true, 
        filename: filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url: `/projects/${filename}`,
        message: USE_BUCKET 
          ? 'Image uploaded successfully (local + bucket backup)' 
          : 'Image uploaded successfully' 
      });
    } catch (error: any) {
      console.error("[ProjectsImages] Upload error:", error);
      console.error("[ProjectsImages] Error stack:", error.stack);
      
      // Handle multer errors specifically
      if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File too large. Maximum size is 10MB' });
        }
        return res.status(400).json({ error: `Upload error: ${error.message}` });
      }
      
      res.status(500).json({ error: error.message || 'Failed to upload image' });
    }
  });
  
  // Error handler for multer (catches errors from upload middleware)
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof multer.MulterError) {
      console.error("[Multer] error:", err.code, req.path);
      if (err.code === 'LIMIT_FILE_SIZE') {
        let msg = 'File too large. Maximum size is 10MB';
        if (req.path === '/api/admin/carousel-logos/upload') msg = 'Fichier trop volumineux (2 Mo max)';
        else if (req.path === '/api/admin/union-video/upload') msg = 'Vidéo trop volumineuse (100 Mo max)';
        else if (req.path === '/api/admin/press-release/upload') msg = 'PDF trop volumineux (20 Mo max)';
        return res.status(400).json({ error: msg });
      }
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    }
    if (err && req.path === '/api/admin/projects-images/upload') {
      console.error("[ProjectsImages] Upload middleware error:", err);
      return res.status(400).json({ error: err.message || 'Upload failed' });
    }
    if (err && req.path === '/api/admin/carousel-logos/upload') {
      return res.status(400).json({ error: err.message || 'Upload failed' });
    }
    if (err && req.path === '/api/admin/union-video/upload') {
      return res.status(400).json({ error: err.message || 'Upload failed' });
    }
    if (err && req.path === '/api/admin/press-release/upload') {
      return res.status(400).json({ error: err.message || 'Upload failed' });
    }
    next(err);
  });
  
  // CSP Report endpoint (for monitoring CSP violations)
  app.post('/api/csp-report', express.json({ limit: '1mb' }), (req, res) => {
    // Log CSP violations for monitoring (only in development or if logging is enabled)
    if (process.env.NODE_ENV === 'development' || process.env.LOG_CSP_VIOLATIONS === 'true') {
      logger.warn('[CSP Violation]', {
        'csp-report': req.body,
        ip: req.ip,
        userAgent: req.get('user-agent'),
      });
    }
    res.status(204).send(); // No content response
  });

  // Weather widget: geo by client IP (server-side) + Open-Meteo — évite CORS/CSP en prod
  const weatherLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: { error: 'Too many weather requests' },
    standardHeaders: true,
    legacyHeaders: false,
  });
  /** Client IP: X-Forwarded-For (first = client in most proxies; Railway may use last, we try first then last). */
  function getClientIp(req: express.Request): string | undefined {
    const raw = req.get('x-forwarded-for');
    let ip: string | undefined;
    if (raw) {
      const parts = raw.split(',').map((s) => s.trim()).filter(Boolean);
      ip = parts.length ? (parts[0] ?? parts[parts.length - 1]) : undefined;
    }
    if (!ip) ip = req.ip || req.socket?.remoteAddress || undefined;
    if (!ip) return undefined;
    ip = ip.replace(/^::ffff:/, '');
    if (!ip || ip === '::1' || ip === '127.0.0.1') return undefined;
    return ip;
  }
  app.get('/api/weather', weatherLimiter, async (req, res) => {
    const clientIp = getClientIp(req);
    if (!clientIp) {
      // En local, pas d'IP publique : utiliser un fallback géo (ex. Paris) pour que la météo s'affiche
      const lat = 48.8566;
      const lon = 2.3522;
      const city = 'Paris';
      const region = 'Île-de-France';
      const country = 'France';
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
        const wRes = await fetch(url, { signal: AbortSignal.timeout(8000) });
        if (!wRes.ok) return res.status(502).json({ error: 'Weather service unavailable' });
        const j = await wRes.json();
        const temp = typeof j?.current?.temperature_2m === 'number' ? Math.round(j.current.temperature_2m) : 24;
        const weatherCode = typeof j?.current?.weather_code === 'number' ? j.current.weather_code : 0;
        return res.json({
          temperature: temp,
          weatherCode,
          city,
          region,
          country,
          locationLabel: `${city}, ${region}`,
        });
      } catch (e) {
        logger.warn('[Weather] Open-Meteo failed (local fallback)', e);
        return res.status(502).json({ error: 'Weather service unavailable' });
      }
    }
    type Geo = { city: string; region: string; country: string; lat: number; lon: number };
    let geo: Geo | null = null;
    try {
      const geoRes = await fetch(`https://ipapi.co/${clientIp}/json/`, {
        headers: { 'Accept': 'application/json', 'User-Agent': 'NukleoWeather/1.0' },
        signal: AbortSignal.timeout(8000),
      });
      if (geoRes.ok) {
        const j = await geoRes.json();
        const lat = Number(j.latitude);
        const lon = Number(j.longitude);
        if (Number.isFinite(lat) && Number.isFinite(lon)) {
          geo = {
            city: j.city ?? '',
            region: j.region ?? j.region_code ?? '',
            country: j.country_name ?? j.country ?? '',
            lat,
            lon,
          };
        }
      }
      if (!geo) {
        const ipApiRes = await fetch(`http://ip-api.com/json/${clientIp}?fields=status,city,regionName,country,lat,lon`, {
          signal: AbortSignal.timeout(6000),
        });
        if (ipApiRes.ok) {
          const j = await ipApiRes.json();
          if (j.status === 'success' && Number.isFinite(Number(j.lat)) && Number.isFinite(Number(j.lon))) {
            geo = {
              city: j.city ?? '',
              region: j.regionName ?? '',
              country: j.country ?? '',
              lat: Number(j.lat),
              lon: Number(j.lon),
            };
          }
        }
      }
      if (!geo) {
        logger.warn('[Weather] Geo failed for both providers', { ip: clientIp });
        return res.status(502).json({ error: 'Geolocation unavailable' });
      }
      const locationLabel = [geo.city, geo.region, geo.country].filter(Boolean).slice(0, 2).join(', ') || 'Unknown';
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${geo.lat}&longitude=${geo.lon}&current=temperature_2m,weather_code`;
      const wRes = await fetch(weatherUrl, { signal: AbortSignal.timeout(8000) });
      if (!wRes.ok) return res.status(502).json({ error: 'Weather service unavailable' });
      const j = await wRes.json();
      const temp = typeof j?.current?.temperature_2m === 'number' ? Math.round(j.current.temperature_2m) : null;
      const weatherCode = typeof j?.current?.weather_code === 'number' ? j.current.weather_code : 0;
      if (temp === null) return res.status(502).json({ error: 'Weather data invalid' });
      return res.json({
        temperature: temp,
        weatherCode,
        city: geo.city || 'Unknown',
        region: geo.region,
        country: geo.country,
        locationLabel,
      });
    } catch (e) {
      logger.warn('[Weather] Failed', { ip: clientIp, error: e instanceof Error ? e.message : e });
      return res.status(502).json({ error: 'Weather service unavailable' });
    }
  });

  // tRPC API with rate limiting - MUST be before serveStatic
  app.use("/api/trpc", generalLimiter);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  
  // Serve uploaded project images from client/public/projects (works in both dev and prod)
  // This must be BEFORE serveStatic to ensure uploaded images are accessible
  // In production, also check dist/public/projects (for images copied during build)
  const projectsImagesPath = path.resolve(process.cwd(), "client", "public", "projects");
  const distProjectsImagesPath = path.resolve(process.cwd(), "dist", "public", "projects");
  
  // Ensure directory exists
  if (!existsSync(projectsImagesPath)) {
    try {
      mkdirSync(projectsImagesPath, { recursive: true });
      console.log(`[Static] Created projects directory: ${projectsImagesPath}`);
    } catch (error) {
      console.error(`[Static] Failed to create projects directory: ${projectsImagesPath}`, error);
    }
  }
  
  // Also ensure dist directory exists in production
  if (process.env.NODE_ENV === "production" && !existsSync(distProjectsImagesPath)) {
    try {
      mkdirSync(distProjectsImagesPath, { recursive: true });
      console.log(`[Static] Created dist projects directory: ${distProjectsImagesPath}`);
    } catch (error) {
      console.error(`[Static] Failed to create dist projects directory: ${distProjectsImagesPath}`, error);
    }
  }
  
  // Debug endpoints - ONLY available in development mode
  // SECURITY: These endpoints expose sensitive information and must never be accessible in production
  if (process.env.NODE_ENV === "development") {
    // Debug endpoint to check auth status
    app.get('/api/debug/auth-check', (req, res) => {
      const isPassportAuth = req.isAuthenticated && req.isAuthenticated();
      const ADMIN_COOKIE_NAME = "admin_session";
      const ADMIN_JWT_SECRET = process.env.JWT_SECRET + "-admin";
      const adminToken = req.cookies?.[ADMIN_COOKIE_NAME];
      let isJwtAuth = false;
      
      if (adminToken && ADMIN_JWT_SECRET && ADMIN_JWT_SECRET !== "-admin") {
        try {
          const jwt = require("jsonwebtoken");
          const decoded = jwt.verify(adminToken, ADMIN_JWT_SECRET);
          isJwtAuth = !!(decoded && decoded.id);
        } catch (error) {
          // Invalid token
        }
      }
      
      res.json({
        authenticated: isPassportAuth || isJwtAuth,
        passportAuth: isPassportAuth,
        jwtAuth: isJwtAuth,
        hasCookie: !!adminToken,
        cookieName: ADMIN_COOKIE_NAME,
      });
    });
    
    // Debug endpoint to list files in projects directory (development only)
    app.get('/api/debug/projects-images', async (req, res) => {
      try {
        const files = existsSync(projectsImagesPath) ? await fs.readdir(projectsImagesPath) : [];
        const imageFiles = files.filter(
          (file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
        );
        res.json({
          path: projectsImagesPath,
          exists: existsSync(projectsImagesPath),
          files: imageFiles,
          total: imageFiles.length,
          cwd: process.cwd(),
          nodeEnv: process.env.NODE_ENV,
        });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    });
    
    // Test endpoint to directly call the listImages function (development only)
    app.get('/api/debug/projects-images-trpc', async (req, res) => {
      try {
        // Import and call the listImages function directly
        const { listImages } = await import("../routers/projectsImages");
        const result = await listImages();
        res.json({
          success: true,
          count: result.length,
          images: result,
        });
      } catch (error: any) {
        console.error("[Debug] Error calling listImages:", error);
        res.status(500).json({ 
          error: error.message,
          stack: error.stack 
        });
      }
    });
  }
  
  // development mode uses Vite, production mode uses static files
  // IMPORTANT: serveStatic must be AFTER API routes to ensure API endpoints work
  // Use production static serving unless explicitly in development (avoids ENOENT /client/index.html on Railway)
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    // serveStatic now handles all cache headers internally
    serveStatic(app);
  }
  
  // Serve uploaded project images AFTER serveStatic to ensure it takes precedence
  // Handle /projects/ route - serve images if file exists, otherwise let SPA handle it
  app.use('/projects', (req, res, next) => {
    // If it's exactly /projects or /projects/, let SPA handle it
    if (req.path === '/' || req.path === '') {
      return next();
    }
    
    const requestedFile = req.path.replace(/^\//, '');
    
    // Skip if it's a directory request (ends with /)
    if (requestedFile.endsWith('/')) {
      return next();
    }
    
    // Only handle image files
    if (!/\.(png|jpg|jpeg|gif|webp)$/i.test(requestedFile)) {
      return next();
    }
    
    // Try both paths: first the upload directory, then dist (for build-time images)
    let filePath = path.join(projectsImagesPath, requestedFile);
    let foundPath = null;
    
    if (existsSync(filePath)) {
      foundPath = filePath;
    } else if (process.env.NODE_ENV === "production") {
      // In production, also check dist/public/projects
      const distFilePath = path.join(distProjectsImagesPath, requestedFile);
      if (existsSync(distFilePath)) {
        foundPath = distFilePath;
      }
    }
    
    console.log(`[Projects] Request: ${req.method} ${req.path} -> ${filePath}${foundPath ? ` (found: ${foundPath})` : ' (not found)'}`);
    
    // Check if file exists and is actually a file (not a directory)
    if (foundPath) {
      filePath = foundPath;
      try {
        const stats = require('fs').statSync(filePath);
        if (stats.isFile()) {
          console.log(`[Projects] ✓ Serving: ${filePath} (${stats.size} bytes)`);
          
          // Set proper headers
          res.setHeader('Cache-Control', 'public, max-age=31536000, stale-while-revalidate=86400');
          res.setHeader('Vary', 'Accept');
          
          // Set content type based on extension
          const ext = path.extname(filePath).toLowerCase();
          if (ext === '.jpg' || ext === '.jpeg') {
            res.setHeader('Content-Type', 'image/jpeg');
          } else if (ext === '.png') {
            res.setHeader('Content-Type', 'image/png');
          } else if (ext === '.gif') {
            res.setHeader('Content-Type', 'image/gif');
          } else if (ext === '.webp') {
            res.setHeader('Content-Type', 'image/webp');
          }
          
          return res.sendFile(filePath, (err) => {
            if (err) {
              console.error(`[Projects] ✗ Error serving file: ${err.message}`);
              if (!res.headersSent) {
                next(err);
              }
            }
          });
        }
      } catch (statError) {
        console.error(`[Projects] ✗ Error checking file stats: ${statError}`);
      }
    }
    
    console.log(`[Projects] ✗ File not found: ${filePath}`);
    // Don't call next() here - return 404 for missing image files
    return res.status(404).send('Image not found');
  });
  
  console.log(`[Static] Serving project images from: ${projectsImagesPath}${process.env.NODE_ENV === "production" ? ` and ${distProjectsImagesPath}` : ''}`);
  
  // Redirect /en to home page
  app.get("/en", (req, res) => {
    res.redirect(301, "/");
  });
  app.get("/en/", (req, res) => {
    res.redirect(301, "/");
  });
  
  // Catch-all route for SPA - serve index.html for all non-API routes
  // This must be AFTER all API routes and serveStatic
  // Run whenever not in development (so staging/production always use dist/public)
  if (process.env.NODE_ENV !== "development") {
    const distPath = path.resolve(process.cwd(), "dist", "public");
    app.get('*', async (req, res) => {
      // Skip asset requests that weren't found (but NOT /projects/ route for SPA)
      // Only return 404 for actual asset files, not routes
      const isAssetFile = req.path.startsWith('/assets/') || 
          req.path.startsWith('/fonts/') || 
          req.path.startsWith('/images/') ||
          req.path.match(/\.(js|css|woff2?|eot|ttf|otf|png|jpg|jpeg|gif|svg|ico|webp)$/i);
      
      // Check if it's a /projects/ image file (has extension)
      const isProjectsImage = req.path.startsWith('/projects/') && 
          req.path.match(/\.(png|jpg|jpeg|gif|webp)$/i);
      
      if (isAssetFile || isProjectsImage) {
        return res.status(404).send('File not found');
      }
      
      // Serve index.html for SPA routing (including /projects/ page route)
      // CRITICAL: Never cache HTML to ensure it always matches available chunks
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      
      // Verify that index.html exists before serving
      const indexPath = path.resolve(distPath, "index.html");
      if (!existsSync(indexPath)) {
        logger.error(`[Static] index.html not found at ${indexPath}`);
        return res.status(500).send('Application not available. Please try again later.');
      }
      
      // CRITICAL: Verify that all referenced chunks exist before serving HTML
      // This prevents "Failed to fetch dynamically imported module" errors
      try {
        const htmlContent = await fs.readFile(indexPath, 'utf-8');
        const assetsJsPath = path.join(distPath, 'assets', 'js');
        
        if (existsSync(assetsJsPath)) {
          const availableChunks = new Set(readdirSync(assetsJsPath).filter(f => f.endsWith('.js')));
          
          // Extract chunk references from HTML
          const chunkRefs = new Set<string>();
          
          // Extract from script tags with src attribute
          const scriptSrcRegex = /<script[^>]+src=["']([^"']+\.js[^"']*)["']/gi;
          let match;
          while ((match = scriptSrcRegex.exec(htmlContent)) !== null) {
            const src = match[1].split('?')[0].split('#')[0];
            if (src.includes('/assets/js/')) {
              const chunkName = path.basename(src);
              chunkRefs.add(chunkName);
            }
          }
          
          // Extract from link preload/modulepreload tags
          const linkPreloadRegex = /<link[^>]+href=["']([^"']+\.js[^"']*)["']/gi;
          while ((match = linkPreloadRegex.exec(htmlContent)) !== null) {
            const src = match[1].split('?')[0].split('#')[0];
            if (src.includes('/assets/js/')) {
              const chunkName = path.basename(src);
              chunkRefs.add(chunkName);
            }
          }
          
          // Extract from inline script content (dynamic imports)
          const inlineScriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
          while ((match = inlineScriptRegex.exec(htmlContent)) !== null) {
            const scriptContent = match[1];
            // Look for import() or import.meta.resolve() patterns
            const importRegex = /(?:import\(|import\.meta\.resolve\(|["'])([^"']*\/assets\/js\/[^"']+\.js[^"']*)/gi;
            let importMatch;
            while ((importMatch = importRegex.exec(scriptContent)) !== null) {
              const src = importMatch[1].split('?')[0].split('#')[0];
              if (src.includes('/assets/js/')) {
                const chunkName = path.basename(src);
                chunkRefs.add(chunkName);
              }
            }
          }
          
          // Check for missing chunks
          const missingChunks: string[] = [];
          for (const chunkRef of chunkRefs) {
            if (!availableChunks.has(chunkRef)) {
              missingChunks.push(chunkRef);
            }
          }
          
          // Log verification result (even if no missing chunks)
          if (chunkRefs.size > 0) {
            logger.info(`[Static] Verified ${chunkRefs.size} chunk references in HTML, ${missingChunks.length} missing`);
          }
          
          if (missingChunks.length > 0) {
            logger.error(`[Static] ⚠️ CRITICAL: HTML references ${missingChunks.length} missing chunks:`, missingChunks);
            logger.error(`[Static] Available chunks: ${Array.from(availableChunks).slice(0, 10).join(', ')}...`);
            logger.error(`[Static] This will cause "Failed to fetch dynamically imported module" errors.`);
            logger.error(`[Static] The build is incomplete. Please rebuild the application.`);
            
            // CRITICAL FIX: Remove references to missing chunks from HTML before serving
            // This prevents "Failed to fetch dynamically imported module" errors
            let cleanedHtml = htmlContent;
            
            for (const missingChunk of missingChunks) {
              // Remove script tags referencing missing chunks
              const scriptRegex = new RegExp(`<script[^>]+src=["'][^"']*${missingChunk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"']*["'][^>]*></script>`, 'gi');
              cleanedHtml = cleanedHtml.replace(scriptRegex, '');
              
              // Remove link preload tags referencing missing chunks
              const linkRegex = new RegExp(`<link[^>]+href=["'][^"']*${missingChunk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"']*["'][^>]*>`, 'gi');
              cleanedHtml = cleanedHtml.replace(linkRegex, '');
              
              logger.warn(`[Static] Removed reference to missing chunk: ${missingChunk}`);
            }
            
            // Serve the cleaned HTML instead of the original
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.send(cleanedHtml);
          }
        }
        
        // Serve the HTML (all chunks exist)
        res.sendFile(indexPath);
      } catch (error) {
        logger.error(`[Static] Error reading/verifying index.html:`, error);
        // Fallback: serve the file anyway
        res.sendFile(indexPath);
      }
    });
  }
  
  // Global error handler (must be after all routes)
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Log error with full details - always log full error in production for debugging
    const errorMessage = err?.message || String(err) || "Unknown error";
    const errorStack = err?.stack || "No stack trace";
    const errorName = err?.name || "Error";
    const errorCode = err?.code || null;
    
    // Always log full error details for debugging
    logger.error(`[ERROR HANDLER] ${errorName}: ${errorMessage}`, {
      error: errorMessage,
      name: errorName,
      code: errorCode,
      stack: errorStack,
      url: req.url,
      method: req.method,
      path: req.path,
      body: req.body ? JSON.stringify(req.body).substring(0, 500) : undefined,
      query: Object.keys(req.query).length > 0 ? req.query : undefined,
      params: Object.keys(req.params).length > 0 ? req.params : undefined,
      headers: {
        'user-agent': req.get('user-agent'),
        'content-type': req.get('content-type'),
      },
    });
    
    // Also log to console for Railway logs
    console.error("[ERROR HANDLER] Full error details:", {
      message: errorMessage,
      name: errorName,
      code: errorCode,
      stack: errorStack,
      url: req.url,
    });
    
    // Send to Sentry if configured
    if (process.env.SENTRY_DSN && err instanceof Error) {
      Sentry.captureException(err, {
        tags: {
          errorCode: errorCode || 'UNKNOWN',
          errorName: errorName,
        },
        extra: {
          url: req.url,
          method: req.method,
          statusCode: res.statusCode,
        },
        level: 'error',
      });
    }
    
    // Don't send response if headers already sent
    if (res.headersSent) {
      return next(err);
    }
    
    // Send error response - include error code if available for better debugging
    res.status(500).json({
      error: "Internal Server Error",
      message: process.env.NODE_ENV === 'production' 
        ? "An unexpected error occurred" 
        : errorMessage,
      ...(errorCode && { code: errorCode }),
    });
  });

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, async () => {
    logger.info(`Server running on http://localhost:${port}/`);
    
    // Database connection was already checked at startup (dbAvailable variable)
    // If DB is not available, server runs in degraded mode but still serves static files
    if (!dbAvailable) {
      logger.warn("⚠️ Database not available. Server running in degraded mode (static files only).");
      logger.warn("⚠️ Database features will be unavailable until connection is restored.");
      logger.warn("⚠️ Sessions are stored in memory (will be lost on restart).");
      return; // Exit early if DB is not available - static files will still be served
    }
    
    // Initialize database tables on startup
    if (process.env.DATABASE_URL) {
      try {
        logger.info("[Server] Initializing database tables...");
        const mockReq = {
          body: {},
        } as any;
        const mockRes = {
          status: (code: number) => ({
            json: (data: any) => {
              if (code === 200) {
                logger.info("[Server] ✅ Database tables initialized successfully");
              } else {
                const errorMsg = data?.error || data?.details || "Unknown error";
                logger.error(`[Server] ⚠️ Database initialization failed: ${errorMsg}`);
              }
            },
          }),
          json: (data: any) => {
            logger.info("[Server] ✅ Database tables initialized successfully");
          },
        } as any;
        await initDatabase(mockReq, mockRes);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        logger.error(`[Server] ⚠️ Failed to initialize database: ${errorMsg}`);
        return; // Exit early if initialization fails
      }
    }
    
    // Seed loaders on startup
    try {
      const { seedLoaders } = await import("../seed-loaders");
      await seedLoaders();
      
      const { seedCreativeLoaders } = await import("../seed-creative-loaders");
      await seedCreativeLoaders();
      
      const { seedCrazyLoaders } = await import("../seed-crazy-loaders");
      await seedCrazyLoaders();
      
      // Initialize radar tables if they don't exist
      try {
        if (process.env.DATABASE_URL) {
          const client = postgres(process.env.DATABASE_URL);
          
          // Check if radar_technologies table exists
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
            
            // Create tables using raw SQL
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
            
            // Create ai_news_subscribers table
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
      
      // Seed radar technologies
      try {
        const { seedRadarTechnologies } = await import("../routers/radar");
        await seedRadarTechnologies();
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        logger.error(`Failed to seed radar technologies: ${errorMsg}`);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      logger.error(`Failed to seed loaders: ${errorMsg}`);
    }
    
    // Setup daily radar refresh cron job
    setupRadarDailyRefresh();
  });
}

// Setup daily refresh for radar (runs at 2 AM UTC daily)
function setupRadarDailyRefresh() {
  const refreshRadar = async () => {
    try {
      const { appRouter } = await import("../routers");
      const { createContext } = await import("./context");
      const mockReq = { headers: {}, cookies: {} } as any;
      const mockRes = { setHeader: () => {}, cookie: () => {} } as any;
      const context = await createContext({ req: mockReq, res: mockRes });
      const caller = appRouter.createCaller(context);
      await caller.radar.refreshDaily();
      logger.info("Radar daily refresh completed successfully");
    } catch (error) {
      logger.error("Radar daily refresh failed:", error);
    }
  };
  
  // Calculate milliseconds until next 2 AM UTC
  const now = new Date();
  const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  const nextRefresh = new Date(utcNow);
  nextRefresh.setUTCHours(2, 0, 0, 0);
  if (nextRefresh <= utcNow) {
    nextRefresh.setUTCDate(nextRefresh.getUTCDate() + 1);
  }
  
  const msUntilRefresh = nextRefresh.getTime() - utcNow.getTime();
  
  // Schedule first refresh
  setTimeout(() => {
    refreshRadar();
    // Then refresh every 24 hours
    setInterval(refreshRadar, 24 * 60 * 60 * 1000);
  }, msUntilRefresh);
  
  logger.info(`Radar daily refresh scheduled for ${nextRefresh.toISOString()}`);
}

startServer().catch((error) => {
  const errorMsg = error instanceof Error ? error.message : "Unknown error";
  logger.error(`Failed to start server: ${errorMsg}`);
  process.exit(1);
});
