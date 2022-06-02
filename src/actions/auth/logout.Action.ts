import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
  console.log("hello world through log");
  res.json({ hello: "this is a hello from a res dot json" });
  res.send("hello world");
  return;
};

export default action;
