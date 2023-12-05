import prisma from "../utils/prisma";
/**
 * Script for importing and updating various sets of language learning data into a database using Prisma ORM.
 * It handles different categories of data such as game data, listening exercises, school and fruit level data,
 * animals level data, and flashcards data. The script reads from JSON files, clears existing records in the database,
 * and populates the database with new records.
 *
 * @module
 * @function importGameData - Imports game-related data from a JSON file into the database.
 * @function importListeningData - Imports listening exercise data from a JSON file into the database.
 * @function importSchoolLevel2 - Imports school level 2 data from a JSON file into the database.
 * @function importFruitsLevel2 - Imports fruits level 2 data from a JSON file into the database.
 * @function importAnimalsLevel2 - Imports animals level 2 data from a JSON file into the database.
 * @function importFlashcardsanat - Imports flashcards data from a JSON file into the database.
 * @function main - Main function that executes all data import functions and manages database connection.
 */

async function importGameData() {
    try {
        // Read the game data JSON file
        const gameData = require("../utils/wordlists/game4.json");

        // Delete all existing game4 records
        await prisma.game4.deleteMany();

        // Iterate through categories in game data and create new records
        for (const category in gameData) {
            await prisma.game4.create({
                data: {
                    category,
                    questions: gameData[category],
                },
            });
        }

        console.log("Game data imported and updated successfully.");
    } catch (error) {
        console.error("Error importing and updating game data:", error);
    }
}

async function importListeningData() {
    try {
        // Read the listening data JSON file
        const listeningData = require("../utils/wordlists/listeningData.json");

        // Iterate through categories in listening data
        for (const category in listeningData) {
            const existingData = await prisma.listeningData.findUnique({
                where: {
                    category: category,
                },
            });

            if (existingData) {
                // If data for this category already exists, update it
                await prisma.listeningData.update({
                    where: {
                        category: category,
                    },
                    data: {
                        words: {
                            set: listeningData[category], // Overwrite the words
                        },
                    },
                });
            } else {
                // If data for this category does not exist, create it
                await prisma.listeningData.create({
                    data: {
                        category: category,
                        words: listeningData[category],
                    },
                });
            }
        }

        console.log("Listening data imported and updated successfully.");
    } catch (error) {
        console.error("Error importing and updating listening data:", error);
    }
}

async function importSchoolLevel2() {
    try {
        // Read the school_level2 JSON file
        const schoolLevel2Data = require("../utils/wordlists/school_level2.json");

        // Delete all existing SchoolItem records
        await prisma.schoolItem.deleteMany();

        // Create new SchoolItem records
        for (const item of schoolLevel2Data) {
            await prisma.schoolItem.create({
                data: item,
            });
        }

        console.log("School Level 2 data imported and updated successfully.");
    } catch (error) {
        console.error(
            "Error importing and updating School Level 2 data:",
            error
        );
    }
}

async function importFruitsLevel2() {
    try {
        // Read the fruits_level2 JSON file
        const fruitsLevel2Data = require("../utils/wordlists/imgFruits.json");

        // Delete all existing FruitItem records
        await prisma.fruitItem.deleteMany();

        // Create new FruitItem records
        for (const item of fruitsLevel2Data) {
            await prisma.fruitItem.create({
                data: item,
            });
        }

        console.log("Fruits Level 2 data imported and updated successfully.");
    } catch (error) {
        console.error(
            "Error importing and updating Fruits Level 2 data:",
            error
        );
    }
}

async function importAnimalsLevel2() {
    try {
        // Read the animals_level2 JSON file
        const animalsLevel2Data = require("../utils/wordlists/animals_level2.json");

        // Delete all existing AnimalItem records
        await prisma.animalItem.deleteMany();

        // Create new AnimalItem records
        for (const item of animalsLevel2Data) {
            await prisma.animalItem.create({
                data: item,
            });
        }

        console.log("Animals Level 2 data imported and updated successfully.");
    } catch (error) {
        console.error(
            "Error importing and updating Animals Level 2 data:",
            error
        );
    }
}

async function importFlashcardsanat() {
    try {
        // Read the flashcardsanat JSON file
        const flashcardsanatData = require("../utils/wordlists/flashcardsanat.json");

        // Delete all existing Flashcardsanat records
        await prisma.flashcardsanat.deleteMany();

        // Create new Flashcardsanat records
        await prisma.flashcardsanat.create({
            data: flashcardsanatData,
        });

        console.log("Flashcardsanat data imported and updated successfully.");
    } catch (error) {
        console.error(
            "Error importing and updating Flashcardsanat data:",
            error
        );
    }
}

async function main() {
    try {
        // Import and update data for all JSON files
        await importGameData();
        await importListeningData();
        await importSchoolLevel2();
        await importFruitsLevel2();
        await importAnimalsLevel2();
        await importFlashcardsanat();
    } finally {
        await prisma.$disconnect();
    }
}

main();
