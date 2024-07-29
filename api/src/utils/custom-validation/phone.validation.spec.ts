import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateUserDTO } from "../../user/dtos/user-update.dto";

describe("Phone class-validator", () => {
  it("UpdateUserDTO raises error for invalid phones", async () => {
    const invalidPhones = [
      { phone: "998181616" },
      { phone: "99818-1616" },
      { phone: "99818 1616" },
      { phone: "22957663" },
      { phone: "2295-7663" },
      { phone: "(11)22957663" },
      { phone: "(11) 22957663" },
      { phone: "112295-7663" },
      { phone: "11 2295-7663" },
      { phone: "(11)2295-7663" },
      { phone: "(11) 2295-7663" },
    ];

    invalidPhones.map(async (phone) => {
      const updateUserDTO = plainToInstance(UpdateUserDTO, phone);
      const errors = await validate(updateUserDTO);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain("Invalid phone number");
    });
  });

  it("UpdateUserDTO pass the test for valid phone numbers", async () => {
    // DDD is mandatory
    const updateInfo1 = { phone: "11998181616" }; // mobile
    const updateInfo2 = { phone: "1122957663" }; // landline (telefone fixo)
    const updateUserDTO1 = plainToInstance(UpdateUserDTO, updateInfo1);
    const updateUserDTO2 = plainToInstance(UpdateUserDTO, updateInfo2);
    const errors1 = await validate(updateUserDTO1);
    const errors2 = await validate(updateUserDTO2);
    expect(errors1.length).toBe(0);
    expect(errors2.length).toBe(0);
  });
});
