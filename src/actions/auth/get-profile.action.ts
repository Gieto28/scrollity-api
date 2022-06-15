import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
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
    const { _id: id } = req.user;

    const table = AppDataSource.manager.connection.getRepository(User);

    const profile = await table.findOne({
      where: { _id: Number(id) },
      select: {
        _id: true,
        name: true,
        email: true,
        dateCreated: true,
        dateEdited: true,
      },
    });

    if (profile._id !== id) {
      throw new Error("user id in request does not match user id in profile");
    }

    const notFound = `Error while fetching profile or profile with id ${id} doesn't exist`;

    return res.status(200).json({ profile: profile ?? notFound });
  } catch (e) {
    return res.status(404).json({
      code: 404,
      error: "User Not found",
      message: e.message,
    });
  }
};

export default action;
