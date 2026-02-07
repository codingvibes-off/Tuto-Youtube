*** Settings ***
*** Variables ***
*** Keywords ***

Verify items in the checkout Page and proceed
    Click Element    xpath=//a[contains(@class,'btn-primary')]
    Click Element    css:.btn-success

