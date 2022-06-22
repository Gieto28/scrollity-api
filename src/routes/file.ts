import { Router } from "express";
import { fileUploadAction } from "../actions/file";
import uploadMedia from "../multer";

const routes = Router();

routes.post("/upload", uploadMedia, fileUploadAction);

export default routes;
