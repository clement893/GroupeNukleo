# Plan de création — Nouvelle page Projets

Référence : maquette fournie (hero avec slider 3 écrans, grille 2 colonnes à fonds colorés, séparateur « Fort. », footer sombre).

---

## 1. Vue d’ensemble

| Élément | Actuel | Cible |
|--------|--------|--------|
| Fond global | Dégradé sombre (gradient-nukleo) | Fond clair : dégradé lavande léger en haut → blanc |
| Hero | Titre + description + bouton « Try Me » | Titre « Brillez & innovez » + sous-titre + visuel principal (3 écrans superposés) + indicateur slider à droite (01, 02, 03) |
| Grille projets | Masonry 3 colonnes, images seules | Grille **2 colonnes** fixe, chaque cellule = **image + fond coloré** (couleur variable par bloc) |
| Séparateur | — | Gros texte « Fort. » bordeaux, pleine largeur |
| CTA | Carte glass + bouton | Optionnel : intégré ou remplacé par le bloc « Fort. » + footer |
| Footer | Footer global (PageLayout) | Soit footer global, soit footer dédié (logo, liens, contact, icône sociale) comme sur la maquette |

---

## 2. Structure des sections (ordre de mise en œuvre)

### 2.1 Fond et conteneur global
- Remplacer le fond sombre par un **dégradé lavande très léger** en haut, puis **blanc** (aligné header / home).
- Conserver `PageLayout` (header + footer site).
- Conteneur : `container` ou équivalent avec `max-width` et padding.

### 2.2 Hero
- **Titre** : « Brillez & innovez » (gros, bold, sombre type violet/bordeaux), centré ou légèrement à gauche.
- **Sous-titre** : un paragraphe de description (clé i18n type `projects.heroSubtitle`).
- **Visuel principal** : 
  - **3 écrans / fenêtres** superposés avec effet de perspective (style « browser windows » ou mockups).
  - Contenu des écrans : interfaces web, galeries, ou images de projets (données existantes ou placeholders).
  - Comportement : **carousel / slider** (au clic ou auto-rotation) pour faire défiler 3 visuels.
- **Indicateur slider à droite** :
  - **3 blocs verticaux** empilés, fond gris clair / blanc.
  - Chaque bloc affiche un **numéro** (01, 02, 03) et éventuellement un court label.
  - État actif : bloc mis en avant (couleur ou bordure).
  - Clic sur un bloc = slide correspondant visible au centre.
- Fichiers : `Projects.tsx` ; optionnel `ProjectsHero.tsx` (titre + sous-titre + carousel 3 écrans + indicateur 01/02/03).

### 2.3 Grille projets (2 colonnes, fonds colorés)
- **Layout** : grille CSS **2 colonnes** (pas masonry), lignes de hauteur égale ou proportionnelle (ex. `grid-cols-2`, `gap` fixe).
- **Nombre d’items** : adapter au nombre d’images (API ou fallback) ; la maquette montre 28 items (14 lignes × 2). Si moins d’images, garder la même structure avec les assets disponibles.
- **Cellule** :
  - **Fond coloré** : chaque cellule a une **couleur de fond** propre (liste prédéfinie : pastel vert, rose, teal, noir, cyan, rouge, beige, off-white, etc.) pour varier d’un bloc à l’autre.
  - **Image** : image du projet en `object-fit: cover` (ou contain) dans la cellule, sans bordure.
  - Au **hover** : léger zoom ou overlay optionnel.
  - Au **clic** : ouvrir la lightbox (comportement actuel) ou lien vers détail projet si applicable.
- **Couleurs de fond** : définir une liste (ex. 12–16 couleurs) et les attribuer en boucle aux cellules (`index % colors.length`).
- Données : réutiliser `trpc.projectsImages.list` + `fallbackImages` ; pour chaque image, associer une couleur de fond.

### 2.4 Séparateur « Fort. »
- **Texte** : « Fort. » en très gros (ex. `text-6xl` à `text-8xl`), bold, couleur bordeaux / rouge foncé (`#5A1E29` ou proche).
- **Largeur** : pleine largeur du conteneur, centré ou aligné à gauche selon maquette.
- **Espacement** : marge verticale suffisante au-dessus et en dessous pour séparer la grille du footer.

