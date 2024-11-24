import * as express from "express";
import * as cors from "cors";
import config from "./config/config";
import connectMongo from "./database/connectMongo";
import * as morgan from "morgan";
import MainRouter from "./me/routers";
import autoRouter from "./me/autos/router/autoRouter";

connectMongo()
  .then(async () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("dev"));
    app.use(cors());

    const apiRouter = express.Router();
    apiRouter.use("/api", MainRouter);
    await autoRouter(apiRouter);

    app.use(apiRouter);

    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
