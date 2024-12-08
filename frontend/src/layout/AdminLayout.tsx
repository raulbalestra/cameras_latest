import React, { useState } from 'react';
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/auth/signin'); // Redirect to login page after logout
  };

  return (
    <div className="flex h-screen flex-col dark:bg-gray-900 dark:text-gray-100">
      {/* Header with logout and sidebar control */}
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={handleLogout}
      />

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto p-6 bg-gray-100 dark:bg-gray-800">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
