import { Request, Response } from "express";
import register from "../../security/services/register.service";

/**
 *
 *
 * @returns either status 201 (c) **OR** status 400 (Bad Request)
 *
 * **Status 201 returns** - the status 201 and a json with an object User filled with name, email, password, dateCreated and dateEdited
 * **Status 400 returns** - the status 400 and a json with the code: 400, error which is a string and the message which is error.message
 */
const action = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const token = await register(name, email, password);

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      error: "error while creating user",
      message: error.message,
    });
  }
};

export default action;
