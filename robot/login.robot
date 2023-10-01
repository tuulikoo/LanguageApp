*** Settings ***
Library    Browser




*** Variables ***
${LOGINURL} =    http://localhost:3000/Login
${USERURL} =    http://localhost:3000/UserPage
${MAINURL} =    http://localhost:3000/MainPage
${USERNAME} =    RobotTester999
${PASSWORD} =    password


*** Keywords ***
Open Browser To Login Page
    New Browser    headless=${False}
    New Page    ${LOGINURL}

Enter Username
    Fill Text    id=login_username    txt=${USERNAME}

Enter Password
    Fill Text    id=login_password    txt=${PASSWORD}

Submit Login Form
    Click    id=login_loginButton

Verify That MainPage Is Visible
        Get Url    ==    ${MAINURL}


*** Test Cases ***
Verify Succesfull Login
    Open Browser To Login Page
    Enter Username
    Enter Password
    Submit Login Form
    Sleep    4s    just to check if page opened
    Verify That MainPage Is Visible