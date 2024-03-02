export const fetchRegister = async (registerData: registerFormProps) => {
  const response: Response = await fetch(
    "http://localhost:8000/api/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    }
  );
  if (!response.ok)
    throw new Error(
      `Failed registerUser: ${response.statusText} ${response.status}`
    );
};

export const fetchUpdate = async (updateData: updateFormProps) => {
  const response: Response = await fetch(
    "http://localhost:8000/api/auth/update",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updateData }),
    }
  );
  if (!response.ok)
    throw new Error(
      `Failed updateUser: ${response.statusText} ${response.status}`
    );
};

export const fetchLogin = async (loginData: loginFormProps) => {
  /* loginAccess might be an email, CPF or CNPJ */
  const response: Response = await fetch(
    "http://localhost:8000/api/auth/login/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    }
  );
  if (!response.ok)
    throw new Error(
      `Failed fetchLogin: ${response.statusText} ${response.status}`
    );
  return response.json();
};
