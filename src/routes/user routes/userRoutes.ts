import { Router } from "express";
import { addUser, getUser, loginUser } from "../../controller/userController";

export const userRoute = Router();

userRoute.post("/adduser", addUser);
userRoute.get("/getuser", getUser);
userRoute.get("/loginuser", loginUser);
