/**
 * Cartes services partagées entre la page d'accueil (HomepageDemo5) et la page À propos (About).
 * Une seule source : toute modification ici se répercute sur les deux pages.
 */
export interface HomeServiceCard {
  title: string;
  description: string;
  tags: string[];
  imageBg: string;
  /** Lien vers la page du département */
  path: string;
  /** Vidéo hero (optionnel) : remplace le fond du haut de la carte par cette vidéo */
  heroVideo?: string;
  /** Image hero (optionnel) : remplace le fond du haut de la carte par cette image (si pas de heroVideo) */
  heroImage?: string;
}

export const HOME_SERVICES: HomeServiceCard[] = [
  {
    title: 'Lab technologique',
    description: 'Du code, des résultats. Développement & technologie.',
    tags: ['Application', 'Plateforme', 'Site web', 'Maintenance', 'Refonte'],
    imageBg: 'linear-gradient(135deg, rgba(230,228,245,0.9) 0%, rgba(210,205,230,0.95) 100%)',
    path: '/services/tech',
    heroVideo: '/demo/tech-hero.mov',
  },
  {
    title: 'Studio créatif',
    description: 'Propulsez votre marque avec une identité visuelle forte et des expériences numériques sur mesure qui captivent et boostent votre croissance.',
    tags: ['Image de marque', 'Idéation', 'UX/UI', 'Production'],
    imageBg: 'linear-gradient(135deg, rgba(245,240,255,0.9) 0%, rgba(230,220,245,0.95) 100%)',
    path: '/services/studio',
    heroVideo: '/demo/studio-creatif-hero.mp4',
  },
  {
    title: 'Agence Comm & Marketing',
    description: 'De la vision à l\'action sans aucune friction : des stratégies de communication limpides pour une exécution qui marque les esprits.',
    tags: ['Campagnes digitales', 'Gestion des réseaux sociaux', 'Stratégie'],
    imageBg: 'linear-gradient(135deg, rgba(240,238,250,0.9) 0%, rgba(225,220,240,0.95) 100%)',
    path: '/services/agency',
    heroImage: '/demo/dept-agency.jpg',
  },
  {
    title: 'Transition numérique',
    description: 'Anticipez demain en toute sérénité : nous convertissons la complexité numérique en une feuille de route concrète pour propulser votre entreprise.',
    tags: ['Développement IA', 'Formation', 'Accompagnement', 'Stratégie IA'],
    imageBg: 'linear-gradient(135deg, rgba(200,180,220,0.4) 0%, rgba(120,100,180,0.5) 100%)',
    path: '/services/consulting',
    heroVideo: '/demo/consulting-hero.mov',
  },
];
