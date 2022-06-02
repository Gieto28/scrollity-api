import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
  return res.json({ getComments: "get comments" });
};

export default action;
