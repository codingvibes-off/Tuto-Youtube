import { test } from '@playwright/test';
import { runJourney } from '../../utils/journey-runner';
import { getJourneyById } from '../../utils/journey-loader';

const journey = getJourneyById('home-navbar-links-visible')!;

test.describe('Affichage des liens du menu principal', () => {
  test('Vérifie que tous les liens de navigation principaux sont visibles depuis la page d\'accueil.', { tag: ["@navigation","@regression"] }, async ({ page }) => {
    await runJourney(page, journey.id);
  });
});
