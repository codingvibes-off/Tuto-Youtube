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
