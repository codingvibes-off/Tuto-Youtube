*** Settings ***
Library    OperatingSystem
Library    Collections
*** Variables ***
${FILE_PATH}    ./robot-framework/niveau-6/test-file.txt

*** Test Cases ***
Read File Content
    ${content}=    Get File    ${FILE_PATH}
    Log    ${content}.
    Should Contain    ${content}    test lecture de fichier
Create And Read New File
    ${new_file_path}=    Set Variable    ./robot-framework/niveau-6/new-file.txt
    Create File    ${new_file_path}    This is a new file created by Robot Framework.
    ${new_content}=    Get File    ${new_file_path}
    Log    ${new_content}.
    Should Be Equal    ${new_content}    This is a new file created by Robot Framework.
    Remove File    ${new_file_path}


*** Variables ***
&{p1}    nom=Chaise    prix=50    stock=10
&{p2}    nom=Table     prix=150   stock=5
&{p3}    nom=Lampe     prix=30    stock=20
@{products}=     
...    &{p1}   
...    &{p2}    
...    &{p3}    

*** Test Cases ***
Dictionnary Operations
    ${length}=    Get Length    ${products}
    FOR    ${product}    IN  RANGE    ${length}
            ${nom}=    Get From Dictionary     ${product}   nom
            ${prix}=   Get From Dictionary     ${product}   prix
            Log    Le produit ${nom} a pour valeur ${prix}
    END
Sort product by price
    ${prices}    Create List
    ${length}=    Get Length    ${products}
    FOR    ${product}    IN  RANGE    ${length}
            ${prix}=   Get From Dictionary     ${product}   prix
            Append To List    ${prices}    ${prix}
    END 
    Sort List   ${prices}
    Log    Liste des prix triés : ${prices}
