export class IdentifyCPF {
  private cpf: string;
  private valid: boolean;

  constructor(cpf: string) {
    this.cpf = cpf;
    this.valid = this.checkCPF(cpf);
  }

  get CPF() {
    return this.cpf;
  }

  get isValid() {
    return this.valid;
  }

  checkCPF(cpf: string) {
    if (cpf.replace(/\D/, "").length !== 11) return false;
    if (new Set(cpf).size === 1) return false;
    if (
      Number(cpf[9]) ===
        IdentifyCPF.generateVerificationDigit(cpf.slice(0, 9)) &&
      Number(cpf[10]) ===
        IdentifyCPF.generateVerificationDigit(cpf.slice(0, 10))
    )
      return true;
    return false;
  }

  maskCPF() {
    return (
      this.CPF.slice(0, 3) +
      "." +
      this.CPF.slice(3, 6) +
      "." +
      this.CPF.slice(6, 9) +
      "-" +
      this.CPF.slice(9)
    );
  }

  static generateVerificationDigit(baseNumbers: string) {
    let rest =
      baseNumbers
        .split("")
        .map((stringDigit: string) => Number(stringDigit))
        .reverse()
        .reduce((prev: number, digit: number, index: number) => {
          return digit * Math.abs(index - 9) + prev;
        }, 0) % 11;
    return rest === 10 ? 0 : rest;
  }
}
