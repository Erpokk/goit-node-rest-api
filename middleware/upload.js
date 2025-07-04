
import multer from 'multer';
import {resolve} from "node:path";
import { existsSync, mkdirSync } from "fs";




const tempDir = resolve("temp");
if (!existsSync(tempDir)) {
    mkdirSync(tempDir, { recursive: true });
}
const avatarsDir = resolve("public", "avatars");
if (!existsSync(avatarsDir)) {
    mkdirSync(avatarsDir, { recursive: true });
}


const storage = multer.diskStorage({


    destination: (req, file, callback) => {
        callback(null, tempDir);
    },
    filename: (req, file, callback) => {
        const filename = `${Date.now()}_${file.originalname}`
        callback(null, filename);
    }
});

export const upload = multer({storage});