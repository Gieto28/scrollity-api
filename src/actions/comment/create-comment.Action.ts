import { Request, Response } from "express";
import { SuccessResponse } from "../../models";
import { createComment } from "../../security";

const action = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { user_id, comment, post_id } = req.body;

    const data: SuccessResponse = await createComment(
      user_id,
      post_id,
      comment
    );

    return res.status(201).json({ data });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default action;
