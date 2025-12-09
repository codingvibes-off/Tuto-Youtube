*** Settings ***
Resource    keywords.resource

*** Keywords ***
Setup Database
    [Arguments]    ${product_id}    ${name}    ${price}    ${stock}
    ${json}=    Load JSON From File    ${DB_PATH}
    ${database}=     Create List
    ${new_product}=    Create Dictionary    id=${product_id}    name=${name}    price=${price}    stock=${stock}
    Append To List    ${database}    ${new_product}
    Dump JSON To File    ${DB_PATH}     ${database}
    RETURN    ${database}


