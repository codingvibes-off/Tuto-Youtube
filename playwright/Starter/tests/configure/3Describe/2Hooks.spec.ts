import { test } from '@playwright/test'

test.beforeEach(()=>{
    console.log('Called before every test in this file')
})

test.describe('Form is completed correctly', () => {

    test.beforeEach(()=>{
        console.log('Called before tests inside this describe block')
    })

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