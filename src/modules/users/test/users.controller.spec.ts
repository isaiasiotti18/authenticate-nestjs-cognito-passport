/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let spyService: UsersService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        create: jest.fn(() => []),
        findAll: jest.fn(() => []),
        findOne: jest.fn(() => {}),
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

  it('calling create method', () => {
    const dto = new CreateUserDto();
    expect(usersController.create(dto)).not.toEqual(null);
  });

  it('calling create method', () => {
    const dto = new CreateUserDto();
    usersController.create(dto);
    expect(spyService.create).toHaveBeenCalled();
    expect(spyService.create).toHaveBeenCalledWith(dto);
  });

  it('calling findAll method', () => {
    usersController.findAll();
    expect(spyService.findAll).toHaveBeenCalled();
  });

  it('calling find FindOne method', () => {
    usersController.findOne(5879);
    expect(spyService.findOne).toHaveBeenCalled();
  });
});
