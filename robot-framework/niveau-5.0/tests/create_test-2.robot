*** Settings ***
Resource    ../config/setup_database.robot
*** Test Cases ***
Create Data in Database
    [Documentation]    This test case creates initial data in the database.
    ${database}=    Setup Database    2    Product B    20.99    400
    Log    Initial data created in the database. ${database}


