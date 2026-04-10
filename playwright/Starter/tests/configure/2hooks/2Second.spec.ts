import { test } from '@playwright/test'

// use with caution, tests should be independent
test.beforeAll(()=>{
    console.log('Setting up Data base connection')
})

// test.beforeEach(()=>{
//     console.log('')
// })

test('Test 1', ()=>{
    console.log('Add something to the DB 1')
})

test('Test 2', ()=>{
    console.log('Add something to the DB 2')
})

test.afterEach(()=>{
    console.log('Clean DB')
})

test.afterAll(()=>{
    console.log('Close DB connection')
})