"use client";

import { Camera, Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function HeaderSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl">
        <div className="flex items-center space-x-2 animate-fade-in">
          <Camera className="h-8 w-8 text-red-600 animate-pulse" />
          <span className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text">
            CameraAI
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {[
            { href: "/", label: "Trang chủ" },
            { href: "/#features", label: "Chức năng" },
            { href: "/#demo", label: "Demo" },
            { href: "/#sponsors", label: "Đối tác" },
            { href: "/#services", label: "Gói dịch vụ" },
            { href: "/#blog", label: "Bài viết" },
            { href: "/#contact", label: "Liên hệ" },
          ].map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-red-600 transition-all duration-300 hover:scale-105 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link
            href="/#demo"
            className="hidden md:inline-flex text-sm font-medium text-gray-600 hover:text-red-600 transition-all duration-300 hover:scale-105"
          >
            Thử Ngay
          </Link>
          <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            MCK Group
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:scale-110 transition-transform duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          {isMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-white shadow-md z-40 md:hidden animate-fade-in-down">
              <nav className="flex flex-col items-start space-y-4 px-6 py-4">
                {[
                  { href: "/", label: "Trang chủ" },
                  { href: "/#features", label: "Chức năng" },
                  { href: "/#demo", label: "Demo" },
                  { href: "/#sponsors", label: "Đối tác" },
                  { href: "/#services", label: "Gói dịch vụ" },
                  { href: "/#blog", label: "Bài viết" },
                  { href: "/#contact", label: "Liên hệ" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-gray-700 hover:text-red-600 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
