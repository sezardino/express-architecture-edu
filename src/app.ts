import { UsersController } from "./users/users.controller";
import express, { Express } from "express";
import { Server } from "http";
import { LoggerService } from "./logger/logger.service";
import { ExceptionFilter } from "./errors/exception.filter";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;
  usersController: UsersController;
  exceptionFilter: ExceptionFilter;

  constructor(
    logger: LoggerService,
    userController: UsersController,
    exceptionFilter: ExceptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.usersController = userController;
    this.exceptionFilter = exceptionFilter;
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
    console.log(`Server started on http://localhost:${this.port}`);
  }
}
