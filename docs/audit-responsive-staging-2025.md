# Audit responsive — Nukleo Digital (staging) — Mars 2025

## Contexte

- **Branche:** staging  
- **Stack:** Vite 7, React 19, Tailwind v4 (`@theme` dans `client/src/index.css`).  
- **Breakpoints:** sm 640px, md 768px, lg 1024px, xl 1280px. `MOBILE_BREAKPOINT = 768` dans `client/src/lib/constants.ts`.

---

## 1. Corrections déjà en place (plan précédent)

| Élément | Fichier | Statut |
|--------|---------|--------|
| Overrides CSS mobile (animations/transitions) | `client/index.html` | Supprimés ; tap-highlight + touch-action + content-visibility conservés |
| CTA header invisible | `Header.tsx` | `xs:inline-flex` → `sm:inline-flex` (affichage ≥ 640px) |
| LeoChatWidget overflow | `LeoChatWidget.tsx` | Fenêtre responsive : `inset-x-4` mobile, `max-w-[400px]`, `h-[min(600px,90vh)]` |
| Contact padding top fixe | `Contact.tsx` | `paddingTop: 'clamp(5rem, 15vw, 8rem)'` |
| Footer padding bottom | `Footer.tsx` | `paddingBottom: 'clamp(2rem, 4vw, 3rem)'` |
| ServiceDetailLayout hero | `ServiceDetailLayout.tsx` | Padding top `clamp(8rem, ...)` (au lieu de 14rem min) |
| Slider équipe | `ServiceDetailLayout.tsx` | `teamCardStepPx` mesuré via ResizeObserver (largeur carte + gap) |
| Documentation breakpoints | `constants.ts`, `HeroSection.tsx` | Commentaires 768 vs 640, usage MOBILE_BREAKPOINT |
| LaptopVisual overflow | `LaptopVisual.tsx` | `max-w-full` sur l’écran 380px |

---

## 2. Problèmes restants ou nouveaux

### 2.1 Priorité haute

#### About — padding top fixe

- **Fichier:** `client/src/pages/About.tsx` (l.46)  
- **Code:** `paddingTop: 128` (px).  
- **Action:** Remplacer par une valeur responsive, comme sur Contact : `clamp(5rem, 15vw, 8rem)` ou classes Tailwind équivalentes.

#### Projects — padding top fixe

- **Fichier:** `client/src/pages/Projects.tsx` (l.209)  
- **Code:** `paddingTop: 128` (px).  
- **Action:** Idem (clamp ou `pt-20 md:pt-28 lg:pt-32`).

#### ManusDialog — largeur fixe

- **Fichier:** `client/src/components/ManusDialog.tsx` (l.54)  
- **Code:** `DialogContent` avec `w-[400px]` uniquement.  
- **Risque:** Sur viewport &lt; 400px (ex. 320–390px), le dialogue dépasse.  
- **Action:** Ajouter `max-w-[min(400px,calc(100vw-2rem))]` (ou équivalent) pour que le dialogue reste dans l’écran sur mobile.

### 2.2 Priorité moyenne

#### ProjectsHeroTriptych — zones de touch trop étroites

- **Fichier:** `client/src/components/ProjectsHeroTriptych.tsx` (l.68–70)  
- **Code:** Panneaux inactifs `flex: 0 0 6.8%`. Sur 320px, 6.8% ≈ 22px de large.  
- **Risque:** Cibles tactiles en dessous de ~44px, UX dégradée sur très petit écran.  
- **Action:** Sur mobile (ex. `max-width: 480px` ou via media / container query), utiliser une largeur min en px (ex. 44px) ou un pourcentage plus grand (ex. 10–12%) pour les panneaux inactifs, tout en gardant le comportement d’expansion au clic.

#### HomepageDemo5 — paddings en px

