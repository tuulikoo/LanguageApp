*** Settings ***
Library    Browser

*** Variables ***
${LOGINURL} =    http://localhost:3000/Login
${USERURL} =    http://localhost:3000/UserPage
${MAINURL} =    http://localhost:3000/MainPage
${USERNAME} =    Robot
${PASSWORD} =    password

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
    Wait Until Page Contains    ${MAINURL}

Navigate to Userpage
    Click   .Navbar_avatarButton__FSunb

Verify That UserPage Is Visible
    Wait Until Page Contains    ${USERURL}

Open adjust-fields
    Click    id=adjust

Verify email-update Button Exists
    Wait Until Page Contains    Päivitä sähköpostiosoitteesi

Open email input fields
    Click    id=email

Enter new email
    Fill Text    id=emailinput    txt=test@test.com

Save new email
    Click    id=saveButton

Sign out
    Click    id=signout
