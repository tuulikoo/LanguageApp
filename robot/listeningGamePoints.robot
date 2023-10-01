*** Settings ***
Library    Browser
Library    OperatingSystem
Library    String
Library    SeleniumLibrary




*** Variables ***
${LOGINURL} =    http://localhost:3000/Login
${GAME2URL} =    http://localhost:3000/Game2
${MAINURL} =    http://localhost:3000/MainPage
${USERURL} =    http://localhost:3000/UserPage
${USERNAME} =    Robotester1
${PASSWORD} =    Password
${Timeout}        5s
${JSON_FILE_PATH} =    ./src/utils/listeningData.json
@{SUITE_SETUP}    Playwright Browser    rf    Browser


*** Keywords ***
Teardown
    Close All Browsers

*** Keywords ***
Open Browser To Login Page
    New Browser    headless=${True}
    New Page    ${LOGINURL}

Enter Username
    Fill Text    id=login_username    txt=${USERNAME}

Enter Password
    Fill Text    id=login_password    txt=${PASSWORD}

Submit Login Form
    Click    id=login_loginButton

Verify That MainPage Is Visible
    Get Url    ==    ${MAINURL}

Navigate to Userpage
    Click   .Navbar_avatarButton__FSunb

Verify That UserPage Is Visible
    Browser.Get Text    body    contains    Etunimesi on
    Get Url    ==    ${USERURL}

Get User Points
    ${initial_points}=    Browser.Get Text    css=.UserPointsComponent_pointsCount__gC72y
    Log    Initial Points: ${initial_points}
    Set Test Variable    ${initial_points}  # Save initial points as a test-level variable
    ${initial_points}=    Convert To Integer    ${initial_points}


Navigate To Game2
    Browser.Go To    ${GAME2URL}

Verify That Game2-page Is Visible
    Browser.Get Classes   .Exec_audioButton__HOX4e    #xpath=//*[@id="__next"]/div[2]/div/button[1]

Element Should Be Visible
    Browser.Get Text    id=spoken-word

Click Listening-icon
    Browser.Click   .Exec_audioButton__HOX4e

Type Correct Answer
    [Arguments]    ${spoken_word}
    Browser.Fill Text    css=.Exec_input__3OvWA    ${spoken_word}
    Sleep    1s
    Browser.Press Keys    css=.Exec_input__3OvWA    Enter

Get User Final Points
    ${final_points}=    Browser.Get Text    css=.UserPointsComponent_pointsCount__gC72y
    Log    final Points: ${final_points}
    Set Test Variable    ${final_points}  # Save initial points as a test-level variable
    ${final_points}=    Convert To Integer    ${final_points}

Verify That Point was Given for Correct Answer
    ${initial_points}=    Convert To Integer    ${initial_points}
    ${final_points}=    Convert To Integer    ${final_points}
    ${expected_final_points}=    Evaluate    ${initial_points} + 1
    Should Be Equal As Integers    ${final_points}    ${expected_final_points}

*** Test Cases ***
Verify Points Given for Correct Answer
    Log    Starting test case: Verify Points Given for Correct Answer
    # Check if the browser is open before opening the browser page
    Open Browser To Login Page
    Log    Browser opened successfully
    Enter Username
    Enter Password
    Submit Login Form
    Log    Login form submitted
    Sleep    3s
    Verify That MainPage Is Visible
    Log    Main page is visible
    Navigate to Userpage
    Sleep    2s
    Verify That UserPage Is Visible
    Sleep    3s
    Get User Points
    Log    Initial Points: ${initial_points}  # Log the initial points
    Sleep    3s
    Navigate To Game2
    Log    Navigated to Game2
    Sleep    2s
    Verify That Game2-page Is Visible
    Log    Game2 page is visible

    # Capture the data-spoken-word attribute value
    ${spoken_word} =    Browser.Get Attribute    id=spoken-word    data-spoken-word
    Log    Captured spoken word: ${spoken_word}

    # Define the variable as a test-level variable
    Set Test Variable    ${spoken_word}

    Click Listening-icon
    Log    Listening icon clicked
    Sleep    4s

    Type Correct Answer    ${spoken_word}
    Log    Fill text with: ${spoken_word}
    Sleep    2s  # Adjust sleep duration as needed
    Log    Correct word submitted
    Sleep    4s
    Navigate to Userpage
    Sleep    2s
    Verify That UserPage Is Visible
    Sleep    3s
    Get User Final Points
    Log    Final Points: ${final_points}  # Log the final points
    Verify That Point was Given for Correct Answer
    Log    Points verified
    Teardown
