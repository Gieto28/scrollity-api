import { Router } from "express";
import {
  createPostsAction,
  handleVoteAction,
  getPostAction,
  getAllPostsAction,
  checkPostVotesAction,
} from "../actions/post";

const routes: Router = Router();

routes.get("/:id", getPostAction);
routes.get("/all/:category", getAllPostsAction);

routes.post("/create", createPostsAction);

routes.post("/vote", handleVoteAction);

routes.get("/checkVote/:post_id/:user_id", checkPostVotesAction);

export default routes;
