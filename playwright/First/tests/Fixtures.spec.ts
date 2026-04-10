import { test, chromium, expect } from '@playwright/test'

test('Intro heading has correct text', async ({page}) => {
    await page.goto('https://playwright.dev');
    await page.getByRole('banner').click();
    await page.getByRole('link', { name: 'Docs' }).click();
    const heading =  page.getByRole('heading', { name: 'IntroductionDirect link to' })
    await expect(heading).toHaveText('Introduction')
})
test('Close cookies', async ({ page }) => {
    await page.goto('https://www.udemy.com/');
    await page.getByRole('button', { name: 'OK', exact: true }).click();
})

test('Is the cookie banner still present?', async ({ page }) => {
    await page.goto('https://www.udemy.com/');

    await page.pause()
})

test('Browser fixture', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto('https://www.udemy.com/');
})

test('Create page manually', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext();
    const page = await context.newPage()

    await page.goto('https://www.udemy.com/');
})


