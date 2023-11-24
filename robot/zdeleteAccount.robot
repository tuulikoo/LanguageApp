*** Settings ***
Library     Browser
Library     String

Resource    common_keywords.robot
Test Setup    Create Testuser

*** Variables ***
${LOGINURL} =       http://langapp.xyz/Login
${USERURL} =        http://langapp.xyz/UserPage
${MAINURL} =        http://langapp.xyz/MainPage
${USERNAME} =       RoboTester2
${PASSWORD} =       PasswordTest2
${condition_met}=   Fail


*** Test Cases ***
Delete User
    Open Browser To Login Page
    Enter Username
    Enter Password
    Submit Login Form
    Sleep    4s    just to check if page opened
    Verify That MainPage Is Visible
    Navigate to Userpage
    Sleep    4s    just to check if page opened
    Verify That UserPage Is Visible
    Verify Delete-button exists
    Click Delete-button
    Verify Confirm Deletion Text Appears
    Click Confirm Deletion-button
    Sleep    3s
    Verify That MainPage Is Visible


*** Keywords ***
Open Browser To Login Page
    New Browser    headless=${True}
    New Page    ${LOGINURL}
    Sleep    3s

Enter Username
    Fill Text    id=login_username    txt=${USERNAME}

Enter Password
    Fill Text    id=login_password    txt=${PASSWORD}

Submit Login Form
    Click    xpath=//button[contains(@class, 'loginButton')]

Verify That MainPage Is Visible
    Get Url    ==    ${MAINURL}

Navigate to Userpage
    Click    xpath=//button[contains(@class, 'avatarButton')]


Verify That UserPage Is Visible
    ${BODY_TEXT} =    Get Text    body
    ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}

    IF    'tervetuloa omalle' in $BODY_TEXT.lower()
        Set Variable    ${condition_met}    ${True}
    ELSE IF    'välkommen till din hemsida' in $BODY_TEXT.lower()
        Set Variable    ${condition_met}    ${True}
    ELSE IF    'さん、あなたのページへようこそ' in $BODY_TEXT
        Set Variable    ${condition_met}    ${True}
    ELSE IF    'UPwelcome' in $BODY_TEXT
        Set Variable    ${condition_met}    ${True}
    ELSE
        Fail    Log    'None of the expected texts found in ${BODY_TEXT}'
    END
    Get Url    ==    ${USERURL}


Verify Delete-button exists
    ${BODY_TEXT} =    Get Text    body
    ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}

    IF    'poista tietoni' in $BODY_TEXT.lower()
        Set Variable    ${condition_met}    ${True}
    ELSE IF    'radera mina uppgifter' in $BODY_TEXT.lower()
        Set Variable    ${condition_met}    ${True}
    ELSE IF    'データを削除する' in $BODY_TEXT
        Set Variable    ${condition_met}    ${True}
    ELSE IF    'UPdelete' in $BODY_TEXT
         Set Variable    ${condition_met}    ${True}
    ELSE
        Fail    Log    'None of the expected texts found in ${BODY_TEXT}'
    END

Click Delete-button
    Click    xpath=//*[@id="section-container"]/div[3]/button

Verify Confirm Deletion Text Appears
    ${BODY_TEXT} =    Get Text    body
    ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}

    IF    'haluatko varmasti poistaa tilisi' in $BODY_TEXT.lower()
        Set Variable    ${condition_met}    ${True}
    ELSE IF    'är du säker på att du vill radera ditt konto' in $BODY_TEXT.lower()
        Set Variable    ${condition_met}    ${True}
    ELSE IF    '本当にアカウントを削除しますか' in $BODY_TEXT
        Set Variable    ${condition_met}    ${True}
    ELSE IF    'UPconfirmDelete' in $BODY_TEXT
         Set Variable    ${condition_met}    ${True}

    ELSE
        Fail    Log    'None of the expected texts found in ${BODY_TEXT}'
    END

Click Confirm Deletion-button
    Click    xpath=//*[@id="section-container"]/div[4]/div/button[1]
