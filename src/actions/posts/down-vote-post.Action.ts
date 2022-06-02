import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
  return res.json({ downVote: "down vote" });
};

export default action;
