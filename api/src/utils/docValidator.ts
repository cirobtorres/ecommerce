export class CPFValidator {
  public cpf: string;
  public isValid: boolean;

  constructor(cpf: string) {
    this.cpf = cpf;
    this.isValid = this.validateCPF(cpf);
  }

  private validateCPF(cpf: string) {
    if (cpf.length !== 11) return false; // CPF.length === 11 ALWAYS
    if (/^(\d)\1+$/.test(cpf)) return false; // CPF of fully identical digits are invalid
    const fragment = cpf.slice(0, 9);
    const firstDigit = CPFValidator.genValidCPFDigits(fragment);
    const secondDigit = CPFValidator.genValidCPFDigits(fragment + firstDigit);
    return cpf[9] === firstDigit && cpf[10] === secondDigit;
  }

  static genValidCPFDigits(substring: string) {
    const length = substring.length;
    switch (length) {
      case 9:
        const sumA = substring.split("").reduce((accum, curr, index, arr) => {
          return accum + Number(curr) * (index + 1);
        }, 0);
        const digitA = String(sumA % 11);
        return digitA === "10" ? "0" : digitA;
      case 10:
        const sumB = substring.split("").reduce((accum, curr, index, arr) => {
          return accum + Number(curr) * index;
        }, 0);
        const digitB = String(sumB % 11);
        return digitB === "10" ? "0" : digitB;
      default:
        throw new Error("Invalid substring");
    }
  }

  static constructCPF(substring: string) {
    const firstDigit = this.genValidCPFDigits(substring);
    const secondDigit = this.genValidCPFDigits(substring + firstDigit);
    return substring + firstDigit + secondDigit;
  }
}

export class CNPJValidator {
  public cnpj: string;
  public isValid: boolean;

  constructor(cnpj: string) {
    this.cnpj = cnpj;
    this.isValid = this.validateCNPJ(cnpj);
  }

  private validateCNPJ(cnpj: string): boolean {
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false;
    const fragment = cnpj.slice(0, 12);
    const firstDigit = CNPJValidator.genValidCNPJDigits(fragment);
    const secondDigit = CNPJValidator.genValidCNPJDigits(fragment + firstDigit);
    return cnpj[12] === firstDigit && cnpj[13] === secondDigit;
  }

  static genValidCNPJDigits(substring: string) {
    const length = substring.length;
    switch (length) {
      case 12:
        const sumA = substring.split("").reduce((accum, curr, index) => {
          if (index > 3) return accum + Number(curr) * (index - 2);
          return accum + Number(curr) * (index + 6);
        }, 0);
        const digitA = String(sumA % 11);
        return digitA === "10" ? "0" : digitA;
      case 13:
        const sumB = substring.split("").reduce((accum, curr, index) => {
          if (index > 4) return accum + Number(curr) * (index - 3);
          return accum + Number(curr) * (index + 5);
        }, 0);
        const digitB = String(sumB % 11);
        return digitB === "10" ? "0" : digitB;
      default:
        throw new Error("Invalid substring");
    }
  }

  static constructCNPJ(substring: string) {
    const firstDigit = this.genValidCNPJDigits(substring);
    const secondDigit = this.genValidCNPJDigits(substring + firstDigit);
    return substring + firstDigit + secondDigit;
  }
}
