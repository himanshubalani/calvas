// pages/_app.tsx
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import "../styles/globals.css";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;