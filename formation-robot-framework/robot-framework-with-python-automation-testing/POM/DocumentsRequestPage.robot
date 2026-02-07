*** Settings ***
*** Variables ***
*** Keywords ***
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
        RETURN    ${text_split}
Switch to Parent window and enter the email    
    [Arguments]    ${expected_email_args}
    Switch Window    title=LoginPage Practise | Rahul Shetty Academy
    LandingPage.Fill The Login Form    ${expected_email_args}    ${valid_password}
