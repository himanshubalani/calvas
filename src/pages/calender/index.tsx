import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import MonthCalendar from "@/components/MonthCalendar";
import SidePanel, { ExportOptions } from "@/components/SidePanel"; // Import SidePanel

export default function CalendarPage() {
  const { data: session } = useSession();

  const handleExport = (options: ExportOptions) => {
    // This function will eventually trigger the html-to-image logic
    // For now, it's mainly a placeholder to connect the SidePanel
    console.log("CalendarPage received export options:", options);
    // In Milestone 5, you'd pass a ref to MonthCalendar or trigger a function in it
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Head>
        <title>Calendar | Calendium</title>
      </Head>

      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-full mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Calendium</h1>
          <div className="flex items-center space-x-3 sm:space-x-4">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "Profile"}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                {session?.user?.name?.charAt(0)?.toUpperCase() || session?.user?.email?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-700 truncate max-w-[100px] sm:max-w-[150px]">
                {session?.user?.name || session?.user?.email}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-xs sm:text-sm text-red-600 hover:text-red-500 whitespace-nowrap"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="flex-grow flex flex-col md:flex-row max-w-full mx-auto w-full p-2 sm:p-4 gap-1">
        {/* Side Panel - takes up 20-25% on medium screens and above */}
        <aside className="w-full md:w-1/5 lg:w-1/4 xl:w-1/5 flex-shrink-0">
          <SidePanel onExport={handleExport} />
        </aside>

        {/* Main Calendar Content - takes remaining space */}
        <main className="flex-grow w-full md:w-4/5 lg:w-3/4 xl:w-4/5">
          <MonthCalendar />
        </main>
      </div>
       {/* Footer (Optional, if you want it at the very bottom of the viewport) */}
      {/* <footer className="bg-gray-800 text-white py-4 text-center text-sm">
        © {new Date().getFullYear()} Calendium App
      </footer> */}
    </div>
  );
}