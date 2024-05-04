export const fetchCreateAddress = async (
  formData: SavingAddress,
  token: string
) => {
  const response = await fetch("http://localhost:8000/api/address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) if (response.status === 403) return response.statusText;
  throw new Error(
    `Failed create address: ${response.statusText} ${response.status}`
  );
  return response.json();
};
