"use client";

import { Button } from "@/components/ui/button";
import { Camera, FileText, Settings, BarChart3, LogOut } from "lucide-react";
import { useAuth } from "./auth-context";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  const pathname = usePathname();

  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, href: "/admin/dashboard" },
    { id: "posts", label: "Blog Posts", icon: FileText, href: "/admin/posts" },
    { id: "projects", label: "Projects", icon: Camera, href: "/admin/projects" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="flex items-center space-x-4">
                <Camera className="h-8 w-8 text-red-600" />
                <h1 className="text-2xl font-bold text-gray-900">CameraAI Admin</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button 
                variant="outline" 
                onClick={logout}
                className="text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-red-100 text-red-700"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}
