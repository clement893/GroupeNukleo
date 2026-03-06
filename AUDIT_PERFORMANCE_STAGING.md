# Audit de performance – branche staging

**Date :** 5 mars 2025  
**Branche :** staging  
**Projet :** nukleo-digital (Vite 7, React 19, Express, tRPC)

---

## 1. Résumé exécutif

| Critère | État | Commentaire |
|--------|------|--------------|
| **Bundle / code splitting** | Bon | Chunks manuels, lazy routes, limite 400 kB |
| **Lazy loading** | Bon | Pages + LEO + Admin en lazy, retry sur erreur chunk |
| **Images** | Bon | OptimizedImage, lazy, LCP preload, aspect-ratio |
| **Core Web Vitals** | En place | web-vitals + GA, init en idle |
| **Chunk circulaire** | À corriger | `leo ↔ admin` signalé par Rollup |
| **Preload initial** | À optimiser | admin + leo préchargés dans le HTML alors que non critiques |

**Build mesuré :** ~6,1 s | **JS total (client) :** ~1,27 MB (non compressé) | **Entry + vendors critiques :** ~529 kB

---

## 2. Analyse du bundle (build staging)

### 2.1 Chunks générés (ordre par taille)

| Fichier | Taille | Rôle |
|---------|--------|------|
| `leo-DWmHD9Om.js` | **369,11 kB** | UniversalLEO (chat, composants LEO) |
| `admin-DXWOD_ww.js` | **272,89 kB** | Toutes les pages admin |
| `react-dom-BLgcZ4-E.js` | **225,57 kB** | React DOM |
| `vendor-DAecw_aY.js` | **135,52 kB** | Autres node_modules |
| `services-BR0cFhmm.js` | **80,37 kB** | Pages services |
| `index-CMV9BBAF.js` | **78,65 kB** | Entry + router + layout |
| `trpc-vendor-DyWPbP9_.js` | **43,21 kB** | tRPC client |
| `react-core-DRK1crqZ.js` | **27,09 kB** | React |
| `HomepageDemo5-*.js` | **25,59 kB** | Homepage (lazy) |
| … | &lt; 25 kB | Autres pages / vendors |

**CSS :** `index-*.css` 185 kB, `admin-*.css` 1,2 kB (splitting OK).

### 2.2 Points positifs

- **Manual chunks** bien définis dans `vite.config.ts` : react-core, react-dom, react-scheduler, icons-vendor, charts-vendor, animation-vendor, trpc-vendor, react-query-vendor, radix-vendor, forms-vendor, markdown-vendor, admin, services, leo, radar, glossary, carousels, radar-charts.
- **Pages en lazy** avec `lazyWithRetry` (Projects, Contact, Leo, Services, FAQ, etc.) et admin en `lazy()`.
- **About + NotFound404** en eager (nécessaires tôt).
- **wouter / useLocalizedPath / LanguageContext** exclus du splitting pour éviter les erreurs dans les lazy components.
- **chunkSizeWarningLimit: 400** et **assetsInlineLimit: 1024** pour garder un premier chargement maîtrisé.
- **verify-build-chunks.js** : vérification post-build des chunks référencés (12 chunks, OK).

---

## 3. Problème : chunk circulaire leo ↔ admin

```
Circular chunk: leo -> admin -> leo. Please adjust the manual chunk logic for these chunks.
```

**Impact :** Rollup fusionne ou réorganise les chunks pour casser le cycle, ce qui peut :
- gonfler un des deux chunks (leo ou admin),
- ou créer des doublons de code.

**Recommandation :**  
Identifier la dépendance croisée (ex. un module partagé entre `UniversalLEO` / pages Leo et des pages admin, ou un import admin depuis un fichier inclus dans le chunk leo). Ajuster les imports ou la règle `manualChunks` pour que :
- tout ce qui est utilisé uniquement par l’admin soit dans `admin`,
- tout ce qui est utilisé uniquement par LEO soit dans `leo`,
- le code vraiment partagé aille dans un chunk commun (ex. `vendor` ou chunk dédié) plutôt que d’être tiré à la fois par leo et admin.

---

## 4. Preload / modulepreload dans le HTML

Dans `dist/public/index.html`, on a notamment :

```html
<link rel="modulepreload" href="/assets/js/admin-DXWOD_ww.js">
<link rel="modulepreload" href="/assets/js/leo-DWmHD9Om.js">
<link rel="modulepreload" href="/assets/js/services-BR0cFhmm.js">
```

**Problème :** Sur la **page d’accueil**, les chunks **admin** (~273 kB) et **leo** (~369 kB) sont préchargés alors qu’ils ne sont pas nécessaires au premier rendu. Cela :
- augmente la bande passante et le temps de chargement perçu sur la home,
- peut dégrader LCP/FCP sur mobile ou connexions lentes.

