*** Settings ***
Library    String
Library    SeleniumLibrary
*** Variables ***
${URL}    https://rahulshettyacademy.com/loginpagePractise/
*** Keywords ***
Open Browser with mortgage payment url
    ${options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Call Method    ${options}    add_argument    --headless=new
    Call Method    ${options}    add_argument    --no-sandbox
    Call Method    ${options}    add_argument    --disable-dev-shm-usage
    Create Webdriver    Chrome    options=${options}
    Go To    ${URL}

wait until checks and display error message
    Wait Until Element Is Visible    css=.alert.alert-danger
verify error message is correct
    ${error_message}=    Get Text    css=.alert.alert-danger
    Should Be Equal As Strings  ${error_message}    Incorrect username/password.
    Element Text Should Be    css=.alert.alert-danger    Incorrect username/password.
Wait until element passed is located on Page
    [Arguments]    ${page_locator}
    Wait Until Element Is Visible    ${page_locator}    timeout=10s