import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "../components/theme-provider"
import { Inter } from "next/font/google"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Calvas - Your Calendar Reimagined",
  description:
    "A modern calendar app that lets you add photos, notes, and tasks to create a visual journey of your days.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
