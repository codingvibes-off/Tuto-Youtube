import { Page } from '@playwright/test';
import { test as base } from '@playwright/test';
import { USERS } from '../data/users';
type Myfixtures = {
    authenticatedPage:Page
}

export const test = base.extend<Myfixtures>({
    authenticatedPage: async ({ page }, use) => {
        await page.goto('https://www.saucedemo.com/');
        await page.getByTestId('username').fill(USERS.STANDARD_USER.username);
        await page.getByTestId('password').fill(USERS.STANDARD_USER.password);
        await page.getByTestId('login-button').click();
        await use(page);
    }
})