import { test, expect } from '@playwright/test';

// Seed file : établit l'état de départ (ici, connecté) que le planner
// et le generator peuvent réutiliser comme point de départ pour explorer
// les flows protégés (panier, checkout) sans avoir à gérer le login
// dans chaque scénario généré.
test.describe('Seed', () => {
  test('login as standard user', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory\.html/);
  });
});
