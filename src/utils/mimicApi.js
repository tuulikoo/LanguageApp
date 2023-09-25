const DEFAULT_VOICE = 'en_US/ljspeech_low';
const MIMIC3_SERVER = process.env.NEXT_PUBLIC_MIMIC3_SERVER;

export const convertTextToSpeech = async (text, options = {}) => {
    const params = new URLSearchParams({
        text,
        voice: DEFAULT_VOICE,
        noiseScale: options.noiseScale || 0.222,
        noiseW: options.noiseW || 0.3,
        lengthScale: options.lengthScale || 1.5,
        ssml: options.ssml || false,
    });

    const response = await fetch(MIMIC3_SERVER + params.toString());
    if (!response.ok) {
        throw new Error('Failed to convert text to speech');
    }

    return await response.blob();  // blob for audio data
};

