*** Settings ***

*** Variables ***

*** Keywords ***
Add Numbers
    [Arguments]    ${A}    ${B}
    ${SUM}=    Evaluate    ${A} + ${B}
    IF    ${SUM} > 10
        Log    The sum is greater than 10: ${SUM}
    ELSE
        Log    The sum is 10 or less: ${SUM}
        
    END

*** Test Cases ***
first_operation
    Add Numbers    5    7

Seccond_operation
    Add Numbers    5    7













