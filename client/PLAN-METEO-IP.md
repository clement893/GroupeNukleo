# Plan : Météo basée sur l’IP du visiteur

## Objectif

Afficher dans le widget météo de la home (24 °C / Montréal, Québec) la **température et la ville réelles** selon la localisation déduite de l’IP du visiteur. Valeurs par défaut si indisponible : 24 °C, Montréal, Québec.

---

## 1. Flux global

1. **Au chargement** (ou au montage du widget) : appeler un service de géolocalisation par IP pour obtenir ville + pays (et lat/lon si besoin).
2. **Ensuite** : appeler une API météo avec ces coordonnées (ou nom de ville) pour obtenir la température actuelle.
3. **Afficher** : température + libellé de lieu (ex. « Montréal, Québec ») dans le widget existant, avec états chargement / erreur et fallback sur les valeurs actuelles (24 °C, Montréal, Québec).

---

## 2. Choix techniques

### 2.1 Géolocalisation par IP

- **Option A — ip-api.com (JSON)**  
  - `GET http://ip-api.com/json?fields=city,regionName,country,lat,lon`  
  - Gratuit, sans clé, limite ~45 req/min par IP. Retourne `city`, `regionName`, `country`, `lat`, `lon`.

- **Option B — ipapi.co**  
  - `GET https://ipapi.co/json/`  
  - Gratuit avec quota (1000 req/jour sans clé). Retourne `city`, `region`, `country_name`, `latitude`, `longitude`.

- **Recommandation** : ip-api.com en premier (pas de clé, champs adaptés). Prévoir fallback vers ipapi.co ou vers valeurs par défaut en cas d’échec.

### 2.2 Météo

- **Open-Meteo** (recommandé)  
  - `GET https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m`  
  - Gratuit, sans clé. Retourne `current.temperature_2m` en °C.

- Pas besoin d’API key ; tout peut être fait côté client (ou via un petit proxy backend si on veut cacher les appels).

### 2.3 Côté client uniquement

- Les deux APIs sont en CORS-friendly (ip-api.com et Open-Meteo). On peut tout faire depuis le front (React) sans backend obligatoire.
- Optionnel : route backend (ex. `/api/weather-by-ip`) qui fait IP → geo → météo et renvoie `{ temp, city, region, country }` pour centraliser et pouvoir changer de fournisseur plus tard.

---

## 3. Structure proposée

### 3.1 Hook ou utilitaire « weather by IP »

- **Fichier** : `client/src/hooks/useWeatherByIp.ts` (ou `client/src/lib/weatherByIp.ts` si préférence sans hook).
- **Responsabilités** :
  - Appel géolocalisation IP (ip-api.com en premier).
  - Si succès : appel Open-Meteo avec `lat`/`lon`.
  - Retourner `{ temperature, city, region, country }` (+ états loading/error).
- **Fallback** : en cas d’erreur (réseau, quota, IP non géolocalisable) : `{ temperature: 24, city: 'Montréal', region: 'Québec', country: 'Canada' }` (ou libellé affiché « Montréal, Québec »).
- **Cache** : stocker en `sessionStorage` (ou `localStorage`) pour la session (ou X minutes) pour éviter de rappeler à chaque rendu.

### 3.2 Intégration dans HomepageDemo5

- **Composant** : le bloc météo actuel (Sun + « 24 °C » + « Montréal, Québec ») devient un petit composant ou une section qui utilise le hook (ou la fonction) `useWeatherByIp`.
- **États** :
  - **Loading** : afficher un placeholder (ex. « -- °C », « … » pour la ville) ou un léger skeleton sans changer la mise en page.
  - **Succès** : afficher `temperature` (arrondi entier) + `°C` et une ligne du type `{city}, {region}` (ou `city, country` si pas de région), ex. « Montréal, Québec ».
  - **Erreur / Fallback** : afficher 24 °C et « Montréal, Québec » comme aujourd’hui.
- **Accessibilité** : garder un `aria-label` du type « Météo : X degrés, Ville, Région » pour les lecteurs d’écran.

### 3.3 Fichiers à toucher

| Fichier | Action |
|--------|--------|
| `client/src/hooks/useWeatherByIp.ts` (nouveau) | Créer le hook (ou `lib/weatherByIp.ts` + appel depuis le composant). |
| `client/src/pages/HomepageDemo5.tsx` | Remplacer les valeurs en dur (24, « Montréal, Québec ») par les données du hook, + états chargement/erreur. |
| Optionnel : `client/src/components/WeatherWidget.tsx` | Extraire le bloc météo dans un composant dédié qui utilise le hook (plus propre et réutilisable). |

---

## 4. Détails d’implémentation

### 4.1 Format d’affichage du lieu

- Priorité : `city` + `region` si disponible (ex. « Montréal, Québec »).
- Sinon : `city` + `country` (ex. « Paris, France »).
- Adapter selon les champs renvoyés par ip-api.com (`regionName`, `country`).

### 4.2 Unité et précision

- Toujours afficher en °C (comme actuellement).
- Température : arrondir à l’entier (ex. `Math.round(temperature)`).

### 4.3 Cache et fréquence

- Cache recommandé : `sessionStorage` avec une clé du type `weatherByIp` et TTL court (ex. 10–30 min) pour limiter les appels et garder une expérience stable pendant la session.
- Au premier chargement de la page (ou du widget), si pas de cache valide : appeler geo puis météo, puis mettre en cache.

### 4.4 Gestion d’erreur

- Timeout sur les fetch (ex. 5 s).
- Si geo échoue : fallback immédiat (24 °C, Montréal, Québec).
- Si météo échoue après geo : garder la ville obtenue par IP, afficher « -- °C » ou garder 24 en fallback (au choix produit).

---

## 5. Ordre de mise en œuvre

1. Créer `useWeatherByIp` (ou `weatherByIp` + state dans le composant) avec ip-api.com + Open-Meteo, fallback et cache.
2. Tester en local (vérifier que l’IP de dev donne une localisation cohérente, ou mocker la réponse).
3. Brancher le widget météo dans `HomepageDemo5` sur ce hook (états loading / succès / erreur).
4. Ajuster le libellé ville/région selon les champs réels (ex. « Montréal, Québec » vs « Montreal, Quebec ») et l’accessibilité.
5. Optionnel : extraire un composant `WeatherWidget` et documenter le comportement (fallback, cache) dans le plan ou en commentaires.

---

## 6. Contraintes et limites

- **Quotas** : ip-api.com ~45 req/min par IP ; Open-Meteo très permissif. Le cache session limite les requêtes.
- **Vie privée** : la géolocalisation par IP est approximative (ville/région, pas d’adresse). Aucune donnée personnelle n’est stockée côté météo ; on peut le mentionner en tooltip ou en page légale si besoin.
- **SSR** : si la home est rendue côté serveur, ne pas appeler les APIs côté serveur (IP du serveur, pas du visiteur). Faire l’appel uniquement dans un `useEffect` (côté client) après hydratation.

Ce plan permet d’afficher une météo basée sur l’IP tout en conservant l’affichage actuel (24 °C, Montréal, Québec) en fallback.
