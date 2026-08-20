# playwright-lastest-demo

Tests automatisés Playwright (Page Object Model) générés pour
[https://lastest.cloud/release-testing](https://lastest.cloud/release-testing).

## Source de vérité

Les parcours utilisateurs testés sont définis dans :

```
.claude/skills/test-playwright-generator/rootless/parcours.json
```

Toute évolution des scénarios doit passer par ce fichier ; les fichiers `.spec.ts` sous
`tests/journeys` et `tests/smoke` sont générés à partir de ce JSON via
`utils/journey-runner.ts` / `utils/journey-loader.ts`.

## Structure

```
pages/        Page Objects (BasePage + une classe par page)
tests/
  journeys/   Un .spec.ts par parcours de parcours.json
  smoke/      Sous-ensemble des parcours tagués "smoke"
fixtures/     Données de test partagées
utils/        Chargement/validation JSON, résolution des locators, orchestrateur de parcours
result/       Rapport HTML, résultats bruts, résumé JSON
```

## Commandes

```bash
npm test                 # tous les tests
npm run test:smoke       # suite smoke uniquement
npm run test:critical    # tests taggés @critical
npm run test:headed      # exécution avec navigateur visible
npm run typecheck        # vérification TypeScript
npm run report           # ouvre le rapport HTML
```

`BASE_URL` (par défaut `https://lastest.cloud`) est configurable via variable d'environnement.

## Résultats

- Rapport HTML : `result/playwright-report/index.html`
- Résultats bruts : `result/test-results/`, `result/results.json`
- Résumé : `result/summary.json`
