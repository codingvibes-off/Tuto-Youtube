
*** Settings ***
Library    SeleniumLibrary


*** Keywords ***
Open Example Website
    [Arguments]     ${URL}    
    Open Browser    ${URL}    chrome