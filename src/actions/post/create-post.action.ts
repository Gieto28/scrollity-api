import { Request, Response } from "express";
import { SuccessResponse } from "../../models";
import { createPost } from "../../security";

const action = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { media_id, user_id, title, description, category } = req.body;

    const data: SuccessResponse = await createPost(
      Number(user_id),
      title,
      description,
      media_id,
      category
    );

    return res.status(201).json({ data });
  } catch (e) {
    return res.status(400).json({
      code: 400,
      error: "Error when creating post",
      message: e.message,
    });
  }
};

export default action;
