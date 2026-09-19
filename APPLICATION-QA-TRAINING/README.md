# Voyago

Application de démonstration **"plateforme de réservation de voyages"** —
terrain de test pour la série YouTube **Coding Vibes** (QA Automation +
Agents IA). Ce n'est pas un produit fini : c'est une application réaliste et
volontairement imparfaite, conçue pour être testée manuellement, automatisée
avec Playwright, branchée à une CI/CD, puis testée et corrigée par des
agents IA au fil des épisodes.

> Les bugs et cas limites intégrés volontairement sont documentés dans
> [`BUGS_CONNUS.md`](BUGS_CONNUS.md) — à ne pas lire avant le bon épisode si
> vous voulez garder la surprise !

## Stack

- **Frontend** : Angular 17 (standalone components), SCSS, thème sombre premium.
- **Backend** : NestJS + Prisma + SQLite (facile à lancer en local ; compatible PostgreSQL).
- **Auth** : JWT maison (pas de vraie intégration externe).
- **Paiement** : simulateur simple (pas de vraie API bancaire — voir `BUGS_CONNUS.md`).

## Structure du repo

```
.
├── backend/     # API NestJS + Prisma (schéma, seed, endpoints REST)
├── frontend/    # Application Angular (10 parcours utilisateur)
├── BUGS_CONNUS.md
└── docker-compose.yml
```

## Démarrage rapide (sans Docker)

Prérequis : Node.js 20+.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev   # crée la base SQLite + lance le seed automatiquement
npm run start:dev        # http://localhost:3000/api
```

Pour ré-exécuter uniquement le seed (données de démo) :

```bash
npm run prisma:seed
```

### 2. Frontend

Dans un second terminal :

```bash
cd frontend
npm install
npm start                # http://localhost:4200 (proxy /api -> :3000)
```

L'application est ensuite accessible sur **http://localhost:4200**.

## Démarrage avec Docker

```bash
docker compose up --build
```

- Frontend : http://localhost:4200
- Backend : http://localhost:3000/api

Le conteneur backend applique les migrations et réinitialise le jeu de
données de démo à chaque démarrage (pratique pour repartir d'un état propre
avant un enregistrement).

## Commandes Docker

Toutes les commandes se lancent **depuis la racine du repo** (là où se trouve
`docker-compose.yml`). Prérequis : Docker Desktop démarré (`docker info` doit
répondre).

Noms utilisés dans ce projet :

| Élément | Nom |
|---|---|
| Services Compose | `backend`, `frontend` |
| Conteneurs | `voyago-backend`, `voyago-frontend` |
| Volume (base SQLite) | `backend-data` (préfixé par Compose : `application-qa-training_backend-data`) |
| Ports | frontend `4200` → 80, backend `3000` → 3000 |

### Démarrer / arrêter

```bash
docker compose up --build            # build + démarre (logs au premier plan, Ctrl+C pour arrêter)
docker compose up -d --build         # idem en arrière-plan (detached)
docker compose up -d                 # démarre sans rebuild (images déjà construites)
docker compose up -d backend         # ne démarre que le backend
docker compose up -d --build --force-recreate   # recrée les conteneurs même sans changement

docker compose stop                  # arrête les conteneurs (sans les supprimer)
docker compose start                 # relance des conteneurs arrêtés
docker compose restart               # redémarre tout (rejoue migrations + seed du backend)
docker compose restart backend       # redémarre un seul service

docker compose down                  # arrête ET supprime conteneurs + réseau (le volume est conservé)
docker compose down -v               # idem + supprime le volume : base de données effacée
docker compose down --rmi local      # idem + supprime les images construites par le compose
```

### Build

```bash
docker compose build                 # construit toutes les images
docker compose build backend         # construit une seule image
docker compose build --no-cache      # rebuild complet, sans cache (après un souci de dépendances)
docker compose pull                  # met à jour les images de base distantes (node, nginx)

docker build -t voyago-backend ./backend     # build manuel de l'image backend
docker build -t voyago-frontend ./frontend   # build manuel de l'image frontend
```

### État et logs

```bash
docker compose ps                    # état des services (Up / Exited, ports)
docker compose ps -a                 # inclut les conteneurs arrêtés
docker compose top                   # processus qui tournent dans chaque conteneur
docker compose logs                  # logs de tous les services
docker compose logs -f               # suit les logs en direct
docker compose logs -f backend       # suit les logs du backend uniquement
docker compose logs --tail 100 backend   # 100 dernières lignes
docker compose logs -t backend       # avec horodatage
docker compose events                # flux d'événements Docker du projet
docker stats                         # CPU / mémoire des conteneurs en direct
```

### Entrer dans un conteneur / exécuter une commande

```bash
docker compose exec backend sh       # shell dans le backend (alpine : sh, pas bash)
docker compose exec frontend sh      # shell dans le frontend (nginx)
docker exec -it voyago-backend sh    # idem via le nom du conteneur

# Prisma / base de données (dans le backend)
docker compose exec backend npx prisma migrate deploy   # applique les migrations
docker compose exec backend npx prisma db seed          # rejoue le seed (données de démo)
docker compose exec backend npx prisma migrate reset --force   # reset complet + seed
docker compose exec backend npx prisma studio           # UI de la base (port non publié par défaut)

# Lancer un conteneur jetable à partir du service (supprimé à la fin)
docker compose run --rm backend sh
docker compose run --rm backend npm test

