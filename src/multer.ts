import e from "express";
import multer from "multer";
import { v4 as uuid } from "uuid";
import { MulterFileModel } from "./models";

const multerConfig: multer.StorageEngine = multer.diskStorage({
  destination: (
    req: any,
    file: MulterFileModel,
    callback: (arg0: null, arg1: string) => void
  ) => {
    const fileType: string = file.mimetype.split("/")[0];
    const defaultFolder: string = "public";

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
    file: MulterFileModel,
    callback: (arg0: null, arg1: string) => void
  ) => {
    const ext = file.mimetype.split("/")[1];
    const fileType = file.mimetype.split("/")[0];
    //if file starts with post, it's first name will be post.(etc)
    if (file.originalname.split(".")[0] === "post") {
      callback(
        null,
        `post.user_${req.user._id}.type_${fileType}.${uuid()}.${ext}`
      );
      // if file starts with profile, it's first name will be profile.(etc)
    } else if (file.originalname.split(".")[0] === "profile") {
      callback(
        null,
        `profile.user_${req.user._id}.type_${fileType}.${uuid()}.${ext}`
      );
    }
  },
});

const filterExt = (
  req: any,
  file: MulterFileModel,
  callback: (arg0: any, arg1: boolean) => void
) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else if (file.mimetype.startsWith("video")) {
    callback(null, true);
  } else {
    console.log("Invalid file type: " + file.mimetype.split("/")[0]);
    throw new Error("Invalid file type: " + file.mimetype.split("/")[0]);
  }
};

const upload: multer.Multer = multer({
  storage: multerConfig,
  fileFilter: filterExt,
});

const uploadMedia: e.RequestHandler = upload.single("media");

export default uploadMedia;
