import { Response, Request } from "express";

export interface RequestWithPagination extends Response {
  paginatedResults?: any;
}

export interface RequestWithFileUpload extends Request {
  file?: any;
}
