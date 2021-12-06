import { UsersController } from './users/users.controller';
import express, { Express } from "express";
import { Server } from "http";
import { LoggerService } from "./logger/loger.service";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;
  usersController: UsersController;

  constructor(logger: LoggerService, userController: UsersController) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.usersController = userController;
  }

  private useRoutes() {
    this.app.use('/users', this.usersController.router)
  }

  public init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    console.log(`Server started on http://localhost:${this.port}`);
  }
}
