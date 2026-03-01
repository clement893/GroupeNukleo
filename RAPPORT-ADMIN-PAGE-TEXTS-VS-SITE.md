# Rapport d’investigation : Admin « Textes des pages » vs pages actuelles du site

**Constat** : Les « pages » affichées dans [Admin → Textes des pages](https://ingenious-rebirth-production-7f81.up.railway.app/admin/page-texts) semblent correspondre à l’ancienne structure (avant refonte) et non aux pages actives du site actuel.

---

## 1. D’où viennent les « pages » dans l’admin ?

- **Source** : La table **`page_texts`** en base de données (PostgreSQL).
- **Affichage** : L’admin groupe les entrées par **premier segment** de la clé (`key`).  
  Ex. clé `home.hero.title` → section **home** ; `services.heroTitle` → section **services**.
- **Peuplement de la table** :
  - Import manuel (JSON),
  - Ou **« Importer tout depuis les fichiers du site »** (seed) qui lit les fichiers de traduction, les aplatie (ex. `home.hero.title` → une ligne) et insère/met à jour en base.

Donc les « pages » visibles dans l’admin sont **exactement les sections (premiers segments des clés) présentes en base**. Si la base a été seedée une seule fois avec d’anciens fichiers de traduction, ces sections reflètent l’**ancienne** structure.

---

## 2. D’où vient le contenu affiché sur le site public ?

- **Fichiers** : `client/src/locales/fr.json` et `client/src/locales/en.json` (chargés au build dans le front).
- **Overlay BDD** : Le site utilise aussi `pageTexts.getTranslations` (tRPC) : pour chaque clé présente en base, la valeur BDD **remplace** celle du JSON. Donc : **JSON = contenu par défaut**, **BDD = surcharge** (éditable dans l’admin).
- Les clés utilisées côté front sont donc celles du **code + JSON**. Si le JSON a évolué (refonte) mais que la BDD n’a pas été re-seedée, la BDD peut encore contenir d’anciennes clés/sections et ne pas contenir les nouvelles.

---

## 3. Pourquoi l’admin peut afficher « les anciennes pages » ?

| Élément | Explication |
|--------|-------------|
| **Seed initial ancien** | La table `page_texts` a probablement été remplie une fois avec une ancienne version de `en.json` / `fr.json` (avant refonte). |
| **Pas de re-sync après refonte** | Après la refonte, les fichiers `client/src/locales/*.json` ont été mis à jour (nouvelles sections, renommages, clés supprimées/ajoutées), mais **aucun nouvel import « Tout depuis le site »** n’a été fait en production. |
| **Pas de sync automatique** | Il n’existe pas de job qui re-seed automatiquement la table à chaque déploiement ; la BDD et les fichiers peuvent donc diverger. |

Résultat : en production, **les clés/sections en base = ancienne structure** ; **le site affiche le contenu des JSON actuels** (et l’overlay BDD pour les clés qui existent encore). D’où le sentiment que l’admin montre « les anciennes pages ».

---

## 4. Pages / routes actuelles du site (après refonte)

D’après `App.tsx`, les routes publiques actuelles sont notamment :

| Route (sans préfixe langue) | Composant / page |
|-----------------------------|-------------------|
| `/` | Accueil (HomepageDemo5) |
| `/services` | Services |
| `/services/tech` | Nukleo Tech |
| `/services/consulting` | Consulting |
| `/services/studio` | Studio |
| `/services/agency` | Agency |
| `/about` | À propos |
| `/projects` | Projets |
| `/projects/:slug` | Détail projet |
| `/approche` | Approche |
| `/resources` | Ressources |
| `/contact` | Contact |
| `/leo` | Leo |
| `/faq` | FAQ |
| `/privacy-policy`, `/terms-of-service`, `/cookie-policy`, etc. | Pages légales |

Les libellés d’admin qu’on a ajoutés (Accueil, Services, À propos, Contact, Projets, Approche, Ressources, FAQ, Leo, etc.) correspondent à ces pages.

---

## 5. Sections actuelles des fichiers de traduction (`fr.json`)

Les **premiers niveaux** des clés dans `client/src/locales/fr.json` (sections utilisées par le site actuel) sont notamment :

- **Pages** : `home`, `services`, `about`, `contact`, `projects`, `approche`, `resources`, `faq`, `leo`, `expertise`
- **Composants / blocs** : `hero`, `capabilities`, `manifesto`, `trinity`, `cta`, `testimonials`, `whoWeServe`, `clients`, `agencies`, `media`, `lab`, `bureau`, `studio`, `artsCulture`, `artsCultureCommitment`, `assessment`, `startProject`
- **Globaux** : `common`, `nav`, `header`, `menu`, `footer`, `preFooter`, `notFound`, `alt`, `seo`, `pwa`

Si en production la table `page_texts` contient d’autres sections (noms différents ou structure ancienne), ce sont bien **d’anciennes clés** par rapport au site actuel.

---

## 6. Comment le seed est fait en production

- **Endpoint** : `POST /api/admin/page-texts/seed-from-locales` (appelé par le bouton « Importer tout depuis les fichiers du site » / « Tout depuis le site »).
- **Fichiers lus côté serveur** (dans cet ordre) :
  1. `dist/locales/en.json` et `dist/locales/fr.json`
  2. `locales/en.json` et `locales/fr.json`
  3. `client/src/locales/en.json` et `client/src/locales/fr.json`
- En production (Railway), le build exécute `scripts/copy-locales-to-dist.cjs`, qui copie `client/src/locales/*.json` vers `dist/locales/`. Donc après un build à jour, **seed-from-locales** lit bien les **fichiers actuels** du site.

---

## 7. Recommandations

### 7.1 Resynchroniser l’admin avec le site actuel (à faire une fois)

1. **Vérifier le build** : S’assurer que le déploiement inclut bien `dist/locales/en.json` et `dist/locales/fr.json` (copie depuis `client/src/locales/`).
2. **Lancer le seed en production** :  
   Aller sur [Admin → Textes des pages](https://ingenious-rebirth-production-7f81.up.railway.app/admin/page-texts) et cliquer sur **« Importer tout depuis les fichiers du site »** (ou **« Tout depuis le site »** dans la section Importer).  
   Cela va :
   - Lire les JSON **actuels** (depuis `dist/locales` ou chemins de fallback),
   - Créer ou mettre à jour toutes les clés en base (aplaties),
   - Sans supprimer les anciennes clés : les anciennes restent en base mais ne seront plus utilisées par le site si elles n’existent plus dans le JSON.

3. **Optionnel – Nettoyage** : Si on souhaite que l’admin n’affiche plus que les sections « nouvelles », il faudrait un script ou une action admin qui supprime de `page_texts` les clés qui ne sont plus dans les JSON actuels. Pour l’instant, la simple re-sync suffit pour que les **nouvelles** pages/sections apparaissent et soient éditables.

### 7.2 Éviter que ça se reproduise

- **Après chaque grosse mise à jour des contenus** (refonte, nouvelle page, gros changement de structure des clés) : relancer **« Tout depuis le site »** une fois en production.
- **Optionnel** : Ajouter une étape au pipeline de déploiement qui appelle `seed-from-locales` après le build (à discuter, car cela écrase les textes modifiés uniquement en BDD si les JSON n’ont pas été mis à jour).

---

## 8. Résumé

| Question | Réponse |
|----------|---------|
| Pourquoi l’admin montre « les anciennes pages » ? | La table `page_texts` a été remplie avec une ancienne version des fichiers de traduction et n’a pas été re-synchronisée après la refonte. |
| Où est la vérité pour le site public ? | Dans `client/src/locales/fr.json` et `en.json` ; la BDD ne fait que surcharger certaines clés. |
| Comment aligner l’admin sur le site actuel ? | Utiliser **« Importer tout depuis les fichiers du site »** (ou **« Tout depuis le site »**) sur la page Admin → Textes des pages en production, après un build qui copie les locales dans `dist/locales`. |
| Les labels / ordre dans l’admin (Accueil, Services, etc.) | Ils sont déjà alignés sur la structure actuelle du code et des JSON ; une fois la base re-seedée, les sections affichées correspondront aux pages actives du site. |

---

*Rapport généré à partir du code (App.tsx, locales, pageTextsApi, AdminPageTexts).*
