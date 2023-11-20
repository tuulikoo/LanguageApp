*** Settings ***
Library     SeleniumLibrary


*** Variables ***
${BASE_URL}         https://your-website-url.com    # Replace with the actual website URL
${DEFAULT_VOICE}    en_US/ljspeech_low
${MIMIC3_SERVER}    https://your-mimic3-server.com    # Replace with the actual server URL


*** Test Cases ***
Test Text To Speech Conversion
    [Documentation]    Test the text-to-speech conversion functionality
    Open Browser    ${BASE_URL}    browser=chrome
    Maximize Browser Window
    ${text}    Set Variable    This is a test message.
    Click Button    id=trigger-conversion-button    # Replace 'id' with the actual attribute of your trigger button
    Wait Until Page Contains Element    audio[src^="${MIMIC3_SERVER}"]
    Sleep    2s    # Adjust as needed for audio generation time
    Play Audio    css=audio[src^="${MIMIC3_SERVER}"]
    Sleep    5s    # Adjust as needed to allow audio playback
    [Teardown]    Close Browser


*** Keywords ***
Play Audio
    [Arguments]    ${locator}
    Execute JavaScript    |    const audioElement = document.querySelector(arguments[0]);
    |    audioElement.play();
