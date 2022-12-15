import { Router } from "express";
import { addUser, getUser, loginUser } from "../../controller/userController";
import { verifyAccessToken } from "../../helper/jwt helper/jwtHelper";

export const userRoute = Router();

userRoute.post("/adduser", addUser);
userRoute.get("/getuser", verifyAccessToken, getUser);
userRoute.get("/loginuser", loginUser);
