import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
  return res.json({ profile: "profile" });
};

export default action;
