import { join } from 'path';
import fs from 'fs';

export default function handler(req, res) {
    const directoryPath = join(process.cwd(), 'src', 'utils', 'wordlists');
    
    const prefix = req.query.prefix || '';
    const contains = req.query.contains || '';

    let files = fs.readdirSync(directoryPath);

    
    if (prefix) {
        files = files.filter(file => file.startsWith(prefix));
    }

    
    if (contains) {
        files = files.filter(file => file.includes(contains));
    }

    return res.status(200).json(files);
}


