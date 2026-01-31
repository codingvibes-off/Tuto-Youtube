*** Settings ***
Library    Collections  
*** Variables ***
&{p1}    nom=Chaise    prix=50    stock=10
&{p2}    nom=Table     prix=150   stock=5
&{p3}    nom=Lampe     prix=30    stock=20
@{products}=     
...    &{p1}   
...    &{p2}    
...    &{p3} 

${result}    0
*** Test Cases ***
#Exercice 5
Separate price and stock
    FOR    ${product}    IN    @{products}
            ${price}=    Get From Dictionary    ${product}    prix
            ${stock}=    Get From Dictionary    ${product}    stock
            Log    Produit NOM : prix = ${price}, stock = ${stock}   
    END
#Exercice 6
Calcul total price's stock
    FOR    ${product}    IN    @{products}
            ${price_str}=    Get From Dictionary    ${product}    prix
            ${stock_str}=    Get From Dictionary    ${product}    stock
            ${stock}=    Convert To Integer    ${stock_str}
            ${price}=    Convert To Integer    ${price_str}
            ${result}=    Evaluate    ${result}+${price}*${stock}     
    END
    Log    La valeur total du stock est. ${result} 
#Exercice 7
Find expensive product
    ${prices_list}=    Create List
    FOR    ${product}    IN    @{products}
            ${price_str}=    Get From Dictionary    ${product}    prix
            ${price}=    Convert To Integer    ${price_str}
            Append To List    ${prices_list}    ${price}
    END
    ${max}=    Evaluate    max(${prices_list})
    Log    La valeur max du stock est. ${max}

#Exercice 8
Test Product Prices Template
    [Template]    Check Product Prices    
    Banane    10    3
    Gingembre    10    3 
    Canelle    10    10   
Negative Test Error
    FOR    ${product}    IN    @{products}
        Run Keyword And Expect Error    *Dictionary does not contain key 'none'*    Get From Dictionary    ${product}    none
    END

*** Keywords ***
Check Product Prices
    [Arguments]    ${name}    ${price}    ${expected}
    IF    ${price} == ${expected}
        Log    OK
    ELSE
        Log    Fail
    END
    RETURN    ${price}



