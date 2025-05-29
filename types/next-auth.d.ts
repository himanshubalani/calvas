import "next-auth";

declare module "next-auth" {
	interface User {
		_id: string;
		_isVerified: boolean;
		_isAcceptingMessages: boolean;
		_username?: string;
		_email: string;
		_image: string;
}

	interface session {
		user: {
			id: string;
			name: string;
			email: string;
			image: string;
			isVerified: boolean;
			isAcceptingMessages: boolean;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		_id?: string;
		_isVerified?: boolean;
		_isAcceptingMessages?: boolean;
		_username?: string;
	}
}