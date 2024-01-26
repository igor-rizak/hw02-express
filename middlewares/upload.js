import multer from "multer";
import path from "path";

import {HttpError} from "../helpers/index.js";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
    destination,
    filename: (req, file, callback)=> {
        const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniquePreffix}_${file.originalname}`;
        callback(null, filename);
    }
});

const limits = {
    fileSize: 1024 * 1024 * 10,
};


const upload = multer({
    storage,
    limits,
})

export default upload;