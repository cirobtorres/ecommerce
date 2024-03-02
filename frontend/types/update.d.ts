type updateFormProps = {
  firstName: string;
  lastName: string | undefined;
  cpf: string;
  birthAt: string | undefined;
  phone: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  privacyPolicy: "on" | "off";
  message: string | undefined;
};
