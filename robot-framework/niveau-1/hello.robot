*** Settings ***

*** Variables ***
${message}    hello, world!

*** Keywords ***

*** Test Cases ***
Display Hello World Message
    Log    ${message}