### 2.5 Footer (si spécifique à la page)
- Si la maquette impose un **footer dédié** à la page Projets :
  - **Fond** : noir / charcoal.
  - **Gauche** : logo « nukleo. » (blanc) + 2 colonnes :
    - Colonne 1 : liens (À propos, Équipe, Services, Projets, Contact).
    - Colonne 2 : court texte type « Lorem ipsum… » ou description.
  - **Droite** : email (nukleo@email.com ou hello@nukleo.com), adresse (ex. Rue de Bordeaux Paris ou adresses réelles), téléphone ; en bas à droite une **icône** (réseau social, ex. Instagram).
- Sinon : garder le **footer global** du site (déjà dans `PageLayout`).

### 2.6 CTA (optionnel)
- La maquette ne met pas en avant une section CTA entre la grille et « Fort. ». On peut soit **supprimer** l’actuelle section CTA (carte glass), soit la **remplacer** par un simple lien « Contactez-nous » sous la grille ou intégré au bloc « Fort. ». À valider selon préférence.

---

## 3. Fichiers et composants à toucher

| Fichier / zone | Action |
|----------------|--------|
| `client/src/pages/Projects.tsx` | Refonte : fond clair, hero avec titre « Brillez & innovez » + carousel 3 écrans + indicateur 01/02/03, grille 2 colonnes avec fonds colorés, séparateur « Fort. », optionnel footer dédié ou CTA simplifié. |
| `client/src/components/…` | Optionnel : `ProjectsHero.tsx` (hero + carousel + indicateur), `ProjectsGrid.tsx` (grille 2 col + couleurs). |
| `client/src/locales/fr.json` (et en.json) | Nouvelles clés : `projects.heroHeadline` (« Brillez & innovez »), `projects.heroSubtitle`, libellés des slides 01/02/03 si besoin. |
| Données / API | Garder `trpc.projectsImages.list` et `fallbackImages` ; ajouter une liste de **couleurs de fond** pour la grille (constante dans `Projects.tsx` ou config). |

---

## 4. Ordre d’implémentation recommandé

1. **Fond global** : passer à fond clair (dégradé lavande → blanc).
2. **Hero** : titre « Brillez & innovez » + sous-titre + zone pour le visuel (d’abord statique : 3 écrans superposés en CSS).
3. **Carousel hero** : 3 slides (images ou compositions) + état actif + indicateur 01/02/03 à droite (cliquable).
4. **Grille 2 colonnes** : remplacer masonry par `grid grid-cols-2`, garder la liste d’images existante.
5. **Fonds colorés** : liste de couleurs, application par index sur chaque cellule de la grille.
6. **Séparateur « Fort. »** : bloc texte pleine largeur entre grille et footer.
7. **Footer** : soit garder le footer global, soit ajouter le footer dédié (logo, liens, contact, icône).
8. **Lightbox** : conserver le comportement au clic sur une image de la grille.
9. **i18n** : ajout/mise à jour des clés FR/EN pour hero et libellés.
10. **Responsive** : sur mobile, grille en 1 colonne ou 2 colonnes selon maquette ; hero et indicateur 01/02/03 adaptés (empilés ou simplifiés).

---

## 5. Palette (alignée maquette)

- **Fond page** : lavande très clair en haut (`#F5F3F8`, `#FAF8FC`), blanc en bas.
- **Titre hero** : violet / bordeaux foncé `#5A1E29`, `#4c1d95`.
- **Grille – fonds des cellules** : liste variée, ex. pastel vert `#d4edda`, rose `#f8d7da`, teal `#0d9488`, noir `#1a1a1a`, cyan `#06b6d4`, rouge `#dc2626`, beige `#f5f5dc`, off-white `#fafafa`, lavande `#e9d5ff`, etc.
- **Séparateur « Fort. »** : bordeaux / rouge foncé `#5A1E29`.
- **Footer** : fond `#1a1a1a` ou `#0f0f0f`, texte blanc.

---

## 6. Détails techniques

- **3 écrans superposés** : 3 `div` ou images positionnées en `absolute` avec `transform` (rotate, translate) pour l’effet perspective ; ou une image composite fournie par le design. Z-index pour l’ordre (01 devant, 02 milieu, 03 fond).
- **Carousel** : state `activeSlide` (0, 1, 2) ; au changement, transition CSS ou swap de contenu ; indicateur 01/02/03 mis à jour et cliquable.
- **Grille 2 colonnes** : `display: grid`, `grid-template-columns: repeat(2, 1fr)`, `gap` fixe (ex. 16px ou 24px). Chaque enfant = une cellule avec `background: colors[index % colors.length]` et l’image en overlay.
- **Lightbox** : conserver le state `lightboxImage` et le modal actuel.

Ce plan peut être suivi étape par étape ; chaque bloc peut être livré et testé indépendamment.
