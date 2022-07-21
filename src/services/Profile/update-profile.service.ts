import bcrypt from "bcrypt";
import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import createToken from "../Auth/token.service";

/**
 *
 * @param _id _id used to find the user using findOne() method
 * @param name used to change the name of the user, it'll check if name is null or if it has value, if it has value it'll replace it with the value, if it's null it'll stay the same
 * @param password user to change the password of the user, if it has value it'll replace it with the value, if it's null it'll stay the same
 * @returns a new token to be used by the front end and to be stored in the AsyncStorage
 */
const updateProfile = async (
  _id: number,
  name: string | undefined,
  password: string | undefined
): Promise<string> => {
  try {
    const manager: EntityManager = AppDataSource.manager;
    const table: Repository<User> = manager.connection.getRepository(User);

    const user: User | undefined = await table.findOne({
      where: { _id },
    });

    const checkIfNameExists: User = await table.findOne({
      where: { name },
    });

    if (checkIfNameExists) {
      throw new Error("Username already exists");
    }

    user.name = name ?? user.name;
    if (password) {
      user.password = (await bcrypt.hash(password, 6)) ?? user.password;
    }
    user.dateEdited = new Date();

    await manager.save(user);

    return createToken(user);
  } catch (e) {
    throw new Error(e.message);
  }
};

export default updateProfile;
