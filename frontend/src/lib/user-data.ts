export const getUserData = async (token: string) => {
  const response = await fetch("http://localhost:8000/api/auth/user-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${token}`,
    },
  });
  if (!response.ok)
    throw new Error(`${response.status} ${response.statusText}`);
  return response.json();
};
