import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
// import { Users } from "../../entity/User";

const action = async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);

  try {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    user.dateCreated = Date.now();
    user.dateEdited = Date.now();

    await AppDataSource.manager
      .save(user)
      .then(() => console.log("user saved"));
  } catch (error) {
    console.log(error?.message);

    throw new Error();
  }

  return res.end();
};

export default action;
