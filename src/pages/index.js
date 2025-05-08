// pages/index.js
import Head from 'next/head';
import MonthCalendar from '../components/MonthCalendar.jsx';
import '../styles/Global.css';

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