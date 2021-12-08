import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { ILogger } from './../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class PrismaService {
  client: PrismaClient;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.logger.log('[PrismaService] successfully connected to database');
    } catch (error) {
      if (error instanceof Error)
        this.logger.error(`[PrismaService] problem with connection to database (${error.message})`);
    }
  }

  async disconect(): Promise<void> {
    await this.client.$disconnect();
  }
}
