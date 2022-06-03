import { Request, Response } from "express";
import attemptLogin from "../../security/services/attempt-login.service";

const action = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const token = await attemptLogin(email, password);

    return res.status(200).json({ token });
  } catch (e) {
    return res.json(401).json({
      code: 401,
      error: "Unauthorized / Bad credentials",
      message: e.message,
    });
  }
};

export default action;
