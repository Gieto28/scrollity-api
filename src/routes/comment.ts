import { Router } from "express";
import {
  createCommentAction,
  downVoteCommentAction,
  getCommentAction,
  getPostCommentsAction,
  upVoteCommentAction,
} from "../actions/comment";

const routes = Router();

routes.get("/:id", getCommentAction);
routes.get("/post/:id", getPostCommentsAction);

routes.post("/create", createCommentAction);

routes.post("/upVote/:id/:userId", upVoteCommentAction);
routes.post("/downVote/:id/:userId", downVoteCommentAction);

export default routes;
