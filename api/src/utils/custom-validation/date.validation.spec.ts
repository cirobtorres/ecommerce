import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateUserDTO } from "../../user/dtos/user-update.dto";

describe("Birth-date class-validator", () => {
  it("UpdateUserDTO raises error for invalid birth_dates", async () => {
    const invalidBirthDates = [
      { birth_date: "2005-02-29" },
      { birth_date: "1999/02/29" },
      { birth_date: "2024/01/32" },
      { birth_date: "2024-02-30" },
      { birth_date: "2024/03/32" },
      { birth_date: "2024/04/31" },
      { birth_date: "2024-05-32" },
      { birth_date: "2023/06/31" },
      { birth_date: "2023/07/32" },
      { birth_date: "2023-08-32" },
      { birth_date: "2023/09/31" },
      { birth_date: "2023/10/32" },
      { birth_date: "2023-11-31" },
      { birth_date: "2023/12/32" },
    ];
    invalidBirthDates.map(async (birth_date) => {
      const updateUserDTO = plainToInstance(UpdateUserDTO, birth_date);
      const errors = await validate(updateUserDTO);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain("Invalid date");
    });
  });

  it("UpdateUserDTO pass the test for valid birth_date", async () => {
    const validBirthDates = [
      { birth_date: "2004-02-29" },
      { birth_date: "2000/02/29" },
      { birth_date: "2024/01/31" },
      { birth_date: "2024-02-29" },
      { birth_date: "2024/03/31" },
      { birth_date: "2024/04/30" },
      { birth_date: "2024-05-31" },
      { birth_date: "2023/06/30" },
      { birth_date: "2023/07/31" },
      { birth_date: "2023-08-31" },
      { birth_date: "2023/09/30" },
      { birth_date: "2023/10/31" },
      { birth_date: "2023-11-30" },
      { birth_date: "2023/12/31" },
    ];

    validBirthDates.map(async (birth_date) => {
      const updateUserDTO = plainToInstance(UpdateUserDTO, birth_date);
      const errors = await validate(updateUserDTO);
      expect(errors.length).toBe(0);
    });
  });
});
