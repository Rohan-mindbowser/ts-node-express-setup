import express from "express";
import { userRoute } from "./user routes/userRoutes";

export const routes = express.Router();

//All user routes
routes.use(userRoute);
