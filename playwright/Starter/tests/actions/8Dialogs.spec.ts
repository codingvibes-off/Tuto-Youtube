import { test, expect } from '@playwright/test'

test('Saving storage - data is cleared - accept dialog', async ({ page }) => {

    page.on('dialog', async (dialog) => {
        await dialog.accept()
    })

    const someName = 'Alex'

    await page.goto('FeedBackForm.html');

    const nameField = page.getByRole('textbox', { name: 'Name (required):' })

    await nameField.fill(someName);

    await page.getByRole('button', {
        name: 'Save Progress'
    }).click()

    await page.reload()

    await page.getByRole('button', {
        name: 'Clear Progress'
    }).click()

    await page.reload()

    await expect(nameField).toBeEmpty()
})


test('Saving storage - data is not cleared - reject dialog', async ({ page }) => {

    page.on('dialog', async (dialog) => {
        if (dialog.message().includes('clear the form')) {
            await dialog.dismiss()
            return
        }
        await dialog.accept()
    })

    const someName = 'Alex'

    await page.goto('FeedBackForm.html');

    const nameField = page.getByRole('textbox', { name: 'Name (required):' })

    await nameField.fill(someName);

    await page.getByRole('button', {
        name: 'Save Progress'
    }).click()

    await page.reload()

    // reject the dialog
    await page.getByRole('button', {
        name: 'Clear Progress'
    }).click()

    await page.reload()

    await expect(nameField).toHaveValue(someName)
})