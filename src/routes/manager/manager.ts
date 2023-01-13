import { Router } from "express";
import { allManagerControllers } from "../../controller/managerController/managerControllers";

export const managerRoute = Router();

managerRoute.post("/addmanager", allManagerControllers.addManager);
