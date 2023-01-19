import { Router } from "express";
import { allEmployeeControllers } from "../../controller/employeController/employeControllers";

export const employeeRoute = Router();

employeeRoute.post("/addemployee", allEmployeeControllers.addEmployee);
employeeRoute.get("/get-all-manager");
employeeRoute.patch("/update-manager");
