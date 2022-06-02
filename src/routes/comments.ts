import { Router } from "express";
import {
  createCommentAction,
  downVoteCommentAction,
  getCommentAction,
  getPostCommentsAction,
  upVoteCommentAction,
} from "../actions/comments";

const routes = Router();

routes.get("/:id", getCommentAction);
routes.get("/:postId", getPostCommentsAction);

routes.post("/", createCommentAction);

routes.post("/upVote/:id/:userId", upVoteCommentAction);
routes.post("/downVote/:id/:userId", downVoteCommentAction);

export default routes;
