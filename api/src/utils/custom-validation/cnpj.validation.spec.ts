import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateCompanyDTO } from "../../user/dtos/company-update.dto";

describe("CNPJ class-validator", () => {
  it("UpdateCompanyDTO raises error for invalid CNPJ", async () => {
    const invalidCNPJs = [
      { cnpj: "12345678000199" },
      { cnpj: "1" },
      { cnpj: "72383228000120" },
      { cnpj: 72383228000120 },
      { cnpj: "01.756.606/0001-14" },
    ];

    invalidCNPJs.map(async (cnpj) => {
      const updateCompanyDTO = plainToInstance(UpdateCompanyDTO, { cnpj });
      const errors = await validate(updateCompanyDTO);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain("Invalid CNPJ");
    });
  });

  it("UpdateCompanyDTO pass the test for valid CNPJ", async () => {
    const updateCompanyDTO = plainToInstance(UpdateCompanyDTO, {
      cnpj: "93313120000120",
    });
    const errors = await validate(updateCompanyDTO);
    expect(errors.length).toBe(0);
  });
});
