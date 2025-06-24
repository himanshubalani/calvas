import { useRef, useState } from 'react'; // Import useState
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import MonthCalendar from "@/components/MonthCalendar";
import SidePanel, { ExportOptions, ratioMap } from "@/components/SidePanel"; // Import ratioMap if needed here, or keep in SidePanel
import { toPng, toJpeg } from 'html-to-image';

export default function CalendarPage() {
  const { data: session } = useSession();
  const calendarRef = useRef<HTMLDivElement>(null);
  // State for the current aspect ratio (numerical value)
  const [currentAspectRatio, setCurrentAspectRatio] = useState<number | null>(16/9); 

  const handleExport = async (options: ExportOptions) => {
    if (!calendarRef.current) {
      console.error("Calendar element not found for export.");
      alert("Error: Could not find calendar to export.");
      return;
    }

    const { fileType, aspectRatioKey } = options;
    const elementToCapture = calendarRef.current;

    try {
      let dataUrl;
      const filename = `calendar-month-${new Date().toISOString().split('T')[0]}-${aspectRatioKey.replace(/[^a-zA-Z0-9]/g, '')}`;
      const imageOptions = { quality: 0.95 };

      if (fileType === 'png') {
        dataUrl = await toPng(elementToCapture, imageOptions);
      } else if (fileType === 'jpeg') {
        dataUrl = await toJpeg(elementToCapture, imageOptions);
      } else if (fileType === 'svg') {
        // Note: html-to-image's SVG export can be experimental and might not capture everything perfectly.
        // For complex interactive calendars, it might have limitations.
        // dataUrl = await toSvg(elementToCapture, imageOptions); // You'd need to import toSvg
        alert("SVG export is experimental and might not work perfectly for complex content.");
        console.warn("SVG export attempted. Ensure you handle its nuances.");
        return; // Or proceed with caution
      } else {
        console.error("Unsupported file type:", fileType);
        alert("Unsupported file type for export.");
        return;
      }

      const link = document.createElement('a');
      link.download = `${filename}.${fileType}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Error exporting calendar:", error);
      alert("An error occurred while exporting the calendar. Check the console for details.");
    }
  };

  // Handler to update the aspect ratio state
  const handleRatioChange = (newRatioValue: number) => {
    setCurrentAspectRatio(newRatioValue);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* <Head>
        <title> {(session?.user?.name || session?.user?.email || 'User') + "'s"} Calvas</title>
      </Head>

      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-full mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {session?.user?.name ? `${session.user.name.split(' ')[0]}'s Calvas` : 'Calvas'}
          </h1>
          <div className="flex items-center space-x-3 sm:space-x-4">
            {session?.user?.image ? (
              <img
              src={session.user.image}
              alt={session.user.name || "Profile"}
              className="h-8 w-8 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'; // Hide broken image
                // Optionally show a fallback div if image fails
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback) fallback.classList.remove('hidden');
              }}
              />
            ) : null}
            {/* Fallback Avatar if image fails or not present 
            {(!session?.user?.image || session?.user?.image === null) && (
               <div className={`h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold ${session?.user?.image ? 'hidden' : ''}`}>
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
              className="text-xs sm:text-sm text-red-600 hover:text-red-500 whitespace-nowrap p-1 rounded hover:bg-red-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </header> */}

      <div className="flex-grow flex flex-col md:flex-row max-w-full mx-auto w-full p-2 sm:p-4 gap-4">
        {/* Sidebar */}
        <aside className="w-full md:w-72 lg:w-80 xl:w-96 flex-shrink-0">
          {/* The md:top calculation assumes your header is roughly spacing.16 (4rem) high, plus 1rem padding */}
          <SidePanel
            onExport={handleExport}
            currentAspectRatioValue={currentAspectRatio}
            onRatioChange={handleRatioChange}
          />
        </aside>

        {/* Main Calendar Area */}
        <main className="bg-transparent flex justify-center items-center flex-grow w-full md:w-4/5 lg:w-3/4 xl:w-4/5 min-h-[600px] h-[calc(100vh-1rem)] overflow-auto">
    <div
        className="bg-transparent"
        style={{
          aspectRatio: currentAspectRatio.toString() || '16/9',
          maxHeight: "calc(100vh - 2rem)", // safe margin from viewport height
          maxWidth: "100%",
          height: "100%",
        }}
      >
        {/* Passing the ref to MonthCalendar */}
      <MonthCalendar ref={calendarRef} />
      </div>
      
    </main>
      </div>
    </div>
  );
}