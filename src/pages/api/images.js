import { join } from "path";
import fs from "fs";

/**
 * API endpoint to handle GET, POST, and DELETE requests for managing JSON data in files.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} req.query - The query parameters attached to the request.
 * @param {string} req.query.file - The name of the JSON file to be manipulated.
 * @param {object} req.body - The body of the request, used for POST and DELETE operations.
 * @param {object} res - The HTTP response object.
 *
 * @description
 * - This endpoint supports three types of requests: GET, POST, and DELETE.
 * - GET request: Retrieves data from a specified JSON file.
 * - POST request: Adds a new item to the JSON file. Requires 'imageUrl', 'eng', and 'fin' in the request body.
 * - DELETE request: Removes an item from the JSON file based on its 'id'.
 * - The filename is specified in the query parameters and must end with '.json'.
 * - The functions `readData` and `writeData` are used to interact with the file system.
 * - Appropriate responses are returned for successful operations, invalid requests, and server errors.
 *
 * @returns
 * - Returns a 400 status code for invalid or missing filename, or missing request body parameters.
 * - Returns a 200 status code with the requested data for GET, the new item for POST, and a success message for DELETE.
 * - Returns a 405 status code for unsupported request methods.
 * - Returns a 500 status code with an error message in case of a server error.
 */

const getFilePath = (fileName) =>
    join(process.cwd(), "src", "utils", "wordlists", fileName);

const readData = (fileName) => {
    try {
        const rawData = fs.readFileSync(getFilePath(fileName), "utf8");
        return JSON.parse(rawData);
    } catch (error) {
        throw new Error(
            `Error reading the JSON data from ${fileName}: ${error.message}`
        );
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
    const fileName = req.query.file;

    if (!fileName) {
        return res.status(400).json({ error: "No filename" });
    } else if (!fileName.endsWith(".json")) {
        return res.status(400).json({ error: "Invalid filename" });
    }
    let data;

    try {
        data = readData(fileName);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    switch (req.method) {
        case "GET":
            return res.status(200).json(data);

        case "POST":
            const { imageUrl, eng, fin } = req.body;

            if (!imageUrl || !eng || !fin) {
                return res.status(400).json({
                    error: "Image URL, English word, and Finnish word are required.",
                });
            }
            const highestId = data.reduce(
                (maxId, item) => Math.max(maxId, item.id),
                0
            );
            const newItem = {
                id: highestId + 1,
                imageUrl,
                eng,
                fin,
            };

            data.push(newItem);

            try {
                writeData(data, fileName);
                return res.status(200).json(newItem); // return the new item
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }

        case "DELETE":
            const { id } = req.body;

            if (!id) {
                return res
                    .status(400)
                    .json({ error: "Item id is required to delete." });
            }

            const indexToDelete = data.findIndex((item) => item.id === id);
            if (indexToDelete === -1) {
                return res.status(400).json({ error: "Invalid item id." });
            }

            data.splice(indexToDelete, 1);

            try {
                writeData(data, fileName);
                return res.status(200).send("Item removed successfully");
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }

        default:
            return res.status(405).end();
    }
}
