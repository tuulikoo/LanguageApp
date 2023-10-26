*** Settings ***
Library     Browser


*** Variables ***
${LOGINURL} =       http://localhost:3009/Login
${USERURL} =        http://localhost:3009/UserPage
${MAINURL} =        http://localhost:3009/MainPage
${USERNAME} =       Robot
${PASSWORD} =       password


*** Test Cases ***
Verify Succesfull Login
    Open Browser To Login Page
    Enter Username
    Enter Password
    Submit Login Form
    Sleep    4s    just to check if page opened
    Verify That MainPage Is Visible


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

Verify That MainPage Is Visible
    Get Url    ==    ${MAINURL}
