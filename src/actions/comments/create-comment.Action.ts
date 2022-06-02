import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
  return res.json({ createComment: "create comment" });
};

export default action;
