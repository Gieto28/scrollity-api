import bcrypt from "bcrypt";
import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { User } from "../../../entity/User";
import createToken from "./token.service";

/**
 *
 * finds a user based on email, compares password from user and password from database using bcrypt.compare, if failed to find user or password doesn't match then it'll throw an error
 *
 * @param email used for authentication
 * @param password used for authentication
 * @returns a token if successful, otherwise throws an error
 */
async function login(email: string, password: string): Promise<string> {
  const manager: EntityManager = AppDataSource.manager;
  const table: Repository<User> = manager.connection.getRepository(User);

  console.log("login", email, password);

  try {
    const user: User = await table.findOne({
      where: { email },
    });

    const comparePasswords: boolean = await bcrypt.compare(
      password,
      user?.password
    );

    if (!user || !comparePasswords) {
      throw new Error("Bad Credentials");
    }

    return createToken(user);
  } catch (error) {
    throw new Error(error.message);
  }
}

export default login;
