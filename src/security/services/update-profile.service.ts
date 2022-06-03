import bcrypt from "bcrypt";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import createToken from "./token.service";

async function updateProfile(name, email, password): Promise<string> {
  try {
    const table = AppDataSource.manager.connection.getRepository(User);
  } catch (error) {}
}

export default updateProfile;
