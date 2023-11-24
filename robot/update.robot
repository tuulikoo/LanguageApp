*** Settings ***
Library     Browser

Test Teardown       Reset e-mail
Resource    common_keywords.robot

*** Variables ***
${LOGINURL} =       http://langapp.xyz/Login
${USERURL} =        http://langapp.xyz/UserPage
${MAINURL} =        http://langapp.xyz/MainPage
${USERNAME} =       Robot44568
${PASSWORD} =       Password
${OLDEMAIL} =       robo44568@testing.com
${NEWEMAIL} =       robo44568@imthebestrobot.com


*** Test Cases ***
Verify new email is saved after updating it to user-details
    Open Browser To Login Page
    Sleep    1s
    Enter Username
    Sleep    1s
    Enter Password
    Sleep    1s
    Submit Login Form
    Sleep    3s    just to check if page opened
    Verify That MainPage Is Visible
    Navigate to Userpage
    Sleep    4s    just to check if page opened
    Verify That UserPage Is Visible
    Verify Current e-mail before change
    Open adjust-fields
    Sleep    4s
    Open email input fields
    Enter new email
    Sleep    2s    just to check if page opened
    Save new email
    Sleep    2s
    Reload Page
    Sleep    3s
    Verify That email has been updated


*** Keywords ***
Open Browser To Login Page
    New Browser    headless=${True}
    New Page    ${LOGINURL}

Wait for Login Page
    Get Url    ==    ${LOGINURL}

Enter Username
    Fill Text    id=login_username    txt=${USERNAME}

Enter Password
    Fill Text    id=login_password    txt=${PASSWORD}

Submit Login Form
    Click    id=loginButton

Verify That MainPage Is Visible
    Get Url    ==    ${MAINURL}

Navigate to Userpage
    Click    xpath=//button[contains(@class, 'avatarButton')]

Verify That UserPage Is Visible
    Get Url    ==    ${USERURL}

Verify Current e-mail before change
    Get Text    body    contains    robo44568@testing.com

Verify current email-address
    Get Text    body    contains    ${NEWEMAIL}

Open adjust-fields
    Click    id=adjust

Open email input fields
    Click    id=email

Enter new email
    Fill Text    id=emailinput    txt=${NEWEMAIL}

Save new email
    Click    id=saveButton

Sign out
    Click    id=signout

Verify That Login Page Is Visible
    Get Url    ==    ${LOGINURL}/

Verify That email has been updated
    Get Text    body    contains    ${NEWEMAIL}

Reload Page
    Browser.Reload
