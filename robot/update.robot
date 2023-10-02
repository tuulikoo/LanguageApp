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
    New Browser    headless=${True}
    New Page    ${LOGINURL}

Wait for Login Page
    Get Url    ==    ${LOGINURL}
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
    Get Url    ==    ${LOGINURL}/


Verify That email has been updated
    Get Text    body    contains    on updated@test.com

Reload Page
    Browser.Reload


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
    Sleep    4s
    Open email input fields
    Enter new setup email
    Sleep    2s    just to check if page opened
    Save new email
    Sleep    7s
    Verify current email-address
    Sleep    2s
    Reload Page
    Sleep    3s
    Open adjust-fields
    Open email input fields
    Enter new email
    Save new email
    Sleep   6s
    Reload Page
    Sleep    5s    just to check if page opened
    Verify That email has been updated
