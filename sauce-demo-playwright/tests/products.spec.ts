import { test, expect } from '@playwright/test';



test('Add a product', async ({ page }) => {
  //ACT 
  await page.goto("https://www.saucedemo.com/")
  //ARRANGE
  await page.getByPlaceholder("Username").fill("standard_user")
  await page.getByPlaceholder("Password").fill("secret_sauce")
  await page.getByRole('button', { name : 'Login'}).click()

  const buttonAddToCart = await page.getByRole("button",{name: "Add to cart"}).first()
  await buttonAddToCart.click()
  //ASSERT
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
});

test('Add many product', async ({ page }) => {
      //ACT 
  await page.goto("https://www.saucedemo.com/")
  //ARRANGE
  await page.getByPlaceholder("Username").fill("standard_user")
  await page.getByPlaceholder("Password").fill("secret_sauce")
  await page.getByRole('button', { name : 'Login'}).click()

  const buttonAddCart = page.getByRole("button", {name: "Add To Cart"})
  const buttonAddCartCount = await buttonAddCart.count()
  for (let i = 0; i < buttonAddCartCount; i++) {
    await page.getByRole('button', {name: "Add To Cart"}).first().click()
    
  }

  while(await page.getByRole('button', {name: "Add To Cart"}).count() > 0){
    await page.getByRole('button', {name: "Add To Cart"}).first().click()
  }
  //ASSERT
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
});


test('Add and REMOVE product', async ({ page }) => {
      //ACT 
  await page.goto("https://www.saucedemo.com/")
  //ARRANGE
  await page.getByPlaceholder("Username").fill("standard_user")
  await page.getByPlaceholder("Password").fill("secret_sauce")
  await page.getByRole('button', { name : 'Login'}).click()

  await page.getByRole('button', {name: "Add To Cart"}).first().click()
  await page.getByRole('button', {name: "Remove"}).first().click()

  //ASSERT
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
});


test('Consult Product', async ({ page }) => {
      //ACT 
  await page.goto("https://www.saucedemo.com/")
  //ARRANGE
  await page.getByPlaceholder("Username").fill("standard_user")
  await page.getByPlaceholder("Password").fill("secret_sauce")
  await page.getByRole('button', { name : 'Login'}).click()

  const count = await page.getByTestId("inventory-item-name").count()

  for (let i = 0; i < count; i++) {
    const product = page.getByTestId("inventory-item-name").nth(i)
    const productText = await product.textContent()
    
    await product.click()
    expect(page.getByTestId("inventory-item-name"))
        .toHaveText(productText!)

    await page.getByTestId("back-to-products").click()
  }
})
  