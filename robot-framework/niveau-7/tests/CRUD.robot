*** Settings ***
Resource    ../keywords/keywords.robot

*** Variables ***
${path}    ${CURDIR}/../data/products.json

*** Test Cases ***
Load Products From File
    ${products}=    Load Products    ${path}
    Should Be True    ${products} != None

Add Product And Load Products From File
    ${new_product}=    Create Dictionary    nom=Canape    prix=300    stock=2
    ${products}=    Add Product    ${new_product}    ${path}
    ${found}=    Set Variable    False
    FOR    ${product}    IN    ${products}
        IF    '${product.nom}' == 'Canape'
            ${found}=    Set Variable    True
        END 
    END
    Should Be True    ${found}
Keyword Find Most Expensive Product
    ${products}=    Load Products    ${path}
    ${result}=    Keyword Find Most Expensive Product    ${products}
    Should Be Equal As Integers    ${result}    150

Calculate Total Stock Value
    ${products}=    Load Products    ${path}
    ${total}=    Keyword Calculate Total Stock Value    ${products}  
    Should Be Equal As Integers    ${total}    1850


Check Inexistant Product
    ${products}=    Load Products    ${path}
    FOR    ${product}    IN    @{products}
        ${status}    ${message}=    Run Keyword And Ignore Error    Get From Dictionary    ${product}    test  
        Should Be Equal    ${status}    FAIL
        Should Contain    ${message}    Dictionary does not contain key 'test'
    END

