import { test, expect } from '@playwright/test';

test('Se connecter avec des identifiants valides', async ({ page }) => {
  //ARRANGE
  //JE DOIS NAVGUER SUR LE SITE SAUCE DEMO
  await page.goto('https://www.saucedemo.com/');
  //ACT
  //JE DOIS REMPLIR MON IDENTIFIANT ET MON PASSWORD
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  //JE DOIS CLIQUER SUR LE BOUTON LOGIN
  await page.getByTestId('login-button').click();
  //ASSERT
  //JE DOIS VERIFIER QUE JE SUIS CONNECTER
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});



test('Se connecter avec des identifiants invalides - username et password vide', async ({ page }) => {
  //ARRANGE
  //JE DOIS NAVGUER SUR LE SITE SAUCE DEMO
  await page.goto('https://www.saucedemo.com/');
  //ACT
  //JE DOIS REMPLIR MON IDENTIFIANT ET MON PASSWORD
  await page.getByTestId('username').fill('');
  await page.getByTestId('password').fill('');
  //JE DOIS CLIQUER SUR LE BOUTON LOGIN
  await page.getByTestId('login-button').click();
  //ASSERT
  //JE DOIS VERIFIER QUE JE SUIS CONNECTER
  await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
});








