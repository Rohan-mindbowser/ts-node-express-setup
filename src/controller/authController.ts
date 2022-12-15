import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../helper/jwt helper/jwtHelper";

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);
    const newAccessToken = await generateAccessToken({ _id: userId });
    const newRefreshToken = await generateRefreshToken({ _id: userId });
    res.send({ newAccessToken, newRefreshToken });
  } catch (error) {
    next(error);
  }
};
