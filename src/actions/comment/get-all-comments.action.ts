import { Request, Response } from "express";
import { Comment } from "../../entity";
import { Post } from "../../entity/Post";
import { getAllComments } from "../../security";

const action = async (req: Request, res: Response) => {
  try {
    const { post_id } = req.params;

    const data: Comment[] = await getAllComments(post_id);

    return res.status(200).json({ data });
  } catch (e) {
    return res.status(400).json({
      code: 404,
      error: "Comments not found",
      message: e.message,
    });
  }
};

export default action;
