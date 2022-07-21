import { Request, Response } from "express";
import { getHighestVotedPosts, getUserPosts } from "../../services";

const action = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const data: any = await getHighestVotedPosts(Number(user_id));

    return res.status(200).json({ data });
  } catch (e) {
    return res.status(400).json({
      code: 404,
      error: "Error when fetching posts for profile posts",
      message: e.message,
    });
  }
};

export default action;
