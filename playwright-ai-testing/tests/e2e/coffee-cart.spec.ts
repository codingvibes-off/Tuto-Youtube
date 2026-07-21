import { expect, test } from '@playwright/test';

/*test.describe('E-commerce site - Coffee Shopping', () => {
  test('should visit homepage, shop coffee, add all coffees to cart and verify cart', async ({ page }) => {
    const home = new HomePage(page);

    // ARRANGE: Aller sur la page d'accueil de l'application
    await home.goto();

    // ASSERTION: Vérifier que c'est bien la page d'accueil et que le titre de la page est correct
    await expect(page).toHaveURL(/valentinos-magic-beans\.click\/?$/);
    await expect(page).toHaveTitle(/Valentinos|Magic Beans|Coffee/i);

    // ACT: Cliquer sur le bouton Shop Coffee
    await home.clickShopCoffee();

    // ACT: Ajouter au panier tous les cafés de la page
    const coffeeCount = await home.addAllCoffeeToCart();

    // ASSERTION: Vérifier que les cafés sont bien disponibles (au moins un café ajouté)
    //console.log(`Nombre de cafés ajoutés au panier : ${coffeeCount}`);
    //expect(coffeeCount).toBeGreaterThan(0);

    // ACT: Aller sur la page du panier en cliquant sur l'icône lucide-shopping-cart
    //await home.openCart();

    // ASSERTION: Vérifier que le nombre de cafés dans le panier est correct
    //await expect(home.cartCount).toHaveText(String(coffeeCount));
    //await expect(page).toHaveURL(/cart|checkout|basket/i);
  });
});*/