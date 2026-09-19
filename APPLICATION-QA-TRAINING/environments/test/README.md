# Environnement TEST (unitaire + intégration backend)

## Objectif

Exécuter les tests unitaires et d'intégration du backend dans un
environnement isolé, sans dépendre d'un serveur démarré manuellement ni
d'une base de données partagée.

## Prérequis

- Node.js 20+
- Dépendances installées : `cd backend && npm install`

## Démarrage

```bash
cd backend
npm test
```

Ce n'est pas un serveur qui reste allumé : la commande exécute les 4 suites
de tests puis s'arrête d'elle-même (~3.5s).

## Arrêt

Rien à arrêter — le process se termine tout seul à la fin des tests.

## Variables nécessaires

Aucune variable globale n'est requise : chaque test d'intégration positionne
lui-même son propre `DATABASE_URL` en mémoire (voir ci-dessous). Pas de
fichier `.env.test` : ça n'existe pas et rien n'en lirait un.

## Base de données

- Tests **unitaires** (`cart.service.spec.ts`, `payment.service.spec.ts`) :
  aucune base — le `PrismaService` est mocké (`null`).
- Tests **d'intégration** (`cart.service.integration.spec.ts`,
  `payment.service.integration.spec.ts`) : chaque fichier crée sa propre
  base SQLite temporaire (`backend/prisma/test-cart.db`,
  `test-payment.db`), via `prisma db push`, supprimée automatiquement en
  `beforeAll`/`afterAll`. Isolée de `dev.db` et de `e2e.db`.

## Seed

Aucun — chaque test d'intégration crée directement les données dont il a
besoin (utilisateur, vol, hôtel) dans son propre `beforeAll`.

## Tests

```bash
cd backend && npm test
```

Résultat attendu : `4 passed, 4 total` / `15 passed, 15 total`.

## Liens

Nom : TEST
Lien (http) : n/a — pas de serveur HTTP persistant (tests in-process via `supertest`)

## Dépannage

- **`npm test` ne produit aucune sortie et se termine en silence** : c'est
  un `watchman` cassé localement (bibliothèque Homebrew manquante), sans
  rapport avec le projet — déjà corrigé via `"watchman": false` dans la
  config Jest de `backend/package.json`.
- **Erreur SQLite "table does not exist"** : un fichier
  `test-cart.db`/`test-payment.db` a pu rester d'un run précédemment
  interrompu — supprimer `backend/prisma/test-*.db` et relancer.
