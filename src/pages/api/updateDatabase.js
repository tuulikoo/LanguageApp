import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const fileName = req.query.file || 'listeningData.json';

    if (!fileName.endsWith('.json')) {
        return res.status(400).json({ error: 'Invalid file type.' });
    }

    switch (req.method) {
        case 'GET':
            try {
                console.log(`Fetching data for file: ${fileName}`);
                // Fetch data from the database based on the selected file or category
                const data = await prisma.listeningData.findUnique({
                    where: {
                        category: fileName, // Use fileName as the unique identifier
                    },
                });

                if (!data) {
                    console.log(`Data not found for file: ${fileName}`);
                    return res.status(404).json({ error: 'Data not found.' });
                }

                console.log(`Data fetched successfully for file: ${fileName}`);
                return res.status(200).json(data);

            } catch (error) {
                console.error(`Error while fetching data: ${error.message}`);
                return res.status(500).json({ error: error.message });
            }

        case 'POST':
            const { category, word } = req.body;

            if (!category || !word) {
                console.log(`Invalid POST request: missing category or word`);
                return res.status(400).json({ error: 'Category and word are required.' });
            }

            try {
                console.log(`Adding word "${word}" to category "${category}" in file: ${fileName}`);
                // Create or update data in the database based on the selected file or category
                await prisma.listeningData.upsert({
                    where: {
                        category: category, // Use the category from the request body as the identifier
                    },
                    create: {
                        category: category,
                        words: [word],
                    },
                    update: {
                        words: {
                            push: word,
                        },
                    },
                });

                console.log(`Word "${word}" added successfully to category "${category}" in file: ${fileName}`);
                return res.status(200).send("Word added successfully");

            } catch (error) {
                console.error(`Error while adding word "${word}" to category "${category}": ${error.message}`);
                return res.status(500).json({ error: error.message });
            }


        default:
            console.log(`Invalid HTTP method: ${req.method}`);
            return res.status(405).end();
    }
}