import { injectable } from 'inversify';
import 'reflect-metadata';

import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserService } from './user.service.interface';
import { User } from './user.entity';

@injectable()
export class UserService implements IUserService {
  async createUser({ email, password, name }: UserRegisterDto): Promise<User | null> {
    const user = new User(email, name);
    await user.setPassword(password);

    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return false;
  }
}
