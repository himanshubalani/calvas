
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession } from "next-auth";


/* The following code is extending the built-in types from Next Auth to customize the Session object.

By default, the Session object in Next Auth doesn't include the user's database ID. It only contains basic information like name, email, and image.
We need the user ID for database operations - for example, when we start creating calendar entries, we'll need to associate them with a specific user by their ID.

*/
// This is a TypeScript declaration file that extends the default NextAuth types to include the user ID in the session object.
declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id?: string;
	  name?: string | null;
	  email?: string | null;
    image?: string | null;
    };
  }
 // Adding id to the session object 
}
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
    name: { label: "Name", type: "text" }, // Add name for registration
  },
  async authorize(credentials, req) {
    // If name is provided, this is a registration attempt
    if (credentials?.name) {
      // Registration logic
      const existingUser = await prisma.user.findUnique({
        where: { email: credentials.email },
      });

      if (existingUser) {
        throw new Error("Email already in use");
      }

      const hashedPassword = await bcrypt.hash(credentials.password, 10);
      const user = await prisma.user.create({
        data: {
          name: credentials.name,
          email: credentials.email,
          password: hashedPassword,
        },
      });

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    } else {
      // Login logic
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Email and password required");
      }

      const user = await prisma.user.findUnique({
        where: {
          email: credentials.email,
        },
      });

      if (!user || !user.password) {
        throw new Error("User not found or invalid login method");
      }

      const isPasswordValid = await bcrypt.compare(
        credentials.password,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      };
    }
  },
}),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to calendar page after login
      return url.startsWith(baseUrl) ? url : `${baseUrl}/calendar`;
    },
  },
};

export default NextAuth(authOptions);