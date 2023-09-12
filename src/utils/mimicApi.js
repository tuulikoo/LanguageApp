const MIMIC_SERVER_URL = 'http://localhost:59125/api/tts';

export const convertTextToSpeech = async (text, options = {}) => {
    const params = new URLSearchParams({
        text,
        voice: options.voice || 'en_UK/apope_low',
        noiseScale: options.noiseScale || 0.667,
        noiseW: options.noiseW || 0.8,
        lengthScale: options.lengthScale || 1,
        ssml: options.ssml || false
    });

    const response = await fetch(`${MIMIC_SERVER_URL}?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to convert text to speech');
    }

    return await response.blob();  // blob for audio data
};
