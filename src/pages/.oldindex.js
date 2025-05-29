// pages/index.js (old version)
import Head from 'next/head';
import MonthCalendar from '../components/MonthCalendar.tsx';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Month View Calendar</title>
        <meta name="description" content="A simple month view calendar built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h1>Month View Calendar</h1>
        <MonthCalendar />
      </main>
    </div>
  );
}