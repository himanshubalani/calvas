import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		AppleProvider({
			clientId: process.env.APPLE_CLIENT_ID!,
			clientSecret: process.env.APPLE_CLIENT_SECRET!,
		}),
	],
	pages: {
		signIn: "/login",
		newUser: "/register",
		error: "/error"
	},

	session: {
		strategy: "jwt",
	},

	secret: process.env.AUTH_SECRET,

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token._id = user._id as string;
				token._isVerified = user._isVerified;
				token._isAcceptingMessages = user._isAcceptingMessages;
				token._username = user._username;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user!.id = token._id as string;
				session.user!._isVerified = token._isVerified as boolean;
				session.user!._isAcceptingMessages = token._isAcceptingMessages as boolean;
				session.user!._username = token._username as string;
			}
			return session;
		},
	},
}

// Add NextAuth default handler
export default NextAuth(authOptions);