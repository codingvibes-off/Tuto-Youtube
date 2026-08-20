import { test } from '@playwright/test';
import { runJourney } from '../../utils/journey-runner';
import { getJourneyById } from '../../utils/journey-loader';

const journey = getJourneyById('demos-launch-cta-navigation')!;

test.describe('Navigation vers le formulaire de soumission Launch', () => {
  test('Vérifie que le CTA \'Launch\' d\'une carte de démo redirige vers le formulaire de soumission /launch/submit.', { tag: ["@conversion","@demos"] }, async ({ page }) => {
    await runJourney(page, journey.id);
  });
});
