import { useRef } from 'react'; // Import useRef
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import MonthCalendar from "@/components/MonthCalendar";
import SidePanel, { ExportOptions } from "@/components/SidePanel";
import { toPng, toJpeg } from 'html-to-image'; // Import html-to-image functions

export default function CalendarPage() {
  const { data: session } = useSession();
  const calendarRef = useRef<HTMLDivElement>(null); 
  const handleExport = async (options: ExportOptions) => {
    if (!calendarRef.current) {
      console.error("Calendar element not found for export.");
      alert("Error: Could not find calendar to export.");
      return;
    }

    const { fileType } = options; // We'll use fileType. AspectRatio might need more advanced handling.
    const elementToCapture = calendarRef.current;

    // Optional: Apply temporary styles for export if needed, e.g., to ensure all content is visible
    // This can get complex. For now, we capture as-is.
    // Consider a "clean layout" div later if current styling isn't export-friendly.

    try {
      let dataUrl;
      const filename = `calendar-month-${new Date().toISOString().split('T')[0]}`;

      // Simple quality setting for JPEG
      const jpegQuality = 0.95;
      // Options for html-to-image
      const imageOptions = {
        quality: jpegQuality,
        // Ensure images within the calendar are loaded (especially if from external sources later)
        // You might need to configure `fetchRequest` or ensure blob URLs are handled if that's the case.
        // For now, local blob URLs for previews should generally work.
        // pixelRatio: window.devicePixelRatio * 2, // For higher resolution, adjust as needed
        // backgroundColor: '#ffffff', // Explicitly set background if needed
      };


      if (fileType === 'png') {
        dataUrl = await toPng(elementToCapture, imageOptions);
      } else if (fileType === 'jpeg') {
        dataUrl = await toJpeg(elementToCapture, imageOptions);
      } else {
        console.error("Unsupported file type:", fileType);
        alert("Unsupported file type for export.");
        return;
      }

      // Trigger download
      const link = document.createElement('a');
      link.download = `${filename}.${fileType}`;
      link.href = dataUrl;
      document.body.appendChild(link); // Required for Firefox
      link.click();
      document.body.removeChild(link); // Clean up

      console.log(`Calendar exported as ${filename}.${fileType}`);

    } catch (error) {
      console.error("Error exporting calendar:", error);
      alert("An error occurred while exporting the calendar. Check the console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Head>
        <title> {session?.user?.name + "'s"} Calvas</title>
      </Head>

      {/* <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-full mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Calvas</h1>
          <div className="flex items-center space-x-3 sm:space-x-4">
            {session?.user?.image? (
              <img
              src={session.user.image}
              alt={session.user.name || "Profile"}
              className="h-8 w-8 rounded-full"
              onError={(e) => {
                e.currentTarget.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp';
              }}
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
              {session?.user?.name!.charAt(0)?.toUpperCase() || session?.user?.email?.charAt(0)?.toUpperCase() || "U"}
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
      </header> */}

      <div className="flex-grow flex flex-col md:flex-row max-w-full mx-auto w-full p-2 sm:p-4 gap-2">
        <aside className="w-full md:w-1/5 lg:w-1/4 xl:w-1/5 flex-shrink-0">
          <SidePanel onExport={handleExport} />
        </aside>

        <main className="flex-grow w-full md:w-4/5 lg:w-3/4 xl:w-4/5">
          {/* Passing the ref to MonthCalendar */}
          <MonthCalendar ref={calendarRef} />
        </main>
      </div>
    </div>
  );
}