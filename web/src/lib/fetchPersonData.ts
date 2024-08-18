interface CreatePersonDTO {
  email: string;
  phone: string;
  password: string;
  name: string;
  cpf: string;
  birth_date: string;
  gender?: string;
  rg?: string;
  allow_email_newsletter?: boolean; // default = false
  agreed_data_policies?: boolean; // default = true
}

const fetchPersonSignUp = async (body: CreatePersonDTO) => {
  const signUpResponse = await fetch(
    "http://localhost:8000/api/auth/user/person-data/sign-up",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  if (!signUpResponse.ok) {
    throw new Error(`${signUpResponse.status} ${signUpResponse.statusText}`);
  }
  return await signUpResponse.json();
};

export { fetchPersonSignUp };
