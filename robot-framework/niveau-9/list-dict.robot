*** Settings ***
Library    Collections
*** Variables ***
@{ma_liste}    5    2    9    1    5    6
&{mon_dictionnaire}    nom=Alice    age=@{ma_liste}     ville=Paris

*** Keywords ***
*** Test Cases ***
Trier une liste
    ${sorted_list}=    Sort List    ${ma_liste}
    Log    Liste triée : ${sorted_list}

Trier une dictionnaire
    ${sorted_dict}=   Get Dictionary Keys    ${mon_dictionnaire}
    Sort List    ${sorted_dict}
    Log    Dictionnaire trié : ${sorted_dict}

Get Element in dico
    ${age}=    Get From Dictionary    ${mon_dictionnaire}    age
    Log    L'âge est : ${age}[0]

Get Element in List
    ${element}=    Get From List    ${ma_liste}    2
    Log    L'élément à l'index 2 est : ${element}
