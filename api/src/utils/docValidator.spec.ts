import { CNPJValidator, CPFValidator } from "./docValidator";

const listOfValidCPFs = [
  "91713487004",
  "66572493067",
  "65646954037",
  "11817067001",
  "95463953074",
  "50683287079",
  "55014890075",
  "11029729085",
  "44777350061",
  "85052702078",
];

const listOfValidCNPJs = [
  "34633691000182",
  "92091888000133",
  "09414357000190",
  "11676036000106",
  "02248702000114",
  "49740047000180",
  "91041850000193",
  "59659556000137",
  "49323592000171",
  "20687337000126",
];

describe("Testing docValidator.ts", () => {
  // ------------------------------=====CPF=====------------------------------
  test("CPFValidator validates CPF correctly", () => {
    listOfValidCPFs.map((cpf) => {
      const cpfObj = new CPFValidator(cpf);
      expect(cpfObj.cpf).toEqual(cpf);
      expect(cpfObj.isValid).toBeTruthy();
    });
  });

  test("CPFValidator recreates a valid CPF based on a substring", () => {
    listOfValidCPFs.map((cpf) => {
      const fragment = cpf.slice(0, 9);
      const reconstructedCPF = CPFValidator.constructCPF(fragment);
      expect(reconstructedCPF).toEqual(cpf);
    });
  });

  test("CPFValidator validates CPF validation digits correctly", () => {
    listOfValidCPFs.map((cpf) => {
      const fragment = cpf.slice(0, 9);
      const firstValidDigit = CPFValidator.genValidCPFDigits(fragment);
      const secondValidDigit = CPFValidator.genValidCPFDigits(
        fragment + firstValidDigit
      );
      expect(firstValidDigit).toEqual(cpf[9]);
      expect(secondValidDigit).toEqual(cpf[10]);
    });
  });

  // ------------------------------=====CNPJ=====------------------------------
  test("CNPJValidator returns true for each cnpj in a list of valid CNPJs", () => {
    listOfValidCNPJs.map((cnpj) => {
      const cnpjObj = new CNPJValidator(cnpj);
      expect(cnpjObj.cnpj).toEqual(cnpj);
      expect(cnpjObj.isValid).toBeTruthy();
    });
  });

  test("CNPJValidator recreates a valid CNPJ based on a substring", () => {
    listOfValidCNPJs.map((cnpj) => {
      const fragment = cnpj.slice(0, 12);
      const reconstructedCNPJ = CNPJValidator.constructCNPJ(fragment);
      expect(reconstructedCNPJ).toEqual(cnpj);
    });
  });

  test("CNPJValidator validates CNPJ validation digits correctly", () => {
    listOfValidCNPJs.map((cnpj) => {
      const fragment = cnpj.slice(0, 12);
      const firstValidDigit = CNPJValidator.genValidCNPJDigits(fragment);
      const secondValidDigit = CNPJValidator.genValidCNPJDigits(
        fragment + firstValidDigit
      );
      expect(firstValidDigit).toEqual(cnpj[12]);
      expect(secondValidDigit).toEqual(cnpj[13]);
    });
  });
});
