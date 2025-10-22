"use client";

import { ArrowRight } from "lucide-react";

const works = [
  {
    title: "Clooyzi.com",
    description: "A modern tech solutions company offering software, video, and design services — crafted with Next.js & Tailwind.",
    image: "clooyzi.png",
    link: "https://clooyzi.com",
  },
  {
    title: "Framyra.com",
    description: "Framyra — property management and hospitality, ensuring seamless care and elevated guest experiences.",
    image: "framyra.png",
    link: "https://framyra.com",
  },
  {
    title: "Sahasra Energy",
    description: "A clean energy company website showcasing advanced renewable technology and green initiatives.",
    image: "sahasra.png",
    link: "https://sahasraenergy.com",
  },
];

export default function WorksSection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
  };

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

        {/* Project Grid */}
        <div className="grid gap-10 md:grid-cols-3">
          {works.map((work, idx) => (
            <div
              key={idx}
              className="group relative bg-[#292929] rounded-2xl overflow-hidden border border-gray-700/30 hover:border-purple-500/40 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-purple-500/30"
            >
              <a href={work.link} target="_blank" rel="noopener noreferrer">
                <div className="relative w-full h-56 overflow-hidden">
                  <img
                    src={work.image}
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
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full button-shadow-clooyzi hover:button-shadow-clooyzi-hover text-white font-medium text-sm px-5 py-2 transition-all duration-300"
                >
                  Visit Website
                  <ArrowRight className="ml-2 h-4 w-4 inline-block transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <button
            onClick={scrollToContact}
            className="rounded-full button-shadow-clooyzi hover:button-shadow-clooyzi-hover px-8 py-3 font-semibold text-white text-sm transition-all duration-300"
          >
            View More
          </button>
        </div>
      </div>
    </section>
  );
}
