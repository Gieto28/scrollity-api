import { Router } from "express";
import {
  createPostsAction,
  downVotePostAction,
  getPostsAction,
  upVotePostAction,
  getAllPostsAction,
} from "../actions/posts";
import uploadMedia from "../multer";

const routes = Router();

routes.get("/:id", getPostsAction);
routes.get("/all/:category", getAllPostsAction);
routes.post("/create", uploadMedia, createPostsAction);

routes.post("/upVote/:id/:userId", upVotePostAction);
routes.post("/downVote/:id/:userId", downVotePostAction);

export default routes;
