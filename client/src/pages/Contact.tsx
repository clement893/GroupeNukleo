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

// Carte : embed Google Maps (adresse Montréal) — pas de clé API requise pour l’embed classique
type OfficeId = 'montreal' | 'halifax';

const MAP_EMBED: Record<OfficeId, string> = {
  montreal: 'https://www.google.com/maps?q=7236+Rue+Waverly+Montreal+QC+H2R+0C2+Canada&output=embed',
  halifax: 'https://www.google.com/maps?q=1800+Argyle+St+Unit+801+Halifax+NS+B3J+3N8+Canada&output=embed',
};

export default function Contact() {
  const { t } = useLanguage();
  const [selectedOffice, setSelectedOffice] = useState<OfficeId>('montreal');

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

      <div className="min-h-screen" style={{ background: 'transparent', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Titre + formulaire à gauche, carte à droite */}
        <section className="pt-24 pb-12 lg:pt-28 lg:pb-16">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            {/* Titre + sous-texte */}
            <div className="mb-8">
                <h2
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-4 w-fit"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    background: 'linear-gradient(to right, #6B1817, #5636AD)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Performez maintenant
                </h2>
              <p
                className="text-base md:text-lg text-gray-600 leading-relaxed"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, color: '#444' }}
              >
                Choisissez la transformation numérique et contactez-nous
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-stretch">
              {/* Gauche : formulaire */}
              <div className="glass-panel w-full rounded-2xl p-8 lg:p-12 h-full flex flex-col">
              <div className="max-w-xl">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: BORDEAUX, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
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

              {/* Droite : villes au-dessus de la carte, adresse affichée sur la carte au clic */}
              <div className="flex flex-col h-full rounded-2xl overflow-hidden shadow-lg bg-white/80 backdrop-blur border border-white/40 min-h-[320px]">
                {/* Onglets villes */}
                <div className="flex border-b border-gray-200/60">
                  <button
                    type="button"
                    onClick={() => setSelectedOffice('montreal')}
                    className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${
                      selectedOffice === 'montreal'
                        ? 'bg-[#6B2338] text-white'
                        : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80'
                    }`}
                  >
                    {t('contact.montreal')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedOffice('halifax')}
                    className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${
                      selectedOffice === 'halifax'
                        ? 'bg-[#6B2338] text-white'
                        : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80'
                    }`}
                  >
                    {t('contact.halifax')}
                  </button>
                </div>
                {/* Adresse affichée sur la carte au clic */}
                <div className="px-4 py-3 bg-gray-50/90 border-b border-gray-200/60 min-h-[3.5rem] flex items-center">
                  <MapPin className="w-4 h-4 flex-shrink-0 mr-2 text-[#6B2338]" aria-hidden />
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedOffice === 'montreal' ? t('contact.addressMontreal') : t('contact.addressHalifax')}
                  </p>
                </div>
                {/* Carte */}
                <div className="bg-gray-100 flex-1 min-h-0">
                  <iframe
                    key={selectedOffice}
                    title={t('contact.whereToFindUs')}
                    src={MAP_EMBED[selectedOffice]}
                    width="100%"
                    height="100%"
                    style={{ minHeight: 320, border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block w-full h-full min-h-[320px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
