import { Router } from "express";
import {
  createPostsAction,
  handleVoteAction,
  getPostAction,
  getAllPostsAction,
  checkVotes,
} from "../actions/post";

const routes = Router();

routes.get("/:id", getPostAction);
routes.get("/all/:category", getAllPostsAction);

routes.post("/create", createPostsAction);

routes.post("/vote", handleVoteAction);

routes.get("/checkVote/:post_id/:user_id", checkVotes);

export default routes;
