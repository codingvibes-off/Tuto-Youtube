import { test } from '@playwright/test';
import { runJourney } from '../../utils/journey-runner';
import { getJourneysByTag } from '../../utils/journey-loader';

test.describe('Smoke suite', () => {
  for (const journey of getJourneysByTag('smoke')) {
    test(`[${journey.priority}] ${journey.name}`, { tag: journey.tags.map((t) => `@${t}`) }, async ({ page }) => {
      await runJourney(page, journey.id);
    });
  }
});
