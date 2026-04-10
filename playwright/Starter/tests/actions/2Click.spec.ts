import { test, expect } from '@playwright/test'

test('Click actions', async ({ page }) => {
    await page.goto('FeedBackForm.html')

    const submitButton = page.getByRole('button', {
        name: 'Submit'
    }) 
    await submitButton.click()
})

test('Click actions with options', async ({ page }) => {
    await page.goto('FeedBackForm.html')

    const submitButton = page.getByRole('button', {
        name: 'Submit'
    }) 
    await submitButton.click({
        button: 'right',
        position: {
            x: 10,
            y: 10
        }
    })
})

test('Click actions - with key down', async ({ page }) => {
    await page.goto('FeedBackForm.html');

    const improvementInput = page.getByLabel('Areas for Improvement')

    const firstOption = improvementInput.getByRole('option').first();
    const secondOption = improvementInput.getByRole('option').nth(1);

    await firstOption.click();

    await expect(improvementInput).toHaveValue('content')

    await secondOption.click({
        modifiers: ['Control']
    })

    await expect(improvementInput).toHaveValues(['content', 'presentation']) 
})