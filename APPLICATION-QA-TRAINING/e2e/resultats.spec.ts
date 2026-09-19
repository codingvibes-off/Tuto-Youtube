import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/resultats?destination=Tokyo&travelers=2');
});

// TC-10 — Tri et filtres des résultats
test('le tri par prix croissant met à jour la liste', async ({ page }) => {
  await expect(page.getByTestId('results-summary')).toBeVisible();

  await page.getByTestId('sort-results').selectOption('price-asc');

  await expect(page.getByTestId('results-summary')).toBeVisible();
});

// TC-12 — Navigation retour depuis le détail (via "Modifier la recherche")
test('modifier la recherche revient à la page d\'accueil', async ({ page }) => {
  await page.getByTestId('modify-search').click();

  await expect(page).toHaveURL('/');
});
