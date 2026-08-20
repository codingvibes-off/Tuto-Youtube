import { test } from '@playwright/test';
import { runJourney } from '../../utils/journey-runner';
import { getJourneyById } from '../../utils/journey-loader';

const journey = getJourneyById('navigate-to-demos-via-nav')!;

test.describe('Accès aux démos via le menu de navigation', () => {
  test('Vérifie qu\'un utilisateur peut accéder à la page des démos via le lien \'Demos\' du menu principal.', { tag: ["@navigation","@regression"] }, async ({ page }) => {
    await runJourney(page, journey.id);
  });
});
