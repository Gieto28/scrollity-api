require("dotenv").config();
import { AppDataSource } from "./data-source";
import app from "./app";

const port = Number(process.env.TYPEORM_PORT) || 3003;

AppDataSource.initialize()
  .then(async () => {
    // start express server
    app.listen(port, () =>
      console.log(
        console.log(process.env.port),
        `\u{1F525} Serving starting on port ${port} - click here http://localhost:${port} to go to server`
      )
    );
  })
  .catch((error) => console.log(error));
