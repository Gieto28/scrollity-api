import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

const action = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const connection = AppDataSource.manager.connection;

  try {
    const table = connection.getRepository(User);

    const user = await table.findOne({ where: { id: Number(id) } });
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.password = password ?? user.password;
  } catch (e) {}
};

export default action;
