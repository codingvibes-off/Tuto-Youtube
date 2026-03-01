*** Settings ***
Resource    resource-formation-robot.robot
Library    String
Librayr    Collections
Library    RequestsLibrary
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
${browser_name}=    chrome

*** Keywords ***

*** Test Cases ***
Add book into Library
    [Tags]    SMOKE_API
    &{req_body}=    Create Dictionary   name=Robotframeworkeeee    isbn=21093829dd830128    aisle=219333812398    auth=rahushdddetty
    ${response}=    POST    ${MORTAGE_PAYMENT_URL}Library/Addbook.php    json=${req_body}    expected_status=200
    Log    ${response.text}





