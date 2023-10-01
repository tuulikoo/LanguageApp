*** Settings ***
Library    Browser




*** Variables ***
${LOGINURL} =    http://localhost:3000/Login
${USERURL} =    http://localhost:3000/UserPage
${MAINURL} =    http://localhost:3000/MainPage
${USERNAME} =    Tester1099
${PASSWORD} =    Password


*** Keywords ***
Open Browser To Login Page
    New Browser    headless=${True}
    New Page    ${LOGINURL}

Enter Username
    Fill Text    id=login_username    txt=${USERNAME}

Enter Password
    Fill Text    id=login_password    txt=${PASSWORD}

Submit Login Form
    Click    id=login_loginButton

Verify That Error message is shown
    Get Text    body    contains    Väärä käyttäjänimi tai salasana

Verify that url is same
    Get Url    ==    ${LOGINURL}

*** Test Cases ***
Verify User Cannot Login With Incorrect Password
    Open Browser To Login Page
    Enter Username
    Enter Password
    Submit Login Form
    Sleep    4s    just to wait for error message
    Verify That Error message is shown
    Verify that url is same
