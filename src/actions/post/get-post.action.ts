import { Request, Response } from "express";
import { getPost } from "../../security";

const action = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await getPost(Number(id));

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
