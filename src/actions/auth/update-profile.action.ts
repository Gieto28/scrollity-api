import { Request, Response } from "express";
import updateProfile from "../../security/services/update-profile.service";

/**
 *
 * **ROUTE** auth/profile/update/:id
 *
 * @returns either status 204 (updated successfully) **OR** status 400 (Bad Request)
 *
 * **Status 204 returns** - the status 204 and a json with an object with a token
 * **Status 400 returns** - the status 400 and a json with the code: 400, error which is a string and the message which is error.message
 */
const action = async (req: Request, res: Response): Promise<Response> => {
  const { _id: id } = req.user;

  const { name, email, password } = req.body;

  try {
    const token = await updateProfile(Number(id), name, email, password);

    return res.status(200).json({ token });
  } catch (e) {
    return res.status(400).json({
      code: 400,
      error: "error while updating user",
      message: e.message,
    });
  }
};

export default action;
