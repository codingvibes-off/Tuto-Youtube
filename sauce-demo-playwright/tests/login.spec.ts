import { test, expect } from '@playwright/test';

test('Connexion Login', async ({ page }) => {
  //ACT 
  await page.goto("https://www.saucedemo.com/")
  //ARRANGE
  await page.getByPlaceholder("Username").fill("standard_user")
  await page.getByPlaceholder("Password").fill("secret_sauce")
  await page.getByRole('button', { name : 'Login'}).click()
  //ASSERT
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
});


test('Connexion Login Password is required', async ({ page }) => {
  //ACT 
  await page.goto("https://www.saucedemo.com/")
  //ARRANGE
  await page.getByPlaceholder("Username").fill("standard_user")
  await page.getByPlaceholder("Password").fill("")
  await page.getByRole('button', { name : 'Login'}).click()
  //ASSERT
  await expect(page.getByText("Epic sadface: Password is required"))
});


test('Connexion Login - Username is required', async ({ page }) => {
  //ACT 
  await page.goto("https://www.saucedemo.com/")
  //ARRANGE
  await page.getByPlaceholder("Username").fill("")
  await page.getByPlaceholder("Password").fill("secret_sauce")
  await page.getByRole('button', { name : 'Login'}).click()
  //ASSERT
  await expect(page.getByText("Epic sadface: Username is required"))
});

test('Connexion Login - Username is required EMAIL and passorw empty ', async ({ page }) => {
  //ACT 
  await page.goto("https://www.saucedemo.com/")
  //ARRANGE
  await page.getByPlaceholder("Username").fill("")
  await page.getByPlaceholder("Password").fill("")
  await page.getByRole('button', { name : 'Login'}).click()
  //ASSERT
  await expect(page.getByText("Epic sadface: Username is required"))
});
