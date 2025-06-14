import { Button } from "@/components/ui/exportbutton"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, PenTool, Camera, Download, Github, Zap, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CalvasLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Calvas</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="#demo" className="text-gray-600 hover:text-gray-900 transition-colors">
              Demo
            </Link>
            <Button variant="outline" size="sm" asChild>
              <Link href="https://github.com/himanshubalani/calvas" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                <Zap className="h-3 w-3 mr-1" />
                Built with Next.js
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Month, <span className="text-blue-600">Made Memorable</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Add notes, photos, and tasks to every day. Export a beautiful summary of your life.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-6">
                <Link href="/calendar" className="flex items-center">
                  Try the Calendar
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                View Demo
              </Button>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>Private by default</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="h-4 w-4" />
                <span>Export ready</span>
              </div>
            </div>
          </div>

          {/* Calendar Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">December 2024</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 6 + 1
                  const isCurrentMonth = day > 0 && day <= 31
                  const hasContent = [5, 12, 18, 25].includes(day)
                  const hasPhoto = [12, 25].includes(day)

                  return (
                    <div
                      key={i}
                      className={`aspect-square p-1 text-xs relative ${
                        isCurrentMonth ? "text-gray-900" : "text-gray-300"
                      }`}
                    >
                      {isCurrentMonth && (
                        <div
                          className={`w-full h-full rounded-lg flex justify-end pt-1 ${
                          hasContent ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                          }`}
                        >
                          <span className="font-medium pr-1">{day}</span>
                          {hasContent && (
                          <div className="absolute bottom-1 left-1 right-1">
                            {hasPhoto && (
                            <div className="w-full h-2 bg-gradient-to-r from-pink-300 to-purple-300 rounded-sm mb-1"></div>
                            )}
                            <div className="w-full h-1 bg-blue-300 rounded-sm"></div>
                          </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Sample Day Detail */}
              <div className="bg-gray-50 rounded-lg p-3 text-xs">
                <div className="font-medium text-gray-900 mb-1">Dec 25 - Christmas Day</div>
                <div className="text-gray-600 mb-2">{"Family dinner at mom's house 🎄"}</div>
                <div className="flex space-x-1">
                  <div className="w-4 h-4 bg-gradient-to-br from-red-300 to-pink-300 rounded"></div>
                  <div className="w-4 h-4 bg-gradient-to-br from-green-300 to-blue-300 rounded"></div>
                </div>
              </div>
            </div>

            {/* Floating Export Preview */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 border">
              <div className="flex items-center space-x-2 text-xs">
                <Download className="h-3 w-3 text-blue-600" />
                <span className="text-gray-600">Export as</span>
                <Badge variant="outline" className="text-xs">
                  PNG
                </Badge>
                <Badge variant="outline" className="text-xs">
                  SVG
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to capture your days
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple tools that make journaling visual, personal, and shareable.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Write Your Days */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <PenTool className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">✍️ Write Your Days</h3>
              <p className="text-gray-600 leading-relaxed">
                Notes, moods, or memories — all in one click. Leave a thought or reflection on any date.
              </p>
            </CardContent>
          </Card>

          {/* Add Visuals */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Camera className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">📸 Add Visuals</h3>
              <p className="text-gray-600 leading-relaxed">
                Attach photos to make your days come alive. Visual memories that tell your story.
              </p>
            </CardContent>
          </Card>

          {/* Export Beautiful Months */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Download className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🖼️ Export Beautiful Months</h3>
              <p className="text-gray-600 leading-relaxed">
                Download your calendar as an image — JPEG, PNG, or SVG. Share your month anywhere.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">See Calvas in action</h2>
            <p className="text-xl text-gray-600">A month of memories, beautifully organized</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border">
              <Image
                src="/calvas_demo_image.png"
                alt="Calvas Calendar Demo"
                width={800}
                height={600}
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Start capturing your days</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join others who are turning their calendars into visual stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              <Link href="/calendar" className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
              Open Calvas
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="https://github.com/himanshubalani/calvas" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 mr-2" />
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">Calvas</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>Built with Next.js</span>
              <Link href="#" className="hover:text-gray-900 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-gray-900 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
