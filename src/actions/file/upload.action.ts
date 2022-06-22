import { Request, Response } from "express";

const action = async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.status(201).json({ success: "success" });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default action;
