import { publicProcedure, adminProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { verifyAdminPassword, createAdminUser } from "../db";
import jwt from "jsonwebtoken";
import { ENV } from "../_core/env";

const ADMIN_JWT_SECRET = ENV.cookieSecret + "-admin"; // Separate secret for admin tokens
const ADMIN_COOKIE_NAME = "admin_session";

export const adminAuthRouter = router({
  login: publicProcedure
    .input(
      z.object({
        username: z.string().min(1),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const admin = await verifyAdminPassword(input.username, input.password);
      
      if (!admin) {
        throw new Error("Invalid credentials");
      }

      // Create JWT token
      const token = jwt.sign(
        { id: admin.id, username: admin.username, email: admin.email },
        ADMIN_JWT_SECRET,
        { expiresIn: "7d" }
      );
      
      // Set cookie
      ctx.res.cookie(ADMIN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: "/",
      });

      return {
        success: true,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
        },
      };
    }),

  logout: publicProcedure.mutation(({ ctx }) => {
    ctx.res.clearCookie(ADMIN_COOKIE_NAME, { path: "/" });
    return { success: true };
  }),

  /** Short-lived token for upload requests (bypasses cookie issues on some proxies) */
  getUploadToken: adminProcedure.query(({ ctx }) => {
    const uploadToken = jwt.sign(
      { type: "upload", id: ctx.user!.id, exp: Math.floor(Date.now() / 1000) + 120 },
      ADMIN_JWT_SECRET
    );
    return { token: uploadToken };
  }),

  checkAuth: publicProcedure.query(({ ctx }) => {
    const token = ctx.req.cookies[ADMIN_COOKIE_NAME];
    
    if (!token) {
      return { authenticated: false, admin: null };
    }

    try {
      const decoded = jwt.verify(token, ADMIN_JWT_SECRET) as {
        id: number;
        username: string;
        email: string;
      };

      return {
        authenticated: true,
        admin: {
          id: decoded.id,
          username: decoded.username,
          email: decoded.email,
        },
      };
    } catch (error) {
      return { authenticated: false, admin: null };
    }
  }),

  // Create first admin - DISABLED FOR SECURITY
  // This route should only be enabled temporarily during initial setup
  // To enable: set ENABLE_CREATE_FIRST_ADMIN=true in environment variables
  // After creating the first admin, remove this route or keep it disabled
  createFirstAdmin: publicProcedure
    .input(
      z.object({
        username: z.string().min(3),
        password: z.string().min(8),
        email: z.string().email(),
        secret: z.string().optional(), // Optional secret key for additional protection
      })
    )
    .mutation(async ({ input }) => {
      // Security: Only allow if explicitly enabled via environment variable
      if (process.env.ENABLE_CREATE_FIRST_ADMIN !== "true") {
        throw new Error("Admin creation is disabled. Contact system administrator.");
      }

      // Additional protection: Require a secret key if configured
      const requiredSecret = process.env.CREATE_ADMIN_SECRET;
      if (requiredSecret && input.secret !== requiredSecret) {
        throw new Error("Invalid secret key");
      }

      try {
        await createAdminUser({
          username: input.username,
          password: input.password,
          email: input.email,
        });
        return { success: true };
      } catch (error) {
        console.error("[Admin Auth] Error creating admin:", error);
        throw new Error("Failed to create admin user");
      }
    }),
});
