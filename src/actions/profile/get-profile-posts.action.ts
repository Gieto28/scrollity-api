import { Request, Response } from "express";
import { Post_Likes_User } from "../../entity";
import { Post } from "../../entity/Post";
import { getUserPosts } from "../../security";

const action = async (req: Request, res: Response) => {
  try {
    const { user_id, option } = req.params;
    const data: Post[] | Post_Likes_User[] = await getUserPosts(
      Number(user_id),
      option
    );

    return res.status(200).json({ data });
  } catch (e) {
    throw new Error(e.message);
  }
};

export default action;
