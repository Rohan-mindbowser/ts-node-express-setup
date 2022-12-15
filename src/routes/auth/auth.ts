import { Router } from "express";
import { refreshTokenController } from "../../controller/authController";

export const authRoute = Router();

authRoute.post("/auth-refreshtoken", refreshTokenController);
