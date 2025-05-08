// components/Layout.tsx
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = "Calendar App" }: LayoutProps) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="A calendar application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <header className="bg-blue-600 text-white">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Calendar App
            </Link>
            <nav>
              {session ? (
                <div className="flex items-center space-x-4">
                  <Link href="/calendar" className="hover:underline">
                    Calendar
                  </Link>
                  <Link href="/api/auth/signout" className="hover:underline">
                    Log out
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/login" className="hover:underline">
                    Log in
                  </Link>
                  <Link href="/register" className="hover:underline">
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="bg-gray-100 py-4">
          <div className="container mx-auto px-4 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Calendar App</p>
          </div>
        </footer>
      </div>
    </>
  );
}