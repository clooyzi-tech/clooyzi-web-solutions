"use client";

import { forwardRef } from "react";
import { Smartphone, Globe, Database } from "lucide-react";
import ContactForm, { ContactFormRef } from "@/components/contact-form";

interface ContactSectionProps {
  contactFormRef: React.RefObject<ContactFormRef>;
}

const ContactSection = forwardRef<ContactFormRef, ContactSectionProps>(
  ({ contactFormRef }, ref) => {
    return (
      <section id="contact" className="relative bg-gray-1000 py-16 md:py-24 overflow-hidden" aria-labelledby="contact-title">
        <div className="container px-4 md:px-6 relative z-10 text-center">
          <h2 id="contact-title" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Get In Touch
          </h2>
          <p className="max-w-[700px] mx-auto text-gray-300 mt-4 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Ready to start your next project? Contact us today for a free consultation.
          </p>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2 mt-12">
            {/* Left Side: Info + Office Hours */}
            <div className="flex flex-col space-y-6 relative z-10">
              {/* Contact Info */}
              <div className="grid gap-6">
                <ContactInfo icon={Smartphone} label="Phone" value="+91 9353472169" />
                <ContactInfo icon={Globe} label="Email" value="clooyzi@gmail.com" />
                <ContactInfo icon={Database} label="Address" value="DK, Mangalore" />
              </div>

              {/* Office Hours */}
              <div className="rounded-lg border border-purple-500/20 bg-white/5 backdrop-blur-sm p-6">
                <h3 className="text-xl font-bold text-white">Office Hours</h3>
                <div className="mt-4 grid gap-2 text-gray-300">
                  <OfficeHour day="Monday - Friday" time="9:00 AM - 6:00 PM" />
                  <OfficeHour day="Saturday" time="10:00 AM - 4:00 PM" />
                  <OfficeHour day="Sunday" time="Closed" />
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="relative z-10">
              <ContactForm ref={contactFormRef} />
            </div>
          </div>
        </div>
      </section>
    );
  }
);

ContactSection.displayName = "ContactSection";

export default ContactSection;

// ---------------- Helper Components ----------------

function ContactInfo({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
        <Icon className="h-5 w-5 text-purple-400" />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="text-sm text-gray-300">{value}</span>
      </div>
    </div>
  );
}

function OfficeHour({ day, time }: { day: string; time: string }) {
  return (
    <div className="flex justify-between">
      <span>{day}</span>
      <span>{time}</span>
    </div>
  );
}
