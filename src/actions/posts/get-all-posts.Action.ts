import { Request, Response } from "express";
import getAllPosts from "../../security/services/Post/get-all-posts.service";

const action = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const data = await getAllPosts(category);

    return res.status(200).json({ data });
  } catch (e) {
    console.log(
      "error when calling get all posts on file get all posts action"
    );
    throw new Error(e.message);
  }
};

export default action;
