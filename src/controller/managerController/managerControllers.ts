import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { postgresDb } from "../../config/pgDbConnection";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helper/jwt helper/jwtHelper";
import { validateManagerSchema } from "../../helper/validate schema/validateSchema";

export const allManagerControllers = {
  addManager: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validManager = await validateManagerSchema.validateAsync(req.body);
      const [mid] = await postgresDb("managers")
        .insert(validManager)
        .returning("mid");
      res.status(201).send({
        message: "Manager added..!!",
        success: true,
        manager_id: mid,
      });
    } catch (error) {
      next(error);
    }
  },
};
