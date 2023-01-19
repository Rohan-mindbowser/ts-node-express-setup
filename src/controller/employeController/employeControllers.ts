import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { postgresDb as knex } from "../../config/pgDbConnection";
import { validateManagerSchema } from "../../helper/validate schema/validateSchema";
import moment from "moment";
const bcrypt = require("bcrypt");

export const allEmployeeControllers = {
  addEmployee: async (req: Request, res: Response, next: NextFunction) => {
    const trx = await knex.transaction();
    try {
      const [eid] = await trx("employes")
        .insert({
          name: req.body.name,
          email: req.body.email,
          mid: req.body.mid,
        })
        .returning("eid");
      await trx.commit();
      res.status(201).send({
        message: "Employee added..!!",
        success: true,
        employee_id: eid,
      });
    } catch (error) {
      trx.rollback();
      next(createError(500, "Something went wrong"));
    }
  },
};
