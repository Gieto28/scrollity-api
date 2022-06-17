import { Request, Response } from "express";
import { createPost } from "../../security";

const action = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { filename } = req.file;
    const { user_id, title, description, category } = await req.body;
    const data = await createPost(
      Number(user_id),
      title,
      description,
      category,
      filename
    );

    return res.status(201).json({ data });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default action;
