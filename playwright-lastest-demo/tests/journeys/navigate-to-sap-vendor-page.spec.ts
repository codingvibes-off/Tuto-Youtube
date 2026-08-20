import { test } from '@playwright/test';
import { runJourney } from '../../utils/journey-runner';
import { getJourneyById } from '../../utils/journey-loader';

const journey = getJourneyById('navigate-to-sap-vendor-page')!;

test.describe('Accès à la page vendeur SAP S/4HANA', () => {
  test('Vérifie qu\'un utilisateur peut accéder à la page dédiée au test de régression SAP S/4HANA depuis la page d\'accueil.', { tag: ["@navigation","@vendor"] }, async ({ page }) => {
    await runJourney(page, journey.id);
  });
});
