import bcrypt from "bcrypt";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import createToken from "./token.service";

async function updateProfile(
  id: number,
  name: string,
  email: string,
  password: string
): Promise<string> {
  const table = AppDataSource.manager.connection.getRepository(User);
  const user = await table.findOne({ where: { _id: Number(id) } });
  user.name = name ?? user.name;
  user.email = email ?? user.email;
  user.password = (await bcrypt.hash(password, 6)) ?? user.password;
  user.dateEdited = new Date();

  await AppDataSource.manager.save(user);

  return createToken(user);
}

export default updateProfile;
