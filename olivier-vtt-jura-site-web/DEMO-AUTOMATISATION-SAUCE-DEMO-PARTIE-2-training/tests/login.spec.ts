
import { expect} from '@playwright/test';
import { test } from '../fixtures/authenticated.spec';
import { LoginPage } from '../Page/LoginPage.spec';
test('Se connecter avec des identifiants valides', async ({ authenticatedPage }) => {
  await expect(authenticatedPage).toHaveURL('https://www.saucedemo.com/inventory.html');
});


test('Se connecter avec des identifiants invalides - username et password vide', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('', '');
  await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
});








