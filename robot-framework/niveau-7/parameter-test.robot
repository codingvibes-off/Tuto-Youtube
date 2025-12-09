*** Settings ***
*** Variables ***
${longueur}    0
@{liste}    4    8    15    16    23    42
*** Test Cases ***
Parameter Test
    ${longueur}=    Get Length    ${liste}
    Log    La longueur de la liste est : ${longueur}
    FOR    ${index}    IN RANGE    0    ${longueur}
        IF    ${index} > ${longueur}
            Exit For Loop
        END
        Additionner Element    ${liste}[${index}]    ${index}
    END

*** Keywords ***
Additionner Element
    [Arguments]    ${element}    ${somme}
        ${somme}=   Evaluate    ${element} + ${somme}
    RETURN    ${somme}

