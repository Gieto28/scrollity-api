import { Request, Response, Router } from "express";
import { name, version } from "../../package.json";
import authRoutes from "./auth";
import postsRoutes from "./posts";
import commentsRoutes from "./comments";

const routes = Router();

routes.get("/", async (_, res: Response) =>
  res.json({
    name,
    version,
  })
);

routes.use("/auth", authRoutes);
routes.use("/posts", postsRoutes);
routes.use("/comments", commentsRoutes);

export default routes;
