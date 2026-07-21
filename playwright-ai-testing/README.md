# Playwright E-commerce Testing

Projet initial pour tester une application e-commerce avec Playwright.

## Structure

- `tests/e2e/` - scénarios de tests end-to-end
- `tests/pages/` - objets de page et helpers
- `playwright.config.ts` - configuration Playwright

## Installation

```bash
npm install
npm run install:browser
```

## Commandes

- `npm test` - lancer les tests en mode headless
- `npm run test:headed` - lancer les tests avec interface graphique
- `npm run test:debug` - lancer le mode debug Playwright
