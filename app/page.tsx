"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";


import { Code, Bot, Smartphone, Globe, Database } from "lucide-react";


import PageLoader from "@/components/page-loader-software";
import Navbar from "@/components/navbar";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import WorksSection from "@/components/WorksSection";

import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/whatsapp-button";
import ContactForm, { ContactFormRef } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";

type Work = {
  id: number;
  title: string;
  description: string;
  project_link?: string;
  image_url?: string;
};




export default function Home() {
  const contactFormRef = useRef<ContactFormRef>(null);
  const [works, setWorks] = useState<Work[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    contactFormRef.current?.scrollToFormAndFocus();
  };
  return (


    





     <div className="flex min-h-screen flex-col">


        {/* loads software page for 3 sec */}
        <PageLoader />


        {/* navbar section*/}
        <Navbar onContactClick={handleClick} />




         {/* Imp one Header with  */}

      {/* 🌈 Floating Gradient Background fixed importent one  */}
      <div className="fixed inset-0 -z-20 animate-gradient bg-gradient-to-r from-violet-700 via-purple-500 to-indigo-700"></div>
      {/* Dark Overlay */}
       <div className="fixed inset-0 -z-10 bg-black/50"></div>

      {/* ✨ Floating Tech Icons */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Big primary icons */}
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
    
      <main className="flex-1">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
          {/* ✨ Hero Content */}
          <div className="relative z-10 text-center px-4 md:px-6 text-white">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl drop-shadow-lg">
              WE Build Websites................!
            </h1>

            <p className="text-lg md:text-xl mt-4 text-gray-200 drop-shadow-md">
              For  Business | Entrepreneurs | services | Creators | Startups | brands
            </p>

            <div className="flex flex-col min-[400px]:flex-row justify-center mt-6">
          {/* CTA */}
            <Button
              onClick={handleClick}
              className=" button-shadow-clooyzi hover:button-shadow-clooyzi-hover focus:outline-none font-medium"
            >
              Contact Us
            </Button>

            </div>
          </div>
        </section>






        {/* Services Section */}
        <ServicesSection />
         {/* about us Section */}
        <AboutSection />
        {/* our works Section */}
        <WorksSection />

        {/* testimonial sections */}
        <TestimonialsSection />































  {/* contact us  sections */}
  <ContactSection contactFormRef={contactFormRef} />

      </main>



     <Footer />

        {/* Fixed WhatsApp Button */}
        <WhatsAppButton phoneNumber="9353472169" />

    </div>
  );
}