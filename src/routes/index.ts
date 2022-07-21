import { Response, Router } from "express";
import { name, version } from "../../package.json";
import authRoutes from "./auth";
import postsRoutes from "./post";
import commentsRoutes from "./comment";
import fileRoutes from "./file";
import profileRoutes from "./profile";
import notificationsRoutes from "./notifications";

const routes: Router = Router();

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
routes.use("/profile", profileRoutes);
routes.use("/notifications", notificationsRoutes);

export default routes;
