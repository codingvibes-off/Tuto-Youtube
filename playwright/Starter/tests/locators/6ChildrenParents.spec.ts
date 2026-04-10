import { test, expect } from '@playwright/test';


test('Child locators', async ({ page }) => {
    await page.goto('')

    const servicesList = page.getByRole('list')
    const serviceItems = await servicesList.getByRole('listitem').all();    
    expect(serviceItems.length).toBeGreaterThan(0)

    // with css locators:  
    const serviceItems2 = await page.locator('ul > li').all()
    for (const item of serviceItems2) {
        console.log(await item.textContent())
    }   
})

test('Parent locators', async ({ page }) => {
    await page.goto('')

    const acceptCookiesButton = page.getByTestId('accept-cookies')
    const cookieBanner = acceptCookiesButton.locator('..')

    await acceptCookiesButton.click();
    await expect(cookieBanner).not.toBeVisible()   
})

test('N-th element locator - buttons', async ({ page }) => {
    await page.goto('')
    
    const buttons = page.getByRole('button');
    const acceptCookieButton = buttons.first()
    const declineCookieButton = buttons.last()

    await acceptCookieButton.click()
    await expect(declineCookieButton).not.toBeVisible()
})


test('N-th element locator - list items', async ({ page }) => {
    await page.goto('')
    
    const listItems = page.getByRole('listitem');
    const thirdItem = listItems.nth(2)

    console.log(await thirdItem.textContent())
})