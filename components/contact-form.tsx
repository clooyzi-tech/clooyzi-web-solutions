"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";

export interface ContactFormRef {
  scrollToFormAndFocus: () => void;
}

const ContactForm = forwardRef<ContactFormRef>((_, ref) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    scrollToFormAndFocus: () => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    },
  }));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-black rounded-3xl border border-gray-800 text-white" id="contact">
  <CardContent className="p-10">
    {isSubmitted ? (
      <div className="flex flex-col items-center justify-center rounded-full space-y-4 py-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
          <Send className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Message Sent!</h3>
        <p className="text-center text-gray-300">
          Thank you for reaching out. We'll get back to you shortly.
        </p>
      </div>
    ) : (
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 rounded-full sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Name</Label>
            <Input
              ref={inputRef}
              id="name"
              name="name"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-700 bg-transparent text-white placeholder-gray-400 focus:border-white focus:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              required
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-700 bg-transparent text-white placeholder-gray-400 focus:border-white focus:ring-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">Phone</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-700 bg-transparent text-white placeholder-gray-400 focus:border-white focus:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company" className="text-white">Company</Label>
            <Input
              id="company"
              name="company"
              placeholder="Your company"
              value={formData.company}
              onChange={handleChange}
              className="border border-gray-700 bg-transparent text-white placeholder-gray-400 focus:border-white focus:ring-0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-white">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="How can we help you?"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="border border-gray-700 bg-transparent text-white placeholder-gray-400 focus:border-white focus:ring-0"
          />
        </div>

        <Button
          type="submit"
          className="w-full rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    )}
  </CardContent>
</Card>

  );
});

ContactForm.displayName = "ContactForm";
export default ContactForm;
