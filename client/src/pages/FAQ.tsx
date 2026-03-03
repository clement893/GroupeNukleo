import PageLayout from '@/components/PageLayout';
import { SplitCTAButton } from '@/components/SplitCTAButton';
import SEO from '@/components/SEO';
import StructuredData, { createFAQSchema } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';

const BORDEAUX = '#5A1E29';
const OFF_WHITE = '#EFE8E8';
const BTN_PURPLE = '#5B21B6';

export default function FAQ() {
  const { language, t } = useLanguage();

  const faqsFr = [
    {
      category: "Services & Solutions",
      questions: [
        {
          question: "Quels services propose Nukleo Digital ?",
          answer: "Nukleo Digital offre une gamme complète de services incluant la stratégie marketing IA, le développement de plateformes digitales, les opérations intelligentes, le studio créatif, le laboratoire IA, et le bureau stratégique. Nous accompagnons les entreprises dans leur transformation digitale avec des solutions sur mesure."
        },
        {
          question: "Comment fonctionne votre évaluation de préparation à l'IA ?",
          answer: "Notre évaluation de préparation à l'IA (AI Readiness Assessment) analyse votre infrastructure technologique, vos processus métier, et votre culture organisationnelle pour déterminer votre niveau de maturité IA. Nous fournissons un rapport détaillé avec des recommandations personnalisées pour accélérer votre adoption de l'IA."
        },
        {
          question: "Proposez-vous des solutions sur mesure ?",
          answer: "Absolument. Chaque projet chez Nukleo Digital est conçu sur mesure pour répondre aux besoins spécifiques de nos clients. Nous commençons par une analyse approfondie de vos défis et objectifs, puis nous développons des solutions adaptées à votre contexte unique."
        }
      ]
    },
    {
      category: "Processus & Méthodologie",
      questions: [
        {
          question: "Comment se déroule un projet avec Nukleo Digital ?",
          answer: "Notre processus commence par une phase de découverte où nous analysons vos besoins et objectifs. Ensuite, nous développons une stratégie personnalisée, puis nous passons à l'implémentation avec des itérations régulières et des retours clients. Nous assurons également un suivi post-lancement pour garantir le succès à long terme."
        },
        {
          question: "Quel est le délai moyen pour un projet ?",
          answer: "Les délais varient selon la complexité et la portée du projet. Un projet de stratégie marketing IA peut prendre 4-8 semaines, tandis qu'une plateforme digitale complète peut nécessiter 3-6 mois. Nous fournissons des estimations détaillées lors de notre première consultation."
        },
        {
          question: "Travaillez-vous avec des entreprises de toutes tailles ?",
          answer: "Oui, nous travaillons avec des startups, des PME et des grandes entreprises. Notre approche s'adapte à chaque contexte, que vous soyez une jeune entreprise cherchant à intégrer l'IA ou une organisation établie visant une transformation digitale complète."
        }
      ]
    },
    {
      category: "Technologie & IA",
      questions: [
        {
          question: "Quelles technologies utilisez-vous ?",
          answer: "Nous utilisons les dernières technologies en IA, notamment les modèles de langage avancés, l'apprentissage automatique, et l'analyse de données. Nos solutions sont construites avec des frameworks modernes et des architectures cloud-native pour garantir performance, scalabilité et sécurité."
        },
        {
          question: "Comment garantissez-vous la sécurité des données ?",
          answer: "La sécurité est une priorité absolue. Nous implémentons des mesures de sécurité de niveau entreprise, incluant le chiffrement des données, l'authentification multi-facteurs, et la conformité aux réglementations comme le RGPD. Toutes nos solutions respectent les meilleures pratiques de sécurité."
        },
        {
          question: "Proposez-vous de la formation pour nos équipes ?",
          answer: "Oui, nous offrons des programmes de formation personnalisés pour aider vos équipes à maîtriser les outils et technologies que nous déployons. Nous croyons que le succès à long terme nécessite que vos équipes soient autonomes et compétentes."
        }
      ]
    },
    {
      category: "Tarification & Engagement",
      questions: [
        {
          question: "Comment fonctionne votre tarification ?",
          answer: "Notre tarification est adaptée à chaque projet. Nous proposons des modèles flexibles incluant des projets à forfait, des engagements mensuels, ou des contrats annuels selon vos besoins. Contactez-nous pour une consultation gratuite et un devis personnalisé."
        },
        {
          question: "Proposez-vous des consultations gratuites ?",
          answer: "Oui, nous offrons une consultation initiale gratuite pour discuter de vos besoins et explorer comment nous pouvons vous aider. C'est l'occasion idéale de poser vos questions et de comprendre notre approche."
        },
        {
          question: "Quel est votre processus de facturation ?",
          answer: "Nous facturons généralement en plusieurs étapes selon l'avancement du projet. Un acompte initial est requis pour démarrer, puis des paiements sont effectués à des jalons prédéfinis. Pour les contrats récurrents, la facturation est mensuelle ou annuelle selon l'accord."
        }
      ]
    },
    {
      category: "Support & Suivi",
      questions: [
        {
          question: "Quel support offrez-vous après la livraison ?",
          answer: "Nous offrons un support complet post-lancement incluant la maintenance, les mises à jour, le dépannage, et l'optimisation continue. Nos clients bénéficient d'un accès prioritaire à notre équipe de support et de mises à jour régulières de leurs solutions."
        },
        {
          question: "Comment puis-je suivre l'avancement de mon projet ?",
          answer: "Nous maintenons une communication transparente tout au long du projet avec des réunions régulières, des rapports d'avancement détaillés, et un accès à un portail client où vous pouvez suivre les progrès en temps réel."
        },
        {
          question: "Que faire si je ne suis pas satisfait du résultat ?",
          answer: "Votre satisfaction est notre priorité. Nous travaillons en étroite collaboration avec vous à chaque étape pour garantir que le résultat final répond à vos attentes. Si des ajustements sont nécessaires, nous les effectuons jusqu'à ce que vous soyez entièrement satisfait."
        }
      ]
    }
  ];

  const faqsEn = [
    {
      category: "Services & Solutions",
      questions: [
        {
          question: "What services does Nukleo Digital offer?",
          answer: "Nukleo Digital offers a comprehensive range of services including AI marketing strategy, digital platform development, intelligent operations, creative studio, AI lab, and strategic bureau. We support businesses in their digital transformation with customized solutions."
        },
        {
          question: "How does your AI Readiness Assessment work?",
          answer: "Our AI Readiness Assessment analyzes your technological infrastructure, business processes, and organizational culture to determine your AI maturity level. We provide a detailed report with personalized recommendations to accelerate your AI adoption."
        },
        {
          question: "Do you offer customized solutions?",
          answer: "Absolutely. Every project at Nukleo Digital is custom-designed to meet the specific needs of our clients. We start with an in-depth analysis of your challenges and objectives, then develop solutions tailored to your unique context."
        }
      ]
    },
    {
      category: "Process & Methodology",
      questions: [
        {
          question: "How does a project with Nukleo Digital work?",
          answer: "Our process begins with a discovery phase where we analyze your needs and objectives. Then, we develop a personalized strategy, followed by implementation with regular iterations and client feedback. We also ensure post-launch follow-up to guarantee long-term success."
        },
        {
          question: "What is the average timeline for a project?",
          answer: "Timelines vary depending on the complexity and scope of the project. An AI marketing strategy project can take 4-8 weeks, while a complete digital platform may require 3-6 months. We provide detailed estimates during our initial consultation."
        },
        {
          question: "Do you work with companies of all sizes?",
          answer: "Yes, we work with startups, SMEs, and large enterprises. Our approach adapts to each context, whether you're a young company looking to integrate AI or an established organization aiming for complete digital transformation."
        }
      ]
    },
    {
      category: "Technology & AI",
      questions: [
        {
          question: "What technologies do you use?",
          answer: "We use the latest AI technologies, including advanced language models, machine learning, and data analytics. Our solutions are built with modern frameworks and cloud-native architectures to ensure performance, scalability, and security."
        },
        {
          question: "How do you ensure data security?",
          answer: "Security is an absolute priority. We implement enterprise-level security measures, including data encryption, multi-factor authentication, and compliance with regulations such as GDPR. All our solutions adhere to security best practices."
        },
        {
          question: "Do you offer training for our teams?",
          answer: "Yes, we offer customized training programs to help your teams master the tools and technologies we deploy. We believe that long-term success requires your teams to be autonomous and competent."
        }
      ]
    },
    {
      category: "Pricing & Engagement",
      questions: [
        {
          question: "How does your pricing work?",
          answer: "Our pricing is tailored to each project. We offer flexible models including fixed-price projects, monthly commitments, or annual contracts depending on your needs. Contact us for a free consultation and personalized quote."
        },
        {
          question: "Do you offer free consultations?",
          answer: "Yes, we offer an initial free consultation to discuss your needs and explore how we can help you. It's the perfect opportunity to ask your questions and understand our approach."
        },
        {
          question: "What is your billing process?",
          answer: "We typically bill in several stages based on project progress. An initial deposit is required to start, then payments are made at predefined milestones. For recurring contracts, billing is monthly or annual according to the agreement."
        }
      ]
    },
    {
      category: "Support & Follow-up",
      questions: [
        {
          question: "What support do you offer after delivery?",
          answer: "We offer comprehensive post-launch support including maintenance, updates, troubleshooting, and continuous optimization. Our clients benefit from priority access to our support team and regular updates to their solutions."
        },
        {
          question: "How can I track my project progress?",
          answer: "We maintain transparent communication throughout the project with regular meetings, detailed progress reports, and access to a client portal where you can track progress in real-time."
        },
        {
          question: "What if I'm not satisfied with the result?",
          answer: "Your satisfaction is our priority. We work closely with you at every step to ensure the final result meets your expectations. If adjustments are needed, we make them until you are completely satisfied."
        }
      ]
    }
  ];

  const faqs = language === 'fr' ? faqsFr : faqsEn;

  const content = {
    fr: {
      title: "Questions Fréquentes",
      subtitle: "Trouvez les réponses aux questions les plus courantes sur nos services, notre processus et nos solutions.",
      ctaTitle: "Vous avez d'autres questions ?",
      ctaText: "Notre équipe est là pour vous aider. N'hésitez pas à nous contacter.",
      ctaButton: "Nous contacter",
      seoTitle: "FAQ | Questions Fréquentes | Nukleo Digital",
      seoDescription: "Trouvez les réponses aux questions fréquentes sur les services, processus et solutions de Nukleo Digital. Tout ce que vous devez savoir sur notre agence de marketing IA.",
      seoKeywords: "FAQ, questions fréquentes, support, aide, Nukleo Digital, marketing IA, services digitaux"
    },
    en: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to the most common questions about our services, process, and solutions.",
      ctaTitle: "Have more questions?",
      ctaText: "Our team is here to help. Don't hesitate to contact us.",
      ctaButton: "Contact Us",
      seoTitle: "FAQ | Frequently Asked Questions | Nukleo Digital",
      seoDescription: "Find answers to frequently asked questions about Nukleo Digital's services, processes, and solutions. Everything you need to know about our AI marketing agency.",
      seoKeywords: "FAQ, frequently asked questions, support, help, Nukleo Digital, AI marketing, digital services"
    }
  };

  const currentContent = content[language];

  const allFaqs = faqs.flatMap(category =>
    category.questions.map(q => ({ question: q.question, answer: q.answer }))
  );
  const faqSchema = createFAQSchema(allFaqs);

  return (
    <PageLayout>
      <SEO
        title={currentContent.seoTitle}
        description={currentContent.seoDescription}
        keywords={currentContent.seoKeywords}
      />
      <StructuredData data={faqSchema} />

      <div className="min-h-screen" style={{ color: '#374151' }}>
        {/* Hero */}
        <section className="pt-24 pb-10 lg:pt-32 lg:pb-14">
          <div className="container">
            <Breadcrumb items={[{ name: t('nav.faq') || 'FAQ', url: '/faq' }]} />
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3"
              style={{ color: BORDEAUX, fontFamily: 'var(--font-heading, sans-serif)' }}
            >
              {currentContent.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              {currentContent.subtitle}
            </p>
          </div>
        </section>

        {/* FAQ by category */}
        <section className="pb-16 lg:pb-24">
          <div className="container">
            <div className="space-y-12">
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-4">
                  <h2
                    className="text-xl md:text-2xl font-bold pb-2 border-b border-gray-200"
                    style={{ color: BORDEAUX, fontFamily: 'var(--font-heading, sans-serif)' }}
                  >
                    {category.category}
                  </h2>
                  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem
                          key={faqIndex}
                          value={`item-${categoryIndex}-${faqIndex}`}
                          className="border-b border-gray-100 last:border-b-0 px-6"
                        >
                          <AccordionTrigger className="text-left text-gray-900 hover:text-[#5A1E29] py-5 text-base md:text-lg font-semibold transition-colors hover:no-underline [&[data-state=open]>svg]:rotate-180">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 leading-relaxed pb-5 text-base">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20 lg:pb-28">
          <div className="container">
            <div className="p-8 md:p-12 text-center">
              <h3
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: BORDEAUX, fontFamily: 'var(--font-heading, sans-serif)' }}
              >
                {currentContent.ctaTitle}
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                {currentContent.ctaText}
              </p>
              <SplitCTAButton href="/contact" label={currentContent.ctaButton} ariaLabel={currentContent.ctaButton} />
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
