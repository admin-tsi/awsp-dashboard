import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export type MyUserType = {
  id: string; // Renamed from _id to id
  email: string;
  role: string;
  isverified: boolean;
  emailVerified: Date | null; // Add emailVerified field
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

          const user = response.data.user;
          if (user) {
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
        token.user = user as MyUserType; // Ensure user is treated as MyUserType
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as MyUserType; // Add typed user data to the session
      return session;
    },
  },
});
