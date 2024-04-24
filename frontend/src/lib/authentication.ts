export const fetchRegister = async (registerData: FormProps) => {
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
    // if (response.status === 400)
    //   return {
    //     status: response.status,
    //     error: await response.json().then((body) => body.error),
    //   };
    // else
    throw new Error(
      `Failed registerUser: ${response.statusText} ${response.status}`
    );
  return response.json();
};

export const fetchLogin = async (loginData: loginFormProps) => {
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
  if (!response.ok) return null;
  // throw new Error(
  //   `Failed fetchLogin: ${response.statusText} ${response.status}`
  // );
  return response.json();
};
