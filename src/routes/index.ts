import { Response, Router } from "express";
import { name, version } from "../../package.json";
import authRoutes from "./auth";
import postsRoutes from "./post";
import commentsRoutes from "./comment";
import fileRoutes from "./file";

const routes = Router();

routes.get("/", async (_, res: Response) =>
  res.json({
    name,
    version,
  })
);

routes.use("/auth", authRoutes);
routes.use("/post", postsRoutes);
routes.use("/comment", commentsRoutes);
routes.use("/file", fileRoutes);

export default routes;
