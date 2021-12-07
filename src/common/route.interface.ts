import { Request, Response, NextFunction, Router } from 'express';
import { IMiddleware } from './middleware.interface';

export interface IControllerRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'delete' | 'get' | 'post' | 'put' | 'patch'>;
  middlewares?: IMiddleware[];
}
