import { test } from '@playwright/test'


test.use({
    baseURL: '',
    defaultBrowserType: 'firefox',
    viewport: {
        width: 1000,
        height: 600
    }
})

test('Observe window', async ({ page }) => {
    await page.goto('https://www.google.com/')
})