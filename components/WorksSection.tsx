"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Work } from "@/lib/supabase";

export default function WorksSection() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const response = await fetch('/api/works');
      if (response.ok) {
        const data = await response.json();
        setWorks(data);
      }
    } catch (error) {
      console.error('Error fetching works:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = () => {
    window.location.href = '/works';
  };

  if (loading) {
    return (
      <section id="works" className="py-20 md:py-28 px-6 md:px-16 bg-[#1e1e1e] text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-white">Loading works...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="works" className="py-20 md:py-28 px-6 md:px-16 bg-[#1e1e1e] text-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-3 mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-md tracking-tight">
            Our Works
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Explore a few of our premium website development projects built for innovation, performance, and scalability.
          </p>
        </div>

        {/* Project Grid - Show only latest 3 */}
        <div className="grid gap-10 md:grid-cols-3">
          {works.slice(0, 3).map((work, idx) => (
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

        {works.length > 3 && (
          <div className="mt-16">
            <button
              onClick={handleViewAll}
              className="rounded-full button-shadow-clooyzi hover:button-shadow-clooyzi-hover px-8 py-3 font-semibold text-white text-sm transition-all duration-300"
            >
              View All Works
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
