// pages/calendar/index.tsx
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import MonthCalendar from "@/components/MonthCalendar";

export default function Calendar() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Calendar | Calendium</title>
      </Head>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Calendium</h1>
          <div className="flex items-center space-x-4">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || "U"}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-700">
                {session?.user?.name || session?.user?.email}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-red-600 hover:text-red-500"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
		  <MonthCalendar/>

      </main>
    </div>
  );
}