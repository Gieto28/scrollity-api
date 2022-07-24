import { Request, Response } from "express";
import { getPostByTitle } from "../../services";

const action = async (req: Request, res: Response) => {
  try {
    const { title } = req.params;

    const data = await getPostByTitle(title);

    return res.status(200).json(data);
  } catch (e) {
    return res.status(404).json({
      code: 404,
      error: "Post not found",
      message: e.message,
    });
  }
};

export default action;
