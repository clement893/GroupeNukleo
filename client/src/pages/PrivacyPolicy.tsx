import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const OFF_WHITE = '#EFE8E8';
const BORDEAUX = '#5A1E29';
const LINK_COLOR = '#523DCB';

const content = {
  fr: {
    seoTitle: 'Politique de confidentialité | Nukleo Digital',
    seoDescription: 'Comment Nukleo Digital collecte, utilise et protège vos données personnelles. Notre engagement en matière de confidentialité et de sécurité.',
    legal: 'Mentions légales',
    title: 'Politique de confidentialité',
    lastUpdated: 'Dernière mise à jour : 9 décembre 2024',
    section1Title: '1. Informations que nous collectons',
    section1Text: 'Nous collectons les informations que vous nous fournissez directement : création de compte, utilisation de nos services, communications, enquêtes. Cela peut inclure votre nom, adresse e-mail, informations sur votre entreprise et toute autre information que vous choisissez de nous communiquer.',
    section2Title: '2. Utilisation des informations',
    section2Intro: 'Nous utilisons les informations collectées pour :',
    section2List: [
      'Fournir, maintenir et améliorer nos services',
      'Traiter les transactions et envoyer les informations associées',
      'Vous envoyer des avis techniques, mises à jour et messages de support',
      'Répondre à vos commentaires et questions',
      'Analyser les tendances et modes d\'utilisation',
      'Protéger contre les activités frauduleuses ou illégales',
    ],
    section3Title: '3. Partage des informations',
    section3Text: 'Nous ne vendons, n\'échangeons ni ne louons vos données personnelles à des tiers. Nous pouvons les partager avec des prestataires de confiance qui nous aident à faire fonctionner le site et notre activité, dans la mesure où ils s\'engagent à les garder confidentielles.',
    section4Title: '4. Sécurité des données',
    section4Text: 'Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre l\'accès non autorisé, la modification, la divulgation ou la destruction. Aucune transmission sur Internet n\'est toutefois totalement sécurisée.',
    section5Title: '5. Vos droits',
    section5Intro: 'Vous avez le droit de :',
    section5List: [
      'Accéder aux données personnelles que nous détenons sur vous',
      'Demander la correction des informations inexactes',
      'Demander la suppression de vos données personnelles',
      'Vous opposer au traitement de vos données',
      'Demander la limitation du traitement',
      'À la portabilité des données',
    ],
    section6Title: '6. Cookies',
    section6Text: 'Nous utilisons des cookies et technologies similaires pour suivre l\'activité sur notre service. Vous pouvez configurer votre navigateur pour refuser les cookies ou signaler leur envoi. Consultez notre',
    section6Link: 'Politique des cookies',
    section6Suffix: 'pour plus d\'informations.',
    section7Title: '7. Modifications de cette politique',
    section7Text: 'Nous pouvons mettre à jour notre politique de confidentialité. Nous vous informerons en publiant la nouvelle version sur cette page et en mettant à jour la date « Dernière mise à jour ».',
    section8Title: '8. Nous contacter',
    section8Text: 'Pour toute question concernant cette politique de confidentialité, contactez-nous à',
  },
  en: {
    seoTitle: 'Privacy Policy | Nukleo Digital',
    seoDescription: 'Learn how Nukleo Digital collects, uses, and protects your personal information. Our commitment to data privacy and security.',
    legal: 'Legal',
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: December 9, 2024',
    section1Title: '1. Information We Collect',
    section1Text: 'We collect information that you provide directly to us, including when you create an account, use our services, communicate with us, or participate in surveys. This may include your name, email address, company information, and any other information you choose to provide.',
    section2Title: '2. How We Use Your Information',
    section2Intro: 'We use the information we collect to:',
    section2List: [
      'Provide, maintain, and improve our services',
      'Process transactions and send related information',
      'Send you technical notices, updates, and support messages',
      'Respond to your comments and questions',
      'Analyze usage patterns and trends',
      'Protect against fraudulent or illegal activity',
    ],
    section3Title: '3. Information Sharing',
    section3Text: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, as long as they agree to keep this information confidential.',
    section4Title: '4. Data Security',
    section4Text: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.',
    section5Title: '5. Your Rights',
    section5Intro: 'You have the right to:',
    section5List: [
      'Access the personal information we hold about you',
      'Request correction of inaccurate information',
      'Request deletion of your personal information',
      'Object to processing of your personal information',
      'Request restriction of processing',
      'Data portability',
    ],
    section6Title: '6. Cookies',
    section6Text: 'We use cookies and similar tracking technologies to track activity on our service. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. See our',
    section6Link: 'Cookie Policy',
    section6Suffix: 'for more information.',
    section7Title: '7. Changes to This Policy',
    section7Text: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.',
    section8Title: '8. Contact Us',
    section8Text: 'If you have any questions about this Privacy Policy, please contact us at',
  },
} as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-faq rounded-lg overflow-hidden px-6 py-5 mb-6">
      <h2
        className="text-xl md:text-2xl font-bold pb-2 border-b border-gray-200 mb-4"
        style={{ color: BORDEAUX, fontFamily: 'var(--font-heading, sans-serif)' }}
      >
        {title}
      </h2>
      <div className="text-gray-600 leading-relaxed text-base" style={{ fontFamily: 'var(--font-heading, sans-serif)' }}>
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  const { language } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const isFr = language === 'fr';
  const c = content[isFr ? 'fr' : 'en'];

  return (
    <PageLayout>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        keywords="privacy policy, data protection, GDPR, personal information, data security, politique de confidentialité"
      />
      <div style={{ minHeight: '100vh', background: OFF_WHITE, fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
        {/* Hero */}
        <section style={{ padding: 'clamp(5rem, 10vh, 7rem) 0 0' }}>
          <div className="container">
            <p style={{
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              color: '#6b7280',
              marginBottom: 16,
              textTransform: 'uppercase',
            }}>
              {c.legal}
            </p>
            <h1
              style={{
                fontFamily: "'Neue Haas Unica Pro', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                margin: '0 0 0.5rem 0',
                background: 'linear-gradient(to right, #6B1817, #523DCB)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {c.title}
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>{c.lastUpdated}</p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: '2rem 0 4rem' }}>
          <div className="container">
            <Section title={c.section1Title}>
              <p style={{ margin: 0 }}>{c.section1Text}</p>
            </Section>

            <Section title={c.section2Title}>
              <p style={{ margin: '0 0 0.5rem 0' }}>{c.section2Intro}</p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                {c.section2List.map((item, i) => (
                  <li key={i} style={{ marginBottom: '0.35rem' }}>{item}</li>
                ))}
              </ul>
            </Section>

            <Section title={c.section3Title}>
              <p style={{ margin: 0 }}>{c.section3Text}</p>
            </Section>

            <Section title={c.section4Title}>
              <p style={{ margin: 0 }}>{c.section4Text}</p>
            </Section>

            <Section title={c.section5Title}>
              <p style={{ margin: '0 0 0.5rem 0' }}>{c.section5Intro}</p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                {c.section5List.map((item, i) => (
                  <li key={i} style={{ marginBottom: '0.35rem' }}>{item}</li>
                ))}
              </ul>
            </Section>

            <Section title={c.section6Title}>
              <p style={{ margin: 0 }}>
                {c.section6Text}{' '}
                <Link href={getLocalizedPath('/cookie-policy')} style={{ color: LINK_COLOR, fontWeight: 600 }}>
                  {c.section6Link}
                </Link>{' '}
                {c.section6Suffix}
              </p>
            </Section>

            <Section title={c.section7Title}>
              <p style={{ margin: 0 }}>{c.section7Text}</p>
            </Section>

            <Section title={c.section8Title}>
              <p style={{ margin: 0 }}>
                {c.section8Text}{' '}
                <a href="mailto:hello@nukleo.com" style={{ color: LINK_COLOR, fontWeight: 600 }}>hello@nukleo.com</a>.
              </p>
            </Section>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
