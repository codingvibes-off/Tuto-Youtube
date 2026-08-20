import { test } from '@playwright/test';
import { runJourney } from '../../utils/journey-runner';
import { getJourneyById } from '../../utils/journey-loader';

const journey = getJourneyById('book-release-review-cta')!;

test.describe('Réservation d\'un point de préparation à la release', () => {
  test('Vérifie que le CTA principal \'Book a release-readiness review\' redirige vers la section enterprise de la page éditoriale.', { tag: ["@smoke","@critical","@conversion"] }, async ({ page }) => {
    await runJourney(page, journey.id);
  });
});
