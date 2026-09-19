# Environnement E2E

## Objectif

Exécuter les tests End-to-End Playwright contre une application complète
(frontend + backend) et des données connues, de façon reproductible d'un
run à l'autre.

## Prérequis

- Node.js 20+
- Dépendances installées : `npm install` (racine), `cd backend && npm install`, `cd frontend && npm install`
- Navigateur Chromium installé : `npx playwright install chromium`

## Démarrage

```bash
npx playwright test          # depuis la racine du repo
npx playwright test --ui     # mode interactif
```

Playwright démarre lui-même le backend et le frontend (config
`webServer` dans [`playwright.config.ts`](../../playwright.config.ts)) :
avant que le backend n'écoute, il reconstruit `dist/` proprement, applique
les migrations et rejoue le seed sur sa base dédiée.

## Arrêt

Automatique : Playwright arrête backend + frontend à la fin du run.
(Si un serveur tournait déjà avant le run sur les ports 3000/4200,
`reuseExistingServer: !process.env.CI` le réutilise au lieu d'en relancer un —
mettre `CI=1` force un environnement toujours frais.)

## Variables nécessaires

`DATABASE_URL` est fixée directement dans `playwright.config.ts`
(`webServer[0].env`), pas via un fichier `.env.e2e` — pour rester relative
au `schema.prisma` comme la convention du projet (`file:./e2e.db`, comme
`file:./dev.db` dans `backend/.env`).

## Base de données

SQLite dédiée `backend/prisma/e2e.db`, **isolée** de `dev.db` et des
`test-*.db`. Recréée, migrée et reseedée **avant chaque run**, dans la
commande de démarrage du backend E2E — jamais partagée entre deux runs.

## Seed

Réutilise le seed existant `backend/prisma/seed.ts` (comptes de démo,
6 destinations, vols, hôtels, avis) — aucun seed dupliqué pour l'E2E.

## Tests

```bash
npx playwright test
npx playwright show-report   # dernier rapport HTML
```

Résultat attendu : `7 passed`.

## Liens

Nom : Frontend E2E
Lien (http) : http://localhost:4200 (actif uniquement pendant `npx playwright test` / `--ui`)

Nom : API E2E
Lien (http) : http://localhost:3000/api

Nom : Rapport Playwright
Lien (http) : `npx playwright show-report` (ouvre un serveur local)

## Dépannage

- **`test.only` oublié dans un fichier** : un seul test s'exécute au lieu de
  toute la suite ; `forbidOnly: !!process.env.CI` fait échouer le run en CI
  dans ce cas (protection déjà en place).
- **`Cannot find module dist/main.js`** : `tsconfig.tsbuildinfo` obsolète
  faisait sauter la génération de `dist/` sans erreur — le `webServer` fait
  maintenant `rm -rf dist tsconfig.tsbuildinfo` avant chaque build.
- **Données du test précédent qui faussent les assertions** (ex.
  `cart-count` inattendu) : signe que la base n'a pas été isolée/reseedée —
  vérifier que `backend/prisma/e2e.db` est bien recréé à chaque run.
