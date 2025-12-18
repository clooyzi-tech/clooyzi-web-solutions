"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ArrowLeft, Code, Bot, Smartphone, Globe, Database } from "lucide-react"
import { Work } from "@/lib/supabase"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import PageLoader from "@/components/page-loader-software"

export default function AllWorksPage() {
  const [works, setWorks] = useState<Work[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWorks()
  }, [])

  const fetchWorks = async () => {
    try {
      const response = await fetch('/api/works')
      if (response.ok) {
        const data = await response.json()
        setWorks(data)
      }
    } catch (error) {
      console.error('Error fetching works:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Page Loader */}
      <PageLoader />

      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-20 animate-gradient bg-gradient-to-r from-violet-700 via-purple-500 to-indigo-700"></div>
      <div className="fixed inset-0 -z-10 bg-black/50"></div>

      {/* Floating Tech Icons */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <Code className="floating-icon text-white/20 h-12 w-12 top-[10%] left-[1%]" />
        <Code className="floating-icon text-white/20 h-12 w-12 top-[30%] right-[30%]" />
        <Code className="floating-icon text-white/20 h-12 w-12 top-[88%] left-[17%]" />
        <Smartphone className="floating-icon text-white/10 h-14 w-14 top-[20%] left-[80%]" />
        <Bot className="floating-icon text-white/10 h-16 w-16 top-1/2 left-10" />
        <Bot className="floating-icon text-white/10 h-16 w-16 top-[90%] right-[20%]" />
        <Database className="floating-icon text-white/10 h-12 w-12 top-1/4 left-[20%]" />
        <Database className="floating-icon text-white/10 h-12 w-12 top-[80%] right-[40%]" />
        <Globe className="floating-icon text-white/10 h-14 w-14 top-[11%] left-[45%]" />
        <Globe className="floating-icon text-white/10 h-14 w-14 top-[55%] right-[10%]" />
      </div>

      {/* Navbar */}
      <Navbar onContactClick={() => {}} />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <section className="py-20 md:py-28 px-6 md:px-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
              <button
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors drop-shadow-md"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </button>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight mb-4">
                All Our Works
              </h1>
              <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto drop-shadow-md">
                Explore our complete portfolio of premium website development projects built for innovation, performance, and scalability.
              </p>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-12">
                <div className="text-white text-lg drop-shadow-md">Loading works...</div>
              </div>
            ) : works.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-200 text-lg drop-shadow-md">No works available yet.</p>
              </div>
            ) : (
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {works.map((work, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-[#292929] rounded-2xl overflow-hidden border border-gray-700/30 hover:border-purple-500/40 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-purple-500/30"
                  >
                    <a href={work.project_link} target="_blank" rel="noopener noreferrer">
                      <div className="relative w-full h-56 overflow-hidden">
                        <img
                          src={work.image_url}
                          alt={work.title}
                          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </a>

                    <div className="p-6 text-left">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                        {work.title}
                      </h3>
                      <p className="text-sm text-gray-300 mb-4 leading-relaxed">{work.description}</p>
                      <a
                        href={work.project_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full button-shadow-clooyzi hover:button-shadow-clooyzi-hover text-white font-medium text-sm px-5 py-2 transition-all duration-300"
                      >
                        Live Demo
                        <ArrowRight className="ml-2 h-4 w-4 inline-block transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton phoneNumber="9353472169" />
    </div>
  )
}