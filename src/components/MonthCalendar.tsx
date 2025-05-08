'use client';

import React, { useState, useEffect } from 'react';
import EntryModal from './EntryModal'; // Import the modal component

interface CalendarDay {
  day: number | string;
  isCurrentMonth: boolean;
  isToday?: boolean;
  date: Date; // Ensure date is always present
}

interface CalendarEntry {
    photoUrl?: string | null;
    // note?: string;
    // tasks?: any[]; // Define task type later
}

// Helper to format date as YYYY-MM-DD for state keys
const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function MonthCalendar() {
  const today = new Date();
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [daysInMonth, setDaysInMonth] = useState<CalendarDay[]>([]);
  const [monthName, setMonthName] = useState('');
  const [year, setYear] = useState(0);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // State to simulate stored entries (replace with DB fetch in Milestone 4)
  const [entries, setEntries] = useState<Record<string, CalendarEntry>>({});

  useEffect(() => {
    // In a real app, fetch entries for currentDisplayDate's month here
    // fetchEntriesForMonth(currentDisplayDate);
    generateCalendar(currentDisplayDate);
  }, [currentDisplayDate, entries]); // Re-generate calendar if entries change too

  const generateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    setMonthName(monthNames[month]);
    setYear(year);

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInCurrentMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday
    const daysInPreviousMonth = new Date(year, month, 0).getDate();

    const calendarDays: CalendarDay[] = [];
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    // Days from previous month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const day = daysInPreviousMonth - startingDayOfWeek + 1 + i;
      const dateObj = new Date(year, month - 1, day);
      calendarDays.push({ day, isCurrentMonth: false, date: dateObj });
    }

    // Days of current month
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const currentDateObj = new Date(year, month, day);
      const isToday = currentDateObj.getTime() === todayDate.getTime();
      calendarDays.push({ day, isCurrentMonth: true, isToday, date: currentDateObj });
    }

    // Days from next month
    const totalCells = calendarDays.length;
    const remainingCells = totalCells <= 35 ? 35 - totalCells : 42 - totalCells;
    for (let i = 1; i <= remainingCells; i++) {
      const dateObj = new Date(year, month + 1, i);
      calendarDays.push({ day: i, isCurrentMonth: false, date: dateObj });
    }

    setDaysInMonth(calendarDays);
  };

  const goToPreviousMonth = () => {
    setCurrentDisplayDate(new Date(currentDisplayDate.getFullYear(), currentDisplayDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDisplayDate(new Date(currentDisplayDate.getFullYear(), currentDisplayDate.getMonth() + 1, 1));
  };

  const goToCurrentMonth = () => {
    const today = new Date();
    setCurrentDisplayDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const handleDayClick = (day: CalendarDay) => {
    // Always allow opening the modal, even for adjacent month days
    setSelectedDate(day.date);
    setIsModalOpen(true);
    console.log('Opening modal for:', day.date?.toDateString());
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const handleSaveEntry = (date: Date, photoFile: File | null, photoUrl: string | null) => {
    const dateKey = formatDateKey(date);
    console.log(`Saving entry for ${dateKey}:`, { photoFile, photoUrl });

    // Simulate saving: Update the local state
    // In Milestone 4, this will involve API calls and potentially Cloudinary upload
    setEntries(prevEntries => ({
        ...prevEntries,
        [dateKey]: {
            ...prevEntries[dateKey], // Keep existing note/tasks if they were there
            photoUrl: photoUrl, // Update or add the photo URL
        }
    }));
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentEntry = selectedDate ? entries[formatDateKey(selectedDate)] : undefined;

  return (
    <>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
            {/* Navigation buttons */}
           <button
            onClick={goToPreviousMonth}
            aria-label="Previous month"
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
            >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center">
                {monthName} {year}
                </h2>
                <button
                onClick={goToCurrentMonth}
                className="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
                >
                Today
                </button>
            </div>
            <button
            onClick={goToNextMonth}
            aria-label="Next month"
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
            >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">
          {weekdays.map(day => <div key={day}>{day}</div>)}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {daysInMonth.map((dayObj, index) => {
            const dateKey = formatDateKey(dayObj.date);
            const entry = entries[dateKey];
            return (
              <div
                key={`${dayObj.date.toISOString()}-${index}`}
                className={`relative p-1 sm:p-2 h-20 sm:h-24 md:h-28 border border-gray-200 transition duration-150 ease-in-out flex flex-col group ${
                  dayObj.isCurrentMonth
                    ? 'bg-white hover:bg-gray-50 cursor-pointer'
                    : 'bg-gray-50 text-gray-400' // Don't make adjacent days look clickable if modal opens anyway
                } ${dayObj.isToday ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
                onClick={() => handleDayClick(dayObj)}
              >
                 {/* Day Number */}
                <span className={`self-end text-xs sm:text-sm ${dayObj.isToday ? 'font-bold text-blue-600' : ''} ${!dayObj.isCurrentMonth ? 'text-gray-400' : 'text-gray-700'}`}>
                  {dayObj.day}
                </span>

                {/* Content Area */}
                <div className="flex-grow mt-1 overflow-hidden relative">
                  {/* Display image thumbnail if exists */}
                  {entry?.photoUrl && (
                    <img
                        src={entry.photoUrl}
                        alt={`Entry for ${dateKey}`}
                        className="absolute inset-0 w-full h-full object-cover rounded-sm"
                        loading="lazy"
                    />
                  )}
                   {/* Other indicators can go here */}
                    
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Render the Modal */}
      <EntryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        date={selectedDate}
        onSave={handleSaveEntry}
        initialPhotoUrl={currentEntry?.photoUrl}
        // Pass initialNote, initialTasks later
      />
    </>
  );
}