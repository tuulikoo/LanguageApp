import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({
                    error: 'Item id is required to delete.',
                });
            }

            await prisma.fruitItem.delete({
                where: { id },
            });

            return res.status(200).json({ message: 'Item deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(405).end(); // Method not allowed
    }
}