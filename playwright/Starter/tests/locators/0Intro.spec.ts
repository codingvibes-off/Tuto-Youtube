import { test, expect } from '@playwright/test';

test('Auto-waiting feature', async ({ page }) => {
    await page.goto('Hello.html')

    const button = page.locator('button')

    await button.click()

    const label = page.locator('#myLabel')

    await expect(label).toBeVisible()
});

test('Auto-waiting feature - one liners', async ({ page }) => {
    await page.goto('Hello.html')

    await page.locator('button').click()

    await expect(page.locator('#myLabel')).toBeVisible()
});