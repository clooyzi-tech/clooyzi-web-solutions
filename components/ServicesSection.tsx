"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// --- Service Interface ---
interface Service {
  title: string;
  description: string;
  image: string;
  link?: string;
}

// --- Services Data ---
const services: Service[] = [
  {
    title: "Full-Stack Development",
    description:
      "End-to-end software and mobile app development tailored to your business goals using the latest technologies.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1470&q=80",
    link: "#",
  },
  {
    title: "Web Maintenance",
    description:
      "Keep your website fast, secure, and updated with our continuous maintenance and performance optimization services.",
    image:
      "https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=1470&q=80",
    link: "#",
  },
  {
    title: "UI/UX Design",
    description:
      "We craft beautiful, intuitive designs that deliver exceptional user experiences across all platforms.",
    image:
      "https://images.unsplash.com/photo-1587355760421-b9de3226a046?auto=format&fit=crop&w=1470&q=80",
    link: "#",
  },
  {
    title: "AI Bots",
    description:
      "Automate your business with smart AI-powered bots that engage, learn, and deliver personalized interactions.",
    image:
      "https://images.unsplash.com/photo-1684487747720-1ba29cda82f8?auto=format&fit=crop&w=1470&q=80",
    link: "#",
  },
];

// --- Main Component ---
export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-[#282828]/50 text-foreground"
    >
      <div className="container px-4 md:px-6">
        {/* === HEADER === */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Our Website Services
            </h2>
            <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Comprehensive tech solutions tailored to your business needs
            </p>
          </div>
        </div>

        {/* === SWIPER SLIDER === */}
        <div className="mt-12 w-full max-w-6xl mx-auto">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                <ServiceCard {...service} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

// --- Inner Service Card Component ---
function ServiceCard({
  image,
  title,
  description,
  link,
}: {
  image: string;
  title: string;
  description: string;
  link?: string;
}) {
  return (
    <Card
      className="group relative flex flex-col overflow-hidden rounded-2xl py-10 px-9
                 bg-[#1e1e1e] border border-white/10 shadow-lg 
                 hover:shadow-purple-500/30 transition-all duration-500 hover:-translate-y-2"
    >
      {/* === IMAGE === */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-all duration-300" />
      </div>

      {/* === CONTENT === */}
      <CardContent className="flex flex-col flex-1 p-6 relative z-10">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm flex-1">{description}</p>

        <Button
          variant="outline"
          className="mt-6 bg-dark border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
          asChild
        >
          <a href={link || "#"}>
            Learn More
            <ArrowRight className="h-4 w-4  transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </CardContent>

      {/* === Glow === */}
      <div className="absolute inset-0 rounded-2xl bg-purple-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
    </Card>
  );
}
