import express from "express";
import cors from "cors";
import routes from "./routes/index";
import { verifyToken } from "./security/middleware/token.middleware";
import path from "path";

const app = express();

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
