import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Server } from 'http';
import 'reflect-metadata';

import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { UsersController } from './users/users.controller';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.IUsersController) private usersController: UsersController,
    @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
  ) {
    this.app = express();
    this.port = 8000;
  }

  private useRoutes(): void {
    this.app.use('/users', this.usersController.router);
  }

  private useExceptions(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public init(): void {
    this.useRoutes();
    this.useExceptions();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server started on http://localhost:${this.port}`);
  }
}
