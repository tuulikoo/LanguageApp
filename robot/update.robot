*** Settings ***
Library    Browser




*** Variables ***
${LOGINURL} =    http://localhost:3000/Login
${USERURL} =    http://localhost:3000/UserPage
${MAINURL} =    http://localhost:3000/MainPage
${USERNAME} =    Tester1
${PASSWORD} =    Password


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

Navigate to Userpage
    Click   .Navbar_avatarButton__FSunb

Verify That UserPage Is Visible
    Get Text    body    contains    Etunimesi on
    Get Url    ==    ${USERURL}


Verify current email-address
    Get Text    body    contains    test@test.com

Open adjust-fields
    Click    id=adjust

Verify email-update Button Exists
    Get Text    body    contains    Päivitä sähköpostiosoitteesi

Open email input fields
    Click    id=email

Enter new setup email
    Fill Text    id=emailinput    txt=test@test.com

Enter new email
    Fill Text    id=emailinput    txt=updated@test.com

Save new email
    Click    id=saveButton

Sign out
    Click    id=signout

Verify That Login Page Is Visible
    Get Text    body    contains    Login Page
    Get Url    ==    ${LOGINURL}/
    Get Title    ==    Login Page

Verify That email has been updated
    Get Text    body    contains    emailisi on updated@test.com


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
    Open adjust-fields
    Open email input fields
    Enter new setup email
    Sleep    2s    just to check if page opened
    Save new email
    Sleep    2s    just to check if page opened
    Sign out
    Enter Username
    Enter Password
    Submit Login Form
    Sleep    4s    just to check if page opened
    Verify That MainPage Is Visible
    Navigate to Userpage
    Sleep    4s    just to check if page opened
    Verify That UserPage Is Visible
    Verify current email-address
    Open adjust-fields
    Verify email-update Button Exists
    Open email input fields
    Enter new email
    Save new email
    Sleep    5s    just to check if page opened
    Verify That email has been updated