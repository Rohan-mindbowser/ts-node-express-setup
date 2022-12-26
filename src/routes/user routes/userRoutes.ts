import { Router } from "express";
import {
  addUser,
  getUser,
  loginUser,
  paginatedUsers,
} from "../../controller/userController";
import { verifyAccessToken } from "../../helper/jwt helper/jwtHelper";
import { paginatedResults } from "../../middleware/common/commonMiddleware";
import { User } from "../../models/user.model";

export const userRoute = Router();

userRoute.post("/adduser", addUser);
userRoute.get("/getuser", verifyAccessToken, getUser);
userRoute.get("/loginuser", loginUser);
userRoute.get("/paginatedusers", verifyAccessToken,paginatedResults(User), paginatedUsers);
