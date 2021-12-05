import express, { Express } from "express";
import { Server } from "http";
import { LoggerService } from "./logger/loger.service";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
  }

  private useRoutes() {}

  public init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    console.log(`Server started on http://localhost:${this.port}`);
  }
}
