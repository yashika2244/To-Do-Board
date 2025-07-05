import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
      toast.success("logout Successful");

    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-[#115d83ad] px-6 py-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/todo5.webp" width={36} alt="logo" />
          <h2 className="text-xl md:text-2xl font-semibold italic tracking-wide text-white">
            ToDoBoard
          </h2>
        </div>

        {/* Desktop User Info */}
        {user && (
          <div className="hidden md:flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 font-medium text-white">
              <div className="w-8 h-8 rounded-full bg-[#1e293b] text-[#93c5fd] flex items-center justify-center font-semibold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span>{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-1.5 rounded-full font-medium transition duration-200"
            >
              Logout
            </button>
          </div>
        )}

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsSidebarOpen(true)} className="text-white">
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#115d83] text-white p-6 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden shadow-lg`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <img src="/todo5.webp" width={36} alt="logo" />
            <h2 className="text-xl font-semibold  text-white">ToDoBoard</h2>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* User info + logout */}
        {user && (
          <div className="mt-6 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3 text-sm font-medium">
              <div className="w-8 h-8 rounded-full bg-[#1e293b] text-[#93c5fd] flex items-center justify-center font-semibold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span>{user.name}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center cursor-pointer gap-2 text-sm bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full font-medium text-white transition duration-200"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
