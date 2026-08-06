import multer from "multer";

// ======================================
// Memory Storage
// ======================================

const storage = multer.memoryStorage();

// ======================================
// File Filter
// ======================================

const fileFilter = (req, file, cb) => {

    if (file.mimetype.startsWith("image/")) {

        cb(null, true);

    } else {

        cb(new Error("Only image files are allowed"), false);

    }

};

// ======================================
// Multer Upload
// ======================================

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 5 * 1024 * 1024, // 5 MB

    },

});

export default upload;