# Connexion Admin sur le staging (Google OAuth)

L’erreur **« The OAuth client was not found »** / **401 invalid_client** sur le staging signifie que Google rejette la requête OAuth. Voici quoi vérifier.

## 1. Variables d’environnement sur le staging (Railway)

Dans le projet Railway du staging, assure-toi d’avoir :

| Variable | Exemple (staging) | Rôle |
|----------|-------------------|------|
| `BASE_URL` | `https://ingenious-rebirth-production-7f81.up.railway.app` | URL publique du site (sans slash final). **Obligatoire** pour que le callback OAuth soit correct. |
| `GOOGLE_CLIENT_ID` | Ton Client ID Google (ex. `xxx.apps.googleusercontent.com`) | Même client que prod ou client dédié staging. |
| `GOOGLE_CLIENT_SECRET` | Secret associé au Client ID | Secret du même client. |
| `ADMIN_ALLOWED_EMAILS` | `clement@nukleo.com` | Liste d’emails autorisés (séparés par des virgules). |

Sans `BASE_URL`, le serveur utilise `http://localhost:3000` et envoie à Google un redirect_uri incorrect pour le staging.

## 2. Google Cloud Console – Autoriser l’URL du staging

1. Va sur [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services** → **Credentials**.
2. Ouvre l’**OAuth 2.0 Client ID** que tu utilises pour l’admin (celui dont le `GOOGLE_CLIENT_ID` est copié dans Railway).
3. Dans **Authorized JavaScript origins**, ajoute :
   - `https://ingenious-rebirth-production-7f81.up.railway.app`
   - (et garde `http://localhost:3000` / ta prod si besoin).
4. Dans **Authorized redirect URIs**, ajoute **exactement** :
   - `https://ingenious-rebirth-production-7f81.up.railway.app/api/auth/google/callback`
   - (sans slash final, même protocole et domaine que le site).
5. Enregistre les modifications (Save). Les changements peuvent prendre 1–2 minutes.

## 3. Vérifier que le client OAuth existe

- **« The OAuth client was not found »** peut aussi signifier que le **Client ID** configuré sur Railway ne correspond à aucun client dans le bon projet Google Cloud (mauvais projet, ID copié-collé incorrect, ou client supprimé).
- Vérifie dans **Credentials** que le client existe et que tu utilises bien son **Client ID** (et son **Client secret**) dans les variables Railway.

## 4. Après modification

1. Redémarre l’app sur Railway (ou laisse le redéploiement se faire).
2. Réessaie la connexion admin sur le staging : `/admin/login` → « Se connecter avec Google ».

Si l’erreur persiste, regarde les logs Railway au moment du clic sur « Se connecter » : tu y verras le `Callback URL` et le `Base URL` utilisés, à comparer avec ce qui est configuré dans la console Google.
