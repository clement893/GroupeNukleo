import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';
import { trpc } from '@/lib/trpc';
import SEO from '@/components/SEO';
import StructuredData, { montrealOfficeSchema, halifaxOfficeSchema } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';
import { extractValidationErrors, getErrorMessage } from '@/lib/trpcErrorHandler';
import { logger } from '@/lib/logger';

const BORDEAUX = '#5A1E29';
const OFF_WHITE = '#EFE8E8';

// Carte : embed Google Maps (adresse Montréal) — pas de clé API requise pour l’embed classique
const MAP_EMBED_SRC = 'https://www.google.com/maps?q=7236+Rue+Waverly+Montreal+QC+H2R+0C2+Canada&output=embed';

export default function Contact() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendMessage = trpc.contact.send.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await sendMessage.mutateAsync(formData);
      setIsSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', company: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      logger.tagged('Contact').error('Failed to send message:', error);
      const formattedErrors = extractValidationErrors(error);
      if (Object.keys(formattedErrors).length > 0) {
        setValidationErrors(formattedErrors);
      } else {
        setErrorMessage(getErrorMessage(error, t('contact.error.generic') || 'Failed to send message. Please try again.'));
        setTimeout(() => setErrorMessage(null), 5000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (validationErrors[e.target.name]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  };

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Nukleo Digital',
    url: 'https://nukleo.digital/contact',
    description: 'Contact Nukleo Digital for AI transformation consulting and services',
    mainEntity: {
      '@type': 'Organization',
      name: 'Nukleo Digital',
      address: [
        { '@type': 'PostalAddress', streetAddress: '7236 Rue Waverly', addressLocality: 'Montréal', addressRegion: 'QC', postalCode: 'H2R 0C2', addressCountry: 'CA' },
        { '@type': 'PostalAddress', streetAddress: '1800 Argyle St Unit 801', addressLocality: 'Halifax', addressRegion: 'NS', postalCode: 'B3J 3N8', addressCountry: 'CA' },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Business Inquiries',
        email: 'hello@nukleo.com',
        telephone: '+1-514-777-1234',
        availableLanguage: ['English', 'French'],
      },
    },
  };

  return (
    <PageLayout>
      <SEO
        title={t('seo.contact.title')}
        description={t('seo.contact.description')}
        keywords="contact AI agency, AI consultation, Montréal AI services, Halifax AI agency, AI transformation contact"
      />
      <StructuredData data={contactPageSchema} />
      <StructuredData data={montrealOfficeSchema} />
      <StructuredData data={halifaxOfficeSchema} />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="pt-24 pb-10 lg:pt-32 lg:pb-14">
          <div className="container">
            <Breadcrumb items={[{ name: t('nav.contact'), url: '/contact' }]} />
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3"
              style={{ color: BORDEAUX, fontFamily: 'var(--font-heading, sans-serif)' }}
            >
              {t('contact.heroTitleNew')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              {t('contact.heroSubtitle')}
            </p>
          </div>
        </section>

        {/* Contact info + Map (2 colonnes) */}
        <section className="pb-16 lg:pb-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              <div className="space-y-8">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: BORDEAUX }}>
                    {t('contact.whereToFindUs')}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t('contact.addressMontreal')}
                    <br />
                    {t('contact.addressHalifax')}
                  </p>
                </div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: BORDEAUX }}>
                    {t('contact.phoneLabel')}
                  </h2>
                  <a href="tel:+15147771234" className="text-gray-600 hover:underline">
                    +1 (514) 777-1234
                  </a>
                </div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: BORDEAUX }}>
                    {t('contact.emailLabel')}
                  </h2>
                  <a href="mailto:hello@nukleo.com" className="text-gray-600 hover:underline">
                    hello@nukleo.com
                  </a>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-100" style={{ minHeight: 320 }}>
                <iframe
                  title={t('contact.whereToFindUs')}
                  src={MAP_EMBED_SRC}
                  width="100%"
                  height="100%"
                  style={{ minHeight: 320, border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Formulaire — sous le bloc contact + carte */}
        <section className="pb-16 lg:pb-24">
          <div className="container">
            <div className="max-w-2xl rounded-2xl p-8 lg:p-10 bg-white shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6" style={{ color: BORDEAUX, fontFamily: 'var(--font-heading, sans-serif)' }}>
                {t('contact.sendMessage')}
              </h2>
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-green-800 font-medium text-sm">{t('contact.successMessage')}</p>
                </div>
              )}
              {(sendMessage.error || Object.keys(validationErrors).length > 0) && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-700 font-medium text-sm mb-2">
                    {Object.keys(validationErrors).length > 0 ? t('contact.errorFix') : t('contact.errorMessage')}
                  </p>
                  {Object.keys(validationErrors).length > 0 && (
                    <ul className="list-disc list-inside text-red-600 text-sm space-y-1">
                      {Object.entries(validationErrors).map(([field, message]) => {
                        const labels: Record<string, string> = {
                          message: t('contact.message'),
                          email: t('contact.email'),
                          firstName: t('contact.firstName'),
                          lastName: t('contact.lastName'),
                          company: t('contact.company'),
                        };
                        return (
                          <li key={field}>
                            <strong>{labels[field] || field}</strong>: {message}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{errorMessage}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-1">
                      {t('contact.firstName')}
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                      placeholder={t('contact.firstNamePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium mb-1">
                      {t('contact.lastName')}
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                      placeholder={t('contact.lastNamePlaceholder')}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                    {t('contact.email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-gray-700 text-sm font-medium mb-1">
                    {t('contact.company')}
                  </label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                    placeholder={t('contact.companyPlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-1">
                    {t('contact.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 resize-none ${
                      validationErrors.message ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder={t('contact.messagePlaceholder')}
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    {formData.message.length}/10
                  </p>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting || sendMessage.isPending}
                  className="w-full py-6 rounded-xl font-semibold bg-[#6B4BEA] hover:bg-[#5a3dd9] text-white"
                >
                  {isSubmitting || sendMessage.isPending ? (t('common.loading') || 'Envoi...') : t('contact.send')}
                </Button>
              </form>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
