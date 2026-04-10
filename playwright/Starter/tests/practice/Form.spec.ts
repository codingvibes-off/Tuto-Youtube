import { test, expect } from '@playwright/test'

test('Form is submitted with required fields', async ({ page }) => {
    let formSubmitted = false

    page.on('dialog', dialog => {
        dialog.accept()
        formSubmitted = true
    })

    await page.goto('FeedBackForm.html')

    const nameLabel = page.getByLabel('name')
    await nameLabel.fill('Alex')

    const emailLabel = page.getByLabel('email')
    await emailLabel.fill('alex@email.com')

    const commentLabel = page.getByLabel('comment')
    await commentLabel.fill('Awesome!')

    const checkBox = page.getByRole('checkbox', { name: 'I agree' })
    await checkBox.check()

    await page.getByRole('button', {
        name: 'Submit'
    }).click()

    expect(formSubmitted).toBeTruthy()    
    
})

test('Form is submitted with required fields - form is cleared after submit', async ({ page }) => {
    let formSubmitted = false

    page.on('dialog', dialog => {
        dialog.accept()
        formSubmitted = true
    })

    await page.goto('FeedBackForm.html')

    const nameLabel = page.getByLabel('name')
    await nameLabel.fill('Alex')

    const emailLabel = page.getByLabel('email')
    await emailLabel.fill('alex@email.com')

    const commentLabel = page.getByLabel('comment')
    await commentLabel.fill('Awesome!')

    const checkBox = page.getByRole('checkbox', { name: 'I agree' })
    await checkBox.check()

    await page.getByRole('button', {
        name: 'Submit'
    }).click()

    expect(formSubmitted).toBeTruthy() 

    // check if form is cleared:
    await expect(nameLabel).toBeEmpty()
    await expect(emailLabel).toBeEmpty()
    await expect(commentLabel).toBeEmpty()
    await expect(checkBox).not.toBeChecked()

})

test('Form is NOT submitted without minimal fields', async ({ page }) => {
    let formSubmitted = false

    page.on('dialog', dialog => {
        dialog.accept()
        formSubmitted = true
    })

    await page.goto('FeedBackForm.html')

    const nameLabel = page.getByLabel('name')
    await nameLabel.fill('Alex')

    const commentLabel = page.getByLabel('comment')
    await commentLabel.fill('Awesome!')

    const checkBox = page.getByRole('checkbox', { name: 'I agree' })
    await checkBox.check()

    await page.getByRole('button', {
        name: 'Submit'
    }).click()

    expect(formSubmitted).toBeFalsy() 

})

test('Form is NOT submitted if user selects NO on dialog', async ({ page }) => {
    page.on('dialog', dialog => {
        dialog.dismiss()
    })

    await page.goto('FeedBackForm.html')

    const nameLabel = page.getByLabel('name')
    await nameLabel.fill('Alex')

    const emailLabel = page.getByLabel('email')
    await emailLabel.fill('alex@email.com')

    const commentLabel = page.getByLabel('comment')
    await commentLabel.fill('Awesome!')

    const checkBox = page.getByRole('checkbox', { name: 'I agree' })
    await checkBox.check()

    await page.getByRole('button', {
        name: 'Submit'
    }).click()

    // check if form is NOT cleared:
    await expect(nameLabel).toHaveValue('Alex') // DO not use toHaveText, it's not working
    await expect(emailLabel).toHaveValue('alex@email.com')
    await expect(commentLabel).toHaveValue('Awesome!')
    await expect(checkBox).toBeChecked()
})

