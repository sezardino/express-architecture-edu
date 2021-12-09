import { RouteGuardMiddleware } from './../common/routeGuard.middleware';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { sign } from 'jsonwebtoken';
import 'reflect-metadata';

import { ValidateMiddleware } from '../common/validate.middleware';
import { ILogger } from '../logger/logger.interface';
import { BaseController } from '../common/base.controller';
import { TYPES } from '../types';
import { IUsersController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserService } from './user.service.interface';
import { HTTPError } from '../errors/http-error.class';
import { IConfigService } from '../config/config.interface';

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(
    @inject(TYPES.ILogger) loggerService: ILogger,
    @inject(TYPES.IUserService) private userService: IUserService,
    @inject(TYPES.IConfigService) private configService: IConfigService,
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
      {
        path: '/info',
        method: 'get',
        func: this.info,
        middlewares: [new RouteGuardMiddleware()],
      },
    ]);
  }

  private sign(email: string, secret: string): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(
        { email, iat: Math.floor(Date.now() / 1000) },
        secret,
        { algorithm: 'HS256' },
        (error, token) => {
          if (error) {
            reject(error);
          }
          resolve(token as string);
        },
      );
    });
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

    const token = await this.sign(result.email, this.configService.get('JWT_SECRET'));

    res.status(200).send({ token });
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

  async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
    const neededUser = await this.userService.getUser(user);
    res.status(200).send({ email: neededUser?.email, id: neededUser?.id });
  }
}
