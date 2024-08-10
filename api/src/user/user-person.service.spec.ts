import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { UserPersonService } from "./user-person.service";
import { SupabaseModule } from "../supabase/supabase.module";
import { SUPABASE_CLIENT } from "../utils/constants/supabase.constants";

const mockSupabaseClient = {};

export const mockedUser = {};

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
});
