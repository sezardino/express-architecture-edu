import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { IMiddleware } from './middleware.interface';

export class RouteGuardMiddleware implements IMiddleware {
  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.user) {
      return next();
    } else {
      return next(new HTTPError(422, 'Not authorized'));
    }
  }
}
