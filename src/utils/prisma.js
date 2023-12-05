import { PrismaClient } from '@prisma/client'
/**
 * Initializes a new instance of PrismaClient.
 * PrismaClient is used to interact with your database using Prisma ORM.
 * It provides a set of methods to perform queries, mutations, and read data from the database.
 * 
 * Usage:
 * Import this instance in any module where you need to interact with the database.
 * It ensures that only a single instance of PrismaClient is used throughout the application,
 * which is a recommended practice for efficient database connections.
 *
 * Example:
 * import prisma from '<path_to_this_file>';
 * 
 * async function findUserByEmail(email) {
 *   return await prisma.user.findUnique({ where: { email } });
 * }
 */
const prisma = new PrismaClient()

export default prisma;
