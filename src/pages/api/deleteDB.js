

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { categoryToDelete, wordToDelete } = req.body;

    if (!categoryToDelete || !wordToDelete) {
        return res
            .status(400)
            .json({ error: "CategoryToDelete and WordToDelete are required." });
    }

    try {
        const data = await prisma.listeningData.findUnique({
            where: {
                category: categoryToDelete,
            },
        });

        if (!data) {
            return res.status(404).json({ error: "Data not found." });
        }

        const updatedData = await prisma.listeningData.update({
            where: {
                category: categoryToDelete,
            },
            data: {
                words: {
                    set: data.words.filter((word) => word !== wordToDelete),
                },
            },
        });

        return res.status(200).json(updatedData);
    } catch (error) {
        console.error(`Error while removing word "${wordToDelete}" from category "${categoryToDelete}": ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
}
