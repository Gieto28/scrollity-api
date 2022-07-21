import { Request, Response } from "express";
import { Post } from "../../entity/Post";
import { getAllPosts } from "../../services";

const action = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const data: Post[] = await getAllPosts(category);

    return res.status(200).json({ data });
  } catch (e) {
    return res.status(400).json({
      code: 404,
      error: "Posts not found",
      message: e.message,
    });
  }
};

export default action;
