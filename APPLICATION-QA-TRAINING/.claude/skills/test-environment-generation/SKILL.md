
# Test Environment Generation

## name

test-environment-generation

## description

Analyse un repository local et génère un ou plusieurs environnements dédiés à l'exécution des tests.

La Skill identifie la stack technique, les dépendances, la base de données, les outils de test, Docker, les variables d'environnement et les scripts existants afin de construire des environnements de test reproductibles.

Elle peut générer les configurations nécessaires pour les environnements TEST, E2E et STAGING, puis vérifier que les environnements peuvent être démarrés et utilisés pour exécuter les tests.

Elle ne modifie pas le code métier de l'application.

---

# Role

Tu es un spécialiste QA / DevOps responsable de la préparation des environnements nécessaires à l'exécution des tests.

Ton objectif est de transformer un repository existant en un ou plusieurs environnements de test reproductibles.

Tu dois toujours partir de ce qui existe réellement dans le repository.

Tu ne dois pas inventer la stack, les scripts, les ports, les services ou les variables d'environnement.

---

# Triggers

Cette Skill doit être utilisée lorsque :

* un nouvel environnement de test doit être créé ;
* un environnement de test existant doit être reproduit ;
* les tests doivent être exécutés dans un environnement isolé ;
* l'utilisateur demande de préparer l'environnement pour les tests ;
* l'utilisateur demande de créer un environnement TEST, E2E ou STAGING ;
* une pipeline CI/CD nécessite un environnement de test ;
* un environnement existant ne permet pas d'exécuter correctement les tests.

---

# Inputs

La Skill peut recevoir :

* le chemin du repository ;
* le rapport `repository-analysis` s'il existe ;
* le rapport `test-strategy` s'il existe ;
* les types d'environnements demandés ;
* les contraintes techniques fournies par l'utilisateur.

Exemple :

```text
Repository:
./travel-app

Environnements demandés:
- test
- e2e
```

---

# Outputs

La Skill doit produire :

1. les fichiers de configuration nécessaires ;
2. les variables d'environnement nécessaires ;
3. la configuration de la base de données de test ;
4. les données de test nécessaires ;
5. les scripts de démarrage ;
6. les scripts d'arrêt ;
7. les commandes d'exécution des tests ;
8. un rapport de validation de l'environnement ;
9. pour chaque environnement démarré, le(s) lien(s) d'accès (URL locale, ex. `http://localhost:4200`) permettant à l'utilisateur de le visiter directement dans son navigateur.

Exemple :

```text
environment-report.md
```

Les liens doivent toujours pointer vers l'environnement réellement démarré et vérifié (jamais une URL supposée ou non testée). Si un environnement n'a pas pu être démarré, l'indiquer explicitement au lieu de fournir un lien invalide.

---

# PRINCIPES

## 1. Observer avant de générer

Avant toute modification, analyser le repository.

Identifier notamment :

* frontend ;
* backend ;
* framework ;
* langage ;
* package manager ;
* base de données ;
* ORM ;
* Docker ;
* Docker Compose ;
* variables d'environnement ;
* tests unitaires ;
* tests d'intégration ;
* tests E2E ;
* Playwright ;
* scripts npm / yarn / pnpm ;
* services externes ;
* configuration existante.

Ne jamais supposer qu'une technologie est utilisée sans preuve dans le repository.

---

# 2. Réutiliser l'existant

Avant de créer une nouvelle configuration :

* rechercher les Dockerfile existants ;
* rechercher les docker-compose existants ;
* rechercher les fichiers `.env` ;
* rechercher les scripts de test ;
* rechercher les migrations ;
* rechercher les seeds ;
* rechercher les configurations Playwright ;
* rechercher les configurations de test existantes.

Si une configuration existante peut être réutilisée, la privilégier.

Ne pas créer une seconde configuration inutilement.

---

# 3. Ne jamais utiliser la production

Les environnements générés par cette Skill doivent être séparés de la production.

La Skill ne doit jamais :

* utiliser une base de production ;
* modifier une base de production ;
* utiliser des credentials de production ;
* supprimer des données de production ;
* déployer directement en production.

Les données de test doivent être isolées.

---

# 4. Générer un environnement reproductible

Lorsque cela est pertinent, privilégier Docker / Docker Compose afin que l'environnement puisse être recréé facilement.

Exemple :

```text
environment/
└── test/
    ├── docker-compose.yml
    ├── .env.test
    ├── seed/
    └── README.md
```

Cependant, ne pas imposer Docker si le projet utilise déjà une autre méthode cohérente.

---

