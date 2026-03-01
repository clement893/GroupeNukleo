/**
 * Re-synchronise la table page_texts avec les fichiers de traduction du site
 * (client/src/locales/en.json et fr.json, ou dist/locales après build).
 *
 * Usage:
 *   pnpm run seed:page-texts
 *
 * Prérequis: DATABASE_URL dans .env (ou variables d'environnement).
 * Les fichiers sont lus depuis dist/locales puis client/src/locales.
 */

import "dotenv/config";
import { seedFromLocaleFiles } from "../server/pageTextsApi";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL manquant. Définissez-le dans .env ou l'environnement.");
    process.exit(1);
  }
  console.log("Synchronisation des textes des pages avec le site...");
  try {
    const result = await seedFromLocaleFiles();
    console.log(
      `OK: ${result.created} créés, ${result.updated} mis à jour (${result.total} clés).`
    );
    process.exit(0);
  } catch (err) {
    console.error("Erreur:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
