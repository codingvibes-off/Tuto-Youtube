*** Settings ***
Resource    ../config/setup_database.robot
*** Test Cases ***
Create Data in Database
    [Documentation]    This test case creates initial data in the database.
    ${database}=    Setup Database    1    Product A    10.99    100
    Log    Initial data created in the database. ${database}



