import { test, expect } from '@playwright/test';

// TC-01 — Recherche standard avec résultats
test('TC-01 — Recherche standard avec résultats', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('search-destination').fill('Tokyo');
  await page.getByTestId('travelers-value').fill('5');
  await page.getByTestId('search-submit').click();
});

// TC-VOY-01 — Nombre de voyageurs inférieur au minimum
test('recherche bloquée si le nombre de voyageurs est sous le minimum', async ({ page }) => {
  await page.goto('/');

  // valeur par défaut = 2, deux décréments passent sous le minimum (1)
  await page.getByTestId('travelers-decrement').click();
  await page.getByTestId('travelers-decrement').click();

  await expect(page.getByTestId('travelers-error')).toBeVisible();
  await expect(page.getByTestId('search-submit')).toBeDisabled();
});

// TC-VOY-04 — Nombre de voyageurs au maximum
test('recherche acceptée avec 9 voyageurs', async ({ page }) => {
  await page.goto('/');

  const travelersValue = page.getByTestId('travelers-value');
  await travelersValue.fill('9');
  await page.getByTestId('search-destination').fill('Bali');
  await page.getByTestId('search-submit').click();

  await expect(page).toHaveURL(/\/resultats/);
  await expect(page.getByTestId('travelers-warning')).toHaveCount(0);
});
