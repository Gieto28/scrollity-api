import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
  return res.json({ profile: "specific profile" });
};

export default action;
