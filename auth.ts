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

const api = process.env.NEXT_PUBLIC_BASE_URL;

export const {
  handlers: { POST, GET },
  auth,
  signIn,
} = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials;
          const response = await axios.post(`${api}/auth/login`, {
            email,
            password,
          });

          const { user, token, expiresIn } = response.data;

          // Validate the response data
          if (!user || !token) {
            return null;
          }

          // Create a properly structured user object
          const authUser = {
            id: user._id,
            email: user.email,
            role: user.role,
            isverified: user.isverified,
            accessToken: token,
            expireIn: expiresIn,
            emailVerified: null, // Set this based on your needs
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            __v: user.__v,
          };

          return authUser;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login", // Add this to handle errors gracefully
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
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
