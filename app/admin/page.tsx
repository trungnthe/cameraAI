"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Users, FileText, Settings, BarChart3, Plus, Edit, Trash2, LogOut } from "lucide-react";
import { useAuth } from "./components/auth-context";
import LoginForm from "./components/login-form";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loginError, setLoginError] = useState("");
  const { isAuthenticated, login, logout, isLoading } = useAuth();

  const handleLogin = async (username: string, password: string) => {
    setLoginError("");
    const success = await login(username, password);
    if (!success) {
      setLoginError("Invalid username or password");
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <LoginForm 
        onLogin={handleLogin} 
        isLoading={isLoading}
        error={loginError}
      />
    );
  }

  const stats = [
    { title: "Total Users", value: "1,234", icon: Users, change: "+12%" },
    { title: "Active Projects", value: "56", icon: Camera, change: "+8%" },
    { title: "Blog Posts", value: "89", change: "+5%" },
    { title: "Monthly Revenue", value: "$12,345", icon: BarChart3, change: "+15%" },
  ];

  const recentPosts = [
    { id: 1, title: "AI Camera Technology Trends", status: "published", date: "2025-01-15" },
    { id: 2, title: "Smart Security Solutions", status: "draft", date: "2025-01-14" },
    { id: 3, title: "IoT Integration Guide", status: "published", date: "2025-01-13" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Camera className="h-8 w-8 text-red-600" />
              <h1 className="text-2xl font-bold text-gray-900">CameraAI Admin</h1>
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
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "posts", label: "Blog Posts", icon: FileText },
              { id: "projects", label: "Projects", icon: Camera },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-red-100 text-red-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.change}</p>
                      </div>
                      {stat.icon && <stat.icon className="h-8 w-8 text-red-600" />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Blog Posts</CardTitle>
                  <CardDescription>Latest content updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPosts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <p className="text-sm text-gray-500">{post.date}</p>
                        </div>
                        <Badge variant={post.status === "published" ? "default" : "secondary"}>
                          {post.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Blog Posts Tab */}
        {activeTab === "posts" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-gray-500">{post.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={post.status === "published" ? "default" : "secondary"}>
                          {post.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Project Management</h2>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Camera AI Projects</CardTitle>
                <CardDescription>Manage your AI camera projects and configurations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((project) => (
                    <div key={project} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">AI Project {project}</h3>
                        <Badge>Active</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Smart camera detection system for security monitoring
                      </p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
