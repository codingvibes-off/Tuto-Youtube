*** Settings ***
Library    Collections

*** Variables ***
&{p1}=    id=101    name=Chaise    price=50    stock=10 
&{p2}=    id=102    name=Table     price=150   stock=5
&{p3}=    id=103    name=Lampe     price=30    stock=20
&{p4}=    id=104    name=Canape    price=500   stock=2
@{products}    
...    &{p1}
...    &{p2}
...    &{p3}
...    &{p4}
${cptStr}=    0
${current_id}=   0
***Test Cases***
Trier la liste de dictionnaire en une liste de tuples
    ${prices}=    Create List   
    ${sorted_list}=    Create List   
    FOR    ${product}    IN    @{products}
        ${price}=    Get From Dictionary    ${product}    price
        Append To List  ${prices}    ${price}   
    END
    Sort List  ${prices} 
    Log    Liste des prix triés : ${prices}

Trier la liste de dictionnaire en une liste de tuples
    ${tuples}=   Create List
    FOR    ${product}    IN    @{products}
        ${name}=    Get From Dictionary    ${product}    name
        ${price_str}=    Get From Dictionary    ${product}    price
        ${price}=    Convert To Integer    ${price_str}
        ${tuple}=    Create List     ${price}     ${name} 
        Append To List  ${tuples}    ${tuple}               
    END
    Sort List  ${tuples}
    Log     Liste triée (prix, nom) : ${tuples}

Check doublons
    ${idToList}=   Create List
    FOR    ${product}    IN    @{products}
        ${idStr}=    Get From Dictionary    ${product}    id
        ${id}=    Convert To Integer    ${idStr}
        Append To List    ${idToList}    ${id}
    END

    ${longueur}=    Get Length    ${idToList}

    FOR    ${index}    IN RANGE    0    ${longueur}
        ${current_id}=    Get From List    ${idToList}    ${index}
        ${occurrences}=    Count Values In List    ${idToList}    ${current_id}

        IF    ${occurrences} > 1
            Log    Doublon trouvé pour l'ID : ${current_id}
        END
    END
Total Stock
    ${stocks}=    Create List
    FOR    ${product}    IN    @{products}
        ${stock_str}=    Get From Dictionary    ${product}    stock
        ${stock}=    Convert To Integer    ${stock_str}
        ${price_str}=    Get From Dictionary    ${product}    price
        ${price}=    Convert To Integer    ${price_str}
        ${total_value}=    Evaluate    ${stock} * ${price}
        Append To List    ${stocks}    ${total_value}
    END
    Log    Liste des valeurs totales par produit : ${stocks}

Add Product
    Add Dictionnary Product    105    Fauteuil    80    15
    Log    Liste des produits après ajout : @{products}

Get Product Invalid Index
    Run Keyword And Expect Error    IndexError    Get From List    ${products}    400
*** Keywords ***
Add Dictionnary Product
    [Arguments]    ${id}    ${name}    ${price}    ${stock}
    &{product}=    Create Dictionary    id=${id}    name=${name}    price=${price}    stock=${stock}
    Append To List    @{products}    ${product}
    RETURN    @{products}