*** Settings ***
Library    String
Library    SeleniumLibrary
*** Variables ***

*** Keywords ***
Open Browser with de mortage payment url
    [Documentation]    Opens the browser and navigates to the mortage payment url
    Create Webdriver    Chrome
    Go To    https://rahulshettyacademy.com/loginpagePractise/
wait until checks and display error message
    Wait Until Element Is Visible    css=.alert.alert-danger
verify error message is correct
    ${error_message}=    Get Text    css=.alert.alert-danger
    Should Be Equal As Strings  ${error_message}    Incorrect username/password.
    Element Text Should Be    css=.alert.alert-danger    Incorrect username/password.
Wait until element passed is located on Page
    [Arguments]    ${page_locator}
    Wait Until Element Is Visible    ${page_locator}    timeout=10s