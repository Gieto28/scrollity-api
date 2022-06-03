import bcrypt from "bcrypt";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import createToken from "./token.service";

async function attemptLogin(email: string, password: string): Promise<string> {
  const connection = AppDataSource.manager.connection;
  const table = connection.getRepository(User);

  const user = await table.findOne({ where: { email } });

  const comparedPassword = await bcrypt.compare(password, user?.password);

  if (!user || !comparedPassword) throw new Error("Bad credentials");

  return createToken(user);
}

export default attemptLogin;
