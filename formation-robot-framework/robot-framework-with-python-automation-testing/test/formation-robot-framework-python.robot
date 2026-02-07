*** Settings ***
Resource    resource-formation-robot.robot
Resource    ../POM/LandingPage.robot
Resource    ../POM/GenericPage.robot
Resource    ../POM/DocumentsRequestPage.robot
Resource    ../POM/ShopPage.robot
Resource    ../customLibrairies/Shop.py

Test Teardown    Close Browser
Library    String
*** Variables ***
${MORTAGE_PAYMENT_URL}    https://rahulshettyacademy.com/
${valid_username}    rahulshettyacademy
${valid_password}    Learning@830$3mK2
${invalid_username}    invalidUser
${invalid_password}    invalidPass

*** Keywords ***

*** Test Cases ***

Validate Invalid Login Shows Error Message
    Open Browser with de mortage payment url
    LandingPage.Fill The Login Form    ${invalid_username}    ${invalid_password}
    Click Button    signInBtn
    Sleep     3s
    GenericPage.wait until checks and display error message
    GenericPage.verify error message is correct

Validate User Can Select User Type
    Open Browser with de mortage payment url
    LandingPage.Fill The Login Form    ${valid_username}    ${valid_password}
    LandingPage.Fill the login Details and select the user option    consult
    Click Button    signInBtn
    Sleep     3s

Validate User Can Select User Type
    Open Browser with de mortage payment url
    LandingPage.Fill The Login Form    ${valid_username}    ${valid_password}
    LandingPage.Fill the login Details and select the user option    teach
    Click Button    signInBtn
    Sleep     3s

Validate User Can Select User Type
    Open Browser with de mortage payment url
    LandingPage.Fill The Login Form    ${valid_username}    ${valid_password}
    LandingPage.Fill the login Details and select the user option    stud
    Click Button    signInBtn
    Sleep     3s
 
Validate Card Titles In Shop Page
    Open Browser with de mortage payment url
    LandingPage.Fill The Login Form    ${valid_username}    ${valid_password}
    Click Button    signInBtn
    Sleep     3s
    ShopPage.verify card titles in the shop page

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




