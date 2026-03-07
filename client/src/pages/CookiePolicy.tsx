import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';

const OFF_WHITE = '#EFE8E8';
const BORDEAUX = '#5A1E29';
const LINK_COLOR = '#523DCB';

const content = {
  fr: {
    seoTitle: 'Politique des cookies | Nukleo Digital',
    seoDescription: 'Comment Nukleo Digital utilise les cookies et technologies similaires pour améliorer votre navigation et analyser le trafic.',
    legal: 'Mentions légales',
    title: 'Politique des cookies',
    lastUpdated: 'Dernière mise à jour : 9 décembre 2024',
    whatAre: 'Qu\'est-ce qu\'un cookie ?',
    whatAreText: 'Les cookies sont de petits fichiers texte déposés sur votre appareil lorsque vous visitez notre site. Ils nous permettent de vous offrir une meilleure expérience en mémorisant vos préférences et en comprenant comment vous utilisez le site.',
    howWeUse: 'Comment nous utilisons les cookies',
    howWeUseIntro: 'Nous utilisons les cookies pour :',
    howWeUseList: [
      'Cookies essentiels : nécessaires au bon fonctionnement du site',
      'Cookies d\'analyse : comprendre comment les visiteurs utilisent le site',
      'Cookies fonctionnels : mémoriser vos préférences et paramètres',
      'Cookies de performance : améliorer la vitesse et les performances du site',
    ],
    typesTitle: 'Types de cookies utilisés',
    sessionTitle: 'Cookies de session',
    sessionText: 'Cookies temporaires qui expirent à la fermeture du navigateur. Ils sont essentiels pour maintenir votre session lors de la navigation.',
    persistentTitle: 'Cookies persistants',
    persistentText: 'Ils restent sur votre appareil pendant une durée définie ou jusqu\'à suppression. Ils nous aident à mémoriser vos préférences pour vos prochaines visites.',
    thirdPartyTitle: 'Cookies tiers',
    thirdPartyText: 'Déposés par des services tiers que nous utilisons (analytics). Ils nous aident à comprendre l\'usage du site et à améliorer nos services.',
    managingTitle: 'Gérer les cookies',
    managingIntro: 'Vous pouvez contrôler les cookies de plusieurs façons :',
    managingList: [
      'La plupart des navigateurs permettent de refuser ou accepter les cookies',
      'Vous pouvez supprimer les cookies déjà enregistrés',
      'Vous pouvez configurer le navigateur pour être averti lors de l\'envoi de cookies',
      'Certaines fonctionnalités du site peuvent ne plus fonctionner correctement si vous désactivez les cookies',
    ],
    browserTitle: 'Paramètres du navigateur',
    browserIntro: 'Pour gérer les cookies, modifiez les paramètres de votre navigateur :',
    browserList: [
      'Chrome : Paramètres → Confidentialité et sécurité → Cookies et autres données des sites',
      'Firefox : Paramètres → Vie privée et sécurité → Cookies et données des sites',
      'Safari : Préférences → Confidentialité → Cookies et données de sites',
      'Edge : Paramètres → Cookies et autorisations des sites → Cookies et données des sites',
    ],
    updatesTitle: 'Modifications de cette politique',
    updatesText: 'Nous pouvons mettre à jour cette politique des cookies pour refléter l\'évolution de nos pratiques ou pour des raisons opérationnelles, juridiques ou réglementaires. Consultez cette page régulièrement pour rester informé.',
    contactTitle: 'Nous contacter',
    contactText: 'Pour toute question sur notre utilisation des cookies, contactez-nous à',
  },
  en: {
    seoTitle: 'Cookie Policy | Nukleo Digital',
    seoDescription: 'Learn about how Nukleo Digital uses cookies and similar technologies to improve your browsing experience and analyze site traffic.',
    legal: 'Legal',
    title: 'Cookie Policy',
    lastUpdated: 'Last updated: December 9, 2024',
    whatAre: 'What Are Cookies?',
    whatAreText: 'Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.',
    howWeUse: 'How We Use Cookies',
    howWeUseIntro: 'We use cookies for several purposes:',
    howWeUseList: [
      'Essential Cookies: Required for the website to function properly',
      'Analytics Cookies: Help us understand how visitors interact with our website',
      'Functional Cookies: Remember your preferences and settings',
      'Performance Cookies: Improve website speed and performance',
    ],
    typesTitle: 'Types of Cookies We Use',
    sessionTitle: 'Session Cookies',
    sessionText: 'Temporary cookies that expire when you close your browser. These are essential for maintaining your session while navigating our website.',
    persistentTitle: 'Persistent Cookies',
    persistentText: 'Remain on your device for a set period or until you delete them. These help us remember your preferences for future visits.',
    thirdPartyTitle: 'Third-Party Cookies',
    thirdPartyText: 'Set by third-party services we use, such as analytics providers. These help us understand how our website is being used and improve our services.',
    managingTitle: 'Managing Cookies',
    managingIntro: 'You can control and manage cookies in several ways:',
    managingList: [
      'Most browsers allow you to refuse or accept cookies',
      'You can delete cookies that have already been set',
      'You can set your browser to notify you when cookies are being sent',
      'Some features of our website may not function properly if you disable cookies',
    ],
    browserTitle: 'Browser Settings',
    browserIntro: 'To manage cookies, you can adjust your browser settings:',
    browserList: [
      'Chrome: Settings → Privacy and security → Cookies and other site data',
      'Firefox: Settings → Privacy & Security → Cookies and Site Data',
      'Safari: Preferences → Privacy → Cookies and website data',
      'Edge: Settings → Cookies and site permissions → Cookies and site data',
    ],
    updatesTitle: 'Updates to This Policy',
    updatesText: 'We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this page periodically to stay informed about our use of cookies.',
    contactTitle: 'Contact Us',
    contactText: 'If you have any questions about our use of cookies, please contact us at',
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

export default function CookiePolicy() {
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const c = content[isFr ? 'fr' : 'en'];

  return (
    <PageLayout>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        keywords="cookie policy, cookies, tracking, web analytics, politique des cookies"
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
            <Section title={c.whatAre}>
              <p style={{ margin: 0 }}>{c.whatAreText}</p>
            </Section>

            <Section title={c.howWeUse}>
              <p style={{ margin: '0 0 0.5rem 0' }}>{c.howWeUseIntro}</p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                {c.howWeUseList.map((item, i) => (
                  <li key={i} style={{ marginBottom: '0.35rem' }}>{item}</li>
                ))}
              </ul>
            </Section>

            <Section title={c.typesTitle}>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: BORDEAUX }}>{c.sessionTitle}</p>
              <p style={{ margin: '0 0 1rem 0' }}>{c.sessionText}</p>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: BORDEAUX }}>{c.persistentTitle}</p>
              <p style={{ margin: '0 0 1rem 0' }}>{c.persistentText}</p>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: BORDEAUX }}>{c.thirdPartyTitle}</p>
              <p style={{ margin: 0 }}>{c.thirdPartyText}</p>
            </Section>

            <Section title={c.managingTitle}>
              <p style={{ margin: '0 0 0.5rem 0' }}>{c.managingIntro}</p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                {c.managingList.map((item, i) => (
                  <li key={i} style={{ marginBottom: '0.35rem' }}>{item}</li>
                ))}
              </ul>
            </Section>

            <Section title={c.browserTitle}>
              <p style={{ margin: '0 0 0.5rem 0' }}>{c.browserIntro}</p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                {c.browserList.map((item, i) => (
                  <li key={i} style={{ marginBottom: '0.35rem' }}>{item}</li>
                ))}
              </ul>
            </Section>

            <Section title={c.updatesTitle}>
              <p style={{ margin: 0 }}>{c.updatesText}</p>
            </Section>

            <Section title={c.contactTitle}>
              <p style={{ margin: 0 }}>
                {c.contactText}{' '}
                <a href="mailto:hello@nukleo.com" style={{ color: LINK_COLOR, fontWeight: 600 }}>hello@nukleo.com</a>.
              </p>
            </Section>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
