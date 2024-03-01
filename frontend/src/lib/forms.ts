"use server";

import {
  validateCPF,
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/functions/formValidations";
import { formatBirth, formatCPF, formatPhone } from "@/functions/formatStrings";
import { fetchLogin, fetchRegister } from "./authentication";
import { signIn } from "next-auth/react";

const isInvalidText = (text: string) => {
  return !text || text.trim() === "";
};

const policy = (policy: string) => policy === "on";

export const registerForm = async (
  prevState: FormData,
  registerData: FormData
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const form = <registerFormProps>{
    firstName: registerData.get("firstName"),
    lastName: registerData.get("lastName"),
    birthAt: formatBirth(registerData.get("birthAt") as string),
    cpf: formatCPF(registerData.get("cpf") as string),
    phone: formatPhone(registerData.get("phone") as string),
    email: registerData.get("email"),
    password: registerData.get("password"),
    passwordConfirmation: registerData.get("passwordConfirmation"),
    privacyPolicy: registerData.get("policyCheckbox"),
  };

  if (
    isInvalidText(form.firstName as string) ||
    isInvalidText(form.cpf as string) ||
    isInvalidText(form.phone as string) ||
    isInvalidText(form.email as string) ||
    isInvalidText(form.password as string) ||
    isInvalidText(form.passwordConfirmation as string) ||
    !validateCPF(form.cpf) ||
    !validatePhone(form.phone) ||
    !validateEmail(form.email) ||
    !validatePassword(form.password, form.passwordConfirmation) ||
    !policy(form.privacyPolicy as string)
  )
    return { message: "Invalid input" };

  form.privacyPolicy = true; // backend privacyPolicy is a boolean

  console.log(form);
  // await fetchRegister(form);
};

export const loginForm = async (prevState: FormData, loginData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const form = <loginFormProps>{
    loginInput: loginData.get("loginInput"),
    password: loginData.get("password"),
  };

  if (
    isInvalidText(form.loginInput as string) ||
    isInvalidText(form.password as string)
  )
    return { message: "Invalid input" };

  console.log(form);

  // signIn("credentials");
};
