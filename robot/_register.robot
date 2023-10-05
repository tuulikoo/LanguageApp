*** Settings ***
Library    Browser


*** Variables ***
${REGISTERURL} =    http://localhost:3000/Registration
${USERNAME} =    Robot
${PASSWORD} =    password
${EMAIL} =    robos@mail.com
${ETUNIMI} =    Robo
${LOGINURL} =    http://localhost:3000/Login


*** Keywords ***
Open Browser To Register Page
    New Browser    headless=${False}
    New Page    ${REGISTERURL}

Enter Username
    Fill Text    id=username    txt=${USERNAME}

Enter Email
    Fill Text    id=email    txt=${EMAIL}

Enter Firstname
    Fill Text    id=firstName    txt=${USERNAME}

Enter Password
    Fill Text    id=password    txt=${PASSWORD}

Open Choose Avatar adjust-fields
    Click    .RegistrationForm_selectAvatarButton__pUB__

Select Avatar
    Click    xpath=(//img[@alt="Avatar"])[2]



Click Register
    Click    .RegistrationForm_newUserButton__go4Al

Get Confirmitation
    Get Text    body    contains    Käyttäjä luotu onnistuneesti

Confirm Login Page is Open
    Get Text    body    contains    Kirjaudu sisään
    Get Url    ==    ${LOGINURL}


*** Test Cases ***
Verify Successfull Registration
    Open Browser To Register Page
    Enter Username
    Enter Email
    Enter Firstname
    Enter Password
    Open Choose Avatar adjust-fields
    Select Avatar
    Click Register
    Sleep    2s
    Get Confirmitation
    Sleep    4s
    Confirm Login Page is Open
