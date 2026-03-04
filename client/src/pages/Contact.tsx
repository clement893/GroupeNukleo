import { useState } from 'react';
import { AlertCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';
import { trpc } from '@/lib/trpc';
import SEO from '@/components/SEO';
import StructuredData, { montrealOfficeSchema, halifaxOfficeSchema } from '@/components/StructuredData';
import { useLanguage } from '@/contexts/LanguageContext';
import { extractValidationErrors, getErrorMessage } from '@/lib/trpcErrorHandler';
import { logger } from '@/lib/logger';

const BORDEAUX = '#5A1E29';
const OFF_WHITE = '#EFE8E8';
const SITE_BLACK = '#0A0A0A';

// Carte : embed Google Maps (adresse Montréal) — pas de clé API requise pour l’embed classique
type OfficeId = 'montreal' | 'halifax';

const MAP_EMBED: Record<OfficeId, string> = {
  montreal: 'https://www.google.com/maps?q=7236+Rue+Waverly+Montreal+QC+H2R+0C2+Canada&output=embed',
  halifax: 'https://www.google.com/maps?q=1800+Argyle+St+Unit+801+Halifax+NS+B3J+3N8+Canada&output=embed',
};

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

      <div className="min-h-screen" style={{ background: 'transparent', fontFamily: "'Google Sans Flex', sans-serif", paddingTop: 128 }}>
        {/* Hero — même disposition que page d'accueil et À propos */}
        <section style={{ padding: 'clamp(6rem, 12vh, 8rem) 3% clamp(2rem, 4vw, 4rem)', overflow: 'visible' }}>
          <div className="w-full">
            {/* Titre + sous-titre — alignés à gauche comme About/Accueil */}
            <div style={{ marginBottom: 'clamp(4rem, 8vw, 7rem)', overflow: 'visible' }}>
              <h1
                style={{
                  fontFamily: "'Google Sans Flex', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.5rem, 8vw, 9rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.04em',
                  margin: '0 0 0.5rem 0',
                  paddingBottom: '0.18em',
                  display: 'inline-block',
                  overflow: 'visible',
                  background: 'linear-gradient(to right, #6B1817, #523DCB)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {t('contact.heroTitleNew')}
              </h1>
              <p
                style={{
                  fontFamily: "'Google Sans Flex', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                  color: '#6b7280',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {t('contact.heroSubtitle')}
              </p>
            </div>

            {/* Bloc deux colonnes : gauche = coordonnées, droite = formulaire (formulaire plus large) */}
            <div
              className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] gap-8 lg:gap-10 items-start"
            >
              {/* Gauche : adresses + email, alignés à gauche, icône pin rouge */}
              <div
                className="flex flex-col justify-center"
                style={{
                  fontFamily: "'Google Sans Flex', sans-serif",
                  color: '#374151',
                  gap: 'clamp(1.25rem, 2vw, 1.75rem)',
                }}
              >
                {/* Montréal */}
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#523DCB' }} aria-hidden />
                  <div>
                    <p style={{ fontWeight: 700, color: SITE_BLACK, margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{t('contact.montreal')}</p>
                    <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>7236 Rue Waverly</p>
                    <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>Montréal, QC H2R 0C2</p>
                  </div>
                </div>
                {/* Halifax */}
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#523DCB' }} aria-hidden />
                  <div>
                    <p style={{ fontWeight: 700, color: SITE_BLACK, margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{t('contact.halifax')}</p>
                    <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>1800 Argyle St Unit 801</p>
                    <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>Halifax, NS B3J 3N8</p>
                  </div>
                </div>
                {/* Email */}
                <div style={{ marginTop: '0.25rem' }}>
                  <a
                    href={`mailto:${t('contact.email')}`}
                    className="text-gray-700 hover:text-[#6B1817] font-medium transition-colors"
                    style={{ fontSize: '0.95rem' }}
                  >
                    {t('contact.email')}
                  </a>
                </div>
              </div>

              {/* Droite : formulaire (hauteur réduite, largeur augmentée) */}
              <div className="glass-panel w-full rounded-md p-6 lg:p-8">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: BORDEAUX, fontFamily: "'Google Sans Flex', sans-serif" }}>
                  {t('contact.sendMessage')}
                </h2>
                {isSubmitted && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-800 font-medium text-sm">{t('contact.successMessage')}</p>
                  </div>
                )}
                {(sendMessage.error || Object.keys(validationErrors).length > 0) && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-700 font-medium text-sm mb-2">
                      {Object.keys(validationErrors).length > 0 ? t('contact.errorFix') : t('contact.errorMessage')}
                    </p>
                    {Object.keys(validationErrors).length > 0 && (
                      <ul className="list-disc list-inside text-red-600 text-sm space-y-1">
                        {Object.entries(validationErrors).map(([field, message]) => {
                          const labels: Record<string, string> = {
                            message: t('contact.form.message'),
                            email: t('contact.form.email'),
                            firstName: t('contact.form.firstName'),
                            lastName: t('contact.form.lastName'),
                            company: t('contact.form.company'),
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
                <form onSubmit={handleSubmit} className="space-y-3">
                  {errorMessage && (
                    <div className="flex items-center gap-3 p-3 rounded-md bg-red-50 border border-red-200 text-red-700">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm">{errorMessage}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-1">
                        {t('contact.form.firstName')}
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        aria-required="true"
className="w-full px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#523DCB]/30 focus:border-[#523DCB]"
                    placeholder={t('contact.firstNamePlaceholder')}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium mb-1">
                        {t('contact.form.lastName')}
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        aria-required="true"
className="w-full px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#523DCB]/30 focus:border-[#523DCB]"
                    placeholder={t('contact.lastNamePlaceholder')}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                      {t('contact.form.email')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
className="w-full px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#523DCB]/30 focus:border-[#523DCB]"
                    placeholder={t('contact.emailPlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-gray-700 text-sm font-medium mb-1">
                      {t('contact.form.company')}
                    </label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      aria-required="true"
className="w-full px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#523DCB]/30 focus:border-[#523DCB]"
                    placeholder={t('contact.companyPlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-1">
                      {t('contact.form.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      minLength={10}
                      rows={3}
                      className={`w-full px-4 py-2 rounded-md border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#523DCB]/30 focus:border-[#523DCB] resize-none ${
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
                    className="w-full py-4 rounded-md font-semibold bg-[#523DCB] hover:bg-[#4630b0] text-white"
                  >
                    {isSubmitting || sendMessage.isPending ? (t('common.loading') || 'Envoi...') : t('contact.send')}
                  </Button>
                </form>
              </div>
            </div>

            {/* Section cartes : Montréal et Halifax */}
            <div className="mt-12 lg:mt-16">
              <h2 className="text-xl lg:text-2xl font-bold mb-6" style={{ color: BORDEAUX, fontFamily: "'Google Sans Flex', sans-serif" }}>
                {t('contact.whereToFindUs')}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Carte Montréal */}
                <div>
                  <p className="font-semibold mb-3" style={{ fontFamily: "'Google Sans Flex', sans-serif", color: SITE_BLACK }}>{t('contact.montreal')}</p>
                  <div
                    className="rounded-md overflow-hidden bg-gray-100 shadow-sm border border-gray-200/60"
                    style={{ borderRadius: 7, minHeight: 420 }}
                  >
                    <iframe
                      title={`${t('contact.whereToFindUs')} — ${t('contact.montreal')}`}
                      src={MAP_EMBED.montreal}
                      width="100%"
                      height="420"
                      style={{ border: 0, display: 'block' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full"
                    />
                  </div>
                </div>
                {/* Carte Halifax */}
                <div>
                  <p className="font-semibold mb-3" style={{ fontFamily: "'Google Sans Flex', sans-serif", color: SITE_BLACK }}>{t('contact.halifax')}</p>
                  <div
                    className="rounded-md overflow-hidden bg-gray-100 shadow-sm border border-gray-200/60"
                    style={{ borderRadius: 7, minHeight: 420 }}
                  >
                    <iframe
                      title={`${t('contact.whereToFindUs')} — ${t('contact.halifax')}`}
                      src={MAP_EMBED.halifax}
                      width="100%"
                      height="420"
                      style={{ border: 0, display: 'block' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
