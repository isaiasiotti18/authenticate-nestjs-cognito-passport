import { CreateUserDto } from './../dto/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { Prisma } from '@prisma/client';

class ApiServiceMock {
  create(dto: any) {
    return [];
  }

  findAll() {
    return [];
  }

  findOne() {
    return [];
  }
  deleteNote(id: string) {
    return null;
  }
  updateNote(id: string, dto: any) {
    return [];
  }
}

describe.only('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UsersService,
      useClass: ApiServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, ApiServiceProvider],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should call create method with expected params', async () => {
    const createNoteSpy = jest.spyOn(service, 'create');
    const dto = new CreateUserDto();
    service.create(dto);
    expect(createNoteSpy).toHaveBeenCalledWith(dto);
  });

  it('should call findOne method with expected param', async () => {
    const findOne = jest.spyOn(service, 'findOne');
    const findOneOptions: Prisma.UserWhereUniqueInput = {};
    service.findOne({});
    expect(findOne).toHaveBeenCalledWith(findOneOptions);
  });
});
