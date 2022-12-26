import { Response } from "express";

export interface RequestWithPagination extends Response {
  paginatedResults?: any;
}
