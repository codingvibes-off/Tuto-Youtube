*** Settings ***
Library    SeleniumLibrary

*** Variables ***
@{LISTE}=    Alice    Bob    Charlie    David    Eve
${FIRST_NAME}=    Alice
*** Keywords ***
Greet User
    [Arguments]    ${item}
    FOR    ${item}    IN    @{LISTE}
        Log    ${item}
    END

*** Test Cases ***
Greet User - Simple Loop
    Greet User     item=${FIRST_NAME}




