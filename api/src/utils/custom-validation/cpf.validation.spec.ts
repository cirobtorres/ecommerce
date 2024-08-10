import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateUserDTO } from "../../user/dtos/person-update.dto";

describe("CPF class-validator", () => {
  it("UpdateUserDTO raises error for invalid CPF", async () => {
    const invalidCPFs = [
      { cpf: "22222222222" },
      { cpf: "1" },
      { cpf: "12345678900" },
      { cpf: 18901800098 },
      { cpf: "733.336.430-57" },
    ];

    invalidCPFs.map(async (cpf) => {
      const updateUserDTO = plainToInstance(UpdateUserDTO, { cpf });
      const errors = await validate(updateUserDTO);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain("Invalid CPF");
    });
  });

  it("UpdateUserDTO pass the test for valid CPF", async () => {
    const updateUserDTO = plainToInstance(UpdateUserDTO, {
      cpf: "57943186001",
    });
    const errors = await validate(updateUserDTO);
    expect(errors.length).toBe(0);
  });
});
