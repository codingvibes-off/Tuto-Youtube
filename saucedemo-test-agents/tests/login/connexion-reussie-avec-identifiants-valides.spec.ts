// spec: specs/login.plan.md

import { test, expect } from '@playwright/test';

test.describe('Connexion (Login)', () => {
  test('1.1 Connexion réussie avec identifiants valides (standard_user / secret_sauce)', async ({ page }) => {
    // 1. Naviguer vers https://www.saucedemo.com/ (état de départ : non authentifié, aucune session active)
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByText('Swag Labs')).toBeVisible();

    const usernameInput = page.locator('[data-test="username"]');
    const passwordInput = page.locator('[data-test="password"]');
    const loginButton = page.locator('[data-test="login-button"]');

    await expect(usernameInput).toBeVisible();
    await expect(usernameInput).toHaveValue('');
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveValue('');
    await expect(loginButton).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Accepted usernames are:' })).toBeVisible();
    await expect(page.locator('[data-test="login-password"]')).toContainText('secret_sauce');

    // 2. Cliquer sur le champ 'Username' et saisir la valeur 'standard_user'
    await usernameInput.click();
    await usernameInput.fill('standard_user');
    await expect(usernameInput).toHaveValue('standard_user');

    // 3. Cliquer sur le champ 'Password' et saisir la valeur 'secret_sauce'
    await passwordInput.click();
    await passwordInput.fill('secret_sauce');
    await expect(passwordInput).toHaveValue('secret_sauce');
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // 4. Cliquer sur le bouton 'Login'
    await loginButton.click();
    await expect(page.locator('[data-test="error"]')).not.toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // 5. Vérifier l'URL de la page atteinte après connexion
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // 6. Vérifier le titre de l'onglet du navigateur
    await expect(page).toHaveTitle('Swag Labs');

    // 7. Vérifier la présence de l'en-tête de section produits
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');

    // 8. Vérifier la présence de la liste des produits sur la page inventory
    const inventoryItems = page.locator('.inventory_item');
    await expect(inventoryItems).toHaveCount(6);

    const productNames = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)',
    ];
    for (const productName of productNames) {
      await expect(page.getByText(productName, { exact: true })).toBeVisible();
    }

    await expect(inventoryItems.locator('img')).toHaveCount(6);
    await expect(page.locator('.inventory_item_price')).toHaveCount(6);
    await expect(page.getByRole('button', { name: 'Add to cart' })).toHaveCount(6);

    // 9. Vérifier la présence des éléments de navigation propres à l'utilisateur connecté (menu hamburger 'Open Menu' et icône panier)
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  });
});
