import { Router } from "express";
import {
  createCommentAction,
  getCommentAction,
  getAllCommentsAction,
  checkCommentVotesAction,
} from "../actions/comment";

const routes: Router = Router();

routes.get("/:id", getCommentAction);
routes.get("/all/:post_id", getAllCommentsAction);

routes.post("/create", createCommentAction);

routes.post("/checkVote/:comment_id/:user_id", checkCommentVotesAction);
export default routes;
