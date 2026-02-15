*** Settings ***
Resource    resource-formation-robot.robot
Test Teardown    Close Browser
Library    String
Library    ../customLibrairies/Shop.py
Resource    ../POM/LandingPage.robot
Resource    ../POM/GenericPage.robot
Resource    ../POM/ShopPage.robot
Resource    ../POM/CheckoutPage.robot
Resource    ../POM/ConfirmationPage.robot
*** Variables ***
${MORTAGE_PAYMENT_URL}    https://rahulshettyacademy.com/
${valid_username}    rahulshettyacademy
${valid_password}    Learning@830$3mK2
${invalid_username}    invalidUser
${invalid_password}    invalidPass
@{card_titles}=    Nokia Edge    Blackberry    iphone X   Samsung Note 8    Nokia Edge    Blackberry

*** Keywords ***

*** Test Cases ***
Test end to end Checkout Page
    [Tags]    SMOKE
    Open Browser     https://rahulshettyacademy.com/loginpagePractise/    chrome    
    LandingPage.Fill The Login Form    ${valid_username}    ${valid_password}
    Click Button    signInBtn
    Sleep     3s
    ShopPage.verify card titles in the shop page
    Add Items To Card And Checkout    ${card_titles}
    CheckoutPage.Verify items in the checkout Page and proceed
    ConfirmationPage.Confirmation Checkout Product and select the terms    India
    ConfirmationPage.Purchase the product and Confirm the Purchase


