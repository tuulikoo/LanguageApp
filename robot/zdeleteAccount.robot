*** Settings ***
Library     Browser


*** Variables ***
${LOGINURL} =       http://localhost:3009/Login
${USERURL} =        http://localhost:3009/UserPage
${MAINURL} =        http://localhost:3009/MainPage
${USERNAME} =       Robot
${PASSWORD} =       password


*** Test Cases ***
Verify new email is saved after updating it to user-details
    Open Browser To Login Page
    Enter Username
    Enter Password
    Submit Login Form
    Sleep    4s    just to check if page opened
    Verify That MainPage Is Visible
    Navigate to Userpage
    Sleep    4s    just to check if page opened
    Verify That UserPage Is Visible
    Verify Delete-button exists
    Click Delete-button
    Verify Confirm Deletion Text Appears
    Click Confirm Deletion-button
    Sleep    10s
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
    Click    id:loginButton

Verify That MainPage Is Visible
    Get Url    ==    ${MAINURL}

Navigate to Userpage
    Click    .Navbar_avatarButton__FSunb

Verify That UserPage Is Visible
    Get Text    body    contains    Etunimesi on
    Get Url    ==    ${USERURL}

Verify Delete-button exists
    Get Text    body    contains    Poista tietoni

Click Delete-button
    Click    xpath=//*[@id="section-container"]/div[3]/button

Verify Confirm Deletion Text Appears
    Get Text    body    contains    Haluatko varmasti poistaa tilisi

Click Confirm Deletion-button
    Click    xpath=//*[@id="section-container"]/div[4]/div/button[1]
