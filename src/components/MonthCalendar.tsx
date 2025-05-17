'use client';

import React, { useState, useEffect, forwardRef } from 'react'; // Import forwardRef
import EntryModal from './EntryModal';

interface CalendarDay {
  day: number | string;
  isCurrentMonth: boolean;
  isToday?: boolean;
  date: Date;
}

interface CalendarEntry {
  photoUrl?: string | null;
  // note?: string;
  // tasks?: any[];
}

const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Define props for MonthCalendar if any, plus the forwardedRef
interface MonthCalendarProps {}


const MonthCalendar = forwardRef<HTMLDivElement, MonthCalendarProps>((props, ref) => {
  const today = new Date();
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [daysInMonth, setDaysInMonth] = useState<CalendarDay[]>([]);
  const [monthName, setMonthName] = useState('');
  const [year, setYear] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [entries, setEntries] = useState<Record<string, CalendarEntry>>({});

  useEffect(() => {
    generateCalendar(currentDisplayDate);
  }, [currentDisplayDate, entries]);

  const generateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    setMonthName(monthNames[month]);
    setYear(year);

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInCurrentMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();

    const calendarDaysArray: CalendarDay[] = [];
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < startingDayOfWeek; i++) {
      const day = daysInPreviousMonth - startingDayOfWeek + 1 + i;
      const dateObj = new Date(year, month - 1, day);
      calendarDaysArray.push({ day, isCurrentMonth: false, date: dateObj });
    }

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const currentDateObj = new Date(year, month, day);
      const isToday = currentDateObj.getTime() === todayDate.getTime();
      calendarDaysArray.push({ day, isCurrentMonth: true, isToday, date: currentDateObj });
    }

    const totalCells = calendarDaysArray.length;
    const remainingCells = totalCells <= 35 ? 35 - totalCells : 42 - totalCells;
    for (let i = 1; i <= remainingCells; i++) {
      const dateObj = new Date(year, month + 1, i);
      calendarDaysArray.push({ day: i, isCurrentMonth: false, date: dateObj });
    }
    setDaysInMonth(calendarDaysArray);
  };

  const goToPreviousMonth = () => setCurrentDisplayDate(new Date(currentDisplayDate.getFullYear(), currentDisplayDate.getMonth() - 1, 1));
  const goToNextMonth = () => setCurrentDisplayDate(new Date(currentDisplayDate.getFullYear(), currentDisplayDate.getMonth() + 1, 1));
  const goToCurrentMonth = () => {
    const today = new Date();
    setCurrentDisplayDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const handleDayClick = (day: CalendarDay) => {
    setSelectedDate(day.date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const handleSaveEntry = (date: Date, photoFile: File | null, photoUrl: string | null) => {
    const dateKey = formatDateKey(date);
    setEntries(prevEntries => ({
      ...prevEntries,
      [dateKey]: { ...prevEntries[dateKey], photoUrl: photoUrl }
    }));
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentEntry = selectedDate ? entries[formatDateKey(selectedDate)] : undefined;

  return (
    <>
      {/* Attach the ref to this main div */}
      <div ref={ref} className="bg-white p-4 sm:p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <button onClick={goToPreviousMonth} aria-label="Previous month" className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center">{monthName} {year}</h2>
            <button onClick={goToCurrentMonth} className="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">Today</button>
          </div>
          <button onClick={goToNextMonth} aria-label="Next month" className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">
          {weekdays.map(day => <div key={day}>{day}</div>)}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {daysInMonth.map((dayObj, index) => {
            const dateKey = formatDateKey(dayObj.date);
            const entry = entries[dateKey];
            const hasPhoto = entry?.photoUrl != null;
            return (
              <div
                key={`${dayObj.date.toISOString()}-${index}`}
                className={`relative h-20 sm:h-24 md:h-28 border border-gray-200 transition duration-150 ease-in-out cursor-pointer overflow-hidden rounded-lg ${
                  dayObj.isCurrentMonth ? 'hover:bg-gray-50' : 'opacity-60'
                } ${dayObj.isToday ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
                onClick={() => handleDayClick(dayObj)}
              >
                {hasPhoto && (
                  <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden">
                    <img src={entry.photoUrl!} alt={`Entry for ${dateKey}`} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent h-8"></div>
                  </div>
                )}
                <span className={`absolute top-1 right-2 text-sm sm:text-base font-medium z-10 ${
                  hasPhoto ? 'text-white' : dayObj.isToday ? 'text-blue-600' : dayObj.isCurrentMonth ? 'text-gray-700' : 'text-gray-400'
                }`}>
                  {dayObj.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <EntryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        date={selectedDate}
        onSave={handleSaveEntry}
        initialPhotoUrl={currentEntry?.photoUrl}
      />
    </>
  );
});

MonthCalendar.displayName = 'MonthCalendar'; // Assigning displayName for easier debugging
export default MonthCalendar;