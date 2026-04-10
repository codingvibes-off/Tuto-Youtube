import { test } from '@playwright/test'

test('With all fields',{
    tag: '@Field'
}, () => {
    console.log('Just a test ...')
})

test('With minimal fields',{
    tag: ['@Field', '@Minimal']
}, () => {
    console.log('Just a test ...')
})

test('Fields are completed', () => {

})

test.describe('Errors while saving data',{
    tag: '@Error'
}, () => {
    test('Network error', () => {

    })
    test('Invalid data', () => {

    })
    test('Unknown error', () => {

    })
})