import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
  return res.json({ upVoteComment: "up vote comment" });
};

export default action;