// clear progress tests:
test('Form is completed - clear button clears inputs', async ({ page }) => {
    page.on('dialog', dialog => {
        dialog.accept()
    })

    await page.goto('FeedBackForm.html')

    const nameLabel = page.getByLabel('name')
    await nameLabel.fill('Alex')

    const emailLabel = page.getByLabel('email')
    await emailLabel.fill('alex@email.com')

    const commentLabel = page.getByLabel('comment')
    await commentLabel.fill('Awesome!')

    const highlightsLabel = page.getByLabel('highlights')
    await commentLabel.fill('Dance session')

    const checkBox = page.getByRole('checkbox', { name: 'I agree' })
    await checkBox.check()

    await page.getByRole('button', {
        name: 'Clear'
    }).click()

    // check if form is cleared:
    await expect(nameLabel).toBeEmpty()
    await expect(emailLabel).toBeEmpty()
    await expect(commentLabel).toBeEmpty()
    await expect(highlightsLabel).toBeEmpty()
    await expect(checkBox).not.toBeChecked()

})

test('Form is completed - clear button clears memory', async ({ page }) => {
    page.on('dialog', dialog => {
        dialog.accept()
    })

    await page.goto('FeedBackForm.html')

    const nameLabel = page.getByLabel('name')
    await nameLabel.fill('Alex')

    const emailLabel = page.getByLabel('email')
    await emailLabel.fill('alex@email.com')

    const commentLabel = page.getByLabel('comment')
    await commentLabel.fill('Awesome!')

    const highlightsLabel = page.getByLabel('highlights')
    await highlightsLabel.fill('Dance session')

    const checkBox = page.getByRole('checkbox', { name: 'I agree' })
    await checkBox.check()

    await page.getByRole('button', {
        name: 'Save'
    }).click()

    await page.getByRole('button', {
        name: 'Clear'
    }).click()

    await page.reload()

    // check if form is cleared:
    await expect(nameLabel).toBeEmpty()
    await expect(emailLabel).toBeEmpty()
    await expect(commentLabel).toBeEmpty()
    await expect(highlightsLabel).toBeEmpty()
    await expect(checkBox).not.toBeChecked()

})

test('Form is completed - clear button does not clear inputs if dialog rejected', async ({ page }) => {
    page.on('dialog', dialog => {
        dialog.dismiss()
    })

    await page.goto('FeedBackForm.html')

    const nameLabel = page.getByLabel('name')
    await nameLabel.fill('Alex')

    const emailLabel = page.getByLabel('email')
    await emailLabel.fill('alex@email.com')

    const commentLabel = page.getByLabel('comment')
    await commentLabel.fill('Awesome!')

    const highlightsLabel = page.getByLabel('highlights')
    await highlightsLabel.fill('Dance session')

    const checkBox = page.getByRole('checkbox', { name: 'I agree' })
    await checkBox.check()

    await page.getByRole('button', {
        name: 'Clear'
    }).click()

    // check if form is NOT cleared:
    await expect(nameLabel).toHaveValue('Alex')
    await expect(emailLabel).toHaveValue('alex@email.com')
    await expect(commentLabel).toHaveValue('Awesome!')
    await expect(checkBox).toBeChecked()

})

test('Form is completed - save data button saves data', async ({ page }) => {
    page.on('dialog', dialog => {
        dialog.accept()
    })

    await page.goto('FeedBackForm.html')

    const nameLabel = page.getByLabel('name')
    await nameLabel.fill('Alex')

    const emailLabel = page.getByLabel('email')
    await emailLabel.fill('alex@email.com')

    const commentLabel = page.getByLabel('comment')
    await commentLabel.fill('Awesome!')

    const highlightsLabel = page.getByLabel('highlights')
    await highlightsLabel.fill('Dance session')

    const checkBox = page.getByRole('checkbox', { name: 'I agree' })
    await checkBox.check()

    await page.getByRole('button', {
        name: 'Save'
    }).click()

    await page.reload();

    // check if form is NOT cleared:
    await expect(nameLabel).toHaveValue('Alex')
    await expect(emailLabel).toHaveValue('alex@email.com')
    await expect(commentLabel).toHaveValue('Awesome!')
    await expect(checkBox).toBeChecked()

})