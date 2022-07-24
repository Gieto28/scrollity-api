import { Request, Response } from "express";
import { SuccessResponse } from "../../models";
import { createComment } from "../../services";

const action = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { user_id, comment, post_id } = req.body;

    const data: SuccessResponse = await createComment(
      user_id,
      post_id,
      comment
    );

    return res.status(201).json({ data });
  } catch (e) {
    return res.status(400).json({
      code: 400,
      error: "Error when creating comment",
      message: e.message,
    });
  }
};

export default action;