**Recommandation :**
- Ne pas précharger `admin-*.js` et `leo-*.js` dans le HTML généré par défaut (ou les précharger seulement sur les routes `/admin` et `/leo` si vous servez du HTML différent par route).
- Si le HTML est unique pour toute l’app, envisager de ne précharger que les chunks nécessaires au shell initial (index, react-core, react-dom, vendor, trpc, react-query, radix, etc.) et laisser admin/leo en chargement à la demande au premier accès à ces routes.

---

## 5. Lazy loading et code splitting

- **Routes publiques :** Projects, ProjectDetail, Resources, Contact, Leo, Services, FAQ, HomepageDemo5, Nukleo*, PrivacyPolicy, etc. → `lazyWithRetry()`.
- **UniversalLEO :** `lazy()` sans retry (acceptable si erreur gérée au niveau global).
- **Admin :** toutes les pages en `lazy()`.
- **usePrefetch :** précharge après 2 s (desktop uniquement) les routes /services, /contact, /about, /projects (stagger 500 ms), avec prefetch `as="document"`.
- **GlobalLEO :** désactivé sur mobile (`useIsMobile(768)`) pour limiter le coût du chunk LEO.

Points positifs : bonne séparation des routes et prefetch ciblé.

---

## 6. Images et LCP

- **LCP :** preload de `/nukleo-arrow.svg` avec `fetchpriority="high"` + SVG inline dans le HTML (mobile).
- **OptimizedImage :** lazy par défaut, `decoding="async"`, `fetchPriority` et `sizes` / srcset, aspect-ratio pour limiter le CLS.
- **ArrowBackground :** première flèche en eager, autres en lazy.
- **Projects / ProjectDetail / Contact / Leo, etc. :** usage cohérent de `loading="lazy"` ou `eager` pour les premiers éléments.

Aligné avec les bonnes pratiques LCP/CLS.

---

## 7. Réseau et ressources externes

- **Preconnect :** Railway, fonts (Google + gstatic), GTM, Google Analytics.
- **DNS prefetch :** mêmes origines + api.manus.im.
- **Google Fonts :** feuille en `media="print"` + `load-google-fonts.js` pour passer en `media="all"` après chargement, évitant de bloquer le premier rendu.
- **Fonts “non critiques” :** chargement différé via `fonts-lazy.css` dans `main.tsx` (requestIdleCallback, timeout 3 s).

Bonne gestion des tiers et des polices.

---

## 8. Core Web Vitals et monitoring

- **web-vitals :** onCLS, onFID, onFCP, onLCP, onTTFB, envoi vers GA.
- **initWebVitals :** appel en `requestIdleCallback` (timeout 2 s) après chargement pour ne pas pénaliser le premier rendu.
- **Scroll :** `history.scrollRestoration = 'manual'` pour éviter les sauts de scroll.

En place et bien intégré.

---

## 9. Autres points

- **GTM/GA :** chargés en async dans le `<head>`. Pour pousser encore le LCP, on pourrait les charger après FCP/LCP (ex. après `load` ou requestIdleCallback), comme indiqué dans PERFORMANCE_IMPROVEMENTS_SUMMARY.md.
- **Critical CSS :** inline dans `index.html` (layout, #root, images, mobile), cohérent avec une stratégie “above-the-fold”.
- **Lucide-react :** dans un chunk dédié (`icons-vendor`), mais beaucoup de composants importent depuis `lucide-react` ; vérifier que seuls les icônes utilisées sont inclus (tree-shaking) via `build:analyze` si besoin.
- **reportCompressedSize: false** dans Vite : désactive le calcul gzip au build (gain de temps), les tailles affichées sont non compressées.

---

## 10. Recommandations prioritaires

| Priorité | Action | Statut |
|----------|--------|--------|
| Haute | Corriger le **chunk circulaire leo ↔ admin** (analyser les dépendances partagées et ajuster manualChunks ou les imports). | ✅ Fait (ProtectedAdminRoute + useAdminAuth dans le chunk principal) |
| Haute | **Ne pas précharger** les chunks `admin` et `leo` dans le HTML de la page d’accueil. | ✅ Fait (plugin `noPreloadHeavyChunksPlugin` retire admin, leo, services du modulepreload) |
| Moyenne | Vérifier que **GTM/GA** ne bloquent pas le LCP (déferrer après LCP si les métriques le justifient). | À faire si besoin |
| Moyenne | Lancer **pnpm run build:analyze** régulièrement pour surveiller la taille des chunks. | — |
| Basse | Documenter la stratégie de prefetch (usePrefetch + prefetch dans index.html). | — |

---

## 11. Commandes utiles

```bash
# Build avec analyse de bundle (génère dist/stats.html)
ANALYZE=true pnpm run build
# ou
pnpm run build:analyze

# Vérification des chunks après build
pnpm run verify:build
```

---

*Audit réalisé sur la branche staging, build Vite 7.x, configuration actuelle du 5 mars 2025.*
