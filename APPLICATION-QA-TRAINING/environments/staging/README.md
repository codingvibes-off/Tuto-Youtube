# Environnement STAGING (Docker Compose)

## Objectif

Faire tourner l'application complète (frontend + backend + base de
données), dans des conditions proches de la production, pour la valider
manuellement avant un enregistrement ou une démo — sans jamais toucher à une
vraie production (qui n'existe pas dans ce repository).

## Prérequis

- Docker Desktop démarré (`docker info` doit répondre)

## Démarrage

```bash
docker compose up -d --build   # depuis la racine du repo
```

## Arrêt

```bash
docker compose down
```

## Variables nécessaires

Définies directement dans [`docker-compose.yml`](../../docker-compose.yml)
(`DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `PORT`, `CORS_ORIGIN`) —
pas de fichier `.env.staging` séparé, le compose ne lit pas de variables
externes ici.

## Base de données

SQLite dans le volume Docker nommé `backend-data` (isolé du host — ce
n'est pas un bind-mount, donc `dev.db` sur ta machine n'est jamais touché).
Migrée puis reseedée **à chaque démarrage de conteneur**, pour repartir
d'un état propre et connu à chaque run (comportement voulu, déjà présent
dans `backend/Dockerfile`).

## Seed

Réutilise `backend/prisma/seed.ts` (mêmes comptes de démo que E2E/dev).

## Tests

Pas de suite automatisée dédiée à STAGING — c'est fait pour être visité et
testé manuellement dans le navigateur. Vérifications de fumée utilisées
pendant la validation :

```bash
curl -s http://localhost:3000/api/catalog/flights
curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alex.martin@voyago.demo","password":"Voyage2026"}'
```

## Liens

Nom : Frontend STAGING
Lien (http) : http://localhost:4200

Nom : API STAGING
Lien (http) : http://localhost:3000/api

Comptes de démo : `admin@voyago.demo` / `Admin1234` — `alex.martin@voyago.demo` / `Voyage2026`

## Dépannage

- **`Could not parse schema engine response` au démarrage du conteneur
  backend** : l'image `node:20-alpine` n'a pas OpenSSL, requis par le
  moteur Prisma — corrigé (`apk add --no-cache openssl` dans
  `backend/Dockerfile`).
- **`ERR_UNKNOWN_FILE_EXTENSION ".ts"` pendant le seed** : incompatibilité
  entre Node 20.19+/22 (détection auto ESM) et ts-node 10.x dans ce
  conteneur — corrigé (`NODE_OPTIONS=--no-experimental-detect-module` +
  `TS_NODE_COMPILER_OPTIONS={"module":"CommonJS"}` en `ENV` dans le
  Dockerfile).
- **Port 3000/4200 déjà utilisé** : un `ng serve`/backend local tourne déjà
  — l'arrêter avant `docker compose up`, ou changer les ports publiés dans
  `docker-compose.yml`.
