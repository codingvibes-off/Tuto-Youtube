# Test Playwright Generator

## Description

Cette skill permet d'analyser automatiquement un site web, d'identifier ses parcours utilisateurs, de stocker ces parcours dans un fichier JSON, puis de générer un projet de tests automatisés avec Playwright en respectant l'architecture **Page Object Model (POM)**.

La skill doit ensuite :

* parcourir et analyser le site cible ;
* identifier les pages et parcours utilisateurs pertinents ;
* enregistrer ces parcours dans un fichier JSON ;
* créer ou initialiser un projet Playwright ;
* générer les Page Objects ;
* générer les scénarios de test à partir des parcours JSON ;
* exécuter les tests ;
* générer et stocker le rapport HTML ;
* fournir un résumé de l'exécution.

---

# Objectif

À partir d'une URL cible, automatiser le pipeline suivant :

```text
Site Web
   │
   ▼
Analyse et découverte
   │
   ├── Pages
   ├── Navigation
   ├── Actions utilisateur
   ├── Formulaires
   └── Parcours critiques
   │
   ▼
parcours.json
   │
   ▼
Génération architecture Playwright
   │
   ├── Page Objects
   ├── Fixtures éventuelles
   └── Tests
   │
   ▼
Exécution Playwright
   │
   ▼
Rapport HTML + résultats
```

---

# Entrées

La skill accepte les paramètres suivants :

```yaml
name: test-playwright-generator
description: Analyse un site web et génère des tests automatisés Playwright basés sur les parcours utilisateurs détectés.

inputs:
  url:
    type: string
    required: true
    description: URL du site à analyser.

  output_directory:
    type: string
    required: false
    default: .
    description: Répertoire racine du projet généré.

  browser:
    type: string
    required: false
    default: chromium
    allowed:
      - chromium
      - firefox
      - webkit

  headless:
    type: boolean
    required: false
    default: true

  max_pages:
    type: number
    required: false
    default: 50

  include_mobile:
    type: boolean
    required: false
    default: false
```

---

# Site cible

URL par défaut :

`https://lastest.cloud/release-testing`

La skill doit utiliser l'URL fournie dans `inputs.url`. L'URL ci-dessus constitue uniquement un exemple de cible.

---

# Phase 1 — Analyse du site

## Objectif

Parcourir le site afin d'identifier automatiquement :

* les pages accessibles ;
* les liens internes ;
* les éléments de navigation ;
* les boutons ;
* les formulaires ;
* les champs de saisie ;
* les actions utilisateur ;
* les redirections ;
* les messages de succès ou d'erreur ;
* les parcours métier critiques.

## Règles de découverte

La découverte doit privilégier les éléments interactifs dans l'ordre suivant :

1. attributs accessibles :

   * `role`
   * `aria-label`
   * `aria-labelledby`

2. attributs de test :

   * `data-testid`
   * `data-test`
   * `data-qa`

3. éléments sémantiques :

   * `button`
   * `input`
   * `select`
   * `textarea`
   * `a`

4. texte visible.

Les sélecteurs CSS complexes ou XPath fragiles doivent être évités autant que possible.

### Ordre de priorité Playwright

```typescript
page.getByRole()
page.getByLabel()
page.getByPlaceholder()
page.getByText()
page.getByTestId()
```

---

# Phase 2 — Identification des parcours

La skill doit transformer les interactions détectées en parcours utilisateurs cohérents.

Exemples :

```text
Accueil
  ↓
Cliquer sur "Login"
  ↓
Saisir identifiant
  ↓
Saisir mot de passe
  ↓
Cliquer sur "Se connecter"
  ↓
Vérifier la page de destination
```

Chaque parcours doit avoir :

* un identifiant unique ;
* un nom ;
* une description ;
* une priorité ;
* une catégorie ;
* une liste d'étapes ;
* des préconditions éventuelles ;
* un résultat attendu.

---

# Phase 3 — Stockage des parcours

