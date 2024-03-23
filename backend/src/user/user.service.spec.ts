import { Repository } from "typeorm";
import { UserService } from "./user.service";
import { UserEntity } from "./entity/user.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Privileges } from "./enum/privilege.enum";
import { CreateUserDTO } from "./dto/create-user.dto";

const userEntityList = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@email.com",
    password: "$2b$10$YgjFh54ZMwfWWJRUetAhjuf2BjKpRmFiTIUg8BomB4yHxBrB0PldO",
    cpf: "78310692080",
    phone: "11998802233",
    privacyPolicy: true,
    birthAt: "2001-04-26",
    privileges: Privileges.Admin,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  },
  {
    id: 2,
    firstName: "Mary",
    lastName: "Sue",
    email: "mary.sue@email.com",
    password: "$2b$10$BIObd15J0Egf6/91cxDZoeYkUvn1wFD6DJeVImphxFvYqgA70miAy",
    cpf: "75469588068",
    phone: "45999911234",
    privacyPolicy: true,
    birthAt: "1999-06-18",
    privileges: Privileges.User,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  },
  {
    id: 3,
    firstName: "Wander",
    lastName: "Cleverson",
    email: "wander_cleverson@email.com",
    password: "$2b$10$UGoP/RL6PkX4TNn1vKfnhOxL5wytdDpxRFX337.8Z4CsOePQnd4A6",
    cpf: "41141573016",
    phone: "18988747890",
    privacyPolicy: true,
    birthAt: "2002-09-11",
    privileges: Privileges.User,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  },
];

const userMock: CreateUserDTO = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@email.com",
  password: "P@ssw0rd",
  cpf: "78310692080",
  phone: "11998802233",
  privacyPolicy: true,
  birthAt: "2001-04-26",
  privileges: Privileges.Admin,
};

const userRepositoryMock = {
  provide: getRepositoryToken(UserEntity),
  useValue: {
    create: jest.fn(),
    list: jest.fn().mockResolvedValue(userEntityList),
    retrieve: jest.fn().mockResolvedValue(userEntityList[1]),
    exists: jest.fn().mockResolvedValue(true),
  },
};

describe("user.service.ts", () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();
    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  it("validates database instantiation", () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe("Create", () => {
    it("creates a user during registration", async () => {
      jest.spyOn(userRepository, "exists").mockResolvedValueOnce(false);
      const result = await userService.create(userMock);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe("Read", () => {
    // it("returns a list of users", () => {});
    it("retrieves a single user", async () => {
      const result = await userService.retrieve(1);
      expect(result).toEqual(userEntityList[0]);
    });
  });
});
