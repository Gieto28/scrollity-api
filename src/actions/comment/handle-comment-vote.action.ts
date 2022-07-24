import { Request, Response } from "express";
import { handleCommentVote } from "../../services";

const action = async (req: Request, res: Response) => {
  const { vote, comment_id, user_id } = req.body;

  try {
    const data = await handleCommentVote(vote, comment_id, user_id);
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