Les parcours doivent être enregistrés dans le dossier :

```text
.claude/
└── skills/
    └── test-playwright-generator/
        └── rootless/
            └── parcours.json
```

Le dossier doit être créé s'il n'existe pas.

---

# Architecture du fichier `parcours.json`

Le fichier JSON constitue la **source de vérité fonctionnelle** des tests.

Les tests Playwright générés doivent s'appuyer sur ce fichier.

Structure :

```json
{
  "metadata": {
    "site": "https://lastest.cloud/release-testing",
    "generatedAt": "ISO_DATE",
    "generator": "test-playwright-generator",
    "version": "1.0.0"
  },
  "pages": [],
  "journeys": []
}
```

---

## Structure des pages

Chaque page doit être décrite ainsi :

```json
{
  "id": "home",
  "name": "Home Page",
  "url": "/",
  "title": "Expected page title",
  "elements": [
    {
      "name": "loginButton",
      "type": "button",
      "locator": {
        "strategy": "role",
        "role": "button",
        "name": "Login"
      }
    }
  ]
}
```

---

## Structure des parcours

Chaque parcours doit suivre le modèle suivant :

```json
{
  "id": "user-login",
  "name": "Connexion utilisateur",
  "description": "Vérifie qu'un utilisateur peut se connecter.",
  "priority": "critical",
  "tags": [
    "authentication",
    "smoke"
  ],
  "preconditions": [],
  "steps": [
    {
      "id": 1,
      "action": "goto",
      "page": "home",
      "expected": {
        "url": "/"
      }
    },
    {
      "id": 2,
      "action": "click",
      "page": "home",
      "element": "loginButton"
    },
    {
      "id": 3,
      "action": "fill",
      "element": "emailInput",
      "value": "{{USER_EMAIL}}"
    },
    {
      "id": 4,
      "action": "fill",
      "element": "passwordInput",
      "value": "{{USER_PASSWORD}}"
    },
    {
      "id": 5,
      "action": "click",
      "element": "submitButton"
    }
  ],
  "expectedResult": {
    "url": "/dashboard",
    "visible": "dashboardTitle"
  }
}
```

---

# Actions supportées

Le générateur doit supporter au minimum :

```text
goto
click
dblclick
fill
clear
check
uncheck
selectOption
hover
press
upload
waitFor
expectVisible
expectHidden
expectText
expectUrl
expectTitle
screenshot
```

Chaque action doit être validée avant d'être exécutée.

---

# Phase 4 — Création du projet Playwright

Le projet doit être initialisé dans le répertoire cible.

Utiliser une initialisation Playwright moderne, par exemple :

```bash
npm init playwright@latest
```

Si le projet Node.js existe déjà :

```bash
npm install -D @playwright/test
npx playwright install
```

La skill ne doit pas écraser un projet existant sans vérifier les fichiers déjà présents.

---

# Architecture du projet

Le projet final doit respecter la structure suivante :

```text
project/
│
├── .claude/
│   └── skills/
│       └── test-playwright-generator/
│           └── rootless/
│               └── parcours.json
│
├── pages/
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   └── ...
│
├── tests/
│   ├── journeys/
│   │   ├── user-login.spec.ts
│   │   └── ...
│   │
│   └── smoke/
│       └── smoke.spec.ts
│
├── fixtures/
│   └── test-data.ts
│
├── utils/
│   ├── journey-loader.ts
│   └── locator-resolver.ts
│
├── result/
│   ├── playwright-report/
│   ├── test-results/
│   └── summary.json
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

# Architecture Page Object Model

Chaque page doit posséder son propre Page Object.

Exemple :

```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', {
      name: 'Login'
    });
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

---

# BasePage

Les comportements communs doivent être centralisés.

```typescript
import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string) {
    await this.page.goto(path);
  }

  async getTitle() {
    return this.page.title();
  }

  async screenshot(name: string) {
    await this.page.screenshot({
      path: `result/screenshots/${name}.png`
    });
  }
}
```

