import { test, expect } from '@playwright/test';

test.beforeAll(async () => {
    await new Promise(r => setTimeout(r, 1000))
})

test.beforeEach(async({page})=>{
    await page.goto('')
})

test('Get by Role practice - heading', async ({ page }) => {


    const servicesHeading = page.getByRole('heading', {
        name: 'our services'
    })

    await expect(servicesHeading).toBeVisible()

    const servicesText = await servicesHeading.textContent()
    console.log(servicesText)
})

test('Get by Role - list', async ({ page }) => {

    const servicesList= page.getByRole('list')
    await expect(servicesList).toBeVisible()

    const serviceItems = await servicesList.getByRole('listitem').all();

    for(const item of serviceItems) {
        const itemText = await item.textContent()
        expect(itemText).toBeTruthy();
    }
})

test('Get by Role - Buttons', async ({ page }) => {

    const acceptCookiesButton = page.getByRole('button', {
        name: 'Accept',
        exact: true
    })
    const declineCookiesButton = page.getByRole('button', {
        name: 'decline'
    })
    await acceptCookiesButton.click()
    await expect(acceptCookiesButton).not.toBeVisible()
    await expect(declineCookiesButton).not.toBeVisible()
})

test('Get by Role - link', async ({ page }) => {
    await page.getByRole('button', { name: 'Accept' }).click();

    await page.getByRole('link', { name: 'Go to Feedback Form' }).click();
    const url = page.url()
    expect(url).toContain('FeedBack')
})