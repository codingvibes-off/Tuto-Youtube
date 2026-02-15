*** Settings ***

*** Variables ***

*** Keywords ***

Fill The Login Form
    [Arguments]    ${username}    ${password}
    Wait Until Element Is Visible    css:input[name="username"]
    Input Text            css:input[name="username"]    ${username}
    Input Text            css:input[name="password"]    ${password}
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
Validate Unsuccessful Login
    [Arguments]    ${username}    ${password}
    Open Browser with mortgage payment url
    Fill The Login Form    ${username}    ${password}
    Click Button    signInBtn
    Sleep     3s
    verify error message is correct