---

# Génération des tests

Les fichiers `.spec.ts` doivent être générés à partir des parcours présents dans :

```text
.claude/skills/test-playwright-generator/rootless/parcours.json
```

Le générateur doit charger le JSON via un module dédié.

Exemple :

```typescript
import fs from 'fs';
import path from 'path';

const journeyFile = path.resolve(
  '.claude/skills/test-playwright-generator/rootless/parcours.json'
);

export function loadJourneys() {
  const content = fs.readFileSync(journeyFile, 'utf-8');

  return JSON.parse(content);
}
```

---

# Exemple de test généré

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Connexion utilisateur', () => {
  test('Un utilisateur peut se connecter', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');

    await loginPage.login(
      process.env.USER_EMAIL ?? '',
      process.env.USER_PASSWORD ?? ''
    );

    await expect(page).toHaveURL(/dashboard/);
  });
});
```

---

# Règles de génération

La skill doit respecter les règles suivantes :

## Séparation des responsabilités

```text
JSON
↓
Définition fonctionnelle du parcours

Page Object
↓
Interactions avec l'interface

Test
↓
Orchestration du scénario

Utility
↓
Chargement et interprétation des parcours
```

Un fichier de test ne doit pas contenir de sélecteurs complexes directement lorsque ceux-ci peuvent être placés dans un Page Object.

---

# Configuration Playwright

Le fichier `playwright.config.ts` doit être configuré avec :

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', {
      outputFolder: 'result/playwright-report',
      open: 'never'
    }],
    ['list'],
    ['json', {
      outputFile: 'result/results.json'
    }]
  ],

  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});
```

La valeur `BASE_URL` doit être configurable.

Exemple :

```bash
BASE_URL=https://lastest.cloud/release-testing
```

---

# Phase 5 — Validation avant exécution

Avant d'exécuter les tests, la skill doit vérifier :

* que Node.js est disponible ;
* que npm est disponible ;
* que Playwright est installé ;
* que les navigateurs Playwright sont installés ;
* que `parcours.json` est valide ;
* que chaque parcours possède un identifiant ;
* que chaque action est supportée ;
* que les Page Objects nécessaires existent ;
* que les variables d'environnement nécessaires sont présentes.

Si une erreur est détectée, la skill doit produire un message explicite.

---

# Phase 6 — Exécution des scénarios

Exécuter :

```bash
npx playwright test
```

Pour une exécution ciblée :

```bash
npx playwright test tests/journeys
```

Pour le debugging :

```bash
npx playwright test --headed
```

La skill doit exécuter les scénarios générés et collecter :

* le nombre total de tests ;
* le nombre de tests réussis ;
* le nombre de tests échoués ;
* le nombre de tests ignorés ;
* la durée totale ;
* les erreurs principales.

---

# Phase 7 — Rapport HTML

Le rapport HTML Playwright doit être stocké dans :

```text
result/
└── playwright-report/
```

Les résultats bruts doivent être stockés dans :

```text
result/
└── test-results/
```

Un résumé JSON doit également être créé :

```text
result/
└── summary.json
```

Exemple :

```json
{
  "executionDate": "ISO_DATE",
  "total": 10,
  "passed": 8,
  "failed": 1,
  "skipped": 1,
  "duration": "32s"
}
```

---

# Gestion des échecs

Lorsqu'un test échoue, la skill doit :

1. conserver la capture d'écran ;
2. conserver la trace Playwright si disponible ;
3. conserver la vidéo si activée ;
4. identifier l'étape du parcours ayant échoué ;
5. associer l'erreur au `journey.id` ;
6. ajouter l'information dans le rapport final.

Les artefacts doivent rester dans :

```text
result/test-results/
```

---

# Gestion des sélecteurs instables

Si un sélecteur échoue :

1. tenter une stratégie basée sur le rôle ;
2. tenter un label accessible ;
3. tenter un `data-testid` ;
4. utiliser le texte visible ;
5. en dernier recours utiliser un sélecteur CSS.

