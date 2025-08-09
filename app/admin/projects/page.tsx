"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import AdminLayout from "../components/admin-layout";

export default function ProjectsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Project Management</h2>
            <p className="text-gray-600">Manage your AI camera projects and configurations</p>
          </div>
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
              {[1, 2, 3, 4, 5, 6].map((project) => (
                <div key={project} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">AI Project {project}</h3>
                    <Badge variant={project % 3 === 0 ? "secondary" : "default"}>
                      {project % 3 === 0 ? "Inactive" : "Active"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Smart camera detection system for security monitoring and analytics
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Created:</span>
                      <span>2025-01-{10 + project}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Cameras:</span>
                      <span>{project * 2 + 1}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Alerts:</span>
                      <span className="text-green-600">{project * 5} this week</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
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
    </AdminLayout>
  );
}
