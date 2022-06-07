import bcrypt from "bcrypt";
import { table } from "console";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import createToken from "./token.service";

async function register(
  name: string,
  email: string,
  password: string
): Promise<string> {
  try {
    const connection = AppDataSource.manager.connection;
    const table = connection.getRepository(User);

    const checkIfEmailExists = await table.findOne({ where: { email } });
    const checkIfNameExists = await table.findOne({ where: { name } });

    if (checkIfEmailExists || checkIfNameExists) {
      throw new Error("Email or Name already exists..");
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = await bcrypt.hash(password, 6);
    user.dateCreated = new Date();
    user.dateEdited = new Date();

    await AppDataSource.manager.save(user);

    return createToken(user);
  } catch (e) {
    throw new Error(e.message);
  }
}

export default register;
