import { Request, Response } from "express";
import { getUserPosts } from "../../services";

const action = async (req: Request, res: Response) => {
  try {
    const { user_id, option } = req.params;
    const data = await getUserPosts(Number(user_id), option);

    return res.status(200).json(data);
  } catch (e) {
    return res.status(404).json({
      code: 404,
      error: "Error when fetching posts for profile posts",
      message: e.message,
    });
  }
};

export default action;
