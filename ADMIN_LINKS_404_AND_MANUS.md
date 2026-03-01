# Admin — Liens 404 et références Manus

Résultat de l’audit des pages admin (`/admin`) du projet Nukleo Digital.

---

## 1. Liens menant à un 404 (corrigé dans le code)

| Page / Endroit | Lien cassé | Route correcte | Fichier |
|----------------|------------|----------------|---------|
| **Dashboard** (carte "Configuration" → Loaders) | `/admin/loaders` | `/admin/loader-migration` | `client/src/pages/admin/AdminDashboard.tsx` (l.191) |

**Correction appliquée :** le lien "Loaders" dans le Dashboard pointe maintenant vers `/admin/loader-migration`.

---

## 2. Routes admin définies (toutes valides côté front)

Routes déclarées dans `client/src/App.tsx` :

- `/admin` → AdminHome  
- `/admin/login` → AdminLogin  
- `/admin/dashboard` → AdminDashboard  
- `/admin/analytics` → AdminAnalytics  
- `/admin/leo-analytics` → AdminLEOAnalytics  
- `/admin/leo-contacts` → AdminLEOContacts  
- `/admin/agency-leads` → AdminAgencyLeads  
- `/admin/contact-messages` → AdminContactMessages  
- `/admin/start-project-submissions` → AdminStartProjectSubmissions  
- `/admin/ai-news-subscribers` → AdminAINewsSubscribers  
- `/admin/testimonials` → AdminTestimonials  
- `/admin/page-visibility` → AdminPageVisibility  
- `/admin/loader-migration` → AdminLoaderMigration  
- `/admin/sounds` → AdminSounds  
- `/admin/projects-images` → AdminProjectsImages  
- `/admin/carousel-logos` → AdminCarouselLogos  
- `/admin/run-migration` → RunMigration  

Aucune autre route `/admin/...` n’est définie ; tout autre chemin (ex. `/admin/loaders`, `/admin/users`) renverrait au composant 404 global.

---

## 3. Références aux plateformes Manus (contexte, pas des liens admin directs)

Les URLs ou noms de domaine Manus présents dans le projet ne sont **pas** des liens depuis les pages admin vers des “anciennes plateformes” ; ils servent à l’OAuth, aux APIs et à la config :

| Fichier / usage | Référence | Rôle |
|-----------------|-----------|------|
| `client/src/const.ts` | `VITE_OAUTH_PORTAL_URL` (ex. `https://portal.manus.im`) | URL du portail OAuth (login client) |
| `client/index.html` | `https://api.manus.im` (dns-prefetch) | API Manus |
| `server/_core/llm.ts` | `https://forge.manus.im/v1/chat/completions` | API LLM Forge |
| `vite.config.ts` | `.manuspre.computer`, `.manus.computer`, `.manusvm.computer`, etc. | Domaines autorisés (proxy / dev) |
| `server/_core/index.ts` | CSP `api.manus.im`, `*.manusvm.computer` | Politique de sécurité |
| `.env.example`, `vercel-variables.txt` | `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL`, `BUILT_IN_FORGE_API_URL`, etc. | Variables d’environnement |
| `client/src/components/ManusDialog.tsx` | “Login with Manus” | Dialogue de connexion OAuth (espace client) |

Si en production des utilisateurs arrivent sur d’**anciennes** URLs Manus (ex. ancien sous-domaine ou ancien portail), cela peut venir :

- de favoris ou liens externes vers ces anciennes URLs ;
- d’une ancienne valeur de `VITE_OAUTH_PORTAL_URL` ou `OAUTH_SERVER_URL` (à vérifier dans les variables d’environnement de Railway).

---

## 4. Résumé

- **404 identifié et corrigé :** 1 lien — “Loaders” dans le Dashboard pointait vers `/admin/loaders` au lieu de `/admin/loader-migration`.
- **Références Manus :** aucune page admin ne contient de lien direct vers une “ancienne plateforme Manus” ; les références Manus sont OAuth, API et config. Pour éviter les redirections vers d’anciennes plateformes, vérifier les variables d’environnement (OAuth, Forge) sur Railway et s’assurer qu’elles pointent vers les URLs actuelles (portal.manus.im, api.manus.im, forge.manus.im, etc.).
