import { adminProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { 
  agencyLeads, 
  leoSessions, 
  aiAssessments, 
  leoContacts, 
  mediaAssets, 
  users,
  aiNewsSubscribers,
  startProjectSubmissions,
  contactMessages,
  testimonials,
  InsertTestimonial
} from "../../drizzle/schema";
import { count, desc, sql, eq, or, and } from "drizzle-orm";
import { ENV } from "../_core/env";

export const adminRouter = router({
  getStats: adminProcedure.query(async () => {
    try {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }
      
      // Get counts for all tables
      const [
        agencyLeadsCount,
        leoSessionsCount,
        aiAssessmentsCount,
        leoContactsCount,
        mediaAssetsCount,
        usersCount,
      ] = await Promise.all([
        db.select({ count: count() }).from(agencyLeads),
        db.select({ count: count() }).from(leoSessions),
        db.select({ count: count() }).from(aiAssessments),
        db.select({ count: count() }).from(leoContacts),
        db.select({ count: count() }).from(mediaAssets),
        db.select({ count: count() }).from(users),
      ]);

      return {
        agencyLeads: agencyLeadsCount[0]?.count || 0,
        leoSessions: leoSessionsCount[0]?.count || 0,
        aiAssessments: aiAssessmentsCount[0]?.count || 0,
        leoContacts: leoContactsCount[0]?.count || 0,
        mediaAssets: mediaAssetsCount[0]?.count || 0,
        totalUsers: usersCount[0]?.count || 0,
      };
    } catch (error) {
      console.error("[Admin] Error fetching stats:", error);
      return {
        agencyLeads: 0,
        leoSessions: 0,
        aiAssessments: 0,
        leoContacts: 0,
        mediaAssets: 0,
        totalUsers: 0,
      };
    }
  }),

  getLeoContacts: adminProcedure.query(async () => {
    try {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }
      
      // Get all LEO contacts ordered by creation date (newest first)
      const contacts = await db
        .select()
        .from(leoContacts)
        .orderBy(desc(leoContacts.createdAt));

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
      
      // Get all AI News subscribers ordered by creation date (newest first)
      const subscribers = await db
        .select()
        .from(aiNewsSubscribers)
        .orderBy(desc(aiNewsSubscribers.createdAt));

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
      
      // Get all start project submissions ordered by creation date (newest first)
      const submissions = await db
        .select()
        .from(startProjectSubmissions)
        .orderBy(desc(startProjectSubmissions.createdAt));

      console.log(`[Admin] Successfully fetched ${submissions.length} start project submissions`);
      if (submissions.length > 0) {
        console.log("[Admin] First submission:", JSON.stringify(submissions[0], null, 2));
      } else {
        console.log("[Admin] No submissions found in database (table exists but is empty)");
      }
      return submissions;
    } catch (error: any) {
      console.error("[Admin] Error fetching start project submissions:", error);
      console.error("[Admin] Error message:", error?.message);
      console.error("[Admin] Error code:", error?.code);
      console.error("[Admin] Error stack:", error?.stack);
      console.error("[Admin] Full error:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      
      // Check if it's a table doesn't exist error
      if (error?.message?.includes("does not exist") || error?.code === "42P01") {
        console.error("[Admin] ⚠️ Table 'start_project_submissions' does not exist. Please run migrations.");
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
      
      // Get all contact messages ordered by creation date (newest first)
      const messages = await db
        .select()
        .from(contactMessages)
        .orderBy(desc(contactMessages.createdAt));

      return messages;
    } catch (error) {
      console.error("[Admin] Error fetching contact messages:", error);
      return [];
    }
  }),

  // Statut de configuration pour la synchro témoignages (admin uniquement, pas de valeur sensible)
  getTestimonialsSyncConfig: adminProcedure.query(() => ({
    hasUrl: Boolean(ENV.internalPlatformUrl?.trim()),
    hasApiKey: Boolean(ENV.internalPlatformApiKey?.trim()),
  })),

  // Synchroniser les témoignages depuis la plateforme interne
  syncTestimonials: adminProcedure.mutation(async () => {
    if (!ENV.internalPlatformUrl) {
      throw new Error("INTERNAL_PLATFORM_URL n'est pas configurée");
    }

    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    try {
      // Récupérer les témoignages depuis la plateforme interne (FR et EN)
      const [frTestimonials, enTestimonials] = await Promise.all([
        fetchTestimonialsFromExternalPlatform('fr'),
        fetchTestimonialsFromExternalPlatform('en'),
      ]);

      // Combiner les témoignages FR et EN par ID
      const testimonialsMap = new Map<number, any>();
      
      // Traiter les témoignages français
      frTestimonials.forEach((t) => {
        const id = t.id || 0;
        if (!testimonialsMap.has(id)) {
          testimonialsMap.set(id, {
            id,
            client: t.client,
            contact: t.contact,
            title: t.title,
            company: t.company,
            textFr: t.textFr || t.text || '',
            textEn: '',
            displayOrder: t.displayOrder || 0,
            isActive: t.isActive !== false,
          });
        } else {
          const existing = testimonialsMap.get(id)!;
          existing.textFr = t.textFr || t.text || existing.textFr;
        }
      });

      // Traiter les témoignages anglais
      enTestimonials.forEach((t) => {
        const id = t.id || 0;
        if (!testimonialsMap.has(id)) {
          testimonialsMap.set(id, {
            id,
            client: t.client,
            contact: t.contact,
            title: t.title,
            company: t.company,
            textFr: '',
            textEn: t.textEn || t.text || '',
            displayOrder: t.displayOrder || 0,
            isActive: t.isActive !== false,
          });
        } else {
          const existing = testimonialsMap.get(id)!;
          existing.textEn = t.textEn || t.text || existing.textEn;
        }
      });

      const testimonialsToSync = Array.from(testimonialsMap.values());

      if (testimonialsToSync.length === 0) {
        return {
          success: false,
          message: "Aucun témoignage trouvé sur la plateforme interne",
          synced: 0,
        };
      }

      // Synchroniser chaque témoignage
      let synced = 0;
      let updated = 0;
      let created = 0;

      for (const testimonial of testimonialsToSync) {
        // Vérifier si le témoignage existe déjà (par client+contact, car l'ID externe peut ne pas correspondre)
        const existing = await db
          .select()
          .from(testimonials)
          .where(
            and(
              eq(testimonials.client, testimonial.client),
              eq(testimonials.contact, testimonial.contact)
            )
          )
          .limit(1);

        const testimonialData: InsertTestimonial = {
          client: testimonial.client,
          contact: testimonial.contact,
          title: testimonial.title,
          company: testimonial.company,
          textEn: testimonial.textEn || '',
          textFr: testimonial.textFr || '',
          displayOrder: testimonial.displayOrder,
          isActive: testimonial.isActive,
        };

        if (existing.length > 0) {
          // Mettre à jour le témoignage existant
          await db
            .update(testimonials)
            .set({
              ...testimonialData,
              updatedAt: new Date(),
            })
            .where(eq(testimonials.id, existing[0].id));
          updated++;
        } else {
          // Créer un nouveau témoignage
          await db.insert(testimonials).values(testimonialData);
          created++;
        }
        synced++;
      }

      return {
        success: true,
        message: `Synchronisation réussie : ${synced} témoignages synchronisés (${created} créés, ${updated} mis à jour)`,
        synced,
        created,
        updated,
      };
    } catch (error: any) {
      console.error("[Admin] Error syncing testimonials:", error);
      throw new Error(`Erreur lors de la synchronisation : ${error.message}`);
    }
  }),
});

// Fonction helper pour récupérer les témoignages depuis la plateforme interne
async function fetchTestimonialsFromExternalPlatform(language: 'fr' | 'en'): Promise<any[]> {
  if (!ENV.internalPlatformUrl) {
    console.warn('[Admin] INTERNAL_PLATFORM_URL not configured');
    return [];
  }

  try {
    // Construire l'URL de l'API - utiliser l'endpoint public qui est prévu pour l'accès externe
    const baseUrl = ENV.internalPlatformUrl.replace(/\/$/, ''); // Enlever le slash final s'il existe
    // Utiliser /api/public/testimonials qui est l'endpoint prévu pour l'accès externe avec clé API
    const url = `${baseUrl}/api/public/testimonials?language=${language}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (ENV.internalPlatformApiKey) {
      // L'API du HUB accepte Bearer token dans Authorization header
      headers['Authorization'] = `Bearer ${ENV.internalPlatformApiKey}`;
      // Certaines APIs utilisent aussi X-API-Key comme alternative (note: case-sensitive, utiliser x-api-key)
      headers['x-api-key'] = ENV.internalPlatformApiKey;
      console.log(`[Admin] Fetching testimonials from ${url} with API key authentication`);
    } else {
      console.warn('[Admin] INTERNAL_PLATFORM_API_KEY not configured, making unauthenticated request');
      throw new Error('INTERNAL_PLATFORM_API_KEY est requise pour accéder à l\'API');
    }

    console.log(`[Admin] Making request to: ${url}`);
    console.log(`[Admin] Headers:`, JSON.stringify(headers, null, 2));
    
    const response = await fetch(url, {
      method: 'GET',
      headers,
      signal: AbortSignal.timeout(10000), // Timeout de 10 secondes pour la synchronisation
    });

    // Vérifier le Content-Type avant de parser le JSON
    const contentType = response.headers.get('content-type') || '';
    const responseText = await response.text();
    
    console.log(`[Admin] Response status: ${response.status}`);
    console.log(`[Admin] Response Content-Type: ${contentType}`);
    console.log(`[Admin] Response preview: ${responseText.substring(0, 300)}`);
    
    if (!response.ok) {
      console.error(`[Admin] API error ${response.status}: ${responseText.substring(0, 1000)}`);
      // Si c'est une erreur 500, c'est probablement une erreur serveur côté HUB
      if (response.status === 500) {
        throw new Error(`Erreur serveur (500) sur le HUB. Vérifiez les logs du HUB pour plus de détails. Réponse: ${responseText.substring(0, 300)}`);
      }
      throw new Error(`API returned ${response.status}: ${response.statusText}. Response: ${responseText.substring(0, 300)}`);
    }

    // Vérifier que la réponse est bien du JSON
    if (!contentType.includes('application/json')) {
      console.error(`[Admin] Expected JSON but got ${contentType}. Response: ${responseText.substring(0, 1000)}`);
      // Si c'est du HTML même avec un status 200, c'est probablement une redirection ou une erreur
      if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
        throw new Error(`L'API a retourné du HTML au lieu de JSON (status: ${response.status}). Cela peut indiquer une erreur d'authentification ou une erreur serveur. Vérifiez que la clé API est correcte et que l'endpoint existe. Réponse: ${responseText.substring(0, 300)}`);
      }
      throw new Error(`L'API a retourné ${contentType} au lieu de JSON. Réponse: ${responseText.substring(0, 300)}`);
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error(`[Admin] Failed to parse JSON response: ${responseText.substring(0, 500)}`);
      throw new Error(`Impossible de parser la réponse JSON. Réponse reçue: ${responseText.substring(0, 200)}`);
    }
    
    // L'endpoint /api/public/testimonials retourne {success, language, count, testimonials: [...]}
    let testimonialsArray: any[] = [];
    
    if (Array.isArray(data)) {
      // Format tableau direct
      testimonialsArray = data;
    } else if (data.testimonials && Array.isArray(data.testimonials)) {
      // Format avec propriété testimonials
      testimonialsArray = data.testimonials;
    } else {
      console.warn(`[Admin] Unexpected response format:`, JSON.stringify(data).substring(0, 200));
      return [];
    }
    
    console.log(`[Admin] Successfully fetched ${testimonialsArray.length} testimonials (${language})`);
    
    // Mapper les données du format HUB vers le format local
    // Format HUB: {id, clientName, companyName, text, title, rating, featured, createdAt}
    // Format local: {id, client, contact, title, company, textFr, textEn, displayOrder, isActive}
    return testimonialsArray.map((item: any) => {
      // Le format de l'API publique retourne 'text' et 'title' selon la langue demandée
      // On doit mapper cela vers textFr/textEn selon la langue
      const textFr = language === 'fr' ? (item.text || item.textFr || '') : (item.textFr || '');
      const textEn = language === 'en' ? (item.text || item.textEn || '') : (item.textEn || '');
      const titleFr = language === 'fr' ? (item.title || item.titleFr || '') : (item.titleFr || '');
      const titleEn = language === 'en' ? (item.title || item.titleEn || '') : (item.titleEn || '');
      
      return {
        id: item.id,
        client: item.clientName || item.client || '',
        contact: item.clientName || item.contact || item.name || '', // clientName est utilisé comme contact
        title: titleFr || titleEn || item.title || '',
        company: item.companyName || item.company || '',
        textFr: textFr,
        textEn: textEn,
        displayOrder: item.displayOrder || item.order || item.rating || 0, // Utiliser rating comme fallback pour l'ordre
        isActive: item.isActive !== false && item.status !== 'offline', // Considérer comme actif si pas explicitement offline
      };
    });
  } catch (error: any) {
    console.error(`[Admin] Error fetching testimonials (${language}):`, error.message);
    throw error;
  }
}
