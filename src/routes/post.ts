import { Router } from "express";
import {
  createPostsAction,
  downVotePostAction,
  getPostsAction,
  upVotePostAction,
  getAllPostsAction,
} from "../actions/post";

const routes = Router();

routes.get("/:id", getPostsAction);
routes.get("/all/:category", getAllPostsAction);
routes.post("/create", createPostsAction);

routes.post("/upVote/:id/:userId", upVotePostAction);
routes.post("/downVote/:id/:userId", downVotePostAction);

export default routes;
