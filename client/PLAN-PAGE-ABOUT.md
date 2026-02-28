# Plan de création — Nouvelle page À propos

Référence : maquette fournie (design light, fonds clairs, hero coral avec 3 téléphones, mission, valeurs, équipe Clément Roy, services, CTA, footer avec « Fort. »).

**Note :** La maquette correspond à la page **À propos** (About Us). Pour une page **détail projet** (un projet par URL, ex. `/projets/mon-projet`), voir un plan dédié.

---

## 1. Vue d’ensemble

| Élément | Actuel | Cible (maquette) |
|--------|--------|------------------|
| Header | Global (PageLayout) | Inchangé : dégradé violet → lavande/blanc, logo « nukleo. », bouton « Contactez-nous » violet arrondi, cercle blanc menu burger |
| Fond global | Off-white déjà en place | Conserver fond clair (off-white / blanc) |
| Hero | Titre + sous-titre + bloc coral 3 téléphones | Aligner visuel : titre « Choisissez l'intelligence », sous-titre « Choisissez la transformation numérique dès maintenant. », bloc coral avec 3 mockups (liste sombre, écran B&W, grille photos) |
| Mission | Section centrée NOTRE MISSION | Label « NOTRE MISSION », titre centré, paragraphe centré (déjà en place) |
| Valeurs | 4 cartes (Excellence, Ownership, Authenticité, Bienveillance) | 4 cartes avec icônes : trophée or, poignée de main bleu/violet, cercle bleu + check, cœur rose (déjà en place, vérifier visuels) |
| Équipe | TeamRow (pile 4 membres) | **Remplacer** par section « NOTRE ÉQUIPE » : label centré ; 3 colonnes — gauche : « Clément Roy » + « Président et fondateur de Nukleo » ; centre : photo Clément grande, forme hexagonale / facettée ; droite : bloc bio aligné à droite |
| Services | 4 cartes avec dégradés + tags | 4 cartes : image en haut (Lab tech, Studio caméra, Agence phone+chart, Transition digital) ; titres + courte description + tags (Agences, Produits, Startups | Branding, UI/UX, Web | Stratégie, Marketing, SEO | Transformation, Innovation, IA) |
| CTA | « Prêt.e à performer ? » + bouton | Titre « Prêt.e à performer ? » centré, **ligne fine grise** sous le titre, puis bouton violet « Contactez-nous » + flèche |
| Footer | PageLayout global | Optionnel footer dédié : **séparateur « Fort. »** (gros texte bordeaux), puis bloc sombre (charcoal/indigo) — gauche : logo, 2 colonnes (Accueil, À propos, Nos projets, Contact | Lab, Studio, Agence, Transformation numérique) ; droite : hello@nukleo.com, adresses Montréal + Halifax, icône LinkedIn |

---

## 2. Structure des sections (ordre de mise en œuvre)

### 2.1 Fond et conteneur global
- Remplacer `bg-gradient-to-br from-violet-950...` par un fond clair (ex. `#FAFAF9`, `#F5F3EF` ou `bg-gray-50/80`).
- Conserver `PageLayout` (header + footer site).
- Conteneur : `container mx-auto px-4` ou équivalent avec max-width.

### 2.2 Hero
- **Titre (gauche)** :  
  - Ligne 1 : « Choisissez l'intelligence » (gros titre, violet/bordeaux `#5A1E29` ou proche).  
  - Ligne 2 (sous-titre) : « Choisissez la transformation numérique dès maintenant. » (taille plus petite).
- **Bloc coral/rose** :  
  - Grande zone avec fond coral/rose clair (`#F5D5CC`, `#F0C9C4` ou proche).  
  - À l’intérieur : 3 mockups de smartphones (cadres sombres) :
    - Gauche : écran type app (liste, checkboxes/toggles).  
    - Centre : écran avec image B&W.  
    - Droite : bande verticale de petites images (grille/galerie).
- Mise en page : titre + sous-titre à gauche ; bloc coral en dessous (ou à droite sur desktop) selon maquette.
- Fichiers : `About.tsx` ; éventuellement composant `AboutHero.tsx` + assets (images/placeholders pour les 3 écrans).

