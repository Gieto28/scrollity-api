import bcrypt from "bcrypt";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import createToken from "./token.service";

async function attemptLogin(email: string, password: string): Promise<string> {
  const connection = AppDataSource.manager.connection;
  const table = connection.getRepository(User);

  try {
    const user = await table.findOne({ where: { email } });

    const comparePasswords = await bcrypt.compare(password, user?.password);

    if (!user || !comparePasswords) {
      throw new Error("Bad Credentials");
    }

    return createToken(user);
  } catch (error) {
    throw new Error(`didn't find user`);
  }
}

export default attemptLogin;
