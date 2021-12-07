import { inject, injectable } from 'inversify';
import { config, DotenvParseOutput } from 'dotenv';
import 'reflect-metadata';

import { ILogger } from './../logger/logger.interface';
import { TYPES } from '../types';
import { IConfigService } from './config.interface';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result = config();
    if (result.error) {
      this.logger.error('[ConfigService] Problem with environment variables');
    } else {
      this.logger.log('[ConfigService] Environmental variables successfully added');
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
