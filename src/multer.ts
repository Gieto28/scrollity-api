import multer from "multer";
import { v4 as uuid } from "uuid";

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    const fileType = file.mimetype.split("/")[0];

    if (fileType === "image") {
      return callback(null, "public/posts/images");
    } else if (fileType === "video") {
      return callback(null, "public/posts/videos");
    } else {
      callback(null, null);
      throw new Error("you can only upload video or image files");
    }
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    const fileType = file.mimetype.split("/")[0];
    callback(null, `post-${fileType}-${uuid()}.${ext}`);
  },
});

const filterExt = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else if (file.mimetype.startsWith("video")) {
    callback(null, true);
  } else {
    return console.log("Invalid file type: " + file.mimetype.split("/")[0]);
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: filterExt,
});

const uploadMedia = upload.single("media");

export default uploadMedia;
