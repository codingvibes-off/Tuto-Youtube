import { test } from '@playwright/test';
import { runJourney } from '../../utils/journey-runner';
import { getJourneyById } from '../../utils/journey-loader';

const journey = getJourneyById('demos-filter-by-category')!;

test.describe('Filtrage des démos par catégorie', () => {
  test('Vérifie qu\'un utilisateur peut filtrer les démos par catégorie sur la page /demos.', { tag: ["@filtering","@regression"] }, async ({ page }) => {
    await runJourney(page, journey.id);
  });
});
