const DEFAULT_VOICE = "en_US/ljspeech_low";
const MIMIC3_SERVER = process.env.NEXT_PUBLIC_MIMIC3_SERVER;

/**
 * Adds custom pauses to the given text using SSML tags.
 * It inserts a 200ms pause after commas and a 600ms pause after periods.
 *
 * @param {string} text - The input text to be processed.
 * @returns {string} The processed text with added SSML pause tags.
 */
function addCustomPauses(text) {
    let ssmlText = text.replace(/,/g, ',<break time="200ms"/>');
    ssmlText = ssmlText.replace(/\./g, '.<break time="600ms"/>');
    return `<speak>${ssmlText}</speak>`;
}
/**
 * Converts the given text to speech using the MIMIC3 text-to-speech server.
 * The function adds custom pauses to the text and sends it to the server for conversion.
 * The options object can specify voice, noise scale, noise weight, and length scale.
 *
 * @param {string} text - The text to be converted to speech.
 * @param {Object} options - Optional parameters for voice, noiseScale, noiseW, lengthScale.
 * @returns {Blob} A blob containing the audio data.
 * @throws {Error} If the text-to-speech conversion fails.
 */
export const convertTextToSpeech = async (text, options = {}) => {
    const ssmlText = addCustomPauses(text);

    const params = new URLSearchParams({
        text: ssmlText,
        voice: options.voice || DEFAULT_VOICE,
        noiseScale: options.noiseScale || 0.499,
        noiseW: options.noiseW || 0.4,
        lengthScale: options.lengthScale || 1.3,
        ssml: true,
    });

    const response = await fetch(MIMIC3_SERVER + params.toString());
    if (!response.ok) {
        throw new Error("Failed to convert text to speech");
    }

    return await response.blob(); // blob for audio data
};
/**
 * Plays the given text as speech. It first converts the text to an audio blob
 * using `convertTextToSpeech` and then creates an audio object to play it.
 * If an error occurs during conversion or playback, it logs the error and returns null.
 *
 * @param {string} text - The text to be played as speech.
 * @param {Object} options - Optional parameters passed to `convertTextToSpeech`.
 * @returns {Audio|null} The Audio object if successful, or null if an error occurs.
 */
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
