import { test, expect, Request } from '@playwright/test'

test.use({
    baseURL: ''
})

test('Monitor requests from inside a page - playwright.dev', async ({ page }) => {
    page.on('request', addRequest)

    const requests: Request[] = []

    function addRequest(request: Request) {
        requests.push(request)
    }

    await page.goto('https://playwright.dev/')

    requests.forEach((request)=>{
        console.log(`${request.resourceType()}: ${request.url()}`)  
    })
})

test.fail('Check for failed requests', async ({ page }) => {
    page.on('requestfailed', request=>{
        expect(request,
            `failed request to ${request.url()} with error ${request.failure()?.errorText}`
        ).toBeUndefined()
    })
    await page.goto('http://localhost:5000/Events.html')
    const requestButton = page.getByRole('button', {
        name: 'Call wrong server'
    })
    await requestButton.click();
    await page.waitForTimeout(500)
})