- **Fichier:** `client/src/pages/HomepageDemo5.tsx`  
- **Repéré:** `paddingTop: 128` (l.485), `paddingTop: 4 * 16` et `paddingBottom: 5 * 16` (l.805–806).  
- **Action:** Aligner sur le reste du site (clamp ou rem) pour cohérence et meilleur scaling sur petits écrans.

#### Page Leo — bulles de message

- **Fichier:** `client/src/pages/Leo.tsx`  
- **Code:** `max-w-[70%]` sur les conteneurs de messages (ex. l.585, 656, 731).  
- **Note:** Sur mobile étroit, 70% reste lisible ; optionnel d’ajouter `max-w-full` en `sm` ou en dessous de 640px pour éviter toute contrainte inutile.

### 2.3 Priorité basse / à surveiller

- **TeamScrollCards** (`client/src/components/demo3/TeamScrollCards.tsx`) : cartes avec `h-[520px]`, `max-w-[270px]`. Sur très petits écrans, 520px peut être élevé ; envisager `max-h-[min(520px,85vh)]` si des débordements apparaissent.
- **DashboardLayoutSkeleton** : sidebar `w-[280px]` — contexte admin, souvent desktop ; laisser tel quel sauf besoin explicite d’un menu repliable sur tablette.
- **CookieConsent** : pas de largeur fixe problématique repérée dans la structure principale ; vérifier visuellement le bandeau sur 320px (texte et boutons).
- **ClientLogos** : `@media (max-width: 768px)` pour durée d’animation (80s) — cohérent avec `MOBILE_BREAKPOINT`.

---

## 3. Synthèse des priorités

| Priorité | Élément | Fichier | Action |
|----------|--------|---------|--------|
| P1 | Padding top fixe | `About.tsx` | `paddingTop` responsive (clamp ou classes) |
| P1 | Padding top fixe | `Projects.tsx` | Idem |
| P1 | Dialog largeur fixe | `ManusDialog.tsx` | `max-w-[min(400px,calc(100vw-2rem))]` (ou équivalent) |
| P2 | Touch targets triptyque | `ProjectsHeroTriptych.tsx` | Min-width ou % plus grand pour panneaux inactifs sur mobile |
| P2 | Paddings en px | `HomepageDemo5.tsx` | Clamp / rem pour cohérence |
| P3 | Bulles Leo | `Leo.tsx` | Optionnel : `max-w-full` sous 640px |
| P3 | Hauteur cartes | `TeamScrollCards.tsx` | Optionnel : `max-h-[min(520px,85vh)]` si besoin |

---

## 4. Ordre de mise en œuvre recommandé

1. **About.tsx** et **Projects.tsx** — padding top responsive.  
2. **ManusDialog.tsx** — largeur max responsive.  
3. **ProjectsHeroTriptych.tsx** — zones de touch sur mobile.  
4. **HomepageDemo5.tsx** — paddings en clamp/rem.  
5. Ajustements optionnels (Leo, TeamScrollCards) selon retours visuels.

---

## 5. Points déjà corrects (vérifiés)

- **index.html** : viewport, pas d’override global agressif sur transitions/animations.  
- **Header** : CTA visible à partir de 640px, `site-margin-x`, tailles en clamp.  
- **FullScreenMenu** : padding et typo en clamp, bouton fermer 48×48px.  
- **Footer** : grid 1 col lg:2, paddings en clamp.  
- **Contact** : grid 1 col lg:2, padding top en clamp.  
- **ServiceDetailLayout** : hero clamp, slider avec step dynamique.  
- **UniversalLEO** : `max-w-[calc(100vw-3rem)]`, `maxHeight: calc(100vh - 3rem)`.  
- **LeoChatWidget** : fenêtre responsive (inset + max-w + max-h).  
- **LaptopVisual** : `w-[380px] max-w-full`.

Tests manuels recommandés sur : **320px**, **375px**, **768px**, **1024px** (et éventuellement paysage étroit pour Sheet/Drawer et dialogs).
