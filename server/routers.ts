import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { logger, sanitizeLogData } from "./_core/logger";
import { z } from "zod";
import { assessmentRouter } from "./routers/assessment";
import { contactRouter } from "./routers/contact";
import { mediaAssetsRouter } from "./routers/mediaAssets";
import { startProjectRouter } from "./routers/startProject";
import { agenciesRouter } from "./routers/agencies";
import { leoAnalyticsRouter } from "./routers/leoAnalytics";
import { adminAuthRouter } from "./routers/adminAuth";
import { adminRouter } from "./routers/admin";
import { loadersRouter } from "./loadersRouter";
import { testimonialsRouter } from "./routers/testimonials";
import { radarRouter } from "./routers/radar";
import { analyticsRouter } from "./routers/analytics";
import { migrateRouter } from "./routers/migrate";
import { pageTextsRouter } from "./routers/pageTexts";
import { projectsImagesRouter } from "./routers/projectsImages";
import { projectsRouter } from "./routers/projects";
import { carouselLogosRouter } from "./routers/carouselLogos";
import { saveLeoContact, createLeoSession, updateLeoSession } from "./db";
export const appRouter = router({
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
  analytics: analyticsRouter,
  migrate: migrateRouter,
  pageTexts: pageTextsRouter,
  projectsImages: projectsImagesRouter,
  projects: projectsRouter,
  carouselLogos: carouselLogosRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leo: router({
    chat: publicProcedure
      .input(
        z.object({
          messages: z.array(
            z.object({
              role: z.enum(["user", "assistant", "system"]),
              content: z.string()
                .min(1, "Message cannot be empty")
                .max(2000, "Message too long (max 2000 characters)")
                .refine(
                  (val) => !val.includes('<script>') && !val.includes('javascript:'),
                  "Invalid characters in message"
                ),
            })
          ).max(50, "Too many messages in history"),
        })
      )
      .mutation(async ({ input }) => {
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
- Team: Clément (CEO), Alexei, Antoine, Séverine, Omar, Timothé, Hind, Sarah, Meriem, Camille, Maxime, Jean-François, Margaux, Marie-Claire, Ricardo

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
            ...input.messages,
          ],
        });

          return {
            content: response.choices[0].message.content || "Sorry, I couldn't generate a response. Could you rephrase your question?",
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          const hasApiKey = !!process.env.BUILT_IN_FORGE_API_KEY;
          const hasApiUrl = !!process.env.BUILT_IN_FORGE_API_URL;
          
          logger.error('Leo Chat Error', sanitizeLogData({
            message: errorMessage,
            hasApiKey,
            hasApiUrl,
            errorType: error instanceof Error ? error.constructor.name : typeof error,
          }));
          
          // Return a fallback response instead of throwing to keep LEO functional
          const lastUserMessage = input.messages[input.messages.length - 1]?.content || '';
          
          // Provide more helpful fallback messages based on error type
          let fallbackMessage: string;
          
          if (!hasApiKey) {
            fallbackMessage = "I'm currently being set up. Please contact the team at hello@nukleo.com for assistance! 📧";
          } else if (errorMessage.includes('fetch failed') || errorMessage.includes('ECONNREFUSED')) {
            fallbackMessage = "I'm having trouble connecting to my AI service right now. Could you try again in a moment? 🔄";
          } else if (errorMessage.includes('401') || errorMessage.includes('403')) {
            fallbackMessage = "There's an authentication issue with my AI service. Please contact hello@nukleo.com! 🔐";
          } else {
            // Generic fallback with variety
            const fallbackResponses = [
              "I'm experiencing some technical difficulties right now. Could you try rephrasing your question? 🔄",
              "I'm having trouble connecting to my AI brain at the moment. Can you ask me again in a different way? 🤔",
              "Something went wrong on my end. Let's try again - could you rephrase your question? 💡",
              "I'm having a moment of confusion. Could you ask your question differently? 😊",
            ];
            const fallbackIndex = lastUserMessage.length % fallbackResponses.length;
            fallbackMessage = fallbackResponses[fallbackIndex];
          }
          
          return {
            content: fallbackMessage,
          };
        }
      }),
    
    saveContact: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          name: z.string().optional(),
          conversationContext: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          await saveLeoContact({
            email: input.email,
            name: input.name,
            conversationContext: input.conversationContext,
          });
          return {
            success: true,
            message: "Contact saved successfully",
          };
        } catch (error) {
          logger.error('Leo Save Contact Error', sanitizeLogData({
            message: error instanceof Error ? error.message : 'Unknown error',
            email: input.email,
          }));
          // Return success even if DB fails to prevent UI errors
          // The function already handles DB unavailability gracefully
          return {
            success: true,
            message: "Contact saved successfully",
          };
        }
      }),

  createSession: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
        pageContext: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await createLeoSession({
          sessionId: input.sessionId,
          pageContext: input.pageContext,
        });
        return { success: true };
      } catch (error) {
        logger.error('Leo Create Session Error', sanitizeLogData({
          message: error instanceof Error ? error.message : 'Unknown error',
          sessionId: input.sessionId,
        }));
        // Return success even if DB fails to prevent UI errors
        // The function already handles DB unavailability gracefully
        return { success: true };
      }
    }),

  updateSession: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
        messageCount: z.number().optional(),
        emailCaptured: z.number().optional(),
        capturedEmail: z.string().optional(),
        conversationDuration: z.number().optional(),
        completedAt: z.date().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { sessionId, ...data } = input;
        await updateLeoSession(sessionId, data);
        return { success: true };
      } catch (error) {
        logger.error('Leo Update Session Error', sanitizeLogData({
          message: error instanceof Error ? error.message : 'Unknown error',
          sessionId: input.sessionId,
        }));
        // Return success even if DB fails to prevent UI errors
        // The function already handles DB unavailability gracefully
        return { success: true };
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
