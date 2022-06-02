import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
  return res.json({ updateProfile: "update profile" });
};

export default action;
