import { test } from '@playwright/test'

test.describe.skip('This test block will be skipped', () => {

    test('With all fields', () => {

    })

    test('With minimal fields', () => {

    })

    test('Fields are completed', () => {

    })
})

test.describe('Complete form', () => {

    test('With all fields', () => {

    })

    test('With minimal fields', () => {

    })

    test('Fields are completed', () => {

    })
})

test.describe('Save data', () => {
    
    test('Data is saved', () => {

    })

    test('Data is loaded', () => {

    })

    test('Data is stored to memory', () => {

    })

    test.describe('Errors while saving data', ()=>{
        test('Network error', ()=>{

        })
        test('Invalid data', ()=>{
            
        })
        test('Unknown error', ()=>{
            
        })        
    })
})