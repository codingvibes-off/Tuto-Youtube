***Settings***
Library    SeleniumLibrary

*** Variables ***
${parent}=    //div[contains(@class,'theme-doc-markdown markdown')]
*** Keywords ***
Go to playwright site
    Open Browser    https://playwright.dev/python/docs/intro    Chrome
*** Test Cases ***

Go To docs
    [Tags]    DOCS    AllTests
    Go to playwright site
    
    #Section Introduction 
    Click Element    xpath=//a[contains(text(),'Docs')]
    
    Should Contain    xpath=${parent}//h1[contains(text(),'Installation')]    Installation
    Should Contain    xpath=${parent}//h2[contains(text(),'Introduction')]    Introduction
    ${Os}=    Get Text    xpath=${parent}//p[1]
    Should Contain    ${Os}    macOS
    Should Contain    ${Os}    Linux
    Click Element    xpath=//a[contains(text(),'Playwright library')]
    Wait Until Element Is Visible    xpath=//h1[contains(text(),'Getting started - Library')]    timeout=10s
    Click Element    xpath=//span[contains(text(),'Installation')]
    
    #Getting Started Section
    Wait Until Element Is Visible    xpath=//li[contains(@class,'menu__list')]//span[contains(text(),'Installation')]    timeout=10s
    Click Element    //li[contains(@class,'menu__list')]//span[contains(text(),'Installation')]
    
    Click Element    xpath=//a[contains(text(),'How to install Playwright Pytest')]
    Click Element    xpath=//span[contains(text(),'Installation')]
    Click Element    xpath=//a[contains(text(),'How to run the example test')]
    Click Element    xpath=//span[contains(text(),'Installation')]
    #Section Installing Playwright
    Should Contain    xpath=${parent}//h1[contains(text(),'Installing Playwright Pytest')]    Installing Playwright Pytest
    Click Element    xpath=${parent}//a[contains(text(),'Playwright Pytest plugin')]

    Click Element    xpath=//span[contains(text(),'Installation')]
    Wait Until Element Is Visible    xpath=${parent}//a[contains(text(),'Pytest plugin')]    timeout=10s
    Click Element    xpath=${parent}//a[contains(text(),'Pytest plugin')]

