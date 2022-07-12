import { Request, Response } from "express";
import { SuccessResponse } from "../../models";
import { createComment } from "../../security";

const action = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { comment, user_id, post_id } = req.body;

    const data: SuccessResponse = await createComment(
      comment,
      user_id,
      post_id
    );

    return res.status(201).json({ data });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default action;
