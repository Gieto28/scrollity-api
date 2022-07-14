import { Request, Response } from "express";
import { Post } from "../../entity/Post";
import { getAllPosts } from "../../security";

const action = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const data: Post[] = await getAllPosts(category);

    return res.status(200).json({ data });
  } catch (e) {
    throw new Error(e.message);
  }
};

export default action;
