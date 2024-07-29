import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { UserPersonService } from "./user-person.service";
import { SupabaseModule } from "../supabase/supabase.module";
import { SUPABASE_CLIENT } from "../utils/constants/supabase.constants";

const mockSupabaseClient = {
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  single: jest.fn().mockResolvedValue({ data: null, error: null }),
  insert: jest.fn().mockResolvedValue({ data: [], error: null }),
  update: jest.fn().mockResolvedValue({ data: [], error: null }),
};

export const mockedUser = {
  id: "344cf838-492b-45d3-9d7d-fd4ab93b140b",
  email: "johndoe@email.com",
  phone: "11999881156",
  privileges: 1,
  active: true,
  email_verified: false,
  last_login: null,
  user_type: "F",
  avatar_id: null,
  created_at: "2024-07-28 01:17:36.006637+00",
  updated_at: "2024-07-28 01:17:36.006637+00",
  allow_sms: false,
  allow_email: false,
  person_data: {
    name: "John Doe",
    cpf: "75408806006",
    birth_date: "2002-01-22",
    gender: "M",
    rg: null,
  },
};

describe("Testing user-person.service.ts", () => {
  let userPersonService: UserPersonService;

  beforeAll(() => {});

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPersonService,
        {
          provide: SUPABASE_CLIENT,
          useValue: mockSupabaseClient,
        },
      ],
      imports: [
        SupabaseModule,
        ConfigModule.forRoot({
          envFilePath: ".env",
        }),
      ],
    }).compile();
    userPersonService = module.get<UserPersonService>(UserPersonService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  afterAll(() => {});

  it("Expects the provider to be initialized", () => {
    expect(userPersonService).toBeDefined();
  });

  it("Expects retrieveById method to retrieve user data successfully", async () => {
    mockSupabaseClient.single.mockResolvedValue({
      data: mockedUser,
      error: null,
    });

    const userId = "344cf838-492b-45d3-9d7d-fd4ab93b140b";
    const user = await userPersonService.retrieveById(userId);

    expect(user).toEqual(mockedUser);
    expect(mockSupabaseClient.from).toHaveBeenCalledWith("users");
    expect(mockSupabaseClient.eq).toHaveBeenCalledWith("id", userId);
    expect(mockSupabaseClient.select).toHaveBeenCalledWith(
      "*, person_data (name, gender, cpf, rg, birth_date), avatars (secure_url), addresses (id)"
    );
    expect(mockSupabaseClient.single).toHaveBeenCalledWith();
  });

  it("Expects retrieveByEmail method to retrieve user data successfully", async () => {
    mockSupabaseClient.single({
      data: mockedUser,
      error: null,
    });

    const userEmail = "johndoe@email.com";
    const user = await userPersonService.retrieveByEmail(userEmail);

    expect(user).toEqual(mockedUser);
    expect(mockSupabaseClient.from).toHaveBeenCalledWith("users");
    expect(mockSupabaseClient.eq).toHaveBeenCalledWith("email", userEmail);
    expect(mockSupabaseClient.select).toHaveBeenCalledWith(
      "*, person_data (name, gender, cpf, rg, birth_date), avatars (secure_url), addresses (id)"
    );
    expect(mockSupabaseClient.single).toHaveBeenCalledWith();
  });

  it("Expects retrieveByCPF method to retrieve user data successfully", async () => {
    mockSupabaseClient.single({
      data: mockedUser,
      error: null,
    });

    const userCPF = "johndoe@email.com";
    const user = await userPersonService.retrieveByCPF(userCPF);

    expect(user).toEqual(mockedUser);
    expect(mockSupabaseClient.from).toHaveBeenCalledWith("person_data");
    expect(mockSupabaseClient.eq).toHaveBeenCalledWith("cpf", userCPF);
    expect(mockSupabaseClient.select).toHaveBeenCalledWith("*");
    expect(mockSupabaseClient.single).toHaveBeenCalledWith();
  });

  it("Expects create method to run successfully", async () => {
    const { email, phone } = mockedUser;
    const { name, cpf, rg, gender, birth_date } = mockedUser.person_data;
    const password = "P@ssw0rd";

    jest
      .spyOn(userPersonService, "retrieveByEmail")
      .mockResolvedValueOnce(null);

    jest.spyOn(userPersonService, "retrieveByCPF").mockResolvedValueOnce(null);

    mockSupabaseClient.from("users").insert.mockReturnValue({
      single: jest.fn().mockResolvedValue({
        data: { id: "new-user-id", ...mockedUser },
      }),
    });

    const user = await userPersonService.create({
      email,
      phone,
      password,
      name,
      cpf,
      rg,
      gender,
      birth_date,
    });

    expect(user).toEqual({ message: "User created successfully" });
    expect(mockSupabaseClient.from).toHaveBeenCalledWith("users");
    expect(mockSupabaseClient.insert).toHaveBeenCalledWith([
      {
        email,
        password: expect.any(String), // Hashed
        phone,
        privileges: 1,
        user_type: "F",
      },
    ]);
    expect(mockSupabaseClient.from).toHaveBeenCalledWith("person_data");
    expect(mockSupabaseClient.insert).toHaveBeenLastCalledWith([
      {
        user_id: expect.any(String), // uuid
        name,
        cpf,
        rg,
        gender,
        birth_date,
      },
    ]);
  });

  it("Expects update to update 'user' successfully", async () => {
    const userId = mockedUser.id;

    mockSupabaseClient.from.mockReturnValue({
      update: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ error: null }),
      }),
    });

    const response = await userPersonService.update(userId, {
      phone: "19999553341",
    });

    expect(response).toEqual({ message: "User updated successfully" });
    expect(mockSupabaseClient.from).toHaveBeenCalledWith("users");
    expect(mockSupabaseClient.from).not.toHaveBeenCalledWith("person_data");
  });

  it("Expects update to update 'person_data' successfully", async () => {
    const userId = mockedUser.id;

    mockSupabaseClient.from.mockReturnValue({
      update: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ error: null }),
      }),
    });

    const response = await userPersonService.update(userId, {
      name: "JohnDoe",
      cpf: "05628522040",
      gender: "F",
      rg: "12345678900",
    });

    expect(response).toEqual({ message: "User updated successfully" });
    expect(mockSupabaseClient.from).not.toHaveBeenCalledWith("users");
    expect(mockSupabaseClient.from).toHaveBeenCalledWith("person_data");
  });

  it("Expects update to update both 'user' and 'person_data' successfully", async () => {
    const userId = mockedUser.id;

    mockSupabaseClient.from.mockReturnValue({
      update: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ error: null }),
      }),
    });

    const response = await userPersonService.update(userId, {
      phone: "19999553341",
      name: "JohnDoe",
      cpf: "05628522040",
      gender: "F",
      rg: "12345678900",
    });

    expect(response).toEqual({ message: "User updated successfully" });
    expect(mockSupabaseClient.from).toHaveBeenCalledWith("users");
    expect(mockSupabaseClient.from).toHaveBeenCalledWith("person_data");
  });

  it("Expects update to keep 'user' unchanged despite not sending any data", async () => {
    const userId = mockedUser.id;

    const response = await userPersonService.update(userId, {});

    expect(response).toEqual({ message: "User updated successfully" });
    expect(mockSupabaseClient.from).not.toHaveBeenCalled();
  });

  it("Expects updateLastLogin to run successfully", async () => {
    const userId = mockedUser.id;

    mockSupabaseClient.from.mockReturnValue({
      update: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ error: null }),
      }),
    });

    const response = await userPersonService.updateLastLogin(userId);

    expect(response).toEqual({
      message: "User last_login updated successfully",
    });
    expect(mockSupabaseClient.from).toHaveBeenCalledWith("users");
    expect(mockSupabaseClient.from).not.toHaveBeenCalledWith("person_data");
  });
});
