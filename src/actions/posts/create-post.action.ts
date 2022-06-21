import { Request, Response } from "express";
import { createPost } from "../../security";

const action = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { path } = req.file;
    const { user_id, title, description, category, mediaHeight } = await req.body;

    console.log("file", req.file);
    console.log("body", req.body);

    const data = await createPost(
      Number(user_id),
      title,
      description,
      category,
      path,
      mediaHeight,
    );

    return res.status(201).json({ data });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default action;
