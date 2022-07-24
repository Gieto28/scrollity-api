import express from "express";
import multer from "multer";

const multerConfig: multer.StorageEngine = multer.diskStorage({
  destination: (
    req: any,
    file: Express.Multer.File,
    callback: (arg0: null, arg1: string) => void
  ) => {
    const fileType: string = file.mimetype.split("/")[0];
    const defaultFolder: string = "public";

    if (file.path === null) {
      return;
    }

    console.log(file);

    // if the file being uploaded comes from the create posts screen, it'll have posts as it's first characters
    if (file.originalname.split(".")[0] === "post") {
      if (fileType === "image") {
        return callback(null, `${defaultFolder}/posts/images`);
      } else if (fileType === "video") {
        return callback(null, `${defaultFolder}/posts/videos`);
      } else {
        callback(null, null);
        throw new Error("you can only upload video or image files");
      }
      // if the file being uploaded comes from the upload profile picture, it'll have profile as it's first characters
    } else if (file.originalname.split(".")[0] === "profile") {
      if (fileType === "image") {
        return callback(null, `${defaultFolder}/profiles/images`);
      } else {
        callback(null, null);
        throw new Error("you can only upload image files");
      }
    }
  },
  filename: (
    req: any,
    file: Express.Multer.File,
    callback: (arg0: null, arg1: string) => void
  ) => {
    callback(null, file.originalname);
  },
});

const filterExt = (
  req: any,
  file: Express.Multer.File,
  callback: (arg0: any, arg1: boolean) => void
) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else if (file.mimetype.startsWith("video")) {
    callback(null, true);
  } else {
    throw new Error("Invalid file type: " + file.mimetype.split("/")[0]);
  }
};

const upload: multer.Multer = multer({
  storage: multerConfig,
  fileFilter: filterExt,
});

const uploadMedia: express.RequestHandler = upload.single("media");

export default uploadMedia;
