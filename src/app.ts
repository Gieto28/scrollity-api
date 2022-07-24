import express, { Express } from "express";
import cors from "cors";
import routes from "./routes";
import path from "path";
import { verifyToken } from "./security/token.middleware";

const app: Express = express();

app.use("/public", express.static(path.join(__dirname, "..", "public")));

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(verifyToken);

app.use(routes);

export default app;
