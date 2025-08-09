"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./components/auth-context";
import LoginForm from "./components/login-form";

export default function AdminPage() {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const { isAuthenticated, login, isLoading } = useAuth();

  const handleLogin = async (username: string, password: string) => {
    setLoginError("");
    const success = await login(username, password);
    if (!success) {
      setLoginError("Invalid username or password");
    }
  };

  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, router]);

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

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
