import multer from "multer";


const storage = multer.memoryStorage();//memoryStorage is temporary storage and it is buffer
const upload = multer({storage:storage});


export {upload}