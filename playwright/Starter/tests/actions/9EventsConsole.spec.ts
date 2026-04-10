import { test, expect } from '@playwright/test'

test.fail('check for errors inside the console', async ({ page }) => {

    page.on('console', message =>{
        expect.soft(message.type(),
            `Received error log: ${message.text()}`
        ).not.toEqual('error')
    })

    await page.goto('Events.html')

    const requestButton = page.getByRole('button', {
        name: 'Call wrong server'
    })
    await requestButton.click();
    await page.waitForTimeout(500)
})