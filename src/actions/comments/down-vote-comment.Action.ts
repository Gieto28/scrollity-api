import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
  return res.json({ downVoteComment: "down vote comment" });
};

export default action;
