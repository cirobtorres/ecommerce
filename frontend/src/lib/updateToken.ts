import Cookies from "js-cookie";

export async function updateToken() {
  const response: Response = await fetch(
    "http://localhost:8000/api/user/login/refresh/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: Cookies.get("refreshToken"),
      }),
    }
  );
  return response;
}
