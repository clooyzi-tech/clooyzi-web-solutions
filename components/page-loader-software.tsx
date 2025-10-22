"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "@/styles/page-loader-software.css";
import logo from "@/public/logo/clooyzi-software-logo.png"; // ✅ correct import for Next.js

const LogoLoader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 🧱 Block scroll during loading
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 900); // adjust timing

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="logo-loader">
      <div className="logo-wrapper">
        {/* ✅ Use next/image for optimization */}
        <Image
          src={logo}
          alt="Loading..."
          width={120}
          height={120}
          className="loader-logo"
          priority
        />
      </div>
    </div>
  );
};

export default LogoLoader;