# Config nginx du frontend
docker compose exec frontend nginx -t                   # vérifie la config
docker compose exec frontend nginx -s reload            # recharge nginx
```

### Vérifications rapides (smoke tests)

```bash
curl -s http://localhost:3000/api/catalog/flights
curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alex.martin@voyago.demo","password":"Voyage2026"}'
curl -I http://localhost:4200        # le frontend répond (nginx)
```

### Fichiers : copier depuis / vers un conteneur

```bash
docker compose cp backend:/app/prisma/dev.db ./dev.db.backup   # sauvegarde la base SQLite
docker compose cp ./dev.db.backup backend:/app/prisma/dev.db   # la restaure (puis: docker compose restart backend)
```

> Attention : le backend **reseed la base à chaque démarrage**. Une base
> restaurée est donc écrasée au prochain `restart` / `up`.

### Volumes et données

```bash
docker volume ls                                       # liste les volumes
docker volume inspect application-qa-training_backend-data   # détails (chemin, date)
docker volume rm application-qa-training_backend-data  # supprime le volume (conteneurs arrêtés requis)
docker compose down -v                                 # supprime conteneurs + volumes du projet
```

### Réseau

```bash
docker network ls                    # liste les réseaux
docker compose port backend 3000     # port hôte associé au port 3000 du backend
docker compose config                # affiche le compose final (variables résolues) et le valide
docker compose config --services     # liste les services
```

### Images et conteneurs (commandes Docker de base)

```bash
docker ps                            # conteneurs en cours
docker ps -a                         # tous les conteneurs
docker images                        # images locales
docker inspect voyago-backend        # détails complets d'un conteneur (JSON)
docker logs -f voyago-backend        # logs d'un conteneur
docker stop voyago-backend           # arrête un conteneur
docker start voyago-backend          # démarre un conteneur arrêté
docker restart voyago-backend        # redémarre un conteneur
docker rm voyago-backend             # supprime un conteneur arrêté
docker rm -f voyago-backend          # supprime un conteneur même en cours
docker rmi <image>                   # supprime une image
docker history <image>               # couches d'une image (taille de chaque étape)
```

### Nettoyage

```bash
docker container prune               # supprime les conteneurs arrêtés
docker image prune                   # supprime les images orphelines (<none>)
docker image prune -a                # supprime toutes les images non utilisées
docker volume prune                  # supprime les volumes non utilisés
docker network prune                 # supprime les réseaux non utilisés
docker builder prune                 # vide le cache de build
docker system df                     # espace disque utilisé par Docker
docker system prune                  # nettoyage général (conteneurs, réseaux, images orphelines)
docker system prune -a --volumes     # ⚠️ nettoyage total, y compris volumes : tout ce qui n'est pas utilisé
```

### Repartir de zéro (reset complet du projet)

```bash
docker compose down -v --rmi local   # supprime conteneurs, volume et images du projet
docker compose build --no-cache      # reconstruit proprement
docker compose up -d                 # relance avec une base neuve
```

### Dépannage

| Symptôme | Commande / solution |
|---|---|
| `port is already allocated` (3000 / 4200) | Un `npm start` / `ng serve` local tourne déjà : l'arrêter, ou voir `lsof -i :3000` / `lsof -i :4200`, ou changer les ports publiés dans `docker-compose.yml` |
| `Cannot connect to the Docker daemon` | Lancer Docker Desktop, puis `docker info` |
| Le backend redémarre en boucle | `docker compose logs --tail 100 backend` |
| Les changements de code ne sont pas pris en compte | Il n'y a pas de bind-mount : `docker compose up -d --build` pour reconstruire |
| Données de démo corrompues / modifiées | `docker compose restart backend` (migrations + seed rejoués) ou `docker compose down -v` |
| Build qui échoue de manière inexplicable | `docker compose build --no-cache` |
| Le frontend affiche 502 sur `/api` | Le backend n'est pas encore prêt : `docker compose ps` puis `docker compose logs -f backend` |

## Comptes de démonstration

| Rôle  | Email                     | Mot de passe |
|-------|---------------------------|--------------|
| Admin | `admin@voyago.demo`       | `Admin1234`  |
| Client | `alex.martin@voyago.demo` | `Voyage2026` |

## Parcours couverts

1. Accueil / recherche (destination, dates, voyageurs)
2. Résultats de recherche (vols & hôtels, filtres, tri)
3. Fiche détail vol / hôtel (photos, avis, réservation)
4. Inscription
5. Connexion (gestion des erreurs)
6. Panier (ajout/suppression, code promo, récapitulatif)
7. Paiement (carte factice, cas d'erreur simulés)
8. Confirmation de réservation
9. Espace utilisateur (historique, annulation)
10. Espace admin (réservations, gestion des offres)

## Paiement simulé

Aucune vraie API bancaire. Règle de démo (`backend/src/payment/payment.service.ts`) :

- numéro de carte se terminant par un **chiffre pair** → paiement accepté ;
- numéro de carte se terminant par un **chiffre impair** → paiement refusé ;
- date d'expiration `MM/YY` déjà passée → carte expirée.

## Sélecteurs de test

Les éléments interactifs clés (boutons, champs, cartes de résultats,
lignes de tableau...) portent tous un attribut `data-testid` stable, pensé
pour l'automatisation Playwright des prochains épisodes.

## Base de données

SQLite par défaut (`backend/prisma/dev.db`, ignoré par git) pour un
démarrage local sans dépendance externe. Le schéma Prisma
(`backend/prisma/schema.prisma`) reste compatible PostgreSQL : il suffit de
changer `provider = "postgresql"` et `DATABASE_URL` dans `.env` pour migrer
la démo vers une vraie base (utile pour les épisodes CI/CD).
