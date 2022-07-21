import { Request, Response } from "express";
import { getProfile } from "../../services";
/**
 *
 * **ROUTE** auth/profile
 *
 * @returns either status 200 (OK) **OR** status 404 (Resource not found)
 *
 * **Status 200 returns** - the status 200 and a json with an object with the profile with the id in the url
 * **Status 404 returns** - the status 404 and a json with the code: 404, error which is a string and the message which is error.message
 */
const action = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const data = await getProfile(Number(id));

    return res.status(200).json(data);
  } catch (e) {
    return res.status(404).json({
      code: 404,
      error: "User Not found",
      message: e.message,
    });
  }
};

export default action;
