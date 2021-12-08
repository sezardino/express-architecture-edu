import { PrismaService } from './database/prisma.service';
import { IConfigService } from './config/config.interface';
import { Container, ContainerModule, interfaces } from 'inversify';
import 'reflect-metadata';

import { IExceptionFilter } from './errors/exception.filter.interface';
import { ExceptionFilter } from './errors/exception.filter';
import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { IUserService } from './users/user.service.interface';
import { UserService } from './users/user.service';
import { IUsersController } from './users/users.controller.interface';
import { ConfigService } from './config/config.service';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
  bind<IUsersController>(TYPES.IUsersController).to(UsersController);
  bind<IUserService>(TYPES.IUserService).to(UserService);
  bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
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
