import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { ILogger } from '../logger/logger.interface';
import { BaseController } from '../common/base.controller';
import { TYPES } from '../types';
import { IUsersController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(@inject(TYPES.ILogger) loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: '/login', method: 'post', func: this.login },
      { path: '/register', method: 'post', func: this.register },
    ]);
  }

  login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    console.log(req.body);
    res.status(200).send('login');
  }

  register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): void {
    console.log(req.body);
    res.status(200).send('register');
  }
}
