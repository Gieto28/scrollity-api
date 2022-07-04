import { Request, Response } from "express";
import { handleVote } from "../../security";

const action = async (req: Request, res: Response) => {
  const { vote, post_id, user_id } = req.body;

  const data = await handleVote(vote, post_id, user_id);

  return res.json(data);
};

export default action;
