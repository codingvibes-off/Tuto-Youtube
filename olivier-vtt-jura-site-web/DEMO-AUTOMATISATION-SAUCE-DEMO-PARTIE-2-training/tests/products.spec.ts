import { expect } from '@playwright/test';
import { test } from '../fixtures/authenticated.spec';
test('Ajouter un produit au panier', async ({ authenticatedPage }) => {
    await expect(authenticatedPage).toHaveURL('https://www.saucedemo.com/inventory.html');
    //Ajouter un produit
    await authenticatedPage.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(authenticatedPage.getByTestId('remove-sauce-labs-backpack')).toHaveText('Remove');
    //Vérifier que le produit est bien ajouté au panier
    await expect(authenticatedPage.getByTestId('shopping-cart-badge')).toHaveText('1');
});

test('Ajouter tous les produits au panier', async ({ authenticatedPage }) => {
    await expect(authenticatedPage).toHaveURL('https://www.saucedemo.com/inventory.html');
    while(await authenticatedPage.getByTestId(/add-to-cart-/).count() > 0) {
        await authenticatedPage.getByTestId(/add-to-cart-/).first().click();
    }
    await expect(authenticatedPage.getByTestId('shopping-cart-badge')).toHaveText('6');
});


test('Supprimer un produit du panier', async ({ authenticatedPage }) => {
    await expect(authenticatedPage).toHaveURL('https://www.saucedemo.com/inventory.html');
    //Ajouter un produit
    await authenticatedPage.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(authenticatedPage.getByTestId('remove-sauce-labs-backpack')).toHaveText('Remove');
    await authenticatedPage.getByTestId('remove-sauce-labs-backpack').click();
    //Vérifier que le produit est bien ajouté au panier
    await expect(authenticatedPage.getByTestId('shopping-cart-link')).toBeEmpty();
});




