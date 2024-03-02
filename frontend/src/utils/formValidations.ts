import { validatePassword as validateInputPassword } from "./fieldValidations";

export const validateEmail = (email: string) => {
  if (!email.toString().includes("@")) return false;
  return true;
};

export const validateCPF = (cpf: string) => {
  const same_digit_cpf = new Set(cpf);
  if (same_digit_cpf.size === 1) return false;
  if (cpf.length !== 11) return false;
  return true;
};

export const validatePhone = (phone: string) => {
  return true;
};

export const validatePassword = (
  password: string,
  passwordConfirmation: string
) => {
  /* 
  Password field has an external validation function implemented on the password input field at /register/ url (from where this password data is coming)
  We make use of the same code in order to keep integrity between both rules
  */
  let errorCounter = 0;
  const errors = validateInputPassword(password);
  for (let index = 0; index < errors.length; index++) {
    errorCounter += errors[index][1];
  }
  if (errorCounter > 0) return false;
  if (password !== passwordConfirmation) return false;
  return true;
};
