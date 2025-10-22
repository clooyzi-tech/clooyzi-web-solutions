"use client";

import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
  };

  const highlights = [
    "Building custom, scalable websites designed to grow your business.",
    "Empowering automation through AI-powered bots and smart integrations.",
    "Focused on delivering real results — not just designs.",
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#282828]/80 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/logo/clooyzi-software-logo.png"
              alt="About Clooyzi"
              className="rounded-2xl object-contain w-full max-w-[450px] md:max-w-[500px] shadow-lg shadow-purple-500/20 hover:scale-105 transition-transform duration-500"
              width={500}
              height={400}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center space-y-6 text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              About Clooyzi
            </h2>
            <p className="text-gray-300 md:text-lg leading-relaxed max-w-xl">
              Clooyzi is a modern <span className="text-purple-400 font-semibold">Web Solutions Company</span> dedicated to helping businesses
              and entrepreneurs grow their digital presence <span className="text-purple-400 font-semibold">10× faster</span>.
              We craft premium, high-performing websites and intelligent bots that elevate your brand and automate workflows.
            </p>

            {/* Highlights */}
            <ul className="grid gap-3">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500/20">
                    <ArrowRight className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-white text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToContact}
              className="mt-4 w-fit rounded-full button-shadow-clooyzi hover:button-shadow-clooyzi-hover focus:outline-none font-semibold text-white px-6 py-2 text-sm md:text-base transition-transform duration-300"
            >
              Learn More About Us
            </button>
          </div>
        </div>
      </div>

      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>
    </section>
  );
}
