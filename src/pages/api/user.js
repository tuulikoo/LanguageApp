import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Find the user without returning the password
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        firstName: true,
        username: true,
        email: true,
        avatarId: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}