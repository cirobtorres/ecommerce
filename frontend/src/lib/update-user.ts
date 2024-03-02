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
