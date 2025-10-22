"use client";

import Link from "next/link";
import { SiX, SiInstagram, SiFacebook, SiWhatsapp, SiYoutube } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="relative bg-black/80 backdrop-blur-sm border-t border-gray-800 py-12 text-gray-300">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* === Top Grid === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          
          {/* --- Company --- */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* --- Customer Care --- */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Care</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/report" className="hover:text-white transition-colors">Report an Issue</Link></li>
            </ul>
          </div>

          {/* --- Policies --- */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* --- Connect --- */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex gap-5 mt-3">
              
              {/* X */}
              <Link href="https://x.com/clooyzi" className="text-white hover:text-gray-400 transition-colors">
                <span className="sr-only">X</span>
                <SiX className="h-6 w-6" />
              </Link>

              {/* Instagram */}
              <Link href="https://www.instagram.com/clooyzi_/" className="text-white hover:text-gray-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <SiInstagram className="h-6 w-6" />
              </Link>

              {/* Facebook */}
              <Link href="https://www.facebook.com/clooyzi" className="text-white hover:text-gray-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <SiFacebook className="h-6 w-6" />
              </Link>

              {/* WhatsApp */}
              <Link href="https://wa.me/9353472169" className="text-white hover:text-gray-400 transition-colors">
                <span className="sr-only">WhatsApp</span>
                <SiWhatsapp className="h-6 w-6" />
              </Link>

              {/* YouTube */}
              <Link href="https://www.youtube.com/@clooyzi" className="text-white hover:text-gray-400 transition-colors">
                <span className="sr-only">YouTube</span>
                <SiYoutube className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* === Bottom Section === */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold text-white hover:text-gray-400 transition-all">
            Clooyzi
          </Link>
          <p className="text-sm text-gray-400">© 2025 Clooyzi. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
