import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import { ENV } from "./env";
import { logger } from "./logger";

/** Emails toujours autorisés (fallback si ADMIN_ALLOWED_EMAILS non défini, ex. staging) */
const DEFAULT_ADMIN_EMAILS = ["clement@nukleo.com"].map((e) => e.toLowerCase());

// Configure Google OAuth Strategy
// Returns true if Google Auth was successfully configured, false otherwise
export function configureGoogleAuth(): boolean {
  if (!ENV.googleClientId || !ENV.googleClientSecret) {
    logger.warn("[Google Auth] Missing credentials, Google OAuth disabled");
    return false;
  }

  // Log configuration (without exposing secrets)
  const clientIdPreview = ENV.googleClientId.length > 20 
    ? `${ENV.googleClientId.substring(0, 10)}...${ENV.googleClientId.substring(ENV.googleClientId.length - 10)}`
    : ENV.googleClientId;
  const callbackURL = `${ENV.baseUrl}/api/auth/google/callback`;
  
  console.log(`[Google Auth] Configuring OAuth with:`);
  console.log(`  - Client ID: ${clientIdPreview}`);
  console.log(`  - Callback URL: ${callbackURL}`);
  console.log(`  - Base URL: ${ENV.baseUrl}`);

  const fromEnv = ENV.adminAllowedEmails?.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean) || [];
  const allowedEmails = [...new Set([...DEFAULT_ADMIN_EMAILS, ...fromEnv])];
  
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
        callbackURL: callbackURL,
      },
      (accessToken, refreshToken, profile, done) => {
        try {
          // Extract email from profile
          const email = profile.emails?.[0]?.value?.toLowerCase();
          
          if (!email) {
            console.error("[Google Auth] No email found in Google profile");
            return done(null, false, { message: "No email found in Google profile" });
          }

          // Check if email is in allowed list
          if (!allowedEmails.includes(email)) {
            console.log(`[Google Auth] Unauthorized email attempt: ${email}`);
            return done(null, false, { message: "Email not authorized" });
          }

          // Create admin user object
          const adminUser = {
            id: profile.id,
            email,
            name: profile.displayName,
            picture: profile.photos?.[0]?.value,
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

  // Serialize user to session
  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  // Deserialize user from session
  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });

  console.log("[Google Auth] Configured successfully");
  return true;
}

// Middleware to check if user is authenticated admin
export function requireAdminAuth(req: any, res: any, next: any) {
  const authHeader = req.headers?.authorization;
  const hasCookie = !!req.cookies?.["admin_session"];

  // Check Passport session (Google OAuth)
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  const ADMIN_JWT_SECRET = (process.env.JWT_SECRET ?? "") + "-admin";
  if (!ADMIN_JWT_SECRET || ADMIN_JWT_SECRET === "-admin") {
    console.log(`[AdminAuth] Unauthorized ${req.path}: JWT_SECRET not configured`);
    return res.status(401).json({ error: "Unauthorized - Admin login required" });
  }

  // Check Authorization: Bearer <upload-token> (bypasses cookie issues on some proxies)
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    try {
      const decoded = jwt.verify(token, ADMIN_JWT_SECRET) as { type?: string; id?: number };
      if (decoded && typeof decoded.id === "number" && (decoded.type === "upload" || !decoded.type)) {
        console.log(`[AdminAuth] OK ${req.path}: Bearer token (id=${decoded.id})`);
        return next();
      }
      console.log(`[AdminAuth] Reject ${req.path}: Bearer decoded but invalid (id=${decoded?.id}, type=${decoded?.type})`);
    } catch (err) {
      console.log(`[AdminAuth] Reject ${req.path}: Bearer verify failed`, (err as Error)?.message);
    }
  } else {
    if (req.path?.includes("upload")) {
      console.log(`[AdminAuth] Reject ${req.path}: no Bearer header (hasAuthHeader=${!!authHeader}, hasCookie=${hasCookie})`);
    }
  }

  // Check admin JWT cookie (admin login form)
  const ADMIN_COOKIE_NAME = "admin_session";
  const adminToken = req.cookies?.[ADMIN_COOKIE_NAME];

  if (adminToken) {
    try {
      const decoded = jwt.verify(adminToken, ADMIN_JWT_SECRET) as { id?: number };
      if (decoded && typeof decoded.id === "number") {
        return next();
      }
    } catch {
      // Invalid token
    }
  }

  console.log(`[AdminAuth] Unauthorized ${req.path}: all checks failed (hasAuthHeader=${!!authHeader}, hasCookie=${!!adminToken})`);
  res.status(401).json({ error: "Unauthorized - Admin login required" });
}
