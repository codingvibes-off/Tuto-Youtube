*** Settings ***
*** Variables ***

*** Keywords ***

Confirmation Checkout Product and select the terms
    [Arguments]    ${country_name}
    Input Text    id=country    ${country_name}
    Wait until element passed is located on Page    //a[text()='${country_name}']
    Sleep    3s
    Click Element    //a[text()='${country_name}']
    Sleep    3s
    Click Element    css:.checkbox label
    
Purchase the product and Confirm the Purchase
    Click button    css:.btn-success
    Page Should Contain    Success!
    