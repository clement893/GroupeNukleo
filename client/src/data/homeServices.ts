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
}

export const HOME_SERVICES: HomeServiceCard[] = [
  {
    title: 'Lab technologique',
    description: 'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime.',
    tags: ['Application', 'Plateforme', 'Site web', 'Maintenance', 'Refonte'],
    imageBg: 'linear-gradient(135deg, rgba(230,228,245,0.9) 0%, rgba(210,205,230,0.95) 100%)',
    path: '/services/tech',
  },
  {
    title: 'Studio créatif',
    description: 'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime.',
    tags: ['Image de marque', 'Idéation', 'UX/UI', 'Production'],
    imageBg: 'linear-gradient(135deg, rgba(245,240,255,0.9) 0%, rgba(230,220,245,0.95) 100%)',
    path: '/services/studio',
  },
  {
    title: 'Agence Comm & Marketing',
    description: 'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime.',
    tags: ['Campagnes digitales', 'Gestion des réseaux sociaux', 'Stratégie'],
    imageBg: 'linear-gradient(135deg, rgba(240,238,250,0.9) 0%, rgba(225,220,240,0.95) 100%)',
    path: '/services/agency',
  },
  {
    title: 'Transition numérique',
    description: 'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime.',
    tags: ['Développement IA', 'Formation', 'Accompagnement', 'Stratégie IA'],
    imageBg: 'linear-gradient(135deg, rgba(200,180,220,0.4) 0%, rgba(120,100,180,0.5) 100%)',
    path: '/services/consulting',
  },
];
