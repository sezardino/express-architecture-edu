import { ValidateMiddleware } from './../common/validate.middleware';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { ILogger } from '../logger/logger.interface';
import { BaseController } from '../common/base.controller';
import { TYPES } from '../types';
import { IUsersController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserService } from './user.service.interface';
import { HTTPError } from '../errors/http-error.class';

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(
    @inject(TYPES.ILogger) loggerService: ILogger,
    @inject(TYPES.IUserService) private userService: IUserService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/login',
        method: 'post',
        func: this.login,
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
      {
        path: '/register',
        method: 'post',
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
    ]);
  }

  async login(
    { body }: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.validateUser(body);

    if (typeof result === 'boolean') {
      return next(new HTTPError(422, 'Password mismatch'));
    }

    if (!result) {
      return next(new HTTPError(422, 'Incorrect data'));
    }

    res.status(200).send('logged correctly');
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.createUser(body);

    if (!result) {
      return next(new HTTPError(422, 'User already exist'));
    }

    res.status(200).send({ result });
  }
}
