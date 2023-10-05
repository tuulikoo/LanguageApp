import { join } from "path";
import fs from "fs";

const getFilePath = (fileName) =>
    join(process.cwd(), "src", "utils", "wordlists", fileName);

const readData = (fileName) => {
    try {
        const rawData = fs.readFileSync(getFilePath(fileName), "utf8");
        return JSON.parse(rawData);
    } catch (error) {
        throw new Error(
            `Error reading the JSON data from ${fileName}: ${error.message}`,
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
                0,
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
