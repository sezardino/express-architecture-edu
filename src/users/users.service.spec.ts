import { Container } from 'inversify';
import 'reflect-metadata';
import { IConfigService } from '../config/config.interface';
import { TYPES } from '../types';
import { IUserService } from './user.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { UserService } from './user.service';
import { UserModel } from '.prisma/client';
import { User } from './user.entity';

const ConfigServiceMock: IConfigService = {
  get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
  create: jest.fn(),
  find: jest.fn(),
};

const passwordMock = '1';
const idMock = 1;
const notPasswordMock = '2';
const userMock = {
  email: 'test@mail.com',
  name: 'name',
  password: passwordMock,
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
  container.bind<IUserService>(TYPES.IUserService).to(UserService);
  container.bind<IConfigService>(TYPES.IConfigService).toConstantValue(ConfigServiceMock);
  container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

  configService = container.get<IConfigService>(TYPES.IConfigService);
  usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
  usersService = container.get<IUserService>(TYPES.IUserService);
});

describe('[UserService] Create user', () => {
  it('Create User when can create', async () => {
    usersRepository.create = jest.fn().mockImplementationOnce((user: UserModel) => ({
      name: user.name,
      email: user.email,
      password: user.password,
      id: idMock,
    }));

    const createdUser = await usersService.createUser(userMock);

    expect(createdUser?.id).toEqual(idMock);
    expect(createdUser?.password).not.toEqual(passwordMock);
  });

  it("Don't create new user, if founded in db", async () => {
    usersRepository.find = jest.fn().mockReturnValueOnce(true);

    const createdUser = await usersService.createUser(userMock);

    expect(createdUser).toBeNull();
  });
});

describe('[UsersService] Validate user', () => {
  it('Return null when find user in db', async () => {
    usersRepository.find = jest.fn().mockReturnValueOnce(false);

    const userValidation = await usersService.validateUser(userMock);

    expect(userValidation).toBeNull();
  });

  it('Return false, when password not match', async () => {
    const user = new User(userMock.name, userMock.email);
    await user.setPassword(userMock.password);
    usersRepository.find = jest.fn().mockReturnValueOnce(user);

    const userValidation = await usersService.validateUser({
      email: userMock.email,
      password: notPasswordMock,
    });

    expect(userValidation).toBeFalsy();
  });

  it('Return user, when everything is ok', async () => {
    const user = new User(userMock.name, userMock.email);
    await user.setPassword(userMock.password);
    usersRepository.find = jest.fn().mockReturnValueOnce(user);

    const returnedUser = await usersService.validateUser(userMock);

    expect(returnedUser).toEqual(user);
  });

  describe('[UsersService] get user', () => {
    it('return user', async () => {
      const user = new User(userMock.name, userMock.email);
      await user.setPassword(userMock.password);
      usersRepository.find = jest.fn().mockReturnValueOnce(user);

      const returnedUser = await usersService.getUser(userMock.email);

      expect(returnedUser).toEqual(user);
    });
  });
});
