import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

/**
 *
 * **ROUTE** auth/profiles
 *
 * @returns either status 200 (OK) **OR** status 400 (Bad Request)
 *
 * **Status 200 returns** - the status 200 and a json with an object with a title and data containing all the users in the db
 */
const action = async (req: Request, res: Response): Promise<Response> => {
  const table: Repository<User> =
    AppDataSource.manager.connection.getRepository(User);

  const profiles: User[] = await table.find({
    select: {
      _id: true,
      name: true,
      email: true,
      dateCreated: true,
      dateEdited: true,
    },
    take: 10,
  });

  return res
    .status(200)
    .json({ title: "All users in table Users", data: profiles });
};

export default action;