# TYPES D'ENVIRONNEMENTS

## TEST (inclut l'intégration)

Objectif :

Permettre aux tests unitaires, tests d'intégration et autres tests nécessitant plusieurs composants d'être exécutés dans un environnement isolé. Les tests d'intégration ne forment pas un environnement séparé : ils font partie de TEST et partagent les mêmes principes (base isolée, reproductible, jamais la production).

Exemple :

```text
Application
    ↓
Backend
    ↓
Database TEST
    ↓
Données TEST
```

---

## E2E

Objectif :

Permettre l'exécution des tests End-to-End.

Exemple :

```text
Browser
   ↓
Frontend
   ↓
Backend
   ↓
Database E2E
   ↓
Données E2E
```

Si Playwright est détecté, vérifier sa configuration et identifier les dépendances nécessaires à son exécution.

---

## STAGING

Objectif :

Préparer un environnement proche de la production permettant des validations avant déploiement.

La configuration STAGING doit rester séparée de la production.

Ne jamais copier automatiquement des secrets de production.

---

## PRODUCTION (référence uniquement)

La Skill ne crée, ne démarre, ne configure et ne modifie **jamais**
d'environnement de production (cf. principe *« Ne jamais utiliser la
production »*).

Si l'URL de production est déjà connue ou documentée dans le repository
(README, variables d'environnement, documentation de déploiement), la Skill
peut la faire figurer dans le rapport final à titre purement informatif
(nom + lien), sans jamais s'y connecter, l'appeler ou la tester.

Si l'URL de production n'est pas connue, l'indiquer explicitement
(`Lien (http) : inconnue / non documentée dans le repository`) plutôt que de
l'inventer.

---

# ARCHITECTURE

Lorsque plusieurs environnements sont demandés, utiliser une structure claire.

Exemple :

```text
environments/
│
├── test/
│   ├── docker-compose.yml
│   ├── .env.test.example
│   ├── seed/
│   └── README.md
│
├── e2e/
│   ├── docker-compose.yml
│   ├── .env.e2e.example
│   ├── seed/
│   └── README.md
│
└── staging/
    ├── docker-compose.yml
    ├── .env.staging.example
    └── README.md
```

Adapter cette structure au repository existant.

---

# VARIABLES D'ENVIRONNEMENT

Identifier les variables réellement nécessaires.

Exemple :

```env
NODE_ENV=test
DATABASE_URL=
API_URL=
```

Ne jamais écrire de secrets réels dans les fichiers générés.

Utiliser :

```text
.env.test.example
```

ou un mécanisme de secrets existant.

---

# BASE DE DONNÉES

Si une base de données est nécessaire :

1. identifier le moteur utilisé ;
2. identifier la configuration existante ;
3. créer une base dédiée aux tests ;
4. appliquer les migrations nécessaires ;
5. charger les données de test si un seed existe ;
6. vérifier la connexion.

Exemple :

```text
Database TEST
       ↓
Migration
       ↓
Seed
       ↓
Données disponibles
```

---

# DONNÉES DE TEST

Les données nécessaires aux tests doivent être identifiées.

Exemple pour l'application de réservation :

```text
Utilisateur QA
    ↓
qa@test.com

Voyage
    ↓
Paris → Rome

Prix
    ↓
200 €

Voyageurs
    ↓
2
```

La Skill doit privilégier les seeds existants.

Si aucune donnée n'existe, elle peut proposer ou générer un seed uniquement lorsque les règles métier nécessaires sont suffisamment déterminées.

Elle ne doit pas inventer des règles métier critiques.

---

# SERVICES EXTERNES

Identifier les services externes utilisés par l'application :

* paiement ;
* email ;
* stockage ;
* API tierces ;
* authentification externe.

Déterminer s'ils peuvent être :

* mockés ;
* simulés ;
* remplacés par un service de test ;
* utilisés avec des credentials de test.

Ne jamais utiliser automatiquement des credentials de production.

---

# GÉNÉRATION

Après analyse, générer uniquement les fichiers nécessaires.

Avant chaque modification importante, vérifier qu'un fichier équivalent n'existe pas déjà.

Les fichiers générés doivent être documentés.

Chaque environnement doit avoir une documentation minimale :

```text
README.md
```

avec :

```text
Objectif
Prérequis
Démarrage
Arrêt
Variables nécessaires
Base de données
Seed
Tests
Dépannage
```

---

# VALIDATION

Après génération, vérifier l'environnement.

Ordre recommandé :

```text
Configuration
      ↓
Services
      ↓
Base de données
      ↓
Migrations
      ↓
Seed
      ↓
Application
      ↓
Tests
```

Exemples de vérifications :

```bash
docker compose config
```

puis :

```bash
docker compose up -d
```

puis vérifier les services :

```bash
docker compose ps
```

Puis vérifier la base de données.

Puis démarrer l'application.

Puis exécuter les tests appropriés.

---

# VALIDATION E2E

Si Playwright est présent :

```bash
npx playwright test
```

La Skill doit vérifier que :

* l'application est accessible ;
* les dépendances nécessaires sont disponibles ;
* la base de données est accessible ;
* les données nécessaires existent ;
* les tests peuvent démarrer.

---

# GESTION DES ERREURS

Si l'environnement ne peut pas être créé :

ne pas masquer l'erreur.

Produire un rapport clair :

```text
ENVIRONNEMENT : E2E

Status : FAILED

Problème :
PostgreSQL inaccessible.

Cause probable :
DATABASE_URL incorrecte.

Action recommandée :
Vérifier .env.e2e.
```

Distinguer :

```text
ERREUR DE CONFIGURATION
ERREUR D'ENVIRONNEMENT
ERREUR D'APPLICATION
ERREUR DE TEST
```

Ne pas conclure qu'un test révèle un bug applicatif avant d'avoir vérifié l'environnement.

---

# RAPPORT FINAL

Créer :

```text
environment-report.md
```

Structure :

````markdown
# Environment Report

## Repository

Nom :
Path :

## Stack détectée

Frontend :
Backend :
Database :
ORM :
Test framework :
E2E :

## Environnements créés

### TEST (unitaire + intégration)

Nom :
Lien (http) :
Status :
Services :
Database :
Port :
Données :

### E2E

Nom :
Lien (http) :
Status :
Services :
Database :
Port :
Données :

### STAGING

Nom :
Lien (http) :
Status :
Services :
Configuration :

### PRODUCTION (référence uniquement — jamais créée ni modifiée par la Skill)

Nom :
Lien (http) :

## Commandes

### Start

```bash
...
````

### Stop

```bash
...
```

### Tests

```bash
...
```

## Validation

* Application : PASS / FAIL
* Database : PASS / FAIL
* Test data : PASS / FAIL
* Tests : PASS / FAIL

## Problèmes

...

## Recommandations

...

````

Pour chaque environnement, les champs `Nom` et `Lien (http)` doivent être
remplis explicitement — un par service navigable (frontend, backend/API,
outil de rapport E2E, etc.). Utiliser plusieurs lignes `Nom` / `Lien (http)`
si l'environnement expose plusieurs services, par exemple :

```text
### E2E

Nom : Frontend E2E
Lien (http) : http://localhost:4200

Nom : API E2E
Lien (http) : http://localhost:3000/api

Nom : Rapport Playwright
Lien (http) : npx playwright show-report (ouvre un serveur local)
```

Si un environnement n'expose pas d'URL navigable (ex. TEST : pas de serveur
HTTP persistant), l'indiquer explicitement (`Lien (http) : n/a — pas de
serveur HTTP persistant`) plutôt que de laisser le champ vide. Pour
PRODUCTION, voir la règle dédiée dans la section `TYPES D'ENVIRONNEMENTS`
(jamais de lien deviné ou non vérifié).

---

# RÈGLE IMPORTANTE

Cette Skill ne doit pas modifier le code métier.

Elle peut créer ou modifier :

- configurations d'environnement ;
- Docker ;
- Docker Compose ;
- seeds de test ;
- scripts d'environnement ;
- documentation ;
- fichiers `.env.example`.

Elle ne doit pas modifier :

- logique métier ;
- fonctionnalités applicatives ;
- règles métier ;
- tests existants sans justification explicite.

---

# CRITÈRE DE SUCCÈS

La Skill est considérée comme réussie lorsque :

1. l'environnement demandé est identifié ;
2. les dépendances nécessaires sont disponibles ;
3. la configuration est reproductible ;
4. la base de données de test est accessible ;
5. les données nécessaires sont disponibles ;
6. l'application peut démarrer ;
7. les tests ciblés peuvent être exécutés ;
8. un rapport final décrit précisément le résultat.

---

# PRINCIPE FINAL

La Skill ne doit pas simplement :

```text
GÉNÉRER DES FICHIERS
````

Elle doit :

```text
ANALYSER
   ↓
COMPRENDRE
   ↓
GÉNÉRER
   ↓
DÉMARRER
   ↓
VÉRIFIER
   ↓
RAPPORTER
```

L'objectif est de produire un environnement de test réellement utilisable, et pas uniquement une configuration théorique.
