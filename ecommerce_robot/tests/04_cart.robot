*** Settings ***
Resource    ../resources/keywords.robot

*** Test Cases ***
Ajouter Au Panier Et Payer
    Open Application
    Login User    user1    pass123
    Add Product To Cart    "Smartphone"    2
    Checkout Cart          credit_card
    Logout User
    Close Browser
