import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
  return res.json({ createPost: "create post" });
};

export default action;
