import { Request, Response } from "express";
import { handleCommentVote } from "../../security";

const action = async (req: Request, res: Response) => {
  const { vote, comment_id, user_id } = req.body;

  const data = await handleCommentVote(vote, comment_id, user_id);

  return res.json({ data });
};

export default action;
