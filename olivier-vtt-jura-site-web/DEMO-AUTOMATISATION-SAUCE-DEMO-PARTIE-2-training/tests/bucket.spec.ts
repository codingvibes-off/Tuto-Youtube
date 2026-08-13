import {  expect } from '@playwright/test';
import { LoginPage } from '../Page/LoginPage.spec';
import { test } from '../fixtures/authenticated.spec';
import { BUCKET } from '../data/bucket';

test('Supprimer tous les produits du panier', async ({ authenticatedPage }) => {
    await expect(authenticatedPage).toHaveURL('https://www.saucedemo.com/inventory.html');
    const products = await authenticatedPage.getByTestId(/add-to-cart-/).all();
    while(await authenticatedPage.getByTestId(/add-to-cart-/).count() > 0) {
        await authenticatedPage.getByTestId(/add-to-cart-/).first().click();
    }

    await authenticatedPage.getByTestId('shopping-cart-link').click();
     while(await authenticatedPage.getByText("Remove").count() > 0) {
        await authenticatedPage.getByText("Remove").first().click();
    }
     await expect(authenticatedPage.getByTestId('shopping-cart-link')).toBeEmpty();
});

test('Consulter le panier avec des produits', async ({ authenticatedPage }) => {
    await expect(authenticatedPage).toHaveURL('https://www.saucedemo.com/inventory.html');

    await authenticatedPage.getByTestId('shopping-cart-link').click();
    const container = await authenticatedPage.getByTestId('inventory-item');
    await expect(container.locator(authenticatedPage.getByTestId('inventory-item'))).toHaveCount(0);
    await authenticatedPage.getByTestId('continue-shopping').click();
    //Ajouter un produit
    const products = await authenticatedPage.getByTestId(/add-to-cart-/).all();
    while(await authenticatedPage.getByTestId(/add-to-cart-/).count() > 0) {
        await authenticatedPage.getByTestId(/add-to-cart-/).first().click();
    }
    await authenticatedPage.getByTestId('shopping-cart-link').click();
    await expect(authenticatedPage.getByTestId('shopping-cart-badge')).toHaveText('6');

    const inventoryItems = await authenticatedPage.getByTestId('inventory-item-name').allTextContents();
    const expectedItems = BUCKET.EXPECT_ITEM
    for (const item of expectedItems) {
        await expect(inventoryItems).toContain(item);
    }
    const descriptionItems = await authenticatedPage.getByTestId('inventory-item-desc').allTextContents();
    const expectedDescriptionItems = BUCKET.DESCRIPTION_ITEMS;
     for (const item of expectedDescriptionItems) {
        await expect(descriptionItems).toContain(item);
    }
   
});

test('Consulter la page panier pour un utilisateur non connecté', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/cart.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('Se deconnecter avec un panier non vide - verification du contenu panier', async ({ authenticatedPage }) => {
    while(await authenticatedPage.getByTestId(/add-to-cart-/).count() > 0) {
        await authenticatedPage.getByTestId(/add-to-cart-/).first().click();
    }
    await authenticatedPage.getByTestId('shopping-cart-link').click();
    await expect(authenticatedPage.getByTestId('shopping-cart-badge')).toHaveText('6');

    await authenticatedPage.getByTestId('continue-shopping').click();
    await authenticatedPage.getByText("Open Menu").click();
    await authenticatedPage.getByText("Logout").click();

    const loginPage = new LoginPage(authenticatedPage);
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(authenticatedPage.getByTestId('shopping-cart-badge')).toHaveText('6');
});




test('Finaliser une commande avec téléchargement de facture', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    while(await page.getByTestId(/add-to-cart-/).count() > 0) {
        await page.getByTestId(/add-to-cart-/).first().click();
    }
    await page.getByTestId('shopping-cart-link').click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('6');

    await page.getByTestId('checkout').click();
    await page.getByTestId('firstName').fill('John');
    await page.getByTestId('lastName').fill('Doe');
    await page.getByTestId('postalCode').fill('12345');
    await page.getByTestId('continue').click();

    const inventoryItems = await page.getByTestId('inventory-item-name').allTextContents();
    const expectedItems = BUCKET.EXPECT_ITEM
    for (const item of expectedItems) {
        await expect(inventoryItems).toContain(item);
    }
    const descriptionItems = await page.getByTestId('inventory-item-desc').allTextContents();
    const expectedDescriptionItems = BUCKET.DESCRIPTION_ITEMS
     for (const item of expectedDescriptionItems) {
        await expect(descriptionItems).toContain(item);
    }
     const priceItems = await page.getByTestId('inventory-item-price').allTextContents();
    const expectedPriceItems = BUCKET.EXPECTED_PRICES
     for (const item of expectedPriceItems) {
        await expect(priceItems).toContain(item);
    }

    await page.getByTestId('finish').click();
    await expect(page.getByText("Thank you for your order!")).toBeVisible();
    await page.getByTestId('generate-pdf-order').click();

});