export const ENV = {
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
  /** Admin login (when no DB admin user): default Nukleo / NukleoGroup */
  adminUsername: process.env.ADMIN_USERNAME ?? "Nukleo",
  adminPassword: process.env.ADMIN_PASSWORD ?? "NukleoGroup",
  baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
  /** Cloudflare R2 (S3-compatible) for media uploads */
  r2AccountId: process.env.R2_ACCOUNT_ID ?? "",
  r2AccessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
  r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
  r2BucketName: process.env.R2_BUCKET_NAME ?? "",
  r2PublicUrl: process.env.R2_PUBLIC_URL ?? "",
  internalPlatformUrl: process.env.INTERNAL_PLATFORM_URL ?? "", // URL de la plateforme interne pour récupérer les témoignages
  internalPlatformApiKey: process.env.INTERNAL_PLATFORM_API_KEY ?? "", // Clé API optionnelle pour l'authentification
};
