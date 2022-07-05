import { Request, Response } from "express";
import { createPost } from "../../security";

const action = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { media_id, user_id, title, description, category } = req.body;

    const data = await createPost(
      Number(user_id),
      title,
      description,
      media_id,
      category
    );

    return res.status(201).json({ data });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default action;
