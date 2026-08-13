import { Page, test as base } from "playwright/test";

type MyFixtures = {
  authenticated: Page;
};

export const test = base.extend<MyFixtures>({
  authenticated: async ({ page }, use) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
    await use(page);
  }
});