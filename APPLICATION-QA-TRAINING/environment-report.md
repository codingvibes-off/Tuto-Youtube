# Environment Report

## Repository

Nom : Voyago (application-qa-training)
Path : `/Users/sullivan/Desktop/Tuto-Youtube/APPLICATION-QA-TRAINING`

## Stack détectée

Frontend : Angular 17 (standalone components), servi en dev par `ng serve`, buildé en prod dans un conteneur nginx.
Backend : NestJS 10 (Express), TypeScript, `npm run build` → `dist/`.
Database : SQLite (fichier), pilotée par Prisma. Compatible PostgreSQL sans changement de schéma (cf. `backend/prisma/schema.prisma`).
ORM : Prisma 5.19 / Prisma Client 5.22.
Test framework (unitaire + intégration backend) : Jest 30 + ts-jest, HTTP via supertest.
E2E : Playwright 1.63 (1 projet chromium), `testDir: ./e2e`.
Docker : Dockerfile backend + frontend, `docker-compose.yml` à la racine (services `backend` + `frontend`).
Auth : JWT maison. Paiement : simulateur (pas d'API externe réelle) — aucun service tiers à mocker.

## Environnements créés / validés

### TEST (unitaire + intégration backend)

Nom : TEST
Lien (http) : n/a — pas de serveur HTTP persistant (tests in-process via `supertest`)
Status : **PASS**
Services : aucun service externe — SQLite fichier uniquement, pas de serveur HTTP persistant (les tests d'intégration démarrent une instance Nest éphémère in-process via `supertest`).
Database : une base SQLite dédiée **par fichier de test d'intégration** (`backend/prisma/test-cart.db`, `test-payment.db`), créée via `prisma db push` et **supprimée automatiquement** en `beforeAll`/`afterAll` — déjà en place dans le repo, réutilisé tel quel.
Port : n/a.
Données : créées directement par chaque test (pas de seed partagé).
Commande : `cd backend && npm test` → 4 suites, 15 tests.

Existant réutilisé : `cart.service.spec.ts`, `cart.service.integration.spec.ts`, `payment.service.spec.ts`, `payment.service.integration.spec.ts` (déjà présents, aucune modification de leur logique).

### E2E

Nom : Frontend E2E
Lien (http) : http://localhost:4200 (actif uniquement pendant `npx playwright test` / `--ui`, sauf `reuseExistingServer`)

Nom : API E2E
Lien (http) : http://localhost:3000/api

Nom : Rapport Playwright
Lien (http) : `npx playwright show-report` (ouvre un serveur local avec le dernier rapport HTML)

Status : **PASS** (7/7, validé sur 2 runs consécutifs pour prouver la reproductibilité)
Services : backend NestJS (:3000) + frontend Angular dev server (:4200), démarrés et arrêtés automatiquement par Playwright (`webServer`).
Database : SQLite dédiée `backend/prisma/e2e.db`, **isolée de `dev.db`** et des `test-*.db`, recréée puis migrée + reseedée **avant chaque run**, directement dans la commande de démarrage du backend E2E.
Port : 3000 (API) / 4200 (front).
Données : seed existant (`backend/prisma/seed.ts`) — comptes de démo, 6 destinations, vols, hôtels, avis.
Commande : `npx playwright test` (depuis la racine).

### STAGING (Docker Compose)

Nom : Frontend STAGING
Lien (http) : http://localhost:4200 (actif uniquement pendant que `docker compose up` tourne)

Nom : API STAGING
Lien (http) : http://localhost:3000/api

Status : **PASS** (après corrections, validé en live)
Services : `voyago-backend` (NestJS, :3000), `voyago-frontend` (nginx + build Angular, :4200), proxy `/api` → backend.
Database : SQLite dans le volume Docker nommé `backend-data` (isolée du host), migrée puis reseedée à chaque démarrage de conteneur (comportement déjà voulu par le Dockerfile existant, pour repartir d'un état propre avant un enregistrement).
Port : 3000 / 4200.
Données : mêmes comptes de démo que E2E/dev (`admin@voyago.demo` / `alex.martin@voyago.demo`).
Commande : `docker compose up --build`.

### PRODUCTION (référence uniquement — jamais créée ni modifiée par cette Skill)

Nom : Production
Lien (http) : inconnue / non documentée dans le repository (README.md et docker-compose.yml ne référencent qu'un usage local — aucune URL de déploiement en production n'a été trouvée dans le repo)

## Commandes

### Start

```bash
# TEST
cd backend && npm test

# E2E
npx playwright test          # depuis la racine

# STAGING
docker compose up --build    # depuis la racine
```

### Stop

```bash
# E2E : Playwright arrête backend/frontend automatiquement en fin de run
# (sauf reuseExistingServer si un serveur tournait déjà avant le run)

# STAGING
docker compose down
```

### Tests

```bash
cd backend && npm test              # unitaire + intégration
npx playwright test                 # e2e
npx playwright test --ui            # e2e en mode interactif
npx playwright show-report          # dernier rapport e2e
```

## Validation

* Application : **PASS** (TEST, E2E et STAGING démarrent et répondent)
* Database : **PASS** (migrations appliquées avec succès dans les 3 environnements)
* Test data : **PASS** (seed rejoué et vérifié — comptes, destinations, vols, hôtels)
* Tests : **PASS** (15/15 backend, 7/7 e2e, sur 2 runs consécutifs pour l'E2E)

## Problèmes rencontrés (trouvés et corrigés pendant la génération de l'environnement)

Conformément au principe *« ne pas conclure qu'un test révèle un bug applicatif avant d'avoir vérifié l'environnement »*, les problèmes ci-dessous sont tous des **erreurs de configuration/d'environnement**, pas des bugs métier :

1. **ERREUR DE CONFIGURATION** — `npm test` (backend) plantait silencieusement (aucune sortie, code 0) à cause d'un binaire `watchman` cassé sur la machine locale (bibliothèque Homebrew manquante), sans rapport avec le projet.
   → Fix : `"watchman": false` ajouté à la config Jest de `backend/package.json`.

2. **ERREUR DE TEST** — `e2e/recherche.spec.ts` contenait un `test.only(...)` oublié : un seul test sur 7 s'exécutait, et le run aurait échoué en CI (`forbidOnly: !!process.env.CI` dans `playwright.config.ts`).
   → Fix : `test.only` → `test`.

3. **ERREUR D'ENVIRONNEMENT** — la base `dev.db` était partagée entre les runs E2E ; les données laissées par un run précédent (article déjà présent dans le panier) faussaient les assertions du run suivant (`cart-count` attendu "1", reçu "2").
   → Fix : base E2E dédiée (`backend/prisma/e2e.db`), recréée + migrée + reseedée avant chaque run, intégrée dans la commande du `webServer` backend (`playwright.config.ts`), sur le même principe que le `CMD` du `Dockerfile` backend.

4. **ERREUR DE CONFIGURATION** — `nest build` retournait un code de sortie 0 sans générer `dist/`, à cause d'un `tsconfig.tsbuildinfo` (cache incrémental TypeScript) obsolète faisant croire au compilateur que tout était à jour.
   → Fix : build forcé « propre » (`rm -rf dist tsconfig.tsbuildinfo`) avant `npm run build` dans la commande du `webServer` E2E.

5. **ERREUR D'ENVIRONNEMENT (Docker)** — le conteneur backend crashait au démarrage : l'image `node:20-alpine` n'embarque pas OpenSSL, et le moteur Prisma ne peut pas se charger sans `libssl` (`Could not parse schema engine response`).
   → Fix : `RUN apk add --no-cache openssl` ajouté dans `backend/Dockerfile`.

6. **ERREUR D'ENVIRONNEMENT (Docker)** — une fois OpenSSL corrigé, le seed échouait dans le conteneur (`ERR_UNKNOWN_FILE_EXTENSION` sur `prisma/seed.ts`) : Node 20.19+/22 active par défaut la détection automatique de syntaxe ESM, ce qui empêche ts-node 10.x d'intercepter le chargement du fichier — incompatibilité connue entre ces versions, invisible en local (Node 22 sur la machine hôte ne déclenche pas le même chemin de code).
   → Fix : `NODE_OPTIONS=--no-experimental-detect-module` et `TS_NODE_COMPILER_OPTIONS={"module":"CommonJS"}` ajoutés en `ENV` dans `backend/Dockerfile`.

7. **Hygiène git** — `backend/.gitignore` ne couvrait pas les bases SQLite générées par les tests/E2E (`test-*.db`, `e2e.db`) ni de futurs `.env.test`/`.env.e2e`.
   → Fix : entrées ajoutées à `backend/.gitignore`.

Aucun bug applicatif (métier) n'a été identifié pendant cette génération d'environnement — tous les échecs initiaux ont été tracés jusqu'à une cause d'environnement ou de configuration de test.

## Recommandations

* **CI** : ces trois commandes (`npm test`, `npx playwright test`, `docker compose up --build` + un smoke-test HTTP) sont prêtes à être branchées telles quelles sur un pipeline CI/CD.
* **ts-node en environnement Docker** : la combinaison `NODE_OPTIONS`/`TS_NODE_COMPILER_OPTIONS` est un correctif ciblé mais reste fragile face aux futures versions de Node. À terme, envisager de compiler `prisma/seed.ts` avec le reste du build (`nest build`) et d'exécuter `node dist/prisma/seed.js` en production/Docker plutôt que `ts-node`, pour ne plus dépendre de ts-node au runtime.
* **Versions Prisma** : le conteneur signale une mise à jour majeure disponible (5.22 → 8.0 RC). Pas d'action requise pour l'instant (démo pédagogique), mais à surveiller si le projet évolue vers une vraie CI/CD.
* **`test.only` oublié** : `forbidOnly: !!process.env.CI` dans `playwright.config.ts` protège déjà la CI contre ce type d'oubli (le run échoue au lieu de passer silencieusement) — comportement correct, à garder.
