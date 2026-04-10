import { test, expect } from '@playwright/test'

test.fail('Failing test - 1', async()=>{
    expect(false).toBeTruthy()
})

function getFlightData(flightId: string){
    throw new Error('Not implemented yet')
    // return {
    //     data: flightId
    // }
}

test.fail('GetFlightData test', ()=>{
    const flightData = getFlightData('1')
    expect(flightData).toBeDefined();
})

