*** Settings ***
Library    Collections
Library    JSONLibrary
Library    OperatingSystem

*** Variables ***
${total}=    0
${max}=    0

*** Keywords ***
Load Products 
    [Arguments]    ${path}
    ${products}=    Load Json From File    ${path}
    RETURN    ${products}
    
Add Product
    [Arguments]    ${product}    ${path}
    ${products}=    Load Products    ${path}
    Append To List    ${product}
    Dump Json To File    ${path}    ${products}
    RETURN    ${product}
    
Filter Products By Name
    [Arguments]    ${product_name}    ${products}
    ${product_search_box}=    Create List
    FOR    ${product}    IN    @{products}
        ${search_product}=    Get From Dictionary    ${product}    nom
        IF    '${search_product}' == '${product_name}'
            Append To List    ${product_search_box}    ${product}
        END
    END
    RETURN    ${product_search_box}

Keyword Calculate Total Stock Value
    [Arguments]    ${products}
    ${total}=    Set Variable    0
    FOR    ${product}    IN    @{products}
        ${price_str}=    Get From Dictionary    ${product}    prix
        ${price}=     Convert To Integer    ${price_str}
        ${stock_str}=    Get From Dictionary    ${product}    stock
        ${stock}=     Convert To Integer    ${stock_str}
        ${total}=    Evaluate    ${total}+int(${price})*int(${stock})
    END
    RETURN    ${total}

Keyword Find Most Expensive Product
    [Arguments]    ${products}  
    ${max}=    Evaluate    max([int(product['prix']) for product in ${products}])
    RETURN    ${max}


