import { ILogger } from "./../logger/logger.interface";
import { IControllerRoute } from "./route.interface";
import { Router } from "express";
import { LoggerService } from "../logger/logger.service";
import { injectable } from "inversify";

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: ILogger) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);
      const handler = route.func.bind(this);
      this.router[route.method](route.path, handler);
    }
  }
}
