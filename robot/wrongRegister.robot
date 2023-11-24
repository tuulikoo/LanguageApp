*** Settings ***
Library     Browser
Library     String


*** Variables ***
${REGISTERURL} =    http://langapp.xyz/Registration
${USERNAME} =       RobotTester9970
${PASSWORD} =       Password
${EMAIL} =          virheellinen9970@osoite
${ETUNIMI} =        Robo
${condition_met} =   False


*** Test Cases ***
Verify Incorrect Email Will Not Work For Registering
    Open Browser To Register Page
    Enter Username
    Enter Email
    Enter Firstname
    Enter Password
    Open Choose Avatar adjust-fields
    Select Avatar
    Choose Language
    Click Register
    Get Error


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
    Click    xpath=//button[contains(@class, 'selectAvatarButton')]

Select Avatar
    Click    xpath=(//img[@alt="Avatar"])[2]

Choose Language
    Click    xpath=//*[@id="__next"]/div/div[2]/form/div[5]/div[1]/label/img

Click Register
    Click    xpath=//button[contains(@class, 'newUserButton')]

Get Error
    ${BODY_TEXT} =    Get Text    body
        ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}

        IF    'sähköpostiosoite ei ole oikeassa muodossa' in $BODY_TEXT.lower()
            Set Variable    ${condition_met}    ${True}
        ELSE IF    'incorrect' in $BODY_TEXT.lower()
            Set Variable    ${condition_met}    ${True}
        ELSE IF    'メールアドレスが正しい形式ではありません' in $BODY_TEXT
            Set Variable    ${condition_met}    ${True}
        ELSE IF    'e-postadressen är inte i rätt format' in $BODY_TEXT.lower()
            Set Variable    ${condition_met}    ${True}
        ELSE IF     'regemailwrong' in $BODY_TEXT.lower()
            Set Variable    ${condition_met}    ${True}
        ELSE
            Fail    Log    'None of the expected texts found in ${BODY_TEXT}'
        END
