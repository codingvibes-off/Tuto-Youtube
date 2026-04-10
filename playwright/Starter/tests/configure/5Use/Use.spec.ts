import { test } from '@playwright/test'

test.use({
    locale: 'it-IT',
    baseURL: 'https://www.google.com'
})

test('Using file config', async ({ page }) => {
    await page.goto('')
})

test.describe('Grouped tests', () => {
    test.use({
        locale: 'de-DE'
    })

    test('Using config from describe block', async ({ page }) => {
        await page.goto('')
    })
})


test('Setting options - wrong approach', async ({ page }) => {
    // this will fail: configuration must be set before a page is created   
    // test.use({
    //     locale: 'fr-FR'
    // })
    await page.goto('')
})

test('Setting options inside the test', async ({ browser }) => {
    const context = await browser.newContext({
        locale: 'hi-IN'
    })
    const page = await context.newPage()
    await page.goto('')
})