import { TYPES } from './../types';
import { inject, injectable } from 'inversify';
import { UserModel } from '.prisma/client';
import 'reflect-metadata';

import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserService } from './user.service.interface';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';

@injectable()
export class UserService implements IUserService {
  constructor(@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository) {}

  async createUser({ email, password, name }: UserRegisterDto): Promise<UserModel | null> {
    const user = new User(name, email);
    await user.setPassword(password);
    const existingUser = await this.usersRepository.find(email);

    if (existingUser) {
      return null;
    }

    return await this.usersRepository.create(user);
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return false;
  }
}
