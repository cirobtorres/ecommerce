import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateAddressDTO } from "../../address/dtos/address-update.dto";

describe("CEP class-validator", () => {
  it("UpdateAddressDTO raises error for invalid zip_code", async () => {
    const invalidZipCodes = [
      { zip_code: "01.002-020" },
      { zip_code: "01002-020" },
    ];

    invalidZipCodes.map(async (zip_code) => {
      const updateAddressDTO = plainToInstance(UpdateAddressDTO, zip_code);
      const errors = await validate(updateAddressDTO);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain("CEP is invalid");
    });
  });

  it("UpdateAddressDTO pass the test for valid zip_code", async () => {
    const updateAddressDTO = plainToInstance(UpdateAddressDTO, {
      zip_code: "01002020",
    });
    const errors = await validate(updateAddressDTO);
    expect(errors.length).toBe(0);
  });
});
