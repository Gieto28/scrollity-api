import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
  return res.json({ getPosts: "get posts" });
};

export default action;
