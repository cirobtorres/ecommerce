type FormProps = {
  phone: string;
  email: string;
  password: string;
  privacyPolicy: number | boolean;
} & (PFData | PJData);

type PFData = {
  PF: {
    firstName: string;
    lastName: string | undefined;
    cpf: string;
    birthAt: string | undefined;
  };
};

type PJData = {
  PJ: {
    legalName: string;
    brandName: string;
    cnpj: string;
    establishmentAt: string;
    ie: string;
    im: string | undefined;
  };
};
