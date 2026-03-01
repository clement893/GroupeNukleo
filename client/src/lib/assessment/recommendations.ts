import { MaturityLevel } from './scoring';
import { Dimension } from './questions';
import { RECOMMENDATIONS_BY_LEVEL_EN } from './recommendationsEn';

export interface Recommendation {
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'Low' | 'Medium' | 'High';
  timeline: string;
  dimension: Dimension;
}

export interface MaturityRecommendations {
  level: MaturityLevel;
  characteristics: string[];
  topRecommendations: Recommendation[];
  nextSteps: {
    title: string;
    duration: string;
  }[];
}

export const RECOMMENDATIONS_BY_LEVEL: Record<MaturityLevel, MaturityRecommendations> = {
  'Explorer': {
    level: 'Explorer',
    characteristics: [
      'Aucune initiative IA formelle',
      'Données fragmentées',
      'Pas de compétences IA',
      'Culture traditionnelle',
    ],
    topRecommendations: [
      {
        title: 'Définir une vision IA alignée avec stratégie business',
        description: 'Organiser un workshop avec la direction pour définir une vision claire de l\'IA et son rôle dans la stratégie d\'entreprise.',
        impact: 'High',
        effort: 'Low',
        timeline: '2-4 semaines',
        dimension: 'strategy',
      },
      {
        title: 'Identifier 2-3 cas d\'usage quick wins',
        description: 'Identifier des cas d\'usage IA simples avec ROI rapide (ex: automatisation de tâches répétitives, chatbot client).',
        impact: 'High',
        effort: 'Low',
        timeline: '1-2 semaines',
        dimension: 'strategy',
      },
      {
        title: 'Former l\'équipe de direction sur les opportunités IA',
        description: 'Organiser une formation exécutive d\'une journée sur les opportunités IA, les cas d\'usage et les retours sur investissement.',
        impact: 'High',
        effort: 'Low',
        timeline: '1 jour',
        dimension: 'strategy',
      },
      {
        title: 'Auditer la qualité et disponibilité des données',
        description: 'Réaliser un audit complet de vos données : qualité, accessibilité, gouvernance et préparation pour l\'IA.',
        impact: 'High',
        effort: 'Medium',
        timeline: '2-3 semaines',
        dimension: 'data',
      },
      {
        title: 'Engager un partenaire IA pour roadmap',
        description: 'Travailler avec un partenaire expert pour créer une roadmap IA adaptée à votre contexte et vos objectifs.',
        impact: 'High',
        effort: 'Low',
        timeline: '2-4 semaines',
        dimension: 'strategy',
      },
    ],
    nextSteps: [
      { title: 'Workshop vision IA', duration: '1 jour' },
      { title: 'Assessment données', duration: '2-3 semaines' },
      { title: 'Formation exécutive', duration: '1 journée' },
    ],
  },
  'Experimenter': {
    level: 'Experimenter',
    characteristics: [
      'Projets pilotes en cours',
      'Données partiellement structurées',
      '1-2 personnes avec compétences IA',
      'Intérêt croissant',
    ],
    topRecommendations: [
      {
        title: 'Prioriser 1 projet pilote pour production',
        description: 'Sélectionner le pilote le plus prometteur et le transformer en solution de production avec monitoring et gouvernance.',
        impact: 'High',
        effort: 'Medium',
        timeline: '2-3 mois',
        dimension: 'technology',
      },
      {
        title: 'Investir dans infrastructure data moderne',
        description: 'Migrer vers une infrastructure cloud moderne (data warehouse/lake) pour supporter les initiatives IA.',
        impact: 'High',
        effort: 'High',
        timeline: '3-6 mois',
        dimension: 'data',
      },
      {
        title: 'Recruter ou former data scientists',
        description: 'Constituer une petite équipe data science (2-3 personnes) soit par recrutement soit par formation interne.',
        impact: 'High',
        effort: 'Medium',
        timeline: '2-4 mois',
        dimension: 'talent',
      },
      {
        title: 'Établir gouvernance IA basique',
        description: 'Mettre en place un framework de gouvernance IA avec comité de pilotage et guidelines de base.',
        impact: 'Medium',
        effort: 'Low',
        timeline: '1-2 mois',
        dimension: 'governance',
      },
      {
        title: 'Créer un business case ROI',
        description: 'Développer un business case solide avec ROI quantifié pour obtenir le budget nécessaire aux initiatives IA.',
        impact: 'High',
        effort: 'Medium',
        timeline: '2-3 semaines',
        dimension: 'strategy',
      },
    ],
    nextSteps: [
      { title: 'POC to Production roadmap', duration: '2-3 mois' },
      { title: 'Infrastructure cloud migration', duration: '3-6 mois' },
      { title: 'Recrutement data scientist', duration: '2-4 mois' },
    ],
  },
  'Adopter': {
    level: 'Adopter',
    characteristics: [
      '1-2 solutions IA en production',
      'Infrastructure cloud établie',
      'Équipe data science en place',
      'Processus MLOps basiques',
    ],
    topRecommendations: [
      {
        title: 'Industrialiser le déploiement IA (MLOps)',
        description: 'Mettre en place une plateforme MLOps complète pour automatiser le déploiement, monitoring et retraining des modèles.',
        impact: 'High',
        effort: 'High',
        timeline: '3-6 mois',
        dimension: 'governance',
      },
      {
        title: 'Étendre les cas d\'usage à d\'autres départements',
        description: 'Identifier et déployer des cas d\'usage IA dans d\'autres départements (RH, finance, opérations).',
        impact: 'High',
        effort: 'Medium',
        timeline: '4-6 mois',
        dimension: 'strategy',
      },
      {
        title: 'Créer un centre d\'excellence IA',
        description: 'Établir un centre d\'excellence IA pour centraliser les compétences, best practices et gouvernance.',
        impact: 'High',
        effort: 'Medium',
        timeline: '3-4 mois',
        dimension: 'talent',
      },
      {
        title: 'Implémenter framework de gouvernance',
        description: 'Développer un framework de gouvernance IA complet avec processus de revue, conformité et audit.',
        impact: 'Medium',
        effort: 'Medium',
        timeline: '2-3 mois',
        dimension: 'governance',
      },
      {
        title: 'Mesurer et communiquer le ROI',
        description: 'Mettre en place un système de mesure du ROI des initiatives IA et communiquer les résultats internes et externes.',
        impact: 'Medium',
        effort: 'Low',
        timeline: '1-2 mois',
        dimension: 'culture',
      },
    ],
    nextSteps: [
      { title: 'MLOps platform setup', duration: '3-6 mois' },
      { title: 'Centre d\'excellence IA', duration: '3-4 mois' },
      { title: 'Gouvernance framework', duration: '2-3 mois' },
    ],
  },
  'Integrator': {
    level: 'Integrator',
    characteristics: [
      '3-5 solutions IA en production',
      'Platform data mature',
      'Équipe IA multidisciplinaire',
      'Gouvernance établie',
    ],
    topRecommendations: [
      {
        title: 'Développer des capacités IA propriétaires',
        description: 'Investir dans le développement de modèles IA propriétaires adaptés à votre domaine métier spécifique.',
        impact: 'High',
        effort: 'High',
        timeline: '6-12 mois',
        dimension: 'technology',
      },
      {
        title: 'Implémenter GenAI à l\'échelle',
        description: 'Déployer une plateforme GenAI entreprise avec fine-tuning, RAG et gouvernance pour tous les départements.',
        impact: 'High',
        effort: 'High',
        timeline: '6-9 mois',
        dimension: 'technology',
      },
      {
        title: 'Créer une académie IA interne',
        description: 'Établir une académie IA interne pour former tous les employés et créer une culture d\'innovation IA.',
        impact: 'High',
        effort: 'Medium',
        timeline: '3-4 mois',
        dimension: 'talent',
      },
      {
        title: 'Établir des partenariats stratégiques',
        description: 'Développer des partenariats stratégiques avec des fournisseurs, universités et startups pour co-innovation.',
        impact: 'Medium',
        effort: 'Low',
        timeline: '2-3 mois',
        dimension: 'talent',
      },
      {
        title: 'Innover avec IA avancée (agents, multimodal)',
        description: 'Expérimenter avec des technologies IA avancées comme les agents autonomes et l\'IA multimodale.',
        impact: 'High',
        effort: 'High',
        timeline: '6-12 mois',
        dimension: 'technology',
      },
    ],
    nextSteps: [
      { title: 'GenAI platform deployment', duration: '6-9 mois' },
      { title: 'Académie IA interne', duration: '3-4 mois' },
      { title: 'Agentic AI pilots', duration: '6-12 mois' },
    ],
  },
  'AI Leader': {
    level: 'AI Leader',
    characteristics: [
      '5+ solutions IA en production',
      'Architecture IA-native',
      'Centre d\'excellence mature',
      'Culture d\'innovation',
    ],
    topRecommendations: [
      {
        title: 'Partager votre expertise (thought leadership)',
        description: 'Devenir un leader de pensée en IA en partageant vos expériences via blog, conférences et études de cas.',
        impact: 'Medium',
        effort: 'Low',
        timeline: 'Ongoing',
        dimension: 'culture',
      },
      {
        title: 'Monétiser vos capacités IA (AI-as-a-Service)',
        description: 'Transformer vos capacités IA en produits/services commercialisables pour d\'autres entreprises.',
        impact: 'High',
        effort: 'High',
        timeline: '6-12 mois',
        dimension: 'strategy',
      },
      {
        title: 'Investir dans R&D IA avancée',
        description: 'Créer un laboratoire R&D pour explorer les technologies IA de nouvelle génération et rester à l\'avant-garde.',
        impact: 'High',
        effort: 'High',
        timeline: 'Ongoing',
        dimension: 'technology',
      },
      {
        title: 'Contribuer à l\'écosystème IA',
        description: 'Contribuer à l\'écosystème IA via open source, partenariats académiques et initiatives communautaires.',
        impact: 'Medium',
        effort: 'Medium',
        timeline: 'Ongoing',
        dimension: 'culture',
      },
      {
        title: 'Optimiser continuellement avec IA de nouvelle génération',
        description: 'Adopter rapidement les nouvelles technologies IA (GPT-5, agents autonomes, etc.) pour optimiser continuellement.',
        impact: 'High',
        effort: 'Medium',
        timeline: 'Ongoing',
        dimension: 'technology',
      },
    ],
    nextSteps: [
      { title: 'Thought leadership strategy', duration: 'Ongoing' },
      { title: 'AI-as-a-Service business model', duration: '6-12 mois' },
      { title: 'R&D partnerships', duration: 'Ongoing' },
    ],
  },
};

export function getRecommendationsForLevel(level: MaturityLevel, lang?: 'fr' | 'en'): MaturityRecommendations {
  if (lang === 'en') {
    return RECOMMENDATIONS_BY_LEVEL_EN[level];
  }
  return RECOMMENDATIONS_BY_LEVEL[level];
}

export function getRecommendationsForDimension(
  level: MaturityLevel,
  dimension: Dimension
): Recommendation[] {
  const recommendations = RECOMMENDATIONS_BY_LEVEL[level].topRecommendations;
  return recommendations.filter(rec => rec.dimension === dimension);
}
