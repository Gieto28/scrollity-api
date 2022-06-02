import { Router } from "express";
import {
  createPostsAction,
  downVotePostAction,
  getPostsAction,
  upVotePostAction,
  getAllPostsAction,
} from "../actions/posts";

const routes = Router();

routes.get("/", getPostsAction);
routes.get("/all", getAllPostsAction);
routes.post("/", createPostsAction);

routes.post("/upVote/:id/:userId", upVotePostAction);
routes.post("/downVote/:id/:userId", downVotePostAction);

export default routes;
