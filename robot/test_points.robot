*** Settings ***
Library     Browser


*** Variables ***
${LOGINURL} =       http://localhost:3009/Login
${GAME4URL} =       http://localhost:3009/Game4
${MAINURL} =        http://localhost:3009/MainPage
${USERNAME} =       Robot
${PASSWORD} =       password
${Timeout}          5s
${CorrectOption}    ${EMPTY}    # Define the correct option for your test case


*** Test Cases ***
Verify Points Given for Correct Answer
    Open Browser To Login Page
    Enter Username
    Enter Password
    Submit Login Form
    Sleep    4s
    Verify That MainPage Is Visible
    Navigate To Game4
    Sleep    2s
    Verify That Game4-page Is Visible
    Sleep    3s
    Choose Correct Answer
    Sleep    1s
    Verify That Right Click Was Registered
    Sleep    2s
    Verify That Point was Given for Correct Answer
    Sleep    3s
    Answer Wrong To Next Question
    Sleep    3s
    Verify That Wrong Click Was Registered
    Sleep    4s
    Verify That Point was Not Given for Incorrect Answer


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

Navigate To Game4
    New Page    ${GAME4URL}

Verify That Game4-page Is Visible
    Get Text    body    contains    Tämän tehtävän pisteet: 0

Choose Correct Answer
    Click    xpath=//*[@id="__next"]/div[2]/div[2]/div/div/div/button[4]

Verify That Right Click Was Registered
    Get Text    body    contains    Oikein

Verify That Point was Given for Correct Answer
    Get Text    body    contains    Tämän tehtävän pisteet: 1

Answer Wrong To Next Question
    Click    xpath=//*[@id="__next"]/div[2]/div[2]/div/div/div/button[4]

Verify That Wrong Click Was Registered
    Get Text    body    contains    Väärin

Verify That Point was Not Given for Incorrect Answer
    Get Text    body    contains    Tämän tehtävän pisteet: 1
