import { Request, Response } from "express";

const action = async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.status(201).json({ success: "success" });
  } catch (e) {
    return res.status(400).json({
      code: 400,
      error: "Error when managing files",
      message: e.message,
    });
  }
};

export default action;
