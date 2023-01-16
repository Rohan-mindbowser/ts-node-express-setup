import { Router } from "express";
import { allManagerControllers } from "../../controller/managerController/managerControllers";

export const managerRoute = Router();

managerRoute.post("/addmanager", allManagerControllers.addManager);
managerRoute.get("/get-all-manager", allManagerControllers.getAllManager);
managerRoute.patch("/update-manager", allManagerControllers.updateManager);
