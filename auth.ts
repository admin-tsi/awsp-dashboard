import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export type MyUserType = {
  id: string;
  email: string;
  role: string;
  isverified: boolean;
  accessToken: string;
  expireIn: number;
  emailVerified: Date | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const {
  handlers: { POST, GET },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials;
          const response = await axios.post(
            "https://awsp-world-backend-4etmg5366a-uc.a.run.app/api/v1/auth/login",
            {
              email,
              password,
            },
          );

          const { user, token, expireIn } = response.data;
          if (user && token) {
            user.accessToken = token;
            user.expireIn = expireIn;
            return user;
          } else {
            return null;
          }
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user as MyUserType;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as MyUserType;
      return session;
    },
  },
});