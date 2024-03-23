import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { RegisterAuthDTO } from "../src/auth/dto/register-auth.dto";
import { Privileges } from "../src/user/enum/privilege.enum";

const authRegisterDTO: RegisterAuthDTO = {
  firstName: "John",
  lastName: "Doe",
  birthAt: "2001-04-25",
  cpf: "78310692080",
  phone: "11998802233",
  email: "johndoe@email.com",
  password: "P@ssw0rd",
  privileges: 2,
  privacyPolicy: true,
};

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let jwt: string;
  let userId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it("registers a user", async () => {
    const response = await request(app.getHttpServer())
      .post("/api/auth/register")
      .send(authRegisterDTO);
    expect(response.statusCode).toEqual(201);
    expect(response.body.status).toEqual("success");
  });

  it("login user with email", async () => {
    const response = await request(app.getHttpServer())
      .post("/api/auth/login")
      .send({
        login: authRegisterDTO.email,
        password: authRegisterDTO.password,
      });
    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.jwt).toEqual("string");

    jwt = response.body.jwt;
  });

  it("login user with cpf", async () => {
    const response = await request(app.getHttpServer())
      .post("/api/auth/login")
      .send({
        login: authRegisterDTO.cpf,
        password: authRegisterDTO.password,
      });
    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.jwt).toEqual("string");

    jwt = response.body.jwt;
  });

  it("Extract user data", async () => {
    const response = await request(app.getHttpServer())
      .post("/api/auth/user-data")
      .set("Authorization", `bearer ${jwt}`)
      .send();
    expect(response.statusCode).toEqual(201);

    // These must not be sent to the frontend
    expect(response.body.password).toBeUndefined();
    expect(response.body.createdAt).toBeUndefined();
    expect(response.body.updatedAt).toBeUndefined();
    expect(response.body.privacyPolicy).toBeUndefined();

    // Pipe test: id casting from string to number
    expect(typeof response.body.id).toEqual("number");

    // Security test: privileges is not supposed to be chosen by the user
    expect(response.body.privileges).toEqual(Privileges.User);
  });
});
