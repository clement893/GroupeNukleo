# Plan de création — Nouvelle page Contact

Référence : maquette fournie (fond clair, hero « Performez maintenant », bloc contact + carte, séparateur « Fort. », footer global).

---

## 1. Vue d’ensemble

| Élément | Actuel | Cible (maquette) |
|--------|--------|------------------|
| Fond global | Dégradé sombre (bg-gradient-nukleo) | Fond **clair** (blanc / gris très léger), aligné pages Projets et À propos |
| Hero | Titre i18n + description, texte blanc | Titre **« Performez maintenant »** (gros, bold, violet très foncé / noir), sous-titre **« Découvrez comment nous pouvons vous aider. »** |
| Contenu principal | 2 colonnes : formulaire (gauche) + infos + carte (droite) | 2 colonnes : **gauche** = blocs contact (adresse, téléphone, email) ; **droite** = **carte intégrée** (Google Maps ou équivalent), coins arrondis, ombre légère |
| Formulaire | Présent (gauche) | Optionnel : conserver **sous** le bloc 2 colonnes ou sur un onglet / section dédiée ; la maquette met l’accent sur infos + carte |
| Séparateur | — | Bloc **« Fort. »** (très gros texte, bordeaux `#5A1E29`), fond lavande ou gris très clair |
| Footer | Global (PageLayout) | Inchangé : footer global sombre (logo, liens nav, services, contact, icône sociale) |

---

## 2. Structure des sections (ordre de mise en œuvre)

### 2.1 Fond et conteneur global
- Remplacer le fond sombre par un fond **blanc** ou **off-white** (`#FAFAF9`, `#ffffff`).
- Conserver `PageLayout` (header + footer).
- Supprimer les éléments décoratifs (blobs animés) pour un rendu épuré.

### 2.2 Hero / zone titre
- **Titre** : « Performez maintenant » (gros, bold, couleur sombre type `#5A1E29` ou noir).
- **Sous-titre** : « Découvrez comment nous pouvons vous aider. » (taille plus petite, gris).
- Alignement : titre et sous-titre à gauche (ou centrés selon maquette).
- Clés i18n : `contact.heroTitleNew` (ou réutiliser/renommer `contact.heroTitle`), `contact.heroSubtitle`.
- Optionnel : conserver un breadcrumb « Contact » au-dessus du titre.

### 2.3 Bloc contact + carte (2 colonnes)
- **Colonne gauche — Informations de contact**  
  Chaque bloc comporte un **petit titre** (gras, sombre) puis la valeur (texte plus clair) :
  - **« Où nous trouver »** → adresse (ex. « 1234 Rue Principale, Montréal (QC) H1A1C1, Canada » — à remplacer par les vraies adresses Nukleo : Montréal, Halifax si besoin).
  - **« Un simple coup de fil »** → numéro (ex. « +1 (514) 234-5678 »).
  - **« Une question »** → email (ex. « info@nukleo.digital » ou « hello@nukleo.com »).
- **Colonne droite — Carte**  
  - Carte embarquée (iframe Google Maps ou composant map) : zone rectangulaire, **coins arrondis**, **ombre légère** pour donner du relief.
  - Hauteur suffisante pour être lisible (ex. 300–400 px ou aspect ratio 4/3).
- Layout : `grid` 2 colonnes (1 colonne sur mobile, carte en dessous ou au-dessus des infos).
- Données : constantes ou i18n pour adresse, téléphone, email ; lien/embed carte (adresse Montréal ou Halifax, ou vue groupe).

### 2.4 Formulaire (optionnel)
- La maquette ne montre pas le formulaire en priorité. Choix possibles :
  - **A** : Garder le formulaire **sous** le bloc contact + carte (une section dédiée « Envoyez-nous un message »).
  - **B** : Retirer le formulaire de la page Contact et garder uniquement infos + carte (le CTA « Contactez-nous » du header peut pointer vers un formulaire ailleurs ou vers un mailto/tel).
- Si conservé : adapter les styles au fond clair (champs, boutons, messages de succès/erreur).

