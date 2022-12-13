import { Request, Response, NextFunction } from "express";
import { User as userModel } from "../models/user.model";
import createError from "http-errors";
import { validateSchema } from "../helper/validate schema/validateSchema";

/** This controller adds new user */
export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const emailExist = await userModel.findOne({ email: req.body.email });
    if (emailExist) {
      throw createError.Conflict(
        `${req.body.email} is already been registered`
      );
    }
    const validUser = await validateSchema.validateAsync(req.body);
    const user = await userModel.create(validUser);
    await user.save();
    res.status(201).send({ message: "Signup success..!!", success: true });
  } catch (error) {
    next(error);
  }
};

/** This controller returns single user */
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      res.status(200).json({ data: user, success: true });
      return;
    }
    res.status(404).json({ message: "user not found", success: false });
  } catch (error) {
    next(error);
  }
};
