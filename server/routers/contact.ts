import { z } from 'zod';
import { publicProcedure, router } from '../_core/trpc';
import { sendEmail } from '../_core/sendgrid';
import { getDb } from '../db';
import { aiNewsSubscribers, contactMessages } from '../../drizzle/schema';

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(1, 'Company is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const contactRouter = router({
  send: publicProcedure
    .input(contactSchema)
    .mutation(async ({ input }) => {
      try {
        // Save to database first
        const db = await getDb();
        if (db) {
          try {
            await db.insert(contactMessages).values({
              firstName: input.firstName,
              lastName: input.lastName,
              email: input.email,
              company: input.company,
              message: input.message,
            });
            console.log(`[Contact] Successfully saved message from ${input.firstName} ${input.lastName} (${input.email})`);
          } catch (dbError: any) {
            console.error('[Contact] Database error:', dbError);
            // Continue even if DB save fails - still try to send emails
          }
        }

        // Send email to Nukleo team
        const emailSent = await sendEmail({
          to: 'clement@nukleo.com',
          subject: `New Contact Form Submission from ${input.firstName} ${input.lastName}`,
          html: generateContactEmail(input),
        });

        if (!emailSent) {
          throw new Error('Failed to send email');
        }

        // Send confirmation email to user (non-blocking)
        try {
          await sendEmail({
            to: input.email,
            subject: 'Thank you for contacting Nukleo Digital',
            html: generateConfirmationEmail(input.firstName),
          });
          console.log(`[Contact] Confirmation email sent to ${input.email}`);
        } catch (emailError) {
          console.warn('[Contact] Failed to send confirmation email:', emailError);
          // Don't fail the submission if confirmation email fails
        }

        return {
          success: true,
        };
      } catch (error) {
        console.error('Contact form error:', error);
        throw new Error('Failed to send message. Please try again.');
      }
    }),

  subscribe: publicProcedure
    .input(newsletterSchema)
    .mutation(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          console.error('[Newsletter] Database connection failed');
          throw new Error('Database connection failed');
        }

        // Save to database (ignore duplicate email errors)
        let isNewSubscriber = true;
        try {
          // Insert without specifying id - let database auto-generate it
          const result = await db.insert(aiNewsSubscribers).values({
            email: input.email,
            source: 'ai-trend-radar',
          }).returning({ id: aiNewsSubscribers.id });
          console.log(`[Newsletter] Successfully saved subscription for ${input.email}`, result);
        } catch (dbError: any) {
          // If email already exists, that's okay - just continue
          const errorMessage = dbError?.message || dbError?.toString() || '';
          const errorCode = dbError?.code || '';
          const errorConstraint = dbError?.constraint || '';
          
          const isDuplicate = 
            errorMessage.includes('unique') || 
            errorMessage.includes('duplicate') ||
            errorMessage.includes('already exists') ||
            errorCode.includes('23505') ||
            errorCode === '23505' ||
            errorConstraint === 'ai_news_subscribers_email_unique' ||
            errorConstraint?.includes('email_unique');
          
          if (isDuplicate) {
            console.log(`[Newsletter] Email ${input.email} already subscribed, skipping insert`);
            isNewSubscriber = false;
          } else {
            console.error('[Newsletter] Database error:', dbError);
            console.error('[Newsletter] Error message:', errorMessage);
            console.error('[Newsletter] Error code:', errorCode);
            console.error('[Newsletter] Error constraint:', errorConstraint);
            console.error('[Newsletter] Full error:', JSON.stringify(dbError, Object.getOwnPropertyNames(dbError), 2));
            throw new Error(`Database error: ${errorMessage || 'Unknown error'}`);
          }
        }

        // Send notification to Nukleo team (non-blocking)
        try {
          const emailSent = await sendEmail({
            to: process.env.SENDGRID_FROM_EMAIL || 'hello@nukleo.com',
            subject: `New AI News Newsletter Subscription: ${input.email}`,
            html: `
              <h2>New AI News Newsletter Subscription</h2>
              <p><strong>Email:</strong> ${input.email}</p>
              <p><strong>Source:</strong> AI Trend Radar</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>New Subscriber:</strong> ${isNewSubscriber ? 'Yes' : 'No (already subscribed)'}</p>
            `,
          });

          if (!emailSent) {
            console.warn('[Newsletter] Failed to send notification email, but subscription was saved to DB');
          }
        } catch (emailError) {
          console.warn('[Newsletter] Error sending notification email:', emailError);
          // Don't fail the subscription if notification email fails
        }

        // Send welcome email to subscriber (non-blocking)
        try {
          await sendEmail({
            to: input.email,
            subject: 'Welcome to Nukleo Digital AI News Newsletter',
            html: generateWelcomeEmail(),
          });
          console.log(`[Newsletter] Welcome email sent to ${input.email}`);
        } catch (emailError) {
          console.warn('[Newsletter] Failed to send welcome email:', emailError);
          // Don't fail the subscription if welcome email fails
        }

        return {
          success: true,
          message: isNewSubscriber ? 'Successfully subscribed!' : 'You are already subscribed!',
        };
      } catch (error: any) {
        console.error('[Newsletter] Subscription error:', error);
        // Return more specific error message
        const errorMessage = error?.message || 'Failed to subscribe. Please try again.';
        throw new Error(errorMessage);
      }
    }),
});

function generateContactEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
}): string {
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
                Submitted on ${new Date().toLocaleString()}
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

function generateConfirmationEmail(firstName: string): string {
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

function generateWelcomeEmail(): string {
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
