*** Settings ***
Library    SeleniumLibrary
Library    JSONLibrary

*** Variables ***
${BASE_URL}      http://localhost:8080

*** Keywords ***
Open Application
    Open Browser    ${BASE_URL}    chrome
    Maximize Browser Window

Login User
    [Arguments]    ${username}    ${password}
    Input Text     id=username    ${username}
    Input Text     id=password    ${password}
    Click Button   id=login-btn
    Wait Until Page Contains Element   id=account-home

Logout User
    Click Element  id=logout-btn
    Wait Until Page Contains Element  id=login-btn

Add Product
    [Arguments]    ${name}    ${price}    ${stock}
    Input Text     id=product-name    ${name}
    Input Text     id=product-price   ${price}
    Input Text     id=product-stock   ${stock}
    Click Button   id=add-product-btn
    Wait Until Page Contains   ${name}

Edit Product
    [Arguments]    ${name}    ${new_price}    ${new_stock}
    Click Element  xpath=//tr[td[text()='${name}']]//button[@class='edit']
    Input Text     id=product-price   ${new_price}
    Input Text     id=product-stock   ${new_stock}
    Click Button   id=save-product-btn
    Wait Until Page Contains   ${new_price}

Delete Product
    [Arguments]    ${name}
    Click Element  xpath=//tr[td[text()='${name}']]//button[@class='delete']
    Wait Until Page Does Not Contain   ${name}

Add Product To Cart
    [Arguments]    ${name}    ${quantity}
    Click Element  xpath=//tr[td[text()='${name}']]//button[@class='add-to-cart']
    Input Text     id=cart-quantity    ${quantity}
    Click Button   id=update-cart-btn
    Wait Until Page Contains   ${name}

Checkout Cart
    [Arguments]    ${payment_method}
    Click Button   id=checkout-btn
    Select From List By Value    id=payment-method    ${payment_method}
    Click Button   id=pay-btn
    Wait Until Page Contains   Payment Successful
