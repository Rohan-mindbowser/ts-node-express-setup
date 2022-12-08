import express, {
  Request,
  Response,
  NextFunction,
  Application,
  ErrorRequestHandler,
} from "express";
import createHttpError from "http-errors";
import { config } from "dotenv";

config();

const PORT: Number = Number(process.env.PORT) || 3000;
const app: Application = express();

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello from server..");
});

//This middleware throws error if end point/url not found
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound());
});

//This middleware handles appilcation error
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  res.status(error.status || 500);
  res.send({ status: error.status || 500, message: error.message });
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
