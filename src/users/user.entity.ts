import { hash } from 'bcryptjs';

export class User {
  private _password: string;

  constructor(private _name: string, private _email: string) {}

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  async setPassword(password: string): Promise<void> {
    this._password = await hash(password, 10);
  }
}
