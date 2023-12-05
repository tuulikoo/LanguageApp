import { join } from 'path';
import fs from 'fs';

/**
 * API endpoint to manage wordlist data in JSON files for GET, POST, and DELETE operations.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} req.query - The query parameters attached to the request.
 * @param {string} [req.query.file='listeningData.json'] - The name of the JSON file to be manipulated.
 * @param {object} req.body - The body of the POST and DELETE requests.
 * @param {string} req.body.category - The category to which a word is added or from which a word is deleted.
 * @param {string} req.body.word - The word to be added or deleted in the specified category.
 * @param {object} res - The HTTP response object.
 *
 * @description
 * - This endpoint supports three types of requests: GET, POST, and DELETE.
 * - GET request: Retrieves data from the specified JSON file.
 * - POST request: Adds a new word to a specified category in the JSON file.
 * - DELETE request: Removes a word from a specified category in the JSON file.
 * - The functions `readData` and `writeData` are used to read and write to the file system.
 * - Appropriate responses are returned for successful operations, invalid requests, and server errors.
 *
 * @returns
 * - Returns a 400 status code for invalid file types or missing required fields in POST/DELETE.
 * - Returns a 200 status code with the requested data for GET, and a success message for POST/DELETE.
 * - Returns a 405 status code for unsupported request methods.
 * - Returns a 500 status code with an error message in case of a server error.
 */


const getFilePath = (fileName) => join(process.cwd(), 'src', 'utils', 'wordlists', fileName);

const readData = (fileName) => {
    try {
        const rawData = fs.readFileSync(getFilePath(fileName), 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        throw new Error(`Error reading the JSON data from ${fileName}: ${error.message}`);
    }
};

const writeData = (data, fileName) => {
    try {
        fs.writeFileSync(getFilePath(fileName), JSON.stringify(data, null, 2));
    } catch (error) {
        throw new Error(`Error writing to the JSON file (${fileName}).`);
    }
};

export default function handler(req, res) {
    const fileName = req.query.file || 'listeningData.json';

    if (!fileName.endsWith('.json')) {
        return res.status(400).json({ error: 'Invalid file type.' });
    }

    let data;

    try {
        data = readData(fileName);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }


    switch (req.method) {
        case 'GET':
            return res.status(200).json(data);

        case 'POST':
            const { category, word } = req.body;

            if (!category || !word) {
                return res.status(400).json({ error: 'Category and word are required.' });
            }

            if (!data[category]) {
                data[category] = [];
            }

            data[category].push(word);

            try {
                writeData(data, fileName);
                return res.status(200).send("Word added successfully");
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }

        case 'DELETE':
            const { categoryToDelete, wordToDelete } = req.body;

            if (!categoryToDelete || !wordToDelete) {
                return res.status(400).json({ error: 'Category and word to delete are required.' });
            }

            if (!data[categoryToDelete] || !data[categoryToDelete].includes(wordToDelete)) {
                return res.status(400).json({ error: 'Invalid category or word to delete.' });
            }

            data[categoryToDelete] = data[categoryToDelete].filter(item => item !== wordToDelete);

            try {
                writeData(data, fileName);
                return res.status(200).send("Word removed successfully");
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }

        default:
            return res.status(405).end();
    }
}

