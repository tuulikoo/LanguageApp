*** Settings ***
Library     Browser
Library     String

Test Setup      Create Testuser3
Test Teardown    DeleteUser3

Resource    common_keywords.robot

*** Variables ***
${LOGINURL} =       http://langapp.xyz/Login
${GAME4URL} =       http://langapp.xyz/Game4
${MAINURL} =        http://langapp.xyz/MainPage
${USERNAME} =       RoboTester33
${PASSWORD} =       PasswordTest3
${condition_met} =    Fail


*** Test Cases ***
Verify Points Given for Correct Answer
    Open Browser To Login Page
    Click Logout if Visible
    Sleep    1s
    Enter Username
    Enter Password
    Submit Login Form
    Sleep    4s
    Verify That MainPage Is Visible
    Navigate To Game4
    Sleep    2s
    Verify That Game4-page Is Visible
    Sleep    2s
    Click Button4   #1omena
    Sleep    2s
    #Verify That Right Click Was Registered
    Sleep    2s
    Click Button2   #2banaani
    Sleep    2s
    #Verify That Right Click Was Registered
    Sleep    2s
    Click Button4   #3orange
    Sleep    2s
    #Verify That Right Click Was Registered
    Sleep    2s
    Click Button2   #4pear
    Sleep    2s
    #Verify That Right Click Was Registered
    Sleep    2s
    Click Button2   #5kiwi
    Sleep    2s
    #Verify That Right Click Was Registered
    Sleep    2s
    Click Button2   #6lemon
    Sleep    2s
    #Verify That Right Click Was Registered
    Sleep    2s
    Click Button4   #7väärä klikkaus, oikea 1 luumu
    Sleep    2s
    Click Button4   #7väärä klikkaus, oikea 1 luumu
    Sleep    2s
    #Verify That Wrong Click Was Registered
    Sleep    2s
    Click Button4   #8väärä klikkaus, oikea vesimeloni
    Sleep    4s
    Click Button4   #8väärä klikkaus, oikea vesimeloni
    Sleep    2s
    #Verify That Wrong Click Was Registered
    Sleep    2s
    Click Button1   #9väärä klikkaus, oikea ananas
    Sleep    2s
    Click Button1   #9väärä klikkaus, oikea ananas
    Sleep    2s
    #Verify That Wrong Click Was Registered
     Sleep    2s
     Click Button1   #10väärä klikkaus, oikea peach
     Sleep    2s
     Click Button1   #10väärä klikkaus, oikea peach
     Sleep    2s
     #Verify That Wrong Click Was Registered
     Sleep    2s
     Verify That Point was Only Given For Correct Answers


*** Keywords ***

Open Browser To Login Page
    New Browser    headless=${True}
    New Page    ${LOGINURL}

Click Logout if Visible
    ${BODY_TEXT} =    Get Text    body
    ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}
        IF    'kirjaudu ulos' in $BODY_TEXT.lower()
            Click   xpath = //*[@id="signout"]
        ELSE IF     'NavbarSignOut' in $BODY_TEXT.lower()
            Click    xpath = //*[@id="signout"]
        END

Enter Username
    Fill Text    id=login_username    txt=${USERNAME}

Enter Password
    Fill Text    id=login_password    txt=${PASSWORD}

Submit Login Form
    Click    xpath=//button[contains(@class, 'loginButton')]

Verify That MainPage Is Visible
    Get Url    ==    ${MAINURL}

Navigate To Game4
    New Page    ${GAME4URL}


Verify That Game4-page Is Visible
    # ${BODY_TEXT} =    Get Text    body
        # ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}

        # IF    'Valitse oikea sana' in $BODY_TEXT.lower()
        #     Set Variable    ${condition_met}    ${True}
        # ELSE IF    '正しい言葉を選ぶ' in $BODY_TEXT.lower()
        #     Set Variable    ${condition_met}    ${True}
        # ELSE IF    'Välj rätt ord' in $BODY_TEXT
        #     Set Variable    ${condition_met}    ${True}
        # ELSE IF    'G4pick' in $BODY_TEXT.lower()
        #     Set Variable    ${condition_met}    ${True}
        # ELSE
        #     Fail    Log    'None of the expected texts found in ${BODY_TEXT}'
        # END
        Get Url    ==    ${GAME4URL}

Choose Correct Answer
    Click    xpath=//*[@id="__next"]/div[2]/div[2]/div/div/div/button[4]

Verify That Right Click Was Registered
    ${BODY_TEXT} =    Get Text    body
    ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}

        IF    'oikein' in $BODY_TEXT.lower()
            Set Variable    ${condition_met}    ${True}
        ELSE IF    'その通りだ' in $BODY_TEXT.lower()
            Set Variable    ${condition_met}    ${True}
        ELSE IF    'korrekt' in $BODY_TEXT
            Set Variable    ${condition_met}    ${True}
        ELSE IF    'g4correct' in $BODY_TEXT.lower()
            Set Variable    ${condition_met}    ${True}
        ELSE
            Fail    Log    'None of the expected texts found in ${BODY_TEXT}'
        END

Answer Wrong To Next Question
    Click    xpath=//*[@id="__next"]/div[2]/div[2]/div/div/div/button[4]

Verify That Wrong Click Was Registered
    ${BODY_TEXT} =    Get Text    body
    ${BODY_TEXT} =    Replace String    ${BODY_TEXT}    \n    ${SPACE}

            IF    'väärin' in $BODY_TEXT.lower()
                Set Variable    ${condition_met}    ${True}
            ELSE IF    'あなたは間違った答えをしました' in $BODY_TEXT.lower()
                Set Variable    ${condition_met}    ${True}
            ELSE IF    'fel' in $BODY_TEXT
                Set Variable    ${condition_met}    ${True}
            ELSE IF    'g4wrong2' in $BODY_TEXT.lower()
                Set Variable    ${condition_met}    ${True}
            ELSE
                Fail    Log    'None of the expected texts found in ${BODY_TEXT}'
            END

Verify That Point was Only Given For Correct Answers
    Get Text    body    contains    6/10

Click Button1
    Click    xpath = //*[@id="__next"]/div/div[2]/div[2]/div[2]/div/div[2]/button[1]
Click Button2
    Click    xpath = //*[@id="__next"]/div/div[2]/div[2]/div[2]/div/div[2]/button[2]

Click Button3
    Click    xpath = //*[@id="__next"]/div/div[2]/div[2]/div[2]/div/div[2]/button[3]
Click Button4
    Click    xpath = //*[@id="__next"]/div/div[2]/div[2]/div[2]/div/div[2]/button[4]
