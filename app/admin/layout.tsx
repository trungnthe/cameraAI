import { ReactNode } from "react";
import { AuthProvider } from "./components/auth-context";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="admin-layout">
        {/* This layout wraps admin pages without the main HeaderSection */}
        {children}
      </div>
    </AuthProvider>
  );
}
