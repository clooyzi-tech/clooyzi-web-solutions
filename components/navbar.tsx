"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onContactClick: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-[#292929]/80 backdrop-blur-md border-b border-none">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-xl font-bold text-white transition-transform duration-300 hover:scale-105 hover:text-white"
          >
            Clooyzi
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-center">
          <div
            className="flex items-center font-bold gap-6 bg-[#292929] rounded-full px-5 py-2 backdrop-blur-md transition-all duration-500"
            style={{ fontFamily: "'Poppins', sans-serif", boxShadow: "0 0 5px #ae00ffff" }}
          >
            {["Services", "About", "Works", "Testimonials", "Contact"].map((section) => (
              <a
                key={section}
                href={`#${section.toLowerCase()}`}
                className="text-sm text-white relative hover:scale-105 transition-transform duration-300"
              >
                {section}
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </a>
            ))}
          </div>
        </nav>

        {/* CTA Button */}
        <Button
          onClick={onContactClick}
          className="hidden sm:inline-flex rounded-xl px-3 py-1 text-white shadow-neumorphism-softwarepage hover:shadow-neumorphism-hover-softwarepage focus:outline-none font-medium"
        >
          Contact Us
        </Button>

        {/* Mobile Menu */}
        <div className="md:hidden relative">
          <button
            className="p-2 rounded-md hover:bg-gray-800/50 transition"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {mobileOpen && (
            <div
              className={`fixed top-0 right-0 h-screen w-64 bg-[#292929]/95 backdrop-blur-md flex flex-col items-start py-6 px-6 gap-6 z-50 transform transition-transform duration-700 ease-out ${
                mobileOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
              }`}
            >
              {/* Close button */}
              <button className="self-end mb-4 p-2 rounded-md text-white hover:bg-white/10 transition" onClick={() => setMobileOpen(false)}>
                ✕
              </button>

              {/* Mobile Links */}
              <a className="text-white font-extrabold text-3xl w-full mb-4">Menu</a>
              {["Services", "About", "Works", "Testimonials", "Contact"].map((section) => (
                <a
                  key={section}
                  href={`#${section.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-white font-bold text-lg w-full hover:scale-105 transition"
                >
                  {section}
                </a>
              ))}

              {/* CTA Button */}
              <Button
                onClick={() => {
                  onContactClick();
                  setMobileOpen(false);
                }}
                className="mt-6 w-full rounded-xl px-3 py-2 text-white shadow-neumorphism-softwarepage hover:shadow-neumorphism-hover-softwarepage focus:outline-none font-medium transition-all duration-300"
              >
                Contact Us
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
