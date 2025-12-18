"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Testimonial } from "@/lib/supabase";
import PageLoader from "@/components/page-loader-software";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Hi Team, A big thank you to everyone for the fantastic work on Framyra website! The design, color combinations, and overall presentation are truly impressive. I appreciate your quick delivery and teamwork in bringing this to life. Special thanks to Nikhil for ensuring a great final output. Wishing your young, dynamic team continued success and many more creative projects ahead!",
    author: "Jason",
    company: "Framyra",
    image: "/clooyzi.png",
    created_at: ""
  },
  {
    id: 2,
    quote: "The cybersecurity services provided by Clooyzi have given us peace of mind. Their expertise in this field is unmatched.",
    author: "Michael Chen",
    company: "Global Retail Inc.",
    image: "/clooyzi.png",
    created_at: ""
  },
  {
    id: 3,
    quote: "Working with Clooyzi on our VR training program was a game-changer. The immersive experience they created has improved our training efficiency by 200%.",
    author: "Emily Rodriguez",
    company: "Education First",
    image: "/clooyzi.png",
    created_at: ""
  },
];

function TestimonialCard({ quote, author, company, image }: Omit<Testimonial, 'id' | 'created_at'>) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 140;

  const displayedQuote =
    expanded || quote.length <= maxLength
      ? quote
      : quote.slice(0, maxLength) + "...";

  return (
    <Card className="group relative flex flex-col h-full bg-gradient-to-b from-[#2e2e2e] to-[#1f1f1f] rounded-2xl border border-purple-600/20 shadow-md hover:shadow-purple-500/30 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-purple-600/30 via-pink-500/20 to-transparent blur-xl transition-opacity duration-700" />

      <CardContent className="relative z-10 flex-1 pt-8 flex flex-col items-center justify-between">
        <img
          src={image || "/placeholder.svg"}
          alt={author}
          className="h-16 w-16 rounded-full object-cover mb-4 border border-purple-400/30 shadow-md shadow-purple-500/20"
        />

        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="url(#gradientStroke)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7 opacity-70 mx-auto mb-3"
          >
            <defs>
              <linearGradient id="gradientStroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-3 px-4 transition-all duration-500">
          {displayedQuote}
        </p>

        {quote.length > maxLength && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-purple-400 underline mb-2 focus:outline-none hover:text-purple-300 transition-colors"
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}
      </CardContent>

      <CardFooter className="relative z-10 border-t border-purple-600/10 pt-4 flex flex-col items-center pb-6">
        <p className="text-white font-semibold tracking-wide">{author}</p>
        <p className="text-sm text-gray-400">{company}</p>
      </CardFooter>
    </Card>
  );
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setTestimonials(data);
        }
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#1e1e1e] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <section className="relative py-20 md:py-28 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-md tracking-tight mb-4">
              Client Testimonials
            </h1>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
              Trusted by startups, professionals, and global businesses — here's what our clients have to say about their experience with Clooyzi.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
    <div className="bg-black">
      <Footer />
    </div>
    </>
  );
}
