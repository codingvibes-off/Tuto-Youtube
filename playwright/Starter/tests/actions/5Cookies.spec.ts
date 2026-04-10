import { test, expect } from '@playwright/test';

test('Handle cookies inside test', async ({ page }) => {
    await page.goto('')

    await page.context().addCookies([{
        url: page.url(),
        name: 'cookieConsent',
        value: 'accepted'
    }])

    await page.reload()

    const cookieBanner = page.locator('#cookie-banner')
    await expect(cookieBanner).not.toBeVisible()

})