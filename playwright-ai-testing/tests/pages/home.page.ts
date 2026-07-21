import { Locator, Page } from '@playwright/test';
/*
export class HomePage {
  readonly page: Page;
  readonly shopCoffeeButton: Locator;
  readonly coffeeAddButtons: Locator;
  readonly cartButton: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shopCoffeeButton = page.getByText('Shop Coffee');
    //console.log(this.shopCoffeeButton)
    this.coffeeAddButtons =  page.getByText('Add to Cart');
    this.cartButton = page.getByRole('button', { name: 'Cart' });
    //console.log(this.cartButton)
    this.cartCount = page.getByRole('button', { name: 'Cart' }).locator('.cart-count, .badge, [data-test-id="cart-count"], [aria-label="cart count"]');
    //console.log(this.cartCount)
  }

  async goto() {
    await this.page.goto('https://valentinos-magic-beans.click/');
  }

  async clickShopCoffee() {
    await this.shopCoffeeButton.click();
  }

  async addAllCoffeeToCart() {
    const buttons = page.getByRole('button', { name: 'Add to cart' });
    const count = await buttons.count();
    console.log(count)
    //console.log(`Nombre de boutons "Add to Cart" trouvés : ${count}`);
    /*for (let index = 0; index < count; index++) {
      await this.coffeeAddButtons.nth(index).click();
    }
    return count;
  }

  async openCart() {
    await this.cartButton.click();
  }
}
*/