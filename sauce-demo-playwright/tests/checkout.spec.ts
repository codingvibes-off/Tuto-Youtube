import { test, expect } from '@playwright/test';


test.only('Passer un paiement', async ({ page }) => {
  //ACT 
  await page.goto("https://www.saucedemo.com/")
  //ARRANGE
  await page.getByPlaceholder("Username").fill("standard_user")
  await page.getByPlaceholder("Password").fill("secret_sauce")
  await page.getByRole('button', { name : 'Login'}).click()

  await page.getByTestId("shopping-cart-badge").click()
  expect(page.getByTestId("cart-list")).not.toHaveCount(0)
  await page.getByRole("button", {name: "Checkout"})

})