### 2.3 Section NOTRE MISSION
- Label centré : « NOTRE MISSION » (petit, uppercase, letterspacing).
- Titre centré (gros, violet/bordeaux) : « Faire rayonner les petites et moyennes entreprises dans leur croissance numérique. »
- Un paragraphe centré (texte existant ou lorem).
- Fond : même fond clair que la page.
- Données : réutiliser ou ajouter des clés i18n (ex. `about.mission.title`, `about.mission.body`).

### 2.4 Section NOS VALEURS
- Label centré : « NOS VALEURS ».
- **4 cartes** en ligne (grid ou flex), espacement net entre chaque :
  - **L'excellence** : icône trophée (or), titre + description courte.  
  - **L'ownership** : icône poignée de main, titre + description.  
  - **L'authenticité** : icône cercle bleu + étoile blanche, titre + description.  
  - **La bienveillance** : icône cœur rose, titre + description.
- Style : cartes fond off-white, coins arrondis, ombre légère.
- Données : étendre les clés i18n (ex. `about.values.excellence`, `ownership`, `authenticity`, `bienveillance`) et mapper les icônes (Lucide ou SVG).

### 2.5 Section NOTRE ÉQUIPE (mise en avant d’un membre)
- Label centré : « NOTRE ÉQUIPE ».
- Layout 3 colonnes (sur desktop) :
  - **Gauche** : nom « Clément Roy » + rôle « Président et fondateur de Nukleo ».
  - **Centre** : photo circulaire de Clément avec bordure hexagonale / facettée (CSS ou image avec masque).
  - **Droite** : bloc de texte (bio ou description équipe).
- Données : réutiliser `teamMembers` pour Clément ; texte droit depuis i18n ou constante.
- Fichier : `About.tsx` ; optionnel `AboutTeamHighlight.tsx`.

### 2.6 Section 4 cartes Services (Lab, Studio, Agence, Transition)
- 4 cartes horizontales, même style que NOS VALEURS (fond clair, coins arrondis, espace entre les blocs).
- Contenu par carte :
  - **Lab technologique** : icône “tech” (circuit / code), titre, liste de mots-clés (Agences, Startups, Réseaux sociaux, etc.).  
  - **Studio créatif** : icône caméra / photo, titre, liste ou courte description.  
  - **Agence Comm & Marketing** : icône mégaphone / speaker, titre, liste.  
  - **Transition numérique** : icône circuit / digital, titre, liste.
- Réutiliser la constante `SERVICES` de la home si structure proche, ou définir une liste dédiée pour About (titres + mots-clés + icônes).

### 2.7 Section CTA « Prêt.e à performer ? »
- Fond légèrement plus foncé que le reste (gris très clair).
- Titre centré : « Prêt.e à performer ? »
- Un seul bouton violet (style header) : « Contactez-nous » + icône flèche (lien vers `/contact` ou `/start-project`).
- Réutiliser le style des boutons de la home (deux boutons reliés si maquette le montre).

### 2.8 Footer (si spécifique à la page)
- Si la maquette prévoit un footer propre à la page À propos :
  - Titre « Fort. » en gros, bordeaux/rouge foncé, aligné à gauche.
  - Deux grands blocs rectangulaires arrondis, fond gris foncé :
    - **Gauche** : logo nukleo (blanc), 2 colonnes de liens (Accueil, À propos, Nos projets, Contact | Lab technologique, Studio créatif, Agence Comm & Marketing, Transformation numérique).
    - **Droite** : hello@nukleo.com, adresses (ex. Quai d’Anvers Montréal ; Angle St-Louis Kirkland), icône LinkedIn.
- Sinon : garder le footer global du site (déjà dans `PageLayout`).

### 2.9 Détail maquette (référence visuelle)

