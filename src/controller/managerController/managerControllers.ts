import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { postgresDb } from "../../config/pgDbConnection";
import { validateManagerSchema } from "../../helper/validate schema/validateSchema";
import moment from "moment";
const bcrypt = require("bcrypt");

export const allManagerControllers = {
  addManager: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validManager = await validateManagerSchema.validateAsync(req.body);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(validManager.password, salt);
      const [mid] = await postgresDb("managers")
        .insert({
          name: validManager.name,
          email: validManager.email,
          password: hashedPassword,
        })
        .returning("mid");
      res.status(201).send({
        message: "Manager added..!!",
        success: true,
        manager_id: mid,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getAllManager: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allManagers = await postgresDb.select().from("managers");
      res.status(200).send({
        status: 200,
        data: allManagers.length !== 0 ? allManagers : "No Managers found",
      });
    } catch (error) {
      next(createError(500, "Something went wrong"));
    }
  },
  updateManager: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let timeStamp = moment().format();
      console.log(timeStamp);
      await postgresDb("managers")
        .where({
          mid: req.body.mid,
        })
        .update({
          name: req.body.name,
          updated_at: timeStamp,
        });
      res.status(200).send({
        status: 200,
        message: "Update success..!",
      });
    } catch (error) {
      next(createError(500, "Something went wrong"));
    }
  },
};
