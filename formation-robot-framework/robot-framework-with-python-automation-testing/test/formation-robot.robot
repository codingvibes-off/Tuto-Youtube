*** Settings ***
Resource    resource-formation-robot.robot
Resource    ../POM/LandingPage.robot
Resource    ../POM/GenericPage.robot
Resource    ../POM/ShopPage.robot
Resource    ../POM/DocumentsRequestPage.robot
Test Teardown    Close Browser

Library    String
Library    ../customLibrairies/Shop.py


*** Variables ***
${MORTAGE_PAYMENT_URL}    https://rahulshettyacademy.com/
${valid_username}    rahulshettyacademy
${valid_password}    Learning@830$3mK2
${invalid_username}    invalidUser
${invalid_password}    invalidPass

*** Keywords ***
*** Test Cases ***

Validate Child window Functionality
    Open Browser with de mortage payment url
    DocumentsRequestPage.Select the link of the child window
    DocumentsRequestPage.Verify the user is Switched to Child Window
    ${expected_email_args}=    Grab the Email id in the Child Window
    DocumentsRequestPage.Switch to Parent window and enter the email    ${expected_email_args}
    Clear Element Text    css:input[name="password"]
    Input Text            css:input[name="password"]    ${valid_password}
    Click Button    signInBtn
    Sleep     3s
    GenericPage.verify error message is correct

