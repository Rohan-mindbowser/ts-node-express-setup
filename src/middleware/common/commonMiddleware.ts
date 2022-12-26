import { Request, NextFunction } from "express";
import { RequestWithPagination } from "../../types/response types";

/**This middleware returns paginated results and this function expectes a model */
export const paginatedResults = (model: any) => {
  return async (
    req: Request,
    res: RequestWithPagination,
    next: NextFunction
  ) => {
    try {
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);

      const results: any = {};

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      if (endIndex < (await model.countDocuments().exec())) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }

      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (error) {
      next(error);
    }
  };
};
