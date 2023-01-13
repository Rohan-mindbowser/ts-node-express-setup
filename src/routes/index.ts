import express from "express";
import { authRoute } from "./auth/auth";
import { managerRoute } from "./manager/manager";
import { userRoute } from "./user routes/userRoutes";

export const routes = express.Router();

/**All user routes */
routes.use(userRoute);

/**All auth routes */
routes.use(authRoute);

/**All manager routes */
routes.use(managerRoute);
