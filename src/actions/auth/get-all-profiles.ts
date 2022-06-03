import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

const action = async (req: Request, res: Response) => {
  const table = AppDataSource.manager.connection.getRepository(User);

  const profiles = table.find({
    select: ["name", "email", "dateCreated", "dateEdited", "picture", "_id"],
  });

  res.status(200).json(profiles);
};

export default action;
