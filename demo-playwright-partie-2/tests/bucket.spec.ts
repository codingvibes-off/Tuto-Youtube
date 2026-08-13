import {  expect } from '@playwright/test';
import { expectedItems, expectedDescriptionItems, expectedPriceItems } from '../data/bucket.spec';
import {test} from "../fixtures/authenticated.spec";

test('Supprimer tous les produits du panier', async ({ authenticated }) => {
    await expect(authenticated).toHaveURL('https://www.saucedemo.com/inventory.html');
    //Ajouter un produit
    const products = await authenticated.getByTestId(/add-to-cart-/).all();
    while(await authenticated.getByTestId(/add-to-cart-/).count() > 0) {
        await authenticated.getByTestId(/add-to-cart-/).first().click();
    }

    await authenticated.getByTestId('shopping-cart-link').click();
     while(await authenticated.getByText("Remove").count() > 0) {
        await authenticated.getByText("Remove").first().click();
    }
     await expect(authenticated.getByTestId('shopping-cart-link')).toBeEmpty();
});

test('Consulter le panier avec des produits', async ({ authenticated }) => {
    //Se connecter au site
    //ARRANGE
    //JE DOIS NAVGUER SUR LE SITE SAUCE DEMO
    await authenticated.goto('https://www.saucedemo.com/');
    //ACT
    //JE DOIS REMPLIR MON IDENTIFIANT ET MON PASSWORD
    await authenticated.getByTestId('username').fill('standard_user');
    await authenticated.getByTestId('password').fill('secret_sauce');
    //JE DOIS CLIQUER SUR LE BOUTON LOGIN
    await authenticated.getByTestId('login-button').click();
    //ASSERT
    //JE DOIS VERIFIER QUE JE SUIS CONNECTER
    await expect(authenticated).toHaveURL('https://www.saucedemo.com/inventory.html');

    await authenticated.getByTestId('shopping-cart-link').click();
    const container = await authenticated.getByTestId('inventory-item');
    await expect(container.locator(authenticated.getByTestId('inventory-item'))).toHaveCount(0);
    await authenticated.getByTestId('continue-shopping').click();
    //Ajouter un produit
    const products = await authenticated.getByTestId(/add-to-cart-/).all();
    while(await authenticated.getByTestId(/add-to-cart-/).count() > 0) {
        await authenticated.getByTestId(/add-to-cart-/).first().click();
    }
    await authenticated.getByTestId('shopping-cart-link').click();
    await expect(authenticated.getByTestId('shopping-cart-badge')).toHaveText('6');

    const inventoryItems = await authenticated.getByTestId('inventory-item-name').allTextContents();
    for (const item of expectedItems) {
        await expect(inventoryItems).toContain(item);
    }
    const descriptionItems = await authenticated.getByTestId('inventory-item-desc').allTextContents();
     for (const item of expectedDescriptionItems) {
        await expect(descriptionItems).toContain(item);
    }
});

test('Consulter la page panier pour un utilisateur non connecté', async ({ authenticated }) => {
    await authenticated.goto('https://www.saucedemo.com/cart.html');
    await expect(authenticated).toHaveURL('https://www.saucedemo.com/');
});

test('Se deconnecter avec un panier non vide - verification du contenu panier', async ({ page }) => {
     await page.goto('https://www.saucedemo.com/');
    //ACT
    //JE DOIS REMPLIR MON IDENTIFIANT ET MON PASSWORD
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    //JE DOIS CLIQUER SUR LE BOUTON LOGIN
    await page.getByTestId('login-button').click();

    //Ajouter un produit
    const products = await page.getByTestId(/add-to-cart-/).all();
    while(await page.getByTestId(/add-to-cart-/).count() > 0) {
        await page.getByTestId(/add-to-cart-/).first().click();
    }
    await page.getByTestId('shopping-cart-link').click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('6');

    await page.getByTestId('continue-shopping').click();
    await page.getByText("Open Menu").click();
    await page.getByText("Logout").click();

    await page.goto('https://www.saucedemo.com/');
    //ACT
    //JE DOIS REMPLIR MON IDENTIFIANT ET MON PASSWORD
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    //JE DOIS CLIQUER SUR LE BOUTON LOGIN
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('6');

});






test('Finaliser une commande avec téléchargement de facture', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    //Ajouter un produit
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
    for (const item of expectedItems) {
        await expect(inventoryItems).toContain(item);
    }
    const descriptionItems = await page.getByTestId('inventory-item-desc').allTextContents();
     for (const item of expectedDescriptionItems) {
        await expect(descriptionItems).toContain(item);
    }
     const priceItems = await page.getByTestId('inventory-item-price').allTextContents();
     for (const item of expectedPriceItems) {
        await expect(priceItems).toContain(item);
    }

    await page.getByTestId('finish').click();
    await expect(page.getByText("Thank you for your order!")).toBeVisible();
    await page.getByTestId('generate-pdf-order').click();

});