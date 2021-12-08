import { IsString, IsEmail } from 'class-validator';

export class UserLoginDto {
  @IsEmail({}, { message: 'Wrong email' })
  email: string;

  @IsString({ message: 'empty password' })
  password: string;
}
