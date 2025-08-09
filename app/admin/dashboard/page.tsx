"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Users, FileText, BarChart3 } from "lucide-react";
import AdminLayout from "../components/admin-layout";

export default function DashboardPage() {
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
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600">Welcome to your CameraAI admin dashboard</p>
        </div>

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

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-red-600" />
                    <span className="font-medium">Create New Post</span>
                  </div>
                  <span className="text-sm text-gray-500">→</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Camera className="h-5 w-5 text-red-600" />
                    <span className="font-medium">New Project</span>
                  </div>
                  <span className="text-sm text-gray-500">→</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-red-600" />
                    <span className="font-medium">User Management</span>
                  </div>
                  <span className="text-sm text-gray-500">→</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
