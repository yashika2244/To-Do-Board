import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Navbar Top */}
      <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-800 text-gray-800 px-6 py-4 shadow-md flex justify-between items-center md:justify-between">
        <div className="flex justify-center items-center">
          <img src="/todo5.webp" width={40} alt="" />
          <h2 className="text-xl md:text-2xl font-bold italic tracking-wide text-gray-900 drop-shadow-sm">
            ToDoBoard
          </h2>
        </div>

        {/* Desktop User Info */}
        {user && (
          <div className="hidden md:flex items-center gap-4 text-sm md:text-base">
            <span className="flex items-center gap-1 font-medium text-gray-800">
              <div className="w-8 h-8 rounded-full bg-purple-200 text-purple-700 flex items-center mr-1  justify-center font-semibold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="mr-2">{user.name}</span>
            </span>
            <button
              onClick={handleLogout}
              className=" text-white cursor-pointer bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-1.5 rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-200 shadow-sm"
            >
              Logout
            </button>
          </div>
        )}

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-800"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-500 via-purple-500 to-purple-800 text-gray-900 p-6 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden shadow-xl`}
      >
        {/* Close Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex justify-center items-center">
            <img src="/todo5.webp" width={40} alt="" />
            <h2 className="text-xl md:text-2xl font-bold italic tracking-wide text-gray-900 drop-shadow-sm">
              ToDoBoard
            </h2>
          </div>
          <button onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Only User Info & Logout */}

        {user && (
          <div className="mt-8 flex flex-col items-start gap-3">
            <div className="flex items-center gap-3 text-sm text-gray-800 font-medium">
              <div className="w-8 h-8 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center font-semibold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span>{user.name}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center cursor-pointer gap-2 text-sm text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 px-4 py-2 rounded-full font-semibold shadow-sm transition-all"
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
