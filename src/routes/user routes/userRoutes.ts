import { Router, Request, Response, NextFunction } from "express";
import { User as userModel } from "../../models/user.model";
import createError from "http-errors";

export const userRoute = Router();

interface addUser {
  email: String;
  password: String;
}

userRoute.post(
  "/adduser",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const emailExist = await userModel.findOne({ email: req.body.email });
      if (emailExist) {
        throw createError.Conflict(
          `${req.body.email} is already been registered`
        );
      }
      const user = await userModel.create(req.body);
      await user.save();
      res.status(201).send("Signup success..!!");
    } catch (error) {
      next(error);
    }
  }
);
