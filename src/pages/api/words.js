import { join } from 'path';
import fs from 'fs';

const filePath = join(process.cwd(), 'src', 'utils', 'wordlists', 'listeningData.json');

const readData = () => {
    try {
        const rawData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        throw new Error(`Error reading the JSON data: ${error.message}`);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        throw new Error('Error writing to the JSON file.');
    }
};

export default function handler(req, res) {
    let data;

    try {
        data = readData();
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
                writeData(data);
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
                writeData(data);
                return res.status(200).send("Word removed successfully");
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }

        default:
            return res.status(405).end();
    }
}