Le générateur doit éviter :

```text
:nth-child()
div > div > div
XPath absolu
classes CSS générées dynamiquement
```

---

# Priorités des scénarios

Chaque parcours doit posséder une priorité :

```text
critical
high
medium
low
```

Les tests critiques doivent pouvoir être exécutés séparément :

```bash
npx playwright test --grep @critical
```

Les tags doivent être générés à partir du champ :

```json
"tags": [
  "smoke",
  "critical"
]
```

---

# Commandes disponibles

## Découverte complète

```bash
generate-tests --url https://lastest.cloud/release-testing
```

## Génération uniquement

```bash
generate-tests --generate-only
```

## Exécution uniquement

```bash
generate-tests --run
```

## Analyse uniquement

```bash
generate-tests --discover
```

## Génération avec navigateur visible

```bash
generate-tests \
  --url https://lastest.cloud/release-testing \
  --headed
```

---

# Workflow complet

La skill doit suivre strictement cet ordre :

```text
1. Valider l'URL cible
        ↓
2. Analyser le site
        ↓
3. Découvrir les pages
        ↓
4. Identifier les interactions
        ↓
5. Construire les parcours utilisateurs
        ↓
6. Sauvegarder parcours.json
        ↓
7. Valider parcours.json
        ↓
8. Initialiser Playwright si nécessaire
        ↓
9. Générer les Page Objects
        ↓
10. Générer les tests
        ↓
11. Vérifier la compilation TypeScript
        ↓
12. Installer les navigateurs si nécessaire
        ↓
13. Exécuter les tests
        ↓
14. Générer le rapport HTML
        ↓
15. Sauvegarder les artefacts dans result/
        ↓
16. Générer summary.json
```

---

# Critères de qualité

La génération est considérée comme valide uniquement si :

* [ ] le site a été analysé ;
* [ ] les parcours sont stockés dans `parcours.json` ;
* [ ] le JSON est valide ;
* [ ] les parcours possèdent des identifiants uniques ;
* [ ] le projet Playwright est correctement initialisé ;
* [ ] l'architecture POM est respectée ;
* [ ] les tests sont générés à partir des parcours JSON ;
* [ ] les tests peuvent être exécutés ;
* [ ] le rapport HTML est généré ;
* [ ] le rapport est stocké dans `result/playwright-report` ;
* [ ] les résultats d'exécution sont conservés ;
* [ ] un résumé JSON est disponible.

---

# Sortie attendue

À la fin de l'exécution, la skill doit afficher un résumé similaire :

```text
========================================
PLAYWRIGHT TEST GENERATOR
========================================

Site analysé :
https://lastest.cloud/release-testing

Pages découvertes : 12
Parcours générés : 8

Tests générés : 8

Résultats :
✓ Passed : 7
✗ Failed : 1
○ Skipped : 0

Rapport HTML :
result/playwright-report/index.html

Résultats :
result/test-results/

Résumé :
result/summary.json
========================================
```

---

# Règle fondamentale

Le fichier :

```text
.claude/skills/test-playwright-generator/rootless/parcours.json
```

est la **source de vérité des parcours fonctionnels**.

L'architecture doit respecter la dépendance suivante :

```text
parcours.json
      ↓
Journey Loader
      ↓
Test Orchestrator
      ↓
Page Objects
      ↓
Playwright
      ↓
Result / Report
```

Les Page Objects ne doivent pas contenir la logique métier complète des parcours. Ils doivent uniquement encapsuler les interactions avec l'interface.

Les parcours métier doivent rester centralisés dans `parcours.json`, afin de permettre :

* l'ajout de nouveaux scénarios sans modifier toute l'architecture ;
* la régénération des tests ;
* la maintenance des parcours fonctionnels ;
* la séparation entre la connaissance fonctionnelle et l'implémentation technique ;
* l'évolution indépendante des Page Objects et des scénarios métier.
