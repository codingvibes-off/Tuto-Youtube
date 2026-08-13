import {  expect } from '@playwright/test';
import { LoginPage } from "../page/LoginPage.spec"
import { test } from "../fixtures/authenticated.spec"

test('Ajouter un produit au panier', async ({ authenticated }) => {
    await expect(authenticated).toHaveURL('https://www.saucedemo.com/inventory.html');
    //Ajouter un produit
    await authenticated.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(authenticated.getByTestId('remove-sauce-labs-backpack')).toHaveText('Remove');
    //Vérifier que le produit est bien ajouté au panier
    await expect(authenticated.getByTestId('shopping-cart-badge')).toHaveText('1');
  
});

test('Ajouter tous les produits au panier', async ({ authenticated }) => {
    await expect(authenticated).toHaveURL('https://www.saucedemo.com/inventory.html');
    while(await authenticated.getByTestId(/add-to-cart-/).count() > 0) {
        await authenticated.getByTestId(/add-to-cart-/).first().click();
    }
    await expect(authenticated.getByTestId('shopping-cart-badge')).toHaveText('6');
});


test('Supprimer un produit du panier', async ({ page }) => {
    const loginPage = new LoginPage(page)
    loginPage.login("standard_user", "secret_sauce")
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    //Ajouter un produit
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(page.getByTestId('remove-sauce-labs-backpack')).toHaveText('Remove');
    await page.getByTestId('remove-sauce-labs-backpack').click();
    //Vérifier que le produit est bien ajouté au panier
    await expect(page.getByTestId('shopping-cart-link')).toBeEmpty();
  
});




