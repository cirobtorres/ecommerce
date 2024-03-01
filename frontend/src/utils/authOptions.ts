import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchLogin } from "@/lib/authentication";

export const authOptions: NextAuthOptions = {
  // pages: {
  //   signIn: "/login",
  // },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        chosenInput: {
          label: "E-mail, CPF ou CNPJ",
          type: "text",
          placeholder: "",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const loginFormProps = <loginFormProps>{
            loginInput: credentials?.chosenInput,
            password: credentials?.password,
          };
          const user = fetchLogin(loginFormProps);

          if (user) return user;
          else return null;
        } catch (error: any) {
          const message = error.response.data.message;
          throw new Error(message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
};
