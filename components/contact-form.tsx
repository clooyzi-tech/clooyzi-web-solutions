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
import { Send, Mail, Shield } from "lucide-react";

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

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendOtp = async () => {
    if (!formData.email) {
      alert("Please enter your email first");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const result = await res.json();

      if (result.success) {
        setIsOtpSent(true);
        setOtpTimer(60);
        const interval = setInterval(() => {
          setOtpTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        alert("OTP sent to your email!");
      } else {
        alert(result.error || "Failed to send OTP");
      }
    } catch (error) {
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      const result = await res.json();

      if (result.success) {
        setIsOtpVerified(true);
        alert("Email verified successfully!");
      } else {
        alert(result.error || "Invalid OTP");
      }
    } catch (error) {
      alert("Failed to verify OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isOtpVerified) {
      alert("Please verify your email with OTP first");
      return;
    }

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
        setOtp("");
        setIsOtpSent(false);
        setIsOtpVerified(false);
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
                <Label htmlFor="email" className="text-white flex items-center gap-2">
                  Email
                  {isOtpVerified && <Shield className="h-4 w-4 text-green-500" />}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isOtpVerified}
                    className="border border-gray-700 bg-transparent text-white placeholder-gray-400 focus:border-white focus:ring-0"
                  />
                  {!isOtpVerified && (
                    <Button
                      type="button"
                      onClick={sendOtp}
                      disabled={isSubmitting || otpTimer > 0}
                      className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap"
                    >
                      {otpTimer > 0 ? `${otpTimer}s` : "Send OTP"}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {isOtpSent && !isOtpVerified && (
              <div className="space-y-2 bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                <Label htmlFor="otp" className="text-white flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Enter OTP sent to your email
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="border border-gray-700 bg-transparent text-white placeholder-gray-400 focus:border-white focus:ring-0"
                  />
                  <Button
                    type="button"
                    onClick={verifyOtp}
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Verify
                  </Button>
                </div>
              </div>
            )}

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
              disabled={isSubmitting || !isOtpVerified}
            >
              {isSubmitting ? "Sending..." : isOtpVerified ? "Send Message" : "Verify Email First"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
});

ContactForm.displayName = "ContactForm";
export default ContactForm;
