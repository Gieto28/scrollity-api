import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
  return res.json({ upVote: "up vote" });
};

export default action;
