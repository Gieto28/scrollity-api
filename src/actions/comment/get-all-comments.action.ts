import { Request, Response } from "express";
import { Comment } from "../../entity";
import { Post } from "../../entity/Post";
import { getAllComments } from "../../security";

const action = async (req: Request, res: Response) => {
  try {
    const data: Comment[] = await getAllComments();

    return res.status(200).json({ data });
  } catch (e) {
    console.log(
      "error when calling get all posts on file get all posts action"
    );
    throw new Error(e.message);
  }
};

export default action;
