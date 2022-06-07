import { Request, Response } from "express";
import attemptLogin from "../../security/services/attempt-login.service";

/**
 *
 * **ROUTE** auth/login
 *
 * @returns either status 200 (created) **OR** status 400 (Bad Request)
 *
 * **Status 200 returns** - the status 200 and a json with an object with a token
 * **Status 400 returns** - the status 400 and a json with the code: 400, error which is a string and the message which is error.message
 */
const action = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const token = await attemptLogin(email, password);

    return res.status(200).json({ token });
  } catch (e) {
    return res.status(401).json({
      code: 401,
      error: "Unauthorized / Bad credentials",
      message: e.message,
    });
  }
};

export default action;
