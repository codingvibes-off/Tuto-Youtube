*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
${BASE_URL}    http://localhost:3000

*** Keywords ***
Prepare Cart With Product
    [Arguments]    ${userId}
    ${cartPayload}=    Create Dictionary    userId=${userId}    productId=p1    qty=1
    POST    ${BASE_URL}/cart/add    json=${cartPayload}
    
Call Checkout
    [Arguments]    ${payload}
    ${response}=    POST    ${BASE_URL}/checkout    json=${payload}
    [Return]    ${response}


*** Test Cases ***
Checkout Success
    ${userId}=    Set Variable    user1
    Prepare Cart With Product    ${userId}

    ${payload}=    Create Dictionary    userId=${userId}
    ${resp}=    Call Checkout    ${payload}

    Should Be Equal As Integers    ${resp.status_code}    200
    Should Be Equal    ${resp.json()['status']}    PAID

















































