import bcrypt from "bcrypt";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import createToken from "./token.service";

const updateProfile = async (
  id: number,
  name: string | undefined,
  password: string | undefined
): Promise<string> => {
  try {
    const connection = AppDataSource.manager.connection;
    const table = connection.getRepository(User);

    const user = await table.findOne({ where: { _id: Number(id) } });

    user.name = name ?? user.name;

    if (password) {
      user.password = (await bcrypt.hash(password, 6)) ?? user.password;
    }

    user.dateEdited = new Date();

    await AppDataSource.manager.save(user);

    return createToken(user);
  } catch (e) {
    throw new Error(e.message);
  }
};

export default updateProfile;
