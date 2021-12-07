import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsEmail({}, { message: 'Wrong email' })
  email: string;

  @IsString({ message: 'Password field is required' })
  password: string;

  @IsString({ message: 'Name field is required' })
  name: string;
}
