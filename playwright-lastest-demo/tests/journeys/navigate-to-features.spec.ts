import { test } from '@playwright/test';
import { runJourney } from '../../utils/journey-runner';
import { getJourneyById } from '../../utils/journey-loader';

const journey = getJourneyById('navigate-to-features')!;

test.describe('Accès à la page Features', () => {
  test('Vérifie qu\'un utilisateur peut accéder à la page Features via le menu principal.', { tag: ["@navigation"] }, async ({ page }) => {
    await runJourney(page, journey.id);
  });
});
