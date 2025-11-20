//client/src/components/Navbar/Navbar.jsx
import React from "react";
import { useAuth } from "../../state/hooks/useAuth";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();

  const handleLogout = () => {
    window.open("/api/auth/logout", "_self");
  };

  const initial = user?.name?.[0]?.toUpperCase() || "?";

  return (
    <div className="w-60 h-full bg-[#0e0e2c] text-white p-4 flex flex-col justify-between shadow-md">
      {/* Top Section */}
      <div>
        {/* Avatar and Name */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg shadow">
            {initial}
          </div>
          <div className="text-sm font-semibold whitespace-nowrap">
            {user?.name}
          </div>
        </div>

        {/* Navigation Items (add more below) */}
        <div className="flex flex-col gap-4 text-sm text-gray-300">
          <button className="hover:text-white transition">
            🏗️ Flow Builder
          </button>
          {/* ⬇️ Add more nav buttons here */}
          {/* <button className="hover:text-white transition">📊 Analytics</button> */}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className=" cursor-pointer flex items-center gap-2 text-red-400 hover:text-red-500 text-sm"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
};

export default Navbar;
