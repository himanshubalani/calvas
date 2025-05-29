import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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

	secret: process.env.NEXTAUTH_SECRET,

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
				session.user!.name = token._id as string;
				session.user!.email = token.email as string;
				session.user!.image = token.picture as string;
			}
			return session;
		},
	},
}

// Add NextAuth default handler
export default NextAuth(authOptions);