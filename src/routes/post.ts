import { Router } from "express";
import {
  createPostsAction,
  handleVoteAction,
  getPostAction,
  getAllPostsAction,
} from "../actions/post";

const routes = Router();

routes.get("/:id", getPostAction);
routes.get("/all/:category", getAllPostsAction);
routes.post("/create", createPostsAction);

routes.post("/vote", handleVoteAction);

export default routes;
