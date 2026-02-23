# Fix pour le problème de lockfile pnpm

## Problème
Le lockfile `pnpm-lock.yaml` était incompatible avec pnpm 10.4.1 utilisé par Railway (lockfileVersion 6.0 vs 9.0 requis).

## Solution temporaire
Un lockfile minimal a été créé pour permettre à Railway de passer l'étape de validation, mais il ne contient pas toutes les dépendances.

## Solution définitive
Le workflow GitHub Actions `.github/workflows/update-lockfile.yml` devrait régénérer automatiquement le lockfile complet avec pnpm 10.4.1.

### Si le workflow échoue
1. Vérifier les logs du workflow sur GitHub
2. Le workflow devrait se déclencher automatiquement quand `package.json` change
3. Une fois terminé, le lockfile complet sera automatiquement commité et poussé sur staging

### Régénération manuelle
Si nécessaire, vous pouvez régénérer le lockfile localement avec :
```bash
# Installer pnpm 10.4.1
npm install -g corepack@latest
corepack enable
corepack prepare pnpm@10.4.1 --activate

# Régénérer le lockfile
rm pnpm-lock.yaml
pnpm install --lockfile-only

# Commiter et pousser
git add pnpm-lock.yaml
git commit -m "chore: regenerate lockfile with pnpm 10.4.1"
git push origin staging
```

## Statut actuel
- ✅ LockfileVersion mis à jour à 9.0
- ✅ Workflow GitHub Actions configuré
- ⏳ En attente de la régénération complète du lockfile par le workflow
