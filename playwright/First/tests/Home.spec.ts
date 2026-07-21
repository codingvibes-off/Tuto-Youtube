import { test, expect } from '@playwright/test';
import { YopmailHelper } from '../helpers/yopmailHelpers';
import * as fs from 'fs';
import * as path from 'path';


test('Create User Account - 001',async ({ page , context })=>{
    //Arrange
    await page.goto('https://valentinos-magic-beans.click/');
 
    //Act
    await page.getByRole('button', { name: 'Sign Up' }).click();
    
    const firstname = page.locator('#first-name');
    await firstname.click();
    await firstname.fill('firstname');

    const lastname = page.locator('#last-name');
    await lastname.fill('lastname');

    const email = page.locator('#email');
    const random = Math.floor(Math.random() * 100000);

    let emailRandom = `sullivan.sextius${random}@yopmail.com`;
    await email.fill(emailRandom);

    const password = page.locator('#password');
    await password.fill('mk8yi7eaqM@sss!');
    //Assertion
    await expect(firstname).toHaveValue('firstname');
    await expect(lastname).toHaveValue('lastname');
    await expect(email).toHaveValue(emailRandom);
    await expect(password).toHaveValue('mk8yi7eaqM@sss!');
    //Arrange
    await page.getByRole("button", { name: 'Create an account' }).click();
    
    const pageYopMailHelper = await context.newPage();
    const yopmailHelper = new YopmailHelper(pageYopMailHelper);

    await yopmailHelper.open();
    await yopmailHelper.setEmail(emailRandom);
    await yopmailHelper.openFirstEmail();

    const code = await yopmailHelper.getCode();
    if(code.length > 0){
        await pageYopMailHelper.close();
    }
    const input = page.locator('input[data-input-otp="true"]');
    await input.waitFor();
    await input.click();
    await input.fill(code);
    await page.getByRole('button', { name: 'Confirm Account' }).click();
    
    const data = {
        email: emailRandom,
        password: 'mk8yi7eaqM@sss!'
    };
    fs.writeFileSync('./First/dataBuilder/test-data.json', JSON.stringify(data, null, 2));
})


test.only('Se connecter au site avec un compte utilisateur - 003', async ({ page })=>{
    const data = {
        email: "emailRandom@gmail.com",
        password: "MySecurePassword123"
    };
    fs.writeFileSync('./First/dataBuilder/test-data.json', JSON.stringify(data, null, 2));
})
test('Se connecter au site avec un compte utilisateur - 002', async ({ page })=>{
        //Arrange
        const testData = JSON.parse(fs.readFileSync('dataBuilder/test-data.json', 'utf-8'));
        const emailJSON = testData.email;
        const passwordJSON = testData.password;
        await page.goto('https://valentinos-magic-beans.click/');

        //Act
        page.getByRole('button', { name: 'Login' }).click();

        const email = await page.locator('[data-test-id="login-email-input"]');
        email.fill(emailJSON);

        const password = page.locator('[data-test-id="login-password-input"]');
        password.fill(passwordJSON);

        await page.locator('[data-test-id="login-submit-button"]')
        //Assertion
        await expect(email).toHaveValue(emailJSON);
        await expect(password).toHaveValue('mk8yi7eaqM@sss!');
    })
