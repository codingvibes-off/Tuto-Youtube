*** Settings ***
Library    SeleniumLibrary
Resource   ./utils.resource
*** Variables ***
${x}    10
*** Test Cases ***
conditional test
   IF  ${x} > 5
       greaterKeyword
   ELSE
       lessKeyword
   END
