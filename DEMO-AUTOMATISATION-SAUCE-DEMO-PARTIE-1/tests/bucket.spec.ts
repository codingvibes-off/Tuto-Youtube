import { test, expect } from '@playwright/test';

test('Supprimer tous les produits du panier', async ({ page }) => {
    //Se connecter au site
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
    //Ajouter un produit
    const products = await page.getByTestId(/add-to-cart-/).all();
    while(await page.getByTestId(/add-to-cart-/).count() > 0) {
        await page.getByTestId(/add-to-cart-/).first().click();
    }

    await page.getByTestId('shopping-cart-link').click();
     while(await page.getByText("Remove").count() > 0) {
        await page.getByText("Remove").first().click();
    }
     await expect(page.getByTestId('shopping-cart-link')).toBeEmpty();
});

test('Consulter le panier avec des produits', async ({ page }) => {
    //Se connecter au site
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

    await page.getByTestId('shopping-cart-link').click();
    const container = await page.getByTestId('inventory-item');
    await expect(container.locator(page.getByTestId('inventory-item'))).toHaveCount(0);
    await page.getByTestId('continue-shopping').click();
    //Ajouter un produit
    const products = await page.getByTestId(/add-to-cart-/).all();
    while(await page.getByTestId(/add-to-cart-/).count() > 0) {
        await page.getByTestId(/add-to-cart-/).first().click();
    }
    await page.getByTestId('shopping-cart-link').click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('6');

    const inventoryItems = await page.getByTestId('inventory-item-name').allTextContents();
    const expectedItems = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)'
    ];
    for (const item of expectedItems) {
        await expect(inventoryItems).toContain(item);
    }
    const descriptionItems = await page.getByTestId('inventory-item-desc').allTextContents();
    const expectedDescriptionItems = [
        'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
        'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.',
        'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
        'It\'s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.',
        'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.',
        'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.'
    ];
     for (const item of expectedDescriptionItems) {
        await expect(descriptionItems).toContain(item);
    }
   
});

test('Consulter la page panier pour un utilisateur non connecté', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/cart.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
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
    const expectedItems = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)'
    ];
    for (const item of expectedItems) {
        await expect(inventoryItems).toContain(item);
    }
    const descriptionItems = await page.getByTestId('inventory-item-desc').allTextContents();
    const expectedDescriptionItems = [
        'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
        'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.',
        'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
        'It\'s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.',
        'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.',
        'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.'
    ];
     for (const item of expectedDescriptionItems) {
        await expect(descriptionItems).toContain(item);
    }
     const priceItems = await page.getByTestId('inventory-item-price').allTextContents();
    const expectedPriceItems = [
        '$29.99',
        '$9.99',
        '$15.99',
        '$49.99',
        '$7.99',
        '$15.99'
    ];
     for (const item of expectedPriceItems) {
        await expect(priceItems).toContain(item);
    }

    await page.getByTestId('finish').click();
    await expect(page.getByText("Thank you for your order!")).toBeVisible();
    await page.getByTestId('generate-pdf-order').click();

});