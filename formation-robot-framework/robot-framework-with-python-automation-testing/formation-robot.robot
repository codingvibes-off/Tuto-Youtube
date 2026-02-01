*** Settings ***
Resource    ressource-formation-robot.robot
Test Teardown    Close Browser
Library    String

*** Variables ***
${MORTAGE_PAYMENT_URL}    https://rahulshettyacademy.com/
${valid_username}    rahulshettyacademy
${valid_password}    Learning@830$3mK2
${invalid_username}    invalidUser
${invalid_password}    invalidPass

*** Keywords ***
Open Browser with de mortage payment url
    [Documentation]    Opens the browser and navigates to the mortage payment url
    Create Webdriver    Chrome
    Go To    https://rahulshettyacademy.com/loginpagePractise/

Fill The Login Form
    [Arguments]    ${username}    ${password}
    Wait Until Element Is Visible    css:input[name="username"]
    Clear Element Text    css:input[name="username"]
    Input Text            css:input[name="username"]    ${username}
    Clear Element Text    css:input[name="password"]
    Input Text            css:input[name="password"]    ${password}



wait until checks and display error message
    Wait Until Element Is Visible    css=.alert.alert-danger

verify error message is correct
    ${error_message}=    Get Text    css=.alert.alert-danger
    Should Be Equal As Strings  ${error_message}    Incorrect username/password.
    Element Text Should Be    css=.alert.alert-danger    Incorrect username/password.

verify card titles in the shop page
    ${card_titles}=    Get WebElements    css=.card-title a
    @{expectedList}=   Create List    iphone X   Samsung Note 8    Nokia Edge    Blackberry
    @{actualList}=    Create List
    FOR    ${element}    IN    @{card_titles}
        Log To Console    ${element.text}
        Append To List    ${actualList}    ${element.text}
    END
    Lists Should Be Equal    ${actualList}    ${expectedList}

Select the Card
    [Arguments]    ${card_name}
    ${card_titles}=    Get WebElements    css=.card-title a
    FOR    ${element}    IN    @{card_titles}
        IF    '${element.text}' == '${card_name}'
            Click Element    ${element}
        END
    END

Select the link of the child window
    Click Element    css:a.blinkingText
    Sleep    10s

Verify the user is Switched to Child Window
    Switch Window    NEW
    Element Text Should Be    xpath=//h1[normalize-space()='Documents request']    DOCUMENTS REQUEST

Grab the Email id in the Child Window
...     ${text}=     Get Text     css=.red
        #Première solution
        @{words}=    Split String    ${text}    at
        ${text_split}=    Get From List    ${words}    1
        ${expected_email}=    Split String    ${text_split}   
        ${text_split}=    Get From List    ${expected_email}    0
        [RETURN]    ${text_split}

Fill the login Details and select the user option
    [Arguments]    ${userType}
    Click Element    css:input[value="user"]
    Wait Until Element Is Visible    css:.modal-body
    Click Button    id:okayBtn
    Click Button    id:okayBtn
    Wait Until Element Is Not Visible    css:.modal-body
    Select From List By Value    css:select.form-control    ${userType}
    Select Checkbox   terms
    Checkbox Should Be Selected    terms

Switch to Parent window and enter the email    
    [Arguments]    ${expected_email_args}
    Switch Window    title=LoginPage Practise | Rahul Shetty Academy
    Fill The Login Form    ${expected_email_args}    ${valid_password}
    
*** Test Cases ***

Validate Child window Functionality
    Open Browser with de mortage payment url
    Select the link of the child window
    Verify the user is Switched to Child Window
    ${expected_email_args}=    Grab the Email id in the Child Window
    Switch to Parent window and enter the email    ${expected_email_args}
    Clear Element Text    css:input[name="password"]
    Input Text            css:input[name="password"]    ${valid_password}
    Click Button    signInBtn
    Sleep     3s
    verify error message is correct

