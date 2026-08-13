import {  expect } from '@playwright/test';
import { LoginPage } from '../page/LoginPage.spec';
import {test} from '../fixtures/authenticated.spec';
import { users } from '../data/users.spec';

test('Se connecter avec des identifiants valides', async ({ authenticated }) => {
  const loginPage = new LoginPage(authenticated)
  loginPage.login(users.standard.username, users.standard.password)
  await expect(authenticated).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Se connecter avec des identifiants invalides - username et password vide', async ({ page }) => {
  const loginPage = new LoginPage(page)
  loginPage.login("", "")
  await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
});








