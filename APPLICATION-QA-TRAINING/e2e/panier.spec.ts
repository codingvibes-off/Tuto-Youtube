import { test, expect, Page } from '@playwright/test';

const DEMO_USER = { email: 'alex.martin@voyago.demo', password: 'Voyage2026' };

async function login(page: Page): Promise<void> {
  await page.goto('/connexion');
  await page.getByTestId('auth-email').fill(DEMO_USER.email);
  await page.getByTestId('auth-password').fill(DEMO_USER.password);
  await page.getByTestId('auth-submit').click();
  await expect(page).toHaveURL('/compte');
}

// Le compte de démo est partagé entre les runs : on vide son panier avant le
// test pour que les assertions sur le nombre d'articles restent fiables.
async function emptyCart(page: Page): Promise<void> {
  await page.goto('/panier');
  const removeButtons = page.locator('[data-testid^="remove-cart-"]');
  let count = await removeButtons.count();
  while (count > 0) {
    await removeButtons.first().click();
    await expect(removeButtons).toHaveCount(count - 1);
    count -= 1;
  }
}

// TC-CART-01 — Ajout d'un vol au panier de bout en bout
test('un voyageur connecté peut ajouter un vol au panier depuis les résultats', async ({ page }) => {
  await login(page);
  await emptyCart(page);

  await page.goto('/resultats?destination=Tokyo&travelers=2');
  await expect(page.getByTestId('results-summary')).toBeVisible();

  const firstFlight = page.locator('[data-testid^="view-flight-"]').first();
  await expect(firstFlight).toBeVisible();
  await firstFlight.click();

  await expect(page.getByTestId('detail-title')).toBeVisible();

  await page.getByTestId('add-to-cart').click();

  await expect(page.getByTestId('toast-success')).toBeVisible();
  await expect(page.getByTestId('cart-count')).toHaveText('1');

  await page.getByTestId('nav-cart').click();

  await expect(page).toHaveURL('/panier');
  await expect(page.getByTestId('cart-items')).toBeVisible();
  await expect(page.locator('[data-testid^="cart-item-"]')).toHaveCount(1);
  await expect(page.getByTestId('cart-subtotal')).toBeVisible();
});

// TC-CART-02 — L'ajout au panier sans être connecté redirige vers la connexion
test('ajouter un vol au panier sans être connecté redirige vers la page de connexion', async ({ page }) => {
  await page.goto('/resultats?destination=Tokyo&travelers=2');
  await expect(page.getByTestId('results-summary')).toBeVisible();

  const firstFlight = page.locator('[data-testid^="view-flight-"]').first();
  await firstFlight.click();
  await expect(page.getByTestId('detail-title')).toBeVisible();

  await page.getByTestId('add-to-cart').click();

  await expect(page).toHaveURL(/\/connexion/);
  await expect(page.getByTestId('auth-submit')).toBeVisible();
});
