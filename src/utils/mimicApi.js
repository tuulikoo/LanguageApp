const DEFAULT_VOICE = 'en_US/ljspeech_low';
const MIMIC3_SERVER = process.env.NEXT_PUBLIC_MIMIC3_SERVER;

export const convertTextToSpeech = async (text, options = {}) => {
    const params = new URLSearchParams({
        text,
        voice: options.voice || DEFAULT_VOICE,
        noiseScale: options.noiseScale || 0.499,
        noiseW: options.noiseW || 0.4,
        lengthScale: options.lengthScale || 1.3,
        ssml: options.ssml || false,
    });

    const response = await fetch(MIMIC3_SERVER + params.toString());
    if (!response.ok) {
        throw new Error('Failed to convert text to speech');
    }

    return await response.blob();  // blob for audio data
};

export const textToSpeech = async (text, options = {}) => {
    try {
        const audioBlob = await convertTextToSpeech(text, options);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        return audio;
    } catch (error) {
        console.error(error);
        return null;
    }
};

