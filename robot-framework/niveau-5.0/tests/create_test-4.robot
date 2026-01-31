*** Settings ***
Resource    ../config/setup_database.robot
*** Test Cases ***
Create Data in Database
    [Documentation]    This test case creates initial data in the database.
    ${database}=    Setup Database    4    Product D    1.99    10
    Log    Initial data created in the database. ${database}


