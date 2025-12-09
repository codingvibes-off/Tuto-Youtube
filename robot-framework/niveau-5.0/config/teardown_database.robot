*** Settings ***
Resource    keywords.resource

*** Variables ***
${DB_PATH}=    ./robot-framework/niveau-10/database.json

*** Keywords ***
Teardown Database
    Remove File    ${DB_PATH}