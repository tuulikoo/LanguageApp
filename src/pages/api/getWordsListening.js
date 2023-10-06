import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const category = req.query.category;

    if (!category) {
        return res.status(400).json({ error: 'Category is required.' });
    }

    try {
        console.log(`Fetching words for category: ${category}`);
        const data = await prisma.listeningData.findUnique({
            where: {
                category: category,
            },
        });

        if (!data) {
            console.log(`Data not found for category: ${category}`);
            return res.status(404).json({ error: 'Data not found.' });
        }

        console.log(`Words fetched successfully for category: ${category}`);
        return res.status(200).json(data.words);
    } catch (error) {
        console.error(`Error while fetching words: ${error.message}`);
        return res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma client when done
    }
}
