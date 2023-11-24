*** Settings ***
Library     Browser
Library     String

Test Teardown    DeleteUser

Resource    common_keywords.robot

*** Variables ***
${REGISTERURL} =    http://langapp.xyz/Registration
${USERNAME} =       RobotTester1
${PASSWORD} =       passwordTest1
${EMAIL} =          robotester1@osoite.com
${ETUNIMI} =        Robo
${LOGINURL} =       http://langapp.xyz/Login
${condition_met} =      False

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
    Fill Text    id=firstName    txt=${ETUNIMI}

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

*** Keywords ***
*** Keywords ***
Get Confirmation
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



Confirm Login Page is Open
    Get Url    ==    ${LOGINURL}



