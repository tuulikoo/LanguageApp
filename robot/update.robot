*** Settings ***
Library    Browser


*** Variables ***
${LOGINURL} =    http://localhost:3000/Login
${USERURL} =    http://localhost:3000/UserPage
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

Verify That UserPage Is Visible
    Get Text    body    contains    Etunimesi on
    Get Url    ==    ${USERURL}

Verify current email-address
    Get Text    body    contains    test@er.fi

Open adjust-fields
    Click    id=adjust

Verify Password Button Exists
    Get Text    id=newpassword

Open email input fields
    Click    id=email

Enter new email
    Fill Text    id =     email txt="terttuli@test.com"

Save new email
    Click    id= saveEmail

Sign out
    Click    id= signout
Verify That Login Page Is Visible
    Get Text    body    contains    Login Page
    Get Url    ==    ${LOGINURL}/
    Get Title    ==    Login Page

Verify That email has been updated
    Get Text    body    contains    terttuli@test.com


*** Test Cases ***
Verify new email is saved after updating it to user-details
    Open Browser To Login Page
    Enter Username
    Enter Password
    Submit Login Form
    Sleep    4s    just to check if page opened
    Verify That UserPage Is Visible
    Verify current email-address
    Open adjust-fields
    Verify Password Button Exists
    #Open email input fields
    #Enter new email
    #Save new email
    #Sign out
    #Verify That Login Page Is Visible
    #Enter Username
    #Enter Password
    #Verify That email has been updated
    Sleep    4s    just to check if username was filled