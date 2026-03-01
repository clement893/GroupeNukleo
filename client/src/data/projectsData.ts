/**
 * Source de vérité centralisée pour tous les projets du portfolio Nukleo.
 * Chaque projet contient : slug, key (regroupement images), title, client,
 * year, category (filtre), services, description (FR + EN), et images.
 */

export type ProjectFilterCategory = 'Design' | 'Brand' | 'Site web' | 'Plateforme' | 'Transformation';

export interface ProjectData {
  slug: string;
  key: string;
  title: string;
  client: string;
  year: string;
  category: ProjectFilterCategory;
  services: string;
  description: {
    fr: string;
    en: string;
  };
  images: string[];
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    slug: 'succes-scolaire',
    key: 'SuccesScolaire',
    title: 'Succès Scolaire',
    client: 'Succès Scolaire',
    year: '2025',
    category: 'Site web',
    services: 'Stratégie de marque, Direction artistique, Maquettes UI/UX',
    description: {
      fr: "Succès Scolaire est une entreprise québécoise spécialisée en tutorat en ligne. Avec Nukleo, nous nous sommes occupé de la refonte complète du site. L'objectif était de concevoir un site vivant et ludique, qui stimule la curiosité et donne envie d'apprendre. Nous avons repensé l'architecture du site aux multiples sous-pages, tout en assurant une navigation intuitive et la préservation des contenus essentiels.",
      en: "Succès Scolaire is a Quebec-based company specializing in online tutoring. With Nukleo, we handled the complete redesign of the site. The goal was to create a lively and playful website that stimulates curiosity and makes learning appealing. We rethought the architecture of the multi-page site while ensuring intuitive navigation and preserving essential content.",
    },
    images: [
      'SuccesScolaire_1.png',
      'SuccesScolaire_2.png',
      'SuccesScolaire_3.png',
      'SuccesScolaire_4.jpg',
      'SuccesScolaire_5.jpg',
    ],
  },
  {
    slug: 'humankind',
    key: 'Humankind',
    title: 'HumanKind',
    client: 'HumanKind',
    year: '2025',
    category: 'Site web',
    services: 'Direction artistique, Maquettes UI/UX, Stratégie digitale',
    description: {
      fr: "HumanKind est une entreprise de recrutement basée aux Royaumes-Unis et en Nouvelle-Écosse. Avec Nukleo, nous avons travaillé sur la conception d'un site web destiné aux entreprises, dans une approche résolument B2B. Nous avons décliné l'identité visuelle de la marque en maquettes haute-fidélité, en assurant la cohérence entre branding et interface digitale. L'objectif était de créer une plateforme professionnelle et accueillante, qui inspire confiance et mette en avant l'expertise de HumanKind dans le recrutement international.",
      en: "HumanKind is a recruitment company based in the UK and Nova Scotia. With Nukleo, we worked on designing a website aimed at businesses, with a decidedly B2B approach. We translated the brand's visual identity into high-fidelity mockups, ensuring consistency between branding and digital interface. The goal was to create a professional and welcoming platform that inspires trust and highlights HumanKind's expertise in international recruitment.",
    },
    images: [
      'Humankind_1.png',
      'Humankind_2.png',
      'Humankind_3.png',
      'Humankind_4.jpg',
      'Humankind_5.jpg',
    ],
  },
  {
    slug: 'defi-28-jours',
    key: 'Defi28',
    title: 'Défi 28 jours sans alcool',
    client: 'Fondation Jean Lapointe',
    year: '2024',
    category: 'Design',
    services: 'Idéation de campagne, Direction artistique, Direction de tournage, Déclinaisons visuelles',
    description: {
      fr: "La Fondation Jean Lapointe sensibilise le public aux dangers de la dépendance à l'alcool. Grâce au Défi 28 jours sans alcool, elle mobilise la population tout en récoltant des fonds pour soutenir ses actions de prévention et d'accompagnement. Nukleo a accompagné la Fondation dans l'idéation et la conception de la campagne, en assurant la direction artistique et la déclinaison complète des visuels. L'agence a également adapté le site web pour soutenir la campagne et dirigé les tournages afin de garantir une cohérence visuelle et narrative sur l'ensemble des canaux. Résultat : une mobilisation massive et plus de 749 000 $ amassés pour la cause.",
      en: "The Jean Lapointe Foundation raises public awareness about the dangers of alcohol addiction. Through the 28-Day No-Alcohol Challenge, it mobilizes the population while raising funds to support its prevention and support actions. Nukleo accompanied the Foundation in the ideation and design of the campaign, handling the artistic direction and complete visual rollout. The agency also adapted the website to support the campaign and directed the shoots to ensure visual and narrative consistency across all channels. The result: massive mobilization and over $749,000 raised for the cause.",
    },
    images: [
      'Defi28_1.jpg',
      'Defi28_2.jpg',
      'Defi28_3.jpg',
      'Defi28_4.jpg',
      'Defi28_5.jpg',
      'Defi28_6.png',
      'Defi28_7.png',
      'Defi28_8.jpg',
    ],
  },
  {
    slug: 'fondation-jean-lapointe',
    key: 'FJL',
    title: 'Fondation Jean Lapointe — Site web',
    client: 'Fondation Jean Lapointe',
    year: '2026',
    category: 'Site web',
    services: 'Wireframes, Maquettes UI, Développement',
    description: {
      fr: "La Fondation Jean Lapointe est une organisation qui lutte contre les problèmes de dépendance. Elle a fait appel à Nukleo afin de développer une version plus actuelle et esthétique de son site web. Le processus s'est fait en plusieurs étapes, en commençant par la production de wireframes, des propositions de maquettes UI poussées, et s'est terminé avec le développement du site web.",
      en: "The Jean Lapointe Foundation is an organization that fights addiction problems. They called on Nukleo to develop a more current and aesthetic version of their website. The process took place in several stages, starting with the production of wireframes, high-quality UI mockup proposals, and ending with the development of the website.",
    },
    images: [
      'FJL_1.png',
      'FJL_2.png',
      'FJL_3.png',
      'FJL_4.png',
      'FJL_5.png',
    ],
  },
  {
    slug: 'arsenal-media',
    key: 'Arsenal',
    title: 'Arsenal Media',
    client: 'Arsenal Media',
    year: '2024',
    category: 'Site web',
    services: 'Conception UI/UX, Développement',
    description: {
      fr: "Arsenal Media est le plus important radiodiffuseur au Québec, un groupe médiatique intégré et indépendant qui rejoint des millions de Québécois. Ce ne sont pas une, ni deux, ni trois, mais bien 18 stations de radio pour lesquelles Nukleo a assuré la refonte. Avec un lecteur intégré, la possibilité d'écouter en direct, de rejouer une émission, de retrouver une musique ou encore de consulter le programme de la station, nous avons réalisé un travail complet alliant UX design, UI design et développement technique.",
      en: "Arsenal Media is the largest broadcaster in Quebec, an integrated and independent media group reaching millions of Quebecers. It's not one, two, or three, but 18 radio stations for which Nukleo handled the redesign. With an integrated player, the ability to listen live, replay a show, find a song, or check the station's schedule, we delivered comprehensive work combining UX design, UI design, and technical development.",
    },
    images: [
      'Arsenal_1.png',
      'Arsenal_2.jpg',
      'Arsenal_3.png',
      'Arsenal_4.png',
    ],
  },
  {
    slug: 'attitude-fraiche',
    key: 'AttitudeFraiche',
    title: 'Attitude Fraîche',
    client: 'Attitude Fraîche',
    year: '2024',
    category: 'Site web',
    services: 'Conception UI/UX, Développement',
    description: {
      fr: "Attitude Fraîche, un leader dans la production de mesclun, de laitues et d'autres légumes de plein champ, a lancé avec nous un site web repensé pour améliorer l'expérience utilisateur et mettre en valeur son engagement envers des pratiques agricoles écoresponsables. Nukleo s'est chargé de la conception complète du site web, des maquettes UX jusqu'au développement, en passant par le design UI.",
      en: "Attitude Fraîche, a leader in the production of mesclun, lettuces, and other field vegetables, launched a redesigned website with us to improve the user experience and highlight their commitment to eco-responsible farming practices. Nukleo handled the complete design of the website, from UX mockups to development, including UI design.",
    },
    images: [
      'AttitudeFraiche_1.png',
      'AttitudeFraiche_2.png',
      'AttitudeFraiche_3.png',
      'AttitudeFraiche_4.png',
      'AttitudeFraiche_5.jpg',
    ],
  },
  {
    slug: 'bazar-verdunois',
    key: 'BazarVerdunois',
    title: 'Bazar Verdunois',
    client: 'Bazar Verdunois',
    year: '2025',
    category: 'Brand',
    services: 'Design de logo, Direction artistique, Déclinaison de visuels',
    description: {
      fr: "Le Bazar Verdunois est un marché d'artisanat qui se tient plusieurs fois par année à Verdun — Marché du Livre, Marché d'Automne, Marché d'Hiver, Marché de Noël. Nukleo a accompagné le Bazar dans la conception de son identité visuelle : création du logo, élaboration de l'univers graphique et déclinaison visuelle pour chacun de leurs événements. L'agence a également réalisé les maquettes UI en préparation du futur site web. Le défi consistait à valoriser les six facettes artistiques du Bazar — poterie, couture, peinture, tatouages, écriture et bijouterie.",
      en: "Le Bazar Verdunois is a craft market held several times a year in Verdun — Book Market, Autumn Market, Winter Market, Christmas Market. Nukleo accompanied the Bazar in designing its visual identity: logo creation, development of the graphic universe, and visual rollout for each of their events. The agency also created UI mockups in preparation for the future website. The challenge was to highlight the six artistic facets of the Bazar — pottery, sewing, painting, tattoos, writing, and jewelry.",
    },
    images: [
      'BazarVerdunois_1.png',
      'BazarVerdunois_2.png',
      'BazarVerdunois_3.jpg',
      'BazarVerdunois_4.jpg',
      'BazarVerdunois_5.jpg',
      'BazarVerdunois_6.jpg',
    ],
  },
  {
    slug: 'toit-a-moi',
    key: 'ToitAMoi',
    title: 'Toit à Moi',
    client: 'Toit à Moi',
    year: '2025',
    category: 'Brand',
    services: 'Design de logo, Direction artistique, Création d\'univers de marque, Développement du site web',
    description: {
      fr: "Toit à moi Canada est inspiré de Toit à moi France. Le concept vise à offrir un toit aux personnes sans abris et de leur rendre ainsi leur dignité. Pour son lancement, Nukleo a été mandaté pour concevoir l'identité visuelle et le site web. Nous avons travaillé sur l'adaptation du logo, en restant fidèle à l'esprit du logo initial, tout en créant un univers graphique propre au marché canadien. L'identité se veut ronde, colorée et inspirante, reflétant l'accueil et la chaleur d'un véritable « chez soi ».",
      en: "Toit à moi Canada is inspired by Toit à moi France. The concept aims to provide shelter for homeless people and restore their dignity. For its launch, Nukleo was mandated to design the visual identity and website. We worked on adapting the logo, staying true to the spirit of the original, while creating a graphic universe specific to the Canadian market. The identity is meant to be rounded, colorful, and inspiring, reflecting the warmth and welcome of a true 'home'.",
    },
    images: [
      'ToitAMoi_1.jpg',
      'ToitAMoi_2.png',
      'ToitAMoi_3.png',
    ],
  },
  {
    slug: 'mbam',
    key: 'MBAM',
    title: 'Fondation du MBAM',
    client: 'Fondation du Musée des Beaux-Arts de Montréal',
    year: '2024',
    category: 'Design',
    services: 'Design de logo, Direction artistique',
    description: {
      fr: "Pour animer les soirées phares de la Fondation du Musée des Beaux-Arts de Montréal, Nukleo a conçu l'identité visuelle propre à chacune des trois soirées : In Situ (Cercle des Anges), Contre-Jour (Cercle des Jeunes Philanthropes) et Perspectives (Cercle des Anges). L'agence a pris en charge la conception des logos et assuré la direction artistique des trois univers afin de créer des expériences visuelles à la fois cohérentes et différenciées.",
      en: "To animate the flagship evenings of the Montreal Museum of Fine Arts Foundation, Nukleo designed the visual identity for each of the three events: In Situ (Cercle des Anges), Contre-Jour (Cercle des Jeunes Philanthropes), and Perspectives (Cercle des Anges). The agency handled logo design and artistic direction for all three universes to create visually consistent yet differentiated experiences.",
    },
    images: [
      'MBAM_1.png',
      'MBAM_2.png',
      'MBAM_3.png',
      'MBAM_4.png',
      'MBAM_5.png',
      'MBAM_6.png',
    ],
  },
  {
    slug: 'summit-law',
    key: 'SummitLaw',
    title: 'Summit Law',
    client: 'Summit Law',
    year: '2025',
    category: 'Brand',
    services: 'Design de logo, Direction artistique, Déclinaison des supports visuels',
    description: {
      fr: "Anciennement Bos Law, ce cabinet d'avocats établi à Ottawa a confié à Nukleo la refonte complète de leur identité, désormais portée sous le nom Summit Law. Summit Law, c'est un cabinet élégant, accessible et tourné vers ses clients. Nukleo a conçu une identité visuelle moderne et lumineuse, mariant vert profond et jaune-vert, et a développé un univers de marque cohérent décliné sur l'ensemble des supports.",
      en: "Formerly Bos Law, this Ottawa-based law firm entrusted Nukleo with the complete redesign of their identity, now known as Summit Law. Summit Law is an elegant, accessible, and client-focused firm. Nukleo designed a modern and luminous visual identity, combining deep green and yellow-green, and developed a coherent brand universe across all materials.",
    },
    images: [
      'SummitLaw_1.jpg',
      'SummitLaw_2.jpg',
      'SummitLaw_3.jpg',
      'SummitLaw_4.jpg',
      'SummitLaw_5.jpg',
      'SummitLaw_6.jpg',
      'SummitLaw_7.jpg',
      'SummitLaw_8.jpg',
    ],
  },
  {
    slug: 'affilia',
    key: 'Affilia',
    title: 'Affilia',
    client: 'Affilia',
    year: '2024',
    category: 'Brand',
    services: 'Création de nom, Stratégie de marque, Conception de logo, Direction artistique, Développement du site web',
    description: {
      fr: "Anciennement connu sous le nom de CMKZ, Affilia est un cabinet d'avocats basé à Montréal. Pour refléter l'évolution de leur équipe et de leur vision stratégique, le cabinet souhaitait se repositionner et moderniser son image. Avec Nukleo, nous avons mené ce processus de transformation de bout en bout : création du nouveau nom, conception du logo et de l'univers graphique, déclinaison des supports visuels ainsi que la réalisation complète du site web.",
      en: "Formerly known as CMKZ, Affilia is a Montreal-based law firm. To reflect the evolution of their team and strategic vision, the firm wanted to reposition itself and modernize its image. With Nukleo, we led this transformation process from end to end: creating the new name, designing the logo and graphic universe, rolling out visual materials, and building the complete website.",
    },
    images: [
      'Affilia_1.jpg',
      'Affilia_2.jpg',
      'Affilia_3.jpg',
      'Affilia_4.jpg',
      'Affilia_5.png',
      'Affilia_6.png',
      'Affilia_7.jpg',
      'Affilia_8.png',
    ],
  },
  {
    slug: 'adele-blais',
    key: 'AdeleBlais',
    title: 'Adèle Blais',
    client: 'Adèle Blais',
    year: '2025',
    category: 'Plateforme',
    services: 'Confection, Déploiement',
    description: {
      fr: "Adèle Blais est une artiste peintre qui souhaite présenter ses œuvres en réalité augmentée. Nukleo a confectionné et déployé l'application mobile permettant de visualiser directement les œuvres en réalité augmentée sur votre téléphone. Une expérience immersive qui repousse les frontières entre l'art et la technologie.",
      en: "Adèle Blais is a painter who wanted to present her works in augmented reality. Nukleo built and deployed the mobile application that allows you to view the works directly in augmented reality on your phone. An immersive experience that pushes the boundaries between art and technology.",
    },
    images: [
      'AdeleBlais_1.png',
      'AdeleBlais_2.png',
      'AdeleBlais_3.png',
      'AdeleBlais_4.png',
    ],
  },
  {
    slug: 'sycle',
    key: 'Sycle',
    title: 'Sycle',
    client: 'Sycle',
    year: '2024',
    category: 'Brand',
    services: 'Direction artistique, Conception du logo, Maquettes UI/UX, Développement',
    description: {
      fr: "Sycle est une entreprise qui valorise le sulfate de sodium au Québec. Nukleo s'est occupé de la conception du logo, ainsi que de la conception des wireframes et de l'UI, en plus du développement du site. Le logo reprend le concept des flèches en cercle, ce qui rappelle le recyclage, un enjeu majeur dans l'industrie dans laquelle Sycle évolue.",
      en: "Sycle is a company that recycles sodium sulfate in Quebec. Nukleo handled the logo design, wireframes, UI design, and website development. The logo uses the concept of circular arrows, evoking recycling — a key issue in the industry in which Sycle operates.",
    },
    images: [
      'Sycle_2.png',
      'Sycle_3.png',
      'Sycle_4.png',
    ],
  },
  {
    slug: 'recrute-action',
    key: 'RecruteAction',
    title: 'Recrute Action',
    client: 'Recrute Action',
    year: '2025',
    category: 'Site web',
    services: 'Maquettes UI/UX, Développement',
    description: {
      fr: "Recrute Action est une firme de recrutement située à Montréal et à Dover (États-Unis). L'enjeu ? Avoir un site plus actuel dans lequel le parcours utilisateur est simple et intuitif. Nukleo s'est occupé de la refonte du site, comprenant les wireframes, les maquettes UI ainsi que le développement.",
      en: "Recrute Action is a recruitment firm located in Montreal and Dover (USA). The challenge? Having a more current website where the user journey is simple and intuitive. Nukleo handled the site redesign, including wireframes, UI mockups, and development.",
    },
    images: [
      'RecruteAction_1.jpg',
      'RecruteAction_2.png',
    ],
  },
  {
    slug: 'matchstick-theatre',
    key: 'Matchstick',
    title: 'Matchstick Theatre',
    client: 'Matchstick Theatre',
    year: '2025',
    category: 'Site web',
    services: 'Maquettes UI/UX, Développement',
    description: {
      fr: "Matchstick est une troupe de théâtre canadienne basée en Nouvelle-Écosse. Son travail place au cœur de sa démarche la collaboration avec les communautés locales, la mise en valeur des voix sous-représentées et la création d'œuvres offrant au public des moments de vérité partagés. En faisant appel à Nukleo, la troupe a pu se doter d'une nouvelle image grâce à une refonte complète de son site web.",
      en: "Matchstick is a Canadian theatre company based in Nova Scotia. Its work centers on collaboration with local communities, amplifying underrepresented voices, and creating works that offer audiences shared moments of truth. By working with Nukleo, the company was able to give itself a new image through a complete website redesign.",
    },
    images: [
      'Matchstick_1.png',
      'Matchstick_2.png',
      'Matchstick_3.jpg',
    ],
  },
  {
    slug: 'maison-jean-lapointe',
    key: 'MJL',
    title: 'Maison Jean Lapointe',
    client: 'Maison Jean Lapointe',
    year: '2024',
    category: 'Design',
    services: 'Direction artistique, Conception visuelle',
    description: {
      fr: "La Maison Jean Lapointe et La Fondation Jean Lapointe ont fait appel aux services de Nukleo pour la conception de leur rapport annuel 2024 et 2025. Un rapport coloré, accessible et attractif, qui reflète l'engagement de l'organisation envers ses bénéficiaires et ses donateurs.",
      en: "The Maison Jean Lapointe and the Jean Lapointe Foundation called on Nukleo's services for the design of their 2024 and 2025 annual reports. A colorful, accessible, and attractive report that reflects the organization's commitment to its beneficiaries and donors.",
    },
    images: [
      'MJL_1.png',
      'MJL_2.png',
      'MJL_3.png',
      'MJL_4.png',
      'MJL_5.png',
      'MJL_6.png',
    ],
  },
  {
    slug: 'cqde',
    key: 'CQDE',
    title: 'CQDE',
    client: 'CQDE',
    year: '2025',
    category: 'Design',
    services: 'Idéation de campagne, Direction artistique, Déclinaisons visuelles',
    description: {
      fr: "Le CQDE est un organisme québécois qui œuvre à la protection de l'environnement par des actions juridiques, éducatives et de sensibilisation. Nukleo a orchestré pour le CQDE une campagne intégrée combinant infolettres, publications organiques sur les médias sociaux et publicités payantes ciblées. L'objectif fixé de 35 000 $ en dons a été atteint grâce à une stratégie de contenu alignée sur les actions récentes du CQDE.",
      en: "The CQDE is a Quebec organization working to protect the environment through legal, educational, and awareness-raising actions. Nukleo orchestrated an integrated campaign for the CQDE combining newsletters, organic social media posts, and targeted paid advertising. The set goal of $35,000 in donations was achieved through a content strategy aligned with the CQDE's recent actions.",
    },
    images: [
      'CQDE_1.png',
      'CQDE_2.png',
      'CQDE_3.png',
      'CQDE_4.png',
      'CQDE_5.png',
    ],
  },
  {
    slug: 'municipalite-de-clare',
    key: 'CDENE',
    title: 'Municipalité de Clare',
    client: 'CDÉNÉ',
    year: '2025',
    category: 'Design',
    services: 'Idéation de campagne, Direction artistique, Direction de tournage, Déclinaisons visuelles',
    description: {
      fr: "Le CDÉNÉ a mandaté Nukleo pour concevoir une campagne digitale visant à attirer des francophones du monde entier à s'installer en Nouvelle-Écosse, et plus particulièrement dans la municipalité de Clare. Structurée en deux volets — « Vivre en Clare » en jaune et « S'installer en famille à Clare » en bleu — la campagne délivre des messages ciblés et adaptés à deux publics distincts. Les résultats ont largement dépassé les attentes.",
      en: "The CDÉNÉ mandated Nukleo to design a digital campaign aimed at attracting French speakers from around the world to settle in Nova Scotia, and more specifically in the municipality of Clare. Structured in two parts — 'Living in Clare' in yellow and 'Settling as a family in Clare' in blue — the campaign delivers targeted messages tailored to two distinct audiences. The results far exceeded expectations.",
    },
    images: [
      'CDENE_1.png',
      'CDENE_2.png',
      'CDENE_3.png',
      'CDENE_4.png',
    ],
  },
  {
    slug: 'reseau-sante-nouvelle-ecosse',
    key: 'ReseauSante',
    title: 'Réseau Santé Nouvelle-Écosse',
    client: 'Réseau Santé Nouvelle-Écosse',
    year: '2025',
    category: 'Design',
    services: 'Direction artistique, Idéation de campagne, Stratégie digitale',
    description: {
      fr: "Réseau Santé Nouvelle-Écosse est le principal fournisseur de services de santé de la province. Dans le but de faire progresser la médecine, l'organisation recherche des patients simulés pour enrichir la formation de ses médecins. Pour soutenir cette initiative, Nukleo a été mandaté afin de concevoir une campagne de communication à la fois percutante et visuelle.",
      en: "Réseau Santé Nouvelle-Écosse is the province's main healthcare provider. In order to advance medicine, the organization seeks simulated patients to enrich the training of its doctors. To support this initiative, Nukleo was mandated to design a communication campaign that is both impactful and visual.",
    },
    images: [
      'ReseauSante_1.jpg',
      'ReseauSante_2.png',
      'ReseauSante_3.jpg',
    ],
  },
  {
    slug: 'les-voix-ferrees',
    key: 'VoixFerrees',
    title: 'Les Voix Ferrées',
    client: 'Les Voix Ferrées',
    year: '2024',
    category: 'Design',
    services: 'Direction artistique, Conception visuelle',
    description: {
      fr: "Les Voix Ferrées, c'est un ensemble vocal basé à Montréal qui fait principalement du a cappella. Pour leurs événements-bénéfice (Spag Show et État de veille), ils ont confié à Nukleo la création des programmes graphiques. Nous nous sommes occupé de l'illustration principale, de la mise en page et de la direction visuelle des livrets.",
      en: "Les Voix Ferrées is a vocal ensemble based in Montreal that primarily performs a cappella. For their benefit events (Spag Show and État de veille), they entrusted Nukleo with the creation of the graphic programs. We handled the main illustration, layout, and visual direction of the booklets.",
    },
    images: [
      'VoixFerrees_1.png',
      'VoixFerrees_2.png',
      'VoixFerrees_3.png',
      'VoixFerrees_4.png',
    ],
  },
  {
    slug: 'zu',
    key: 'Zu',
    title: 'Zú',
    client: 'Zú',
    year: '2024',
    category: 'Design',
    services: 'Direction artistique, Conception de visuels, Stratégie de communication, Gestion des médias sociaux',
    description: {
      fr: "Zú est un organisme montréalais qui propulse les entrepreneur·e·s et startups des industries créatives et technologiques. Pour Zú, Nukleo conçoit et exécute une stratégie de communication numérique complète qui soutient ses événements phares (Sommets Influence et Émergence). Elle inclut la création de contenus réguliers, la gestion de campagnes publicitaires (Google Grant, Meta) et l'optimisation continue du site web.",
      en: "Zú is a Montreal organization that propels entrepreneurs and startups in the creative and technology industries. For Zú, Nukleo designs and executes a complete digital communication strategy that supports its flagship events (Sommets Influence and Émergence). It includes the creation of regular content, management of advertising campaigns (Google Grant, Meta), and continuous website optimization.",
    },
    images: [
      'Zu_1.png',
      'Zu_2.png',
      'Zu_3.png',
      'Zu_4.png',
    ],
  },
  {
    slug: 'doctoctoc',
    key: 'DocTocToc',
    title: 'DocTocToc',
    client: 'DocTocToc',
    year: '2025',
    category: 'Design',
    services: 'Direction artistique, Stratégie de communication, Réseaux sociaux, Conception de visuels',
    description: {
      fr: "DocTocToc est un organisme sans but lucratif qui facilite l'accès aux soins de santé pour les enfants de 0 à 5 ans et leur famille. Pour DocTocToc, Nukleo a conçu et déployé une stratégie de communication intégrée afin d'accompagner le lancement officiel de l'organisation, incluant l'ensemble des contenus promotionnels et la production complète de l'événement inaugural.",
      en: "DocTocToc is a non-profit organization that facilitates access to healthcare for children aged 0 to 5 and their families. For DocTocToc, Nukleo designed and deployed an integrated communication strategy to support the official launch of the organization, including all promotional content and the complete production of the inaugural event.",
    },
    images: [
      'DocTocToc_1.jpg',
      'DocTocToc_2.png',
      'DocTocToc_3.jpg',
    ],
  },
  {
    slug: 'diner-en-blanc',
    key: 'DinerEnBlanc',
    title: 'Dîner en Blanc',
    client: 'Dîner en Blanc',
    year: '2025',
    category: 'Site web',
    services: 'Conception UI/UX',
    description: {
      fr: "Dîner en Blanc, l'expérience gastronomique emblématique à l'échelle mondiale, a rafraîchi son image de marque avec un site web repensé, alliant élégance et accessibilité pour un public international.",
      en: "Dîner en Blanc, the iconic gastronomic experience on a global scale, refreshed its brand image with a redesigned website, combining elegance and accessibility for an international audience.",
    },
    images: [
      'DinerEnBlanc_1.png',
      'DinerEnBlanc_2.jpg',
      'DinerEnBlanc_3.png',
    ],
  },
  {
    slug: 'ajefne',
    key: 'AJEFNE',
    title: 'AJEFNE',
    client: 'AJEFNE',
    year: '2025',
    category: 'Site web',
    services: 'Conception UI/UX, Développement',
    description: {
      fr: "L'AJEFNÉ est un organisme à but non lucratif qui facilite l'accès aux services juridiques en français pour les communautés acadienne et francophone. AJEFNE a fait affaire avec Nukleo pour la refonte de son site web. Nous avons travaillé à développer une plateforme représentative des services offerts, afin de bien guider l'utilisateur vers les informations recherchées.",
      en: "AJEFNÉ is a non-profit organization that facilitates access to legal services in French for the Acadian and Francophone communities. AJEFNE worked with Nukleo for the redesign of its website. We worked to develop a platform representative of the services offered, in order to properly guide the user towards the information they are looking for.",
    },
    images: [
      'AJEFNE_1.png',
      'AJEFNE_2.jpg',
    ],
  },
  // ─── Projets sans description textuelle complète ───────────────────────────
  {
    slug: 'amq',
    key: 'AMQ',
    title: 'Association Marketing Québec',
    client: 'Association Marketing Québec',
    year: '2025',
    category: 'Site web',
    services: 'Conception UI/UX, Développement',
    description: {
      fr: "L'Association Marketing Québec (AMQ) rassemble depuis 1987 les professionnels du marketing, des communications et du numérique au Québec. Sa mission : inspirer, partager et réseauter. Nukleo a réalisé la refonte complète du site web de l'AMQ, en modernisant l'expérience utilisateur tout en préservant l'identité de cette institution incontournable du marketing québécois. Le nouveau site reflète la vision de l'AMQ : être la référence marketing au Québec, en fédérant les talents et en propulsant les idées.",
      en: "The Association Marketing Québec (AMQ) has been bringing together marketing, communications, and digital professionals in Quebec since 1987. Its mission: inspire, share, and network. Nukleo carried out the complete redesign of the AMQ website, modernizing the user experience while preserving the identity of this cornerstone institution of Quebec marketing. The new site reflects AMQ's vision: to be the marketing reference in Quebec, by uniting talent and propelling ideas.",
    },
    images: ['AMQ_1.png'],
  },
  {
    slug: 'egf',
    key: 'EGF',
    title: 'Elizabeth Greenshields Foundation',
    client: 'Elizabeth Greenshields Foundation',
    year: '2025',
    category: 'Site web',
    services: 'Conception UI/UX, Développement',
    description: {
      fr: "La Fondation Elizabeth Greenshields soutient les jeunes artistes représentatifs du monde entier dans les domaines de la peinture, de la sculpture, de la gravure et du dessin. Nukleo a réalisé la refonte complète du site web de la Fondation, en créant une expérience digitale à la hauteur du prestige de l'institution. Le nouveau site met en valeur les boursiers du monde entier et facilite l'accès aux ressources pour les artistes émergents, tout en reflétant l'engagement de la Fondation envers l'excellence artistique.",
      en: "The Elizabeth Greenshields Foundation exists to support young representational artists from around the world in the fields of painting, sculpture, printmaking, and drawing. Nukleo carried out the complete redesign of the Foundation's website, creating a digital experience worthy of the institution's prestige. The new site showcases grantees from around the world and facilitates access to resources for emerging artists, while reflecting the Foundation's commitment to artistic excellence.",
    },
    images: ['EGF_1.png', 'EGF_2.jpg'],
  },
  {
    slug: 'cfm',
    key: 'CFM',
    title: 'CFM',
    client: 'CFM',
    year: '2024',
    category: 'Design',
    services: 'Direction artistique, Conception visuelle',
    description: {
      fr: "Direction artistique et conception visuelle pour CFM.",
      en: "Artistic direction and visual design for CFM.",
    },
    images: ['CFM_1.png', 'CFM_2.png'],
  },
  {
    slug: 'globecar',
    key: 'Globecar',
    title: 'Globecar',
    client: 'Globecar',
    year: '2024',
    category: 'Brand',
    services: 'Rebranding, Direction artistique, Identité visuelle',
    description: {
      fr: "Globecar est une entreprise spécialisée dans la location de véhicules de voyage. Nukleo a accompagné Globecar dans son rebranding, en repensant l'identité visuelle de la marque pour mieux refléter son positionnement sur le marché de la mobilité et du voyage.",
      en: "Globecar is a company specializing in travel vehicle rentals. Nukleo accompanied Globecar through its rebranding, rethinking the brand's visual identity to better reflect its positioning in the mobility and travel market.",
    },
    images: ['Globecar_1.png'],
  },
  {
    slug: 'go-coupon',
    key: 'GoCoupon',
    title: 'GoCoupons',
    client: 'GoCoupons',
    year: '2024',
    category: 'Plateforme',
    services: 'Maintenance évolutive, Développement, Intégration IA',
    description: {
      fr: "GoCoupons est la plateforme de référence au Canada pour les coupons de caisse et les offres de remboursement. Elle permet aux consommateurs d'économiser sur leurs achats quotidiens grâce à des coupons imprimables et des offres de cashback. Nukleo assure la maintenance et l'évolution continue de la plateforme, en garantissant sa stabilité, ses performances et l'intégration de nouvelles fonctionnalités. L'agence travaille également sur des projets d'intelligence artificielle pour enrichir l'expérience utilisateur et optimiser la personnalisation des offres.",
      en: "GoCoupons is the reference platform in Canada for cash coupons and rebate offers. It allows consumers to save on their daily purchases through printable coupons and cashback offers. Nukleo handles the ongoing maintenance and evolution of the platform, ensuring its stability, performance, and the integration of new features. The agency is also working on artificial intelligence projects to enrich the user experience and optimize offer personalization.",
    },
    images: ['GoCoupon_1.png'],
  },
  {
    slug: 'pmp',
    key: 'PMP',
    title: 'PMP',
    client: 'PMP',
    year: '2024',
    category: 'Site web',
    services: 'Conception UI/UX, Développement',
    description: {
      fr: "Nukleo a réalisé la refonte complète du site web de PMP, en modernisant l'expérience utilisateur et en repensant l'architecture de l'information pour mieux servir les besoins de l'organisation et de ses publics cibles.",
      en: "Nukleo carried out the complete redesign of PMP's website, modernizing the user experience and rethinking the information architecture to better serve the needs of the organization and its target audiences.",
    },
    images: ['PMP_1.png'],
  },
  {
    slug: 'queertech',
    key: 'Queertech',
    title: 'QueerTech',
    client: 'QueerTech',
    year: '2024',
    category: 'Site web',
    services: 'Conception UI/UX, Développement, Communications, Marketing annuel',
    description: {
      fr: "QueerTech est une organisation canadienne qui habilite les personnes 2SLGBTQIA+ à intégrer l'industrie technologique, à faire progresser leur carrière et à lancer des entreprises innovantes. Nukleo a accompagné QueerTech dans la refonte de son site web, en créant une expérience numérique inclusive et dynamique qui reflète la mission de l'organisation. Au-delà du site, Nukleo assure également les communications et le marketing annuel de QueerTech, en soutenant la croissance de la communauté et la visibilité de ses programmes phares : QT Access, QT Leaders et QT Founders.",
      en: "QueerTech is a Canadian organization that empowers 2SLGBTQIA+ people to break into the tech industry, advance their careers, and launch innovative businesses. Nukleo accompanied QueerTech in the redesign of its website, creating an inclusive and dynamic digital experience that reflects the organization's mission. Beyond the site, Nukleo also handles QueerTech's annual communications and marketing, supporting community growth and the visibility of its flagship programs: QT Access, QT Leaders, and QT Founders.",
    },
    images: ['Queertech_1.png', 'Queertech_2.png'],
  },
  {
    slug: 'nouvelle-ile',
    key: 'NouvelleIle',
    title: 'Nouvelle Île',
    client: 'Verticale — Centre d\'artistes',
    year: '2024',
    category: 'Site web',
    services: 'Conception UI/UX, Développement',
    description: {
      fr: "Nouvelle Île est une plateforme de médiation culturelle numérique conçue par Verticale, un centre d'artistes de Laval. Elle prend la forme d'une carte interactive accessible en ligne, où chaque icône représente une œuvre d'art éphémère créée spécialement pour un lieu particulier de la ville. Nukleo a développé cette plateforme originale qui révèle l'existence de plus d'une trentaine d'œuvres diffusées par Verticale au cours des quinze dernières années, invitant le public à renouveler son regard sur les espaces qui nous entourent et à cultiver l'esprit des lieux.",
      en: "Nouvelle Île is a digital cultural mediation platform designed by Verticale, an artist-run centre in Laval. It takes the form of an interactive map accessible online, where each icon represents an ephemeral artwork created specifically for a particular location in the city. Nukleo developed this original platform that reveals the existence of over thirty works presented by Verticale over the past fifteen years, inviting the public to renew their perspective on the spaces around us and to cultivate the spirit of places.",
    },
    images: ['NouvelleIle_1.jpg'],
  },

  {
    slug: 'o-salon',
    key: 'OSalon',
    title: 'O Salon',
    client: 'O Salon',
    year: '2024',
    category: 'Site web',
    services: 'Conception UI/UX, Développement',
    description: {
      fr: "O Salon est un salon de coiffure haut de gamme situé au cœur du Plateau Mont-Royal à Montréal. Chaleureux et convivial, il propose des services de coiffure, de coloration et de maquillage non genrés, réalisés par une équipe diversifiée qui se forme régulièrement aux dernières tendances. Nukleo a réalisé la refonte complète du site web d'O Salon, en créant une expérience en ligne qui reflète l'identité unique et l'atmosphère accueillante du salon.",
      en: "O Salon is a high-end hair salon located in the heart of Montreal's Plateau Mont-Royal neighbourhood. Warm and welcoming, it offers gender-neutral hairdressing, colouring, and makeup services, delivered by a diverse team that regularly trains in the latest trends. Nukleo carried out the complete redesign of O Salon's website, creating an online experience that reflects the salon's unique identity and welcoming atmosphere.",
    },
    images: ['OSalon_1.jpg'],
  },
  {
    slug: 'psy-etc',
    key: 'PsyEtc',
    title: 'Psy etc.',
    client: 'Psy etc.',
    year: '2024',
    category: 'Design',
    services: 'Direction artistique, Réseaux sociaux',
    description: {
      fr: "Direction artistique et création de contenu pour les réseaux sociaux de Psy etc.",
      en: "Artistic direction and content creation for Psy etc.'s social media.",
    },
    images: ['PsyEtc_1.jpg'],
  },
  {
    slug: 'mentor-aero',
    key: 'MentorAero',
    title: 'Mentor Aero',
    client: 'Mentor Aero',
    year: '2024',
    category: 'Brand',
    services: 'Rebranding, Direction artistique, Identité visuelle',
    description: {
      fr: "Mentor Aero est une organisation dédiée au développement des talents dans l'industrie aérospatiale. Nukleo a accompagné Mentor Aero dans son rebranding, en repensant l'identité visuelle de la marque pour mieux refléter son positionnement et son ambition dans un secteur d'excellence.",
      en: "Mentor Aero is an organization dedicated to developing talent in the aerospace industry. Nukleo accompanied Mentor Aero through its rebranding, rethinking the brand's visual identity to better reflect its positioning and ambition in a sector of excellence.",
    },
    images: ['MentorAero_1.jpg'],
  },
];

/**
 * Retourne les données d'un projet à partir de son slug.
 */
export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}

/**
 * Retourne les données d'un projet à partir de sa key (nom de fichier image).
 */
export function getProjectByKey(key: string): ProjectData | undefined {
  return PROJECTS_DATA.find((p) => p.key === key);
}

/**
 * Retourne tous les slugs de projets (pour la génération de routes).
 */
export function getAllProjectSlugs(): string[] {
  return PROJECTS_DATA.map((p) => p.slug);
}
