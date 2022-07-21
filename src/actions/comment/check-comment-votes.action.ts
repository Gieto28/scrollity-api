import { Request, Response } from "express";
import { Comment_Likes_User, Post_Likes_User } from "../../entity";
import { getUserCommentVote } from "../../services";

const action = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { comment_id, user_id } = req.params;

    const data: Comment_Likes_User = await getUserCommentVote(
      Number(comment_id),
      Number(user_id)
    );

    return res.status(200).json({ data });
  } catch (e) {
    return res.status(404).json({
      code: 404,
      error: "Was not able to return comment vote",
      message: e.message,
    });
  }
};

export default action;
