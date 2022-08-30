const multer = require("multer");

const storage = (path) =>
  multer.diskStorage({
    destination: "./uploads/" + path,
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

const upload = (path) =>
  multer({
    storage: storage(path),
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/msword" ||
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only docs format allowed!"));
      }
    },
  });
module.exports = upload;
