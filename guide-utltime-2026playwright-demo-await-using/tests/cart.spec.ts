import { test, expect } from '@playwright/test';

test('ajoute un produit au panier', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'Add to cart' }).click();

  // le badge du panier doit afficher "1"
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
