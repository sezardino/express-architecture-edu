import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import { ILogger } from "./../logger/logger.interface";
import { BaseController } from "../common/base.controller";
import { TYPES } from "../types";

@injectable()
export class UsersController extends BaseController {
  constructor(@inject(TYPES.ILogger) loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: "/login", method: "post", func: this.login },
      { path: "/register", method: "post", func: this.register },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    res.status(200).send("login");
  }

  register(req: Request, res: Response, next: NextFunction) {
    res.status(200).send("register");
  }
}
