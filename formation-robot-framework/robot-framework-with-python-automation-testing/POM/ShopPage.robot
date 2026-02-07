*** Settings ***
Library    ../customLibrairies/Shop.py

*** Keywords ***
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
