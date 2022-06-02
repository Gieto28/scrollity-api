import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
  return res.json({ login: "login" });
};

export default action;
