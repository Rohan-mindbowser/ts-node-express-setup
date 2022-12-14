const JWT = require("jsonwebtoken");
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
      expiresIn: "1m",
      issuer: "node_backend",
      audience: String(user._id),
    };
    JWT.sign(payload, privateKey, options, (err: any, token: any) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
};
