*** Settings ***
Library     Browser


*** Variables ***
${LOGINURL} =       http://langapp.xyz/Login
${USERURL} =        http://langapp.xyz/UserPage
${MAINURL} =        http://langapp.xyz/MainPage
${USERNAME} =       RobotLogin
${PASSWORD} =       RoboTestLogin

*** Test Cases ***
Verify Succesfull Login
    Open Browser To Login Page
    Sleep    1s
    Enter Username
    Sleep    1s
    Enter Password
    Sleep    1s
    Submit Login Form
    Sleep    5s    just to check if page opened
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
    Click    id=loginButton

Verify That MainPage Is Visible
    Get Url    ==    ${MAINURL}
