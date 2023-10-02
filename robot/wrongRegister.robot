*** Settings ***
Library    Browser




*** Variables ***
${REGISTERURL} =    http://localhost:3000/Registration
${USERNAME} =    RobotTester
${PASSWORD} =    Password
${EMAIL} =    virheellinen@osoite
${ETUNIMI} =    Robo


*** Keywords ***
Open Browser To Register Page
    New Browser    headless=${True}
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

Get Error
    Get Text    body    contains    Sähköpostiosoite ei ole oikeassa muodossa


*** Test Cases ***
Verify Incorrect Email Will Not Work For Registering
    Open Browser To Register Page
    Enter Username
    Enter Email
    Enter Firstname
    Enter Password
    Open Choose Avatar adjust-fields
    Select Avatar
    Click Register
    Get Error
