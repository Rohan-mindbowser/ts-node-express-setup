import express from "express";
import { authRoute } from "./auth/auth";
import { userRoute } from "./user routes/userRoutes";

export const routes = express.Router();

//All user routes
routes.use(userRoute);

//All auth routes
routes.use(authRoute);
