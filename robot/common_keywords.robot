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

${USERNAME3} =       RoboTester33
${PASSWORD3} =       PasswordTest3
${EMAIL3} =          roboTester3@osoite3.com
${FIRSTNAME3} =       Robert

${condition_met} =    False

${USERNAME4} =       Robot44568
${PASSWORD4} =       Password
${EMAIL4} =       robo44568@testing.com


*** Keywords ***
Create Testuser
    New Browser    headless=${True}
    New Page     ${REGISTERURL}
    Fill Text    id=username    txt=${USERNAME2}
    Fill Text    id=email    txt=${EMAIL2}
    Fill Text    id=firstName    txt=${FIRSTNAME2}
    Fill Text    id=password    txt=${PASSWORD2}
    Sleep    1s
    Click    xpath=//button[contains(@class, 'selectAvatarButton')]
    Sleep   1s
    Click    xpath=(//img[@alt="Avatar"])[2]
    Sleep    1s
    Click    xpath=//*[@id="__next"]/div/div[2]/form/div[5]/div[1]/label/img
    Sleep    1s
    Click    xpath=//button[contains(@class, 'newUserButton')]
    Sleep    2s
    ${BODY_TEXT} =    Get Text    body
    ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}
        IF    'käyttäjä luotu' in $BODY_TEXT.lower()
            Set Variable    ${condition_met}    ${True}
        ELSE IF    'user created' in $BODY_TEXT.lower()
            Set Variable    ${condition_met}    ${True}
        ELSE IF    'ユーザー作成成功!' in $BODY_TEXT
            Set Variable    ${condition_met}    ${True}
        ELSE IF    'användaren skapades framgångsrikt' in $BODY_TEXT.lower()
            Set Variable    ${condition_met}    ${True}
        ELSE IF     'userCreatedSuccessfully' in $BODY_TEXT
            Set Variable    ${condition_met}    ${True}
        ELSE
            Fail    Log    'None of the expected texts found in ${BODY_TEXT}'
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
    IF    'tervetuloa omalle sivullesi' in $BODY_TEXT.lower()
           Set Variable    ${condition_met}    ${True}
    ELSE IF    'välkommen till din hemsida' in $BODY_TEXT.lower()
           Set Variable    ${condition_met}    ${True}
    ELSE IF    'さん、あなたのページへようこそ' in $BODY_TEXT
           Set Variable    ${condition_met}    ${True}
    ELSE IF    'upwelcome' in $BODY_TEXT.lower()
           Set Variable    ${condition_met}    ${True}
    ELSE IF     'welcome' in $BODY_TEXT.lower()
           Set Variable    ${condition_met}    ${True}
    ELSE
           Fail    Log    'None of the expected texts found in ${BODY_TEXT}'
    END

    Get Url    ==    ${USERURL}
    Click    xpath=//*[@id="section-container"]/div[3]/button
    Click    xpath=//*[@id="section-container"]/div[4]/div/button[1]


Create Testuser3
    New Browser    headless=${True}
    New Page     ${REGISTERURL}
    Fill Text    id=username    txt=${USERNAME3}
    Fill Text    id=email    txt=${EMAIL3}
    Fill Text    id=firstName    txt=${FIRSTNAME3}
    Fill Text    id=password    txt=${PASSWORD3}
    Sleep    1s
    Click    xpath=//button[contains(@class, 'selectAvatarButton')]
    Sleep   1s
    Click    xpath=(//img[@alt="Avatar"])[2]
    Click    xpath=//*[@id="__next"]/div/div[2]/form/div[5]/div[1]/label/img
    Click    xpath=//button[contains(@class, 'newUserButton')]
    Sleep    3s
    ${BODY_TEXT} =    Get Text    body
    ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}
        IF    'käyttäjä luotu' in $BODY_TEXT.lower()
            Set Variable    ${condition_met}    ${True}
        ELSE IF    'user created' in $BODY_TEXT.lower()
            Set Variable    ${condition_met}    ${True}
        ELSE IF    'ユーザー作成成功!' in $BODY_TEXT
            Set Variable    ${condition_met}    ${True}
        ELSE IF    'användaren skapades framgångsrikt' in $BODY_TEXT.lower()
            Set Variable    ${condition_met}    ${True}
        ELSE IF     'userCreatedSuccessfully' in $BODY_TEXT.lower()
            Set Variable    ${condition_met}    ${True}
        ELSE
            Fail    Log    'None of the expected texts found in ${BODY_TEXT}'
        END
        Get Url    ==    ${LOGINURL}

DeleteUser3
    New Browser    headless=${True}
    New Page    ${LOGINURL}
    Sleep    1s
    Fill Text    id=login_username    txt=${USERNAME3}
    Fill Text    id=login_password    txt=${PASSWORD3}
    Click    xpath=//button[contains(@class, 'loginButton')]
    Sleep    3s
    Get Url    ==    ${MAINURL}
    Click    xpath=//button[contains(@class, 'avatarButton')]
    Sleep    2s
    ${BODY_TEXT} =    Get Text    body
    ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}
        IF    'tervetuloa omalle sivullesi' in $BODY_TEXT.lower()
               Set Variable    ${condition_met}    ${True}
        ELSE IF    'välkommen till din hemsida' in $BODY_TEXT.lower()
               Set Variable    ${condition_met}    ${True}
        ELSE IF    'さん、あなたのページへようこそ' in $BODY_TEXT
               Set Variable    ${condition_met}    ${True}
        ELSE IF    'upwelcome' in $BODY_TEXT.lower()
               Set Variable    ${condition_met}    ${True}
        ELSE IF     'welcome' in $BODY_TEXT.lower()
               Set Variable    ${condition_met}    ${True}
        ELSE
               Fail    Log    'None of the expected texts found in ${BODY_TEXT}'
        END
    Get Url    ==    ${USERURL}
    Click    xpath=//*[@id="section-container"]/div[3]/button
    Click    xpath=//*[@id="section-container"]/div[4]/div/button[1]

Reset e-mail
    New Browser    headless=${True}
    New Page    ${LOGINURL}
    Get Url    ==    ${LOGINURL}
    Sleep    1s
    Fill Text    id=login_username    txt=${USERNAME4}
    Sleep    1s
    Fill Text    id=login_password    txt=${PASSWORD4}
    Sleep    1s
    Click    xpath=//button[contains(@class, 'loginButton')]
    Sleep    4s
    Get Url    ==    ${MAINURL}
    Click    xpath=//button[contains(@class, 'avatarButton')]
    Sleep    2s
    Get Url    ==    ${USERURL}
    Click    id=adjust
    Click    id=email
    Fill Text    id=emailinput    txt=${EMAIL4}
    Sleep    2s
    Click    id=saveButton
    Sleep    2s
    Click    xpath=//*[@id="signout"]
