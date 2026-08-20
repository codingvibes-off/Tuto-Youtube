import { test } from '@playwright/test';
import { runJourney } from '../../utils/journey-runner';
import { getJourneyById } from '../../utils/journey-loader';

const journey = getJourneyById('home-page-loads')!;

test.describe('Chargement de la page d\'accueil', () => {
  test('Vérifie que la page d\'accueil (release-testing) se charge correctement avec son titre et son contenu principal.', { tag: ["@smoke","@critical","@navigation"] }, async ({ page }) => {
    await runJourney(page, journey.id);
  });
});
