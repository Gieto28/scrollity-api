import { Request, Response } from "express";
import { handleVote } from "../../security";

const action = async (req: Request, res: Response) => {
  try {
    const { vote, post_id, user_id } = req.body;

    const data = await handleVote(vote, post_id, user_id);

    return res.json({ data });
  } catch (e) {
    return res.status(400).json({
      code: 404,
      error: "Error when saving/updating post votes",
      message: e.message,
    });
  }
};

export default action;
