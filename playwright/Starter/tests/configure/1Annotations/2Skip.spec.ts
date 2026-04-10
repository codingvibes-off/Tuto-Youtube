import { test, expect } from '@playwright/test'

test.skip('Testing for an unfinished feature', () => {

})

test.fixme('Fix faulty test', ()=>{
    console.log('This test will not be run')
})

test('Mobile features', async ({ page, isMobile }) => {
    test.skip(isMobile == false, 'This test is for mobile browsers only')
})