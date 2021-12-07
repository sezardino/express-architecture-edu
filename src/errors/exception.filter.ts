import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { LoggerService } from '../logger/logger.service';
import { TYPES } from '../types';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error.class';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: LoggerService) {}

  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof HTTPError) {
      this.logger.error(
        `[${err.statusCode}] Error ${err.message}: ${err.context ? err.context : ''}`,
      );
      res.status(err.statusCode).send({ err: err.message });
    } else {
      res.status(500).send({ err: err.message });
    }
  }
}
