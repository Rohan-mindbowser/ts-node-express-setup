import express, {
  Request,
  Response,
  NextFunction,
  Application,
  ErrorRequestHandler,
} from "express";
import createHttpError from "http-errors";
import { config } from "dotenv";
import mongoose from "mongoose";
import * as bodyParser from "body-parser";
import { routes } from "./routes/index";
import Logging from "./library/Logger/logger";

//To surpass the strictQuery deprecation warning
mongoose.set("strictQuery", false);

const PORT: Number = Number(process.env.PORT) || 3000;
const app: Application = express();
const db = require("./config/db");
var morgan = require("morgan");
var fs = require("fs");
var path = require("path");

config();

//To process request body data
app.use(bodyParser.json());

//This will log all the requests
app.use(morgan("dev"));

//Checking DB connection here
db.once("open", function () {
  Logging.info("MongoDB database connection established successfully");
});

// log all requests to access.log
app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "logs/access.log"), {
      flags: "a",
    }),
  })
);

// routes
app.use("/api", routes);

//This middleware throws error if end point/url not found
app.use((req: Request, res: Response, next: NextFunction) => {
  Logging.warning("URL not found");
  next(new createHttpError.NotFound("URL not found"));
});

//This middleware handles application error
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  res.status(error.status || 500);
  res.send({ status: error.status || 500, message: error.message });
};

app.use(errorHandler);

app.listen(PORT, () => {
  Logging.info(`Server running on PORT :${PORT}`);
});
