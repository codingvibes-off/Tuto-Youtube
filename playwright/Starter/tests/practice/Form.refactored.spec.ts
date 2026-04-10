import { test, expect, Page } from '@playwright/test'

const someName = 'Alex'
const someEmail = 'alex@email.com'
const someComment = 'Awesome!'
const someHighlights = 'Dance session'

test('Form is submitted with required fields', async ({ page }) => {
    let formSubmitted = false

    page.on('dialog', async dialog => {
        await dialog.accept()
        formSubmitted = true
    })

    await page.goto('FeedBackForm.html')

    await completeFields(page)

    await clickButton(page, 'Submit')

    expect(formSubmitted).toBeTruthy()

})

test('Form is submitted with required fields - form is cleared after submit', async ({ page }) => {
    let formSubmitted = false

    page.on('dialog',async dialog => {
        await dialog.accept()
        formSubmitted = true
    })

    await page.goto('FeedBackForm.html')

    await completeFields(page)

    await clickButton(page, 'Submit')

    expect(formSubmitted).toBeTruthy()

    // check if form is cleared:
    await checkIfItemsEmpty(page);

})

test('Form is NOT submitted without minimal fields', async ({ page }) => {
    let formSubmitted = false

    page.on('dialog', dialog => {
        dialog.accept()
        formSubmitted = true
    })

    await page.goto('FeedBackForm.html')

    await completeFields(page)

    // clear required field:
    await page.getByLabel('name').clear()

    await clickButton(page, 'Submit')

    expect(formSubmitted).toBeFalsy()

})

test('Form is NOT submitted if user selects NO on dialog', async ({ page }) => {
    page.on('dialog', dialog => {
        dialog.dismiss()
    })

    await page.goto('FeedBackForm.html')

    await completeFields(page)

    await clickButton(page, 'Submit')

    // check if form is NOT cleared:
    await checkIfItemsNotEmpty(page)
})

// clear progress tests:
test('Form is completed - clear button clears inputs', async ({ page }) => {
    page.on('dialog',async dialog => {
        await dialog.accept()
    })

    await page.goto('FeedBackForm.html')

    await completeFields(page)

    const checkBox = page.getByRole('checkbox', { name: 'I agree' })
    await checkBox.check()

    await clickButton(page, 'Clear')

    // check if form is cleared:
    await checkIfItemsEmpty(page)

})

test('Form is completed - clear button clears memory', async ({ page }) => {
    page.on('dialog', dialog => {
        dialog.accept()
    })

    await page.goto('FeedBackForm.html')

    await completeFields(page)

    await clickButton(page, 'Save')

    await clickButton(page, 'Clear')

    await page.reload()

    // check if form is cleared:
    await checkIfItemsEmpty(page)

})

test('Form is completed - clear button does not clear inputs if dialog rejected', async ({ page }) => {
    page.on('dialog', dialog => {
        dialog.dismiss()
    })

    await page.goto('FeedBackForm.html')

    await completeFields(page)

    await clickButton(page, 'Clear')

    // check if form is NOT cleared:
    await checkIfItemsNotEmpty(page)

})

test('Form is completed - save data button saves data', async ({ page }) => {
    page.on('dialog', dialog => {
        dialog.accept()
    })

    await page.goto('FeedBackForm.html')

    await completeFields(page)

    await clickButton(page, 'Save')

    await page.reload();

    // check if form is NOT cleared:
    await checkIfItemsNotEmpty(page)

})

async function clickButton(page: Page, buttonName: 'Submit' | 'Save' | 'Clear') {
    await page.getByRole('button', {
        name: buttonName
    }).click()
}

async function completeFields(page: Page) {
    const nameLabel = page.getByLabel('name')
    await nameLabel.fill(someName)

    const emailLabel = page.getByLabel('email')
    await emailLabel.fill(someEmail)

    const commentLabel = page.getByLabel('comment')
    await commentLabel.fill(someComment)

    const highlightsLabel = page.getByLabel('highlights')
    await highlightsLabel.fill(someHighlights)

    const checkBox = page.getByRole('checkbox', { name: 'I agree' })
    await checkBox.check()

}

async function checkIfItemsNotEmpty(page: Page) {

    const nameLabel = page.getByLabel('name')

    const emailLabel = page.getByLabel('email')

    const commentLabel = page.getByLabel('comment')

    const highlightsLabel = page.getByLabel('highlights')

    const checkBox = page.getByRole('checkbox', { name: 'I agree' })

    await expect(nameLabel).toHaveValue(someName)
    await expect(emailLabel).toHaveValue(someEmail)
    await expect(commentLabel).toHaveValue(someComment)
    await expect(highlightsLabel).toHaveValue(someHighlights)
    await expect(checkBox).toBeChecked()
}

async function checkIfItemsEmpty(page: Page) {

    const nameLabel = page.getByLabel('name')

    const emailLabel = page.getByLabel('email')

    const commentLabel = page.getByLabel('comment')

    const highlightsLabel = page.getByLabel('highlights')

    const checkBox = page.getByRole('checkbox', { name: 'I agree' })

    await expect(nameLabel).toBeEmpty()
    await expect(emailLabel).toBeEmpty()
    await expect(commentLabel).toBeEmpty()
    await expect(highlightsLabel).toBeEmpty()
    await expect(checkBox).not.toBeChecked()

}