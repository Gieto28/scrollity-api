import bcrypt from "bcrypt";
import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { User } from "../../../entity/User";
import createToken from "./token.service";

/**
 *
 * @param name name value retrieved from the form by the front end
 * @param email email value retrieved from the form by the front end
 * @param password password value retrieved from the form by the front end
 * @returns a token if successful otherwise throws an error
 */
const register = async (
  name: string,
  email: string,
  password: string
): Promise<string> => {
  try {
    const manager: EntityManager = AppDataSource.manager;
    const table: Repository<User> = manager.connection.getRepository(User);

    const checkIfEmailExists: User | undefined = await table.findOne({
      where: { email },
    });
    const checkIfNameExists: User | undefined = await table.findOne({
      where: { name },
    });

    if (checkIfEmailExists || checkIfNameExists) {
      throw new Error("Email or Name already exists..");
    }

    const user: User = new User();
    user.name = name;
    user.email = email;
    user.password = await bcrypt.hash(password, 6);
    user.dateCreated = new Date();
    user.dateEdited = new Date();

    await table.save(user);

    return createToken(user);
  } catch (e) {
    throw new Error(e.message);
  }
};

export default register;
