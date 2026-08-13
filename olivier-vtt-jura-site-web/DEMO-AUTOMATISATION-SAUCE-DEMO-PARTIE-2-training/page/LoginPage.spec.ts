import { test, expect, Page } from '@playwright/test';
export class LoginPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    } 
    async login(username: string, password: string) {
        await this.page.goto('https://www.saucedemo.com/');
        await this.page.getByTestId('username').fill(username);
        await this.page.getByTestId('password').fill(password);
        await this.page.getByTestId('login-button').click();
    }     
}