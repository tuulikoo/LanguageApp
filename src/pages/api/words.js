import { join } from 'path';
import fs from 'fs';

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

