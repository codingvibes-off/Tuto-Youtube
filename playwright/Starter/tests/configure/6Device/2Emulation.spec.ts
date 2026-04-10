import { test, devices } from '@playwright/test'

const iphone = devices['iPhone 13 Pro']

const latestIphoneSize = {
    width: 1024,
    height: 600
}

test.use({
    baseURL: '',
    ...iphone,
    viewport: latestIphoneSize
})

test('Observe window', async ({ page }) => {
    await page.goto('https://www.google.com/')
    await page.pause()
})