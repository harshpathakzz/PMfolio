import multer from "multer";

const storageConfig = multer.memoryStorage();
export const upload = multer({ storage: storageConfig });
