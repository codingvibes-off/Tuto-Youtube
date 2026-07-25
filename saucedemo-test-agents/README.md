# Test Agents (planner / generator / healer) — démo sur saucedemo.com

Projet Playwright configuré avec les Test Agents natifs (`npx playwright
init-agents --loop=claude`), pointé sur https://www.saucedemo.com/ —
site de démo public fait pour ce genre de test, pas besoin de login réel
(identifiants standards fournis plus bas).

## Ce qui a été généré automatiquement

```
.mcp.json                              → déclare le serveur MCP Playwright
.claude/agents/playwright-test-planner.md    → agent 1
.claude/agents/playwright-test-generator.md  → agent 2
.claude/agents/playwright-test-healer.md     → agent 3
seed.spec.ts                           → login déjà écrit (standard_user / secret_sauce)
specs/                                 → dossier où le planner écrira son plan
playwright.config.ts                   → baseURL = saucedemo.com (ajouté à la main)
```

`.mcp.json` et les fichiers `.claude/agents/*.md` sont générés tels quels
par Playwright 1.56+ — je ne les ai pas écrits, je les ai juste laissés
tels quels et configuré le reste autour.

## Setup

```bash
npm install
npx playwright install chromium   # une seule fois
```

Ouvre le projet dans **Claude Code** (c'est pour ce loop que `.mcp.json`
a été généré — `--loop=claude`). Claude Code lit `.mcp.json` automatiquement
et charge les trois agents comme sub-agents disponibles.

## Le flow à tester, dans l'ordre

**1. Planner** — dans Claude Code :

```
Utilise le planner pour explorer saucedemo.com et générer un plan de test
pour : login, ajout au panier, et checkout complet.
```

Ça doit produire un fichier dans `specs/` avec des scénarios numérotés
(1.1, 1.2, etc.) — le planner navigue réellement sur le site pendant
qu'il écrit le plan.

**2. Generator** — une fois le plan écrit :

```
Utilise le generator pour transformer le scénario 1.1 du plan en test
Playwright.
```

Il doit produire un `.spec.ts` avec des locators `getByRole`/`getByLabel`
plutôt que du CSS — regarde bien ça, c'est la preuve que le generator lit
l'accessibility tree réel de la page plutôt que de deviner.

**3. Casse volontairement un test** (pour tester le healer) :

Ouvre un `.spec.ts` généré et modifie un `getByRole(..., { name: '...' })`
avec un nom légèrement faux, ou change une valeur attendue dans un
`expect()`. Lance :

```bash
npx playwright test
```

Le test doit échouer.

**4. Healer** :

```
Utilise le healer sur les tests qui échouent dans ce projet.
```

Il doit diagnostiquer l'échec, corriger le sélecteur/l'assertion, et
relancer le test pour confirmer que ça passe.

## Identifiants saucedemo (publics, site de démo)

- `standard_user` / `secret_sauce` → utilisateur nominal
- `locked_out_user` / `secret_sauce` → utile pour tester un scénario d'échec
- `problem_user` / `secret_sauce` → UI volontairement buguée, bon terrain
  pour le healer plus tard

## Pour la vidéo

Le moment le plus filmable, c'est l'étape 3 → 4 : casser un sélecteur à
l'écran, montrer l'échec (`npx playwright test` en rouge), puis lancer
le healer et montrer le diff qu'il applique. C'est plus parlant qu'un
planner qui écrit du markdown.
