"use client";

import { useState } from "react";

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Clooyzi transformed our business with their innovative app solution. The team was professional and delivered beyond our expectations.",
    author: "Sarah Johnson",
    company: "FinTech Solutions",
    image: "/placeholder.svg",
  },
  {
    quote: "The cybersecurity services provided by Clooyzi have given us peace of mind. Their expertise in this field is unmatched.",
    author: "Michael Chen",
    company: "Global Retail Inc.",
    image: "/placeholder.svg",
  },
  {
    quote: "Working with Clooyzi on our VR training program was a game-changer. The immersive experience they created has improved our training efficiency by 200%.",
    author: "Emily Rodriguez",
    company: "Education First",
    image: "/placeholder.svg",
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 120;

  const displayedQuote = expanded || testimonial.quote.length <= maxLength
    ? testimonial.quote
    : testimonial.quote.slice(0, maxLength) + "...";

  return (
    <article className="bg-[#292929]/70 rounded-xl p-6 flex flex-col items-center text-center shadow-lg transition-all hover:shadow-purple-500/30">
      <img
        src={testimonial.image}
        alt={`${testimonial.author} profile`}
        className="h-16 w-16 rounded-full mb-4 object-cover"
      />
      <p className="text-gray-300 mb-2">{displayedQuote}</p>
      {testimonial.quote.length > maxLength && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-purple-400 underline mb-2 focus:outline-none"
          aria-label={expanded ? "Show less" : "Read more"}
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}
      <h4 className="text-white font-bold">{testimonial.author}</h4>
      <span className="text-gray-400 text-sm">{testimonial.company}</span>
    </article>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 bg-[#282828]/80"
      aria-labelledby="testimonials-title"
    >
      <div className="container px-4 md:px-6 text-center">
        <h2
          id="testimonials-title"
          className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl"
        >
          What Our Clients Say
        </h2>
        <p className="max-w-[700px] mx-auto text-muted-foreground mt-4 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Don't just take our word for it - hear from some of our satisfied clients
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
