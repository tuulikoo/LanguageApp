const MIMIC_SERVER_URL = 'http://localhost:59125/api/tts';

const DEFAULT_VOICE = 'uk/apope_low';

export const convertTextToSpeech = async (text, options = {}) => {
    const params = new URLSearchParams({
        text,
        voice: 'en_US/ljspeech' || DEFAULT_VOICE,
        noiseScale: options.noiseScale || 0.222,
        noiseW: options.noiseW || 0.3,
        lengthScale: options.lengthScale || 1.1,
        ssml: options.ssml || true,
    });

    const response = await fetch(`${MIMIC_SERVER_URL}?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to convert text to speech');
    }

    return await response.blob();  // blob for audio data
};
