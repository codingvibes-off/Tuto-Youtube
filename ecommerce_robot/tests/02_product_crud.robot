*** Settings ***
Resource    ../resources/keywords.robot

*** Test Cases ***
Ajouter Un Produit
    Open Application
    Login User    admin    password123
    Add Product    "Smartphone"    499.99    50
    Logout User
    Close Browser

Modifier Un Produit
    Open Application
    Login User    admin    password123
    Edit Product   "Smartphone"    479.99    45
    Logout User
    Close Browser

Supprimer Un Produit
    Open Application
    Login User    admin    password123
    Delete Product  "Smartphone"
    Logout User
    Close Browser
