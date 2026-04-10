import { test } from '@playwright/test'

test.beforeAll(()=>{
    console.log('Before all action')
})

test.beforeEach(()=>{
    console.log('Before each action')
})

test('Test 1', ()=>{
    console.log('Running test 1')
})

test('Test 2', ()=>{
    console.log('Running test 2')
})

test.afterEach(()=>{
    console.log('After each action')
})

test.afterAll(()=>{
    console.log('After all action')
})