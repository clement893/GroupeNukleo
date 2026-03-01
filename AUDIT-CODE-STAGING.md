# Audit code staging — refonte Nukleo

**Date :** 2025-02-28  
**Objectif :** Code propre pour la branche `staging`, suppression des anciennes pages et du code mort depuis la refonte.

---

## 1. Pages supprimées (non utilisées / non routées)

### Anciennes home / démos
| Fichier | Raison |
|--------|--------|
| `pages/Home.tsx` | Remplacé par HomepageDemo5 (seule home dans App.tsx) |
| `pages/HomepageDemo.tsx` | Ancienne démo, jamais importée dans App |
| `pages/HomepageDemo2.tsx` | Ancienne démo, jamais importée |
| `pages/HomepageDemo3.tsx` | Ancienne démo, jamais importée |
| `pages/HomepageDemo4.tsx` | Ancienne démo, jamais importée |
| `pages/NotFound.tsx` | App utilise `NotFound404`, pas `NotFound` |
| `pages/StartProject.tsx` | Route `/start-project` redirige vers `/contact` → page jamais rendue |

### Pages IA / radar non routées
| Fichier | Raison |
|--------|--------|
| `pages/AITrendRadar.tsx` | Aucune route dans App.tsx |
| `pages/RadarNew.tsx` | Aucune route dans App.tsx |
| `pages/AIGlossary.tsx` | Aucune route dans App.tsx |
| `pages/AIReadinessAssessment.tsx` | Aucune route dans App.tsx |

La page Ressources pointait vers `/radar` ; la section « Outils » est désormais masquée tant qu’aucun outil n’est proposé (tableau `tools` vide).

---

## 2. Composants demo3 supprimés

Utilisés uniquement par les pages HomepageDemo3 et HomepageDemo4 (supprimées) :

| Composant | Fichier |
|-----------|---------|
| TriptychSelectedWork | `components/demo3/TriptychSelectedWork.tsx` |
| DepartmentsWidget | `components/demo3/DepartmentsWidget.tsx` |
| ContactWidget | `components/demo3/ContactWidget.tsx` |

**Conservés** (utilisés par HomepageDemo5 et About) :  
`TeamScrollCards`, `DoubleLogoCarousel`, `TeamRow`, plus les widgets génériques (CardWidget, AboutUsWidget, etc.).

---

## 3. Routes actuelles (App.tsx)

- **Home :** `HomepageDemo5` (/) et (/fr)
- **404 :** `NotFound404`
- **Contact :** `/contact` et `/fr/contact` ; `/start-project` → redirect vers contact
- Aucune route pour radar, glossary, ai-readiness-assessment.

---

## 4. Fichiers / dossiers laissés en l’état (hors scope ou réutilisables)

- **`data/ai-glossary.ts`** : conservé au cas où le glossaire reviendrait.
- **`components/radar/`** : conservés (AITrendRadarVisualization, RadarHero, etc.) pour réutilisation éventuelle.
- **`lib/radar/`** : idem.
- **AdminPageVisibility** : la liste `ALL_PAGES` contient encore des chemins sans route (ex. `/radar`, `/glossary`) ; à nettoyer plus tard si on veut aligner uniquement sur les routes réelles.

---

## 5. Corrections liées

- **PageLoader.tsx** : le preload de la home pointait vers `../pages/Home` ; il pointe maintenant vers `../pages/HomepageDemo5`.

---

## 6. Résumé

- **~160 Ko** de code page supprimé (7 anciennes home/demos + 4 pages IA).
- **~11 Ko** de composants demo3 supprimés (3 composants).
- **Resources** : section Outils masquée si `tools.length === 0`, plus de lien cassé vers `/radar`.

Staging est aligné sur la refonte : une seule home (HomepageDemo5), pas de pages mortes dans le router, pas de liens vers des routes inexistantes.
