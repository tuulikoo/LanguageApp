import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { imageUrl, eng, fin } = req.body;

            if (!imageUrl || !eng || !fin) {
                return res.status(400).json({
                    error: 'Image URL, English word, and Finnish word are required.',
                });
            }

            const existingItems = await prisma.fruitItem.findMany();
            const highestId = existingItems.reduce(
                (maxId, item) => Math.max(maxId, item.id),
                0,
            );

            const newItem = await prisma.fruitItem.create({
                data: {
                    id: highestId + 1,
                    imageUrl,
                    eng,
                    fin,
                },
            });

            return res.status(200).json(newItem);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(405).end(); // Method not allowed
    }
}
