*** Variables ***
${a}    10
${b}    0

*** Test Cases ***
Dvision par zero
    Run Keyword And Expect Error    ZeroDivisionError    test    ${a}    ${b}
*** Keywords ***
test
    [Arguments]    ${a}   ${b}
    ${result}=    Evaluate    ${a} / ${b}
    RETURN    ${result}