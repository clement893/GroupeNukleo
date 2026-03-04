import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';

const OFF_WHITE = '#EFE8E8';
const BORDEAUX = '#5A1E29';
const LINK_COLOR = '#523DCB';

const content = {
  fr: {
    seoTitle: 'Politique de confidentialité | Nukleo.TIME',
    seoDescription: 'Comment Nukleo.TIME collecte, utilise et protège vos données. Notre engagement en matière de confidentialité pour l\'application de suivi du temps.',
    legal: 'Mentions légales',
    title: 'Politique de confidentialité',
    subtitle: 'Nukleo.TIME — Suivez votre temps, synchronisez avec votre ERP',
    lastUpdated: 'Dernière mise à jour : 25 janvier 2026',
    intro: 'Nukleo.TIME (« nous », « notre ») s\'engage à protéger votre vie privée. Cette politique explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre application mobile.',
    infoWeCollect: 'Informations que nous collectons',
    infoYouProvide: 'Informations que vous fournissez',
    accountInfo: 'Informations de compte : lors de la création d\'un compte, nous collectons votre adresse e-mail et vos identifiants. En cas de connexion par QR code, nous recevons des identifiants chiffrés depuis l\'ERP de votre entreprise.',
    workData: 'Données de travail : nous collectons et stockons les sessions de travail (heures de début et fin, noms de projets, descriptions des tâches, durée). Ces données sont essentielles au suivi du temps.',
    petData: 'Données du compagnon virtuel : vos choix, historique d\'alimentation et progression sont stockés localement sur l\'appareil et ne sont pas transmis à nos serveurs.',
    autoCollected: 'Informations collectées automatiquement',
    deviceInfo: 'Informations sur l\'appareil : type d\'appareil, version du système et de l\'application pour la compatibilité et les performances.',
    usageData: 'Données d\'utilisation : statistiques anonymes sur les fonctionnalités utilisées, agrégées et non identifiantes.',
    syncData: 'Données de synchronisation : horodatage et statut de la synchro avec l\'ERP pour le dépannage et l\'intégrité des données.',
    howWeUse: 'Utilisation des informations',
    howWeUseList: [
      'Fonctionnalités : suivi du temps, minuteur Pomodoro, gestion des sessions',
      'Intégration ERP : synchronisation des heures avec l\'ERP de l\'employeur',
      'Gamification : progression du compagnon virtuel (stockée localement)',
      'Amélioration : analyse des usages pour améliorer l\'app et corriger les bugs',
      'Support : réponses à vos questions et assistance technique',
      'Sécurité : détection et prévention des usages non autorisés',
    ],
    storageSecurity: 'Stockage et sécurité des données',
    localStorage: 'La plupart des données personnelles (compagnon, préférences) sont stockées localement avec chiffrement (SecureStore / AsyncStorage).',
    cloudSync: 'Les entrées de temps sont synchronisées avec l\'ERP via HTTPS. Nous ne conservons pas de copie au-delà de ce qui est nécessaire à la synchro.',
    dbSecurity: 'Les comptes sont stockés dans une base PostgreSQL sécurisée (Railway), chiffrement au repos et en transit, accès restreint.',
    auth: 'Authentification par JWT, tokens stockés de façon sécurisée sur l\'appareil, transmission chiffrée uniquement.',
    sharing: 'Partage et divulgation',
    weDoNot: 'Nous ne vendons pas vos données, ne les partageons pas avec des annonceurs, et n\'utilisons pas vos données à d\'autres fins que celles décrites.',
    weMayShare: 'Nous pouvons partager vos informations uniquement : avec l\'employeur (données de temps pour paie et gestion de projets), si la loi l\'exige, ou avec des prestataires (Railway, Expo) liés par confidentialité.',
    retention: 'Conservation des données',
    activeAccounts: 'Comptes actifs : conservation tant que le compte est actif et selon la politique de l\'employeur.',
    deletedAccounts: 'Comptes supprimés : suppression des données personnelles sous 30 jours, sauf obligation légale.',
    localData: 'Données locales : supprimées à la désinstallation de l\'app.',
    yourRights: 'Vos droits',
    rightsList: ['Accès à vos données', 'Rectification', 'Suppression (sous réserve des obligations légales)', 'Portabilité (export CSV/JSON)', 'Opposition à la synchro ERP', 'Retrait du consentement'],
    rightsContact: 'Pour exercer ces droits, contactez-nous à l\'adresse ci-dessous. Réponse sous 30 jours.',
    children: 'Nukleo.TIME n\'est pas destiné aux moins de 13 ans. Nous ne collectons pas sciemment de données d\'enfants ; en cas de collecte involontaire, nous les supprimons.',
    international: 'Si vous êtes hors du pays d\'hébergement de nos serveurs, vos données peuvent être transférées et traitées ailleurs. En utilisant Nukleo.TIME, vous acceptez ce transfert. Nous appliquons des garanties conformes à cette politique.',
    changes: 'Modifications de la politique',
    changesText: 'Nous pouvons mettre à jour cette politique. Nous vous informerons par une nouvelle date « Dernière mise à jour », une notification dans l\'app et, le cas échéant, une acceptation avant poursuite de l\'utilisation. L\'utilisation continue vaut acceptation.',
    thirdParty: 'Services tiers',
    thirdPartyText: 'Nukleo.TIME s\'appuie sur : Railway (hébergement), Expo (distribution), Google Sign-In (optionnel). Chaque service a sa propre politique de confidentialité.',
    contact: 'Nous contacter',
    contactText: 'Pour toute question sur cette politique ou nos pratiques :',
    email: 'E-mail :',
    github: 'GitHub Issues :',
    respondWithin: 'Nous répondons à toutes les demandes sous 30 jours.',
    copyright: '© 2026 Nukleo.TIME. Tous droits réservés.',
  },
  en: {
    seoTitle: 'Privacy Policy | Nukleo.TIME',
    seoDescription: 'Learn how Nukleo.TIME collects, uses, and protects your information. Our commitment to data privacy and security for our time tracking mobile application.',
    legal: 'Legal',
    title: 'Privacy Policy',
    subtitle: 'Nukleo.TIME — Track your time, sync with your ERP',
    lastUpdated: 'Last updated: January 25, 2026',
    intro: 'Nukleo.TIME ("we", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application.',
    infoWeCollect: 'Information We Collect',
    infoYouProvide: 'Information You Provide',
    accountInfo: 'Account Information: When you create an account, we collect your email address and authentication credentials. If you use QR code login, we receive encrypted credentials from your company\'s ERP system.',
    workData: 'Work Data: We collect and store information about your work sessions, including start and end times, project names, task descriptions, and duration. This data is essential for the time tracking functionality.',
    petData: 'Pet Data: Your virtual pet choices, feeding history, and gamification progress are stored locally on your device and are not transmitted to our servers.',
    autoCollected: 'Automatically Collected Information',
    deviceInfo: 'Device Information: We collect basic device information such as device type, operating system version, and app version to ensure compatibility and optimize performance.',
    usageData: 'Usage Data: We collect anonymous usage statistics about which features you use and how often. This data is aggregated and cannot be used to identify you personally.',
    syncData: 'Sync Data: We log timestamps and status of data synchronization with your ERP system to troubleshoot sync issues and ensure data integrity.',
    howWeUse: 'How We Use Your Information',
    howWeUseList: [
      'Provide Core Functionality: Enable time tracking, Pomodoro timer, and work session management',
      'ERP Integration: Sync your work hours with your company\'s ERP system as required by your employer',
      'Gamification: Display your virtual pet progress (stored locally)',
      'Improve User Experience: Analyze usage patterns to enhance app features and fix bugs',
      'Customer Support: Respond to your inquiries and provide technical assistance',
      'Security: Detect and prevent fraudulent activity or unauthorized access',
    ],
    storageSecurity: 'Data Storage and Security',
    localStorage: 'Local Storage: Most personal data, including pet progress and app preferences, is stored locally using secure encrypted storage (SecureStore / AsyncStorage).',
    cloudSync: 'Cloud Sync: Time tracking entries are synchronized with your company\'s ERP using encrypted HTTPS. We do not store copies beyond what is necessary for synchronization.',
    dbSecurity: 'Database Security: User account information is stored in a secure PostgreSQL database (Railway) with encryption at rest and in transit. Access is restricted and monitored.',
    auth: 'Authentication: We use JWT for secure authentication. Tokens are stored securely on your device and transmitted only over encrypted connections.',
    sharing: 'Data Sharing and Disclosure',
    weDoNot: 'We do NOT sell your personal information, share it with advertisers, or use your data for purposes other than those described in this policy.',
    weMayShare: 'We MAY share your information only: with your employer (time data for payroll and project management), when required by law, or with service providers (Railway, Expo) bound by confidentiality.',
    retention: 'Data Retention',
    activeAccounts: 'Active Accounts: We retain your account and time tracking data for as long as your account is active and as required by your employer\'s policies.',
    deletedAccounts: 'Deleted Accounts: When you delete your account, we permanently delete your personal information within 30 days, except where required by law.',
    localData: 'Local Data: Data stored on your device (pet progress, preferences) is deleted when you uninstall the app.',
    yourRights: 'Your Rights',
    rightsList: ['Access: Request a copy of your personal data', 'Rectification: Correct inaccurate information', 'Deletion: Request deletion (subject to legal retention)', 'Data Portability: Export your data (CSV or JSON)', 'Opt-Out: Disable ERP sync (may affect app use)', 'Withdraw Consent: Revoke consent at any time'],
    rightsContact: 'To exercise these rights, please contact us at the email below. We will respond within 30 days.',
    children: 'Nukleo.TIME is not intended for children under 13. We do not knowingly collect personal information from children under 13; if we become aware of such collection, we will delete it.',
    international: 'If you are located outside the country where our servers are hosted, your information may be transferred and processed there. By using Nukleo.TIME, you consent to this transfer. We ensure appropriate safeguards in accordance with this policy.',
    changes: 'Changes to This Policy',
    changesText: 'We may update this Privacy Policy from time to time. We will notify you by posting a new "Last updated" date, in-app notification, and where applicable requiring acceptance before continued use. Continued use constitutes acceptance.',
    thirdParty: 'Third-Party Services',
    thirdPartyText: 'Nukleo.TIME integrates with: Railway (hosting), Expo (distribution), Google Sign-In (optional). Each has its own privacy policy.',
    contact: 'Contact Us',
    contactText: 'If you have any questions about this policy or our data practices:',
    email: 'Email:',
    github: 'GitHub Issues:',
    respondWithin: 'We will respond to all inquiries within 30 days.',
    copyright: '© 2026 Nukleo.TIME. All rights reserved.',
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

export default function PrivacyPolicyNukleoTime() {
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const c = content[isFr ? 'fr' : 'en'];

  return (
    <PageLayout>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        keywords="privacy policy, Nukleo.TIME, time tracking, data protection, mobile app privacy, GDPR, politique de confidentialité"
      />
      <div style={{ minHeight: '100vh', background: OFF_WHITE, fontFamily: "'Google Sans Flex', sans-serif" }}>
        {/* Hero */}
        <section style={{ padding: 'clamp(5rem, 10vh, 7rem) 0 0' }}>
          <div className="container">
            <p style={{
              fontFamily: "'Google Sans Flex', sans-serif",
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
                fontFamily: "'Google Sans Flex', sans-serif",
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
            <p style={{ fontSize: '0.95rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>{c.subtitle}</p>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>{c.lastUpdated}</p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: '2rem 0 4rem' }}>
          <div className="container">
            <Section title={isFr ? 'Introduction' : 'Introduction'}>
              <p style={{ margin: 0 }}>{c.intro}</p>
            </Section>

            <Section title={c.infoWeCollect}>
              <p style={{ margin: '0 0 0.75rem 0' }}><strong>{c.infoYouProvide}</strong></p>
              <p style={{ margin: '0 0 0.5rem 0' }}>{c.accountInfo}</p>
              <p style={{ margin: '0 0 0.5rem 0' }}>{c.workData}</p>
              <p style={{ margin: '0 0 0.75rem 0' }}>{c.petData}</p>
              <p style={{ margin: '0 0 0.5rem 0' }}><strong>{c.autoCollected}</strong></p>
              <p style={{ margin: '0 0 0.5rem 0' }}>{c.deviceInfo}</p>
              <p style={{ margin: '0 0 0.5rem 0' }}>{c.usageData}</p>
              <p style={{ margin: 0 }}>{c.syncData}</p>
            </Section>

            <Section title={c.howWeUse}>
              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                {c.howWeUseList.map((item, i) => (
                  <li key={i} style={{ marginBottom: '0.35rem' }}>{item}</li>
                ))}
              </ul>
            </Section>

            <Section title={c.storageSecurity}>
              <p style={{ margin: '0 0 0.5rem 0' }}>{c.localStorage}</p>
              <p style={{ margin: '0 0 0.5rem 0' }}>{c.cloudSync}</p>
              <p style={{ margin: '0 0 0.5rem 0' }}>{c.dbSecurity}</p>
              <p style={{ margin: 0 }}>{c.auth}</p>
            </Section>

            <Section title={c.sharing}>
              <p style={{ margin: '0 0 0.5rem 0' }}>{c.weDoNot}</p>
              <p style={{ margin: 0 }}>{c.weMayShare}</p>
            </Section>

            <Section title={c.retention}>
              <p style={{ margin: '0 0 0.5rem 0' }}>{c.activeAccounts}</p>
              <p style={{ margin: '0 0 0.5rem 0' }}>{c.deletedAccounts}</p>
              <p style={{ margin: 0 }}>{c.localData}</p>
            </Section>

            <Section title={c.yourRights}>
              <ul style={{ margin: '0 0 0.75rem 0', paddingLeft: '1.25rem' }}>
                {c.rightsList.map((item, i) => (
                  <li key={i} style={{ marginBottom: '0.25rem' }}>{item}</li>
                ))}
              </ul>
              <p style={{ margin: 0 }}>{c.rightsContact}</p>
            </Section>

            <Section title={isFr ? 'Vie privée des enfants' : 'Children\'s Privacy'}>
              <p style={{ margin: 0 }}>{c.children}</p>
            </Section>

            <Section title={isFr ? 'Transferts internationaux' : 'International Data Transfers'}>
              <p style={{ margin: 0 }}>{c.international}</p>
            </Section>

            <Section title={c.changes}>
              <p style={{ margin: 0 }}>{c.changesText}</p>
            </Section>

            <Section title={c.thirdParty}>
              <p style={{ margin: '0 0 0.5rem 0' }}>{c.thirdPartyText}</p>
              <p style={{ margin: 0 }}>
                <a href="https://railway.app/legal/privacy" target="_blank" rel="noopener noreferrer" style={{ color: LINK_COLOR, fontWeight: 600 }}>Railway</a>
                {' · '}
                <a href="https://expo.dev/privacy" target="_blank" rel="noopener noreferrer" style={{ color: LINK_COLOR, fontWeight: 600 }}>Expo</a>
                {' · '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: LINK_COLOR, fontWeight: 600 }}>Google</a>
              </p>
            </Section>

            <Section title={c.contact}>
              <p style={{ margin: '0 0 0.5rem 0' }}>{c.contactText}</p>
              <p style={{ margin: '0 0 0.25rem 0' }}><strong>{c.email}</strong> <a href="mailto:hello@nukleo.com" style={{ color: LINK_COLOR, fontWeight: 600 }}>hello@nukleo.com</a></p>
              <p style={{ margin: 0 }}><strong>{c.github}</strong>{' '}
                <a href="https://github.com/clement893/NUKLEO.TIME/issues" target="_blank" rel="noopener noreferrer" style={{ color: LINK_COLOR, fontWeight: 600 }}>GitHub Issues</a>
              </p>
              <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>{c.respondWithin}</p>
            </Section>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>{c.copyright}</p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
