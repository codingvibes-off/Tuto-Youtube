*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}         https://rahulshettyacademy.com/loginpagePractise/
${username}    rahulshettyacademy
${password}    Learning@830$3mK2

*** Keywords ***
Fill login Form
    [Arguments]    ${username}    ${password}
    Input Text    css:input[name="username"]    ${username}
    Input Text    css:input[name="password"]    ${password}
    Click Element    id:signInBtn

*** Test Cases ***
Test Load
    Open Browser    ${URL}    chrome
    Fill login Form    ${username}    ${password}
    Close browser