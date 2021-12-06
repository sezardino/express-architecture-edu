import { ExceptionFilter } from "./errors/exception.filter";
import { App } from "./app";
import { LoggerService } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";

async function bootstrap() {
  const logger = new LoggerService();
  const exceptionFilter = new ExceptionFilter(logger);
  const app = new App(logger, new UsersController(logger), exceptionFilter);
  await app.init();
}

bootstrap();