- **Hero** : Bloc coral avec 3 smartphones à cadres sombres — gauche : liste texte blanc sur fond sombre ; centre : image monochrome (personnes) ; droite : pile verticale de petites images carrées (grille), fond clair.
- **Services — tags maquette** : Lab (Agences, Produits, Startups) ; Studio (Branding, UI/UX, Produits, Web) ; Agence (Stratégie, Marketing, SEO) ; Transition (Transformation, Innovation, IA).
- **CTA** : Ligne horizontale fine grise (divider) entre le titre « Prêt.e à performer ? » et le bouton.
- **Équipe** : Un seul membre mis en avant (Clément Roy) : label « NOTRE ÉQUIPE », 3 colonnes (nom+rôle | photo hexagonale | bio), pas la pile de 4 cartes (TeamRow).
- **Footer dédié** : Séparateur « Fort. » puis bloc sombre ; adresses : 3235 Rue Saint-Dominique, Montréal, QC H2X 2X2 ; 8-850, Angela Dr, Unit 201, Halifax, NS B3L 3K5 ; LinkedIn.

---

## 3. Fichiers et composants à toucher

| Fichier / zone | Action |
|----------------|--------|
| `client/src/pages/About.tsx` | Conserver fond clair, Hero, Mission, Valeurs ; **remplacer** `TeamRow` par section NOTRE ÉQUIPE (Clément Roy, 3 colonnes, photo hexagonale) ; ajuster Services (tags maquette) ; CTA avec divider ; optionnel footer dédié (Fort. + bloc sombre, adresses Montréal/Halifax). |
| `client/src/components/…` | Optionnel : `AboutHero.tsx`, `AboutTeamHighlight.tsx` (équipe 1 membre, photo hexagonale). Remplacer ou masquer `TeamRow` sur About. |
| `client/src/locales/fr.json` (et en.json) | Clés hero, mission, valeurs (4), équipe (nom, rôle, bio), services (titres + tags), CTA. |
| Assets | Placeholders ou images pour les 3 écrans du hero ; photo Clément `/team/Clement.webp`. |

---

## 4. Ordre d’implémentation recommandé

1. **Fond global + Hero** (titre, sous-titre, bloc coral + 3 placeholders).  
2. **NOTRE MISSION** (texte centré).  
3. **NOS VALEURS** (4 cartes + icônes).  
4. **NOTRE ÉQUIPE** (layout 3 colonnes, Clément, photo hexagonale).  
5. **4 cartes Services** (Lab, Studio, Agence, Transition).  
6. **CTA** « Prêt.e à performer ? ».  
7. **Footer** spécifique (si retenu) ou vérification du footer global.  
8. **i18n** : ajout/mise à jour des clés FR/EN pour tous les textes.  
9. **Responsive** : vérifier mobile (stack vertical, tailles de texte, espacements).  
10. **SEO / StructuredData** : garder les Person schemas pour l’équipe si on conserve d’autres membres ailleurs ; adapter si seule la section “mise en avant” reste sur About.

---

## 5. Palette (alignée maquette)

- **Texte principal / titres** : violet très foncé / bordeaux `#5A1E29`, `#4c1d95`.  
- **Fond page** : off-white `#FAFAF9`, `#F5F3EF`.  
- **Bloc hero** : coral / rose clair `#F5D5CC`, `#F0C9C4`.  
- **Cartes** : fond blanc / off-white, ombre légère.  
- **Bouton CTA** : violet `#6B4BEA` (aligné header).  
- **Footer** : fond gris foncé, texte blanc ; accent « Fort. » bordeaux/rouge.

---

## 6. Notes techniques

- **Photo hexagonale** : CSS `clip-path: polygon(...)` pour un hexagone, ou image pré-découpée.  
- **Mockups téléphones** : divs avec `border-radius` + image ou placeholder à l’intérieur ; ou image unique “3 phones” si fournie.  
- **Icônes** : Lucide (Trophy, Handshake, Star, Heart, Code2, Camera, Megaphone, Cpu) ou SVG custom pour correspondre exactement à la maquette.

Ce plan peut être suivi section par section ; chaque bloc peut être livré et testé indépendamment avant d’enchaîner.
