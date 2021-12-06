import express, { Express } from "express";
import { Server } from "http";
import "reflect-metadata";

import { ILogger } from "./logger/logger.interface";
import { UsersController } from "./users/users.controller";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { IExceptionFilter } from "./errors/exception.filter.interface";

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UsersController) private usersController: UsersController,
    @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter
  ) {
    this.app = express();
    this.port = 8000;
  }

  private useRoutes() {
    this.app.use("/users", this.usersController.router);
  }

  private useExceptions() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public init() {
    this.useRoutes();
    this.useExceptions();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server started on http://localhost:${this.port}`);
  }
}
