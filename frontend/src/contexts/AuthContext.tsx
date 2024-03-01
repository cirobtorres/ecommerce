"use client";

import { updateToken } from "@/lib/updateToken";
import { fetchLogin, fetchRegister, fetchUpdate } from "@/lib/authentication";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { redirect, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

type Token = {
  access: string;
  refresh: string;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const handleToken = (token: Token) => {
  const payload = jwtDecode(token.access);
  const expires = 7;
  Cookies.set("accessToken", token.access, {
    expires: expires,
  });
  Cookies.set("refreshToken", token.refresh, {
    expires: expires,
  });
  console.log("payload");
  return payload;
};

export function AuthContextProvider(props: any) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleAuthentication = (token: Token | null) => {
    if (token) {
      const decodeTokens = handleToken(token);
      setUser(decodeTokens);
    } else {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      setUser(null);
      // setLoading(false);
      return false;
    }
  };

  async function login(loginForm: loginFormProps) {
    try {
      setLoading(true);
      const getTokens: Token = await fetchLogin(loginForm);
      handleAuthentication(getTokens);
      router.back();
    } catch (error) {
      throw new Error("Error during login");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      handleAuthentication(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function register(registerForm: registerFormProps) {
    try {
      setLoading(true);
      await fetchRegister(registerForm);
      const loginForm = {
        loginInput: registerForm.email,
        password: registerForm.password,
      };
      await login(loginForm);
      redirect("/");
    } catch (error) {
      throw new Error("Error during register");
    } finally {
      setLoading(false);
    }
  }

  async function update(form: updateFormProps) {
    try {
      setLoading(true);
      await fetchUpdate(form);
      await refreshingValidToken();
      router.back();
    } catch (error) {
      throw new Error("Error during update");
    } finally {
      setLoading(false);
    }
  }

  async function refreshingValidToken(): Promise<void> {
    setLoading(true);
    const response = await updateToken();
    const token: Token = await response.json();
    if (response.ok) {
      handleAuthentication(token);
    } else {
      await logout();
    }
    // setLoading(false);
  }

  useEffect(() => {
    if (Cookies.get("refreshToken")) {
      refreshingValidToken();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        update,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export const AuthContextConsumer = AuthContext.Consumer;
