import express, { Express } from "express";
import { Server } from "http";

export class App {
  app: Express;
  server: Server;
  port: number;

  constructor() {
    this.app = express();
    this.port = 8000;
  }

  private useRoutes() {}

  public init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    console.log(`Server started on http://localhost:${this.port}`);
  }
}
