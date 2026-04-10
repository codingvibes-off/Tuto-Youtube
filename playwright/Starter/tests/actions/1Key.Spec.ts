import { test, expect } from '@playwright/test'

test('Fill actions', async ({ page }) => {
    await page.goto('FeedBackForm.html');
    
    const nameField = page.getByRole('textbox', { name: 'name' })   

    await nameField.fill('Alex')

    await nameField.fill('John')

    // type action is deprecated
    await nameField.type('Alex')  

    await nameField.press('A')
})

test('Key actions', async ({ page }) => {
    await page.goto('FeedBackForm.html');
    
    const nameField = page.getByRole('textbox', { name: 'name' })   

    await nameField.fill('Alex')

    await page.keyboard.down('Escape')

    await expect(nameField).toBeEmpty()
})