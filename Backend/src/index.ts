import * as express from "express";
import * as cors from "cors";
import config from "./config/config";
import connectMongo from "./database/connectMongo";

connectMongo()
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
