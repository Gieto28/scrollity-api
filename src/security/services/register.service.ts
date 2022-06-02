import bcrypt from "bcrypt";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import createToken from "./token.service";

async function register(
  name: string,
  email: string,
  password: string
): Promise<string> {
  const user = new User();
  user.name = name;
  user.email = email;
  user.password = await bcrypt.hash(password, 6);
  user.dateCreated = new Date();
  user.dateEdited = new Date();

  await AppDataSource.manager.save(user);

  return createToken(user);
}

export default register;
