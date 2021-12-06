import { NextFunction, Request, Response } from "express";
import { HTTPError } from "./http-error.class";

export interface IExceptionFilter {
  catch: (
    error: Error | HTTPError,
    request: Request,
    response: Response,
    next: NextFunction
  ) => void;
}
