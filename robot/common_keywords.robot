*** Settings ***
Library     Browser
Library     String

*** Variables ***
${LOGINURL} =       http://langapp.xyz/Login
${USERURL} =        http://langapp.xyz/UserPage
${MAINURL} =        http://langapp.xyz/MainPage
${REGISTERURL} =    http://langapp.xyz/Registration
${USERNAME1} =       RobotTester1
${PASSWORD1} =       passwordTest1
${USERNAME2} =       RoboTester2
${PASSWORD2} =       PasswordTest2
${EMAIL2} =          roboTester2@osoite.com
${FIRSTNAME2} =       Robert

*** Keywords ***
Create Testuser
    New Browser    headless=${True}
    New Page    ${REGISTERURL}
    Fill Text    id=username    txt=${USERNAME2}
    Fill Text    id=email    txt=${EMAIL2}
    Fill Text    id=firstName    txt=${FIRSTNAME2}
    Fill Text    id=password    txt=${PASSWORD2}
    Sleep    1s
    Click    xpath=//button[contains(@class, 'selectAvatarButton')]
    Sleep   1s
    Click    xpath=(//img[@alt="Avatar"])[2]
    Click    xpath=//*[@id="__next"]/div/div[2]/form/div[5]/div[1]/label/img
    Click    xpath=//button[contains(@class, 'newUserButton')]
    ${BODY_TEXT} =    Get Text    body
        ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}
        FOR    ${expected_text}    IN    Käyttäjä luotu onnistuneesti    User created successfully    ユーザー作成成功!    Användaren skapades framgångsrikt
            ${contains_text} =    Evaluate    '${expected_text.lower()}' in '${BODY_TEXT.lower()}'
            Run Keyword If    ${contains_text}    Log    '${expected_text} found in ${BODY_TEXT}'
        END



DeleteUser
    New Browser    headless=${True}
    New Page    ${LOGINURL}
    Sleep    1s
    Fill Text    id=login_username    txt=${USERNAME1}
    Fill Text    id=login_password    txt=${PASSWORD1}
    Click    xpath=//button[contains(@class, 'loginButton')]
    Sleep    3s
    Get Url    ==    ${MAINURL}
    Click    xpath=//button[contains(@class, 'avatarButton')]
    Sleep    2s
    ${BODY_TEXT} =    Get Text    body
        ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}
        FOR    ${expected_text}    IN    Tervetuloa omalle sivullesi    Välkommen till din hemsida  さん、あなたのページへようこそ    データを削除する
                ${contains_text} =    Evaluate    '${expected_text.lower()}' in '${BODY_TEXT.lower()}'
                Run Keyword If    ${contains_text}    Log    '${expected_text} found in ${BODY_TEXT}'
        END
        Get Url    ==    ${USERURL}
    Click    xpath=//*[@id="section-container"]/div[3]/button
    Click    xpath=//*[@id="section-container"]/div[4]/div/button[1]