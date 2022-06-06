import { Request, Response } from "express";
import register from "../../security/services/register.service";

/**
 *
 * **ROUTE** auth/register
 *
 * @returns either status 201 (created) **OR** status 400 (Bad Request)
 *
 * **Status 201 returns** - the status 201 and a json with an object with a token
 * **Status 400 returns** - the status 400 and a json with the code: 400, error which is a string and the message which is error.message
 */
const action = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password, passwordConfirmation } = req.body;
    if (password !== passwordConfirmation) {
      throw new Error("password doesn't match");
    }
    const token = await register(name, email, password);

    return res.status(201).json({ token });
  } catch (e) {
    return res.status(400).json({
      code: 400,
      error: "error while creating user",
      message: e.message,
    });
  }
};

export default action;
