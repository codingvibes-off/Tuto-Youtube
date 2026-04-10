import { test } from '@playwright/test'

test.use({
    baseURL: '',
    geolocation: {
        latitude: -15.79374, 
        longitude: -47.88477
    },
    permissions: ['geolocation']
})

test('Observe location', async ({ page }) => {
    await page.goto('https://www.openstreetmap.org/')

    await page.getByRole('button', { name: 'Show My Location' }).click();    

})
