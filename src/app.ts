import express, {
  Request,
  Response,
  NextFunction,
  Application,
  ErrorRequestHandler,
} from "express";
import createHttpError from "http-errors";
import { config } from "dotenv";
var morgan = require("morgan");
var fs = require("fs");
var path = require("path");

config();

const PORT: Number = Number(process.env.PORT) || 3000;
const app: Application = express();

//This will log all the requests
app.use(morgan("common"));

// log all requests to access.log
app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "logs/access.log"), {
      flags: "a",
    }),
  })
);

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello from server..");
});

//This middleware throws error if end point/url not found
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound("URL not found"));
});

//This middleware handles application error
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  res.status(error.status || 500);
  res.send({ status: error.status || 500, message: error.message });
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
