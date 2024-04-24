export const fetchCreateAddress = async (formData: Address, token: string) => {
  const response = await fetch("http://localhost:8000/api/address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok)
    throw new Error(
      `Failed create address: ${response.statusText} ${response.status}`
    );
  return response.json();
};
