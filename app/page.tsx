"use client";

import { ArrowRight, Code, Shield, Bot, Smartphone, Globe, Database } from "lucide-react"
import { FaMobileAlt, FaGlobeAmericas, FaShieldAlt, FaRobot, FaVrCardboard, FaCube } from 'react-icons/fa';
import Link from "next/link"
import { useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import ServiceCard from "@/components/service-card"
import TestimonialCard from "@/components/testimonial-card"


type Work = {
  id: number;
  title: string;
  description: string;
  project_link?: string;
  image_url?: string;
};

import WhatsAppButton from "@/components/whatsapp-button"
import ContactForm, { ContactFormRef } from '@/components/contact-form';

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
      {/* Header */}
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
              <div  className="flex items-center font-bold gap-6 bg-[#292929] rounded-full px-5 py-2 backdrop-blur-md transition-all duration-500" style={{fontFamily: "'Poppins', sans-serif",boxShadow: "0 0 3px #ffffffff",}}>
              {/* Nav Links with hover underline effect */}
              <Link href="/software" className="text-sm text-purple-500 transition-transform duration-300 relative hover:scale-105">
                Software
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-purple-600 scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </Link>
              <Link href="/videohub" className="text-sm text-green-500 transition-transform duration-300 relative hover:scale-105">
                Video-hub
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-green-600 scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </Link>
              <Link href="/photohub" className="text-sm text-blue-500 transition-transform duration-300 relative hover:scale-105">
                Photo-hub
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </Link>
              <Link href="/texthub" className="text-sm text-yellow-500 transition-transform duration-300 relative hover:scale-105">
                Text-hub
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-400 scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </Link>
              <Link href="/audiohub" className="text-sm text-red-500 transition-transform duration-300 relative hover:scale-105">
                Audio-hub
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-600 scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </Link>
              <Link href="/animationhub" className="text-sm text-orange-500 transition-transform duration-300 relative hover:scale-105">
                Animation-hub
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-orange-500 scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </Link>
            </div>
          </nav>

          {/* CTA */}
          <Button
            onClick={handleClick}
            className="hidden sm:inline-flex rounded-xl px-3 py-1 text-white shadow-neumorphism-mainpage hover:shadow-neumorphism-hover-mainpage focus:outline-none font-medium">
            Get Started
          </Button>

          {/* Mobile Menu (Hamburger) */}
          <div className="md:hidden relative">
            <button className="p-2 rounded-md hover:bg-gray-800/50 transition"
              onClick={() => setMobileOpen(!mobileOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Mobile Menu Links */}
            {mobileOpen && (
              <div
              className= {`fixed top-0 right-0 h-screen w-64 bg-[#292929]/95 backdrop-blur-md flex flex-col items-start py-6 px-6 gap-6 z-50 transform transition-transform duration-700 ease-out opacity-0 transition-opacity duration-700 ease-out ${mobileOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>

                {/* Close button */}
                <button className="self-end mb-4 p-2 rounded-md text-white hover:bg-white/10 transition" onClick={() => setMobileOpen(false)}>
                ✕
                </button>
                
                {/* Title in mobile view */}
                <a className="text-white font-extrabold text-3xl w-full">our service</a>

                {/* Links */}
                <Link href="/software" className="text-purple-500 font-bold text-lg w-full transition-transform duration-300 hover:scale-105 hover:text-purple-400">
                  Software
                </Link>
                <Link href="/videohub" className="text-green-500 font-bold text-lg w-full transition-transform duration-300 hover:scale-105 hover:text-green-400">
                  VideoHub
                </Link>
                <Link href="/photohub" className="text-blue-500 font-bold text-lg w-full transition-transform duration-300 hover:scale-105 hover:text-blue-400">
                  PhotoHub
                </Link>
                <Link href="/texthub" className="text-yellow-400 font-bold text-lg w-full transition-transform duration-300 hover:scale-105 hover:text-yellow-400">
                  TextHub
                </Link>
                <Link href="/audiohub" className="text-red-500 font-bold text-lg w-full transition-transform duration-300 hover:scale-105 hover:text-red-400">
                  AudioHub
                </Link>
                <Link href="/animationhub" className="text-orange-500 font-bold text-lg w-full transition-transform duration-300 hover:scale-105 hover:text-orange-400">
                  AnimationHub
                </Link>

                {/* CTA Button */}
                  <Button
                    onClick={() => {
                      handleClick();       // scroll to contact form
                      setMobileOpen(false); // close the sidebar
                    }}
                    className="mt-6 w-full rounded-xl px-3 py-2 text-white shadow-neumorphism-mainpage hover:shadow-neumorphism-hover-mainpage focus:outline-none font-medium transition-all duration-300"
                  >
                    Get Started
                  </Button>
              </div>
            )}
          </div>
        </div>
      </header>





















           {/* 🌈 Floating Gradient Background fixed importent one  */}
            <div className="fixed inset-0 -z-20 animate-gradient bg-gradient-to-r from-gray-200 via-white to-gray-900"></div>
     
     
      
    
      <main className="flex-1">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
          {/* ✨ Hero Content */}
          <div className="relative z-10 text-center px-4 md:px-6 text-white">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl drop-shadow-lg">
              Innovative Tech Solutions for Your Business
            </h1>
            <p className="text-lg md:text-xl mt-4 text-gray-200 drop-shadow-md">
              We build cutting-edge software solutions that drive business
              growth and digital transformation.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center mt-6">
              <Button
                onClick={handleClick}
                size="lg"
                className="gap-1 bg-violet-600 hover:bg-violet-500 transition-all duration-300 transform hover:scale-105"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-black text-purple-600 hover:text-white hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>



        {/* Services Section */}
       <section id="services" className="py-16 md:py-24 bg-background text-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Our Services
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive tech solutions tailored to your business needs
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <ServiceCard
                icon={<FaMobileAlt className="h-10 w-10 text-purple-500" />}
                title="App Development"
                description="Custom mobile applications for iOS and Android platforms that engage users and drive business growth."
              />
              <ServiceCard
                icon={<FaGlobeAmericas className="h-10 w-10 text-purple-500" />}
                title="Web Development"
                description="Responsive, user-friendly websites and web applications built with the latest technologies."
              />
              <ServiceCard
                icon={<FaShieldAlt className="h-10 w-10 text-purple-500" />}
                title="Cyber Security"
                description="Comprehensive security solutions to protect your digital assets and sensitive information."
              />
              <ServiceCard
                icon={<FaRobot className="h-10 w-10 text-purple-500" />}
                title="AI Bots"
                description="Intelligent chatbots and virtual assistants powered by advanced machine learning algorithms."
              />
              <ServiceCard
                icon={<FaVrCardboard className="h-10 w-10 text-purple-500" />}
                title="VR/AR Services"
                description="Immersive virtual and augmented reality experiences for training, marketing, and entertainment."
              />
              <ServiceCard
                icon={<FaCube className="h-10 w-10 text-purple-500" />}
                title="Blockchain Technology"
                description="Secure, transparent blockchain solutions for various industries including finance and supply chain."
              />
            </div>
          </div>
        </section>



        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-muted/50 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex justify-center">
                <img
                  src="/logo.png?height=400&width=500"
                  alt="About Us"
                  className="rounded-lg object-cover w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px]"
                  width={500}
                  height={400}
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Us</h2>
                  <p className="text-muted-foreground md:text-xl/relaxed">
                    Clooyzi is a leading software development company with a passion for innovation and excellence.
                    With over a decade of experience, we've helped businesses of all sizes transform their digital
                    presence.
                  </p>
                </div>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-primary/10">
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    </div>
                    <span>
                      Expert team of developers, designers, and strategists
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-primary/10">
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    </div>
                    <span>Cutting-edge technologies and methodologies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-primary/10">
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    </div>
                    <span>
                      Client-focused approach with personalized solutions
                    </span>
                  </li>
                </ul>
                <Button className="w-fit bg-violet-600 hover:bg-violet-500 transition-all duration-300 transform hover:scale-105">Learn More About Us</Button>
              </div>
            </div>
          </div>
        </section>


        {/* Our Works */}
        <section id="works" className="py-16 px-6 md:px-16 bg-background text-center text-foreground">
          <h2 className="text-3xl font-bold md:text-5xl mb-10">Our Works</h2>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {works && works.length > 0 ? works.slice(0, 3).map((work: Work) => {
              const projectLink = work.project_link || '';
              const projectUrl = /^https?:\/\//i.test(projectLink)
                ? projectLink
                : `https://${projectLink}`;
              return (
                <div
                  key={work.id}
                  className="bg-card pb-6 rounded-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 border border-border text-left"
                >
                  {work.image_url && (
                    <img
                      src={work.image_url}
                      alt={work.title}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                  )}
                  <h3 className="text-xl pl-6 font-semibold mb-2 text-purple-400">{work.title}</h3>
                  <p className="pl-6 mb-4 text-muted-foreground">{work.description}</p>
                  {work.project_link && (
                    <a
                      href={projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block ml-6 font-bold border border-border bg-card hover:bg-muted transition-all duration-300 px-6 py-2 rounded group"
                    >
                      Visit Project
                      <ArrowRight className="h-4 w-4 ml-2 inline-block transition-transform group-hover:translate-x-1" />
                    </a>
                  )}
                </div>
              );
            }) : (
              <div className="col-span-full text-center text-muted-foreground">
                <p>No works available at the moment.</p>
              </div>
            )}
          </div>

          {/* View More Button */}
          <div className="mt-10">
            <Button
              onClick={() => router.push('/OurWorks')}
              className="bg-violet-600 hover:bg-violet-500 text-black font-bold px-4 py-2 rounded transition-all duration-300 transform hover:scale-105"
            >
              View All Works
            </Button>
          </div>
        </section>






        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-background/80">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Clients Say</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it - hear from some of our satisfied clients
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <TestimonialCard
                quote="Clooyzi transformed our business with their innovative app solution. The team was professional and delivered beyond our expectations."
                author="Sarah Johnson"
                company="FinTech Solutions"
                image="/placeholder.svg?height=100&width=100"
              />
              <TestimonialCard
                quote="The cybersecurity services provided by Clooyzi have given us peace of mind. Their expertise in this field is unmatched."
                author="Michael Chen"
                company="Global Retail Inc."
                image="/placeholder.svg?height=100&width=100"
              />
              <TestimonialCard
                quote="Working with Clooyzi on our VR training program was a game-changer. The immersive experience they created has improved our training efficiency by 200%."
                author="Emily Rodriguez"
                company="Education First"
                image="/placeholder.svg?height=100&width=100"
              />
            </div>
          </div>
        </section>


        {/* Contact Section */}
        
         <section id="contact" className="relative bg-gray-1000 py-16 md:py-24 overflow-hidden">
             

            {/* ✨ Contact Content */}
            <div className="container px-4 md:px-6 relative z-10">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                    Get In Touch
                  </h2>
                  <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Ready to start your next project? Contact us today for a free consultation.
                  </p>
                </div>
              </div>

              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2 mt-12">
                {/* Left Side - Info + Hours */}
                <div className="flex flex-col space-y-6 relative z-10">
                  {/* Contact Info */}
                  <div className="grid gap-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                        <Smartphone className="h-5 w-5 text-purple-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">Phone</span>
                        <span className="text-sm text-gray-300">+91 9353472169</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                        <Globe className="h-5 w-5 text-purple-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">Email</span>
                        <span className="text-sm text-gray-300">clooyzi@clooyzi.com</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                        <Database className="h-5 w-5 text-purple-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">Address</span>
                        <span className="text-sm text-gray-300">DK, Mangalore</span>
                      </div>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="rounded-lg border border-purple-500/20 bg-white/5 backdrop-blur-sm p-6">
                    <h3 className="text-xl font-bold text-white">Office Hours</h3>
                    <div className="mt-4 grid gap-2 text-gray-300">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Contact Form */}
                <div className="relative z-10">
                  <ContactForm ref={contactFormRef} />
                </div>
              </div>
            </div>
      

        </section>

      </main>

      {/* Footer */}
      
        <footer className="relative bg-black/80 backdrop-blur-sm border-t border-gray-700 py-6 md:py-8">
          <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Code className="h-6 w-6 text-white" />
              <span className="text-lg font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                Clooyzi
              </span>
            </div>  

            {/* Copyright */}
            <p className="text-center text-sm text-gray-300 md:text-left">
              © 2025 Clooyzi. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {/** Example for X/Twitter */}
              <Link href="https://x.com/clooyzi" className="text-white hover:text-purple-800 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </Link>

              {/** Instagram */}
              <Link href="https://www.instagram.com/clooyzi_/" className="text-white hover:text-purple-800 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="h-5 w-5">
                  <path d="M224.1 141c-63.6 0-115.1 51.5-115.1 115.1s51.5 115.1 115.1 115.1 115.1-51.5 115.1-115.1S287.6 141 224.1 141zm0 190.2c-41.5 0-75.1-33.6-75.1-75.1s33.6-75.1 75.1-75.1 75.1 33.6 75.1 75.1-33.6 75.1-75.1 75.1zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.7-9.9-67.3-36.2-93.5s-57.8-34.5-93.5-36.2C293.4 32 154.6 32 108.2 34.2 72.5 35.9 40.9 44.1 14.7 70.3S-19.7 128.1-21.4 163.8C-24 210.2-24 349 14.2 395.4c1.7 35.7 9.9 67.3 36.2 93.5s57.8 34.5 93.5 36.2C154.6 480 293.4 480 339.8 477.8c35.7-1.7 67.3-9.9 93.5-36.2s34.5-57.8 36.2-93.5C480 349 480 210.2 476.6 163.8zM398.8 388c-7.8 19.7-22.9 35.4-42.5 43.4-29.5 11.8-99.5 9.1-132.2 9.1s-102.7 2.6-132.2-9.1c-19.7-7.8-35.4-22.9-43.4-42.5-11.8-29.5-9.1-99.5-9.1-132.2s-2.6-102.7 9.1-132.2c7.8-19.7 22.9-35.4 42.5-43.4 29.5-11.8 99.5-9.1 132.2-9.1s102.7-2.6 132.2 9.1c19.7 7.8 35.4 22.9 43.4 42.5 11.8 29.5 9.1 99.5 9.1 132.2s2.7 102.7-9.1 132.2z"/>
                </svg>
              </Link>

              {/** LinkedIn */}
              <Link href="https://www.linkedin.com/company/clooyzi" className="text-white hover:text-purple-800 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </Link>

              {/** Threads */}
              <Link href="https://www.threads.net/@clooyzi_" className="text-white hover:text-purple-800 transition-colors">
                <span className="sr-only">Threads</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" className="h-5 w-5">
                  <path d="M50,10 C30,10 15,30 15,50 C15,70 30,90 50,90 C70,90 85,70 85,50 C85,30 70,10 50,10 Z M50,80 C35,80 25,65 25,50 C25,35 35,20 50,20 C65,20 75,35 75,50 C75,65 65,80 50,80 Z M50,30 C40,30 35,40 35,50 C35,60 40,70 50,70 C60,70 65,60 65,50 C65,40 60,30 50,30 Z"/>
                </svg>
              </Link>

              {/** YouTube */}
              <Link href="https://www.youtube.com/@rahuthecoder" className="text-white hover:text-purple-800 transition-colors">
                <span className="sr-only">YouTube</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" className="h-5 w-5">
                  <path d="M549.7 124.1c-6.3-23.8-24.9-42.4-48.6-48.6C456.2 64 288 64 288 64S119.8 64 74.9 75.5C51.2 81.7 32.6 100.3 26.3 124.1 16 169.3 16 256 16 256s0 86.7 10.3 131.9c6.3 23.8 24.9 42.4 48.6 48.6C119.8 448 288 448 288 448s168.2 0 213.1-11.5c23.8-6.3 42.4-24.9 48.6-48.6C560 342.7 560 256 560 256s0-86.7-10.3-131.9zM232 334V178l142 78-142 78z"/>
                </svg>
              </Link>

              {/** GitHub */}
              <Link href="https://github.com/Deveshpoojary" className="text-white hover:text-purple-800 transition-colors">
                <span className="sr-only">GitHub</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
              </Link>
            </div>
          </div>
        </footer>

        {/* Fixed WhatsApp Button */}
        <WhatsAppButton phoneNumber="9353472169" />

    </div>
  );
}