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
    FOR    ${expected_text}    IN    Tervetuloa omalle sivullesi    Välkommen till din hemsida  さん、あなたのページへようこそ    データを削除する
            ${contains_text} =    Evaluate    '${expected_text.lower()}' in '${BODY_TEXT.lower()}'
            Run Keyword If    ${contains_text}    Log    '${expected_text} found in ${BODY_TEXT}'
    END
    Get Url    ==    ${USERURL}

Verify Delete-button exists
    ${BODY_TEXT} =    Get Text    body
    ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}
    FOR    ${expected_text}    IN    Poista tietoni    Radera mina uppgifter    データを削除する
        ${contains_text} =    Evaluate    '${expected_text.lower()}' in '${BODY_TEXT.lower()}'
        Run Keyword If    ${contains_text}    Log    '${expected_text} found in ${BODY_TEXT}'
    END

Click Delete-button
    Click    xpath=//*[@id="section-container"]/div[3]/button

Verify Confirm Deletion Text Appears
    ${BODY_TEXT} =    Get Text    body
    ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}
    FOR    ${expected_text}    IN    Haluatko varmasti poistaa tilisi    Är du säker på att du vill radera ditt konto?   本当にアカウントを削除しますか
        ${contains_text} =    Evaluate    '${expected_text.lower()}' in '${BODY_TEXT.lower()}'
        Run Keyword If    ${contains_text}    Log    '${expected_text} found in ${BODY_TEXT}'
    END

Click Confirm Deletion-button
    Click    xpath=//*[@id="section-container"]/div[4]/div/button[1]
