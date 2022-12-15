const JWT = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { Types } from "mongoose";

interface userType {
  _id?: Types.ObjectId | unknown;
  email?: string;
}

export const generateAccessToken = async (user: userType) => {
  return new Promise((resolve, reject) => {
    const payload = {
      _id: user._id,
      email: user.email,
    };
    const privateKey = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "15m",
      issuer: "node_backend",
      audience: String(user._id),
    };
    JWT.sign(payload, privateKey, options, (err: any, token: any) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
};

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers["authorization"]) throw createError.Unauthorized();
    const authToken = req.headers["authorization"];
    const bearerToken = authToken.split(" ");
    const token = bearerToken[1];
    JWT.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err: any, payload: any) => {
        if (err) {
          return next(createError.Unauthorized());
        }
        next();
      }
    );
  } catch (error) {
    next(error);
  }
};

export const generateRefreshToken = async (user: userType) => {
  return new Promise((resolve, reject) => {
    const payload = {
      _id: user._id,
      email: user.email,
    };
    const privateKey = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: "1y",
      issuer: "node_backend",
      audience: String(user._id),
    };
    JWT.sign(payload, privateKey, options, (err: any, token: any) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
};

export const verifyRefreshToken = async (refreshToken: string) => {
  return new Promise((resolve, reject) => {
    JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err: any, payload: any) => {
        if (err) return reject(createError.BadRequest());
        const userId = payload.aud;
        resolve(userId);
      }
    );
  });
};
