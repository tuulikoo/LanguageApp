*** Settings ***
Library         RequestsLibrary
Library         OperatingSystem
Library         Collections

Suite Setup     Set Environment Variables


*** Variables ***
${DEFAULT_VOICE}    en_US/ljspeech_low
${SESSION_NAME}     mimic3_session


*** Test Cases ***
Test Convert Text To Speech With Valid Input
    ${MIMIC3_SERVER}=    Get Environment Variable    NEXT_PUBLIC_MIMIC3_SERVER
    Create Session    ${SESSION_NAME}    ${MIMIC3_SERVER}
    ${params}=    Create Dictionary    text=Hello, world.    voice=${DEFAULT_VOICE}    ssml=true
    ${response}=    POST On Session    ${SESSION_NAME}    /tts?    data=${params}    expected_status=200
    ${content_type}=    Get From Dictionary    ${response.headers}    Content-Type
    Should Contain    ${content_type}    audio


*** Keywords ***
Set Environment Variables
    Set Environment Variable    NEXT_PUBLIC_MIMIC3_SERVER    http://10.120.33.64:59125/api/tts?
