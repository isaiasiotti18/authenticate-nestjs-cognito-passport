/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let spyService: UsersService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        findAll: jest.fn(() => []),
        findOne: jest.fn(() => {}),
        findByEmail: jest.fn(() => {}),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, ApiServiceProvider],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    spyService = app.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('calling findAll method', () => {
    usersController.findAll();
    expect(spyService.findAll).toHaveBeenCalled();
  });

  it('calling find FindOne method', () => {
    usersController.findOne(5879);
    expect(spyService.findOne).toHaveBeenCalled();
  });

  it('calling find FindByEmail method', () => {
    usersController.findByEmail('isaiasiotti@gmail.com');
    expect(spyService.findByEmail).toHaveBeenCalled();
  });
});
