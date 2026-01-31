*** Settings ***
Resource    ../resources/keywords.robot

*** Test Cases ***
Consulter Catalogue
    Open Application
    Login User    user1    pass123
    Wait Until Page Contains Element   id=product-list
    Page Should Contain   "Smartphone"
    Page Should Contain   "499.99"
    Page Should Contain   "50"
    Logout User
    Close Browser
