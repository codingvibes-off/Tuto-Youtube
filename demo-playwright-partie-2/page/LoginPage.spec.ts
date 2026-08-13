import {Page} from "@playwright/test"
import {users } from '../data/users.spec'
export class LoginPage {
    readonly page: Page
    constructor(page:Page){
        this.page = page
    }
    async login(username:string,password: string){
        await this.page.goto('https://www.saucedemo.com/');
        await this.page.getByTestId('username').fill(users.standard.username);
        await this.page.getByTestId('password').fill(users.standard.password);
        await this.page.getByTestId('login-button').click();
    }
}