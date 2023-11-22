*** Settings ***
Library     Browser
Library     String


*** Variables ***
${REGISTERURL} =    http://langapp.xyz/Registration
${USERNAME} =       Robot
${PASSWORD} =       password
${EMAIL} =          robonos@osoite.com.com
${ETUNIMI} =        Robo
${LOGINURL} =       http://langapp.xyz/Login



*** Test Cases ***
Verify Successfull Registration
    Open Browser To Register Page
    Enter Username
    Enter Email
    Enter Firstname
    Enter Password
    Open Choose Avatar adjust-fields
    Select Avatar
    Choose Language
    Click Register
    Sleep    2s
    Get Confirmation
    Sleep    4s
    Confirm Login Page is Open


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

Get Confirmation
    ${BODY_TEXT} =    Get Text    body
    ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}
    FOR    ${expected_text}    IN    Käyttäjä luotu onnistuneesti    User created successfully    ユーザー作成成功!    Användaren skapades framgångsrikt
        ${contains_text} =    Evaluate    '${expected_text.lower()}' in '${BODY_TEXT.lower()}'
        Run Keyword If    ${contains_text}    Log    '${expected_text} found in ${BODY_TEXT}'
    END

Confirm Login Page is Open
    ${BODY_TEXT} =    Get Text    body
    ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}
    FOR    ${expected_text}    IN    Kirjaudu sisään    Sign in    サインイン    Logga in
            ${contains_text} =    Evaluate    '${expected_text.lower()}' in '${BODY_TEXT.lower()}'
            Run Keyword If    ${contains_text}    Log    '${expected_text} found in ${BODY_TEXT}'
    END
    Get Url    ==    ${LOGINURL}

