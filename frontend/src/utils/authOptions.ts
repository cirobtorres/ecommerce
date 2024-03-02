import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchLogin } from "@/lib/authentication";

export const authOptions: NextAuthOptions = {
  // pages: {
  //   signIn: "/login",
  // },
  jwt: {},
  secret: process.env.NEXTAUTH_SECRET ?? "",
  session: {
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const login = <loginFormProps>{
            login: credentials?.email,
            password: credentials?.password,
          };
          const user = await fetchLogin(login);
          // console.log(user);
          if (!user) return null;
          const { jwt, id, name, email } = user;
          return { jwt, id, name, email };
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
