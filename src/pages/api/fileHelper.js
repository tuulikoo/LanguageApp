import { join } from "path";
import fs from "fs";

/**
 * API endpoint to retrieve a list of files from a specific directory based on query parameters.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} req.query - The query parameters attached to the request.
 * @param {string} [req.query.prefix] - An optional query parameter to filter files that start with a specific prefix.
 * @param {string} [req.query.contains] - An optional query parameter to filter files that contain a specific substring.
 * @param {object} res - The HTTP response object.
 *
 * @description
 * - This endpoint reads files from the 'wordlists' directory located within the 'src/utils' path of the current working directory.
 * - It optionally filters the files based on the provided 'prefix' and 'contains' query parameters.
 * - Files are filtered to include only those that start with the specified 'prefix' (if provided).
 * - Files are further filtered to include only those that contain the specified substring (if provided).
 * - The final list of files is returned as a JSON response.
 *
 * @returns
 * - Returns a 200 status code with the list of filtered files in JSON format.
 */

export default function handler(req, res) {
    const directoryPath = join(process.cwd(), "src", "utils", "wordlists");

    const prefix = req.query.prefix || "";
    const contains = req.query.contains || "";

    let files = fs.readdirSync(directoryPath);

    if (prefix) {
        files = files.filter((file) => file.startsWith(prefix));
    }

    if (contains) {
        files = files.filter((file) => file.includes(contains));
    }

    return res.status(200).json(files);
}
