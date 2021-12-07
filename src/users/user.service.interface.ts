import { User } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

export interface IUserService {
  createUser: (dto: UserRegisterDto) => Promise<User | null>;
  validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
