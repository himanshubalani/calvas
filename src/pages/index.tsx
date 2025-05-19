// pages/index.tsx
import { useSession } from "next-auth/react";
import Link from "next/link"
import { ArrowRight, Calendar, Camera, CheckCircle, Edit, Share2, Zap } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { link } from "fs";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Calvas</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600">
              <Link href="/signup">Sign Up Free</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
          <div className="container relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-6">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                    Your calendar, reimagined
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Calvas is more than a calendar. It's a canvas for your life — add photos, notes, and tasks to create
                    a visual journey of your days.
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Link href="/login"><Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  </Link>
                  <Link href="/calender"><Button size="lg" variant="outline">
                    See Demo
                  </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="inline-block h-8 w-8 rounded-full bg-gradient-to-br from-pink-400 to-violet-400 ring-2 ring-background"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Join <span className="font-medium text-foreground">2,000+</span> users organizing their lives
                  </p>
                </div>
              </div>
              <div className="relative flex items-center justify-center lg:justify-end">
                <div className="relative h-[400px] w-[350px] overflow-hidden rounded-2xl shadow-2xl sm:h-[450px] sm:w-[400px] md:h-[500px] md:w-[450px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-blue-100 dark:from-pink-950 dark:to-blue-950" />
                  <Image
                    src="/placeholder.svg?height=500&width=450"
                    width={450}
                    height={500}
                    alt="Calvas calendar interface"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-gradient-to-br from-pink-400 to-violet-400 p-0.5">
                  <div className="flex h-full w-full items-center justify-center rounded-2xl bg-background">
                    <Camera className="h-10 w-10 text-pink-500" />
                  </div>
                </div>
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 p-0.5">
                  <div className="flex h-full w-full items-center justify-center rounded-2xl bg-background">
                    <Edit className="h-10 w-10 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container">
            <div className="mx-auto mb-16 max-w-[58rem] text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Features that make Calvas special
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Designed to help you visualize your time in a whole new way.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <Calendar className="h-10 w-10" />,
                  title: "Beautiful Month View",
                  description:
                    "See your entire month at a glance with our intuitive and visually appealing calendar layout.",
                },
                {
                  icon: <Camera className="h-10 w-10" />,
                  title: "Photo Memories",
                  description: "Add photos to specific days to create visual memories you can revisit anytime.",
                },
                {
                  icon: <CheckCircle className="h-10 w-10" />,
                  title: "Notes & Tasks",
                  description: "Keep track of your thoughts and to-dos right where you need them—in your calendar.",
                },
                {
                  icon: <Edit className="h-10 w-10" />,
                  title: "Handwritten Notes",
                  description:
                    "Coming soon: Add a personal touch with handwritten-style notes for that authentic feel.",
                },
                {
                  icon: <Zap className="h-10 w-10" />,
                  title: "Health Integration",
                  description:
                    "Coming soon: Connect with Strava and health apps to track your physical activities by day.",
                },
                {
                  icon: <Share2 className="h-10 w-10" />,
                  title: "Shareable Exports",
                  description: "Export individual months as beautiful images you can share with friends and family.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-violet-100 dark:from-pink-950 dark:to-violet-950">
                    <div className="text-primary">{feature.icon}</div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-pink-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
          <div className="container">
            <div className="mx-auto max-w-[58rem] text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Seamless integration with your digital life
              </h2>
              <p className="mb-8 text-muted-foreground md:text-xl">Calvas works with the tools you already use.</p>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border bg-background p-6 shadow-sm">
                  <h3 className="mb-2 text-xl font-bold">Account Sync</h3>
                  <p className="text-muted-foreground">
                    Create an account and access your calendar from any device, anytime.
                  </p>
                </div>
                <div className="rounded-lg border bg-background p-6 shadow-sm">
                  <h3 className="mb-2 text-xl font-bold">Gmail Integration</h3>
                  <p className="text-muted-foreground">
                    Sync with your Gmail calendar to keep all your events in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-[58rem] text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Ready to reimagine your calendar?
              </h2>
              <p className="mb-8 text-muted-foreground md:text-xl">
                Join thousands of users who have transformed how they visualize and plan their time.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
              >
                Get Started for Free
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Calvas</span>
            </div>
            <p className="text-sm text-muted-foreground">Your calendar, reimagined as a canvas for your life.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Calvas. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
