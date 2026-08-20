import { test } from '@playwright/test';
import { runJourney } from '../../utils/journey-runner';
import { getJourneyById } from '../../utils/journey-loader';

const journey = getJourneyById('navigate-to-demos-via-cta')!;

test.describe('Accès aux démos via le lien \'See a sample diff report\'', () => {
  test('Vérifie qu\'un utilisateur peut accéder à la page des démos depuis le CTA de la page d\'accueil.', { tag: ["@smoke","@critical","@navigation"] }, async ({ page }) => {
    await runJourney(page, journey.id);
  });
});
