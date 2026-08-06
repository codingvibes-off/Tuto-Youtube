import { test, expect } from '@playwright/test';

test('Ajouter un produit au panier', async ({ page }) => {
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
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(page.getByTestId('remove-sauce-labs-backpack')).toHaveText('Remove');
    //Vérifier que le produit est bien ajouté au panier
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  
});



test('Ajouter tous les produits au panier', async ({ page }) => {
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
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('6');
});


test('Supprimer un produit du panier', async ({ page }) => {
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
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(page.getByTestId('remove-sauce-labs-backpack')).toHaveText('Remove');
    await page.getByTestId('remove-sauce-labs-backpack').click();
    //Vérifier que le produit est bien ajouté au panier
    await expect(page.getByTestId('shopping-cart-link')).toBeEmpty();
  
});




