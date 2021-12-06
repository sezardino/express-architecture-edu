import { Container, ContainerModule, interfaces } from 'inversify';
import 'reflect-metadata';

import { IExceptionFilter } from './errors/exception.filter.interface';
import { ExceptionFilter } from './errors/exception.filter';
import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
  bind<UsersController>(TYPES.IUsersController).to(UsersController);
  bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