### 2.5 Séparateur « Fort. »
- Même traitement que sur les pages Projets et À propos : texte **« Fort. »** très gros (ex. `text-6xl` à `text-8xl`), bold, couleur bordeaux `#5A1E29`.
- Fond de section légèrement différencié (lavande très clair ou gris clair) pour marquer la transition vers le footer.
- Conteneur : pleine largeur ou `container`, alignement du texte à gauche (ou centré).

### 2.6 Footer
- Utiliser le **footer global** du `PageLayout` (aucun footer dédié à la page Contact). Le footer global affiche déjà logo, liens (Accueil, À propos, Nos projets, Contact), services, coordonnées et icône sociale.

---

## 3. Fichiers et composants à toucher

| Fichier / zone | Action |
|----------------|--------|
| `client/src/pages/Contact.tsx` | Refonte : fond clair ; hero (titre « Performez maintenant », sous-titre) ; section 2 colonnes (infos contact à gauche, carte à droite) ; section « Fort. » ; conserver ou déplacer le formulaire ; adapter StructuredData/SEO si adresses affichées changent. |
| `client/src/locales/fr.json` (et en.json) | Nouvelles clés : `contact.heroTitleNew` (« Performez maintenant »), `contact.heroSubtitle` (« Découvrez comment nous pouvons vous aider. »), `contact.whereToFindUs`, `contact.phoneLabel`, `contact.emailLabel`, et libellés des blocs contact si besoin. |
| Données contact | Définir ou centraliser adresse(s), téléphone, email (ex. constantes dans Contact.tsx ou config partagée avec le Footer). Adresses maquette : « 1234 Rue Principale, Montréal (QC) H1A1C1 » — à remplacer par les vraies (ex. 3235 Rue Saint-Dominique Montréal ; 8-850 Angela Dr Halifax) pour cohérence avec la page À propos. |

---

## 4. Ordre d’implémentation recommandé

1. **Fond global** : passer à fond clair, supprimer blobs.
2. **Hero** : titre « Performez maintenant » + sous-titre (i18n).
3. **Bloc 2 colonnes** : gauche = 3 blocs (Où nous trouver, Un simple coup de fil, Une question) avec adresse, téléphone, email ; droite = placeholder puis iframe/carte.
4. **Carte** : intégrer Google Maps (embed iframe) ou autre, avec coins arrondis et ombre.
5. **Séparateur « Fort. »** : section entre contenu principal et footer.
6. **Formulaire** : décider de le garder ou non ; si oui, le placer sous le bloc 2 colonnes et restyler pour fond clair.
7. **i18n** : ajout/mise à jour des clés FR/EN.
8. **Responsive** : sur mobile, une colonne (ordre : infos puis carte, ou inverse).
9. **StructuredData / SEO** : vérifier que les adresses et coordonnées dans le schéma correspondent aux données affichées.

---

## 5. Palette et style

- **Fond page** : blanc `#ffffff` ou off-white `#FAFAF9`.
- **Titre hero** : violet très foncé / bordeaux `#5A1E29` ou noir.
- **Sous-titre** : gris `#6b7280`.
- **Labels des blocs contact** : gras, sombre (`#374151` ou `#5A1E29`).
- **Valeurs** (adresse, tél, email) : gris un peu plus clair.
- **Carte** : bordure ou ombre légère, `border-radius` (ex. 12–16 px).
- **Section « Fort. »** : fond lavande très clair ou gris clair ; texte `#5A1E29`.

---

## 6. Détails techniques

- **Carte** : URL d’embed Google Maps à partir de l’adresse (ex. « 3235 Rue Saint-Dominique, Montréal »). Utiliser un `<iframe>` avec `loading="lazy"` et styles pour `border-radius` et `box-shadow`. Alternative : composant map (Leaflet, Mapbox) si pas d’iframe.
- **Liens** : « Une question » peut être un `mailto:`, « Un simple coup de fil » un `tel:`.
- **Accessibilité** : titres de section (h2), labels explicites pour chaque bloc contact, texte alternatif ou titre pour la carte.

Ce plan peut être suivi étape par étape ; chaque bloc peut être livré et testé indépendamment.
