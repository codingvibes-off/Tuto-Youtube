*** Settings ***
Library    SeleniumLibrary
Resource   ./ressources/utils.resource

*** Variables ***
${URL}    http://uitestingplayground.com/

*** Test Cases ***
Open Example Website Test
    Open Example Website  ${URL}




