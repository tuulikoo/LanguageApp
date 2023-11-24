*** Comments ***
# -*- coding: robot -*-


*** Settings ***
Library     Browser
Library     String


*** Variables ***
${LOGINURL} =       http://langapp.xyz/Login
${USERURL} =        http://langapp.xyz/UserPage
${MAINURL} =        http://langapp.xyz/MainPage
${USERNAME} =       RobotRest
${PASSWORD} =       RoboTestWrong
${condition_met} =    False


*** Test Cases ***
Verify User Cannot Login With Incorrect Password
    Open Browser To Login Page
    Sleep    1s
    Enter Username
    Sleep    1s
    Enter Password
    Sleep    1s
    Submit Login Form
    Sleep    5s    just to wait for error message
    Verify That Error message is shown
    Verify that url is same


*** Keywords ***
Open Browser To Login Page
    New Browser    headless=${True}
    New Page    ${LOGINURL}

Enter Username
    Fill Text    id=login_username    txt=${USERNAME}

Enter Password
    Fill Text    id=login_password    txt=${PASSWORD}

Submit Login Form
    Click    xpath=//button[contains(@class, 'loginButton')]

Verify That Error message is shown
    ${BODY_TEXT} =    Get Text    body
    ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}
        IF    'väärä käyttäjänimi tai salasana' in $BODY_TEXT.lower()
            Set Variable    ${condition_met}    ${True}
        ELSE IF    'incorrect' in $BODY_TEXT.lower()
            Set Variable    ${condition_met}    ${True}
        ELSE IF    'ユーザー名またはパスワードが間違っています' in $BODY_TEXT
            Set Variable    ${condition_met}    ${True}
        ELSE IF    'felaktigt användarnamn eller lösenord' in $BODY_TEXT.lower()
            Set Variable    ${condition_met}    ${True}
        ELSE IF     'usernameorpwwrong' in $BODY_TEXT.lower()
            Set Variable    ${condition_met}    ${True}
        ELSE
            Fail    Log    'None of the expected texts found in ${BODY_TEXT}'
        END

Verify that url is same
    Get Url    ==    ${LOGINURL}
