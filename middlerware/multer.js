import multer from "multer";
import fs from "fs";

export const multerFunction = (fileFilter) => {
  try {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        const fileDestination = "upload/pp";
        try {
          if (!fs.existsSync(fileDestination)) {
            fs.mkdirSync(fileDestination, { recursive: true });
          }
        } catch (e) {
          console.log("An error occurred.");
        }
        cb(null, fileDestination);
      },
      filename: function (req, file, cb) {
        cb(
          null,
          new Date().toISOString().replace(/:/g, "").replace(".", "") +
            file.originalname
        );
      },
    });
    const fileFilter = (req, file, cb) => {
      //reject a file
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "application/octet-stream"
      ) {
        cb(null, true);
      } else {
        console.log("wrong file type");
        cb(new Error("Wrong file type"), false);
      }
    };
    const upload = multer({
      storage: storage,
      limits: {
        filesize: 1024 * 1024 * parseInt(5),
      },
      fileFilter: fileFilter,
    });
    return upload;
  } catch (error) {
    console.log(error);
  }
};
