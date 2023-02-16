import { Request, Response, NextFunction } from "express";
import { User as userModel } from "../models/user.model";
import createError from "http-errors";
import { validateSchema } from "../helper/validate schema/validateSchema";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helper/jwt helper/jwtHelper";
import { RequestWithPagination } from "../types/response types";
import { createClient } from "redis";
import axios from "axios";

const redisClient = createClient();

const DEFAULT_EXPIRATION_TIME = 3600;

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
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    res.status(201).send({
      message: "Signup success..!!",
      success: true,
      accessToken,
      refreshToken,
    });
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

/**This controller validates the user login */
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validUser = await validateSchema.validateAsync(req.body);
    const user = await userModel.findOne({ email: validUser.email });
    if (!user) throw createError.NotFound("User not found");
    if (user.password !== validUser.password)
      throw createError.BadRequest("Invalid email/password");
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    res.send({ success: true, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

/**THIS controller returns paginated users based on the limit and skip */
export const paginatedUsers = async (
  req: Request,
  res: RequestWithPagination,
  next: NextFunction
) => {
  try {
    res.json(res.paginatedResults);
  } catch (error) {
    next(error);
  }
};

/**This controller handles photo upload */
export const uploadPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("upload done");
  } catch (error) {
    next(error);
  }
};

/**This controller returns fake json data using redis */
export const redisPhotos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await redisClient.get("photos");

    if (value) {
      console.log("Redis hit");
      res.send(JSON.parse(value));
      return;
    }
    console.log("Redis miss");

    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos"
    );
    redisClient.setEx("photos", DEFAULT_EXPIRATION_TIME, JSON.stringify(data));
    res.send(data);
  } catch (error) {
    next(error);
  }
};
