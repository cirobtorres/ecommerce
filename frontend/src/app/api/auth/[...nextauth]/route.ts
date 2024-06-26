import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchLogin } from "@/lib/authentication";

const tokenAge = 7 * 24 * 60 * 60;

declare module "next-auth" {
  interface User {
    jwt: string;
    id: string;
    name: string;
    // email: string;
  }

  interface JWT {
    jwt: string;
    sub: string;
    name: string;
    // email: string;
    expiration: number;
    iat: number;
    exp: number;
    jti: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      // email: string;
      image: string | null;
    };
    accessToken: string;
    expiration: number;
  }
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? "",
  session: {
    strategy: "jwt",
    maxAge: tokenAge, // Seconds
  },
  callbacks: {
    async jwt({ token, user, account }) {
      const isSignIn = !!user;
      const actualDate = Math.floor(Date.now() / 1000); // Seconds

      if (isSignIn) {
        if (account && account.provider === "google") {
          user.jwt = account.id_token as string;
        }

        // Everytime there is an session update, a new token callback is called
        // But both user and account are called just once, which is when the session was first created
        // We gonna call and update our token just when the session is created
        // After that, everything we gonna go is check if the token is still valid (else statement)
        // if (!user.jwt || !user.id || !user.name || !user.email) {
        if (!user.jwt || !user.id || !user.name) {
          return Promise.resolve({});
        }
        token.jwt = user.jwt;
        token.sub = user.id.toString();
        token.name = user.name;
        // token.email = user.email;
        token.expiration = Math.floor(actualDate + tokenAge) as number;
      } else {
        // If someone has removed expiration attribute from token
        if (!token.expiration) return Promise.resolve({});

        // If token no longer is valid
        if (actualDate > (token.expiration as number))
          return Promise.resolve({});
      }

      return Promise.resolve(token);
    },
    async session({ session, token }) {
      session.accessToken = token.jwt as string;
      session.user = {
        id: token.sub as string,
        name: token.name as string,
        // email: token.email as string,
        image: null,
      };

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      authorize: async (credentials: any) => {
        if (!credentials?.login || !credentials?.password) return null;
        try {
          const login = <loginFormProps>{
            login: credentials?.login,
            password: credentials?.password,
          };
          const user = await fetchLogin(login);
          if (!user) return null;
          const { jwt, id, name } = user;
          return { jwt, id, name };
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
