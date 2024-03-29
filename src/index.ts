require("dotenv").config();
import { AppDataSource } from "./data-source";
import app from "./app";

const PORT = 3003;

AppDataSource.initialize()
  .then(async () => {
    // start express server
    app.listen(PORT, () =>
      console.log(`\u{1F525} Server starting on port ${PORT}`)
    );
  })
  .catch((error) => console.log("error on file Index.ts", error));
