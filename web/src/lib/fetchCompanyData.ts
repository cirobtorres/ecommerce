import { redirect } from "next/navigation";
import { TaxInfo } from "../enums/tax-info";

interface CreateCompanyDTO {
  email: string;
  password: string;
  phone: string;
  brand_name: string;
  legal_name: string;
  name: string;
  cnpj: string;
  establishment_at: string;
  tax_info: TaxInfo;
  ie: string | null;
  allow_email_newsletter?: boolean;
  agreed_data_policies: boolean;
}

const fetchCompanySignUp = async (body: CreateCompanyDTO) => {
  const signUpResponse = await fetch(
    "http://localhost:8000/api/auth/company/sign-up",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  if (!signUpResponse.ok) {
    if (signUpResponse.status === 500) {
      redirect("/error");
    }
    throw new Error(`${signUpResponse.status} ${signUpResponse.statusText}`);
  }
  return await signUpResponse.json();
};

export { fetchCompanySignUp };
