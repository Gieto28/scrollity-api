import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { User } from "../../../entity/User";
/**
 *
 * @param id id being retrieved from the front end
 * @returns a user if successful
 */
const getProfile = async (id: number): Promise<User> => {
  try {
    const table: Repository<User> =
      AppDataSource.manager.connection.getRepository(User);

    const profile: User = await table.findOneOrFail({
      where: { _id: Number(id) },
      select: ["_id", "picture", "name", "email", "dateCreated", "dateEdited"],
    });

    if (profile._id !== Number(id)) {
      throw new Error("user id in request does not match user id in profile");
    }

    return profile;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getProfile;
