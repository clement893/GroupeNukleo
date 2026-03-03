import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';

const OFF_WHITE = '#EFE8E8';
const BORDEAUX = '#5A1E29';
const LINK_COLOR = '#5636AD';

const content = {
  fr: {
    seoTitle: 'Conditions d\'utilisation | Nukleo Digital',
    seoDescription: 'Conditions d\'utilisation de Nukleo Digital. Modalités régissant l\'utilisation de nos services et de notre plateforme.',
    legal: 'Mentions légales',
    title: 'Conditions d\'utilisation',
    lastUpdated: 'Dernière mise à jour : 9 décembre 2024',
    section1Title: '1. Acceptation des conditions',
    section1Text: 'En accédant et en utilisant les services de Nukleo Digital, vous acceptez d\'être lié par les présentes conditions. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser nos services.',
    section2Title: '2. Utilisation des services',
    section2Intro: 'Vous vous engagez à n\'utiliser nos services qu\'à des fins licites et conformément aux présentes conditions. Vous vous engagez à ne pas :',
    section2List: [
      'Utiliser les services en violation des lois ou réglementations applicables',
      'Restreindre ou empêcher l\'utilisation des services par autrui',
      'Tenter d\'accéder sans autorisation à une partie des services',
      'Transmettre du code nuisible ou malveillant',
      'Perturber les services ou les serveurs',
    ],
    section3Title: '3. Propriété intellectuelle',
    section3Text: 'Les services, leur contenu, leurs fonctionnalités sont la propriété de Nukleo Digital et sont protégés par les lois sur le droit d\'auteur, les marques, les brevets et la propriété intellectuelle. Vous ne pouvez pas copier, modifier, distribuer ou concéder sous licence une partie de nos services sans notre autorisation écrite préalable.',
    section4Title: '4. Comptes utilisateur',
    section4Text: 'Lors de la création d\'un compte, vous devez fournir des informations exactes, complètes et à jour. Vous êtes responsable de la confidentialité de vos identifiants et de toute activité sous votre compte. Vous devez nous informer immédiatement de toute utilisation non autorisée.',
    section5Title: '5. Modifications des services',
    section5Text: 'Nous nous réservons le droit de modifier ou d\'interrompre les services (en tout ou en partie), temporairement ou définitivement, avec ou sans préavis. Nous ne serons pas responsables envers vous ou tout tiers pour toute modification, suspension ou interruption.',
    section6Title: '6. Limitation de responsabilité',
    section6Text: 'Nukleo Digital, ses dirigeants, employés, partenaires ou fournisseurs ne pourront en aucun cas être tenus responsables de dommages indirects, accessoires, spéciaux, consécutifs ou punitifs résultant de l\'accès ou de l\'utilisation (ou de l\'impossibilité d\'accéder ou d\'utiliser) les services.',
    section7Title: '7. Droit applicable',
    section7Text: 'Les présentes conditions sont régies et interprétées conformément au droit canadien, sans égard aux règles de conflit de lois. Le fait que nous n\'exercions pas un droit ou une disposition ne constitue pas une renonciation à ce droit.',
    section8Title: '8. Modifications des conditions',
    section8Text: 'Nous nous réservons le droit de modifier nos conditions d\'utilisation à tout moment. Nous vous informerons des changements en publiant les nouvelles conditions sur cette page et en mettant à jour la date « Dernière mise à jour ». Votre utilisation continue des services après toute modification vaut acceptation des nouvelles conditions.',
    section9Title: '9. Nous contacter',
    section9Text: 'Pour toute question concernant ces conditions, contactez-nous à',
  },
  en: {
    seoTitle: 'Terms of Service | Nukleo Digital',
    seoDescription: 'Read Nukleo Digital\'s Terms of Service. Legal terms and conditions governing the use of our services and platform.',
    legal: 'Legal',
    title: 'Terms of Service',
    lastUpdated: 'Last updated: December 9, 2024',
    section1Title: '1. Acceptance of Terms',
    section1Text: 'By accessing and using Nukleo Digital\'s services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use our services.',
    section2Title: '2. Use of Services',
    section2Intro: 'You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:',
    section2List: [
      'Use the services in any way that violates applicable laws or regulations',
      'Engage in any conduct that restricts or inhibits anyone\'s use of the services',
      'Attempt to gain unauthorized access to any portion of the services',
      'Use the services to transmit any harmful or malicious code',
      'Interfere with or disrupt the services or servers',
    ],
    section3Title: '3. Intellectual Property',
    section3Text: 'The services and their original content, features, and functionality are owned by Nukleo Digital and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our services without our prior written permission.',
    section4Title: '4. User Accounts',
    section4Text: 'When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding your account credentials and for any activities or actions under your account. You must notify us immediately of any unauthorized use of your account.',
    section5Title: '5. Service Modifications',
    section5Text: 'We reserve the right to modify or discontinue, temporarily or permanently, the services (or any part thereof) with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the services.',
    section6Title: '6. Limitation of Liability',
    section6Text: 'In no event shall Nukleo Digital, its directors, employees, partners, or suppliers be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the services.',
    section7Title: '7. Governing Law',
    section7Text: 'These Terms shall be governed and construed in accordance with the laws of Canada, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.',
    section8Title: '8. Changes to Terms',
    section8Text: 'We reserve the right to update or change our Terms of Service at any time. We will notify you of any changes by posting the new Terms of Service on this page and updating the "Last updated" date. Your continued use of the services after any such changes constitutes your acceptance of the new Terms.',
    section9Title: '9. Contact Us',
    section9Text: 'If you have any questions about these Terms of Service, please contact us at',
  },
} as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 20,
      padding: '1.75rem 2rem',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      marginBottom: '1.5rem',
    }}>
      <h2 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        fontSize: '1.35rem',
        color: BORDEAUX,
        margin: '0 0 1rem 0',
      }}>
        {title}
      </h2>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.9375rem', color: '#4b5563', lineHeight: 1.65 }}>
        {children}
      </div>
    </div>
  );
}

export default function TermsOfService() {
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const c = content[isFr ? 'fr' : 'en'];

  return (
    <PageLayout>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        keywords="terms of service, terms and conditions, legal agreement, conditions d'utilisation"
      />
      <div style={{ minHeight: '100vh', background: OFF_WHITE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Hero */}
        <section style={{ padding: 'clamp(5rem, 10vh, 7rem) 0 0' }}>
          <div className="w-full">
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
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
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                margin: '0 0 0.5rem 0',
                background: 'linear-gradient(to right, #6B1817, #5636AD)',
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
          <div className="w-full">
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
              <p style={{ margin: 0 }}>{c.section5Text}</p>
            </Section>

            <Section title={c.section6Title}>
              <p style={{ margin: 0 }}>{c.section6Text}</p>
            </Section>

            <Section title={c.section7Title}>
              <p style={{ margin: 0 }}>{c.section7Text}</p>
            </Section>

            <Section title={c.section8Title}>
              <p style={{ margin: 0 }}>{c.section8Text}</p>
            </Section>

            <Section title={c.section9Title}>
              <p style={{ margin: 0 }}>
                {c.section9Text}{' '}
                <a href="mailto:hello@nukleo.com" style={{ color: LINK_COLOR, fontWeight: 600 }}>hello@nukleo.com</a>.
              </p>
            </Section>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
