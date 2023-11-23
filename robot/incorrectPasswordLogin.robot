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


*** Test Cases ***
Verify User Cannot Login With Incorrect Password
    Open Browser To Login Page
    Enter Username
    Enter Password
    Submit Login Form
    Sleep    4s    just to wait for error message
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
    Click    id=loginButton

Verify That Error message is shown
    ${BODY_TEXT} =    Get Text    body
    ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}
    FOR    ${expected_text}    IN    Väärä käyttäjänimi tai salasana    User created successfully    ユーザー作成成功!    Användaren skapades framgångsrikt
        ${contains_text} =    Evaluate    '${expected_text.lower()}' in '${BODY_TEXT.lower()}'
        Run Keyword If    ${contains_text}    Log    '${expected_text} found in ${BODY_TEXT}'
    END

Verify that url is same
    Get Url    ==    ${LOGINURL}
